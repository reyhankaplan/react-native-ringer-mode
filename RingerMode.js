
import { NativeModules } from 'react-native';

import Utils from './utils';

const RNRingerMode = NativeModules.RNRingerMode;

export default class RingerMode {
	static async getRingerMode() {
		if (Utils.isAndroid === true)
			return await RNRingerMode.getRingerMode();
		return null;
	}
}
