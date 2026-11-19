import { PLACEHOLDER_TESTIMONIALS } from '../data/duster';

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="bg-slate-50 text-slate-900 py-16 sm:py-24 border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-2xl space-y-3">
          <p className="text-xs font-semibold tracking-wider uppercase text-slate-500">
            Customer Stories · Template Slots
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0B162C]">
            Showroom Customer Feedback
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            The cards below are clearly marked placeholder templates ready to be replaced with verified reviews from your dealership customers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLACEHOLDER_TESTIMONIALS.map((item) => (
            <article
              key={item.id}
              className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <p className="text-xs font-medium text-slate-500">
                  {item.placeholderNotice}
                </p>
                <blockquote className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  “{item.quote}”
                </blockquote>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <p className="text-sm font-semibold text-[#0B162C]">
                  {item.label}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">{item.context}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
