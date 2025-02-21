import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import images from "@/constants/images"; // Import logo

const WelcomeScreen = () => {
    const router = useRouter();

    return (
        <View className="flex-1 bg-accent-100 items-center justify-center p-6">
            {/* Logo */}
            <Image source={images.logo} className="w-40 h-40 mb-6" resizeMode="contain" />

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

export default WelcomeScreen;
