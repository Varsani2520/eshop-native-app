import React from 'react';
import {ScrollView, View} from 'react-native';

import HomeSwiper from './HomeSwiper';
import HomeProvider from './HomeProvider';
import SingleProvider from './SingleProvider';

const HomeScreen = () => {
  return (
    <ScrollView>
      <View style={{flex: 1}}>
        <HomeSwiper />
        <HomeProvider />
        <SingleProvider />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
