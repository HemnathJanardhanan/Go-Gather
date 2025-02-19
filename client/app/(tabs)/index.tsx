import { Text, View } from "react-native";
import {Link} from "expo-router";

export default function Index() {
  return (
    <View
      className="flex-1 justify-center items-center">
      <Text className=" font-bold text-2xl font-nunito-bold">Edit app/index.tsx to edit this screen.</Text>
        <Link href="/auth/login">Login</Link>
    </View>
  );
}
