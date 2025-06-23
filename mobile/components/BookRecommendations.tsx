import styles from '@/assets/styles/profile.styles'
import COLORS from '@/constants/colors';
import { Octicons } from '@expo/vector-icons';
import { format, formatDistance, subDays } from 'date-fns';
import { Image } from 'expo-image'
import { View, Text } from 'react-native'

export default function BookRecommendations({ item }) {
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

    return (
        <View style={styles.bookItem}>
            <Image source={item.image} style={styles.bookImage} />

            <View style={styles.bookInfo}>
                <Text style={styles.bookTitle}>{item.title}</Text>
                <View style={styles.ratingContainer}>{renderRatingStars(item.rating)}</View>
                <Text style={styles.bookCaption}>{item.caption}</Text>
                <Text style={styles.bookDate}>{formatDistance(subDays(new Date(item.createdAt), 0), new Date(), { addSuffix: true })}</Text>
            </View>

        </View>
    )
}