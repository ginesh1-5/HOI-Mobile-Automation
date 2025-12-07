import { TestData } from '../fixtures/test-data';

export class CommonPage {
  // Common elements
  get loadingSpinner() { return $('~loading-spinner'); }
  get errorMessage() { return $('~error-message'); }
  get backButton() { return $('~back-button'); }
  get closeButton() { return $('~close-button'); }
  get okButton() { return $('~ok-button'); }
  get cancelButton() { return $('~cancel-button'); }

  /**
   * Wait for element to be displayed
   * @param element - Element to wait for
   * @param timeout - Optional timeout (defaults to elementWait from TestData)
   */
  async waitForElement(element: any, timeout?: number): Promise<void> {
    const waitTimeout = timeout || TestData.waitTimes.elementWait;
    await element.waitForDisplayed({ timeout: waitTimeout });
  }

  /**
   * Wait for element to disappear
   * @param element - Element to wait for
   * @param timeout - Optional timeout (defaults to elementWait from TestData)
   */
  async waitForElementToDisappear(element: any, timeout?: number): Promise<void> {
    const waitTimeout = timeout || TestData.waitTimes.elementWait;
    await element.waitForDisplayed({ timeout: waitTimeout, reverse: true });
  }

  /**
   * Tap on element
   * @param element - Element to tap
   * @param timeout - Optional timeout for waiting (defaults to elementWait from TestData)
   */
  async tapElement(element: any, timeout?: number): Promise<void> {
    await this.waitForElement(element, timeout);
    await element.click();
  }

  /**
   * Enter text in input field
   * @param element - Input element
   * @param text - Text to enter
   * @param timeout - Optional timeout for waiting (defaults to elementWait from TestData)
   */
  async enterText(element: any, text: string, timeout?: number): Promise<void> {
    await this.waitForElement(element, timeout);
    await element.clearValue();
    await element.setValue(text);
  }

  /**
   * Get element text
   * @param element - Element to get text from
   * @param timeout - Optional timeout for waiting (defaults to elementWait from TestData)
   */
  async getText(element: any, timeout?: number): Promise<string> {
    await this.waitForElement(element, timeout);
    return await element.getText();
  }

  /**
   * Check if element is displayed
   * @param element - Element to check
   * @param timeout - Optional timeout for check (defaults to short wait from TestData)
   */
  async isDisplayed(element: any, timeout?: number): Promise<boolean> {
    try {
      const checkTimeout = timeout || TestData.waitTimes.short;
      await element.waitForDisplayed({ timeout: checkTimeout });
      return await element.isDisplayed();
    } catch {
      return false;
    }
  }

  /**
   * Wait for element to be present (exists in DOM)
   * @param element - Element to wait for
   * @param timeout - Optional timeout (defaults to elementWait from TestData)
   */
  async waitForElementPresent(element: any, timeout?: number): Promise<boolean> {
    try {
      const waitTimeout = timeout || TestData.waitTimes.elementWait;
      await element.waitForExist({ timeout: waitTimeout });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Wait for element to be clickable
   * @param element - Element to wait for
   * @param timeout - Optional timeout (defaults to elementWait from TestData)
   */
  async waitForElementClickable(element: any, timeout?: number): Promise<void> {
    const waitTimeout = timeout || TestData.waitTimes.elementWait;
    await element.waitForClickable({ timeout: waitTimeout });
  }

  /**
   * Scroll to element
   * @param element - Element to scroll to
   */
  async scrollToElement(element: any): Promise<void> {
    await element.scrollIntoView();
  }

  /**
   * Wait for a specific amount of time
   * @param time - Time to wait in milliseconds (defaults to medium wait from TestData)
   */
  async wait(time?: number): Promise<void> {
    const waitTime = time || TestData.waitTimes.medium;
    await browser.pause(waitTime);
  }

  /**
   * Take screenshot
   * @param name - Screenshot name
   */
  async takeScreenshot(name: string): Promise<void> {
    await browser.saveScreenshot(`./reports/screenshots/${name}.png`);
  }

  /**
   * Wait for page to load
   * @param timeout - Optional timeout (defaults to appLoad from TestData)
   */
  async waitForPageLoad(timeout?: number): Promise<void> {
    const waitTimeout = timeout || TestData.waitTimes.appLoad;
    await browser.pause(waitTimeout);
  }

  /**
   * Wait for navigation to complete
   * @param timeout - Optional timeout (defaults to navigation from TestData)
   */
  async waitForNavigation(timeout?: number): Promise<void> {
    const waitTimeout = timeout || TestData.waitTimes.navigation;
    await browser.pause(waitTimeout);
  }
}

