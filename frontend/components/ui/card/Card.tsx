import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export default function Card(props: CardProps) {
  return <View style={[styles.container, props.style]}>{props.children}</View>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 12,
    // boxShadow: "rgba(0,0,0,0.75)", boxShadow had no effect.
    shadowRadius:8,
    shadowOpacity:0.9
  },
});
