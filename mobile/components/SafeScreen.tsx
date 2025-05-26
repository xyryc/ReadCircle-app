import { View, StyleSheet } from "react-native";
import React, { ReactNode } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import COLORS from "@/constants/colors";

type SafeScreenProps = {
  children: ReactNode;
};

const SafeScreen = ({ children }: SafeScreenProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {children}
    </View>
  );
};

export default SafeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
