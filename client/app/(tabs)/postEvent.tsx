import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSharedValue, withSpring } from "react-native-reanimated";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_URL = "http://192.168.29.133:3000/api/events"; // Replace with your backend URL


interface Location {
  venue: string;
  area: string;
  city: string;
  state: string;
  pincode: number;
  mapLink: string;// Ensure this is a number
}

interface EventData {
  title: string;
  description: string;
  location: Location;
  date: string;
  image: string;
  noOfSeats: number;
  price: number;
  category: string;

}

const EventForm = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const progress = useSharedValue(0);

  const [eventData, setEventData] = useState<EventData>({
    title: "",
    description: "",
    location: {
      venue: "",
      area: "",
      city: "",
      state: "",
      pincode: 0,
      mapLink: "",// Default as a number
    },
    date: "",
    image: "",
    noOfSeats: 0,
    price: 0,
    category: "",

  });


  const handleChange = <K extends keyof EventData>(key: K, value: EventData[K]) => {
    setEventData((prev) => ({ ...prev, [key]: value }));
  };

  const handleLocationChange = <K extends keyof Location>(key: K, value: Location[K]) => {
    setEventData((prev) => ({
      ...prev,
      location: { ...prev.location, [key]: value },
    }));
  };


  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
      progress.value = withSpring(step * 33.3);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      progress.value = withSpring((step - 2) * 33.3);
    }
  };

  const handleSubmit = async () => {
    if (!eventData.title || !eventData.description || !eventData.location.city || !eventData.date) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }
    try {
      const token = await AsyncStorage.getItem("token");
      await axios.post(API_URL, eventData, { headers: { Authorization: `Bearer ${token}` } });
      Alert.alert("Success", "Event created successfully!");
      router.replace("/events/myevents");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        Alert.alert("Error", error.response?.data?.error || "Something went wrong.");
      } else {
        Alert.alert("Error", "An unexpected error occurred.");
      }
    }

  };

  return (
      <SafeAreaView className="flex-1 bg-white p-5">
        <ScrollView showsVerticalScrollIndicator={false}>
          <Animated.View entering={FadeInRight} exiting={FadeOutLeft}>
            <Text className="text-2xl font-bold text-black">Create Event</Text>
            <View className="w-full h-2 bg-gray-200 rounded-full mt-4">
              <Animated.View className="h-2 bg-blue-500 rounded-full" style={{ width: `${step * 33.3}%` }} />
            </View>

            {step === 1 && (
                <View>
                  <TextInput placeholder="Event Title" value={eventData.title} onChangeText={(text) => handleChange("title", text)} className="border-b-2 border-gray-300 py-2 mt-4" />
                  <TextInput placeholder="Description" value={eventData.description} onChangeText={(text) => handleChange("description", text)} multiline className="border-b-2 border-gray-300 py-2 mt-4" />
                </View>
            )}

            {step === 2 && (
                <View>
                  <TextInput placeholder="Venue Name" value={eventData.location.venue} onChangeText={(text) => handleLocationChange("venue", text)} className="border-b-2 border-gray-300 py-2 mt-4" />
                  <TextInput placeholder="City" value={eventData.location.city} onChangeText={(text) => handleLocationChange("city", text)} className="border-b-2 border-gray-300 py-2 mt-4" />
                  <TextInput placeholder="State" value={eventData.location.state} onChangeText={(text) => handleLocationChange("state", text)} className="border-b-2 border-gray-300 py-2 mt-4" />
                  <TextInput
                      placeholder="Pincode"
                      keyboardType="numeric"
                      value={eventData.location.pincode.toString()} // Convert number to string for input
                      onChangeText={(text) => handleLocationChange("pincode", Number(text) || 0)} // Convert back to number
                      className="border-b-2 border-gray-300 py-2 mt-4"
                  />
                </View>
            )}

            {step === 3 && (
                <View>
                  <TextInput placeholder="Date (YYYY-MM-DD)" value={eventData.date} onChangeText={(text) => handleChange("date", text)} className="border-b-2 border-gray-300 py-2 mt-4" />
                  <TextInput placeholder="Image URL" value={eventData.image} onChangeText={(text) => handleChange("image", text)} className="border-b-2 border-gray-300 py-2 mt-4" />
                  <TextInput placeholder="Category" value={eventData.category} onChangeText={(text) => handleChange("category", text)} className="border-b-2 border-gray-300 py-2 mt-4" />
                </View>
            )}

            <View className="flex-row justify-between mt-6">
              {step > 1 && (
                  <TouchableOpacity onPress={prevStep} className="px-5 py-3 bg-gray-300 rounded-lg">
                    <Text className="text-black">Back</Text>
                  </TouchableOpacity>
              )}

              {step < 3 ? (
                  <TouchableOpacity onPress={nextStep} className="px-5 py-3 bg-blue-500 rounded-lg">
                    <Text className="text-white">Next</Text>
                  </TouchableOpacity>
              ) : (
                  <TouchableOpacity onPress={handleSubmit} className="px-5 py-3 bg-green-500 rounded-lg">
                    <Text className="text-white">Submit</Text>
                  </TouchableOpacity>
              )}
            </View>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
  );
};

export default EventForm;



