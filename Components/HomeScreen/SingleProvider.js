import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {HomeProviderServiceFirst} from '../../services/HomeProviderService';
import CardFirst from './CardFirst';
import {styles} from '../../StyleSheet/style';

const CategoryList = ({providerId, data, handleCardPress}) => (
  <>
    <Text style={styles.headerText}>{getCategoryName(providerId)}</Text>
    <FlatList
      horizontal
      data={data.filter(item => item.provider_id === providerId)}
      renderItem={({item}) => (
        <CardFirst item={item} handleCardPress={handleCardPress} />
      )}
      keyExtractor={item => item.id.toString()}
      showsHorizontalScrollIndicator={false}
    />
  </>
);

const getCategoryName = providerId => {
  // You can implement logic to return the category name based on provider_id
  switch (providerId) {
    case 1:
      return 'Toys';
    case 2:
      return 'Kids';
    case 3:
      return 'Women';
    case 4:
      return 'Men';
    default:
      return 'Other';
  }
};

const SingleProvider = () => {
  const [service, setService] = useState([]);
  const navigation = useNavigation();

  async function fetchServiceData() {
    try {
      const result = await HomeProviderServiceFirst({id: 1});
      setService(result);
    } catch (error) {
      console.error('Error fetching service data:', error);
    }
  }

  useEffect(() => {
    fetchServiceData();
  }, []);

  const handleCardPress = item => {
    navigation.navigate('SingleService', {propKey: item});
  };

  return (
    <View>
      {Array.from({length: 5}, (_, index) => index + 1).map(providerId => (
        <CategoryList
          key={providerId}
          providerId={providerId}
          data={service}
          handleCardPress={handleCardPress}
        />
      ))}
    </View>
  );
};

export default SingleProvider;
