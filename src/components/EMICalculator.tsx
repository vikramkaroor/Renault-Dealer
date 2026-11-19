import { useState, useMemo } from 'react';
import { Calculator, Info } from 'lucide-react';
import { calculateEMI, formatINR } from '../utils/dealershipHelpers';

interface EMICalculatorProps {
  onRequestFinanceCallback?: () => void;
}

const TENURE_OPTIONS = [12, 24, 36, 48, 60, 72, 84];

export function EMICalculator({ onRequestFinanceCallback }: EMICalculatorProps) {
  const [onRoadPrice, setOnRoadPrice] = useState<number>(1500000);
  const [downPayment, setDownPayment] = useState<number>(300000);
  const [interestRate, setInterestRate] = useState<number>(9.2);
  const [tenureMonths, setTenureMonths] = useState<number>(60);

  const safeDownPayment = Math.min(downPayment, onRoadPrice);

  const breakdown = useMemo(
    () =>
      calculateEMI({
        onRoadPrice,
        downPayment: safeDownPayment,
        annualRatePercent: interestRate,
        tenureMonths,
      }),
    [onRoadPrice, safeDownPayment, interestRate, tenureMonths]
  );

  const handlePriceChange = (nextPrice: number) => {
    const clamped = Math.max(500000, Math.min(4000000, nextPrice || 500000));
    setOnRoadPrice(clamped);
    if (downPayment > clamped) {
      setDownPayment(Math.round(clamped * 0.2));
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Controls Column */}
        <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <p className="text-xs font-medium text-slate-500">
                Interactive Finance Estimator
              </p>
              <h3 className="text-2xl font-semibold text-slate-900 mt-1">
                Calculate Your Estimated EMI
              </h3>
            </div>
            <Calculator className="w-6 h-6 text-[#0B162C] shrink-0" aria-hidden="true" />
          </div>

          {/* On-Road Price */}
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <label
                htmlFor="emi-onroad-price"
                className="text-sm font-medium text-slate-800"
              >
                Illustrative On-Road Price
              </label>
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-slate-500">INR</span>
                <input
                  id="emi-onroad-price"
                  type="number"
                  min={500000}
                  max={4000000}
                  step={25000}
                  value={onRoadPrice}
                  onChange={(e) => handlePriceChange(Number(e.target.value))}
                  className="w-32 px-2.5 py-1.5 text-right text-sm font-mono font-medium tabular-nums border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:border-[#0B162C]"
                />
              </div>
            </div>
            <input
              type="range"
              aria-label="On-road price slider"
              min={800000}
              max={3000000}
              step={25000}
              value={Math.min(3000000, Math.max(800000, onRoadPrice))}
              onChange={(e) => handlePriceChange(Number(e.target.value))}
              className="w-full accent-[#0B162C] cursor-pointer"
            />
            <div className="flex justify-between text-xs text-slate-500 tabular-nums">
              <span>₹8,00,000</span>
              <span>Edit to match your showroom quote</span>
              <span>₹30,00,000</span>
            </div>
          </div>

          {/* Down Payment */}
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <label
                htmlFor="emi-down-payment"
                className="text-sm font-medium text-slate-800"
              >
                Down Payment / Trade-In Value
              </label>
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-slate-500">INR</span>
                <input
                  id="emi-down-payment"
                  type="number"
                  min={0}
                  max={onRoadPrice}
                  step={10000}
                  value={safeDownPayment}
                  onChange={(e) =>
                    setDownPayment(
                      Math.max(0, Math.min(onRoadPrice, Number(e.target.value) || 0))
                    )
                  }
                  className="w-32 px-2.5 py-1.5 text-right text-sm font-mono font-medium tabular-nums border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:border-[#0B162C]"
                />
              </div>
            </div>
            <input
              type="range"
              aria-label="Down payment slider"
              min={0}
              max={Math.round(onRoadPrice * 0.8)}
              step={25000}
              value={Math.min(Math.round(onRoadPrice * 0.8), safeDownPayment)}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-full accent-[#0B162C] cursor-pointer"
            />
            <div className="flex justify-between text-xs text-slate-500 tabular-nums">
              <span>₹0</span>
              <span>{formatINR(Math.round(onRoadPrice * 0.8))}</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <label
                htmlFor="emi-interest-rate"
                className="text-sm font-medium text-slate-800"
              >
                Indicative Interest Rate (% p.a.)
              </label>
              <input
                id="emi-interest-rate"
                type="number"
                min={6}
                max={18}
                step={0.1}
                value={interestRate}
                onChange={(e) =>
                  setInterestRate(
                    Math.max(5, Math.min(20, Number(e.target.value) || 0))
                  )
                }
                className="w-24 px-2.5 py-1.5 text-right text-sm font-mono font-medium tabular-nums border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:border-[#0B162C]"
              />
            </div>
            <input
              type="range"
              aria-label="Interest rate slider"
              min={7.0}
              max={15.0}
              step={0.1}
              value={Math.min(15.0, Math.max(7.0, interestRate))}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-[#0B162C] cursor-pointer"
            />
            <div className="flex justify-between text-xs text-slate-500 tabular-nums">
              <span>7.0%</span>
              <span>15.0%</span>
            </div>
          </div>

          {/* Tenure Selector */}
          <div className="space-y-2">
            <span className="block text-sm font-medium text-slate-800">
              Loan Tenure
            </span>
            <div
              role="group"
              aria-label="Loan tenure options"
              className="grid grid-cols-4 sm:grid-cols-7 gap-2"
            >
              {TENURE_OPTIONS.map((months) => {
                const active = tenureMonths === months;
                return (
                  <button
                    key={months}
                    type="button"
                    onClick={() => setTenureMonths(months)}
                    aria-pressed={active}
                    className={`py-2 px-2 text-xs rounded-md border cursor-pointer whitespace-nowrap tabular-nums ${
                      active
                        ? 'bg-[#0B162C] text-white border-[#0B162C] font-semibold'
                        : 'bg-white text-slate-800 border-slate-300 hover:border-slate-500 font-medium'
                    }`}
                  >
                    {months / 12} {months === 12 ? 'Yr' : 'Yrs'}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Summary Output Column */}
        <div className="lg:col-span-5 bg-[#0B162C] text-white p-6 sm:p-8 flex flex-col justify-between gap-6">
          <div className="space-y-6">
            <div>
              <p className="text-xs font-medium text-slate-300">
                Estimated Monthly EMI ({tenureMonths} months)
              </p>
              <p
                data-testid="emi-monthly-value"
                className="text-3xl sm:text-4xl font-semibold font-mono tabular-nums text-white mt-2"
              >
                {formatINR(breakdown.monthlyEmi)}
                <span className="text-sm font-sans font-normal text-slate-300">
                  {' '}
                  / month
                </span>
              </p>
            </div>

            {/* Principal vs Interest Proportion Bar */}
            <div className="space-y-2">
              <div className="h-2.5 w-full bg-slate-800 rounded-sm overflow-hidden flex">
                <div
                  style={{ width: `${breakdown.principalPercentage}%` }}
                  className="bg-white transition-all duration-200"
                />
                <div
                  style={{ width: `${breakdown.interestPercentage}%` }}
                  className="bg-[#D9232E] transition-all duration-200"
                />
              </div>
              <div className="flex items-center justify-between text-xs text-slate-300 tabular-nums">
                <span>Principal {breakdown.principalPercentage}%</span>
                <span>Interest {breakdown.interestPercentage}%</span>
              </div>
            </div>

            <dl className="space-y-3.5 pt-4 border-t border-white/15 text-sm">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-slate-300">Loan Amount</dt>
                <dd
                  data-testid="emi-loan-amount"
                  className="font-mono font-medium tabular-nums text-white"
                >
                  {formatINR(breakdown.loanAmount)}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-slate-300">Total Interest Payable</dt>
                <dd
                  data-testid="emi-total-interest"
                  className="font-mono font-medium tabular-nums text-white"
                >
                  {formatINR(breakdown.totalInterest)}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4 pt-3 border-t border-white/15">
                <dt className="text-white font-medium">Total Repayment</dt>
                <dd
                  data-testid="emi-total-repayment"
                  className="font-mono font-semibold tabular-nums text-white text-base"
                >
                  {formatINR(breakdown.totalRepayment)}
                </dd>
              </div>
            </dl>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-2.5 p-3.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300 leading-relaxed">
              <Info className="w-4 h-4 shrink-0 mt-0.5 text-slate-300" aria-hidden="true" />
              <span>
                All EMI figures shown are illustrative estimates only and do not constitute a guaranteed finance quotation. Final terms depend on credit approval and bank policies.
              </span>
            </div>

            {onRequestFinanceCallback && (
              <button
                type="button"
                onClick={onRequestFinanceCallback}
                className="w-full py-3 px-4 text-sm font-semibold text-white bg-[#D9232E] hover:bg-[#B91C1C] rounded-md transition-colors cursor-pointer"
              >
                Discuss Tailored Finance Options
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
