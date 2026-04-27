'use client';

import { useState } from 'react';
import { AcademyArticle } from '@/types/academy';

export default function AcademyTabs({ article }: { article: AcademyArticle }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'research' | 'studies'>('overview');

  return (
    <div className="mb-8">
      {/* Tab Navigation */}
      <div className="flex items-center gap-1 bg-gray-50 p-1.5 rounded-xl border border-gray-100 mb-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
            activeTab === 'overview'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
          Overview
        </button>
        <button
          onClick={() => setActiveTab('research')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
            activeTab === 'research'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
          Research
        </button>
        <button
          onClick={() => setActiveTab('studies')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
            activeTab === 'studies'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          Studies
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm min-h-[300px]">
        {activeTab === 'overview' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Description</h2>
            <div 
              className="prose max-w-none text-gray-600 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: article.content.rendered || 'No overview content available.' }} 
            />
          </div>
        )}

        {activeTab === 'research' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Research & Applications</h2>
            {article.tab_research ? (
              <div 
                className="prose max-w-none text-gray-600 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: article.tab_research }} 
              />
            ) : (
              <p className="text-gray-500 italic">No research data available for this compound yet.</p>
            )}
          </div>
        )}

        {activeTab === 'studies' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Clinical Studies</h2>
            {article.tab_studies ? (
              <div 
                className="prose max-w-none text-gray-600 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: article.tab_studies }} 
              />
            ) : (
              <p className="text-gray-500 italic">No clinical studies data available for this compound yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
