"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesStore {
  favorites: Set<string>;
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
}

export const useFavorites = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: new Set(),
      toggleFavorite: (productId: string) => {
        set((state) => {
          const newFavorites = new Set(state.favorites);
          if (newFavorites.has(productId)) {
            newFavorites.delete(productId);
          } else {
            newFavorites.add(productId);
          }
          return { favorites: newFavorites };
        });
      },
      isFavorite: (productId: string) => get().favorites.has(productId),
    }),
    {
      name: "favorites-storage",
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          const { state } = JSON.parse(str);
          return {
            state: {
              ...state,
              favorites: new Set(state.favorites || []),
            },
          };
        },
        setItem: (name, value) => {
          const { state } = value;
          localStorage.setItem(
            name,
            JSON.stringify({
              state: {
                ...state,
                favorites: Array.from(state.favorites),
              },
            })
          );
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);
