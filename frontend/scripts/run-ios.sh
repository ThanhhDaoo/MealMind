#!/usr/bin/env bash
set -e

# Sync web assets
npm run build
npx cap copy ios

# Build using DerivedData in /tmp (tránh iCloud xattr detritus trên macOS Documents)
echo "🚀 Đang build iOS App..."
xcodebuild -project ios/App/App.xcodeproj \
  -scheme App \
  -destination 'platform=iOS Simulator,name=iPhone 17' \
  -derivedDataPath /tmp/MealMindDerivedData \
  build

# Khởi động simulator nếu chưa mở
TARGET_ID="A41531E6-F5C5-45D6-93B3-F613AC6332E6"
xcrun simctl boot "$TARGET_ID" 2>/dev/null || true
open -a Simulator

# Cài đặt và chạy App
echo "📱 Đang cài đặt và mở ứng dụng MealMind trên iPhone 17 Simulator..."
xcrun simctl terminate booted com.mealmind.app 2>/dev/null || true
xcrun simctl install booted /tmp/MealMindDerivedData/Build/Products/Debug-iphonesimulator/App.app
xcrun simctl launch booted com.mealmind.app
echo "✅ Hoàn tất! MealMind đã chạy trên iPhone 17 Simulator."
