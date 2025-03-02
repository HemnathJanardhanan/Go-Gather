
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView ,Keyboard, TouchableWithoutFeedback,} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {FadeInDown,useSharedValue, withSpring} from "react-native-reanimated";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRef } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';


const API_URL = "http://192.168.29.178:3000/api/auth/events";
 // Replace with your backend URL





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
  const inputRefs: { [key: string]: React.RefObject<TextInput> } = {
    title: useRef<TextInput>(null),
    description: useRef<TextInput>(null),
    venue: useRef<TextInput>(null),
    area: useRef<TextInput>(null),
    city: useRef<TextInput>(null),
    state: useRef<TextInput>(null),
    pincode: useRef<TextInput>(null),
    mapLink: useRef<TextInput>(null),
    date: useRef<TextInput>(null),
    image: useRef<TextInput>(null),
    noOfSeats: useRef<TextInput>(null),
    price: useRef<TextInput>(null),
    category: useRef<TextInput>(null),
  };
  const [eventData, setEventData] = useState<EventData>({
    title: "",
    description: "",
    location: {
      venue: "",
      area: "",
      city: "",
      state: "",
      pincode: 0,
      mapLink: "",
    },
    date: "",
    image: "",
    noOfSeats: 0,
    price: 0,
    category: "",

  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (event:any, date:any) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
      handleChange("date", date.toISOString().split("T")[0]); // Save formatted date (YYYY-MM-DD)
    }
  };

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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 bg-white p-5">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Text className="text-4xl font-nunito-bold text-black mt-6">Create Event</Text>
            <View className="w-full h-2 bg-gray-200 rounded-full mt-4 mb-10">
              <Animated.View className="h-2 bg-blue-500 rounded-full " style={{ width: `${step * 33.3}%` }} />
            </View>

            {step === 1 && (
                <View className="flex items-center space-y-4">
                  <Animated.Text entering={FadeInDown.duration(1000).springify()} className="text-3xl font-nunito-bold text-black mb-3 ">Event Details</Animated.Text>
                <Animated.View entering={FadeInDown.delay(100).duration(1000).springify()} className="bg-black/5 p-5 rounded-2xl w-full mb-5">
                  <TextInput  placeholder="Event Title"
                              value={eventData.title}
                              placeholderTextColor={'gray'}
                              onChangeText={(text) => handleChange("title", text)}
                              ref={inputRefs.title}
                              returnKeyType="next"
                              onSubmitEditing={()=>inputRefs.description.current?.focus()}  />
                </Animated.View>
              <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className="bg-black/5 p-5 rounded-2xl w-full mb-5">
                  <TextInput  placeholder="Description"
                              value={eventData.description}
                              placeholderTextColor={'gray'}
                              onChangeText={(text) => handleChange("description", text)}
                              multiline
                              ref={inputRefs.description}
                              returnKeyType="done"
                              onSubmitEditing={nextStep}/>
                </Animated.View>

                </View>
            )}

            {step === 2 && (
                <View className="flex items-center space-y-4" >
                  <Animated.Text entering={FadeInDown.duration(1000).springify()} className="text-3xl font-nunito-bold text-black mb-3 ">Location Details</Animated.Text>
                  <Animated.View entering={FadeInDown.delay(100).duration(1000).springify()} className="bg-black/5 p-5 rounded-2xl w-full mb-5">
                    <TextInput placeholder="Venue Name"
                               value={eventData.location.venue}
                               placeholderTextColor={'gray'}
                               onChangeText={(text) => handleLocationChange("venue", text)}
                               ref={inputRefs.venue}
                               returnKeyType="next"
                               onSubmitEditing={()=>inputRefs.city.current?.focus()}  />
                  </Animated.View>
                  <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className="bg-black/5 p-5 rounded-2xl w-full mb-5">
                    <TextInput placeholder="City"
                               value={eventData.location.city}
                               placeholderTextColor={'gray'}
                               onChangeText={(text) => handleLocationChange("city", text)}
                               ref={inputRefs.city}
                               returnKeyType="next"
                               onSubmitEditing={()=>inputRefs.state.current?.focus()} />
                  </Animated.View>
                  <Animated.View entering={FadeInDown.delay(300).duration(1000).springify()} className="bg-black/5 p-5 rounded-2xl w-full mb-5">
                    <TextInput placeholder="State"
                               value={eventData.location.state}
                               placeholderTextColor={'gray'}
                               onChangeText={(text) => handleLocationChange("state", text)}
                               ref={inputRefs.state}
                               returnKeyType="next"
                               onSubmitEditing={()=>inputRefs.pincode.current?.focus()} />
                  </Animated.View>
                  <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()} className="bg-black/5 p-5 rounded-2xl w-full mb-5">
                    <TextInput
                                  placeholder="Pincode"
                                  placeholderTextColor={'gray'}
                                  keyboardType="numeric"
                                  value={eventData.location.pincode.toString()} // Convert number to string for input
                                  onChangeText={(text) => handleLocationChange("pincode", Number(text) || 0)} // Convert back to number
                                  ref={inputRefs.pincode}
                                  returnKeyType="next"
                                  onSubmitEditing={()=>inputRefs.mapLink.current?.focus()}
                    />
                  </Animated.View>
                  <Animated.View entering={FadeInDown.delay(500).duration(1000).springify()} className="bg-black/5 p-5 rounded-2xl w-full ">
                    <TextInput placeholder="Google Map Link"
                               value={eventData.location.mapLink}
                               placeholderTextColor={'gray'}
                               onChangeText={(text) => handleLocationChange("mapLink", text)}
                               ref={inputRefs.pincode}
                               returnKeyType="done"
                                onSubmitEditing={nextStep}
                    />
                  </Animated.View>
                </View>
            )}

            {step === 3 && (
                <View className="flex items-center space-y-4">
                  <Animated.Text entering={FadeInDown.duration(1000).springify()} className="text-3xl font-nunito-bold text-black mb-3 ">Other Details</Animated.Text>
                  <Animated.View entering={FadeInDown.delay(100).duration(1000).springify()} className="bg-black/5 p-5 rounded-2xl w-full mb-5">
                    {/*<TextInput placeholder="Date (YYYY-MM-DD)"*/}
                    {/*           value={eventData.date}*/}
                    {/*           placeholderTextColor={'gray'}*/}
                    {/*           onChangeText={(text) => handleChange("date", text)}*/}
                    {/*           ref={inputRefs.date}*/}
                    {/*           returnKeyType="next"*/}
                    {/*           onSubmitEditing={()=>inputRefs.image.current?.focus()}*/}
                    {/*/>*/}
                    <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                      <View className="bg-black/5 p-5 rounded-2xl w-full mb-4">
                        <Text className="text-black">{eventData.date || "Select Date (YYYY-MM-DD)"}</Text>
                      </View>
                    </TouchableOpacity>

                    {showDatePicker && (
                        <DateTimePicker
                            value={selectedDate}
                            mode="date"
                            display={Platform.OS === "ios" ? "inline" : "default"}
                            onChange={handleDateChange}
                        />
                    )}

                  </Animated.View>
                  <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className="bg-black/5 p-5 rounded-2xl w-full mb-5">
                    <TextInput placeholder="Image URL"
                               value={eventData.image}
                               placeholderTextColor={'gray'}
                               onChangeText={(text) => handleChange("image", text)}
                               ref={inputRefs.image}
                               returnKeyType="next"
                               onSubmitEditing={()=>inputRefs.category.current?.focus()}
                    />
                  </Animated.View>
                  <Animated.View entering={FadeInDown.delay(300).duration(1000).springify()} className="bg-black/5 p-5 rounded-2xl w-full mb-5">
                    <TextInput placeholder="Category"
                               value={eventData.category}
                               placeholderTextColor={'gray'}
                               onChangeText={(text) => handleChange("category", text)}
                               ref={inputRefs.category}
                               returnKeyType="done"
                               onSubmitEditing={Keyboard.dismiss}
                    />
                  </Animated.View>
                </View>
            )}

            <View className="flex-row justify-between items-center mt-6">
              {step > 1 && (
                  <TouchableOpacity onPress={prevStep} className="px-5 py-3 bg-gray-300 rounded-lg">
                    <Text className="text-black">Back</Text>
                  </TouchableOpacity>
              )}


              {step < 3 ? (
                <TouchableOpacity onPress={nextStep} className="px-5 py-3 bg-blue-500 rounded-lg ml-auto">
                  <Text className="text-white">Next</Text>
                </TouchableOpacity>
              ) : (
                  <TouchableOpacity onPress={handleSubmit} className="px-5 py-3 bg-green-500 rounded-lg ml-auto">
                    <Text className="text-white">Submit</Text>
                  </TouchableOpacity>
              )}
            </View>

        </View>
        </ScrollView>
      </SafeAreaView>
      </TouchableWithoutFeedback>
  );
};

export default EventForm;



