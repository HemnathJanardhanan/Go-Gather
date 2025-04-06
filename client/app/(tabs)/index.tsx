import {Alert, FlatList, Image, Pressable, Text, TouchableOpacity, View, ScrollView, Modal} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import images from "@/constants/images";
import icons from "@/constants/icons";
import Search from "@/components/search";
import {FeaturedCard} from "@/components/EventCard";
import Filter from "@/components/filter";
import {useRouter,useFocusEffect} from "expo-router";
import React,{useState,useEffect} from "react";
import BannerVideo from "@/components/BannerVideo";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import LoadingScreen from "@/app/LoadingScreen";
const API_URL = Constants.expoConfig?.extra?.API_URL || "http://192.168.29.133:3000";


interface Location {
    venue: string;
    area: string;
    city: string;
    state: string;
    pincode: number;
    mapLink: string;// Ensure this is a number
}

interface EventData {
    id:string;
    title: string;
    description: string;
    location: Location;
    date: string;
    image: string;
    noOfSeats: number;
    remainingSeats: number;
    price: number;
    category: string;
    attendees: any;
}

interface UserProfile {
    name: string;
    email: string;
    profilePhoto?: string;
}

export default function Index() {
    const router = useRouter();
    const [events,setEvents] = useState<EventData[]>([]);
    const [featuredEvents,setFeaturedEvents] = useState<EventData[]>([]);
    const [freeEvents,setFreeEvents] = useState<EventData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<UserProfile | null>(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = await AsyncStorage.getItem("token");
                if (!token) return;
                console.log(`${API_URL}/users/profile`)
                const res = await axios.get<UserProfile>(`${API_URL}/users/profile`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setUser(res.data);
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };
        fetchUserProfile();
    }, []);


    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            try {
                const response = await axios.get<EventData[]>(`${API_URL}/events`);
                const normalizedEvents = response.data.map(event => ({
                    ...event,
                    id: (event as any)._id, // rename _id to id
                }));
                setEvents(normalizedEvents);

                const sortedFeatured = [...normalizedEvents]
                    .sort((a, b) => b.attendees.length - a.attendees.length)
                    .slice(0, 5);

                const freeOnly = normalizedEvents.filter(event => event.price === 0);

                setFeaturedEvents(sortedFeatured);
                setFreeEvents(freeOnly);
            } catch (error) {
                console.error("Error fetching events:", error);
                Alert.alert("Error", "Failed to load events. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);


  return (
      <>
      {loading && <Modal transparent visible={loading} animationType="fade">
          <LoadingScreen />
      </Modal>}

        <SafeAreaView edges={['top']} className="flex-1 bg-white">
            <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-32">
                <View className="px-5">

                    {/* Header Section */}
                    <View className="flex flex-row items-center justify-between mt-5">
                        <View className="flex flex-row items-center">
                            <Pressable onPress={() => router.push("/profile")}>
                                <Image source={user?.profilePhoto ? { uri: user.profilePhoto } : images.avatar} className="size-12 rounded-full" />
                            </Pressable>
                            <View className="flex flex-col items-start ml-2 justify-center">
                                <Text className="text-xs font-nunito text-black-100">Good Morning</Text>
                                <Text className="text-base font-nunito-medium text-black-300">{user?.name || "Guest"}</Text>
                            </View>
                        </View>
                        <Image source={icons.bell} className="size-6" />
                    </View>

                    {/* Search Component */}
                    <Search />
                    {/* Video */}
                    <BannerVideo />

                    {/* Trending Events */}
                    <View className="my-5">
                        <View className="flex flex-row items-center justify-between">
                            <Text className="text-2xl font-nunito-bold text-black-300">Trending</Text>
                            <TouchableOpacity onPress={() => router.push("/events/explore")}>
                                <Text className="text-base font-nunito-bold text-primary-300">See All</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={featuredEvents}
                            renderItem={({ item }) => (
                                <FeaturedCard
                                    id={item.id}
                                    title={item.title}
                                    location={item.location}
                                    price={item.price}
                                    category={item.category}
                                    image={item.image}
                                />
                            )}
                            keyExtractor={(item, index) =>
                                item?.id?.toString?.() ?? index.toString()
                            }
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            bounces={false}
                            contentContainerClassName="flex gap-5 mt-5"
                        />
                    </View>

                    {/* Free Events Section */}
                    <View className="my-5">
                        <View className="flex flex-row items-center justify-between">
                            <Text className="text-2xl font-nunito-bold text-black-300">Free Events</Text>
                            <TouchableOpacity onPress={() => router.push("/events/explore")}>
                                <Text className="text-base font-nunito-bold text-primary-300">See All</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={freeEvents}
                            renderItem={({ item }) => (
                                <FeaturedCard
                                    id={item.id}
                                    title={item.title}
                                    location={item.location}
                                    price={item.price}
                                    category={item.category}
                                    image={item.image}
                                />
                            )}
                            keyExtractor={(item, index) =>
                                item?.id?.toString?.() ?? index.toString()
                            }
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            bounces={false}
                            contentContainerClassName="flex gap-5 mt-5"
                        />
                    </View>

                    {/* All Events Section (Now Horizontal) */}
                    <View className="my-5">
                        <View className="flex flex-row items-center justify-between">
                            <Text className="text-2xl font-nunito-bold text-black-300">All Events</Text>
                            <TouchableOpacity onPress={() => router.push("/events/explore")}>
                                <Text className="text-base font-nunito-bold text-primary-300">See All</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Filters */}
                        <Filter />
                        <FlatList
                            data={events}
                            renderItem={({ item }) => (
                                <FeaturedCard
                                    id={item.id}
                                    title={item.title}
                                    location={item.location}
                                    price={item.price}
                                    category={item.category}
                                    image={item.image}
                                />
                            )}
                            keyExtractor={(item, index) =>
                                item?.id?.toString?.() ?? index.toString()
                            }
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            bounces={false}
                            contentContainerClassName="flex gap-5 mt-5"
                        />
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
      </>
  );
}
