import {View, Text, ScrollView} from 'react-native'
import React from 'react'
import {EventCard} from "@/components/EventCard";
import {SafeAreaView} from "react-native-safe-area-context";
const Myevents = () => {
    return (
        <SafeAreaView className="flex-1 bg-white p-5">
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <Text className="font-nunito-ExtraBold text-4xl my-6">My Events</Text>
                    <EventCard title="test" location="test" price="500" id="1" />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default Myevents
