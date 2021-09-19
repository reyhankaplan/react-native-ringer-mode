
package com.reactlibrary;

import android.media.AudioManager;
import android.content.Context;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

public class RNRingerMode extends ReactContextBaseJavaModule {

	private String TAG = RNRingerMode.class.getSimpleName();
	private static final String VOL_VOICE_CALL = "call";
	private static final String VOL_SYSTEM = "system";
	private static final String VOL_RING = "ring";
	private static final String VOL_MUSIC = "music";
	private static final String VOL_ALARM = "alarm";
	private static final String VOL_NOTIFICATION = "notification";
	
	private final ReactApplicationContext reactContext;
	private AudioManager am;

	public RNRingerMode(ReactApplicationContext reactContext) {
		super(reactContext);
		this.reactContext = reactContext;
		am = (AudioManager) reactContext.getApplicationContext().getSystemService(Context.AUDIO_SERVICE);
	}

	@Override
	public String getName() {
		return this.TAG;
	}

	@ReactMethod
	public void getRingerMode(Promise promise) {
		int mode = am.getRingerMode();
		switch(mode) {
			case AudioManager.RINGER_MODE_SILENT:
				promise.resolve("SILENT");
				break;
			case AudioManager.RINGER_MODE_NORMAL:
				promise.resolve("NORMAL");
				break;
			case AudioManager.RINGER_MODE_VIBRATE:
				promise.resolve("VIBRATE");
				break;
		}
	}

	@ReactMethod
	public void setRingerMode(int mode, Promise promise) {
		switch(mode) {
			case AudioManager.RINGER_MODE_SILENT:
				try {
					am.setRingerMode(AudioManager.RINGER_MODE_SILENT);
					promise.resolve(AudioManager.RINGER_MODE_SILENT);
				} catch(Exception e) {
					promise.reject(e);
				} finally{
					break;
				}
			case AudioManager.RINGER_MODE_NORMAL:
				try {
					am.setRingerMode(AudioManager.RINGER_MODE_NORMAL);
					promise.resolve(AudioManager.RINGER_MODE_NORMAL);
				} catch(Exception e) {
					promise.reject(e);
				} finally{
					break;
				}
			case AudioManager.RINGER_MODE_VIBRATE:
				try {
					am.setRingerMode(AudioManager.RINGER_MODE_VIBRATE);
					promise.resolve(AudioManager.RINGER_MODE_VIBRATE);
				} catch(Exception e) {
					promise.reject(e);
				} finally{
					break;
				}
		}
	}
}