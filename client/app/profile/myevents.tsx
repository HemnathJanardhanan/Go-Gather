
import React, { useEffect, useState } from "react";
import {View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, Alert, Modal} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Constants from "expo-constants";
import { SafeAreaView } from "react-native-safe-area-context";
import LoadingScreen from "@/app/LoadingScreen";
import {router} from "expo-router";
const API_URL = Constants.expoConfig?.extra?.API_URL || "http://192.168.29.133:3000";

interface Location {
    venue: string;
    area: string;
    city: string;
    state: string;
    pincode: number;
    mapLink: string;// Ensure this is a number
}

interface Event {
    id:string;
    title: string;
    description: string;
    location: Location;
    date: string;
    image: string;
    noOfSeats: number;
    remainingSeats: number;
    price: number;
    category: string;
    attendees: any;
}


const MyEventsScreen = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            try {
                const token = await AsyncStorage.getItem("token");
                if (!token) {
                    Alert.alert("Error", "You are not logged in. Please log in first.");
                    return;
                }

                const response = await axios.get(`${API_URL}/events/my-hosted`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const normalizedEvents = response.data.hostedEvents.map((event:any) => ({
                    ...event,
                    id: (event as any)._id, // rename _id to id
                }));
                setEvents(normalizedEvents);
                setEvents(normalizedEvents);

            } catch (error) {
                console.error("Error fetching hosted events:", error);
                Alert.alert("Error", "Failed to load hosted events. Please try again.");
            } finally {
                setLoading(false);
            }
        };


        fetchEvents();
    }, []);

    const renderEvent = ({ item }: { item: Event }) => (
        <TouchableOpacity onPress={() => router.push(`/events/${item.id}`)}>
            <View className="bg-white rounded-2xl shadow-lg mb-6 overflow-hidden">
                {/* Event Image */}
                <View className="relative">
                    <TouchableOpacity  onPress={() => router.push(`/profile/${item.id}`)}>
                        {item.image ? (
                            <Image source={{ uri: item.image }} className="w-full h-52 rounded-t-2xl" />
                        ) : (
                            <View className="w-full h-52 bg-gray-300 flex items-center justify-center">
                                <Text className="text-gray-500">No Image</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>

                {/* Event Details */}
                <View className="p-4">
                    <Text className="text-lg font-nunito-bold text-black">{item.title}</Text>
                    <Text className="text-gray-600 text-sm mt-1">
                        {item.location?.venue||"Unkown"}, {item.location?.city||"Unkown"}
                    </Text>

                    {/* Date & Price */}
                    <View className="flex-row justify-between items-center mt-3">
                        <Text className="text-gray-500 text-sm">{item.date}</Text>
                        <Text className="text-primary-500 font-nunito-SemiBold">
                            {item.price > 0 ? `₹${item.price}` : "Free"}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (

            <SafeAreaView className="flex-1 bg-gray-100 p-5">
                <Modal transparent visible={loading}>
                    <LoadingScreen />
                </Modal>
                {/* Header */}
                <View className="flex-row justify-between items-center mb-5">
                    <Text className="text-3xl font-nunito-ExtraBold text-black">My Events</Text>

                </View>

                {/* Loading Indicator */}
                {loading ? (
                    <ActivityIndicator size="large" color="#191d31" className="mt-10" />
                ) : (
                    <FlatList
                        data={events}
                        renderItem={renderEvent}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                    />
                )}
            </SafeAreaView>


    );
};

export default MyEventsScreen;
