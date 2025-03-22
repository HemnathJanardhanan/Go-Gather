import { View,Dimensions } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { useRef } from "react";
import images from "@/constants/images";
export default function BannerVideo() {
    const videoRef = useRef<Video>(null);
    const { width } = Dimensions.get("window");
    return (
        <View className="w-full items-center mt-5">
            <Video
                ref={videoRef}
                source={images.offer} // Ensure correct path
                style={{ width,  // Full screen width
                    height: width * (400 / 1080)}} // 1080x400 scaled down
                shouldPlay
                isLooping
                resizeMode={ResizeMode.COVER} // COVER fills the area properly
                isMuted
            />
        </View>
    );
}
