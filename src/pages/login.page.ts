import { CommonPage } from './common.page';
import { TestData } from '../fixtures/test-data';

export class LoginPage extends CommonPage {
  // Simple, direct locators - fastest and most reliable
  get getStartedButton() {
    return $('//android.widget.TextView[@text="Get Started"]');
  }

  get allowPermissionButton() {
    return $('//android.widget.TextView[@text="Okay, I\'ll Allow"]');
  }

  // Mobile number input - simple and direct
  get mobileNumberInput() {
    return $('//android.widget.EditText[@hint="Enter Mobile Number" or @text="Enter Mobile Number"]');
  }

  // Verify button - simple and direct
  get verifyButton() {
    return $('//android.widget.Button[@content-desc="Verify" or @text="Verify"]');
  }

  // OTP input - simple and direct
  get otpInput() {
    return $('//android.widget.EditText[@hint="Enter Verification Code" or @text="Enter Verification Code"]');
  }

  // Login button - simple and direct
  get loginButton() {
    return $('//android.widget.TextView[@text="Login"]');
  }

  /**
   * Fast element finder with smart retry
   */
  private async findElementFast(
    selector: any,
    maxRetries: number = 8,
    retryDelay: number = 300
  ): Promise<any> {
    const element = typeof selector === 'string' ? $(selector) : selector;
    
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        if (await element.isExisting()) {
          const isDisplayed = await element.isDisplayed().catch(() => false);
          if (isDisplayed) {
            return element;
          }
        }
      } catch (e) {
        // Continue to next retry
      }
      
      if (attempt < maxRetries - 1) {
        await browser.pause(retryDelay);
      }
    }
    
    throw new Error(`Element not found after ${maxRetries} retries`);
  }

  /**
   * Check if already logged in
   */
  async isAlreadyLoggedIn(): Promise<boolean> {
    try {
      const homeIndicator = $('//android.widget.TextView[@text="Home" or @text="Account"]');
      return await this.isDisplayed(homeIndicator, 2000);
    } catch {
      return false;
    }
  }

  /**
   * Handle app start flow
   */
  async handleAppStart(): Promise<void> {
    try {
      await browser.pause(1000);
      
      // Try Get Started button
      try {
        const getStarted = await this.findElementFast(this.getStartedButton, 3);
        await getStarted.click();
        await browser.pause(1000);
      } catch (e) {
        // Not found, continue
      }
      
      // Try Allow button
      try {
        const allowButton = await this.findElementFast(this.allowPermissionButton, 3);
        await allowButton.click();
        await browser.pause(1000);
      } catch (e) {
        // Not found, continue
      }
    } catch (e) {
      // Continue silently
    }
  }

  /**
   * Enter mobile number
   */
  async enterMobileNumber(mobileNumber: string): Promise<void> {
    const element = await this.findElementFast(this.mobileNumberInput, 8);
    await element.clearValue();
    await element.setValue(mobileNumber);
  }

  /**
   * Click verify button
   */
  async clickVerifyButton(): Promise<void> {
    const element = await this.findElementFast(this.verifyButton, 8);
    await element.click();
    await browser.pause(TestData.waitTimes.otpWait);
  }

  /**
   * Enter OTP
   */
  async enterOtp(otp: string): Promise<void> {
    const element = await this.findElementFast(this.otpInput, 8);
    await element.clearValue();
    await element.setValue(otp);
  }

  /**
   * Click login button
   */
  async clickLoginButton(): Promise<void> {
    const element = await this.findElementFast(this.loginButton, 8);
    await element.click();
  }

  /**
   * Perform complete login flow
   */
  async loginWithMobileAndOtp(mobileNumber: string, otp: string): Promise<void> {
    // Check if already logged in
    const isLoggedIn = await this.isAlreadyLoggedIn();
    if (isLoggedIn) {
      console.log('Already logged in, skipping login flow');
      return;
    }
    
    // Handle app start
    await this.handleAppStart();
    await browser.pause(TestData.waitTimes.appLoad);
    
    // Enter mobile number
    await this.enterMobileNumber(mobileNumber);
    await browser.pause(500);
    
    // Click verify
    await this.clickVerifyButton();
    
    // Enter OTP
    await this.enterOtp(otp);
    await browser.pause(500);
    
    // Click login
    await this.clickLoginButton();
  }

  /**
   * Check if login page is displayed
   */
  async isLoginPageDisplayed(): Promise<boolean> {
    try {
      return await this.isDisplayed(this.mobileNumberInput, 3000);
    } catch {
      return false;
    }
  }
}
