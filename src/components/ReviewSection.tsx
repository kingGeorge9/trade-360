"use client";

import { useReviews, type Review } from "@/store/reviews";
import { useState } from "react";

interface ReviewSectionProps {
  productId: string;
  productName: string;
}

export default function ReviewSection({
  productId,
  productName,
}: ReviewSectionProps) {
  const { getProductReviews, getAverageRating, addReview } = useReviews();
  const reviews = getProductReviews(productId);
  const averageRating = getAverageRating(productId);

  const [isWritingReview, setIsWritingReview] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [userName, setUserName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !comment.trim()) return;

    addReview({
      productId,
      userId: `user-${Date.now()}`,
      userName: userName.trim(),
      rating,
      comment: comment.trim(),
    });

    setComment("");
    setUserName("");
    setRating(5);
    setIsWritingReview(false);
  };

  return (
    <section className="space-y-6">
      {/* Rating Summary */}
      <div className="rounded-xl bg-light-200 p-6">
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-5xl font-bold text-dark-900">
              {averageRating > 0 ? averageRating.toFixed(1) : "—"}
            </div>
            <div className="flex items-center justify-center gap-1 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} filled={star <= Math.round(averageRating)} />
              ))}
            </div>
          </div>
          <div className="flex-1">
            <div className="text-body-medium text-dark-900">
              {reviews.length} {reviews.length === 1 ? "Review" : "Reviews"}
            </div>
            <button
              onClick={() => setIsWritingReview(!isWritingReview)}
              className="mt-2 text-body text-dark-700 underline hover:text-dark-900"
            >
              {isWritingReview ? "Cancel" : "Write a Review"}
            </button>
          </div>
        </div>
      </div>

      {/* Review Form */}
      {isWritingReview && (
        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-light-300 bg-light-100 p-6 space-y-4"
        >
          <h3 className="text-heading-3 text-dark-900">Write Your Review</h3>

          <div>
            <label
              htmlFor="userName"
              className="block text-body-medium text-dark-900 mb-2"
            >
              Your Name
            </label>
            <input
              id="userName"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name"
              className="w-full rounded-lg border border-light-300 bg-light-100 px-4 py-2 text-body text-dark-900 focus:outline-none focus:ring-2 focus:ring-dark-500"
              required
            />
          </div>

          <div>
            <label className="block text-body-medium text-dark-900 mb-2">
              Rating
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110"
                >
                  <Star filled={star <= rating} size="lg" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="comment"
              className="block text-body-medium text-dark-900 mb-2"
            >
              Your Review
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={`Share your thoughts about ${productName}...`}
              rows={4}
              className="w-full rounded-lg border border-light-300 bg-light-100 px-4 py-2 text-body text-dark-900 focus:outline-none focus:ring-2 focus:ring-dark-500"
              required
            />
          </div>

          <button
            type="submit"
            className="rounded-full bg-dark-900 px-6 py-3 text-body-medium text-light-100 transition-all hover:bg-dark-700"
          >
            Submit Review
          </button>
        </form>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-center text-body text-dark-700 py-8">
            No reviews yet. Be the first to review this product!
          </p>
        ) : (
          reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))
        )}
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const date = new Date(review.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <article className="rounded-xl border border-light-300 bg-light-100 p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-dark-900 text-body-medium text-light-100">
              {review.userName.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="text-body-medium text-dark-900">
                {review.userName}
              </div>
              <div className="text-caption text-dark-700">{date}</div>
            </div>
          </div>
          <div className="flex items-center gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} filled={star <= review.rating} />
            ))}
          </div>
          <p className="text-body text-dark-900">{review.comment}</p>
        </div>
      </div>
    </article>
  );
}

function Star({
  filled,
  size = "md",
}: {
  filled: boolean;
  size?: "md" | "lg";
}) {
  const sizeClass = size === "lg" ? "h-6 w-6" : "h-5 w-5";

  return (
    <svg
      className={`${sizeClass} ${
        filled ? "fill-orange stroke-orange" : "fill-none stroke-dark-300"
      }`}
      viewBox="0 0 24 24"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
      />
    </svg>
  );
}
