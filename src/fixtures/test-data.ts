/**
 * Centralized Test Data File
 * All test data and user input data should be defined here
 * No hardcoded values should be used in test functions
 */

export const TestData = {
  // User credentials
  users: {
    validUser: {
      mobileNumber: '9876987698',
      otp: '1234',
      email: 'testuser@hoi.com',
      password: 'Test@1234',
      name: 'Test User',
      phone: '1234567890'
    },
    invalidUser: {
      mobileNumber: '1234567890',
      otp: '9999',
      email: 'invalid@hoi.com',
      password: 'WrongPassword'
    }
  },

  // Wait times (in milliseconds)
  waitTimes: {
    short: 1000,
    medium: 2000,
    long: 5000,
    veryLong: 10000,
    appLoad: 3000,
    navigation: 5000,
    elementWait: 10000,
    elementWaitLong: 15000,
    otpWait: 3000,
    gestureDuration: 1000,
    scrollInterval: 500,
    maxScrolls: 5
  },

  // App flow data
  appFlow: {
    getStartedButtonText: 'Get Started',
    allowPermissionButtonText: "Okay, I'll Allow"
  },

  // Login page data
  login: {
    mobileNumberPlaceholder: 'Enter Mobile Number',
    otpPlaceholder: 'Enter Verification Code',
    verifyButtonContentDesc: 'Verify',
    loginButtonText: 'Login'
  },

  // Error messages (expected)
  errorMessages: {
    invalidCredentials: 'Invalid credentials',
    requiredFields: 'Please fill in all required fields',
    networkError: 'Network error. Please check your connection',
    timeout: 'Request timed out',
    elementNotFound: 'Element not found after retries'
  },

  // Success messages (expected)
  successMessages: {
    loginSuccess: 'Login successful',
    homePageLoaded: 'Home page loaded successfully'
  }
};

// Export default for easier imports
export default TestData;
