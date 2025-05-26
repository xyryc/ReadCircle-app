import { Text, View } from "react-native";
import { Image } from "expo-image";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-3xl">Welcome</Text>

      <Link href="/(auth)/signup">Signup Page</Link>
      {/* @ts-ignore */}
      <Link href="/(auth)/">Login Page</Link>
    </View>
  );
}
