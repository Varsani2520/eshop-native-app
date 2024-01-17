// HomeProvider.js
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";

import { useNavigation } from "@react-navigation/native";
import { HomeService } from "../../services/HomeService";
import { styles } from "../../StyleSheet/style";

const HomeProvider = ({  horizontal = true }) => {
  const [provider, setProvider] = useState([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchCards() {
    try {
      const result = await HomeService();
      setProvider(result);
    } catch (error) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size={40} color="green" />
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <FlatList
          data={provider}
          
          renderItem={({ item }) => (
            <View style={styles.imageContainer}>
              <TouchableOpacity
                style={styles.CardContainer}
                onPress={() =>
                  navigation.navigate("ProviderService", {
                    providerId: item.provider_id,
                    providerTitle: item.title,
                  })
                }
              >
                <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.mediumcardImage}
                  />
                  <View style={styles.cardTitleContainer}>
                    <Text style={styles.CardTitle}>{item.title}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )}
          horizontal={horizontal}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default HomeProvider;
