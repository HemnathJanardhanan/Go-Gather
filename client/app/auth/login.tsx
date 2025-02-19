import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native'
import React from 'react'
import images from "@/constants/images";
import icons from "@/constants/icons";
import {StatusBar} from 'expo-status-bar'
const Login = () => {
    return (
        <View className="bg-white h-full w-full">
            <StatusBar style="light" />
            <Image className="h-full w-full absolute" source={images.background}/>


            <View className="flex-row justify-around w-full absolute">
                <Image className="h-55 w-24" source={images.light}/>
                <Image className="h-40 w-16" source={images.light}/>
            </View>

            {/*form*/}
            <View className="h-full w-full flex justify-around pt-40 pb-10 ">
                {/*title*/}
                <View className="flex items-center">
                <Text className="text-white font-nunito-bold tracking-wider text-5xl">Login</Text>
                </View>

                {/*form*/}
                <View className="flex items-center mx-4 space-y-4">
                    <View className="bg-black/5 p-5 rounded-2xl w-full">
                        <TextInput placeholder='Email' placeholderTextColor={'gray'}/>
                    </View>
                    <View className="bg-black/5 p-5 rounded-2xl w-full mb-4">
                        <TextInput placeholder='Password' placeholderTextColor={'gray'} secureTextEntry={true}/>
                    </View>

                <View className="w-full" >
                    <TouchableOpacity className="w-full bg-sky-400 p-3 rounded-2xl mb-3">
                        <Text className="text-white text-xl font-nunito-bold text-center">Login</Text>
                    </TouchableOpacity>
                </View>
                <View className="flex-row justify-center">
                    <Text>Don't have an account? </Text>
                    <TouchableOpacity>
                    <Text className="text-sky-600">Sign up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

        </View>
    )
}
export default Login
