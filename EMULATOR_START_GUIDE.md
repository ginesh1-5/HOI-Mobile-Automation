# Android Emulator Start Guide

## Issue Found and Fixed

**Problem:** The startup script was looking for `Pixel_5_API_33` which doesn't exist on your system.

**Solution:** Updated script to use `Medium_Phone_API_35` as the default AVD.

## Available AVDs on Your System

- `Pixel_9_API_Baklava` (Default - Currently running)
- `Medium_Phone_API_35` (API 35)
- `Pixel_9_Pro_API_36` (API 36)

## How to Start Emulator

### Option 1: Using the Script (Recommended)
```bash
./scripts/android-emulator-start.sh
```

Or specify a different AVD:
```bash
./scripts/android-emulator-start.sh Medium_Phone_API_35
./scripts/android-emulator-start.sh Pixel_9_API_Baklava
./scripts/android-emulator-start.sh Pixel_9_Pro_API_36
```

### Option 2: Direct Command
```bash
emulator -avd Medium_Phone_API_35 -no-snapshot-load
```

### Option 3: With Options (Faster Boot)
```bash
emulator -avd Medium_Phone_API_35 \
  -no-snapshot-load \
  -no-window \
  -gpu swiftshader_indirect \
  -noaudio \
  -no-boot-anim \
  -accel on
```

## Check Emulator Status

### List Running Devices
```bash
adb devices
```

### List Available AVDs
```bash
emulator -list-avds
```

### Check if Emulator is Running
```bash
adb shell getprop sys.boot_completed
# Should return: 1
```

## Troubleshooting

### Emulator Won't Start

1. **Check if another emulator is running:**
   ```bash
   adb devices
   ```

2. **Kill existing emulator:**
   ```bash
   adb emu kill
   ```

3. **Check Android SDK:**
   ```bash
   echo $ANDROID_HOME
   # Should show: /Users/xts/Library/Android/sdk
   ```

4. **Verify emulator command:**
   ```bash
   which emulator
   # Should show: /Users/xts/Library/Android/sdk/emulator/emulator
   ```

### Emulator Takes Too Long to Boot

Use optimized options:
```bash
emulator -avd Medium_Phone_API_35 \
  -no-snapshot-load \
  -no-window \
  -gpu swiftshader_indirect \
  -noaudio \
  -no-boot-anim \
  -accel on
```

### Port Already in Use

If you get "port already in use" error:
```bash
# Kill all emulator processes
pkill -f emulator

# Or kill specific port
lsof -ti:5554 | xargs kill -9
```

## Current Configuration

- **ANDROID_HOME:** `/Users/xts/Library/Android/sdk`
- **Default AVD:** `Pixel_9_API_Baklava`
- **Running Emulator:** `Pixel_9_API_Baklava` (emulator-5554)

## For GitHub Actions

The workflows use `reactivecircus/android-emulator-runner@v2` which automatically:
- Creates and starts the emulator
- Uses API level 33 with pixel_4 profile
- Applies optimizations automatically

No manual emulator start needed in CI/CD.

