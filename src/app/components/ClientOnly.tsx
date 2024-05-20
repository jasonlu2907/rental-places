'use client';
import { useState, useEffect } from 'react';

/**This wrapper component is specialized for Hydration problem in nextjs */
const ClientOnly = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Ensure nothing is rendered on the server side
  }

  return <>{children}</>; // Render children only on the client side
};

export default ClientOnly;
