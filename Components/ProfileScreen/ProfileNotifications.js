import {View, Text, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getSummaries} from '../../services/SummaryService';
import {useSelector} from 'react-redux';
import {styles} from '../../StyleSheet/style';

const ProfileNotifications = () => {
  const token = useSelector(state => state.user.authUser.data.token);

  const [summary, setSummary] = useState([]);

  async function SummaryData() {
    try {
      const response = await getSummaries(token);
      console.log('Response:', response);
      setSummary(response || []);
    } catch (error) {
      console.error('Error fetching summary data:', error);
    }
  }
  const formatDate = dateString => {
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    return new Intl.DateTimeFormat('en-US', options).format(
      new Date(dateString),
    );
  };
  useEffect(() => {
    SummaryData();
  }, []);
  return (
    <ScrollView>
      {summary &&
        summary.map(result => {
          return (
            <View style={styles.CardContainer} key={result.name}>
              <View
                style={[styles.itemContainer, {backgroundColor: '#f2f2f2'}]}>
                <View>
                  <Text> Status:{result.status}</Text>
                  <Text style={[styles.price]}>Your Order is Completed </Text>
                  <Text> Date:{formatDate(result.date)}</Text>
                </View>
              </View>
            </View>
          );
        })}
    </ScrollView>
  );
};

export default ProfileNotifications;
