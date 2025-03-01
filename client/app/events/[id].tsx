import {View, Text, ScrollView, Image,TouchableOpacity} from 'react-native'
import React from 'react'

import images from "@/constants/images";
import {router} from "expo-router";
import {StatusBar} from "react-native";
import {Ionicons} from "@expo/vector-icons";

const  EventDetails = () => {
    return (
        <View className="flex-1 bg-white">
            {/* Transparent Status Bar */}
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

            <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
                {/* Event Image - Fullscreen */}
                <View className="relative">
                    <Image source={images.japan} className="w-full h-96"  />

                    {/* Back Button on Top */}
                    <View className="absolute left-5 top-12 z-10">
                        <TouchableOpacity onPress={() => router.back()} className="bg-black/50 p-2 rounded-full">
                            <Ionicons name="chevron-back" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

                 {/*Event Details*/}
                <View className="p-6 mt-[-20px] bg-white rounded-t-3xl shadow-lg">
                    <Text className="text-3xl font-bold text-gray-900">Title</Text>
                    <Text className="text-gray-500 text-md mt-2">description</Text>

                    {/* Location */}
                    <View className="mt-4 p-4 bg-gray-100 rounded-lg">
                        <Text className="text-gray-700 font-semibold">Location</Text>
                        <Text className="text-gray-600">venue, event.location.city</Text>
                        <Text className="text-gray-600">event.location.state - event.location.pincode</Text>
                    </View>

                    {/* Price & Seats */}
                    <View className="mt-4 flex-row justify-between items-center">
                        <Text className="text-xl font-semibold text-green-600">₹ event.price</Text>
                        <Text className="text-md text-gray-800">Seats Available: event.noOfSeats</Text>
                    </View>

                    {/* Category */}
                    <Text className="text-blue-500 font-semibold mt-2">Category: event.category</Text>
                </View>
            </ScrollView>
        </View>
    )
}
    export default  EventDetails

