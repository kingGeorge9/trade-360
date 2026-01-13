"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface ReviewsStore {
  reviews: Review[];
  addReview: (review: Omit<Review, "id" | "createdAt">) => void;
  getProductReviews: (productId: string) => Review[];
  getAverageRating: (productId: string) => number;
}

export const useReviews = create<ReviewsStore>()(
  persist(
    (set, get) => ({
      reviews: [],
      addReview: (review) => {
        const newReview: Review = {
          ...review,
          id: `${Date.now()}-${Math.random()}`,
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          reviews: [newReview, ...state.reviews],
        }));
      },
      getProductReviews: (productId: string) => {
        return get().reviews.filter((r) => r.productId === productId);
      },
      getAverageRating: (productId: string) => {
        const productReviews = get().getProductReviews(productId);
        if (productReviews.length === 0) return 0;
        const sum = productReviews.reduce((acc, r) => acc + r.rating, 0);
        return Math.round((sum / productReviews.length) * 10) / 10;
      },
    }),
    {
      name: "reviews-storage",
    }
  )
);
