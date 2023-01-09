'use client';
import { useState, useEffect } from 'react';

const useScreenOrientation = () => {
  const [orientation, setOrientation] = useState<'landscape' | 'portrait'>(getOrientation());

  const updateOrientation = () => {
    setOrientation(getOrientation());
  };

  useEffect(() => {
    window.addEventListener('resize', updateOrientation);
    return () => {
      window.removeEventListener('resize', updateOrientation);
    };
  }, []);

  return orientation;
};

const getOrientation = () => {
  return window?.innerWidth > window?.innerHeight ? 'landscape' : 'portrait';
};

export default useScreenOrientation;
