import {View, Text, Image, TextInput, TouchableOpacity,Alert,Keyboard,TouchableWithoutFeedback} from 'react-native'
import React, {useRef, useState} from 'react'
import axios from "axios";
import images from "@/constants/images";
import {StatusBar} from 'expo-status-bar'
import Animated, {FadeInDown, FadeInUp} from "react-native-reanimated";
import {useRouter} from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = "http://192.168.29.178:3000/api/auth/login";
 // Replace with your local IP

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const inputRefs: { [key: string]: React.RefObject<TextInput> } = {

        email: useRef<TextInput>(null),
        password: useRef<TextInput>(null),

    };
    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Please enter both email and password");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(API_URL, { email, password });

            await AsyncStorage.setItem("token", response.data.token);
            await AsyncStorage.setItem("user", JSON.stringify(response.data.user));
            await AsyncStorage.setItem("hasSeenWelcome", "true");
            Alert.alert("Success", "Login successful!");

            router.replace("/(tabs)");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Login Error:", error.response?.data || error.message);
                Alert.alert("Login Failed", error.response?.data?.error || "Invalid credentials");
            } else {
                console.error("Unexpected Error:", error);
                Alert.alert("Login Failed", "Something went wrong. Please try again.");
            }
        } finally {
            setLoading(false);
        }

    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="bg-white h-full w-full">
            <StatusBar style="light" />
            <Image className="h-full w-full absolute" source={images.background}/>


            <View className="flex-row justify-around w-full absolute">
                <Animated.Image entering={FadeInUp.delay(200).duration(1000).springify()} className="h-55 w-24" source={images.light}/>
                <Animated.Image entering={FadeInUp.delay(400).duration(1000).springify().damping(2)} className="h-40 w-16" source={images.light}/>
            </View>

            {/*form*/}
            <View className="h-full w-full flex justify-around pt-48 pb-20 ">
                {/*title*/}
                <View className="flex items-center">
                <Animated.Text entering={FadeInUp.duration(1000).springify()} className="text-white font-nunito-bold tracking-wider text-5xl">Login</Animated.Text>
                </View>

                {/*form*/}
                <View className="flex items-center mx-4 space-y-4">
                    <Animated.View entering={FadeInDown.duration(1000).springify()} className="bg-black/5 p-5 rounded-2xl w-full mb-3">
                        <TextInput placeholder='Email'
                                   placeholderTextColor={'gray'}
                                   value={email}
                                   onChangeText={setEmail}
                                   autoCapitalize="none"
                                   keyboardType="email-address"
                                   ref={inputRefs.email}
                                   returnKeyType="next"
                                   onSubmitEditing={()=>inputRefs.password.current?.focus()}
                        />
                    </Animated.View>
                    <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className="bg-black/5 p-5 rounded-2xl w-full mb-4">
                        <TextInput placeholder='Password'
                                   placeholderTextColor={'gray'}
                                   secureTextEntry={true}
                                   value={password}
                                   onChangeText={setPassword}
                                   ref={inputRefs.password}
                                   returnKeyType="done"
                                   onSubmitEditing={handleLogin}
                        />
                    </Animated.View>

                    <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()} className="w-full" >
                        <TouchableOpacity className="w-full bg-sky-400 p-3 rounded-2xl mb-3" onPress={handleLogin} disabled={loading}>
                            <Text className="text-white text-xl font-nunito-bold text-center">{loading ? "Logging in..." : "Login"}</Text>
                        </TouchableOpacity>
                    </Animated.View>
                    <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()} className="flex-row justify-center">
                        <Text className="font-nunito-Light">Don't have an account? </Text>
                        <TouchableOpacity onPress={() => router.replace('/auth/signup')}>
                            <Text className="text-sky-600">Sign up</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
        </View>

        </View>
        </TouchableWithoutFeedback>
    )
}
export default Login
