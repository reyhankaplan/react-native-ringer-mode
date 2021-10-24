import React from 'react';

import { View, Button } from 'react-native';
import {
  setRingerMode,
  RINGER_MODE,
  RingerModeType,
} from 'react-native-ringer-mode';

export default function App() {
  const setMode = (mode: RingerModeType) => {
    try {
      setRingerMode(mode);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View>
      <Button title="Silent" onPress={() => setMode(RINGER_MODE.silent)} />
      <Button title="Normal" onPress={() => setMode(RINGER_MODE.normal)} />
      <Button title="Vibrate" onPress={() => setMode(RINGER_MODE.vibrate)} />
    </View>
  );
}
