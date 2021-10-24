import React from 'react';
import { View, Button } from 'react-native';

import {
  useRingerMode,
  RINGER_MODE,
  checkDndAccess,
  requestDndAccess,
  RingerModeType,
} from 'react-native-ringer-mode';

export default function App() {
  const { mode, setMode } = useRingerMode();

  const changeMode = async (newMode: RingerModeType) => {
    // From N onward, ringer mode adjustments that would toggle Do Not Disturb
    // are not allowed unless the app has been granted Do Not Disturb Access.
    // @see https://developer.android.com/reference/android/media/AudioManager#setRingerMode(int)
    if (newMode === RINGER_MODE.silent || mode === RINGER_MODE.silent) {
      const hasDndAccess = await checkDndAccess();
      if (hasDndAccess === false) {
        requestDndAccess();
        return;
      }
    }

    setMode(newMode);
  };

  return (
    <View>
      <Button title="Silent" onPress={() => changeMode(RINGER_MODE.silent)} />
      <Button title="Normal" onPress={() => changeMode(RINGER_MODE.normal)} />
      <Button title="Vibrate" onPress={() => changeMode(RINGER_MODE.vibrate)} />
    </View>
  );
}
