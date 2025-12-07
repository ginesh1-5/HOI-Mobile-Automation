# GitHub Actions CI/CD Setup Guide

This guide will help you set up GitHub Actions for your mobile automation project.

## Prerequisites

1. **GitHub Repository**: Your project should be pushed to GitHub
2. **GitHub Account**: You need access to the repository
3. **APK File**: Make sure your APK is committed to the repository (or use a different approach)

## Setup Steps

### 1. Push Your Code to GitHub

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit with CI/CD setup"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### 2. Verify Workflow Files

The workflow files are located in:
- `.github/workflows/android-tests.yml` - Full workflow with matrix strategy
- `.github/workflows/android-tests-simple.yml` - Simplified workflow (recommended to start)

### 3. GitHub Actions Setup

1. Go to your GitHub repository
2. Click on **Actions** tab
3. You should see the workflows listed
4. Click on **"Android Tests (Simple)"** or **"Android Mobile Automation Tests"**
5. Click **"Run workflow"** to test

### 4. Monitor Test Execution

- Go to **Actions** tab in GitHub
- Click on the workflow run
- Watch the real-time logs
- Check artifacts after completion

## Workflow Features

### Android Tests (Simple) Workflow
- ✅ Runs on macOS latest
- ✅ Sets up Android SDK and Emulator
- ✅ Installs Appium
- ✅ Runs your tests
- ✅ Generates Allure reports
- ✅ Uploads artifacts (reports, screenshots)

### Android Mobile Automation Tests (Full)
- ✅ Matrix strategy (tests on multiple API levels)
- ✅ Environment selection
- ✅ All features from simple workflow
- ✅ More comprehensive testing

## Artifacts

After each run, you can download:
- **Allure Results**: Test execution data
- **Allure Report**: HTML report
- **Screenshots**: Test screenshots
- **Test Logs**: Execution logs

## Configuration Options

### Environment Variables

You can set environment variables in GitHub:
1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add secrets if needed (e.g., API keys, credentials)

### Workflow Triggers

The workflows trigger on:
- Push to main/develop/master branches
- Pull requests to main/develop/master branches
- Manual trigger (workflow_dispatch)

### Customization

Edit `.github/workflows/android-tests-simple.yml` to:
- Change Android API level
- Modify test command
- Add additional steps
- Change artifact retention

## Troubleshooting

### Common Issues

1. **Emulator not starting**
   - Check API level compatibility
   - Verify Android SDK setup

2. **Appium connection failed**
   - Increase wait time in workflow
   - Check Appium installation

3. **Tests failing**
   - Check test logs in artifacts
   - Verify APK path is correct
   - Check emulator is ready before tests

### Debug Steps

1. Check workflow logs in GitHub Actions
2. Download artifacts and review
3. Test locally first before pushing
4. Check emulator logs in artifacts

## Next Steps

1. ✅ Push code to GitHub
2. ✅ Verify workflow appears in Actions tab
3. ✅ Run workflow manually to test
4. ✅ Review generated reports
5. ✅ Set up branch protection (optional)
6. ✅ Configure notifications (optional)

## Support

If you encounter issues:
1. Check GitHub Actions logs
2. Review workflow file syntax
3. Verify all dependencies are correct
4. Test locally first

