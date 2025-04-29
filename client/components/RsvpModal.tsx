import { Animated } from 'react-native';
import React, {useEffect, useState } from "react";
import { View, Text, TouchableOpacity,TouchableWithoutFeedback, Alert, Modal } from "react-native";
import {Ionicons} from "@expo/vector-icons";

interface RsvpModalProps {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    seats: number;
    decreaseSeats: () => void;
    increaseSeats: () => void;
    handleRSVP: () => void;
    noOfSeats: number;
}
function RsvpModal({ modalVisible,
                       setModalVisible,
                       seats,
                       decreaseSeats,
                       increaseSeats,
                       handleRSVP,noOfSeats}:RsvpModalProps ) {
    const [fadeAnim] = useState(new Animated.Value(0)); // Initial opacity 0
    const [slideAnim] = useState(new Animated.Value(500)); // Initial position off-screen


    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();

        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, [modalVisible]); // Re-trigger animation when modalVisibility changes


    return (
        <Modal transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View className="flex-1 justify-center items-center bg-black/50">
                <Animated.View
                    style={{
                        opacity: fadeAnim,
                        transform: [{ translateY: slideAnim }],
                    }}
                    className="bg-white p-6 rounded-xl shadow-lg w-11/12 max-w-[350px]">
                    <View className="flex-1 justify-end bg-black/50">
                        <View className="bg-white p-6 rounded-t-3xl shadow-lg">
                            <Text className="text-xl font-bold text-gray-900">Confirm RSVP</Text>
                            <Text className="text-gray-600">Select number of seats:</Text>

                            <View className="flex-row justify-between items-center mt-4">
                                <TouchableOpacity disabled={seats <= 1} onPress={decreaseSeats} className="bg-gray-300 p-2 rounded-lg">
                                    <Ionicons name="remove" size={24} color="black" />
                                </TouchableOpacity>
                                <Text className="text-lg font-semibold">{seats}</Text>
                                <TouchableOpacity disabled={seats >= noOfSeats} onPress={increaseSeats} className="bg-gray-300 p-2 rounded-lg">
                                    <Ionicons name="add" size={24} color="black" />
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity onPress={handleRSVP} className="bg-green-500 p-4 mt-6 rounded-lg">
                                <Text className="text-white text-center text-lg font-semibold">Confirm</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => setModalVisible(false)} className="mt-2">
                                <Text className="text-red-500 text-center text-lg">Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Animated.View>
            </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

export default RsvpModal;