import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { useAuthStore } from "@/store/authStore";
import { API_URL } from "@/constants/api";
import styles from "@/assets/styles/home.styles";
import { Image } from "expo-image";
import { Octicons } from "@expo/vector-icons";
import COLORS from "@/constants/colors";
import { format } from "date-fns";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Loader from "@/components/Loader";

interface Book {
  _id: string;
  title: string;
  caption: string;
  image: string;
  rating: number;
  user: {
    username: string;
    profileImage: string;
  };
  createdAt: string;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const Index = () => {
  const { token } = useAuthStore();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchBooks = async (pageNum = 1, refresh = false) => {
    try {
      if (refresh) setRefreshing(true);
      else if (pageNum === 1) setLoading(true);

      const response = await fetch(`${API_URL}/books?page=${pageNum}&limit=5`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();


      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch books");
      }

      setBooks((prevBooks) =>
        refresh || pageNum === 1 ? data.books : [...prevBooks, ...data.books]
      );
      setHasMore(pageNum < data.totalPages);
      setPage(pageNum);
    } catch (error) {
      console.log("Error fetching books", error);
    } finally {
      if (refresh) {
        await sleep(800)
        setRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);



  const handleLoadMore = async () => {
    if (hasMore && !loading && !refreshing) {
      await fetchBooks(page + 1);
    }
  };

  const renderRatingStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Octicons
          key={i}
          name={i <= rating ? "star-fill" : "star"}
          size={16}
          color={i <= rating ? "#f4b400" : COLORS.textSecondary}
          style={{ marginRight: 2 }}
        />
      );
    }

    return stars;
  };

  const renderItem = ({ item }: { item: Book }) => (
    <View style={styles.bookCard}>
      <View style={styles.bookHeader}>
        <View style={styles.userInfo}>
          <Image
            source={{ uri: item.user.profileImage }}
            style={styles.avatar}
          />
          <Text style={styles.username}>{item.user.username}</Text>
        </View>
      </View>

      <View style={styles.bookImageContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.bookImage}
          contentFit="cover"
        />
      </View>

      <View style={styles.bookDetails}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <View style={styles.ratingContainer}>
          {renderRatingStars(item.rating)}
        </View>
        <Text style={styles.caption}>{item.caption}</Text>
        <Text style={styles.date}>
          Shared on {format(new Date(item.createdAt), "d MMM yyyy")}
        </Text>
      </View>
    </View>
  );

  if (loading) return <Loader size="large" />

  return (
    <View style={styles.container}>
      {loading && books.length === 0 ? (
        <ActivityIndicator size="large" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={books}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.2}
          refreshControl={
            <RefreshControl title="Refetching..."
              colors={[COLORS.primary]}
              tintColor={COLORS.primary}
              titleColor={COLORS.primary}
              refreshing={refreshing}
              onRefresh={() => fetchBooks(1, true)} />
          }
          ListHeaderComponent={
            <View style={styles.header}>
              <Text style={styles.headerTitle}>ReadCircle</Text>
              <Text style={styles.headerSubtitle}>Discover great reads from community</Text>
            </View>
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <FontAwesome6 name="book" size={60} color={COLORS.textSecondary} />
              <Text style={styles.emptyText}>No recommendations yet</Text>
              <Text style={styles.emptySubtext}>Be the first to share a book!</Text>
            </View>
          }
          ListFooterComponent={
            hasMore && books.length > 0 ? (
              <ActivityIndicator style={styles.footerLoader} size="small" color={COLORS.primary} />
            ) : null
          }
        />
      )}
    </View>
  );
};

export default Index;
