import {View, Text, Image, ScrollView, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {styles} from '../../StyleSheet/style';
import {getFaviorites} from '../../services/getFavourite';

const ProfileFavourites = () => {
  const tokens = useSelector(state => state.user.user.data.token);
  const [fav, setFav] = useState([]);
  const [loading, setLoading] = useState(true);

  const favs = async function getFav() {
    try {
      const response = await getFaviorites(tokens);
      setFav(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading to false when data is fetched
    }
  };

  useEffect(() => {
    favs();
  }, []);

  return (
    <ScrollView>
      {loading ? ( // Display activity loader while loading
        <ActivityIndicator size="large" color="#3498db" style={styles.loader} />
      ) : (
        <View style={styles.CardContainer}>
          {fav.length === 0 ? (
            <Text>No Favourite Available</Text>
          ) : (
            fav.map(response => {
              return (
                <React.Fragment key={response.someUniqueKey}>
                  {response.data.map(singleFav => {
                    return (
                      <View
                        style={[
                          styles.itemContainer,
                          {backgroundColor: '#f2f2f2'},
                        ]}
                        key={singleFav.id}>
                        <View style={styles.imageContainer}>
                          <Image
                            style={styles.Cartimage}
                            source={{uri: singleFav.img}}
                          />
                        </View>
                        <View style={styles.detailsContainer}>
                          <Text>{singleFav.name}</Text>
                          <Text>{singleFav.rating}</Text>
                          <Text style={styles.price}>
                            Price: {singleFav.price}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                </React.Fragment>
              );
            })
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default ProfileFavourites;
