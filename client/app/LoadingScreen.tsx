import { View } from "react-native";
import LottieView from "lottie-react-native";
import images from "@/constants/images"; // Import animations

const LoadingScreen = () => {
    return (
        <View className="flex-1 items-center justify-center bg-white">

                <LottieView
                    source={images.CamelLoad}
                    autoPlay
                    loop
                    style={{ width: 300, height: 300 }}
                />

        </View>
    );
};

export default LoadingScreen;
