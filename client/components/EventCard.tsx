import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import images from '@/constants/images';
import icons from '@/constants/icons';

interface CardProps {
  title: string;
  location: string;
  price: string;
  rating: number;
  category: string;
  image: any;
  id: string; // Unique identifier for navigation
}

export const FeaturedCard = ({ title, location, price, rating, category, image, id }: CardProps) => {
  const router = useRouter();

  return (
      <TouchableOpacity
          onPress={() => router.push(`/events/${id}`)}
          className="flex flex-col items-start w-60 h-80 relative"
      >
        <Image source={image} className="w-full h-full overflow-hidden rounded-2xl" />
        <Image source={images.cardGradient} className="size-full rounded-2xl absolute bottom-0" />

        <View className="flex flex-col items-start absolute bottom-5 inset-x-5">
          <Text className="text-xl font-nunito-bold text-white" numberOfLines={1}>
            {title}
          </Text>
          <Text className="text-base font-nunito text-white">{category}</Text>
          <View className="flex flex-row items-center justify-between w-full">
            <Text className="text-xl font-nunito-bold text-white">{price}</Text>
          </View>
        </View>
      </TouchableOpacity>
  );
};

export const Cards = ({ title, location, price, rating, category, image, id }: CardProps) => {
  const router = useRouter();

  return (
      <TouchableOpacity
          onPress={() => router.push(`/events/${id}`)}
          className="flex-1 w-60 h-45 mt-5 mx-2 pd-2 rounded-2xl bg-white shadow-lg shadow-black-100/70 relative"
      >
        <Image source={image} className="w-full h-40 rounded-lg" />

        <View className="flex flex-col mt-2 px-2">
          <Text className="text-base font-nunito-bold text-black-300">{title}</Text>
          <Text className="text-xs font-nunito text-black-200">{category}</Text>
          <View className="flex flex-row items-center justify-between mt-2">
            <Text className="text-base font-nunito-bold text-primary-300">{price}</Text>
          </View>
        </View>
      </TouchableOpacity>
  );
};
