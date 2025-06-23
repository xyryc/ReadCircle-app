import styles from '@/assets/styles/profile.styles'
import { API_URL } from '@/constants/api';
import COLORS from '@/constants/colors';
import { useAuthStore } from '@/store/authStore';
import { Octicons } from '@expo/vector-icons';
import { formatDistance, subDays } from 'date-fns';
import { Image } from 'expo-image'
import { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'

interface Book {
    _id: string;
    title: string;
    image: string;
    rating: number;
    caption: string;
    createdAt: string;
}

interface BookRecommendationsProps {
    item: Book;
    books: Book[];
    setBooks: (books: Book[]) => void;
}
export default function BookRecommendations({ item, books, setBooks }: BookRecommendationsProps) {
    const { token } = useAuthStore()
    const [deleteBookId, setDeleteBookId] = useState<string | null>(null)


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

    const handleDeleteBook = async (bookId: string) => {
        try {
            setDeleteBookId(bookId)
            const response = await fetch(`${API_URL}/books/${bookId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            })
            const data = await response.json()

            if (!response.ok) throw new Error(data.message || "Failed to delete book")
            setBooks(books.filter((book) => book._id !== bookId))
            Alert.alert("Success", "Recommendation deleted successfully")
        } catch (error: any) {
            Alert.alert("Error", error.message || "Failed to delete recommendation")
        }
        finally {
            setDeleteBookId(null)
        }
    }

    const confirmDelete = (bookId: string) => {
        Alert.alert("Delete Recommendation", "Are you sure you want to delete this recommendation?", [
            { text: "Cancel", style: "cancel" },
            { text: "Delete", style: "destructive", onPress: () => handleDeleteBook(bookId) }
        ])
    }

    return (
        <View style={styles.bookItem}>
            <Image source={item.image} style={styles.bookImage} />

            <View style={styles.bookInfo}>
                <Text style={styles.bookTitle}>{item.title}</Text>
                <View style={styles.ratingContainer}>{renderRatingStars(item.rating)}</View>
                <Text style={styles.bookCaption}>{item.caption}</Text>
                <Text style={styles.bookDate}>{formatDistance(subDays(new Date(item.createdAt), 0), new Date(), { addSuffix: true })}</Text>
            </View>

            <TouchableOpacity style={styles.deleteButton} onPress={() => { confirmDelete(item?._id) }}>
                {deleteBookId === item._id ?
                    <ActivityIndicator size="small" color={COLORS.primary} />
                    :
                    <Octicons name="trash" size={20} color={COLORS.primary} />
                }
            </TouchableOpacity>
        </View>
    )
}