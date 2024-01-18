import React from "react";
import { View, Text, Image, TouchableOpacity, Button } from "react-native";
// import { addToCart } from "../redux/action";
import { useDispatch } from "react-redux";
import { styles } from "../../StyleSheet/style";

const SingleService = ({ route }) => {
  const { propKey } = route.params;
  const item = propKey;
  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    console.log(item);
    // dispatch(addToCart(item));
  };

  const handleBuyNow = () => {
    // Implement your logic for buying now
    console.log("Buy Now");
  };

  const showToast = (message) => {
    Toast.show({
      text1: message,
      position: "bottom",
      type: "success",
    });
  };

  return (
    <View style={styles.CardContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: propKey.img }} style={styles.mediumcardImage} />
        </View>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.headerText}>{propKey.name}</Text>
        <Text>{propKey.description}</Text>
        <Text>{"\n"}</Text>
        <Text>Price: ${propKey.price}</Text>
        <Text>Offer: {propKey.offer}% off</Text>
        <Text>
          Rating: {propKey.rating}{" "}
          {/* <FontAwesome name="star" size={16} color="gold" /> */}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => handleAddToCart(item)}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleBuyNow}>
          <Text style={styles.buttonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SingleService;
