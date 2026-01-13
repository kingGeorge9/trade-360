"use client";

import { useFavorites } from "@/store/favorites";
import { useEffect, useState } from "react";

interface FavoriteButtonProps {
  productId: string;
  size?: "sm" | "md" | "lg";
}

export default function FavoriteButton({
  productId,
  size = "md",
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  };

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(productId);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  if (!mounted) {
    return (
      <button
        className={`flex ${sizeClasses[size]} items-center justify-center rounded-full bg-light-100 shadow-md transition-all`}
        disabled
      >
        <HeartIcon className={iconSizes[size]} filled={false} />
      </button>
    );
  }

  const favorite = isFavorite(productId);

  return (
    <button
      onClick={handleClick}
      className={`flex ${
        sizeClasses[size]
      } items-center justify-center rounded-full bg-light-100 shadow-md transition-all hover:scale-110 ${
        isAnimating ? "scale-125" : ""
      }`}
      aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
    >
      <HeartIcon className={iconSizes[size]} filled={favorite} />
    </button>
  );
}

function HeartIcon({
  className,
  filled,
}: {
  className: string;
  filled: boolean;
}) {
  return (
    <svg
      className={`${className} transition-colors ${
        filled ? "fill-red stroke-red" : "fill-none stroke-dark-700"
      }`}
      viewBox="0 0 24 24"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
      />
    </svg>
  );
}
