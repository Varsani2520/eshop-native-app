import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {styles} from '../../StyleSheet/style';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {addToFav, removeToFav} from '../Redux/action';

const CardFirst = ({item, handleCardPress}) => {
  const [isHeartFilled, setHeartFilled] = useState(false);
  const dispatch = useDispatch();
  const favourites = useSelector(state => state.like.favouriteItem);

  useEffect(() => {
    // Check if the item is in the favorites list
    const isItemInFavorites = favourites.some(
      favItem => favItem.name === item.name,
    );
    setHeartFilled(isItemInFavorites);
  }, [favourites, item]);

  const handleHeartPress = () => {
    setHeartFilled(!isHeartFilled);
    if (isHeartFilled) {
      dispatch(removeToFav(item));
    } else {
      dispatch(addToFav(item));
    }
  };

  const handleImagePress = () => {
    handleCardPress(item);
  };

  return (
    <View style={styles.imageContainer}>
      <TouchableOpacity onPress={handleImagePress}>
        <Image source={{uri: item.img}} style={styles.mediumcardImage} />
      </TouchableOpacity>
      <View style={styles.overlayIcons}>
        <TouchableOpacity style={styles.iconButton} onPress={handleHeartPress}>
          <Icon
            name={isHeartFilled ? 'heart' : 'heart-outline'}
            size={30}
            color={isHeartFilled ? 'red' : '#3498db'}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.cardTitleContainer}>
        <Text style={styles.CardTitle}>{item.name}</Text>
      </View>
    </View>
  );
};

export default CardFirst;
