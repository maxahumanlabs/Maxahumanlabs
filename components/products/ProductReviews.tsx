'use client';

import React, { useState } from 'react';
import { ProductReview } from '@/types';
import WriteReviewForm from './WriteReviewForm';

interface ProductReviewsProps {
  productId: number;
  reviews: ProductReview[];
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const StarIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
      clipRule="evenodd"
    />
  </svg>
);

export default function ProductReviews({ productId, reviews }: ProductReviewsProps) {
  const [showForm, setShowForm] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [visibleReviews, setVisibleReviews] = useState(8);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const loadMore = () => {
    setVisibleReviews((prev) => prev + 8);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customer Reviews</h2>
          {!showForm && !submitSuccess && (
            <button
              onClick={() => setShowForm(true)}
              className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Write a Review
            </button>
          )}
        </div>

        {submitSuccess && (
          <div className="mt-6 rounded-md bg-green-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">
                  Thank you! Your review has been submitted and is pending approval.
                </p>
              </div>
            </div>
          </div>
        )}

        {showForm && !submitSuccess && (
          <WriteReviewForm 
            productId={productId} 
            onSuccess={() => {
              setShowForm(false);
              setSubmitSuccess(true);
            }} 
            onCancel={() => setShowForm(false)} 
          />
        )}
        
        {(!reviews || reviews.length === 0) ? (
          <p className="mt-4 text-gray-500">No reviews yet. Be the first to review this product!</p>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:gap-x-8 border-t border-gray-200 pt-10">
            {reviews.slice(0, visibleReviews).map((review) => (
              <div key={review.id} className="flex flex-col bg-gray-50 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          review.rating > rating ? 'text-yellow-400' : 'text-gray-200',
                          'h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0'
                        )}
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex flex-col sm:flex-row sm:items-center">
                  <div className="flex items-center">
                    <img
                      src={review.reviewer_avatar_urls?.['48'] || '/placeholder-avatar.png'}
                      alt={`${review.reviewer}`}
                      className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gray-100 flex-shrink-0"
                    />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{review.reviewer}</p>
                      <span className="inline-flex items-center rounded-md bg-green-50 px-1.5 py-0.5 sm:px-2 sm:py-1 text-[10px] sm:text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 mt-0.5 sm:mt-1">
                        Verified
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex-grow">
                  <div
                    className="space-y-6 text-xs sm:text-sm text-gray-500"
                    dangerouslySetInnerHTML={{ __html: review.review }}
                  />
                  
                  {/* Render CusRev Images if they exist in the API response */}
                  {Array.isArray((review as any).cusrev_images) && (review as any).cusrev_images.length > 0 && (
                    <div className="mt-4 flex gap-2 sm:gap-4 overflow-x-auto pb-2">
                      {(review as any).cusrev_images.map((imgUrl: string, index: number) => (
                        <button 
                          key={index} 
                          onClick={() => setSelectedImage(imgUrl)}
                          className="relative h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0 rounded-lg border-2 border-gray-200 overflow-hidden cursor-pointer hover:border-primary focus:outline-none focus:border-primary transition-colors"
                        >
                          <img
                            src={imgUrl}
                            alt={`Review image ${index + 1}`}
                            className="object-cover w-full h-full"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {reviews.length > visibleReviews && (
              <div className="pt-10 flex justify-center border-t border-gray-200 mt-10">
                <button
                  onClick={loadMore}
                  className="rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Image Preview Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-80 p-4 sm:p-6"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full flex items-center justify-center">
            <div className="relative inline-block">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 text-white hover:text-gray-200 transition-colors focus:outline-none z-10"
                aria-label="Close image preview"
              >
                <svg className="h-8 w-8 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <img 
                src={selectedImage} 
                alt="Review preview" 
                className="max-w-full max-h-[85vh] object-contain rounded-md bg-white"
                onClick={(e) => e.stopPropagation()} 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
