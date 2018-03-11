{/*UPLOAD OPTION */ }
{/* <Text
            style={{
              fontSize: 20,
              marginBottom: 20,
              textAlign: 'center',
              marginHorizontal: 15,
            }}>
            Example: Upload ImagePicker result
          </Text> */}
{/* <Button
            onPress={this._pickImage}
            title="Pick an image from camera roll"
          />
          <Button onPress={this._takePhoto} title="Take a photo" /> */}

import React from 'react';
import {
  ActivityIndicator,
  Button,
  Clipboard,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Exponent, { Constants, ImagePicker, registerRootComponent, LinearGradient } from 'expo';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      uploading: false,
      screen: 1,
    };
  }
  
  // ------------------------------------------------------
  // Pass this to props to change the state and advance step
  // ------------------------------------------------------
  setScreen(screen) {
    this.setState({screen: screen})
  }

  // ---------------------
  // render state: should only have components - TODO: Dry up code and take out logic
  // ---------------------
  render() {
    let { image } = this.state;
    
    // ------------------------------------------------------
    // STEP 1: HOME SCREEN - Take picture using native camera
    // ------------------------------------------------------
    if (this.state.screen === 1) {
      return (<HomeScreen setScreen={this.setScreen.bind(this)} nextScreen={this.state.screen}/>)

    // ------------------------------------------------------
    // STEP 2: ANALYZE SCREEN - Take picture using native camera
    // ------------------------------------------------------
    } else if (this.state.screen === 2) {
      return (
        <View style={styles.container}>
          <LinearGradient colors={['#5161B9', '#9C69CC']} style={{ position: 'absolute', height: 900, width: 400 }} />
          {/* {this._maybeRenderImage()} */}
        </View>
      );
    // ------------------------------------------------------
    // STEP 3: SPOTIFY SCREEN - After picture was taken
    // ------------------------------------------------------
    } else if (this.state.screen === 3) {
      return (
        <View style={styles.container}>
          <LinearGradient colors={['#5161B9', '#9C69CC']} style={{ position: 'absolute', height: 900, width: 400 }} />
          <Image style={{ width: 150, height: 150 }} source={{ uri: 'https://media.giphy.com/media/UNBbBnOLA69YA/giphy.gif' }} />
        </View>
      )
    }
  }
}


// ------------------------------------------------------
// HomeScreen Component: STEP 1
// ------------------------------------------------------
class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {screen: this.props.screen};
  }

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      aspect: [4, 3],
    });
    this._handleImagePicked(pickerResult);
    this.setState({ screen: 2 })
  };

  _handleImagePicked = async pickerResult => {
    let uploadResponse, uploadResult;
    try {
      this.setState({ uploading: true });
      if (!pickerResult.cancelled) {
        uploadResponse = await uploadImageAsync(pickerResult.uri);
        uploadResult = await uploadResponse.json();
        this.setState({ image: uploadResult.location });
      }
    } catch (e) {
      console.log({ uploadResponse });
      console.log({ uploadResult });
      console.log({ e });
      alert('Upload failed, sorry :(');
    } finally {
      this.setState({ uploading: false });
    }
  };

  // ------------------------------------------------------
  // Called after the component was rendered and it was attached to the DOM.
  // This is a good place to make AJAX requests or setTimeout.
  // ------------------------------------------------------
  componentDidMount() {
    setTimeout(() => {
      console.log("inside setTimeout 2 seconds");
      this.props.setScreen(3);
    }, 2000);
  }

  render() {
    return( 
    <View style = {{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={styles.container}>
        <LinearGradient colors={['#5161B9', '#9C69CC']} style={{ position: 'absolute', height: 900, width: 400 }} />
        <View onPress={this._takePhoto} style={{ zIndex: 100 }}>
          <Text style={{ fontSize: 20, color: 'white' }}>TAP TO BEGIN</Text>
          <Image style={{ width: 150, height: 150 }} source={{ uri: 'https://78.media.tumblr.com/48a0d13c52b402e976bc5d4416552671/tumblr_onew3c4x8a1vxu8n6o1_500.gif' }} />
        </View>
      </View>
    </View >
    );  
  }
}


// TODO: Create components and put methods in accordingly

_maybeRenderImage = () => {
  let { image } = this.state;
  if (!image) {
    // ------------------------------------------------------
    return;
  }
  // ------------------------------------------------------
  return (
    <View onPress={this._spotifyShow}
      style={{
        marginTop: 30,
        width: 250,
        elevation: 2,
        shadowColor: 'rgba(0,0,0,1)',
        shadowOpacity: 0.2,
        shadowOffset: { width: 4, height: 4 },
        shadowRadius: 5,
      }}>
      <View
        style={{
          borderRadius: 50,
          overflow: 'hidden',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image source={{ uri: image }} style={{ width: 150, height: 150, borderRadius: 100 }} />
      </View>
      {/* URL LINK */}
      {/* <Text
        onPress={this._copyToClipboard}
        onLongPress={this._share}
        style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
        {image}
      </Text> */}
      <Text style={{ color: 'white', fontSize: 20, paddingVertical: 30, paddingHorizontal: 30, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>  ANALYZING MOOD</Text>
    </View>
  );
};
_spotifyShow = () => {
  this.setState({ screen: 3 })
}
_share = () => {
  Share.share({
    message: this.state.image,
    title: 'Check out this photo',
    url: this.state.image,
  });
};
_copyToClipboard = () => {
  Clipboard.setString(this.state.image);
  alert('Copied image URL to clipboard');
};

_pickImage = async () => {
  let pickerResult = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [4, 3],
  });
  this._handleImagePicked(pickerResult);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});