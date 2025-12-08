# HOI Mobile Automation Framework

A comprehensive mobile automation testing framework for HOI app using WebdriverIO, Appium, and TypeScript.

## Project Structure

```
hoi-mobile-automation/
├── apps/                    # Mobile app binaries
│   ├── android/            # Android APK files
│   └── ios/                # iOS app bundles
├── config/                  # WebdriverIO configurations
│   ├── wdio.*.conf.ts      # Main config files
│   ├── *.capabilities.ts   # Device capabilities
│   └── environments/       # Environment-specific configs
├── src/
│   ├── pages/              # Page Object Model
│   ├── tests/              # Test suites
│   │   ├── smoke/          # Smoke tests
│   │   ├── regression/     # Regression tests
│   │   └── sanity/         # Sanity tests
│   ├── utils/              # Utility functions
│   ├── fixtures/           # Test data
│   ├── constants/          # Constants and endpoints
│   ├── hooks/              # WebdriverIO hooks
│   └── services/           # External service integrations
├── reports/                 # Test reports
└── scripts/                 # Helper scripts
```

## Prerequisites

- Node.js (v18 or higher)
- Java JDK (for Appium)
- Android Studio / Xcode (for emulators/simulators)
- Appium Server
- Allure (for reporting)

## Installation

```bash
npm install
```

## Quick Start

**Run the project with a single command:**

```bash
npx wdio run config/wdio.android.conf.ts --spec=./src/tests/smoke/login.smoke.spec.ts
```

**Or use the npm script:**

```bash
npm run test:android
```

> **Note:** Make sure Android emulator and Appium server are running before executing tests.

## Configuration

1. Place your app binaries in:
   - `apps/android/hoi-app-dev.apk`
   - `apps/ios/hoi-app-dev.app`

2. Configure environment files in `config/environments/`

3. Update capabilities in `config/android.capabilities.ts` and `config/ios.capabilities.ts`

## Running Tests

### Prerequisites Before Running
1. **Start Android Emulator:**
   ```bash
   ./scripts/android-emulator-start.sh
   # Or manually: emulator -avd Pixel_9_API_Baklava -no-snapshot-load
   ```

2. **Start Appium Server:**
   ```bash
   appium --log-level info
   # Or use: ./scripts/start-appium.sh
   ```

3. **Verify Setup:**
   ```bash
   adb devices  # Should show emulator-5554
   ```

### Android Tests

**Recommended Command (Explicit Spec Path):**
```bash
npx wdio run config/wdio.android.conf.ts --spec=./src/tests/smoke/login.smoke.spec.ts
```

**Alternative Commands:**
```bash
# Using npm script (may need explicit spec path)
npm run test:android

# Environment-specific
npm run test:android:dev
npm run test:android:qa
```

### iOS
```bash
npm run test:ios
npm run test:ios:dev
npm run test:ios:qa
```

### Test Suites
```bash
# Smoke tests (recommended)
npm run test:smoke

# Other suites
npm run test:regression
npm run test:sanity
```

## Reports

**Generate Allure Report:**
```bash
npm run report:allure:generate
```

**Open Allure Report:**
```bash
npm run report:allure:open
```

**Generate and Open (Combined):**
```bash
npm run report:allure
```

## CI/CD

GitHub Actions workflows are configured in `.github/workflows/`:
- `android-pipeline.yml` - Android test pipeline
- `ios-pipeline.yml` - iOS test pipeline
- `notifications.yml` - Notification service

## Contributing

1. Follow TypeScript best practices
2. Use Page Object Model pattern
3. Write descriptive test names
4. Add appropriate waits and error handling
5. Update documentation as needed

