import { View, Alert, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { API_URL } from "@/constants/api";
import { useAuthStore } from "@/store/authStore";
import ProfileHeader from "@/components/ProfileHeader";
import LogoutButton from "@/components/LogoutButton";
import styles from "@/assets/styles/profile.styles";
import BookRecommendations from "@/components/BookRecommendations";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "@/constants/colors";

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

      {/* recommendations */}
      <View style={styles.booksHeader}>
        <Text style={styles.bookTitle}>Your Recommendations</Text>
        <Text style={styles.booksCount}>{books.length} books</Text>
      </View>

      <FlatList data={books}
        renderItem={({ item }) => <BookRecommendations item={item} />}
        keyExtractor={({ item }) => item?._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.booksList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="book-outline" size={50} color={COLORS.textSecondary} />
            <Text style={styles.emptyText}>No recommendations yet</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => router.push("/create")}>
              <Text style={styles.addButtonText}>Add your first book</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
};

export default Profile;



