import {Alert, FlatList, Image, Pressable, Text, TouchableOpacity, View, ScrollView} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import images from "@/constants/images";
import icons from "@/constants/icons";
import Search from "@/components/search";
import {FeaturedCard} from "@/components/EventCard";
import Filter from "@/components/filter";
import {useRouter} from "expo-router";
import React,{useState,useEffect} from "react";
import BannerVideo from "@/components/BannerVideo";
import Constants from "expo-constants";

import axios from "axios";

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
                const token = localStorage.getItem("token");
                if (!token) return;
                
                const res = await axios.get<UserProfile>(`${API_URL}/user/profile`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (res.status === 200) {
                    setUser(res.data);
                }
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
                setEvents(response.data);
                setFeaturedEvents(response.data.sort((a: EventData, b: EventData) => b.attendees - a.attendees).slice(0, 5));
                setFreeEvents(response.data.filter((event: EventData)=>event.price===0))
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

        <SafeAreaView className="bg-white h-full">
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
                                    location={item.location.city}
                                    price={item.price}
                                    category={item.category}
                                    image={item.image}
                                />
                            )}
                            keyExtractor={(item) => item.id.toString()}
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
                                    location={item.location.city}
                                    price={item.price}
                                    category={item.category}
                                    image={item.image}
                                />
                            )}
                            keyExtractor={(item) => item.id.toString()}
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
                                    location={item.location.city}
                                    price={item.price}
                                    category={item.category}
                                    image={item.image}
                                />
                            )}
                            keyExtractor={(item) => item.id.toString()}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            bounces={false}
                            contentContainerClassName="flex gap-5 mt-5"
                        />
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>



    // <SafeAreaView className="bg-white h-full">
      //     <FlatList
      //         data={events}
      //         renderItem={({ item }) => (
      //             <FeaturedCard
      //                 id={item.id}
      //                 title={item.title}
      //                 location={item.location.city}
      //                 price={item.price}
      //                 category={item.category}
      //                 image={item.image}
      //             />
      //         )}
      //         keyExtractor={(item) => item.id.toString()}
      //         numColumns={2}
      //         contentContainerClassName="pb-32"
      //         columnWrapperClassName="flex gap-5 px-5"
      //         showsVerticalScrollIndicator={false}
      //         ListHeaderComponent={
      //             <View className="px-5">
      //                 {/* Header Section */}
      //                 <View className="flex flex-row items-center justify-between mt-5">
      //                     <View className="flex flex-row items-center">
      //                         <Pressable onPress={() => router.push("/profile")}>
      //                             <Image source={images.avatar} className="size-12 rounded-full" />
      //                         </Pressable>
      //                         <View className="flex flex-col items-start ml-2 justify-center">
      //                             <Text className="text-xs font-nunito text-black-100">Good Morning</Text>
      //                             <Text className="text-base font-nunito-medium text-black-300">UserName</Text>
      //                         </View>
      //                     </View>
      //                     <Image source={icons.bell} className="size-6" />
      //                 </View>
      //
      //                 {/* Search Component */}
      //                 <Search />
      //                 {/*Video*/}
      //                 <BannerVideo />
      //
      //                 {/* Trending Events */}
      //                 <View className="my-5">
      //                     <View className="flex flex-row items-center justify-between">
      //                         <Text className="text-xl font-nunito-bold text-black-300">Trending</Text>
      //                         <TouchableOpacity onPress={() => router.push("/events/explore")}>
      //                             <Text className="text-base font-nunito-bold text-primary-300">See All</Text>
      //                         </TouchableOpacity>
      //                     </View>
      //                     <FlatList
      //                         data={featuredEvents}
      //                         renderItem={({ item }) => (
      //                             <FeaturedCard
      //                                 id={item.id}
      //                                 title={item.title}
      //                                 location={item.location.city}
      //                                 price={item.price}
      //                                 category={item.category}
      //                                 image={item.image}
      //                             />
      //                         )}
      //                         keyExtractor={(item) => item.id.toString()}
      //                         horizontal
      //                         showsHorizontalScrollIndicator={false}
      //                         bounces={false}
      //                         contentContainerClassName="flex gap-5 mt-5"
      //                     />
      //                 </View>
      //
      //                 {/*Free Events Section*/}
      //                 <View className="my-5">
      //                     <View className="flex flex-row items-center justify-between">
      //                         <Text className="text-xl font-nunito-bold text-black-300">Free Events</Text>
      //                         <TouchableOpacity onPress={() => router.push("/events/free")}>
      //                             <Text className="text-base font-nunito-bold text-primary-300">See All</Text>
      //                         </TouchableOpacity>
      //                     </View>
      //                     <FlatList
      //                         data={freeEvents}
      //                         renderItem={({ item }) => (
      //                             <FeaturedCard
      //                                 id={item.id}
      //                                 title={item.title}
      //                                 location={item.location.city}
      //                                 price={item.price}
      //                                 category={item.category}
      //                                 image={item.image}
      //                             />
      //                         )}
      //                         keyExtractor={(item) => item.id.toString()}
      //                         horizontal
      //                         showsHorizontalScrollIndicator={false}
      //                         bounces={false}
      //                         contentContainerClassName="flex gap-5 mt-5"
      //                     />
      //                 </View>
      //
      //                 <View className="flex flex-row items-center justify-between mt-5">
      //                     <Text className="text-xl font-nunito-bold text-black-300">All Events</Text>
      //                     <TouchableOpacity onPress={()=> router.push('/events/explore')}>
      //                         <Text className="text-base font-nunito-bold text-primary-300">See All</Text>
      //                     </TouchableOpacity>
      //                 </View>
      //
      //                 {/* Filters */}
      //                 <Filter />
      //             </View>
      //         }
      //     />
      // </SafeAreaView>
      //

  );
}
