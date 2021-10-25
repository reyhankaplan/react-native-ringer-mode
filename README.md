# `react-native-ringer-mode` [![npm](https://img.shields.io/npm/v/react-native-ringer-mode)](https://www.npmjs.com/package/react-native-ringer-mode)

React Native Ringer Mode - Get and set ringer mode on Android devices.

## Installation

```sh
npm install react-native-ringer-mode
```

## Usage

### How to get and set ringer mode with `useRingerMode` hook

```js
import React from 'react';

import { View, Text, Button } from 'react-native';
import { useRingerMode, RINGER_MODE } from 'react-native-ringer-mode';

const modeText = {
  [RINGER_MODE.silent]: 'Silent',
  [RINGER_MODE.normal]: 'Normal',
  [RINGER_MODE.vibrate]: 'Vibrate',
};

export default function App() {
  const { mode, error, setMode } = useRingerMode();

  return (
    <View>
      <Text>Ringer Mode: {mode !== undefined ? modeText[mode] : null}</Text>

      <View>
        <Button title="Silent" onPress={() => setMode(RINGER_MODE.silent)} />
        <Button title="Normal" onPress={() => setMode(RINGER_MODE.normal)} />
        <Button title="Vibrate" onPress={() => setMode(RINGER_MODE.vibrate)} />
      </View>

      <View>
        <Text>{error?.message}</Text>
      </View>
    </View>
  );
}
```

### How to get ringer mode with `getRingerMode`

`getRingerMode` is an async function and resolves the current ringer mode of the device.
(Resolves `undefined` on non-Android devices.)

```js
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

```

### How to set ringer mode with `setRingerMode`

`setRingerMode` is an async function that sets the given ringer mode to the device and resolves the mode if it is set.
(Resolves `undefined` on non-Android devices.)

```js
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
```

### Not allowed to change Do Not Disturb state `checkDndAccess` & `requestDndAccess`

From N onward, ringer mode adjustments that would toggle Do Not Disturb are not allowed unless the app has been granted Do Not Disturb Access. See [AudioManager#setRingerMode](https://developer.android.com/reference/android/media/AudioManager#setRingerMode(int)).

If you want to change the ringer mode **from Silent mode** or **to Silent mode**, you may run into the `Not allowed to change Do Not Disturb state` error. The example below checks the DND access and if user hasn't given the access opens the settings for it.

First you need to add the line below to your `AndroidManifest.xml` to be able to see your app in the settings.

```xml
<uses-permission android:name="android.permission.ACCESS_NOTIFICATION_POLICY" />
```

And you can check and request permission before setting the ringer mode. Example code below:

```js
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
        // This function opens the DND settings.
        // You can ask user to give the permission with a modal before calling this function.
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
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
