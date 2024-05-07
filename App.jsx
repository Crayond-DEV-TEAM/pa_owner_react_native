// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow
//  */

// App.jsx
import React from 'react';
import WebScreen from './src/screen/webScreen';
import SplashScreen from 'react-native-splash-screen';
import {Platform} from 'react-native';
import {requestCameraPermission} from './src/utils/accessPermissions';

const App = () => {
  React.useEffect(() => {
    permission();
    if (Platform.OS === 'android') {
      // eslint-disable-next-line no-undef
      SplashScreen.hide();
    }
    // getVersion();
  }, []);

  const permission = async () => {
    await requestCameraPermission();
  };

  return <WebScreen />;
};

export default App;
