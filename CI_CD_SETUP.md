# CI/CD Pipeline Setup Guide for HOI Mobile Automation

## Overview

This project includes GitHub Actions workflows for automated testing on Android devices.

## Quick Start

### 1. Push to GitHub

```bash
# Make sure you're in the project directory
cd /Users/xts/Desktop/hoi-mobile-automation

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Add CI/CD pipeline with GitHub Actions"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push to GitHub
git push -u origin main
```

### 2. Verify Workflow Files

Two workflow files have been created:
- **`.github/workflows/android-tests-simple.yml`** - Recommended for starting (simpler, faster)
- **`.github/workflows/android-tests.yml`** - Full workflow with matrix strategy

### 3. Enable GitHub Actions

1. Go to your GitHub repository
2. Click on **"Actions"** tab
3. You should see the workflows listed
4. Click **"Run workflow"** to test

## What You Need

### Required
- ✅ GitHub repository (public or private)
- ✅ Code pushed to GitHub
- ✅ APK file in `apps/android/` directory

### Optional
- Environment variables (if needed)
- Secrets for API keys (if using external services)

## Workflow Details

### Simple Workflow (`android-tests-simple.yml`)

**Triggers:**
- Push to main/develop/master
- Pull requests
- Manual trigger

**Steps:**
1. Checkout code
2. Setup Node.js 20
3. Install dependencies
4. Setup Java 17
5. Setup Android SDK (API 33)
6. Start Android Emulator
7. Install and start Appium
8. Run tests
9. Generate Allure report
10. Upload artifacts

**Duration:** ~10-15 minutes

### Full Workflow (`android-tests.yml`)

**Additional Features:**
- Matrix strategy (tests on API 33 and 34)
- Environment selection
- More comprehensive artifact uploads

**Duration:** ~20-30 minutes (runs multiple configurations)

## Artifacts Available

After each run, download:
- **allure-results**: Test execution data (JSON files)
- **allure-report**: Complete HTML report
- **screenshots**: All test screenshots
- **test-logs**: Execution logs

## How to Use

### Run Tests Manually

1. Go to **Actions** tab
2. Select **"Android Tests (Simple)"**
3. Click **"Run workflow"**
4. Select branch
5. Click **"Run workflow"** button

### View Results

1. Click on the workflow run
2. Wait for completion
3. Scroll down to **"Artifacts"** section
4. Download **allure-report** to view HTML report
5. Download **screenshots** to see test screenshots

### View Logs

1. Click on the workflow run
2. Click on **"android-tests"** job
3. Expand steps to see detailed logs
4. Check for errors in red

## Customization

### Change Android API Level

Edit `.github/workflows/android-tests-simple.yml`:

```yaml
api-level: 34  # Change from 33 to 34 or other
```

### Change Test Command

```yaml
- name: Run Android Tests
  run: |
    npm run test:android -- --spec='src/tests/smoke/**/*.spec.ts'
```

### Add Environment Variables

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **"New repository secret"**
3. Add your secret
4. Use in workflow: `${{ secrets.YOUR_SECRET }}`

## Troubleshooting

### Issue: Workflow not appearing

**Solution:**
- Make sure `.github/workflows/` directory exists
- Verify YAML syntax is correct
- Check file is committed and pushed

### Issue: Emulator not starting

**Solution:**
- Check API level is available
- Verify Android SDK setup step
- Check logs for specific error

### Issue: Tests failing

**Solution:**
1. Download test logs artifact
2. Check screenshots for visual errors
3. Verify APK path is correct
4. Test locally first

### Issue: Appium connection failed

**Solution:**
- Increase wait time in workflow
- Check Appium installation step
- Verify port 4723 is available

## Best Practices

1. **Test Locally First**: Always test changes locally before pushing
2. **Use Simple Workflow**: Start with simple workflow, upgrade later
3. **Monitor Artifacts**: Check artifacts after each run
4. **Review Logs**: Always check logs for errors
5. **Keep APK Updated**: Ensure APK is in repository

## Next Steps

1. ✅ Push code to GitHub
2. ✅ Run workflow manually
3. ✅ Download and review artifacts
4. ✅ Set up branch protection (optional)
5. ✅ Configure email notifications (optional)
6. ✅ Add status badges to README (optional)

## Status Badge

Add this to your README.md:

```markdown
![Android Tests](https://github.com/YOUR_USERNAME/YOUR_REPO/workflows/Android%20Tests%20(Simple)/badge.svg)
```

## Support

For issues:
1. Check GitHub Actions documentation
2. Review workflow logs
3. Test locally to isolate issues
4. Check GitHub Actions status page

