import { Permissions, Camera } from 'expo';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import { getProductsForCategory } from './ScalaServer';
import { getFaces, addFace, addToBasket } from './Database';
import { createFace } from './FaceServer';
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
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 85,
    paddingTop: 5,
    paddingRight: 10,
    paddingBottom: 5,
    paddingLeft: 10,
    marginBottom: 5,
    borderColor: '#EEE',
    borderBottomWidth: 1,
  },
  itemIcon: {
    width: 70,
    height: 70,
    marginRight: 10,
    borderRadius: 10,
  },
  itemInfo: {
    flex: 1,
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'nowrap',
  },
  itemName: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 20,
    paddingBottom: 0,
  },
  itemContent: {
    flexWrap: 'nowrap',
    fontSize: 14,
    lineHeight: 14,
    marginTop: 5,
  },
});

class ListItem extends Component {
  render() {
    const { name, price, description } = this.props.item;

    return (
      <View style={styles.itemContainer}>
        <View>
          <Image
            style={styles.itemIcon}
            source={require('./images/sucuklu-kasarli-tost.jpg')}
          />
        </View>
        <View style={styles.itemInfo}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.itemName}>{name}</Text>
            <Text style={{
              flex: 0.35, fontSize: 15, lineHeight: 20, alignContent: 'flex-start', alignSelf: 'flex-end',
            }}
            >
              {price}
              {' '}
₺
            </Text>
          </View>
          <Text style={styles.itemContent}>{description}</Text>
        </View>
        <View style={{
          justifyContent: 'center', alignContent: 'center', alignItems: 'center', width: 60,
        }}
        >
          <TouchableHighlight onPress={this.props.onAddPress}>
            <Image
              source={require('./images/add-128.png')}
              style={{
                width: 30,
                height: 30,
                justifyContent: 'center',
                alignSelf: 'center',
              }}
            />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

export default class ItemListScreen extends Component<{}> {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const { name } = navigation.state.params;

    this.state = { products: [] };
    console.log(name, navigation.state.params);
    getProductsForCategory(name)
      .then((products) => {
        this.setState({ products });
      });
  }

  async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA);
  }

  takePicture() {
    const options = { quality: 0.5, autoFocus: false, skipProcessing: true };

    console.log('Capturing!');
    this.camera.takePictureAsync(options)
      .then(data => createFace(data.uri))
      .then((result) => {
        result.faces.forEach(face => addFace(face));
        console.log(getFaces());
      })
      .finally(() => console.log('Finally!'))
      .catch(err => console.log('Error???', err));
  }

  addItem(item) {
    addToBasket(item);
    this.takePicture();
    this.setState({});
  }

  render() {
    const { navigation } = this.props;
    const { products } = this.state;
    console.log('-->', navigation);
    const { name } = navigation.state.params;

    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => { this.camera = cam; }}
          type={Camera.Constants.Type.front}
          playSoundOnCapture={false}
        >
          <Text />
        </Camera>
        <Header title={name} onBackButtonPress={() => navigation.goBack()} onBasketPress={() => navigation.navigate('Order')} />
        <View style={styles.content}>
          <FlatList
            data={products}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <ListItem
                key={item.id}
                item={item}
                onAddPress={() => this.addItem(item)}
              />
            )}
          />
        </View>
      </View>
    );
  }
}
