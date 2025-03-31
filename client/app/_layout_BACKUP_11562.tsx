import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as Notifications from "expo-notifications";
<<<<<<< HEAD
=======
import AsyncStorage from "@react-native-async-storage/async-storage";
>>>>>>> ecbedfb4 (added notification)
import { useState, useEffect } from "react";
import { useFonts } from "expo-font";

import "./global.css";
import LoadingScreen from "@/app/LoadingScreen";

<<<<<<< HEAD

=======
>>>>>>> ecbedfb4 (added notification)
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export default function RootLayout() {
<<<<<<< HEAD
  const [appIsReady, setAppIsReady] = useState(false);
  const [fontsLoaded] = useFonts({
    "Nunito-Bold": require("../assets/fonts/Nunito-Bold.ttf"),
    "Nunito-Medium": require("../assets/fonts/Nunito-Medium.ttf"),
    "Nunito-Regular": require("../assets/fonts/Nunito-Regular.ttf"),
    "Nunito-ExtraBold": require("../assets/fonts/Nunito-ExtraBold.ttf"),
    "Nunito-ExtraLight": require("../assets/fonts/Nunito-ExtraLight.ttf"),
    "Nunito-SemiBold": require("../assets/fonts/Nunito-SemiBold.ttf"),
    "Nunito-Light": require("../assets/fonts/Nunito-Light.ttf"),
  });


    useEffect(() => {
        const prepareApp = async () => {
            await new Promise((resolve) => setTimeout(resolve, 2000)); // Force 2 sec delay
=======
    const [appIsReady, setAppIsReady] = useState(false);
    const [fontsLoaded] = useFonts({
        "Nunito-Bold": require("../assets/fonts/Nunito-Bold.ttf"),
        "Nunito-Medium": require("../assets/fonts/Nunito-Medium.ttf"),
        "Nunito-Regular": require("../assets/fonts/Nunito-Regular.ttf"),
        "Nunito-ExtraBold": require("../assets/fonts/Nunito-ExtraBold.ttf"),
        "Nunito-ExtraLight": require("../assets/fonts/Nunito-ExtraLight.ttf"),
        "Nunito-SemiBold": require("../assets/fonts/Nunito-SemiBold.ttf"),
        "Nunito-Light": require("../assets/fonts/Nunito-Light.ttf"),
    });

    useEffect(() => {
        const prepareApp = async () => {
            await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 sec delay
>>>>>>> ecbedfb4 (added notification)
            setAppIsReady(true);
            await SplashScreen.hideAsync();
        };
        if (fontsLoaded) {
            prepareApp();
        }
    }, [fontsLoaded]);

    useEffect(() => {
        const registerForPushNotifications = async () => {
            const { status } = await Notifications.getPermissionsAsync();
            if (status !== "granted") {
                await Notifications.requestPermissionsAsync();
            }
        };

        registerForPushNotifications();
    }, []);

<<<<<<< HEAD
  if (!fontsLoaded) {
    return null; // Prevent rendering until check is done
  }
=======
>>>>>>> ecbedfb4 (added notification)
    if (!appIsReady) {
        return <LoadingScreen />; // Show loading screen
    }

<<<<<<< HEAD
  return (

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />  {/* Onboarding Screen */}
        <Stack.Screen name="auth/login" />
        <Stack.Screen name="auth/signup" />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
      </Stack>
  );
}
=======
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />  {/* Onboarding Screen */}
            <Stack.Screen name="auth/login" />
            <Stack.Screen name="auth/signup" />
            <Stack.Screen name="(tabs)"/>
        </Stack>
    );
}
>>>>>>> ecbedfb4 (added notification)
