#!/bin/bash

# Start iOS Simulator
# Usage: ./scripts/ios-simulator-start.sh [device_name] [os_version]

DEVICE_NAME=${1:-"iPhone 14"}
OS_VERSION=${2:-"16.0"}

echo "Starting iOS Simulator: $DEVICE_NAME ($OS_VERSION)"

# List available simulators
echo "Available simulators:"
xcrun simctl list devices available | grep "$DEVICE_NAME"

# Boot simulator
DEVICE_UDID=$(xcrun simctl list devices available | grep "$DEVICE_NAME" | grep "$OS_VERSION" | head -1 | grep -oE '\([A-F0-9-]+\)' | sed 's/[()]//g')

if [ -z "$DEVICE_UDID" ]; then
    echo "Device $DEVICE_NAME ($OS_VERSION) not found"
    echo "Creating simulator..."
    xcrun simctl create "$DEVICE_NAME" "iPhone 14" "iOS$OS_VERSION"
    DEVICE_UDID=$(xcrun simctl list devices available | grep "$DEVICE_NAME" | grep "$OS_VERSION" | head -1 | grep -oE '\([A-F0-9-]+\)' | sed 's/[()]//g')
fi

if [ -z "$DEVICE_UDID" ]; then
    echo "Failed to find or create simulator"
    exit 1
fi

# Boot the simulator
echo "Booting simulator: $DEVICE_UDID"
xcrun simctl boot "$DEVICE_UDID"

# Open Simulator app
open -a Simulator

# Wait for simulator to be ready
echo "Waiting for simulator to be ready..."
sleep 10

echo "iOS Simulator is ready"

