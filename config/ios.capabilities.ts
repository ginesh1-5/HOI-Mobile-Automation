import { Capabilities } from '@wdio/types';
import * as path from 'path';

export const iosCapabilities: Capabilities.AppiumCapabilities = {
  platformName: 'iOS',
  'appium:platformVersion': '16.0',
  'appium:deviceName': 'iPhone 14',
  'appium:app': path.join(__dirname, '../apps/ios/hoi-app-dev.app'),
  'appium:automationName': 'XCUITest',
  'appium:newCommandTimeout': 300,
  'appium:noReset': false,
  'appium:fullReset': false,
  'appium:autoAcceptAlerts': true,
  'appium:waitForQuiescence': false,
  'appium:shouldUseTestManagerForVisibilityDetection': false
};

export const getIOSCapabilities = (overrides?: Partial<Capabilities.AppiumCapabilities>): Capabilities.AppiumCapabilities => {
  return { ...iosCapabilities, ...overrides };
};

