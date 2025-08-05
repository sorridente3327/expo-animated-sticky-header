# 🚀 Animated Parallax Header for React Native

A smooth and responsive **Parallax Header** component built with [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/) and [glow-ui.xyz](https://glow-ui.xyz). Perfect for artist profile pages, streaming apps, or any UI that needs dynamic header transitions. Inspired by Spotify-style collapsible headers with image expansion and sticky states.

https://github.com/user-attachments/assets/a026d70a-c8e6-46fa-a005-f30d861ce6eb

---

## ✨ Features

- 🖼️ Expandable image header with smooth interpolation
- 📱 Fully animated and responsive to scroll gestures
- 🔒 Sticky state lock when expanded
- 💫 Seamless transitions powered by Reanimated 3
- 🧠 Smart retraction when scrolling up
- 🎨 Easily composable with content or tabs below

## 🚀 Usage

```bash
git clone https://github.com/rit3zh/expo-animated-sticky-header
cd expo-animated-sticky-header
pnpm install
pnpm ios
```

## 📦 Dependencies

```bash
pnpm install react-native-reanimated expo-blur expo-symbols expo-linear-gradient
```

Also ensure:

- Reanimated is properly configured (`babel.config.js`)
- You're using `react-native-reanimated/plugin`
- Your scroll container (e.g. `Animated.ScrollView` or `Animated.FlatList`) passes a `scrollY` shared value to the header

---

## 🧱 Tech

- ⚛️ React Native
- 🚀 Expo
- 🎨 expo-symbols
