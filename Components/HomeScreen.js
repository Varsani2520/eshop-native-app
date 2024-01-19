import React from 'react';
import {ScrollView,  View} from 'react-native';

import HomeSwiper from './HomeScreen/HomeSwiper';
import HomeProvider from './HomeScreen/HomeProvider';
import SingleProvider from './HomeScreen/SingleProvider';

const HomeScreen = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{flex: 1}}>
        <HomeSwiper />
        <HomeProvider />
        <SingleProvider />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
