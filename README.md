# react-native-ringer-mode

## Getting started

### Install with git

`$ npm install git+... --save`

### Link

`$ react-native link react-native-ringer-mode`

## Usage
```javascript
import RingerMode from 'react-native-ringer-mode';

// getRingerMode is a static async function
// resolves the ringer mode as a string of the android device
// "NORMAL" || "SILENT" || "VIBRATE"
// RINGER_MODE_NORMAL, RINGER_MODE_SILENT, RINGER_MODE_VIBRATE
// rejects "DEFAULT"

// Get the value like this
var mode = await RingerMode.getRingerMode();

// Another way to use it
RingerMode.getRingerMode()
.then(mode => {
    console.log(mode)
});

```
  