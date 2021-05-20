import React, { Component } from 'react';
import {
  Button,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import { Header } from 'react-native-elements';
import db from './localDB';
import PhonicSoundButton from './components/PhonicSoundButton';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
      chunks: [],
      phonicSound: [],
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={'red'}
          centerComponent={{
            text: 'Monkey Chunky',
            style: { color: 'black', fontSize: 25 },
          }}
        />
        <Image
          style={styles.imageIcon}
          source={{
            uri:
              'https://www.shareicon.net/data/128x128/2015/08/06/80805_face_512x512.png',
          }}
        />
        <TextInput
          style={styles.inputBox}
          onChangeText={(text) => {
            this.setState({ text: text });
          }}
          value={this.state.text}
        />
        <TouchableOpacity
          style={styles.goButton}
          onPress={() => {
            var word=this.state.text.toLowerCase()
            db[word]?(
            this.setState({ chunks: db[word].chunks }),
            this.setState({ phonicSound: db[word].phones })
            ):
            Alert.alert('The word do not exist in database')
          }}>
          <Text style={styles.buttonText}>GO</Text>
        </TouchableOpacity>
        <View>
          {this.state.chunks.map((item, index) => {
            return (
              <PhonicSoundButton
                wordChunk={this.state.chunks[index]}
                soundChunk={this.state.phonicSound[index]}
                buttonIndex={index}
              />
            );
          })}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
  inputBox: {
    marginTop: 200,
    width: '80%',
    alignSelf: 'center',
    borderWidth: 4,
    outline: 'none',
  },
  goButton: {
    width: '50%',
    height: 60,
    alignSelf: 'center',
    padding: 10,
    margin: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
  },
  imageIcon: {
    width: 150,
    height: 150,
    margiLeft: 75,
  },
  chunkButton: {
    width: '60%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    margin: 5,
    backgroundColor: 'green',
  },
});
