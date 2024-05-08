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
import {
  requestCameraPermission,
  requestMicrophonePermission,
} from './src/utils/accessPermissions';

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
    const hasCameraAccess = await requestCameraPermission();
    if (hasCameraAccess) {
      const hasMicrophoneAccess = await requestMicrophonePermission();
      if (hasMicrophoneAccess) {
        console.log('You can use the microphone');
      } else {
        console.log('Microphone permission denied');
      }
    }
  };

  return <WebScreen />;
};

export default App;
