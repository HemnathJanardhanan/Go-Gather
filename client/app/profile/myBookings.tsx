import { View, Text, FlatList, TouchableOpacity,Alert } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";
import { format } from "date-fns";
import LoadingScreen from "@/app/LoadingScreen";
import Constants from "expo-constants";
import { SafeAreaView } from 'react-native-safe-area-context';
const API_URL = Constants.expoConfig?.extra?.API_URL || "http://192.168.29.133:3000";
// adjust if needed

export default function MyBookings() {
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = await AsyncStorage.getItem("token");
                const response = await axios.get(`${API_URL}/rsvp/my-bookings`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setBookings(response.data || []);
            } catch (err) {
                console.error("Failed to fetch bookings:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    if (loading) {
        return <LoadingScreen/>
    }

    if (bookings.length === 0) {
        return (
            <View className="flex-1 justify-center items-center bg-white">
                <Text className="text-lg font-semibold text-gray-600">You haven’t RSVP’d to anything yet.</Text>
                <TouchableOpacity
                    className="mt-4 bg-blue-500 px-5 py-3 rounded-full"
                    onPress={() => router.push("/events/explore")}
                >
                    <Text className="text-white font-semibold">Find Events</Text>
                </TouchableOpacity>
            </View>
        );
    }
    const deleteBooking = async (bookingId: string) => {
        try {
            const token = await AsyncStorage.getItem("token");
            if (!token) return;
            const response = await axios.delete(`${API_URL}/rsvp/${bookingId}`,{
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.status === 200) {
                console.log("✅ Booking deleted:", bookingId);
                setBookings(prev => prev.filter(b => b._id !== bookingId));
            } else {
                console.warn("⚠️ Unexpected response:", response.status);
            }
        } catch (error) {
            console.error("❌ Axios error deleting booking:", error);
            Alert.alert("Error", "Could not delete booking. Try again.");
        }
    };


    const renderItem = ({ item }: { item: any }) => {
        const event = item.event || item; // depends on backend structure
        const date = format(new Date(event.date), "PPP");
        const time = format(new Date(event.date), "p");
        const handleDelete = () => {
            Alert.alert(
                "Cancel Booking",
                "Are you sure you want to delete this booking?",
                [
                    { text: "No", style: "cancel" },
                    {
                        text: "Yes",
                        style: "destructive",
                        onPress: () => deleteBooking(item._id),
                    },
                ]
            );
        };
        return (
            <View className="flex-row mx-4 my-3 bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100">

                {/* Stub */}
                <View className="w-20 bg-gradient-to-b from-red-600 to-red-400 justify-center items-center p-2">
                    <Text className="text-white text-xs font-semibold tracking-widest rotate-[-90deg]">
                        ADMIT ONE
                    </Text>
                    <View className="h-10 w-1 bg-white rounded-full my-2" />
                    <Text className="text-white text-xs font-light rotate-[-90deg]">
                        {date.split(",")[0]}
                    </Text>
                </View>

                {/* Main Ticket Body */}
                <View className="flex-1 p-4 justify-between">
                    <View>
                        <Text className="text-lg font-bold text-gray-900">{event.title}</Text>
                        <Text className="text-sm text-gray-600 mt-1">{event.location.venue}</Text>
                        <Text className="text-sm text-gray-500">{date} • {time}</Text>
                    </View>

                    {/* Perforated Line */}
                    <View className="border-t border-dashed border-gray-300 my-3" />

                    {/* Footer */}
                    <View className="flex-row justify-between items-center">
                        <Text className="text-[10px] text-gray-400 font-mono">
                            #{item._id.slice(-6).toUpperCase()}
                        </Text>
                        <TouchableOpacity
                            onPress={handleDelete}
                            className="bg-red-500 px-4 py-1.5 rounded-full shadow-sm active:opacity-80"
                        >
                            <Text className="text-white text-xs font-semibold">Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );



    };

    return (
        <SafeAreaView className='h-full bg-white'>
            <View className="flex-1 bg-gray-50 px-4 pt-6">
                <Text className="text-4xl font-nunito-ExtraBold text-gray-800 my-4">🎟️ My Bookings</Text>
                <FlatList
                    data={bookings}
                    keyExtractor={(item) => item._id}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    );
}
