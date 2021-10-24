import { useState, useEffect } from 'react';

import { getRingerMode, setRingerMode, RingerModeType } from './native';

export const useRingerMode = () => {
  const [mode, setCurrentMode] = useState<RingerModeType | undefined>();
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    (async () => {
      try {
        const currentMode = await getRingerMode();
        setCurrentMode(currentMode);
      } catch (err: any) {
        setError(err);
      }
    })();
  }, []);

  const setMode = async (newMode: RingerModeType) => {
    setError(null);

    try {
      const currentMode = await setRingerMode(newMode);
      setCurrentMode(currentMode);
    } catch (err: any) {
      setError(err);
    }
  };

  return { mode, error, setMode };
};
