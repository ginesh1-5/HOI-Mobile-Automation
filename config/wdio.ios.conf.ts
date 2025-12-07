import type { Options } from '@wdio/types';
import { iosCapabilities } from './ios.capabilities';
import { devConfig } from './environments/dev';
import { qaConfig } from './environments/qa';
import { stageConfig } from './environments/uat';
import { prodConfig } from './environments/prod';

const getEnvironmentConfig = () => {
  const env = process.env.ENV || 'dev';
  switch (env) {
    case 'qa':
      return qaConfig;
    case 'stage':
      return stageConfig;
    case 'prod':
      return prodConfig;
    default:
      return devConfig;
  }
};

export const config: Options.Testrunner = {
  runner: 'local',
  path: '/',
  port: 4723,
  
  specs: [
    './src/tests/**/*.spec.ts'
  ],
  
  exclude: [],
  
  maxInstances: 1,
  
  capabilities: [iosCapabilities],
  
  logLevel: 'info',
  
  bail: 0,
  
  baseUrl: getEnvironmentConfig().baseUrl,
  
  waitforTimeout: 10000,
  
  connectionRetryTimeout: 120000,
  
  connectionRetryCount: 3,
  
  services: [
    ['appium', {
      args: {
        address: 'localhost',
        port: 4723,
        relaxedSecurity: true
      },
      logPath: './reports/'
    }]
  ],
  
  framework: 'mocha',
  
  reporters: [
    'spec',
    ['allure', {
      outputDir: 'reports/allure-results',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: false
    }]
  ],
  
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
    retries: getEnvironmentConfig().retries
  },
  
  before: function (capabilities, specs) {
    // Global setup
  },
  
  after: function (result, capabilities, specs) {
    // Global teardown
  },
  
  beforeTest: function (test, context) {
    // Test setup
  },
  
  afterTest: function (test, context, { error, result, duration, passed, retries }) {
    if (!passed) {
      // Take screenshot on failure
      browser.takeScreenshot();
    }
  },
  
  onComplete: function (exitCode, config, capabilities, results) {
    // Final cleanup
  }
};

