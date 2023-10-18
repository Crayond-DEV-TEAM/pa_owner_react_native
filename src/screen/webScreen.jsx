import React from 'react';

import {
    // SafeAreaView,
    StatusBar,
    StyleSheet,
    ActivityIndicator,
    View,
    Platform,
    Dimensions,
    Text,
} from 'react-native';

import { WebView } from 'react-native-webview';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const INJECTED_JAVASCRIPT = `(function() {
    const authLocalStorage = window.localStorage.getItem('auth_token');

    const obj = {
        authLocalStorage,
    }

    const getItemLocalStorage = JSON.stringify(obj);
    window.ReactNativeWebView.postMessage(getItemLocalStorage);
})();`;

const isIOS = Platform.OS === 'ios';
const { height } = Dimensions.get('window');

const WebScreen = (props) => {
    const { diviceToken } = props;

    const onMessage = (payload) => {
        // console.log('payload asses', payload);
    };
    
    const WebviewRender = () => {
        return <WebView
            injectedJavaScript={INJECTED_JAVASCRIPT}
            onMessage={onMessage}
            incognito={true}
            cacheEnabled={false}
            cacheMode={'LOAD_NO_CACHE'}
            style={{ marginTop: isIOS ? 0 : 10 }}
            source={{ uri: `https://owner.pms2.propgoto.com/?deviceToken=${diviceToken}` }} />
        
    }

    return (
        <View style={{flex: 1,backgroundColor:"#f15a29"}}>
            <SafeAreaProvider style={{flex: 1}}>
                <StatusBar translucent backgroundColor={"#f15a29"} barStyle="light-content"/>
                <SafeAreaView style={{flex:1, paddingBottom: isIOS && height < 812 ? -1 : -40}}>
                    <WebviewRender />
                </SafeAreaView>
            </SafeAreaProvider>
        </View>
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