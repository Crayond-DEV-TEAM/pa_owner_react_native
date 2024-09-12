import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Linking,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {WebView} from 'react-native-webview';

const getInjectedJavascript = token => `(function () {
  const authLocalStorage = '${token}' || window.localStorage.getItem('auth_token');

  const obj = {
    authLocalStorage,
  };

  const getItemLocalStorage = JSON.stringify(obj);
  window.ReactNativeWebView.postMessage(getItemLocalStorage);
})()`;

const WebScreen = props => {
  const [authToken, setAuthToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthToken = async () => {
      try {
        const token = await AsyncStorage.getItem('auth_token');
        setAuthToken(token);
      } catch (error) {
        console.error('Error fetching auth token:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthToken();
  }, []);

  const onMessage = async event => {
    const {authLocalStorage} = JSON.parse(event.nativeEvent.data);
    if (authLocalStorage !== undefined) {
      try {
        await AsyncStorage.setItem('auth_token', authLocalStorage);
      } catch (error) {
        console.error('Error saving auth token:', error);
      }
    }
  };

  const WebviewRender = () => {
    if (loading) {
      return (
        <SafeAreaView style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </SafeAreaView>
      );
    }

    return (
      <WebView
        ref={ref => (this.webviewRef = ref)}
        injectedJavaScript={getInjectedJavascript(authToken)}
        onMessage={onMessage}
        source={{uri: 'https://my.thabatre.sa/'}}
        onShouldStartLoadWithRequest={event => {
          const {url} = event;
          if (url.startsWith('tel:')) {
            // Intercept tel:// URLs and initiate phone calls
            Linking.openURL(url);
            return false; // Prevent the WebView from loading the URL
          }
          return true; // Allow other URLs to be loaded by the WebView
        }}
        style={{marginTop: 20}}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <WebviewRender />
    </SafeAreaView>
  );
};

export default WebScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -StatusBar.currentHeight + 10,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
