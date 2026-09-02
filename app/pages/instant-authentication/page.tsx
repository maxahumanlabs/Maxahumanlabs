'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function InstantAuthenticationPage() {
  const { t } = useLanguage();

  return (
    <div className="bg-white flex flex-col items-center justify-center px-6 pt-16 pb-12 min-h-[85vh]">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes revealUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes drawCheck {
          0% {
            stroke-dasharray: 50;
            stroke-dashoffset: 50;
          }
          100% {
            stroke-dasharray: 50;
            stroke-dashoffset: 0;
          }
        }

        .animate-reveal {
          animation: revealUp 0.8s ease-out forwards;
        }

        .animate-reveal-delayed {
          opacity: 0;
          animation: revealUp 0.8s ease-out 0.3s forwards;
        }

        .animate-check {
          stroke-dasharray: 50;
          stroke-dashoffset: 50;
          animation: drawCheck 0.6s ease-out 0.8s forwards;
        }
      `}} />

      <div className="text-center max-w-4xl mx-auto w-full">
        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-gray-900 text-center mb-6 animate-reveal">
          Instant Authentication
        </h1>
        
        {/* Sub Heading */}
        <p className="text-xl sm:text-2xl text-gray-700 font-medium mb-12 animate-reveal-delayed">
          Your product is authenticated and approved
        </p>

        {/* Checkmark Icon */}
        <div className="flex justify-center mb-8 mt-16 animate-reveal-delayed" style={{ animationDelay: '0.6s' }}>
          <div className="w-20 h-20 md:w-24 md:h-24 bg-black rounded-full flex items-center justify-center">
            <svg 
              className="w-10 h-10 md:w-12 md:h-12 text-green-500 animate-check" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={3} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>
        </div>

        {/* Subtitle / Mark */}
        <p className="text-xl md:text-3xl font-bold text-black animate-reveal-delayed" style={{ animationDelay: '1.2s' }}>
          The Mark of True Maxa Human.
        </p>
      </div>

      {/* How-to-use video — kept on this same page so the QR stays a dead end. */}
      <section className="w-full max-w-[320px] mx-auto mt-20 animate-reveal-delayed" style={{ animationDelay: '1.6s' }}>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
          How to Use
        </h2>
        <div className="rounded-2xl overflow-hidden bg-black shadow-lg">
          <video
            className="w-full h-auto block"
            src="/How%20to%20use.mp4"
            controls
            playsInline
            preload="metadata"
            controlsList="nodownload"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </section>
    </div>
  );
}
