import { View, Text, Image, TouchableOpacity, ImageSourcePropType, Alert } from 'react-native';
import React from 'react';
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import icons from '@/constants/icons';
import { settings } from '@/constants/data';
import images from '@/constants/images';

interface SettingsItemProps {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;
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

  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove(["token", "user"]);
      await AsyncStorage.setItem("hasSeenWelcome", "false");

      const token = await AsyncStorage.getItem("token"); // Check if it's removed
      console.log("Token after logout:", token); // Should be null

      router.replace("../index");
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
            <Image source={icons.bell} className='size-5' />
          </View>

          <View className='flex-row justify-center flex mt-5'>
            <View className='flex flex-col items-center relative mt-5'>
              <Image source={images.avatar} className='size-44 rounded-full' />
              <TouchableOpacity className='absolute bottom-11 right-2'>
                <Image source={icons.edit} className='size-9' />
              </TouchableOpacity>
              <Text className='text-2xl font-nunito-bold'>Demo User</Text>
            </View>
          </View>

          <View className='flex flex-col mt-10'>
            <SettingsItem icon={icons.calendar} title="My Bookings" onPress={() => router.push('/events/Bookings') } />
            <SettingsItem icon={icons.calendar} title="My Events" onPress={() => router.push('/events/myevents')  }/>
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
