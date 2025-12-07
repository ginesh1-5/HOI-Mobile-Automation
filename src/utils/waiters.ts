import { logger } from './logger';
import { TestData } from '../fixtures/test-data';

export class Waiters {
  /**
   * Wait for element to be present
   */
  static async waitForElementPresent(
    element: any,
    timeout?: number,
    interval?: number
  ): Promise<boolean> {
    const waitTimeout = timeout || TestData.waitTimes.elementWait;
    const waitInterval = interval || TestData.waitTimes.scrollInterval;
    const startTime = Date.now();
    
    while (Date.now() - startTime < waitTimeout) {
      try {
        if (await element.isExisting()) {
          return true;
        }
      } catch {
        // Element not found, continue waiting
      }
      await browser.pause(waitInterval);
    }
    
    logger.warn(`Element not present after ${waitTimeout}ms`);
    return false;
  }

  /**
   * Wait for element to be displayed
   */
  static async waitForElementDisplayed(
    element: any,
    timeout?: number,
    interval?: number
  ): Promise<boolean> {
    const waitTimeout = timeout || TestData.waitTimes.elementWait;
    const waitInterval = interval || TestData.waitTimes.scrollInterval;
    const startTime = Date.now();
    
    while (Date.now() - startTime < waitTimeout) {
      try {
        if (await element.isDisplayed()) {
          return true;
        }
      } catch {
        // Element not displayed, continue waiting
      }
      await browser.pause(waitInterval);
    }
    
    logger.warn(`Element not displayed after ${waitTimeout}ms`);
    return false;
  }

  /**
   * Wait for element text to match
   */
  static async waitForText(
    element: any,
    expectedText: string,
    timeout?: number,
    interval?: number
  ): Promise<boolean> {
    const waitTimeout = timeout || TestData.waitTimes.elementWait;
    const waitInterval = interval || TestData.waitTimes.scrollInterval;
    const startTime = Date.now();
    
    while (Date.now() - startTime < waitTimeout) {
      try {
        const actualText = await element.getText();
        if (actualText.includes(expectedText)) {
          return true;
        }
      } catch {
        // Element not found or error, continue waiting
      }
      await browser.pause(waitInterval);
    }
    
    logger.warn(`Text '${expectedText}' not found after ${waitTimeout}ms`);
    return false;
  }

  /**
   * Wait for condition to be true
   */
  static async waitForCondition(
    condition: () => Promise<boolean>,
    timeout?: number,
    interval?: number,
    errorMessage?: string
  ): Promise<boolean> {
    const waitTimeout = timeout || TestData.waitTimes.elementWait;
    const waitInterval = interval || TestData.waitTimes.scrollInterval;
    const startTime = Date.now();
    
    while (Date.now() - startTime < waitTimeout) {
      try {
        if (await condition()) {
          return true;
        }
      } catch (error) {
        logger.debug(`Condition check failed: ${error}`);
      }
      await browser.pause(waitInterval);
    }
    
    const message = errorMessage || `Condition not met after ${waitTimeout}ms`;
    logger.warn(message);
    return false;
  }
}
