import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableHighlight,
} from 'react-native';
import { getCategories } from './ScalaServer';
import { getTable } from './Database';
import Header from './Header';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    backgroundColor: '#F5FCFF',
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

class Category extends Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={{
          width: '100%',
          height: 172,
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomWidth: 2,
          borderBottomColor: '#DDD',
        }}
        >
          <Image
            style={{
              position: 'absolute',
              width: '100%',
              height: 170,
            }}
            source={{ uri: this.props.src }}
          />
          <Text style={{
            color: 'white',
            fontSize: 35,
            fontWeight: 'bold',
          }}
          >
            {this.props.text}
          </Text>
          <Text style={{
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold',
          }}
          >
            {this.props.subText}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

export default class CategoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          text: 'Sıcak İçecekler',
          subText: 'İçinizi ısıtacak enfes lezzetler',
          src: 'http://s3.india.com/wp-content/uploads/2016/07/Untitled-design-144.jpg',
        },
        {
          text: 'Pizzalar',
          subText: 'Meşhur İtalyan lezzetleriyle sizlerle',
          src: 'http://www.godine.co.uk/blog/wp-content/uploads/2009/12/Italian-pizza1.jpg',
        }],
    };
    getCategories().then(items => this.setState({ items }));
  }

  render() {
    const { navigation } = this.props;
    const { items } = this.state;

    return (
      <View style={styles.container}>
        <Header title={`Masa: ${getTable()}`} onBackButtonPress={() => navigation.goBack()} onBasketPress={() => navigation.navigate('Order')} />
        <ScrollView
          style={styles.content}
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-around' }}
        >
          {
            items
              .filter(({ name }) => name)
              .map(({ name, image_path: imagePath }) => (
                <Category
                  text={name}
                  key={name + imagePath}
                  subText=""
                  src={imagePath}
                  onPress={() => navigation.navigate('List', { name })}
                />
              ))
          }
        </ScrollView>
      </View>
    );
  }
}
