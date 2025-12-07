import { LoginPage } from '../../pages/login.page';
import { HomePage } from '../../pages/home.page';
import { TestData } from '../../fixtures/test-data';

describe('Login to Home Page Test', () => {
  let loginPage: LoginPage;
  let homePage: HomePage;

  before(() => {
    loginPage = new LoginPage();
    homePage = new HomePage();
  });

  it('should login with mobile number and OTP and navigate to home page', async () => {
    const { mobileNumber, otp } = TestData.users.validUser;
    
    // Wait for app to load
    await loginPage.wait(TestData.waitTimes.medium);
    
    // Check if already logged in
    const isAlreadyLoggedIn = await loginPage.isAlreadyLoggedIn();
    
    if (!isAlreadyLoggedIn) {
      // Perform login with mobile and OTP
      await loginPage.loginWithMobileAndOtp(mobileNumber, otp);
      // Wait for navigation to home page after login
      await loginPage.waitForNavigation(TestData.waitTimes.navigation);
    } else {
      console.log('User already logged in, verifying home page...');
      await loginPage.wait(TestData.waitTimes.medium);
    }
    
    // Take screenshot for verification
    await loginPage.takeScreenshot('login-to-home-result');
    
    // Verify home page is displayed
    const isHomePage = await homePage.isHomePageDisplayed();
    expect(isHomePage).toBe(true);
    
    if (isAlreadyLoggedIn) {
      console.log('✅ User already logged in, home page verified');
    } else {
      console.log('✅ Successfully logged in and navigated to home page');
    }
  });
});
