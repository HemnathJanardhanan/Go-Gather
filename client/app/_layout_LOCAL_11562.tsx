import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as Notifications from "expo-notifications";
import { useState, useEffect } from "react";
import { useFonts } from "expo-font";

import "./global.css";
import LoadingScreen from "@/app/LoadingScreen";


Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export default function RootLayout() {
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

  if (!fontsLoaded) {
    return null; // Prevent rendering until check is done
  }
    if (!appIsReady) {
        return <LoadingScreen />; // Show loading screen for 2s minimum
    }

  return (

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />  {/* Onboarding Screen */}
        <Stack.Screen name="auth/login" />
        <Stack.Screen name="auth/signup" />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
      </Stack>
  );
}
