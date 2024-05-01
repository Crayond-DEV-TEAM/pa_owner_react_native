import React from 'react';

import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    ActivityIndicator,
    Linking,
} from 'react-native';

import { WebView } from 'react-native-webview';

const INJECTED_JAVASCRIPT = `(function() {
    const authLocalStorage = window.localStorage.getItem('auth_token');

    const obj = {
        authLocalStorage,
    }

    const getItemLocalStorage = JSON.stringify(obj);
    window.ReactNativeWebView.postMessage(getItemLocalStorage);
})();`;


const WebScreen = (props) => {
    const { diviceToken } = props;

    const onMessage = (payload) => {
        console.log('payload asses', payload);
    };
    

    const WebviewRender = () => {
        return <WebView
            injectedJavaScript={INJECTED_JAVASCRIPT}
            onMessage={onMessage}
            source={{ uri: `https://owner.thabat.propgoto.com` }} 
            onShouldStartLoadWithRequest={(event) => {
                const { url } = event;
                if (url.startsWith('tel:')) {
                  // Intercept tel:// URLs and initiate phone calls
                  Linking.openURL(url);
                  return false; // Prevent the WebView from loading the URL
                }
                return true; // Allow other URLs to be loaded by the WebView
              }}
            style={{ marginTop: 20 }} />
        
    }

    return (
        <SafeAreaView style={styles.container}>
            <WebviewRender />
        </SafeAreaView>
    );
}

export default WebScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: -StatusBar.currentHeight + 10,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
});