import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import Navbar from './Components/Navbar';
// import {Provider} from 'react-redux';
// import {PersistGate} from 'redux-persist/integration/react';
// import {persistor, store} from './Components/redux/store';
export default function App() {
  return (
    // <Provider store={store}>
    //   <PersistGate loading={null} persistor={persistor}>
    <View style={styles.container}>
      <Navbar />
      <StatusBar style="auto" />
    </View>
    //   </PersistGate>
    // </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
