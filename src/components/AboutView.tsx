import {
  Building2,
  CheckCircle2,
  ExternalLink,
  Globe2,
  Heart,
  HelpCircle,
  Layers,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Sprout,
  Users
} from 'lucide-react';
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const AboutView: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <div id="about-view" className="py-8 sm:py-12 bg-stone-50/70 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Banner */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-950 text-white rounded-3xl p-6 sm:p-10 shadow-lg">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-semibold mb-3 border border-white/20">
              <Sprout className="w-3.5 h-3.5" />
              <span>{t('about.title', 'About Vadodara Krushi Mitra')}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {language === 'gu'
                ? 'વડોદરા જિલ્લાનું સમર્પિત કૃષિ અને બાગાયતી પ્લેટફોર્મ'
                : "Vadodara District's Dedicated Agritech Platform"}
            </h1>
            <p className="mt-3 text-sm sm:text-base text-emerald-100 leading-relaxed">
              {language === 'gu'
                ? 'વડોદરા કૃષિ મિત્ર વડોદરા જિલ્લાની વિશિષ્ટ જમીન, આબોહવા, શાકભાજી વાવેતર પદ્ધતિઓ અને APMC મંડી બજાર હરાજી ભાવને એક પારદર્શક છત નીચે લાવે છે.'
                : 'Bridging the gap between local soil conditions, vegetable agronomy, and APMC wholesale auction economics across Vadodara district.'}
            </p>
          </div>
        </div>

        {/* Geographic & Agronomic Profile of Vadodara */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
            {language === 'gu'
              ? 'વડોદરા જિલ્લાની કૃષિ પરિસ્થિતિ ઝાંખી (Agro-Profile)'
              : "Vadodara District Agro-Climatic Profile"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <span className="flex items-center space-x-2 text-xs font-bold text-emerald-800 uppercase">
                <Globe2 className="w-4 h-4 text-emerald-600" />
                <span>{language === 'gu' ? 'ભૌગોલિક સ્થાન' : 'Geography & Rivers'}</span>
              </span>
              <p className="text-xs text-stone-700 leading-relaxed">
                {language === 'gu'
                  ? 'મધ્ય ગુજરાતમાં મહી, વિશ્વામિત્રી અને નર્મદા નદીઓના બેસિનમાં સ્થિત. સરેરાશ વાર્ષિક વરસાદ ૮૦૦ થી ૧૦૦૦ મીમી.'
                  : 'Located in Central Gujarat within the fertile basins of the Mahi, Vishwamitri, and Narmada rivers. Average rainfall ranges between 800 - 1000 mm.'}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <span className="flex items-center space-x-2 text-xs font-bold text-emerald-800 uppercase">
                <Layers className="w-4 h-4 text-emerald-600" />
                <span>{language === 'gu' ? 'જમીનની વિવિધતા' : 'Soil Variations'}</span>
              </span>
              <p className="text-xs text-stone-700 leading-relaxed">
                {language === 'gu'
                  ? 'પાદરા અને ઉત્તર વડોદરામાં પ્રખ્યાત ગોરાડુ (રેતાળ-કાંપવાળી) જમીન, જ્યારે વાઘોડિયા, કરજણ અને ડભોઇમાં ફળદ્રુપ કાળી જમીન (Black Cotton) વિસ્તરેલી છે.'
                  : 'Goradu (sandy loam/alluvial) soils predominate in Padra and urban perimeters, while deep black cotton soils cover Karjan, Waghodia, and Dabhoi.'}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <span className="flex items-center space-x-2 text-xs font-bold text-emerald-800 uppercase">
                <Building2 className="w-4 h-4 text-emerald-600" />
                <span>{language === 'gu' ? 'મંડી માળખું' : 'APMC Network'}</span>
              </span>
              <p className="text-xs text-stone-700 leading-relaxed">
                {language === 'gu'
                  ? 'સયાજીપુરા, પાદરા, કરજણ અને ડભોઇ એમ ૪ મુખ્ય APMC મંડીઓ દ્વારા શાકભાજી, કપાસ, ડાંગર, કેળા અને તુવેરની દૈનિક હરાજી થાય છે.'
                  : 'Anchored by 4 key regulated APMC yards: Sayajipura, Padra, Karjan, and Dabhoi facilitating daily wholesale auction trade.'}
              </p>
            </div>
          </div>
        </div>

        {/* Who this platform is for */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-4">
            <h3 className="text-lg font-bold text-stone-900 flex items-center space-x-2">
              <Users className="w-5 h-5 text-emerald-700" />
              <span>{language === 'gu' ? 'આ પ્લેટફોર્મ કોના માટે છે?' : 'Who is this platform built for?'}</span>
            </h3>
            <ul className="space-y-3 text-xs text-stone-600">
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-stone-800">
                    {language === 'gu' ? 'વડોદરા જિલ્લાના ખેડૂતો:' : 'Vadodara District Farmers:'}
                  </strong>{' '}
                  {language === 'gu'
                    ? 'પોતાના તાલુકા મુજબ યોગ્ય શાકભાજી પસંદગી અને APMC હરાજી ભાવોની પારદર્શક માહિતી માટે.'
                    : 'To make informed crop choices tailored to their specific taluka soil and verify real-time mandi prices.'}
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-stone-800">
                    {language === 'gu' ? 'શહેરી અને ધાબાના બાગાયતકારો:' : 'Urban & Terrace Gardeners:'}
                  </strong>{' '}
                  {language === 'gu'
                    ? 'ગોત્રી, અલકાપુરી, મંજલપુર જેવા શહેરી વિસ્તારોમાં કુંડામાં શાકભાજી ઉગાડવા માટે.'
                    : 'For growing fresh, organic herbs and vegetables in apartments and terrace gardens.'}
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-stone-800">
                    {language === 'gu' ? 'કૃષિ વિજ્ઞાન સંશોધકો:' : 'Agritech Researchers & Students:'}
                  </strong>{' '}
                  {language === 'gu'
                    ? 'વડોદરા એગ્રો-ઇકોલોજીકલ ડેટા અને બજાર વલણોના અભ્યાસ માટે.'
                    : 'For accessing localized agro-climatic datasets and wholesale market trends.'}
                </span>
              </li>
            </ul>
          </div>

          {/* Local Support & KVK */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-4">
            <h3 className="text-lg font-bold text-stone-900 flex items-center space-x-2">
              <Phone className="w-5 h-5 text-teal-700" />
              <span>{language === 'gu' ? 'સ્થાનિક સરકારી કૃષિ સંસાધનો' : 'Local Vadodara Agricultural Resources'}</span>
            </h3>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2 text-xs text-stone-700">
              <h4 className="font-bold text-stone-900">
                Krishi Vigyan Kendra (KVK) Vadodara
              </h4>
              <p className="text-stone-600">
                ICAR / Anand Agricultural University Extension Center, Mangalbharti, Vadodara District.
              </p>
              <p className="text-[11px] text-stone-500 font-mono">
                Farmer Helpline: 1800-180-1551 (Kisan Call Center)
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2 text-xs text-stone-700">
              <h4 className="font-bold text-stone-900">
                District Agriculture Office, Vadodara
              </h4>
              <p className="text-stone-600">
                Kothi Kacheri Compound, Raopura, Vadodara - 390001
              </p>
              <p className="text-[11px] text-stone-500 font-mono">
                Soil Health Card Scheme & Micro-Irrigation (GGRC)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
