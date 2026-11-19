import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import {
  validateTestDriveForm,
  validateGeneralEnquiryForm,
  validateIndianMobile,
  type TestDriveFormData,
  type GeneralEnquiryFormData,
} from './src/utils/dealershipHelpers';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface StoredRecord {
  referenceId: string;
  type: 'test-drive' | 'enquiry';
  createdAt: string;
  payload: Record<string, unknown>;
}

const submissionsStore: StoredRecord[] = [];

function createReferenceId(prefix: 'TD' | 'ENQ'): string {
  const stamp = Date.now().toString().slice(-6);
  const rand = Math.floor(100 + Math.random() * 900);
  return `${prefix}-${stamp}-${rand}`;
}

/**
 * Generates a minimal valid single-page PDF brochure placeholder dynamically
 * so the "Download Brochure" button always delivers a real, valid PDF file.
 */
function buildBrochurePdfBuffer(): Buffer {
  const lines = [
    'RENAULT DUSTER - SHOWROOM OVERVIEW & SPEC SUMMARY',
    '-----------------------------------------------------------------',
    'Thank you for exploring the Renault Duster at our showroom.',
    '',
    'AVAILABLE TRIM LINEUP (Showroom Configurable):',
    '1. Duster Essential - Signature Y-LED DRLs, ESC, Multi-Airbag Safety',
    '2. Duster Techno - 10.1" Touchscreen, 7" Digital Cluster, 17" Alloys',
    '3. Duster Extreme / Journey - Multi-View Camera, Touring Comfort',
    '',
    'KEY SHOWROOM SERVICES:',
    '- Scheduled Showroom & Doorstep Test Drives',
    '- Transparent On-Road Proforma Invoices',
    '- Multi-Bank Finance & Used Car Exchange Evaluation',
    '',
    'Note: Replace this placeholder PDF with the official Renault India',
    'model brochure PDF when dealership specifications are finalized.',
  ];

  const escapedLines = lines
    .map((line, idx) => {
      const safe = line.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
      const y = 740 - idx * 22;
      return `BT /F1 11 Tf 54 ${y} Td (${safe}) Tj ET`;
    })
    .join('\n');

  const streamContent = `${escapedLines}\n`;
  const objects: string[] = [];

  objects.push('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n');
  objects.push('2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n');
  objects.push(
    '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj\n'
  );
  objects.push(
    `4 0 obj\n<< /Length ${Buffer.byteLength(streamContent, 'utf8')} >>\nstream\n${streamContent}endstream\nendobj\n`
  );
  objects.push(
    '5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n'
  );

  let pdf = '%PDF-1.4\n';
  const offsets: number[] = [0];

  for (const obj of objects) {
    offsets.push(Buffer.byteLength(pdf, 'utf8'));
    pdf += obj;
  }

  const xrefOffset = Buffer.byteLength(pdf, 'utf8');
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += '0000000000 65535 f \n';
  for (let i = 1; i < offsets.length; i++) {
    pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

  return Buffer.from(pdf, 'utf8');
}

async function startServer() {
  const app = express();
  const port = Number(process.env.PORT || 3000);
  const isProd = process.env.NODE_ENV === 'production';

  app.use(express.json({ limit: '256kb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', submissionsCount: submissionsStore.length });
  });

  app.post('/api/test-drives', (req, res) => {
    const body = (req.body || {}) as Partial<TestDriveFormData>;
    const payload: TestDriveFormData = {
      fullName: String(body.fullName || ''),
      mobileNumber: String(body.mobileNumber || ''),
      email: String(body.email || ''),
      preferredVariant: String(body.preferredVariant || ''),
      preferredDate: String(body.preferredDate || ''),
      preferredTime: String(body.preferredTime || ''),
      message: String(body.message || ''),
    };

    const errors = validateTestDriveForm(payload);
    if (Object.keys(errors).length > 0) {
      res.status(400).json({
        success: false,
        error: Object.values(errors)[0],
        fieldErrors: errors,
      });
      return;
    }

    const mobile = validateIndianMobile(payload.mobileNumber);
    const referenceId = createReferenceId('TD');
    const submittedAt = new Date().toISOString();

    const record: StoredRecord = {
      referenceId,
      type: 'test-drive',
      createdAt: submittedAt,
      payload: {
        ...payload,
        mobileNumber: mobile.normalized,
      },
    };
    submissionsStore.push(record);

    res.status(201).json({
      success: true,
      referenceId,
      submittedAt,
      message:
        'Your test drive request has been received by our showroom desk. A product specialist will call to confirm your slot.',
      summary: {
        fullName: payload.fullName.trim(),
        mobileNumber: `+91 ${mobile.normalized}`,
        variant: payload.preferredVariant,
        schedule: `${payload.preferredDate} · ${payload.preferredTime}`,
      },
    });
  });

  app.post('/api/enquiries', (req, res) => {
    const body = (req.body || {}) as Partial<GeneralEnquiryFormData>;
    const payload: GeneralEnquiryFormData = {
      fullName: String(body.fullName || ''),
      mobileNumber: String(body.mobileNumber || ''),
      email: String(body.email || ''),
      enquiryType:
        body.enquiryType === 'offers' ||
        body.enquiryType === 'finance' ||
        body.enquiryType === 'exchange'
          ? body.enquiryType
          : 'general',
      preferredVariant: String(body.preferredVariant || 'Any Duster Variant'),
      message: String(body.message || ''),
    };

    const errors = validateGeneralEnquiryForm(payload);
    if (Object.keys(errors).length > 0) {
      res.status(400).json({
        success: false,
        error: Object.values(errors)[0],
        fieldErrors: errors,
      });
      return;
    }

    const mobile = validateIndianMobile(payload.mobileNumber);
    const referenceId = createReferenceId('ENQ');
    const submittedAt = new Date().toISOString();

    submissionsStore.push({
      referenceId,
      type: 'enquiry',
      createdAt: submittedAt,
      payload: {
        ...payload,
        mobileNumber: mobile.normalized,
      },
    });

    res.status(201).json({
      success: true,
      referenceId,
      submittedAt,
      message:
        'Your showroom enquiry has been logged. Our sales team will connect with you shortly.',
      summary: {
        fullName: payload.fullName.trim(),
        mobileNumber: `+91 ${mobile.normalized}`,
        variant: payload.preferredVariant,
      },
    });
  });

  app.get('/api/brochure', (_req, res) => {
    const pdfBuffer = buildBrochurePdfBuffer();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="Renault-Duster-Showroom-Overview.pdf"'
    );
    res.send(pdfBuffer);
  });

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      const indexFile = path.join(distPath, 'index.html');
      if (fs.existsSync(indexFile)) {
        res.sendFile(indexFile);
      } else {
        res.status(404).send('Build output not found.');
      }
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Showroom server running on http://0.0.0.0:${port}`);
  });
}

startServer();
