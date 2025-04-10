
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";



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
}



const EventDetails = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);
    const router=useRouter()
    useEffect(() => {
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
        fetchEventDetails();
    }, [id]);



    const handleDeleteEvent = async () => {
        Alert.alert(
            "Confirm Deletion",
            "Are you sure you want to delete this event? This action cannot be undone.",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Yes, Delete",
                    onPress: async () => {
                        try {
                            const token = await AsyncStorage.getItem("token");

                            if (!token) {
                                Alert.alert("Error", "You must be logged in to delete an event.");
                                return;
                            }

                            const response = await axios.delete(`${API_URL}/events/${id}`, {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            });

                            if (response.status === 200) {
                                Alert.alert("Success", "Event deleted successfully.");
                                router.push("/profile"); // Redirect after deletion
                            } else {
                                Alert.alert("Error", "Failed to delete event.");
                            }
                        } catch (error) {
                            console.error("Delete Error:", error);
                            Alert.alert("Error", "Something went wrong. Please try again.");
                        }
                    },
                    style: "destructive",
                },
            ]
        );
    };









    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-white">
                <ActivityIndicator size="large" color="#191d31" />
            </View>
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
                        <Text className="text-md text-gray-800">Seats Available: {event.noOfSeats}</Text>
                    </View>


                    <TouchableOpacity className="bg-yellow-400 p-4 mt-6 rounded-lg" onPress={()=>router.push(`/editEvent/${id}`)}>
                    <Text className="text-white text-center text-lg font-semibold">Edit</Text>
                </TouchableOpacity>

                    <TouchableOpacity onPress={handleDeleteEvent} className="bg-red-700 p-4 mt-6 rounded-lg">
                        <Text className="text-white text-center text-lg font-semibold">Delete Event</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>




        </View>
    );
};

export default EventDetails;
