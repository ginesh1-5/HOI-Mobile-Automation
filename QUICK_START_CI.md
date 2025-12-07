# 🚀 Quick Start: GitHub Actions CI/CD

## Step-by-Step Setup

### Step 1: Push Code to GitHub

```bash
# If not already a git repository
git init
git add .
git commit -m "Initial commit with CI/CD"

# Add your GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

### Step 2: Verify Workflow Files

Check that these files exist:
- ✅ `.github/workflows/android-tests-simple.yml` (Recommended)
- ✅ `.github/workflows/android-tests.yml` (Advanced)

### Step 3: Handle APK File

**Option A: Commit APK (if < 100MB)**
```bash
git add apps/android/hoi-app-dev.apk
git commit -m "Add APK file"
git push
```

**Option B: Use GitHub Releases (Recommended for large files)**
1. Create a GitHub Release
2. Upload APK as release asset
3. Update workflow to download APK

**Option C: Use Git LFS (for large files)**
```bash
git lfs install
git lfs track "*.apk"
git add .gitattributes
git add apps/android/hoi-app-dev.apk
git commit -m "Add APK with LFS"
```

### Step 4: Enable GitHub Actions

1. Go to your GitHub repository
2. Click **"Actions"** tab
3. You should see **"Android Tests (Simple)"** workflow
4. Click on it
5. Click **"Run workflow"** button
6. Select branch: **main**
7. Click **"Run workflow"**

### Step 5: Monitor Execution

1. Watch the workflow run in real-time
2. Click on the running job to see logs
3. Wait for completion (~10-15 minutes)

### Step 6: Download Results

After completion:
1. Scroll to **"Artifacts"** section
2. Download:
   - **allure-report** - HTML report
   - **screenshots** - Test screenshots
   - **allure-results** - Raw test data

## What Happens in the Pipeline

1. ✅ Code checkout
2. ✅ Node.js setup
3. ✅ Dependencies installation
4. ✅ Java & Android SDK setup
5. ✅ Android Emulator start
6. ✅ Appium installation & start
7. ✅ Test execution
8. ✅ Allure report generation
9. ✅ Artifact upload

## Troubleshooting

### Workflow Not Appearing?
- Check `.github/workflows/` directory exists
- Verify YAML syntax
- Make sure files are committed

### Tests Failing?
- Check workflow logs
- Download screenshots artifact
- Verify APK path in workflow

### Need Help?
- Check `CI_CD_SETUP.md` for detailed guide
- Review `.github/README.md`
- Check GitHub Actions documentation

## Next Steps

1. ✅ Push code to GitHub
2. ✅ Run workflow manually
3. ✅ Review test results
4. ✅ Set up automatic triggers
5. ✅ Configure notifications (optional)

