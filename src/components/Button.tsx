import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";

interface ButtonProps {
    variant: "primary" | "default"
    label: string
    onPress: () => void
}
const Button = ({variant, label, onPress}: ButtonProps) => {
    const backgroundColor = variant === "primary" ? "#2CB9B0" : "rgba(12, 13, 52, 0.05)"
    const color =  variant === "primary" ? "white" : "#0C0D34";
  return (
      <RectButton style={[styles.container, {backgroundColor}]}
        {...{onPress}}
      >
          <Text style={[styles.label, {color}]}>{label}</Text>
      </RectButton>
  );
};

export default Button;
Button.defaultProps = {
    variant: "default"
}
const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    height: 50,
    width: 245,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontFamily: "SFProText-Regular",
    fontSize: 15,
    textAlign: "center",
  },
});
