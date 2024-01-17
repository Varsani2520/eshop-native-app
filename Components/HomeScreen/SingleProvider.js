import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { HomeProviderServiceFirst } from "../../services/HomeProviderService";
import CardFirst from "./CardFirst";
import { styles } from "../../StyleSheet/style";

const SingleProvider = () => {
  const [service, setService] = useState([]);
  const navigation = useNavigation();

  async function fetchServiceData() {
    try {
      const result = await HomeProviderServiceFirst({ id: 1 });
      setService(result);
    } catch (error) {
      console.error("Error fetching service data:", error);
    }
  }

  useEffect(() => {
    fetchServiceData();
  }, []);

  const handleCardPress = (item) => {
    navigation.navigate("SingleService", { propKey: item });
  };

  return (
    <View>
      <Text style={styles.headerText}>Woman</Text>
      <FlatList
        horizontal
        data={service}
        renderItem={({ item }) => {
          if (item.provider_id == 3)
            return <CardFirst item={item} handleCardPress={handleCardPress} />;
        }}
        keyExtractor={(item) => item.images}
        showsHorizontalScrollIndicator={false}
      />

      {/* 2nd  */}
      <Text style={styles.headerText}>Kids</Text>
      <FlatList
        horizontal
        data={service}
        renderItem={({ item }) => {
          if (item.provider_id == 2)
            return <CardFirst item={item} handleCardPress={handleCardPress} />;
        }}
        keyExtractor={(item) => item.images}
        showsHorizontalScrollIndicator={false}
      />
      {/* 3rd */}
      <Text style={styles.headerText}>Men</Text>
      <FlatList
        horizontal
        data={service}
        renderItem={({ item }) => {
          if (item.provider_id == 4)
            return <CardFirst item={item} handleCardPress={handleCardPress} />;
        }}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
      />

      {/* 4th */}
      <Text style={styles.headerText}>Jewellery &Accessories</Text>
      <FlatList
        horizontal
        data={service}
        renderItem={({ item }) => {
          if (item.provider_id == 9)
            return <CardFirst item={item} handleCardPress={handleCardPress} />;
        }}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
      />

      {/* 5th */}
      <Text style={styles.headerText}>Bags </Text>
      <FlatList
        horizontal
        data={service}
        renderItem={({ item }) => {
          if (item.provider_id == 7)
            return <CardFirst item={item} handleCardPress={handleCardPress} />;
        }}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default SingleProvider;
