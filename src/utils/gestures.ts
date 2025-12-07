import { TestData } from '../fixtures/test-data';

export class Gestures {
  /**
   * Swipe up
   */
  static async swipeUp(distance: number = 500, duration?: number): Promise<void> {
    const { width, height } = await driver.getWindowSize();
    const swipeDuration = duration || TestData.waitTimes.gestureDuration;
    const startX = width / 2;
    const startY = height * 0.8;
    const endY = startY - distance;

    await driver.touchAction([
      { action: 'press', x: startX, y: startY },
      { action: 'wait', ms: swipeDuration },
      { action: 'moveTo', x: startX, y: endY },
      { action: 'release' }
    ]);
  }

  /**
   * Swipe down
   */
  static async swipeDown(distance: number = 500, duration?: number): Promise<void> {
    const { width, height } = await driver.getWindowSize();
    const swipeDuration = duration || TestData.waitTimes.gestureDuration;
    const startX = width / 2;
    const startY = height * 0.2;
    const endY = startY + distance;

    await driver.touchAction([
      { action: 'press', x: startX, y: startY },
      { action: 'wait', ms: swipeDuration },
      { action: 'moveTo', x: startX, y: endY },
      { action: 'release' }
    ]);
  }

  /**
   * Swipe left
   */
  static async swipeLeft(distance: number = 500, duration?: number): Promise<void> {
    const { width, height } = await driver.getWindowSize();
    const swipeDuration = duration || TestData.waitTimes.gestureDuration;
    const startX = width * 0.8;
    const startY = height / 2;
    const endX = startX - distance;

    await driver.touchAction([
      { action: 'press', x: startX, y: startY },
      { action: 'wait', ms: swipeDuration },
      { action: 'moveTo', x: endX, y: startY },
      { action: 'release' }
    ]);
  }

  /**
   * Swipe right
   */
  static async swipeRight(distance: number = 500, duration?: number): Promise<void> {
    const { width, height } = await driver.getWindowSize();
    const swipeDuration = duration || TestData.waitTimes.gestureDuration;
    const startX = width * 0.2;
    const startY = height / 2;
    const endX = startX + distance;

    await driver.touchAction([
      { action: 'press', x: startX, y: startY },
      { action: 'wait', ms: swipeDuration },
      { action: 'moveTo', x: endX, y: startY },
      { action: 'release' }
    ]);
  }

  /**
   * Long press on element
   */
  static async longPress(element: any, duration?: number): Promise<void> {
    const pressDuration = duration || TestData.waitTimes.medium;
    const location = await element.getLocation();
    const size = await element.getSize();
    const x = location.x + size.width / 2;
    const y = location.y + size.height / 2;

    await driver.touchAction([
      { action: 'press', x, y },
      { action: 'wait', ms: pressDuration },
      { action: 'release' }
    ]);
  }

  /**
   * Scroll to element
   */
  static async scrollToElement(element: any, direction: 'up' | 'down' = 'down'): Promise<void> {
    const maxScrolls = TestData.waitTimes.maxScrolls;
    let scrolls = 0;

    while (scrolls < maxScrolls) {
      try {
        if (await element.isDisplayed()) {
          return;
        }
      } catch {
        // Element not found, continue scrolling
      }

      if (direction === 'down') {
        await this.swipeUp();
      } else {
        await this.swipeDown();
      }

      scrolls++;
      await browser.pause(TestData.waitTimes.scrollInterval);
    }

    throw new Error(`Element not found after ${maxScrolls} scrolls`);
  }
}
