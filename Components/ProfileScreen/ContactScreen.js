import { View, Text } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

const ProfileScreen = () => {
  const carts = useSelector((state) => state.cart.cartItem);
  console.log(carts);
  return (
    <View>
      <Text>ContactScreen</Text>
      {carts.map((item) => (
        <Text>{item.title}</Text>
      ))}
    </View>
  );
};

export default ProfileScreen;
