"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { GlobalLoading } from "./LoadingSpinner";

export default function LoadingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isNavigating, setIsNavigating] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    // Start navigation
    setIsNavigating(true);
    setShowLoading(false);

    // Show loading indicator only if navigation takes more than 2 seconds
    const displayTimeout = setTimeout(() => {
      if (isNavigating) {
        setShowLoading(true);
      }
    }, 2000);

    // Navigation completed immediately (Next.js handles this quickly)
    const completeTimeout = setTimeout(() => {
      setIsNavigating(false);
      setShowLoading(false);
    }, 50);

    return () => {
      clearTimeout(displayTimeout);
      clearTimeout(completeTimeout);
      setIsNavigating(false);
      setShowLoading(false);
    };
  }, [pathname, searchParams, isNavigating]);

  return (
    <>
      <GlobalLoading isLoading={showLoading} />
      {children}
    </>
  );
}
