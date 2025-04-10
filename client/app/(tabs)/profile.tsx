import { View, Text, Image, TouchableOpacity, ImageSourcePropType, Alert } from 'react-native';
import React, {useEffect, useState} from 'react';
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import icons from '@/constants/icons';
import { settings } from '@/constants/data';
import images from '@/constants/images';
import axios from "axios";
import Constants from "expo-constants";
const API_URL = Constants.expoConfig?.extra?.API_URL || "http://192.168.29.133:3000";
interface SettingsItemProps {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;
}

interface UserProfile {
  name: string;
  email: string;
  profilePhoto?: string;
}

const SettingsItem = ({ icon, title, onPress, textStyle, showArrow = true }: SettingsItemProps) => (
    <TouchableOpacity onPress={onPress} className='flex flex-row items-center justify-between py-3'>
      <View className='flex flex-row items-center gap-3'>
        <Image source={icon} className='size-6' />
        <Text className={`text-lg font-nunito-medium text-black-300 ${textStyle}`}>{title}</Text>
      </View>
      {showArrow && <Image source={icons.rightArrow} className='size-5' />}
    </TouchableOpacity>
);

const Profile = () => {
  const router = useRouter();
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

  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove(["token", "user"]);
      // await AsyncStorage.setItem("hasSeenWelcome", "false");

      const token = await AsyncStorage.getItem("token"); // Check if it's removed
      console.log("Token after logout:", token); // Should be null

      router.replace("/auth/login");
    } catch (error) {
      console.error("Logout Error:", error);
      Alert.alert("Error", "Failed to logout. Try again.");
    }
  };



  return (
      <SafeAreaView className='h-full bg-white'>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName='pb-32 px-7'>
          <View className='flex flex-row items-center justify-between mt-5'>
            <Text className='text-xl font-nunito-bold'>Profile</Text>
          </View>

          <View className='flex-row justify-center flex mt-5'>
            <View className='flex flex-col items-center relative mt-5'>
              <Image source={user?.profilePhoto ? { uri: user.profilePhoto } : images.avatar} className='size-44 rounded-full' />

              <Text className='text-2xl font-nunito-bold'>{user?.name||"Test"}</Text>
            </View>
          </View>

          <View className='flex flex-col mt-10'>
            <SettingsItem icon={icons.calendar} title="My Bookings" onPress={() => router.push('/profile/myBookings') } />
            <SettingsItem icon={icons.calendar} title="My Events" onPress={() => router.push('/profile/myevents')  }/>
          </View>

          <View className='flex flex-col mt-5 border-t pt-5 border-primary-200'>
            {settings.slice(2).map((item, index) => (
                <SettingsItem key={index} {...item} />
            ))}
          </View>

          <View className='flex flex-col mt-5 border-t pt-5 border-primary-200'>
            <SettingsItem
                icon={icons.logout}
                title="Logout"
                textStyle='text-danger'
                showArrow={false}
                onPress={handleLogout}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
  );
};

export default Profile;
