#!/bin/bash

# Cleanup script for test artifacts
# Usage: ./scripts/cleanup.sh

echo "Cleaning up test artifacts..."

# Remove allure results
if [ -d "reports/allure-results" ]; then
    rm -rf reports/allure-results/*
    echo "Cleaned allure-results"
fi

# Remove allure reports
if [ -d "reports/allure-report" ]; then
    rm -rf reports/allure-report/*
    echo "Cleaned allure-report"
fi

# Remove screenshots
if [ -d "reports/screenshots" ]; then
    rm -rf reports/screenshots/*
    echo "Cleaned screenshots"
fi

# Remove appium logs
if [ -f "reports/appium.log" ]; then
    rm -f reports/appium.log
    echo "Cleaned appium.log"
fi

# Remove node modules cache
if [ -d "node_modules/.cache" ]; then
    rm -rf node_modules/.cache
    echo "Cleaned node_modules cache"
fi

echo "Cleanup completed"

