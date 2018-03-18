
import Expo, { Constants, WebBrowser, LinearGradient } from 'expo';
import React from 'react';
import { Button, Linking, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import qs from 'qs';
import querystring from 'querystring';
// import Logo from '../assets/logo.png'

export default class Login extends React.Component {
  state = {
    redirectData: null,
  };

  render() {
    console.log(this.state)
    return (
      <View style={styles.container}>

        <LinearGradient colors={this.props.backgroundColor} style={{ position: 'absolute', height: 900, width: 400 }} />
        <Image style={{ width: 150, height: 100 }} source={require('../assets/logo.png')} />

        <TouchableOpacity onPress={this._openWebBrowserAsync} style={{ bottom: 0, borderWidth: 2, backgroundColor: '#2FD465', padding: 10, borderRadius: 100, borderColor: 'transparent' }}>
          <Text style={{ color: 'white' }}>LOGIN WITH SPOTIFY</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this._returnHome} style={{ bottom: 0, borderWidth: 2, backgroundColor: '#2FD465', padding: 10, borderRadius: 100, borderColor: 'transparent' }}>
          <Text style={{ color: 'white' }}>BUTTON FOR TESTING</Text>
        </TouchableOpacity>

      </View>
    );
  }
}