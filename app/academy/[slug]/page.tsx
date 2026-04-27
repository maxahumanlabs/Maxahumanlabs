import { getAcademyArticleBySlug } from '@/lib/academy-api';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import DosingCalculator from '@/components/academy/DosingCalculator';
import AcademyTabs from '@/components/academy/AcademyTabs';

export default async function AcademyArticlePage({ params }: { params: { slug: string } }) {
  const article = await getAcademyArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  // Extract clean title (without HTML) for the hero section
  const cleanTitle = article.title.rendered.replace(/<[^>]+>/g, '');
  
  // Extract a subtitle if there's an excerpt
  const subtitle = article.excerpt?.rendered.replace(/<[^>]+>/g, '') || 'Research Peptide';

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-20">
      
      {/* Hero Section - Deep Blue matching the screenshot */}
      <div className="bg-[#2B4365] pt-32 pb-24 px-4 w-full">
        <div className="container mx-auto">
          {/* Back Link */}
          <Link href="/academy" className="flex items-center gap-2 text-white/80 hover:text-white text-sm mb-8 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            Back to Peptide Library
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex items-start gap-6">
              {/* Initials Badge */}
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-white font-bold text-xl backdrop-blur-sm border border-white/20">
                {cleanTitle.substring(0, 3).toUpperCase()}
              </div>
              
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{cleanTitle}</h1>
                <p className="text-xl text-white/80 mb-6">{subtitle}</p>
                
                {/* Badges row */}
                <div className="flex flex-wrap gap-2">
                  <span className="bg-[#EAB308] text-[#713F12] text-xs font-bold px-3 py-1 rounded-full">Metabolic</span>
                  {article.purity && (
                    <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/10">
                      {article.purity}
                    </span>
                  )}
                  {article.cas_number && (
                    <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/10">
                      CAS: {article.cas_number}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button className="bg-[#CBA338] hover:bg-[#D5B049] text-[#4A3B12] font-semibold px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                Download PDF
              </button>
              <Link href="/" className="bg-[#CBA338] hover:bg-[#D5B049] text-[#4A3B12] font-semibold px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout container offset negatively to overlap hero */}
      <div className="container mx-auto px-4 -mt-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            
            {/* Tabs Component (Description, Research, Studies) */}
            <AcademyTabs article={article} />

            {/* Chemical Properties Block */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Chemical Properties</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {article.molecular_weight && (
                  <div>
                    <span className="block text-gray-500 text-sm mb-1">Molecular Weight</span>
                    <span className="block text-xl font-bold text-gray-900">{article.molecular_weight}</span>
                  </div>
                )}
                {article.molecular_formula && (
                  <div>
                    <span className="block text-gray-500 text-sm mb-1">Molecular Formula</span>
                    <span className="block text-xl font-bold text-gray-900">{article.molecular_formula}</span>
                  </div>
                )}
                {article.cas_number && (
                  <div>
                    <span className="block text-gray-500 text-sm mb-1">CAS Number</span>
                    <span className="block text-xl font-bold text-gray-900">{article.cas_number}</span>
                  </div>
                )}
                {article.purity && (
                  <div>
                    <span className="block text-gray-500 text-sm mb-1">Purity</span>
                    <span className="block text-xl font-bold text-gray-900">{article.purity}</span>
                  </div>
                )}
              </div>

              {article.sequence && (
                <div>
                  <span className="block text-gray-500 text-sm mb-3">Amino Acid Sequence</span>
                  <div className="bg-gray-50 p-4 rounded-xl font-mono text-sm text-gray-700 leading-relaxed break-all border border-gray-100">
                    {article.sequence}
                  </div>
                </div>
              )}
            </div>

            {/* Physical Properties Block */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Physical Properties</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <span className="block text-gray-500 text-sm mb-1">Appearance</span>
                  <span className="block font-bold text-gray-900">{article.appearance || 'White to off-white powder'}</span>
                </div>
                <div>
                  <span className="block text-gray-500 text-sm mb-1">Solubility</span>
                  <span className="block font-bold text-gray-900">{article.solubility || 'Soluble in water'}</span>
                </div>
                <div>
                  <span className="block text-gray-500 text-sm mb-1">Half-Life</span>
                  <span className="block font-bold text-gray-900">{article.half_life || 'N/A'}</span>
                </div>
                <div>
                  <span className="block text-gray-500 text-sm mb-1">Bioavailability</span>
                  <span className="block font-bold text-gray-900">{article.bioavailability || 'N/A'}</span>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100">
                <span className="block text-gray-500 text-sm mb-1">Storage</span>
                <span className="block font-bold text-gray-900">{article.storage_condition || 'Store at 2-8C. Protect from light.'}</span>
              </div>
            </div>

          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            
            {/* Interactive Dosing Calculator */}
            <DosingCalculator />

            {/* Important Notices Box */}
            <div className="bg-[#FFFDF5] rounded-3xl p-8 border border-[#FDE68A] shadow-sm">
              <h3 className="text-xl font-bold text-[#92400E] mb-6 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                Important Notices
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-[#92400E] text-sm">
                  <svg className="shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                  For research purposes only
                </li>
                <li className="flex items-start gap-3 text-[#92400E] text-sm">
                  <svg className="shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                  Prescription medication in clinical use
                </li>
                <li className="flex items-start gap-3 text-[#92400E] text-sm">
                  <svg className="shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                  Consult with healthcare provider
                </li>
              </ul>
            </div>

            {/* Storage & Handling Box */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                Storage & Handling
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {article.storage_condition || 'Store at 2-8C. Protect from light.'}
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
