import { useEffect, useState } from "react";
import { View, Modal } from "react-native";
import LottieView from "lottie-react-native";
import images from "@/constants/images"; // Ensure images.Celebrate exists


const CelebrateAnimation = ({ visible, onFinish }: { visible: boolean; onFinish: () => void }) => {
    const [show, setShow] = useState(visible);

    useEffect(() => {
        if (visible) {
            setShow(true);
            setTimeout(() => {
                setShow(false);
                onFinish(); // Callback after animation ends
            }, 3000); // Adjust duration based on animation length
        }
    }, [visible]);

    if (!show) return null;

    return (
        <Modal transparent animationType="fade" visible={show}>
            <View className="flex-1 items-center justify-center bg-black/50">
                <LottieView
                    source={images.celebrate}
                    autoPlay
                    loop={false}
                    style={{ width: 300, height: 300 }}
                />
            </View>
        </Modal>
    );
};

export default CelebrateAnimation;