import { Text, View } from 'react-native'
import React from 'react'

import styles from '@/assets/styles/profile.styles'
import { Image } from 'expo-image'
import { useAuthStore } from '@/store/authStore'

export default function ProfileHeader() {
    const { user } = useAuthStore()
    console.log(user)

    return (
        <View style={styles.profileHeader}>
            <Image source={{ uri: user?.profileImage }} style={styles.profileImage} />

            <View style={styles.profileInfo}>
                <Text style={styles.username}>{user?.username}</Text>
                <Text style={styles.email}>{user?.email}</Text>
                <Text style={styles.memberSince}>{user?.email}</Text>
            </View>
        </View>
    )
}