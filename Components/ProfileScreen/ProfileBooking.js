import {View, Text, Image, ScrollView, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getSummaries} from '../../services/SummaryService';
import {useSelector} from 'react-redux';
import {styles} from '../../StyleSheet/style';

const ProfileBooking = ({totalPrice}) => {
  const tokens = useSelector(state => state.user.user.data.token);
  const [booking, setBooking] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading

  async function Booking() {
    try {
      const response = await getSummaries(tokens);
      setBooking(response);
      setLoading(false); // Set loading to false when data is fetched
      console.log(response);
    } catch (error) {
      setLoading(false); // Set loading to false in case of an error
      console.log(error);
    }
  }

  useEffect(() => {
    Booking();
  }, []);

  return (
    <ScrollView>
      {loading ? ( // Show loading indicator if loading is true
        <View style={[styles.loader, {height: 500}]}>
          <ActivityIndicator size="large" color="#3498db" />
        </View>
      ) : (
        <View style={styles.CardContainer}>
          {booking.slice(0, 501).map(response => {
            return (
              <>
                {response.data.map(singlebooking => {
                  return (
                    <View
                      style={[
                        styles.itemContainer,
                        {backgroundColor: '#f2f2f2'},
                      ]}
                      key={singlebooking.name}>
                      <View style={styles.imageContainer}>
                        <Image
                          style={styles.Cartimage}
                          source={{uri: singlebooking.img}}
                          alt="img"
                        />
                      </View>
                      <View style={styles.detailsContainer}>
                        <Text>{singlebooking.name}</Text>
                        {/* Display the price here */}

                        <Text style={styles.price}>
                          Price: {singlebooking.price * singlebooking.quantity}
                        </Text>
                        {/* Display the quantity inside the image */}
                        {singlebooking.quantity &&
                          singlebooking.quantity > 1 && (
                            <Text style={styles.price}>
                              quantity:{singlebooking.quantity}
                            </Text>
                          )}
                      </View>
                    </View>
                  );
                })}
              </>
            );
          })}
        </View>
      )}
    </ScrollView>
  );
};

export default ProfileBooking;
