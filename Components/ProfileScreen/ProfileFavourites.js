import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux'; // Import useDispatch
import {styles} from '../../StyleSheet/style';
import {removeToFav} from '../Redux/action';

const ProfileFavourites = () => {
  
  const favourites = useSelector(state => state.like.favouriteItem);
   // Use useDispatch to get the dispatch function

  const handleRemoveToCart = item => {
    dispatch(removeToFav(item));
  };

  return (
    <ScrollView>
      <View style={styles.CardContainer}>
        {favourites.map(item => (
          <View
            style={[styles.itemContainer, {backgroundColor: '#f2f2f2'}]}
            key={item.name}>
            <View style={styles.imageContainer}>
              <Image style={styles.Cartimage} source={{uri: item.img}} />
            </View>
            <View style={styles.detailsContainer}>
              <Text>{item.name}</Text>
              <Text style={styles.price}>Price:{item.price}</Text>
              <TouchableOpacity
                onPress={() => handleRemoveToCart(item)}
                style={{
                  backgroundColor: '#3498db',
                  padding: 5,
                  borderRadius: 5,
                }}>
                <Text>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default ProfileFavourites;
