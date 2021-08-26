{
  "presets": ["react-native"]
}
[android]
  target = Google Inc.:Google APIs:23

[maven_repositories]
  central = https://repo1.maven.org/maven2
[ignore]
; We fork some components by platform
.*/*[.]android.js

; Ignore "BUCK" generated dirs
<PROJECT_ROOT>/\.buckd/

; Ignore unexpected extra "@providesModule"
.*/node_modules/.*/node_modules/fbjs/.*

; Ignore duplicate module providers
; For RN Apps installed via npm, "Libraries" folder is inside
; "node_modules/react-native" but in the source repo it is in the root
.*/Libraries/react-native/React.js
.*/Libraries/react-native/ReactNative.js

[include]

[libs]
node_modules/react-native/Libraries/react-native/react-native-interface.js
node_modules/react-native/flow
flow/

[options]
emoji=true

module.system=haste

experimental.strict_type_args=true

munge_underscores=true

module.name_mapper='^[./a-zA-Z0-9$_-]+\.\(bmp\|gif\|jpg\|jpeg\|png\|psd\|svg\|webp\|m4v\|mov\|mp4\|mpeg\|mpg\|webm\|aac\|aiff\|caf\|m4a\|mp3\|wav\|html\|pdf\)$' -> 'RelativeImageStub'

suppress_type=$FlowIssue
suppress_type=$FlowFixMe
suppress_type=$FixMe

suppress_comment=\\(.\\|\n\\)*\\$FlowFixMe\\($\\|[^(]\\|(\\(>=0\\.\\(4[0-2]\\|[1-3][0-9]\\|[0-9]\\).[0-9]\\)? *\\(site=[a-z,_]*react_native[a-z,_]*\\)?)\\)
suppress_comment=\\(.\\|\n\\)*\\$FlowIssue\\((\\(>=0\\.\\(4[0-2]\\|[1-3][0-9]\\|[0-9]\\).[0-9]\\)? *\\(site=[a-z,_]*react_native[a-z,_]*\\)?)\\)?:? #[0-9]+
suppress_comment=\\(.\\|\n\\)*\\$FlowFixedInNextDeploy
suppress_comment=\\(.\\|\n\\)*\\$FlowExpectedError

unsafe.enable_getters_and_setters=true

[version]
^0.42.0
*.pbxproj -text
# OSX
#
.DS_Store

# Xcode
#
build/
*.pbxuser
!default.pbxuser
*.mode1v3
!default.mode1v3
*.mode2v3
!default.mode2v3
*.perspectivev3
!default.perspectivev3
xcuserdata
*.xccheckout
*.moved-aside
DerivedData
*.hmap
*.ipa
*.xcuserstate
project.xcworkspace

# Android/IntelliJ
#
build/
.idea
.gradle
local.properties
*.iml

# node.js
#
node_modules/
npm-debug.log
yarn-error.log

# BUCK
buck-out/
\.buckd/
*.keystore

# fastlane
#
# It is recommended to not store the screenshots in the git repo. Instead, use fastlane to re-generate the
# screenshots whenever they are needed.
# For more information about the recommended setup visit:
# https://github.com/fastlane/fastlane/blob/master/fastlane/docs/Gitignore.md

fastlane/report.xml
fastlane/Preview.html
fastlane/screenshots
{}
import 'react-native';
import React from 'react';
import Index from '../index.android.js';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <Index />
  );
});
import 'react-native';
import React from 'react';
import Index from '../index.ios.js';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <Index />
  );
});
# To learn about Buck see [Docs](https://buckbuild.com/).
# To run your application with Buck:
# - install Buck
# - `npm start` - to start the packager
# - `cd android`
# - `keytool -genkey -v -keystore keystores/debug.keystore -storepass android -alias androiddebugkey -keypass android -dname "CN=Android Debug,O=Android,C=US"`
# - `./gradlew :app:copyDownloadableDepsToLibs` - make all Gradle compile dependencies available to Buck
# - `buck install -r android/app` - compile, install and run application
#

lib_deps = []

for jarfile in glob(['libs/*.jar']):
  name = 'jars__' + jarfile[jarfile.rindex('/') + 1: jarfile.rindex('.jar')]
  lib_deps.append(':' + name)
  prebuilt_jar(
    name = name,
    binary_jar = jarfile,
  )

for aarfile in glob(['libs/*.aar']):
  name = 'aars__' + aarfile[aarfile.rindex('/') + 1: aarfile.rindex('.aar')]
  lib_deps.append(':' + name)
  android_prebuilt_aar(
    name = name,
    aar = aarfile,
  )

android_library(
    name = "all-libs",
    exported_deps = lib_deps,
)

android_library(
    name = "app-code",
    srcs = glob([
        "src/main/java/**/*.java",
    ]),
    deps = [
        ":all-libs",
        ":build_config",
        ":res",
    ],
)

android_build_config(
    name = "build_config",
    package = "com.todo",
)

android_resource(
    name = "res",
    package = "com.todo",
    res = "src/main/res",
)

android_binary(
    name = "app",
    keystore = "//android/keystores:debug",
    manifest = "src/main/AndroidManifest.xml",
    package_type = "debug",
    deps = [
        ":app-code",
    ],
)
apply plugin: "com.android.application"

import com.android.build.OutputFile

/**
 * The react.gradle file registers a task for each build variant (e.g. bundleDebugJsAndAssets
 * and bundleReleaseJsAndAssets).
 * These basically call `react-native bundle` with the correct arguments during the Android build
 * cycle. By default, bundleDebugJsAndAssets is skipped, as in debug/dev mode we prefer to load the
 * bundle directly from the development server. Below you can see all the possible configurations
 * and their defaults. If you decide to add a configuration block, make sure to add it before the
 * `apply from: "../../node_modules/react-native/react.gradle"` line.
 *
 * project.ext.react = [
 *   // the name of the generated asset file containing your JS bundle
 *   bundleAssetName: "index.android.bundle",
 *
 *   // the entry file for bundle generation
 *   entryFile: "index.android.js",
 *
 *   // whether to bundle JS and assets in debug mode
 *   bundleInDebug: false,
 *
 *   // whether to bundle JS and assets in release mode
 *   bundleInRelease: true,
 *
 *   // whether to bundle JS and assets in another build variant (if configured).
 *   // See http://tools.android.com/tech-docs/new-build-system/user-guide#TOC-Build-Variants
 *   // The configuration property can be in the following formats
 *   //         'bundleIn${productFlavor}${buildType}'
 *   //         'bundleIn${buildType}'
 *   // bundleInFreeDebug: true,
 *   // bundleInPaidRelease: true,
 *   // bundleInBeta: true,
 *
 *   // the root of your project, i.e. where "package.json" lives
 *   root: "../../",
 *
 *   // where to put the JS bundle asset in debug mode
 *   jsBundleDirDebug: "$buildDir/intermediates/assets/debug",
 *
 *   // where to put the JS bundle asset in release mode
 *   jsBundleDirRelease: "$buildDir/intermediates/assets/release",
 *
 *   // where to put drawable resources / React Native assets, e.g. the ones you use via
 *   // require('./image.png')), in debug mode
 *   resourcesDirDebug: "$buildDir/intermediates/res/merged/debug",
 *
 *   // where to put drawable resources / React Native assets, e.g. the ones you use via
 *   // require('./image.png')), in release mode
 *   resourcesDirRelease: "$buildDir/intermediates/res/merged/release",
 *
 *   // by default the gradle tasks are skipped if none of the JS files or assets change; this means
 *   // that we don't look at files in android/ or ios/ to determine whether the tasks are up to
 *   // date; if you have any other folders that you want to ignore for performance reasons (gradle
 *   // indexes the entire tree), add them here. Alternatively, if you have JS files in android/
 *   // for example, you might want to remove it from here.
 *   inputExcludes: ["android/**", "ios/**"],
 *
 *   // override which node gets called and with what additional arguments
 *   nodeExecutableAndArgs: ["node"],
 *
 *   // supply additional arguments to the packager
 *   extraPackagerArgs: []
 * ]
 */

apply from: "../../node_modules/react-native/react.gradle"

/**
 * Set this to true to create two separate APKs instead of one:
 *   - An APK that only works on ARM devices
 *   - An APK that only works on x86 devices
 * The advantage is the size of the APK is reduced by about 4MB.
 * Upload all the APKs to the Play Store and people will download
 * the correct one based on the CPU architecture of their device.
 */
def enableSeparateBuildPerCPUArchitecture = false

/**
 * Run Proguard to shrink the Java bytecode in release builds.
 */
def enableProguardInReleaseBuilds = false

android {
    compileSdkVersion 23
    buildToolsVersion "23.0.1"

    defaultConfig {
        applicationId "com.todo"
        minSdkVersion 16
        targetSdkVersion 22
        versionCode 1
        versionName "1.0"
        ndk {
            abiFilters "armeabi-v7a", "x86"
        }
    }
    splits {
        abi {
            reset()
            enable enableSeparateBuildPerCPUArchitecture
            universalApk false  // If true, also generate a universal APK
            include "armeabi-v7a", "x86"
        }
    }
    buildTypes {
        release {
            minifyEnabled enableProguardInReleaseBuilds
            proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
        }
    }
    // applicationVariants are e.g. debug, release
    applicationVariants.all { variant ->
        variant.outputs.each { output ->
            // For each separate APK per architecture, set a unique version code as described here:
            // http://tools.android.com/tech-docs/new-build-system/user-guide/apk-splits
            def versionCodes = ["armeabi-v7a":1, "x86":2]
            def abi = output.getFilter(OutputFile.ABI)
            if (abi != null) {  // null for the universal-debug, universal-release variants
                output.versionCodeOverride =
                        versionCodes.get(abi) * 1048576 + defaultConfig.versionCode
            }
        }
    }
}

dependencies {
    compile fileTree(dir: "libs", include: ["*.jar"])
    compile "com.android.support:appcompat-v7:23.0.1"
    compile "com.facebook.react:react-native:+"  // From node_modules
}

// Run this once to be able to run the application with BUCK
// puts all compile dependencies into folder libs for BUCK to use
task copyDownloadableDepsToLibs(type: Copy) {
    from configurations.compile
    into 'libs'
}
# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:

# If your project uses WebView with JS, uncomment the following
# and specify the fully qualified class name to the JavaScript interface
# class:
#-keepclassmembers class fqcn.of.javascript.interface.for.webview {
#   public *;
#}

# Disabling obfuscation is useful if you collect stack traces from production crashes
# (unless you are using a system that supports de-obfuscate the stack traces).
-dontobfuscate

# React Native

# Keep our interfaces so they can be used by other ProGuard rules.
# See http://sourceforge.net/p/proguard/bugs/466/
-keep,allowobfuscation @interface com.facebook.proguard.annotations.DoNotStrip
-keep,allowobfuscation @interface com.facebook.proguard.annotations.KeepGettersAndSetters
-keep,allowobfuscation @interface com.facebook.common.internal.DoNotStrip

# Do not strip any method/class that is annotated with @DoNotStrip
-keep @com.facebook.proguard.annotations.DoNotStrip class *
-keep @com.facebook.common.internal.DoNotStrip class *
-keepclassmembers class * {
    @com.facebook.proguard.annotations.DoNotStrip *;
    @com.facebook.common.internal.DoNotStrip *;
}

-keepclassmembers @com.facebook.proguard.annotations.KeepGettersAndSetters class * {
  void set*(***);
  *** get*();
}

-keep class * extends com.facebook.react.bridge.JavaScriptModule { *; }
-keep class * extends com.facebook.react.bridge.NativeModule { *; }
-keepclassmembers,includedescriptorclasses class * { native <methods>; }
-keepclassmembers class *  { @com.facebook.react.uimanager.UIProp <fields>; }
-keepclassmembers class *  { @com.facebook.react.uimanager.annotations.ReactProp <methods>; }
-keepclassmembers class *  { @com.facebook.react.uimanager.annotations.ReactPropGroup <methods>; }

-dontwarn com.facebook.react.**

# TextLayoutBuilder uses a non-public Android constructor within StaticLayout.
# See libs/proxy/src/main/java/com/facebook/fbui/textlayoutbuilder/proxy for details.
-dontwarn android.text.StaticLayout

# okhttp

-keepattributes Signature
-keepattributes *Annotation*
-keep class okhttp3.** { *; }
-keep interface okhttp3.** { *; }
-dontwarn okhttp3.**

# okio

-keep class sun.misc.Unsafe { *; }
-dontwarn java.nio.file.*
-dontwarn org.codehaus.mojo.animal_sniffer.IgnoreJRERequirement
-dontwarn okio.**
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.todo"
    android:versionCode="1"
    android:versionName="1.0">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW"/>

    <uses-sdk
        android:minSdkVersion="16"
        android:targetSdkVersion="22" />

    <application
      android:name=".MainApplication"
      android:allowBackup="true"
      android:label="@string/app_name"
      android:icon="@mipmap/ic_launcher"
      android:theme="@style/AppTheme">
      <activity
        android:name=".MainActivity"
        android:label="@string/app_name"
        android:configChanges="keyboard|keyboardHidden|orientation|screenSize"
        android:windowSoftInputMode="adjustResize">
        <intent-filter>
            <action android:name="android.intent.action.MAIN" />
            <category android:name="android.intent.category.LAUNCHER" />
        </intent-filter>
      </activity>
      <activity android:name="com.facebook.react.devsupport.DevSettingsActivity" />
    </application>

</manifest>
package com.todo;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "todo";
    }
}
package com.todo;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
  resources>
    <string name="app_name">React Todo</string>
</resources>
<resources>

    <!-- Base application theme. -->
    <style name="AppTheme" parent="Theme.AppCompat.Light.NoActionBar">
        <!-- Customize your theme here. -->
    </style>

</resources>


