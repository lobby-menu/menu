import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import { getTable } from './Database';
import Header from './Header';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    backgroundColor: '#333',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
  },
});

export default class OrderCompleteScreen extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <Header title={`Masa: ${getTable()}`} />
        <View style={styles.content}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}
          >
            <Image
              source={require('./images/check-128.png')}
              style={{
                width: 200,
                height: 200,
                marginBottom: 20,
              }}
            />
            <Text style={{ fontSize: 50, fontWeight: 'bold', color: 'white' }}>Sipariş alındı!</Text>
          </View>
        </View>
      </View>
    );
  }
}
