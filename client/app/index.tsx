import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import React,{useEffect,useState} from "react";
import icons from "@/constants/icons"; // Import logo
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingScreen from "@/app/LoadingScreen";
const Index = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const checkToken = async () => {
            setLoading(true);
            const token = await AsyncStorage.getItem("token");
            setLoading(false);
            if (token) {
                router.replace("/(tabs)"); // 👈 Redirect to the authenticated stack
            }

        };
        checkToken();
    }, [])
    if(loading){
        return <LoadingScreen />;
    }
    return (
        <View className="flex-1 w-full h-full bg-accent-100 items-center justify-center p-6">
            {/* Logo */}


            <Image source={icons.app_icon} className="w-40 h-40 mb-6" resizeMode="contain" />

            {/* Title */}
            <Text className="text-3xl font-nunito-bold text-primary-300 mb-4">Welcome to GoGather</Text>

            {/* Tagline */}
            <Text className="text-lg text-black-100 text-center mb-10">
                Discover events, meet people, and have fun!
            </Text>

            {/* Get Started Button */}
            <TouchableOpacity
                onPress={() => router.replace("/auth/login")} // Navigate to Login
                className="bg-primary-300 px-6 py-3 rounded-2xl"
            >
                <Text className="text-white text-lg font-nunito-SemiBold">Let's Get Started</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Index;
