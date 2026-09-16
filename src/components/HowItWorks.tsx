import { ArrowRight, CheckCircle2, FileText, Info, MapPin, Sprout, Store } from 'lucide-react';
import React from 'react';
import { useAgritech } from '../context/AgritechContext';
import { useLanguage } from '../context/LanguageContext';

export const HowItWorks: React.FC = () => {
  const { language, t } = useLanguage();
  const { setActiveTab } = useAgritech();

  const steps = [
    {
      num: '01',
      title: t('howItWorks.step1Title', 'Select Your Area'),
      titleGu: 'તમારો વિસ્તાર પસંદ કરો',
      desc: t('howItWorks.step1Desc', 'Choose your Vadodara locality or taluka (Gotri, Manjalpur, Padra, Karjan, etc.)'),
      descGu: 'તમારો વડોદરા વિસ્તાર કે તાલુકો પસંદ કરો (ગોત્રી, મંજલપુર, પાદરા, કરજણ વગેરે)',
      icon: <MapPin className="w-5 h-5 text-emerald-700" />,
      actionTab: 'vegetableGuide' as const
    },
    {
      num: '02',
      title: t('howItWorks.step2Title', 'Understand Your Conditions'),
      titleGu: 'સ્થાનિક પરિસ્થિતિ સમજો',
      desc: t('howItWorks.step2Desc', 'Review local soil characteristics, water availability, and drainage profile'),
      descGu: 'જમીનના પ્રકાર, પાણીની પ્રાપ્યતા અને નિતાર વ્યવસ્થાની વિગતો જાણો',
      icon: <Info className="w-5 h-5 text-teal-700" />,
      actionTab: 'vegetableGuide' as const
    },
    {
      num: '03',
      title: t('howItWorks.step3Title', 'Discover Suitable Vegetables'),
      titleGu: 'યોગ્ય શાકભાજી શોધો',
      desc: t('howItWorks.step3Desc', 'Explore scored recommendations tailored to your purpose and season'),
      descGu: 'તમારા હેતુ અને ઋતુ મુજબ ક્રમાંકિત અનુકૂળ શાકભાજી જુઓ',
      icon: <Sprout className="w-5 h-5 text-lime-700" />,
      actionTab: 'vegetableGuide' as const
    },
    {
      num: '04',
      title: t('howItWorks.step4Title', 'Check Market Prices'),
      titleGu: 'બજાર ભાવ તપાસો',
      desc: t('howItWorks.step4Desc', 'Review live auction trends, modal rates, and nearby APMC mandi connections'),
      descGu: 'હરાજીના મોડલ ભાવ, વલણો અને નજીકની APMC મંડીના ભાવ જાણો',
      icon: <Store className="w-5 h-5 text-amber-700" />,
      actionTab: 'mandiRates' as const
    }
  ];

  return (
    <section id="how-it-works-section" className="py-12 sm:py-16 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            {t('howItWorks.title', 'Your 4-Step Agricultural Journey')}
          </h2>
          <p className="mt-2 text-stone-600 text-sm sm:text-base">
            {t('howItWorks.subtitle', 'From local Vadodara soil selection to harvesting and APMC mandi selling')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => (
            <div
              key={step.num}
              id={`journey-step-${step.num}`}
              onClick={() => setActiveTab(step.actionTab)}
              className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 group-hover:scale-105 transition-transform">
                    {step.icon}
                  </div>
                  <span className="text-2xl font-black text-stone-200 group-hover:text-emerald-300 transition-colors">
                    {step.num}
                  </span>
                </div>
                <h3 className="text-base font-bold text-stone-900 group-hover:text-emerald-800 transition-colors mb-2">
                  {language === 'gu' ? step.titleGu : step.title}
                </h3>
                <p className="text-xs text-stone-500 leading-relaxed">
                  {language === 'gu' ? step.descGu : step.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center text-xs font-semibold text-emerald-700 group-hover:text-emerald-800">
                <span>{language === 'gu' ? 'શરૂ કરો' : 'Start'}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
