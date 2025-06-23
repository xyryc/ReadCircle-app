import { View, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { API_URL } from "@/constants/api";
import { useAuthStore } from "@/store/authStore";
import ProfileHeader from "@/components/ProfileHeader";
import LogoutButton from "@/components/LogoutButton";
import styles from "@/assets/styles/profile.styles";

const Profile = () => {
  const [books, setBooks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const router = useRouter()
  const { token } = useAuthStore()

  const fetchData = async () => {
    try {
      setIsLoading(true)

      const response = await fetch(`${API_URL}/books/user`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await response.json()

      if (!response.ok) throw new Error(data.message || "Failed to fetch user books")

      setBooks(data)

    } catch (error) {
      console.log("Error fetching data", error)
      Alert.alert("Error", "Failed to load profile data. Pull down to refresh.")
    }
    finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <View style={styles.container}>
      <ProfileHeader />
      <LogoutButton />
    </View>
  );
};

export default Profile;



