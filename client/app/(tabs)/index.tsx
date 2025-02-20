import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import icons from "@/constants/icons";
import Search from "@/components/search";
import { FeaturedCard, Cards } from "@/components/EventCard";
import { cards, featuredCards } from "@/constants/data"; // Importing data
import Filter from "@/components/filter"; // ✅ Fixed import name

export default function Index() {
  return (
    <SafeAreaView className="bg-white h-full">
      <View className="px-5">
        {/* Header Section */}
        <View className="flex flex-row items-center justify-between mt-5">
          <View className="flex flex-row items-center">
            <Image source={images.avatar} className="size-12 rounded-full" />
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
            <TouchableOpacity>
              <Text className="text-base font-nunito-bold text-primary-300">See All</Text>
            </TouchableOpacity>
          </View>

          {/* Horizontal ScrollView for Featured Cards */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4">
            <View className="flex flex-row gap-4">
              {featuredCards.map((card, index) => (
                <FeaturedCard
                  key={index}
                  title={card.title}
                  location={card.location}
                  price={card.price}
                  rating={card.rating}
                  category={card.category}
                  image={card.image}
                />
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Latest Picks Section */}
        <View className="flex flex-row items-center justify-between">
          <Text className="text-xl font-nunito-bold text-black-300">Latest Picks</Text>
          <TouchableOpacity>
            <Text className="text-base font-nunito-bold text-primary-300">See All</Text>
          </TouchableOpacity>
        </View>

        {/* ✅ Fixed Filter Component Usage */}
        <Filter />

        {/* Horizontal ScrollView for Regular Cards */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-5">
          <View className="flex flex-row gap-1">
            {cards.map((card, index) => (
              <Cards
                key={index}
                title={card.title}
                location={card.location}
                price={card.price}
                rating={card.rating}
                category={card.category}
                image={card.image}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
