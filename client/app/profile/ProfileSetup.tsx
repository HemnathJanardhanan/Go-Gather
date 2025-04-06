import React, { useState } from "react";
import {Alert, View, Text, Image, TouchableOpacity, Modal} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { router } from "expo-router";
import images from "@/constants/images";
import axios from "axios";
import Constants from "expo-constants";

import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from "@/app/LoadingScreen";


const API_URL = Constants.expoConfig?.extra?.API_URL || "http://192.168.29.133:3000";
export default function ProfileSetup() {
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled) {
            saveImage(result.assets[0].uri);
        }
    };

    const saveImage = async (imageUri: string) => {
        const fileDir = FileSystem.cacheDirectory;
        if (!fileDir) {
            console.error("File system not available");
            return;
        }

        try {
            const filename = imageUri.split("/").pop();
            const newPath = fileDir + filename;
            await FileSystem.copyAsync({ from: imageUri, to: newPath });
            setProfileImage(newPath);
        } catch (error) {
            console.error("Error saving image:", error);
        }
    };

    const handleSubmit = async () => {
        if (!profileImage) {
            alert("Please upload a profile picture");
            return;
        }
        setLoading(true);
        try {
            const token = await AsyncStorage.getItem("token");
            if (!token) throw new Error("No token found");

            const formData = new FormData();
            formData.append("profilePicture", {
                uri: profileImage,
                name: "profile.jpg",
                type: "image/jpeg",
            } as any);

            const response = await axios.post(`${API_URL}/users/upload-profile`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });


                router.replace("/(tabs)"); // Navigate to homepage or dashboard
        } catch (error) {
            console.error("Upload Error:", error);
            Alert.alert("Error", "An error occurred while uploading.");
        } finally {
            setLoading(false);
        }

    };

    return (
        <View className="flex-1 items-center justify-center bg-white p-4">

            <Text className="text-lg font-semibold mb-4">Set Up Your Profile</Text>

            <TouchableOpacity onPress={pickImage}>
                <Image
                    source={profileImage ? { uri: profileImage } : images.avatar}
                    className="w-32 h-32 rounded-full border-2 border-gray-300"
                />
                <Text className="mt-2 text-blue-500">Upload Profile Picture</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={handleSubmit}
                className="mt-6 px-4 py-2 bg-blue-500 rounded-lg"
                disabled={loading}
            >
                {loading ? <Modal transparent visible={loading}>
                    <LoadingScreen />
                </Modal>: <Text className="text-white">Finish Setup</Text>}
            </TouchableOpacity>
        </View>
    );
}