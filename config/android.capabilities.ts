import { Capabilities } from '@wdio/types';
import * as path from 'path';

export const androidCapabilities: Capabilities.AppiumCapabilities = {
  'platformName': 'Android',
  'appium:platformVersion': '15.0',
  'appium:deviceName': 'Android Emulator',
  'appium:app': path.join(__dirname, '../apps/android/hoi-app-dev.apk'),
  'appium:appPackage': 'com.hoiconsumer',
  'appium:appActivity': 'com.hoiconsumer.MainActivity',
  'appium:automationName': 'UiAutomator2',
  
  // Timeout configurations
  'appium:newCommandTimeout': 600,              // Maximum time to wait for a new command (10 minutes)
  'appium:appWaitActivity': '*.MainActivity',  // Activity to wait for
  'appium:appWaitDuration': 60000,             // Time to wait for app to start (1 minute)
  'appium:uiautomator2ServerLaunchTimeout': 120000, // Timeout for UiAutomator2 server (2 minutes)
  'appium:uiautomator2ServerInstallTimeout': 120000, // Timeout for server installation (2 minutes)
  
  // App behavior
  'appium:autoGrantPermissions': true,         // Automatically grant permissions
  'appium:noReset': false,                      // Don't reset app state before session
  'appium:fullReset': false,                    // Don't uninstall app before session
  'appium:dontStopAppOnReset': false,          // Stop app on reset
  
  // Performance and stability
  'appium:skipServerInstallation': false,      // Install UiAutomator2 server
  'appium:skipUnlock': false,                   // Skip device unlock
  'appium:unlockType': 'pin',                   // Unlock type
  'appium:unlockKey': undefined,                // Unlock key if needed
  
  // Additional settings
  'appium:disableIdLocatorAutocompletion': false,
  'appium:shouldUseCompactResponses': true,
  'appium:elementResponseAttributes': 'name,text,rect,enabled,displayed',
  
  // Network and system
  'appium:systemPort': undefined,              // System port (auto-assigned if undefined)
  'appium:remoteAppsCacheLimit': 10,
  
  // Logging
  'appium:enablePerformanceLogging': false,
  'appium:androidInstallTimeout': 90000,      // App installation timeout (1.5 minutes)
  
  // Device settings
  'appium:ignoreHiddenApiPolicyError': true,
  'appium:ignoreUnimportantViews': false,
  
  // Optional: For better element finding
  'appium:waitForIdleTimeout': 0,
  'appium:actionAcknowledgmentTimeout': 3000,
  'appium:keyInjectionDelay': 0,
  'appium:scrollAcknowledgmentTimeout': 200
} as Capabilities.AppiumCapabilities;

export const getAndroidCapabilities = (overrides?: Partial<Capabilities.AppiumCapabilities>): Capabilities.AppiumCapabilities => {
  return { ...androidCapabilities, ...overrides };
};

