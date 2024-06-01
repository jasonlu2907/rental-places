'use client';

import { useEffect } from 'react';
import EmptyList from './components/EmptyList';

interface ErrorProps {
  error: Error;
}

const ErrorState: React.FC<ErrorProps> = ({ error }) => {
  useEffect(() => {
    console.log(error);
  }, [error]);
  return (
    <EmptyList
      title='Something went wrong!'
      subtitle='Server Error. We are working on fixing it. Thank you for your patience!'
    />
  );
};

export default ErrorState;
