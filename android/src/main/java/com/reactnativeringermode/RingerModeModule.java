package com.reactnativeringermode;

import androidx.annotation.NonNull;

import java.util.Map;
import java.util.HashMap;

import android.os.Build;
import android.app.NotificationManager;
import android.app.Activity;
import android.media.AudioManager;
import android.content.Context;
import android.content.Intent;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

@ReactModule(name = RingerModeModule.NAME)
public class RingerModeModule extends ReactContextBaseJavaModule {
    public static final String NAME = "RingerMode";

    private AudioManager am;
    private final ReactApplicationContext reactContext;

    public RingerModeModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;

        am = (AudioManager) reactContext.getApplicationContext().getSystemService(Context.AUDIO_SERVICE);
    }

    @Override
    @NonNull
    public String getName() {
        return NAME;
    }

    @ReactMethod
    public void getRingerMode(Promise promise) {
      int mode = am.getRingerMode();
      promise.resolve(mode);
    }

    private boolean hasDndAccess() {
      NotificationManager nm = (NotificationManager) reactContext.getSystemService(Context.NOTIFICATION_SERVICE);
      return (Build.VERSION.SDK_INT < Build.VERSION_CODES.M) || nm.isNotificationPolicyAccessGranted();
    }

    @ReactMethod
    public void checkDndAccess(Promise promise) {
      promise.resolve(hasDndAccess());
    }

    @ReactMethod
    public void requestDndAccess(Promise promise) {
      if (!hasDndAccess() && reactContext.hasCurrentActivity()) {
          Intent intent = new Intent(
                              android.provider.Settings
                              .ACTION_NOTIFICATION_POLICY_ACCESS_SETTINGS);
          intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

          Context context = reactContext.getCurrentActivity().getApplicationContext();
          context.startActivity(intent);
          promise.resolve(true);
      }

      promise.resolve(false);
    }

    @ReactMethod
    public void setRingerMode(int mode, Promise promise) {
      try {
        am.setRingerMode(mode);

        promise.resolve(mode);
      } catch (Exception err) {
        promise.reject(err);
      }
    }
}
