import { Alert, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuthStore } from '@/store/authStore'
import styles from '@/assets/styles/profile.styles'
import { Entypo } from '@expo/vector-icons'
import COLORS from '@/constants/colors'

export default function LogoutButton() {
    const { logout } = useAuthStore()

    const confirmLogout = () => {
        Alert.alert("Logout", "Are you sure you want to logout?", [
            { text: 'Cancel', style: "cancel" },
            {
                text: "Logout", onPress: () => logout(), style: "destructive"
            }
        ])
    }

    return (
        <TouchableOpacity style={styles.logoutButton} onPress={confirmLogout}>
            <Entypo name="log-out" size={20} color={COLORS.white} />
            <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
    )
}