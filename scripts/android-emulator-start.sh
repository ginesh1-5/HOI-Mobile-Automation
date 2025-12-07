#!/bin/bash

# Start Android Emulator
# Usage: ./scripts/android-emulator-start.sh [avd_name]

AVD_NAME=${1:-"Pixel_9_API_Baklava"}

echo "Starting Android emulator: $AVD_NAME"

# Check if emulator is already running
if pgrep -f "emulator.*$AVD_NAME" > /dev/null; then
    echo "Emulator $AVD_NAME is already running"
    exit 0
fi

# Start emulator
emulator -avd "$AVD_NAME" -no-snapshot-load &

# Wait for emulator to boot
echo "Waiting for emulator to boot..."
adb wait-for-device

# Wait for device to be ready
echo "Waiting for device to be ready..."
timeout=60
counter=0
while [ $counter -lt $timeout ]; do
    if adb shell getprop sys.boot_completed | grep -q "1"; then
        echo "Emulator is ready"
        exit 0
    fi
    sleep 1
    counter=$((counter + 1))
done

echo "Emulator did not become ready within $timeout seconds"
exit 1

