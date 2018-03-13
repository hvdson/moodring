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
  WebView,
} from 'react-native';
import Exponent, { Constants, ImagePicker, registerRootComponent, LinearGradient } from 'expo';

{/* <View style={styles.imageContainer}>
  <Image source={{ uri: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/35771931234507.564a1d2403b3a.gif' }} style={styles.image} />
  <Text style={styles.systemMessage}>ANALYZING MOOD</Text>
</View> */}

export default class Analyze extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isBackPressed: false
    }
  }

  _maybeRenderImage = () => {
    let { image } = this.props;

    if (this.state.isBackPressed) {
      return (
        <View style={styles.imageContainer}>
          <Image source={{ uri: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/35771931234507.564a1d2403b3a.gif' }} style={styles.image} />
          <Text style={styles.systemMessage}>ANALYZING MOOD</Text>
        </View>
      )
    } else {
      return (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
          <Text style={styles.systemMessage}>ANALYZING MOOD</Text>
        </View>
      );
    }
  };

  componentWillMount() {
    let { image } = this.props;
    console.log(image);

    if (!image) {
      this.setState({isBackPressed: true});
      this.props.setImage(null);
      this.props.setUploading(false);
      this.props.setScreen('HOME');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <LinearGradient colors={['#5161B9', '#9C69CC']} style={{ position: 'absolute', height: 900, width: 400 }} />
        <TouchableOpacity>
          {this._maybeRenderImage()}
        </TouchableOpacity>
      </View>
    );
  }

  // ------------------------------------------------------
  // Called after the component was rendered and it was attached to the DOM.
  // This is a good place to make AJAX requests or setTimeout.
  // -----------------------------------------------------

  componentDidMount() {
    setTimeout(() => {
      if (this.props.uploading === true) {
        this.props.setScreen('PLAYLIST');
      } else {
        this.props.setScreen('HOME');
      }
    }, 5000);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  systemMessage: { 
    color: 'white', 
    fontSize: 20, 
    paddingVertical: 30, 
    paddingHorizontal: 30, 
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center', 
    textAlign: 'center'
  },
  imageContainer: {
    borderRadius: 50,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 150, 
    height: 150, 
    borderRadius: 100
  }
});