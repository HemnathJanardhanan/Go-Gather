// import { View, Text, Image, TextInput, TouchableOpacity, Alert } from "react-native";
// import React, { useState } from "react";
// import axios from "axios";
// import images from "@/constants/images";
// import { StatusBar } from "expo-status-bar";
// import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
// import { useRouter } from "expo-router";
// import AsyncStorage from "@react-native-async-storage/async-storage";
//
// const API_URL = "http://192.168.29.133:3000/api/auth/signup";
//
// const SignUp = () => {
//     const router = useRouter();
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [loading, setLoading] = useState(false);
//
//     const handleSignUp = async () => {
//         if (!name || !email || !password) {
//             Alert.alert("Error", "Please fill all fields");
//             return;
//         }
//
//         setLoading(true);
//         try {
//             const response = await axios.post(API_URL, { name, email, password });
//
//             await AsyncStorage.setItem("token", response.data.token);
//             await AsyncStorage.setItem("user", JSON.stringify(response.data.user));
//             await AsyncStorage.setItem("hasSeenWelcome", "true"); // Mark welcome screen as seen
//
//             Alert.alert("Success", "Account created successfully!");
//             router.replace("/(tabs)"); // Redirect to main app
//         }  catch (error) {
//             if (axios.isAxiosError(error)) {
//                 console.error("Signup Error:", error.response?.data || error.message);
//                 Alert.alert("Signup Failed", error.response?.data?.error || "Invalid credentials");
//             } else {
//                 console.error("Unexpected Error:", error);
//                 Alert.alert("Signup Failed", "Something went wrong. Please try again.");
//             }
//         } finally {
//             setLoading(false);
//         }
//     }
//     return (
//         <View className="bg-white h-full w-full">
//             <StatusBar style="light" />
//             <Image className="h-full w-full absolute" source={images.background}/>
//
//
//             <View className="flex-row justify-around w-full absolute">
//                 <Animated.Image entering={FadeInUp.delay(200).duration(1000).springify()} className="h-55 w-24" source={images.light}/>
//                 <Animated.Image entering={FadeInUp.delay(400).duration(1000).springify().damping(2)} className="h-40 w-16" source={images.light}/>
//             </View>
//
//             {/*form*/}
//             <View className="h-full w-full flex justify-around pt-48  ">
//                 {/*title*/}
//                 <View className="flex items-center">
//                     <Animated.Text entering={FadeInUp.duration(1000).springify()} className="text-white font-nunito-bold tracking-wider text-5xl">SignUp</Animated.Text>
//                 </View>
//
//                 {/*form*/}
//                 <View className="flex items-center mx-4 space-y-4">
//                     <Animated.View entering={FadeInDown.duration(1000).springify()} className="bg-black/5 p-5 rounded-2xl w-full mb-3">
//                         <TextInput placeholder='UserName' placeholderTextColor={'gray'}/>
//                     </Animated.View>
//                     <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className="bg-black/5 p-5 rounded-2xl w-full mb-3">
//                         <TextInput placeholder='Email' placeholderTextColor={'gray'}/>
//                     </Animated.View>
//                     <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()} className="bg-black/5 p-5 rounded-2xl w-full mb-4">
//                         <TextInput placeholder='Password' placeholderTextColor={'gray'} secureTextEntry={true}/>
//                     </Animated.View>
//
//                     <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()} className="w-full" >
//                         <TouchableOpacity className="w-full bg-sky-400 p-3 rounded-2xl mb-3" onPress={handleSignUp}>
//                             <Text className="text-white text-xl font-nunito-bold text-center">Sign Up</Text>
//                         </TouchableOpacity>
//                     </Animated.View>
//                     <Animated.View entering={FadeInDown.delay(800).duration(1000).springify()} className="flex-row justify-center">
//                         <Text className="font-nunito-Light">Already have an account? </Text>
//                         <TouchableOpacity onPress={() => router.replace('/auth/login')}>
//                             <Text className="text-sky-600">Log In</Text>
//                         </TouchableOpacity>
//                     </Animated.View>
//                 </View>
//             </View>
//
//         </View>
//     )
// }
// export default SignUp

import { View, Text, Image, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import images from "@/constants/images";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://192.168.29.133:3000/api/auth/signup";

const SignUp = () => {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignUp = async () => {
        if (!name || !email || !password) {
            Alert.alert("Error", "Please fill all fields");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(API_URL, { name, email, password });

            await AsyncStorage.setItem("token", response.data.token);
            await AsyncStorage.setItem("user", JSON.stringify(response.data.user));
            await AsyncStorage.setItem("hasSeenWelcome", "true"); // Mark welcome screen as seen

            Alert.alert("Success", "Account created successfully!");
            router.replace("/(tabs)"); // Redirect to main app
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Signup Error:", error.response?.data || error.message);
                Alert.alert("Signup Failed", error.response?.data?.error || "Invalid credentials");
            } else {
                console.error("Unexpected Error:", error);
                Alert.alert("Signup Failed", "Something went wrong. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="bg-white h-full w-full">
            <StatusBar style="light" />
            <Image className="h-full w-full absolute" source={images.background} />

            {/* Animated lights */}
            <View className="flex-row justify-around w-full absolute">
                <Animated.Image entering={FadeInUp.delay(200).duration(1000).springify()} className="h-55 w-24" source={images.light} />
                <Animated.Image entering={FadeInUp.delay(400).duration(1000).springify().damping(2)} className="h-40 w-16" source={images.light} />
            </View>

            {/* Form Section */}
            <View className="h-full w-full flex justify-around pt-48">
                {/* Title */}
                <View className="flex items-center">
                    <Animated.Text entering={FadeInUp.duration(1000).springify()} className="text-white font-nunito-bold tracking-wider text-5xl">
                        SignUp
                    </Animated.Text>
                </View>

                {/* Form Fields */}
                <View className="flex items-center mx-4 space-y-4">
                    <Animated.View entering={FadeInDown.duration(1000).springify()} className="bg-black/5 p-5 rounded-2xl w-full mb-3">
                        <TextInput
                            placeholder="Username"
                            placeholderTextColor="gray"
                            value={name}
                            onChangeText={setName}
                        />
                    </Animated.View>
                    <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className="bg-black/5 p-5 rounded-2xl w-full mb-3">
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor="gray"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </Animated.View>
                    <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()} className="bg-black/5 p-5 rounded-2xl w-full mb-4">
                        <TextInput
                            placeholder="Password"
                            placeholderTextColor="gray"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                        />
                    </Animated.View>

                    {/* Sign-Up Button */}
                    <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()} className="w-full">
                        <TouchableOpacity
                            className={`w-full p-3 rounded-2xl mb-3 ${loading ? "bg-gray-400" : "bg-sky-400"}`}
                            onPress={handleSignUp}
                            disabled={loading}
                        >
                            <Text className="text-white text-xl font-nunito-bold text-center">
                                {loading ? "Signing Up..." : "Sign Up"}
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>

                    {/* Redirect to Login */}
                    <Animated.View entering={FadeInDown.delay(800).duration(1000).springify()} className="flex-row justify-center">
                        <Text className="font-nunito-Light">Already have an account? </Text>
                        <TouchableOpacity onPress={() => router.replace("/auth/login")}>
                            <Text className="text-sky-600">Log In</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </View>
        </View>
    );
};

export default SignUp;
