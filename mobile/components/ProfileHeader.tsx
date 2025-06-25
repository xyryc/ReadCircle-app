import { Text, View } from "react-native";
import styles from "@/assets/styles/profile.styles";
import { Image } from "expo-image";
import { useAuthStore } from "@/store/authStore";
import { format } from "date-fns";
import COLORS from "@/constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function ProfileHeader() {
  const { user } = useAuthStore();

  return (
    <View style={styles.profileHeader}>
      <Image source={{ uri: user?.profileImage }} style={styles.profileImage} />

      <View style={styles.profileInfo}>
        <Text style={styles.username}>{user?.username}</Text>

        <Text style={styles.email}>{user?.email}</Text>
        <Text style={styles.memberSince}>
          Joined on{" "}
          {user?.createdAt
            ? format(new Date(user.createdAt), "d MMM yyyy")
            : "N/A"}
        </Text>
      </View>
    </View>
  );
}
