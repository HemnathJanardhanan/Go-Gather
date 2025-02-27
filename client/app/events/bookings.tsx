import {View, Text, ScrollView} from 'react-native'
import React from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import {EventCard} from "@/components/EventCard";

const Bookings = () => {
    return (
        <SafeAreaView className="flex-1 bg-white p-5">
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <Text className="font-nunito-ExtraBold text-4xl my-6">My Bookings</Text>
                    <EventCard title="test" location="test" price="500" id="1" />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default Bookings
