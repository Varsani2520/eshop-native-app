import { View, FlatList, Image, Dimensions } from "react-native";
import React from "react";
import { swiperImage } from "../SwiperImages";
import { styles } from "../../StyleSheet/style";
const HomeSwiper = () => {
  const { width, height } = Dimensions.get("window");

  return (
    <View>
      <FlatList
        data={swiperImage}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.image }} style={styles.image} />
          </View>
        )}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default HomeSwiper;
