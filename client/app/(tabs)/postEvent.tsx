import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import icons from '@/constants/icons';

const EventForm = () => {
  const [imageLink, setImageLink] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [noOfSeats, setNoOfSeats] = useState('');

  const handleSubmit = () => {
    // Handle the form submission logic (e.g., send data to server or log it)
    console.log({
      imageLink,
      eventTitle,
      eventDescription,
      location,
      price,
      noOfSeats
    });
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
            className="mt-8 bg-primary-300 py-3 rounded-xl items-center"
          >
            <Text className="text-white text-lg font-nunito-bold">Create Event</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EventForm;