# react-native-ringer-mode

## Getting started

### Install

`$ npm install react-native-ringer-mode --save`

### Link

`$ react-native link react-native-ringer-mode`

## Usage

```javascript
import RingerMode from 'react-native-ringer-mode';

// getRingerMode is a static async function
// resolves the ringer mode as a string of the android device
// "NORMAL" || "SILENT" || "VIBRATE"
// RINGER_MODE_NORMAL, RINGER_MODE_SILENT, RINGER_MODE_VIBRATE

const Modes = { SILENT: 0, VIBRATE: 1, NORMAL: 2 };

// Get the value like this
const mode = await RingerMode.getRingerMode();

// Another way to use it
RingerMode.getRingerMode().then((mode) => {
  console.log(mode);
});

// Set ringer mode
const setMode = await RingerMode.setRingerMode(Modes.VIBRATE);
```

[Example code](https://github.com/ryhnnl/rn-experimental/blob/65e4fa039567f8d5f375e27bd077f2f47f9c2613/src/screens/RingerModeExp.js#L47)
