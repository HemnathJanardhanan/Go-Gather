import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native'
import React from 'react'
import images from "@/constants/images";
import icons from "@/constants/icons";
import {StatusBar} from 'expo-status-bar'
import Animated, {FadeIn, FadeInDown, FadeInUp, FadeOut} from "react-native-reanimated";
import {useRouter} from "expo-router";

const SignUp = () => {
    const router = useRouter();
    return (
        <View className="bg-white h-full w-full">
            <StatusBar style="light" />
            <Image className="h-full w-full absolute" source={images.background}/>


            <View className="flex-row justify-around w-full absolute">
                <Animated.Image entering={FadeInUp.delay(200).duration(1000).springify()} className="h-55 w-24" source={images.light}/>
                <Animated.Image entering={FadeInUp.delay(400).duration(1000).springify().damping(2)} className="h-40 w-16" source={images.light}/>
            </View>

            {/*form*/}
            <View className="h-full w-full flex justify-around pt-48  ">
                {/*title*/}
                <View className="flex items-center">
                    <Animated.Text entering={FadeInUp.duration(1000).springify()} className="text-white font-nunito-bold tracking-wider text-5xl">SignUp</Animated.Text>
                </View>

                {/*form*/}
                <View className="flex items-center mx-4 space-y-4">
                    <Animated.View entering={FadeInDown.duration(1000).springify()} className="bg-black/5 p-5 rounded-2xl w-full mb-3">
                        <TextInput placeholder='UserName' placeholderTextColor={'gray'}/>
                    </Animated.View>
                    <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className="bg-black/5 p-5 rounded-2xl w-full mb-3">
                        <TextInput placeholder='Email' placeholderTextColor={'gray'}/>
                    </Animated.View>
                    <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()} className="bg-black/5 p-5 rounded-2xl w-full mb-4">
                        <TextInput placeholder='Password' placeholderTextColor={'gray'} secureTextEntry={true}/>
                    </Animated.View>

                    <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()} className="w-full" >
                        <TouchableOpacity className="w-full bg-sky-400 p-3 rounded-2xl mb-3">
                            <Text className="text-white text-xl font-nunito-bold text-center">Sign Up</Text>
                        </TouchableOpacity>
                    </Animated.View>
                    <Animated.View entering={FadeInDown.delay(800).duration(1000).springify()} className="flex-row justify-center">
                        <Text className="font-nunito-Light">Already have an account? </Text>
                        <TouchableOpacity onPress={() => router.replace('/auth/login')}>
                            <Text className="text-sky-600">Log In</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </View>

        </View>
    )
}
export default SignUp
