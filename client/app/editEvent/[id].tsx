
import React, { useState,useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert,Keyboard, TouchableWithoutFeedback,} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {FadeInDown,useSharedValue, withSpring} from "react-native-reanimated";
import {useLocalSearchParams, useRouter} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRef } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';
import Constants from "expo-constants";
import * as Location from "expo-location";
import DropDownPicker from 'react-native-dropdown-picker';

const API_URL = `${Constants?.expoConfig?.extra?.API_URL ?? "http://192.168.29.133:3000/api"}/events`;

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
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
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
    const fetchEventDetails = async () => {
        setLoading(true);
        try {

            const response = await axios.get(`${API_URL}/${id}`);
            setEventData(response.data);
        } catch (error) {
            console.error("Error fetching event details:", error);
            Alert.alert("Error", "Failed to load event details. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchEventDetails();
    }, []);

    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState('');
    const [items, setItems] = useState([
        { label: 'Guest Lecture', value: 'guest_lecture' },
        { label: 'Workshop', value: 'workshop' },
        { label: 'Hackathon', value: 'hackathon' },
        { label: 'Tech Talk', value: 'tech_talk' },
        { label: 'Cultural Fest', value: 'cultural_fest' },
        { label: 'Sports Tournament', value: 'sports_tournament' },
        { label: 'Webinar', value: 'webinar' },
        { label: 'Placement Drive', value: 'placement_drive' },
        { label: 'Club Meeting', value: 'club_meeting' },
        { label: 'Career Fair', value: 'career_fair' },
    ]);

    const fetchAndSetLocation = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert("Permission denied", "Location permission is required.");
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            const reverseGeocode = await Location.reverseGeocodeAsync({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });

            if (reverseGeocode.length > 0) {
                const address = reverseGeocode[0];

                setEventData((prev) => ({
                    ...prev,
                    location: {
                        ...prev.location,
                        // 👇 Do NOT touch venue (user will manually enter it)
                        area: address.subregion || "",
                        city: address.city || "",
                        state: address.region || "",
                        pincode: Number(address.postalCode) || 0,
                        mapLink: `https://www.google.com/maps?q=${location.coords.latitude},${location.coords.longitude}`,
                    },
                }));
            }
        } catch (error) {
            Alert.alert("Error", "Unable to fetch location.");
            console.error(error);
        }
    };



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
        console.log(eventData)
        if (
            !eventData.title ||
            !eventData.description ||
            !eventData.location.venue ||
            !eventData.location.area ||
            !eventData.location.city ||
            !eventData.location.state ||
            !eventData.location.pincode ||
            !eventData.location.mapLink ||
            !eventData.date ||
            !eventData.noOfSeats
        ) {
            Alert.alert("Error", "Please fill in all required fields.");
            return;
        }

        try {
            const token = await AsyncStorage.getItem("token");

            await axios.put(`${API_URL}/${id}`, eventData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            Alert.alert("Success", "Event Updated successfully!");
            setStep(1);
            Object.values(inputRefs).forEach((ref) => ref.current?.clear());
            router.replace("/(tabs)");
            setTimeout(() => router.push("/profile/myevents"), 1000);


        } catch (error: unknown) {
            console.error("Event creation failed:", error);

            if (axios.isAxiosError(error)) {
                Alert.alert("Error", error.response?.data?.error || "Something went wrong.");
            } else {
                Alert.alert("Error", "An unexpected error occurred.");
            }
        }
    };
    useEffect(() => {
        if (category) {
            handleChange("category", category);
        }
    }, [category]);


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView className="flex-1 bg-white p-5">
                <View>

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
                            <View className="flex items-center space-y-4">
                                <Animated.Text
                                    entering={FadeInDown.duration(1000).springify()}
                                    className="text-3xl font-nunito-bold text-black mb-3"
                                >
                                    Location Details
                                </Animated.Text>

                                {/* 📍 Button to fetch location */}
                                <TouchableOpacity
                                    onPress={fetchAndSetLocation}
                                    className="bg-blue-100 px-4 py-2 rounded-xl mb-3 self-start"
                                >
                                    <Text className="text-blue-700 font-semibold">📍 Use Current Location</Text>
                                </TouchableOpacity>

                                {/* 🏢 Venue Name - user must fill this manually */}
                                <Animated.View
                                    entering={FadeInDown.delay(100).duration(1000).springify()}
                                    className="bg-black/5 p-5 rounded-2xl w-full mb-2"
                                >
                                    <TextInput
                                        placeholder="Venue Name"
                                        value={eventData.location.venue}
                                        placeholderTextColor={'gray'}
                                        onChangeText={(text) => handleLocationChange("venue", text)}
                                        ref={inputRefs.venue}
                                        returnKeyType="next"
                                        onSubmitEditing={() => inputRefs.city.current?.focus()}
                                    />
                                    {eventData.location.area !== "" && (
                                        <Text className="text-gray-500 text-xs mt-1">Detected area: {eventData.location.area}</Text>
                                    )}
                                </Animated.View>

                                {/* 🏙️ City */}
                                <Animated.View
                                    entering={FadeInDown.delay(200).duration(1000).springify()}
                                    className="bg-black/5 p-5 rounded-2xl w-full mb-2"
                                >
                                    <TextInput
                                        placeholder="City"
                                        value={eventData.location.city}
                                        placeholderTextColor={'gray'}
                                        onChangeText={(text) => handleLocationChange("city", text)}
                                        ref={inputRefs.city}
                                        returnKeyType="next"
                                        onSubmitEditing={() => inputRefs.state.current?.focus()}
                                    />
                                </Animated.View>

                                {/* 🗺️ State */}
                                <Animated.View
                                    entering={FadeInDown.delay(300).duration(1000).springify()}
                                    className="bg-black/5 p-5 rounded-2xl w-full mb-2"
                                >
                                    <TextInput
                                        placeholder="State"
                                        value={eventData.location.state}
                                        placeholderTextColor={'gray'}
                                        onChangeText={(text) => handleLocationChange("state", text)}
                                        ref={inputRefs.state}
                                        returnKeyType="next"
                                        onSubmitEditing={() => inputRefs.pincode.current?.focus()}
                                    />
                                </Animated.View>

                                {/* 🧾 Pincode */}
                                <Animated.View
                                    entering={FadeInDown.delay(400).duration(1000).springify()}
                                    className="bg-black/5 p-5 rounded-2xl w-full mb-2"
                                >
                                    <TextInput
                                        placeholder="Pincode"
                                        placeholderTextColor={'gray'}
                                        keyboardType="numeric"
                                        value={eventData.location.pincode.toString()}
                                        onChangeText={(text) =>
                                            handleLocationChange("pincode", Number(text) || 0)
                                        }
                                        ref={inputRefs.pincode}
                                        returnKeyType="next"
                                        onSubmitEditing={() => inputRefs.mapLink.current?.focus()}
                                    />
                                </Animated.View>

                                {/* 🌍 Google Maps Link */}
                                <Animated.View
                                    entering={FadeInDown.delay(500).duration(1000).springify()}
                                    className="bg-black/5 p-5 rounded-2xl w-full"
                                >
                                    <TextInput
                                        placeholder="Google Map Link"
                                        value={eventData.location.mapLink}
                                        placeholderTextColor={'gray'}
                                        onChangeText={(text) => handleLocationChange("mapLink", text)}
                                        ref={inputRefs.mapLink}
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
                                <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()} className="bg-black/5 p-5 rounded-2xl w-full mb-5">
                                    <TextInput
                                        placeholder="No. of Seats"
                                        keyboardType="numeric"
                                        value={eventData.noOfSeats.toString()}
                                        onChangeText={(text) => handleChange("noOfSeats", Number(text) || 0)}
                                        ref={inputRefs.noOfSeats}
                                        returnKeyType="next"
                                        onSubmitEditing={() => inputRefs.price.current?.focus()}
                                    />
                                </Animated.View>
                                <Animated.View entering={FadeInDown.delay(500).duration(1000).springify()} className="bg-black/5 p-5 rounded-2xl w-full mb-5">
                                    <TextInput
                                        placeholder="Ticket Price (in ₹)"
                                        keyboardType="numeric"
                                        value={eventData.price.toString()}
                                        onChangeText={(text) => handleChange("price", Number(text) || 0)}
                                        ref={inputRefs.price}
                                        returnKeyType="next"
                                        onSubmitEditing={() => inputRefs.image.current?.focus()}
                                        placeholderTextColor={'gray'}
                                    />
                                </Animated.View>


                                <Animated.View entering={FadeInDown.delay(300).duration(1000).springify()} className="bg-black/5 p-5 rounded-2xl w-full mb-5">
                                    <TextInput
                                        placeholder="Image URL"
                                        value={eventData.image}
                                        onChangeText={(text) => handleChange("image", text)}
                                        placeholderTextColor={'gray'}
                                        ref={inputRefs.image}
                                        returnKeyType="next"
                                        onSubmitEditing={() => inputRefs.category.current?.focus()}
                                    />
                                </Animated.View>

                                <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()} className="z-50 w-full">
                                    <DropDownPicker
                                        open={open}
                                        value={eventData.category}
                                        items={items}
                                        setOpen={setOpen}
                                        setValue={setCategory}

                                        setItems={setItems}
                                        placeholder="Select Event Category"
                                        containerStyle={{ height: 60, zIndex: 3000 }}
                                        style={{
                                            backgroundColor: '#f3f4f6',
                                            borderRadius: 16,
                                            paddingHorizontal: 16,
                                            paddingVertical: 12,
                                        }}
                                        labelStyle={{
                                            fontFamily: 'Nunito-Bold',
                                            fontSize: 16,
                                            color: 'black',
                                        }}
                                        textStyle={{
                                            fontFamily: 'Nunito-Regular',
                                            fontSize: 16,
                                            color: '#111827',
                                        }}
                                        dropDownContainerStyle={{
                                            backgroundColor: '#f9fafb',
                                            borderRadius: 12,
                                        }}
                                        listMode="SCROLLVIEW"
                                    />

                                </Animated.View>
                            </View>
                        )}

                        <View className="flex-row justify-between mt-6">
                            {step > 1 && (
                                <TouchableOpacity onPress={prevStep} className="bg-gray-300 px-4 py-2 rounded-xl">
                                    <Text className="text-gray-700">⬅ Back</Text>
                                </TouchableOpacity>
                            )}
                            {step < 3 && (
                                <TouchableOpacity onPress={nextStep} className="bg-blue-500 px-4 py-2 rounded-xl">
                                    <Text className="text-white">Next ➡</Text>
                                </TouchableOpacity>
                            )}
                            {step === 3 && (
                                <TouchableOpacity onPress={handleSubmit} className="bg-green-500 px-4 py-2 rounded-xl">
                                    <Text className="text-white">✅ Submit</Text>
                                </TouchableOpacity>
                            )}
                        </View>


                    </View>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

export default EventForm;



