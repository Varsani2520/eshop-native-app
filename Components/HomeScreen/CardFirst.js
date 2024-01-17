import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { styles } from "../../StyleSheet/style";

const CardFirst = ({ item, handleCardPress }) => {
  const [isHeartFilled, setHeartFilled] = useState(false);

  const handleHeartPress = () => {
    setHeartFilled(!isHeartFilled);
    // handleCardPress(item); // You can comment this line out if you don't want to call it here
  };

  const handleImagePress = () => {
    handleCardPress(item);
  };

  return (
    <View style={styles.imageContainer}>
      <TouchableOpacity onPress={handleImagePress}>
        <Image source={{ uri: item.img }} style={styles.mediumcardImage} />
      </TouchableOpacity>
      {/* <View style={styles.overlayIcons}>
        <TouchableOpacity style={styles.iconButton} onPress={handleHeartPress}>
          <FontAwesome
            name={isHeartFilled ? "heart" : "heart-o"}
            size={30}
            color={isHeartFilled ? "red" : "#3498db"}
          />
        </TouchableOpacity>
      </View> */}
      <View style={styles.cardTitleContainer}>
        <Text style={styles.CardTitle}>{item.name}</Text>
      </View>
    </View>
  );
};

export default CardFirst;
