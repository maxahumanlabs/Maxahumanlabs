import { getAcademyArticles } from '@/lib/academy-api';
import Link from 'next/link';

export default async function AcademyPage() {
  const articles = await getAcademyArticles();

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen pt-32">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[#3b2760] mb-4">Peptide Academy</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">Explore our comprehensive library of peptide research, specifications, and scientific data.</p>
      </div>

      {articles.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No articles found. Please add some from the WordPress dashboard.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => {
            const featuredImage = article._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
            
            return (
              <Link href={`/academy/${article.slug}`} key={article.id} className="group flex flex-col h-full bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="aspect-[4/3] bg-gray-50 relative overflow-hidden flex items-center justify-center p-8 border-b border-gray-100">
                  <div className="relative w-full h-full flex items-center justify-center">
                    {featuredImage ? (
                      <img 
                        src={featuredImage} 
                        alt={article.title.rendered} 
                        className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500" 
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#f8f5ff] to-[#e6dcf5] rounded-xl flex items-center justify-center shadow-inner">
                        <span className="text-[#3b2760] font-bold text-3xl opacity-50">
                          {article.title.rendered.substring(0, 2).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* CAS Number badge */}
                  {article.cas_number && (
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-xs font-bold px-3 py-1.5 rounded-full text-[#3b2760] shadow-sm uppercase tracking-wider">
                      CAS: {article.cas_number}
                    </div>
                  )}
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 
                    className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#3b2760] transition-colors line-clamp-2" 
                    dangerouslySetInnerHTML={{ __html: article.title.rendered }} 
                  />
                  <div 
                    className="text-gray-500 text-sm line-clamp-3 mb-6 flex-grow" 
                    dangerouslySetInnerHTML={{ __html: article.excerpt.rendered }} 
                  />
                  
                  <div className="flex items-center text-[#3b2760] font-semibold text-sm group-hover:gap-2 transition-all mt-auto pt-4 border-t border-gray-50">
                    View Complete Profile <span className="text-lg leading-none">&rarr;</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
