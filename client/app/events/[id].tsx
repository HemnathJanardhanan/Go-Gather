
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, Alert, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import CelebrateAnimation from "@/components/CelebrateAnimation";
import LoadingScreen from "@/app/LoadingScreen";

import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
const API_URL = Constants.expoConfig?.extra?.API_URL || "http://192.168.29.133:3000/api";



interface Event {
    id: string;
    title: string;
    description: string;
    image: string;
    location: {
        venue: string;
        city: string;
        state: string;
        pincode: string;
    };
    price: number;
    noOfSeats: number;
    remainingSeats: number;
}



const EventDetails = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [seats, setSeats] = useState(1);
    const [success, setSuccess] = useState(false);
    const [refreshFlag, setRefreshFlag] = useState(false);
    const fetchEventDetails = async () => {
        setLoading(true);
        try {

            const response = await axios.get(`${API_URL}/events/${id}`);
            setEvent(response.data);
        } catch (error) {
            console.error("Error fetching event details:", error);
            Alert.alert("Error", "Failed to load event details. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchEventDetails();
    }, [id]);

    useFocusEffect(

        useCallback(() => {
            fetchEventDetails(); // 👈 This is your API call to get latest event info
        }, [refreshFlag])
    );
    const registerForPushNotifications = async () => {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== "granted") {
            Alert.alert("Permission Denied", "Enable notifications in settings.");
            return;
        }

        const projectId = Constants.expoConfig?.extra?.eas?.projectId || "your-fallback-project-id";
        const token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;


        console.log("Expo Push Token:", token);
        await AsyncStorage.setItem("expoPushToken", token);
    };

    const handleRSVP = async () => {
        try {
            const token = await AsyncStorage.getItem("token");

            if (!token) {
                Alert.alert("Error", "You must be logged in to RSVP");
                return;
            }

            const user = await AsyncStorage.getItem("user");
            const userId = JSON.parse(user ?? "{}")?.id;

            if (!userId) {
                Alert.alert("Error", "User data not found");
                return;
            }

            const response = await axios.post(
                `${API_URL}/rsvp/${id}`, // 👈 put the eventId in URL
                { seats },
                { headers: { Authorization: `Bearer ${token}` } }
            );


            await Notifications.scheduleNotificationAsync({
                content: {
                    title: "RSVP Confirmed 🎉",
                    body: `You've successfully booked ${seats} seat(s) for ${event?.title}!`,
                    data: { eventId: id },
                },
                trigger: null, // Triggers immediately
            });

            //Alert.alert("Success", "RSVP confirmed!");
            setModalVisible(false);
            setSuccess(true);
            setTimeout(async () => {setRefreshFlag(true)},3000)


        } catch (error) {
            if (axios.isAxiosError(error)) {
                Alert.alert("Error", error.response?.data?.error || "RSVP failed");
            } else {
                Alert.alert("Error", "An unexpected error occurred");
            }
        }
    };


    const increaseSeats = () => {
        setSeats(prevSeats => prevSeats + 1);

    };

    const decreaseSeats = () => {
        setSeats(prevSeats => prevSeats - 1);
        // Add this line
    };


    if (loading) {
        return (
            <Modal transparent visible={loading} animationType="fade">
                <LoadingScreen />
            </Modal>
        );
    }

    if (!event) {
        return (
            <View className="flex-1 justify-center items-center bg-white">
                <Text className="text-lg text-gray-600">Event not found.</Text>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-white">
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
            <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
                <View className="relative">
                    <Image source={{ uri: event.image }} className="w-full h-96" resizeMode="cover" />
                    <View className="absolute left-5 top-12 z-10">
                        <TouchableOpacity onPress={() => router.back()} className="bg-black/50 p-2 rounded-full">
                            <Ionicons name="chevron-back" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="p-6 mt-[-20px] bg-white rounded-t-3xl shadow-lg">
                    <Text className="text-3xl font-bold text-gray-900">{event.title}</Text>
                    <Text className="text-gray-500 text-md mt-2">{event.description}</Text>

                    <View className="mt-4 p-4 bg-gray-100 rounded-lg">
                        <Text className="text-gray-700 font-semibold">Location</Text>
                        <Text className="text-gray-600">{event.location.venue}, {event.location.city}</Text>
                        <Text className="text-gray-600">{event.location.state} - {event.location.pincode}</Text>
                    </View>

                    <View className="mt-4 flex-row justify-between items-center">
                        <Text className="text-xl font-semibold text-green-600">{event.price > 0 ? `₹${event.price}` : "Free"}</Text>
                        <Text className="text-md text-gray-800">Seats Available: {event.remainingSeats}</Text>
                    </View>

                    <TouchableOpacity onPress={() => setModalVisible(true)} className="bg-orange-500 p-4 mt-6 rounded-lg">
                        <Text className="text-white text-center text-lg font-semibold">RSVP</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <CelebrateAnimation visible={success} onFinish={() => setSuccess(false)} />

            <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                <View className="flex-1 justify-end bg-black/50">
                    <View className="bg-white p-6 rounded-t-3xl shadow-lg">
                        <Text className="text-xl font-bold text-gray-900">Confirm RSVP</Text>
                        <Text className="text-gray-600">Select number of seats:</Text>

                        <View className="flex-row justify-between items-center mt-4">
                            <TouchableOpacity disabled={seats <= 1} onPress={decreaseSeats} className="bg-gray-300 p-2 rounded-lg">
                                <Ionicons name="remove" size={24} color="black" />
                            </TouchableOpacity>
                            <Text className="text-lg font-semibold">{seats}</Text>
                            <TouchableOpacity disabled={seats >= event.noOfSeats} onPress={increaseSeats} className="bg-gray-300 p-2 rounded-lg">
                                <Ionicons name="add" size={24} color="black" />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={handleRSVP} className="bg-green-500 p-4 mt-6 rounded-lg">
                            <Text className="text-white text-center text-lg font-semibold">Confirm</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setModalVisible(false)} className="mt-2">
                            <Text className="text-red-500 text-center text-lg">Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default EventDetails;
