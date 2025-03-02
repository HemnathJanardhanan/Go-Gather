
import { Text, View, Image, TouchableOpacity, FlatList,Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import icons from "@/constants/icons";
import Search from "@/components/search";
import { FeaturedCard, Cards } from "@/components/EventCard";
import Filter from "@/components/filter";
import { cards, featuredCards } from "@/constants/data";
import { useRouter } from "expo-router";
import React from "react";

export default function Index() {
    const router = useRouter();

  return (
      <SafeAreaView className="bg-white h-full">
        <FlatList
            data={cards}
            renderItem={({ item }) => (
                <Cards
                
                    id={item.id}
                    title={item.title}
                    location={item.location}
                    price={item.price}
                    rating={item.rating}
                    category={item.category}
                    image={item.image} // Static images from constants
                />
            )}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            contentContainerClassName="pb-32"
            columnWrapperClassName="flex gap-5 px-5"
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <View className="px-5">
                {/* Header Section */}
                <View className="flex flex-row items-center justify-between mt-5">
                  <View className="flex flex-row items-center">
                      <Pressable onPress={() => router.push('/profile')}>
                        <Image source={images.avatar} className="size-12 rounded-full" />
                      </Pressable>
                    <View className="flex flex-col items-start ml-2 justify-center">
                      <Text className="text-xs font-nunito text-black-100">Good Morning</Text>
                      <Text className="text-base font-nunito-medium text-black-300">UserName</Text>
                    </View>
                  </View>
                  <Image source={icons.bell} className="size-6" />
                </View>

                {/* Search Component */}
                <Search />

                {/* Popular Section */}
                <View className="my-5">
                  <View className="flex flex-row items-center justify-between">
                    <Text className="text-xl font-nunito-bold text-black-300">Popular</Text>
                    <TouchableOpacity onPress={()=> router.push('/events/explore')}>

                      <Text className="text-base font-nunito-bold text-primary-300">See All</Text>

                    </TouchableOpacity>
                  </View>

                  <FlatList
                      data={featuredCards}
                      renderItem={({ item }) => (
                          <FeaturedCard
                              id={item.id}
                              title={item.title}
                              location={item.location}
                              price={item.price}
                              rating={item.rating}
                              category={item.category}
                              image={item.image}
                          />
                      )}
                      keyExtractor={(item, index) => index.toString()}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      bounces={false}
                      contentContainerClassName="flex gap-5 mt-5"
                  />
                </View>

                {/* Latest Picks Section */}
                <View className="flex flex-row items-center justify-between">
                  <Text className="text-xl font-nunito-bold text-black-300">Latest Picks</Text>
                  <TouchableOpacity>
                    <Text className="text-base font-nunito-bold text-primary-300">See All</Text>
                  </TouchableOpacity>
                </View>

                {/* Filter Component */}
                <Filter />
              </View>
            }
        />
      </SafeAreaView>
  );
}
