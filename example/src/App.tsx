import React from 'react';

import { StyleSheet, View, Text, Button } from 'react-native';
import {
  useRingerMode,
  RINGER_MODE,
  checkDndAccess,
  requestDndAccess,
  RingerModeType,
} from 'react-native-ringer-mode';

const modeText = {
  [RINGER_MODE.silent]: 'Silent',
  [RINGER_MODE.normal]: 'Normal',
  [RINGER_MODE.vibrate]: 'Vibrate',
};

export default function App() {
  const { mode, error, setMode } = useRingerMode();

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
    <View style={styles.container}>
      <Text style={styles.text}>
        Ringer Mode: {mode !== undefined ? modeText[mode] : null}
      </Text>

      <View>
        <Button title="Silent" onPress={() => changeMode(RINGER_MODE.silent)} />
        <Button title="Normal" onPress={() => changeMode(RINGER_MODE.normal)} />
        <Button
          title="Vibrate"
          onPress={() => changeMode(RINGER_MODE.vibrate)}
        />
      </View>

      <View>
        <Text style={styles.error}>{error?.message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  button: {
    marginTop: 20,
  },
  text: {
    color: '#fff',
  },
  error: {
    color: '#f44',
  },
});
