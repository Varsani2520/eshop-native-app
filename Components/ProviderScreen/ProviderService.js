import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import {HomeProviderService} from '../../services/HomeProviderService';
import {useNavigation} from '@react-navigation/native';
import {styles} from '../../StyleSheet/style';
import Icon from 'react-native-vector-icons/Ionicons';
import ToastMessage from '../ToastMessage';
import {useSelector, useDispatch} from 'react-redux';
import {addToFav, removeToFav} from '../Redux/action';
import {FavioriteService} from '../../services/get-favourite';

const ProviderService = ({route}) => {
  const [service, setService] = useState([]);
  const {providerId, providerTitle} = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  let isLoggedIn = useSelector(state => state.user.isAuthenticated);
  const user = useSelector(state => state.user.user);
  const favourites = useSelector(state => state.like.favouriteItem);
  const [isHeartFilledArray, setIsHeartFilledArray] = useState([]);
  const [toastMessage, setToastMessage] = useState('');

  async function fetchServiceData() {
    try {
      const result = await HomeProviderService({id: providerId});
      setService(result);
      const heartFilledArray = result.map(item =>
        favourites.some(favouriteItem => favouriteItem.id === item.id),
      );
      setIsHeartFilledArray(heartFilledArray);
    } catch (error) {
      console.error('Error fetching service data:', error);
    }
  }

  useEffect(() => {
    fetchServiceData();
  }, [providerId, favourites]);

  function fav(item, index) {
    if (!isLoggedIn && user) {
      setToastMessage('Please log in to add to favorites.');
      return;
    } else {
      if (isHeartFilledArray[index]) {
        setToastMessage('Your item is already in your Wishlist');
      } else {
        dispatch(addToFav(item));
        FavioriteService(user.data.token, item);
        setToastMessage('Added to wishlist successfully');
      }
    }
  }

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
                      onPress={() => fav(item, index)}>
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
