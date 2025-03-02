
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_URL = "http://192.168.29.178:3000/api/events/my-hosted"; // Updated API URL

type Event = {
    id: string;
    title: string;
    location: {
        venue: string;
        city: string;
    };
    date: string;
    image: string;
    price: number;
};

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

                const response = await axios.get(API_URL, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setEvents(response.data);
            } catch (error) {
                console.error("Error fetching events:", error);
                Alert.alert("Error", "Failed to load events. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const renderEvent = ({ item }: { item: Event }) => (
        <View className="bg-white rounded-2xl shadow-lg mb-6 overflow-hidden">
            {/* Event Image */}
            <View className="relative">
                <Image source={{ uri: item.image }} className="w-full h-52 rounded-t-2xl" />
                <TouchableOpacity className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md">
                    <Icon name="heart-outline" size={22} color="#191d31" />
                </TouchableOpacity>
            </View>

            {/* Event Details */}
            <View className="p-4">
                <Text className="text-lg font-bold text-black">{item.title}</Text>
                <Text className="text-gray-600 text-sm mt-1">
                    {item.location.venue}, {item.location.city}
                </Text>

                {/* Date & Price */}
                <View className="flex-row justify-between items-center mt-3">
                    <Text className="text-gray-500 text-sm">{item.date}</Text>
                    <Text className="text-primary-500 font-semibold">
                        {item.price > 0 ? `₹${item.price}` : "Free"}
                    </Text>
                </View>
            </View>
        </View>
    );

    return (
        <View className="flex-1 bg-gray-100 p-5">
            {/* Header */}
            <View className="flex-row justify-between items-center mb-5">
                <Text className="text-2xl font-extrabold text-black">My Events</Text>
                <Icon name="filter-outline" size={26} color="#191d31" />
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
        </View>
    );
};

export default MyEventsScreen;
