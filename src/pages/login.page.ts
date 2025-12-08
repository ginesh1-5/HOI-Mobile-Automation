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

  // Verify button - flexible locator
  get verifyButton() {
    return $('//android.widget.Button[@text="Verify" or @content-desc="Verify"] | //android.widget.TextView[@text="Verify"]');
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
   * Check if already logged in
   */
  async isAlreadyLoggedIn(): Promise<boolean> {
    try {
      const homeIndicator = $('//android.widget.TextView[@text="Home" or @text="Account"]');
      return await this.isDisplayed(homeIndicator, TestData.waitTimes.medium);
    } catch {
      return false;
    }
  }

  /**
   * Handle app start flow
   */
  async handleAppStart(): Promise<void> {
    try {
      await this.tapElement(this.getStartedButton, TestData.waitTimes.medium);
      await this.wait(TestData.waitTimes.short);
    } catch {
      // Not found, continue
    }
    
    try {
      await this.tapElement(this.allowPermissionButton, TestData.waitTimes.medium);
      await this.wait(TestData.waitTimes.short);
    } catch {
      // Not found, continue
    }
  }

  /**
   * Enter mobile number
   */
  async enterMobileNumber(mobileNumber: string): Promise<void> {
    await this.enterText(this.mobileNumberInput, mobileNumber);
  }

  /**
   * Click verify button
   */
  async clickVerifyButton(): Promise<void> {
    await this.tapElement(this.verifyButton);
    await this.wait(TestData.waitTimes.otpWait);
  }

  /**
   * Enter OTP
   */
  async enterOtp(otp: string): Promise<void> {
    await this.enterText(this.otpInput, otp);
  }

  /**
   * Click login button
   */
  async clickLoginButton(): Promise<void> {
    await this.tapElement(this.loginButton);
  }

  /**
   * Perform complete login flow
   */
  async loginWithMobileAndOtp(mobileNumber: string, otp: string): Promise<void> {
    if (await this.isAlreadyLoggedIn()) {
      return;
    }
    
    await this.handleAppStart();
    await this.wait(TestData.waitTimes.appLoad);
    await this.enterMobileNumber(mobileNumber);
    await this.clickVerifyButton();
    await this.enterOtp(otp);
    await this.clickLoginButton();
  }

}
