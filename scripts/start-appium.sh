#!/bin/bash

# Start Appium Server
# Usage: ./scripts/start-appium.sh [port]

PORT=${1:-4723}

echo "Starting Appium server on port $PORT..."

# Check if Appium is already running
if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null ; then
    echo "Appium is already running on port $PORT"
    exit 0
fi

# Start Appium server
appium --port $PORT --log-level info --log ./reports/appium.log &

# Wait for Appium to start
echo "Waiting for Appium to start..."
sleep 5

# Check if Appium started successfully
if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null ; then
    echo "Appium server started successfully on port $PORT"
    echo "Logs available at ./reports/appium.log"
else
    echo "Failed to start Appium server"
    exit 1
fi

