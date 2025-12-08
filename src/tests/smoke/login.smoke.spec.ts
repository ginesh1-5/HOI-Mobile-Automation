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
    
    const isAlreadyLoggedIn = await loginPage.isAlreadyLoggedIn();
    
    if (!isAlreadyLoggedIn) {
      await loginPage.loginWithMobileAndOtp(mobileNumber, otp);
      await loginPage.waitForNavigation(TestData.waitTimes.navigation);
    }
    
    const isHomePage = await homePage.isHomePageDisplayed();
    expect(isHomePage).toBe(true);
  });
});
