import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { BoxShadow } from 'react-native-shadow';
import { getBasketState } from './Database';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    backgroundColor: '#F5FCFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#EEE',
    paddingTop: 10,
    paddingRight: 20,
    paddingBottom: 10,
  },
  tableNumber: {
    fontSize: 24,
    fontWeight: 'bold',
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

export default class Header extends Component {
  render() {
    const shadowOptions = {
      height: 61,
      color: '#000',
      border: 0,
      radius: 1,
      opacity: 0.9,
      x: 0,
      y: 1,
      style: { width: '100%', marginBottom: 1 },
    };
    return (
      <BoxShadow setting={shadowOptions}>
        <View style={styles.header}>
          <BackButton onBackButtonPress={this.props.onBackButtonPress} />
          <Text style={styles.tableNumber}>{this.props.title}</Text>
          <OrdersButton onBasketPress={this.props.onBasketPress} />
        </View>
      </BoxShadow>
    );
  }
}

class OrdersButton extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onBasketPress}>
        <Image
          style={{ width: 40, height: 35 }}
          source={require('./images/shopping-cart.png')}
        />
        <Text style={{
          position: 'absolute',
          right: 0,
          color: 'black',
          top: 0,
          fontWeight: 'bold',
          fontSize: 24,
          lineHeight: 24,
        }}
        >
          { getBasketState().count }
        </Text>
      </TouchableOpacity>
    );
  }
}

class BackButton extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onBackButtonPress}>
        <Image
          style={{ width: 50, height: 40 }}
          source={require('./images/back-arrow.png')}
        />
      </TouchableOpacity>
    );
  }
}
