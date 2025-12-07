import { logger } from '../utils/logger';

export const hooks = {
  /**
   * Before suite hook
   */
  beforeSuite: function (suite: any) {
    logger.info(`Starting suite: ${suite.title}`);
  },

  /**
   * After suite hook
   */
  afterSuite: function (suite: any) {
    logger.info(`Completed suite: ${suite.title}`);
  },

  /**
   * Before test hook
   */
  beforeTest: function (test: any) {
    logger.info(`Starting test: ${test.title}`);
  },

  /**
   * After test hook
   */
  afterTest: function (test: any, context: any, result: any) {
    const status = result.passed ? 'passed' : 'failed';
    logger.info(`Test ${status}: ${test.title}`);
  },

  /**
   * On error hook
   */
  onError: function (error: Error) {
    logger.error(`Test error: ${error.message}`);
  }
};
