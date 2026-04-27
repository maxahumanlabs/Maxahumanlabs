import { getAcademyArticleBySlug } from '@/lib/academy-api';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function AcademyArticlePage({ params }: { params: { slug: string } }) {
  const article = await getAcademyArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const featuredImage = article._embedded?.['wp:featuredmedia']?.[0]?.source_url;

  return (
    <div className="bg-gray-50 min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 bg-white py-3 px-6 rounded-full w-fit shadow-sm border border-gray-100">
          <Link href="/" className="hover:text-[#3b2760] font-medium transition-colors">Home</Link>
          <span className="text-gray-300">/</span>
          <Link href="/academy" className="hover:text-[#3b2760] font-medium transition-colors">Academy</Link>
          <span className="text-gray-300">/</span>
          <span className="text-[#3b2760] font-semibold" dangerouslySetInnerHTML={{ __html: article.title.rendered }} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-gray-100 mb-8">
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight" dangerouslySetInnerHTML={{ __html: article.title.rendered }} />
              
              <div 
                className="prose prose-lg max-w-none prose-headings:text-[#3b2760] prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-[#3b2760] prose-a:font-semibold prose-li:text-gray-600 marker:text-[#3b2760]" 
                dangerouslySetInnerHTML={{ __html: article.content.rendered }} 
              />
            </div>
          </div>

          {/* Sidebar Properties */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 lg:sticky lg:top-32">
              <h3 className="text-xl font-bold text-[#3b2760] mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#f8f5ff] flex items-center justify-center text-sm">🧪</span>
                Chemical Profile
              </h3>
              
              {featuredImage && (
                <div className="mb-8 p-6 bg-[#f8f5ff] rounded-2xl flex justify-center items-center min-h-[200px] border border-[#e6dcf5]">
                  <img src={featuredImage} alt="Chemical Structure" className="max-h-48 object-contain mix-blend-multiply" />
                </div>
              )}

              <div className="space-y-1">
                {article.cas_number && (
                  <div className="flex justify-between items-center py-4 border-b border-gray-50">
                    <span className="text-gray-500 text-sm font-medium">CAS Number</span>
                    <span className="font-mono font-semibold text-[#3b2760]">{article.cas_number}</span>
                  </div>
                )}
                {article.molecular_formula && (
                  <div className="flex justify-between items-center py-4 border-b border-gray-50">
                    <span className="text-gray-500 text-sm font-medium">Formula</span>
                    <span className="font-mono font-semibold text-gray-900">{article.molecular_formula}</span>
                  </div>
                )}
                {article.molecular_weight && (
                  <div className="flex justify-between items-center py-4 border-b border-gray-50">
                    <span className="text-gray-500 text-sm font-medium">Molar Mass</span>
                    <span className="font-mono font-semibold text-gray-900">{article.molecular_weight}</span>
                  </div>
                )}
                {article.purity && (
                  <div className="flex justify-between items-center py-4 border-b border-gray-50">
                    <span className="text-gray-500 text-sm font-medium">Purity</span>
                    <span className="font-bold text-green-700 bg-green-50 px-3 py-1 rounded-full text-sm border border-green-100">
                      {article.purity}
                    </span>
                  </div>
                )}
                {article.appearance && (
                  <div className="flex justify-between items-center py-4 border-b border-gray-50">
                    <span className="text-gray-500 text-sm font-medium">Appearance</span>
                    <span className="font-medium text-gray-900 text-sm text-right w-1/2">{article.appearance}</span>
                  </div>
                )}
              </div>

              {article.sequence && (
                <div className="mt-8">
                  <span className="text-[#3b2760] font-bold text-sm block mb-3 uppercase tracking-wider">Amino Acid Sequence</span>
                  <div className="bg-gray-900 p-5 rounded-2xl font-mono text-sm text-green-400 break-all leading-relaxed shadow-inner">
                    {article.sequence}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
