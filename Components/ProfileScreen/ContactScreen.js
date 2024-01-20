import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {styles} from '../../StyleSheet/style';
import Icon from 'react-native-vector-icons/Ionicons'; // Import FontAwesome as an example
import ProfileFavourites from './ProfileFavourites';
import ProfileBooking from './ProfileBooking';
import ProfileNotifications from './ProfileNotifications';
import ProfileDeleteAccount from './ProfileDeleteAccount';

const ProfileScreen = () => {
  const [selectedAction, setSelectedAction] = useState(null);

  const renderContent = () => {
    switch (selectedAction) {
      case 'Booking':
        return <ProfileBooking />;
      case 'Favorites':
        return <ProfileFavourites />;
      case 'Notifications':
        return <ProfileNotifications />;
      case 'DeleteAccount':
        return <ProfileDeleteAccount />;
      default:
        return (
          <View style={styles.CardContainer}>
            <Image
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvJaoIeJQU_V9rL_ZII61whWyqSFbmMgTgwQ&usqp=CAU',
              }}
              style={styles.mediumcardImage}
            />
          </View>
        );
    }
  };
  return (
    <View style={styles.Profilecontainer}>
      {/* User Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.avatarContainer}>
          <Image
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvJaoIeJQU_V9rL_ZII61whWyqSFbmMgTgwQ&usqp=CAU',
            }}
            style={styles.avatar}
          />
        </View>
        <Text style={styles.userName}>John Doe</Text>
        <Text style={styles.userUsername}>@johndoe</Text>
      </View>

      {/* Action Icons */}
      <View style={styles.actionIcons}>
        <TouchableOpacity
          style={styles.actionIcon}
          onPress={() => setSelectedAction('Favorites')}>
          <Icon name="heart" size={30} color="gold" />
          {/* Replace with your favorite icon */}
          <Text style={styles.actionText}>Favorites</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionIcon}
          onPress={() => setSelectedAction('Booking')}>
          <Icon name="calendar" size={30} color="blue" />
          {/* Replace with your booking icon */}
          <Text style={styles.actionText}>Booking</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionIcon}
          onPress={() => setSelectedAction('DeleteAccount')}>
          <Icon name="trash" size={30} color="red" />
          {/* Replace with your delete account icon */}
          <Text style={styles.actionText}>Delete Account</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionIcon}
          onPress={() => setSelectedAction('Notifications')}>
          <Icon name="notifications" size={30} color="orange" />
          {/* Replace with your notification icon */}
          <Text style={styles.actionText}>Notifications</Text>
        </TouchableOpacity>
      </View>
      {renderContent()}
    </View>
  );
};

export default ProfileScreen;
