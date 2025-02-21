import {
  View, Text, TextInput, TouchableOpacity, ScrollView, Alert
} from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import {useRouter} from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

const API_URL = "http://192.168.29.133:3000/api/events"; // Replace with your backend URL

const EventForm = () => {
  const router = useRouter();
  const [imageLink, setImageLink] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [noOfSeats, setNoOfSeats] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!eventTitle || !eventDescription || !location || !price || !noOfSeats) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      const token = await AsyncStorage.getItem("token"); // Get stored token

      const response = await axios.post(
          API_URL,
          {
            imageLink,
            eventTitle,
            eventDescription,
            location,
            price,
            noOfSeats,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );

      Alert.alert("Success", "Event created successfully!");
      router.replace("/events/myevents");
      console.log("Event Created:", response.data);

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Event Creation Error:", error.response?.data || error.message);
        Alert.alert("Event Creation Failed", error.response?.data?.error || "Invalid input. Please check your details.");
      } else {
        console.error("Unexpected Error:", error);
        Alert.alert("Event Creation Failed", "Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
      <SafeAreaView className="flex-1 bg-white p-5">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="mt-5">
            <Text className="text-2xl font-nunito-bold text-black-300">Create Event</Text>

            <View className="mt-6">
              <Text className="text-lg font-nunito-medium text-black-300">Event Image Link</Text>
              <TextInput
                  value={imageLink}
                  onChangeText={setImageLink}
                  placeholder="Enter image URL"
                  className="border-b-2 border-gray-300 py-2 text-lg mt-2"
              />
            </View>

            <View className="mt-6">
              <Text className="text-lg font-nunito-medium text-black-300">Event Title</Text>
              <TextInput
                  value={eventTitle}
                  onChangeText={setEventTitle}
                  placeholder="Enter event title"
                  className="border-b-2 border-gray-300 py-2 text-lg mt-2"
              />
            </View>

            <View className="mt-6">
              <Text className="text-lg font-nunito-medium text-black-300">Event Description</Text>
              <TextInput
                  value={eventDescription}
                  onChangeText={setEventDescription}
                  placeholder="Enter event description"
                  multiline
                  numberOfLines={4}
                  className="border-b-2 border-gray-300 py-2 text-lg mt-2"
              />
            </View>

            <View className="mt-6">
              <Text className="text-lg font-nunito-medium text-black-300">Location</Text>
              <TextInput
                  value={location}
                  onChangeText={setLocation}
                  placeholder="Enter event location"
                  className="border-b-2 border-gray-300 py-2 text-lg mt-2"
              />
            </View>

            <View className="mt-6">
              <Text className="text-lg font-nunito-medium text-black-300">Price</Text>
              <TextInput
                  value={price}
                  onChangeText={setPrice}
                  placeholder="Enter event price"
                  keyboardType="numeric"
                  className="border-b-2 border-gray-300 py-2 text-lg mt-2"
              />
            </View>

            <View className="mt-6">
              <Text className="text-lg font-nunito-medium text-black-300">Number of Seats</Text>
              <TextInput
                  value={noOfSeats}
                  onChangeText={setNoOfSeats}
                  placeholder="Enter number of seats"
                  keyboardType="numeric"
                  className="border-b-2 border-gray-300 py-2 text-lg mt-2"
              />
            </View>

            <TouchableOpacity
                onPress={handleSubmit}
                disabled={loading}
                className="mt-8 bg-primary-300 py-3 rounded-xl items-center"
            >
              <Text className="text-white text-lg font-nunito-bold">
                {loading ? "Creating Event..." : "Create Event"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
  );
};

export default EventForm;
