import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useAuthStore } from "@/store/authStore";

const Index = () => {
  const { logout } = useAuthStore();

  return (
    <View>
      <TouchableOpacity
        onPress={logout}
        className="px-4 py-2 border rounded-xl"
      >
        <Text>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Index;
