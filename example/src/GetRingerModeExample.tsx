import React, { useEffect, useState } from 'react';

import { View, Text } from 'react-native';
import {
  RINGER_MODE,
  getRingerMode,
  RingerModeType,
} from 'react-native-ringer-mode';

const modeText = {
  [RINGER_MODE.silent]: 'Silent',
  [RINGER_MODE.normal]: 'Normal',
  [RINGER_MODE.vibrate]: 'Vibrate',
};

export default function App() {
  const [mode, setMode] = useState<RingerModeType | undefined>();

  useEffect(() => {
    (async () => {
      try {
        const currentMode = await getRingerMode();
        setMode(currentMode);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <View>
      <Text>Ringer Mode: {mode !== undefined ? modeText[mode] : null}</Text>
    </View>
  );
}
