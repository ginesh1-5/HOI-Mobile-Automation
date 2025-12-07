import { logger } from './logger';

export class Reporter {
  /**
   * Add step to Allure report
   */
  static addStep(name: string, status: 'passed' | 'failed' | 'broken' | 'skipped' = 'passed'): void {
    logger.info(`Step: ${name} - ${status}`);
  }

  /**
   * Add screenshot to report
   */
  static async addScreenshot(name: string): Promise<void> {
    try {
      const screenshot = await browser.takeScreenshot();
      logger.debug(`Screenshot captured: ${name}`);
    } catch (error) {
      logger.error(`Failed to add screenshot: ${error}`);
    }
  }
}
