import React from 'react';

import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    ActivityIndicator,
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
            source={{ uri: `https://dev-owner-v2.propertyautomate.com` }} style={{ marginTop: 20 }} />
        
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