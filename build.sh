#!/usr/bin/env bash
# Builds a signed APK without Gradle, using the Android build tools directly.
# Requires: JDK 8+, Android build-tools (aapt2, dx or d8, zipalign, apksigner)
# and an android.jar platform (API 23+). On Ubuntu/Debian:
#   sudo apt-get install android-sdk-build-tools android-sdk-platform-23
set -euo pipefail
cd "$(dirname "$0")"

SDK="${ANDROID_HOME:-/usr/lib/android-sdk}"
BT="${BUILD_TOOLS:-$(ls -d "$SDK"/build-tools/[0-9]* | sort -V | tail -1)}"
PLATFORM="${ANDROID_JAR:-$(ls -d "$SDK"/platforms/android-*/android.jar | sort -V | tail -1)}"
VERSION_CODE="${VERSION_CODE:-1}"
VERSION_NAME="${VERSION_NAME:-1.0}"
KEYSTORE="${KEYSTORE:-keystore/medicalspanish.jks}"
KS_PASS="${KS_PASS:-medicalspanish}"

OUT=build
rm -rf "$OUT" && mkdir -p "$OUT/res" "$OUT/classes" "$OUT/gen"

echo "Using build-tools: $BT"
echo "Using platform:    $PLATFORM"

# 1. Resources
"$BT/aapt2" compile --dir app/res -o "$OUT/res"
"$BT/aapt2" link -o "$OUT/unsigned.apk" -I "$PLATFORM" \
  --manifest app/AndroidManifest.xml -A app/assets \
  --min-sdk-version 21 --target-sdk-version 34 \
  --version-code "$VERSION_CODE" --version-name "$VERSION_NAME" \
  --java "$OUT/gen" "$OUT"/res/*.flat

# 2. Java -> dex
javac -nowarn -Xlint:-options -source 8 -target 8 -bootclasspath "$PLATFORM" \
  -d "$OUT/classes" $(find app/src "$OUT/gen" -name '*.java')
if [ -x "$BT/d8" ]; then
  "$BT/d8" --min-api 21 --lib "$PLATFORM" --output "$OUT" $(find "$OUT/classes" -name '*.class')
else
  "$BT/dx" --dex --output="$OUT/classes.dex" "$OUT/classes"
fi
(cd "$OUT" && zip -q unsigned.apk classes.dex)

# 3. Align and sign
"$BT/zipalign" -f -p 4 "$OUT/unsigned.apk" "$OUT/aligned.apk"
if [ ! -f "$KEYSTORE" ]; then
  mkdir -p "$(dirname "$KEYSTORE")"
  keytool -genkeypair -keystore "$KEYSTORE" -storepass "$KS_PASS" -keypass "$KS_PASS" \
    -alias medicalspanish -keyalg RSA -keysize 2048 -validity 10000 \
    -dname "CN=Medical Spanish, O=In-house, C=US"
fi
"$BT/apksigner" sign --ks "$KEYSTORE" --ks-pass "pass:$KS_PASS" \
  --out MedicalSpanish.apk "$OUT/aligned.apk"
"$BT/apksigner" verify MedicalSpanish.apk
echo "Built $(pwd)/MedicalSpanish.apk ($(du -h MedicalSpanish.apk | cut -f1))"
