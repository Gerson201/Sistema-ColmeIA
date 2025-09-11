/**
 * Expo app config with secure defaults and API base URL via env.
 */
module.exports = () => ({
  expo: {
    name: "ColmeIA Mobile",
    slug: "colmeia-mobile",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      }
    },
    web: {
      bundler: "metro",
      favicon: "./assets/favicon.png"
    },
    extra: {
      API_BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL || "http://localhost:8000"
    }
  }
});


