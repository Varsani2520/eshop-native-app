import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import {HomeProviderService} from '../../services/HomeProviderService';
import {useNavigation} from '@react-navigation/native';
import {styles} from '../../StyleSheet/style';
import Icon from 'react-native-vector-icons/Ionicons';
import ToastMessage from '../ToastMessage';
import {useSelector, useDispatch} from 'react-redux';
import {addToFav, removeToFav} from '../Redux/action';

const ProviderService = ({route}) => {
  const [service, setService] = useState([]);
  const {providerId, providerTitle} = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.user.message === 'true');
  const [isHeartFilledArray, setIsHeartFilledArray] = useState([]);
  const [toastMessage, setToastMessage] = useState('');

  async function fetchServiceData() {
    try {
      const result = await HomeProviderService({id: providerId});
      setService(result);
      setIsHeartFilledArray(new Array(result.length).fill(false));
    } catch (error) {
      console.error('Error fetching service data:', error);
    }
  }

  useEffect(() => {
    fetchServiceData();
  }, [providerId]);

  const handleHeartPress = async index => {
    const updatedArray = [...isHeartFilledArray];
    updatedArray[index] = !updatedArray[index];
    setIsHeartFilledArray(updatedArray);

    const selectedService = service[index];

    if (!isLoggedIn) {
      setToastMessage('Please login');
      return;
    }

    if (updatedArray[index]) {
      dispatch(addToFav(selectedService));
      setToastMessage('Added to Favourites');
    } else {
      dispatch(removeToFav(selectedService));
      setToastMessage('Removed from Favourites');
    }
  };

  const handleCardPress = item => {
    navigation.navigate('SingleService', {propKey: item});
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
                onPress={() => handleCardPress(item)}
                key={`${item.id}_${item.name}`}>
                <View style={styles.imageContainer}>
                  <Image
                    source={{uri: item.img}}
                    style={styles.mediumcardImage}
                  />
                  <View style={styles.overlayIcons}>
                    <TouchableOpacity
                      style={styles.iconButton}
                      onPress={() => handleHeartPress(index)}>
                      <Icon
                        name={
                          isHeartFilledArray[index] ? 'heart' : 'heart-outline'
                        }
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
        keyExtractor={(item, index) => `${item.id}_${item.name}`}
        showsVerticalScrollIndicator={false}
      />
      {toastMessage !== '' && <ToastMessage message={toastMessage} />}
    </View>
  );
};

export default ProviderService;
