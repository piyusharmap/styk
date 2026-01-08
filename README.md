<picture>
  <img src="./assets/icon.png" alt="Styk: A minimal habit tracker" style="height: 100px; width: 100px;">
</picture>

<br />

# Styk: A Minimal Habit Tracker

### Build better routines. Quit bad cycles. All locally on your device.

Styk is an open-source minimal habit tracker application built using **React Native** and **Expo Router**. It helps you build good habits and quit bad ones in a simple, intuitive way. No accounts, no cloud tracking, and no friction. Just you and your goals.

The app is **free to use** and does **not require any login or registration**, making it easy to start tracking your habits immediately. Authentication may be required in future to use some of the exculusive features.

### ✨ Key Features

- **Dual-Mode Tracking**: Specialized logic for **Building** habits (positive reinforcement) and **Quitting** habits (relapse tracking).
- **Privacy First**: 100% offline. Your data stays on your device in a local SQLite database.
- **Visual Analytics**: 30-day heatmaps to visualize your consistency.
- **Customizable**: Color-coded habits with flexible frequencies (Daily, Weekly, Monthly, Yearly).
- **Zero Onboarding**: Start tracking in seconds. No registration required.

### 🛠️ Tech Stack

- **Framework**: [React Native](https://reactnative.dev/) via [Expo](https://expo.dev/)
- **Navigation**: [Expo Router](https://docs.expo.dev/router/introduction/) (File-based routing)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Database**: [SQLite](https://docs.expo.dev/versions/latest/sdk/sqlite/) for local persistence
- **Icon Pack**: [Lucide React Native](https://lucide.dev/)

### 🚀 Getting Started

1. **Clone the repo**

    ```bash
    git clone [https://github.com/yourusername/styk.git](https://github.com/yourusername/styk.git)
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Start the project**

    ```bash
    npx expo start
    ```

**To view the app on your device:**

- Install the Expo Go app.
- Ensure your phone and computer are on the same Wi-Fi network.
- Scan the QR code appearing in your terminal.
