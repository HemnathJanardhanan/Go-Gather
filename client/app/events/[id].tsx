

import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, Alert, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import Constants from "expo-constants";

const API_URL = `${Constants?.expoConfig?.extra?.API_URL ?? "http://192.168.29.133:3000/api"}/events`;

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
    category: string;
}

const EventDetails = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [seats, setSeats] = useState(1);

    useEffect(() => {
        const fetchEventDetails = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${API_URL}/${id}`);
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

    const handleRSVP = async () => {
        try {
            await axios.post(`${API_URL}/rsvp`, { eventId: id, seats });
            Alert.alert("Success", "RSVP confirmed!");
            setModalVisible(false);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                Alert.alert("Error", error.response?.data?.error || "RSVP failed");
            } else {
                Alert.alert("Error", "An unexpected error occurred");
            }
        }
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

                    <Text className="text-blue-500 font-semibold mt-2">Category: {event.category}</Text>

                    {/* RSVP Button */}
                    <TouchableOpacity onPress={() => setModalVisible(true)} className="bg-orange-500 p-4 mt-6 rounded-lg">
                        <Text className="text-white text-center text-lg font-semibold">RSVP</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* RSVP Modal */}
            <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                <View className="flex-1 justify-end bg-black/50">
                    <View className="bg-white p-6 rounded-t-3xl shadow-lg">
                        <Text className="text-xl font-bold text-gray-900">Confirm RSVP</Text>
                        <Text className="text-gray-600">Select number of seats:</Text>

                        <View className="flex-row justify-between items-center mt-4">
                            <TouchableOpacity disabled={seats <= 1} onPress={() => setSeats(seats - 1)} className="bg-gray-300 p-2 rounded-lg">
                                <Ionicons name="remove" size={24} color="black" />
                            </TouchableOpacity>
                            <Text className="text-lg font-semibold">{seats}</Text>
                            <TouchableOpacity disabled={seats >= event.noOfSeats} onPress={() => setSeats(seats + 1)} className="bg-gray-300 p-2 rounded-lg">
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