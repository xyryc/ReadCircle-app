import COLORS from '@/constants/colors'
import React from 'react'
import { ActivityIndicator, View } from 'react-native'

interface LoaderProp {
    size?: "small" | "large" | number
}

const Loader = ({ size = "large" }: LoaderProp) => {
    return (
        <View style={{
            flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: COLORS.background
        }}>
            <ActivityIndicator size={size} color={COLORS.primary} />
        </View>
    )
}

export default Loader
