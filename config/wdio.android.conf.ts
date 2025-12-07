import type { Options } from '@wdio/types';
import { androidCapabilities } from './android.capabilities';
import { devConfig } from './environments/dev';
import { stageConfig } from './environments/uat';
import { prodConfig } from './environments/prod';

const getEnvironmentConfig = () => {
  const env = process.env.ENV || 'dev';
  switch (env) {
    case 'uat':
    case 'stage':
      return stageConfig;
    case 'prod':
      return prodConfig;
    default:
      return devConfig;
  }
};

export const config: Options.Testrunner = {
  // Runner configuration
  runner: 'local',
  path: '/',
  port: 4723,
  
  // Test specifications
  specs: [
    './src/tests/**/*.spec.ts'
  ],
  
  exclude: [],
  
  // Capabilities
  maxInstances: 1,
  capabilities: [androidCapabilities],
  
  // Logging
  logLevel: 'info',
  
  // Bail configuration
  bail: 0,
  
  // Base URL
  baseUrl: getEnvironmentConfig().baseUrl,
  
  // Timeouts - All timeouts in milliseconds
  waitforTimeout: 30000,              // Default wait timeout for waitFor* commands
  connectionRetryTimeout: 180000,     // Timeout for connection retries (3 minutes)
  connectionRetryCount: 3,            // Number of connection retries
  
  // Appium service configuration
  services: [
    ['appium', {
      args: {
        address: 'localhost',
        port: 4723,
        relaxedSecurity: true,
        logLevel: 'info',
        sessionOverride: true,
        keepAliveTimeout: 600
      },
      logPath: './reports/appium-logs/',
      command: 'appium'
    }]
  ],
  
  // Framework configuration
  framework: 'mocha',
  
  // Reporters
  reporters: [
    'spec',
    ['allure', {
      outputDir: 'reports/allure-results',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: false,
      addConsoleLogs: true
    }]
  ],
  
  // Mocha options
  mochaOpts: {
    ui: 'bdd',
    timeout: 300000,                  // Test timeout: 5 minutes
    retries: getEnvironmentConfig().retries,
    grep: process.env.MOCHA_GREP || undefined
  },
  
  // Hooks
  before: function (capabilities, specs) {
    // Global setup before all tests
    console.log('Starting Android test execution...');
    console.log(`Environment: ${process.env.ENV || 'dev'}`);
    console.log(`App Package: ${androidCapabilities['appium:appPackage']}`);
  },
  
  after: function (result, capabilities, specs) {
    // Global teardown after all tests
    console.log('Android test execution completed');
  },
  
  beforeTest: function (test, context) {
    // Setup before each test
    console.log(`Starting test: ${test.title}`);
  },
  
  afterTest: function (test, context, { error, result, duration, passed, retries }) {
    // Cleanup after each test
    const status = passed ? 'PASSED' : 'FAILED';
    console.log(`Test ${status}: ${test.title} (Duration: ${duration}ms)`);
    
    if (!passed) {
      // Take screenshot on failure
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const screenshotPath = `./reports/screenshots/failure-${test.title.replace(/\s+/g, '-')}-${timestamp}.png`;
      browser.saveScreenshot(screenshotPath).catch(err => {
        console.log(`Failed to save screenshot: ${err}`);
      });
    }
  },
  
  beforeSuite: function (suite) {
    // Setup before each suite
    console.log(`Starting suite: ${suite.title}`);
  },
  
  afterSuite: function (suite) {
    // Cleanup after each suite
    console.log(`Completed suite: ${suite.title}`);
  },
  
  beforeHook: function (test, context) {
    // Setup before each hook
  },
  
  afterHook: function (test, context, result) {
    // Cleanup after each hook
  },
  
  onComplete: function (exitCode, config, capabilities, results) {
    // Final cleanup
    console.log('========================================');
    console.log('Test Execution Summary:');
    console.log(`Total Tests: ${results.tests}`);
    console.log(`Passed: ${results.passes}`);
    console.log(`Failed: ${results.failures}`);
    console.log(`Duration: ${results.duration}ms`);
    console.log('========================================');
  },
  
  // Additional WebdriverIO options
  outputDir: './reports/logs',
  
  // Performance logging
  logLevels: {
    webdriver: 'info',
    '@wdio/appium-service': 'info',
    '@wdio/local-runner': 'info'
  }
};
