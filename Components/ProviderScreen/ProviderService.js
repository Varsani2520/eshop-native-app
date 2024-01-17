import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import {HomeProviderService} from '../../services/HomeProviderService';
import {useNavigation} from '@react-navigation/native';
import {styles} from '../../StyleSheet/style';

const ProviderService = ({route}) => {
  const [service, setService] = useState([]);
  const {providerId, providerTitle} = route.params;
  const navigation = useNavigation();

  // Create an array of state variables, one for each item
  const [isHeartFilledArray, setIsHeartFilledArray] = useState([]);

  useEffect(() => {
    async function fetchServiceData() {
      try {
        const result = await HomeProviderService({id: providerId});
        setService(result);

        // Initialize the array of state variables based on the number of items
        setIsHeartFilledArray(new Array(result.length).fill(false));
      } catch (error) {
        console.error('Error fetching service data:', error);
      }
    }

    fetchServiceData();
  }, [providerId]);

  const handleHeartPress = index => {
    // Update the state for the specific item at the given index
    const updatedArray = [...isHeartFilledArray];
    updatedArray[index] = !updatedArray[index];
    setIsHeartFilledArray(updatedArray);

    // Call any function related to heart icon press here
  };

  const handleCardPress = item => {
    navigation.navigate('SingleService', {propKey: item});
    // Call any function related to card press here
  };

  return (
    <View style={styles.imageContainer}>
      <Text style={styles.headerText}>{providerTitle}</Text>
      <FlatList
        data={service}
        renderItem={({item, index}) => {
          if (item.provider_id == providerId)
            return (
              <TouchableOpacity
                style={styles.CardContainer}
                onPress={() => handleCardPress(item)}>
                <View style={styles.imageContainer}>
                  <Image
                    source={{uri: item.img}}
                    style={styles.mediumcardImage}
                  />
                  <View style={styles.overlayIcons}>
                    <TouchableOpacity
                      style={styles.iconButton}
                      onPress={() => handleHeartPress(index)}>
                      <FontAwesome
                        name={isHeartFilledArray[index] ? 'heart' : 'heart-o'}
                        size={30}
                        color={isHeartFilledArray[index] ? 'red' : '#3498db'}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.cardTitleContainer}>
                    <Text style={styles.CardTitle}>{item.name}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
        }}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ProviderService;
