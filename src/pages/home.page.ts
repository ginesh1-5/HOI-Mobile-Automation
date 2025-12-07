import { CommonPage } from './common.page';

export class HomePage extends CommonPage {
  // Fast home page indicator - simple text match (fastest)
  get homePageIndicator() {
    return $('//android.widget.TextView[@text="Home" or @text="Account" or contains(@text, "Rewards") or contains(@text, "Eat at") or contains(@text, "What\'s New")]');
  }

  get welcomeMessage() { 
    return $('~welcome-message'); 
  }

  /**
   * Fast check if home page is displayed
   */
  async isHomePageDisplayed(): Promise<boolean> {
    try {
      // Fast check with reduced timeout
      const isDisplayed = await this.isDisplayed(this.homePageIndicator, 3000);
      if (isDisplayed) {
        return true;
      }
      
      // Quick fallback check
      try {
        return await this.isDisplayed(this.welcomeMessage, 1000);
      } catch {
        return false;
      }
    } catch {
      return false;
    }
  }

  /**
   * Get welcome message text
   */
  async getWelcomeMessage(): Promise<string> {
    try {
      return await this.getText(this.welcomeMessage);
    } catch {
      return '';
    }
  }
}
