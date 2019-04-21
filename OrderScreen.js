import React, { Component } from 'react';
import { Permissions, Camera } from 'expo';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Header from './Header';
import {
  addFace, addToBasket, clearBasket, getBasketItems, getBasketState, getFaces, clearFaces, getTable,
  removeOneFromBasket,
} from './Database';
import { createFace, getBioID } from './FaceServer';
import { sendOrder } from './ScalaServer';

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
    paddingBottom: 104,
    paddingLeft: 0,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 110,
    paddingTop: 15,
    paddingRight: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    marginBottom: 0,
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
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 24,
    paddingBottom: 0,
  },
  itemContent: {
    width: '95%',
    flexWrap: 'nowrap',
    fontSize: 16,
    lineHeight: 16,
    marginTop: 10,
  },
});

class ListItem extends Component {
  render() {
    const {
      name, price, count, description,
    } = this.props.item;

    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemInfo}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.itemName}>
              {name}
              {' '}
              <Text style={{ fontSize: 17, color: 'orangered' }}>
(x
                {count}
)
              </Text>
            </Text>
            <Text style={{
              flex: 0.40, fontSize: 24, lineHeight: 24, alignContent: 'center', justifyContent: 'center', alignSelf: 'flex-end',
            }}
            >
              {price * count}
              {' '}
₺
            </Text>
          </View>
          <Text style={styles.itemContent}>{description}</Text>
        </View>
        <View style={{
          flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center', width: 40,
        }}
        >
          <TouchableOpacity
            onPress={this.props.onAddButton}
            style={{
              width: 25,
              height: 25,
              marginBottom: 10,
            }}
          >
            <Image
              style={{
                width: 25,
                height: 25,
              }}
              source={require('./images/round_plus.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.props.onDecButton}
            style={{
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              width: 25,
              height: 25,
              backgroundColor: 'white',
              borderWidth: 1,
              borderColor: 'lightblue',
              borderRadius: 50,
            }}
          >
            <Image
              style={{
                width: 25,
                height: 25,
              }}
              source={require('./images/round_minus.png')}
            />
          </TouchableOpacity>

        </View>
      </View>
    );
  }
}

export default class OrderScreen extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = { items: getBasketItems() };
  }

  async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA);
  }

  takePicture() {
    const options = { quality: 0.5, autoFocus: false, skipProcessing: true };

    this.camera.takePictureAsync(options)
      .then(data => createFace(data.uri))
      .then((result) => {
        result.faces.forEach(face => addFace(face));
        console.log(getFaces());
      })
      .finally(() => console.log('Finally!'))
      .catch(err => console.log('Error???', err));
  }


  sendOrder() {
    const { navigation } = this.props;

    getBioID(getFaces())
      .then(({ person }) => {
        clearFaces();
        return sendOrder(getBasketItems(), person, getTable());
      })
      .then((result) => {
        console.log('order reuslt:', result);
        clearBasket();
        this.setState({});
        navigation.navigate('Completed');
      });
  }

  addItem(item) {
    addToBasket(item);
    this.takePicture();
    this.setState({ items: getBasketItems() });
  }

  decItem(item) {
    removeOneFromBasket(item);
    this.takePicture();
    this.setState({ items: getBasketItems() });
  }

  render() {
    const { navigation } = this.props;
    const { items } = this.state;

    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => { this.camera = cam; }}
          type={Camera.Constants.Type.front}
          playSoundOnCapture={false}
        >
          <Text />
        </Camera>
        <Header title="Sipariş" onBackButtonPress={() => navigation.goBack()} onBasketPress={() => console.log(':)')} />
        <View style={styles.content}>
          <FlatList
            data={items}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <ListItem
                item={item}
                onAddButton={() => this.addItem(item)}
                onDecButton={() => this.decItem(item)}
              />
            )}
          />
          <View
            style={{
              position: 'absolute',
              width: '100%',
              right: 0,
              bottom: 0,
              backgroundColor: 'limegreen',
            }}
          >
            <Text style={{
              alignSelf: 'center', color: 'white', fontSize: 22, padding: 7,
            }}
            >
Toplam:
              {getBasketState().price}
              {' '}
₺
            </Text>
            <TouchableOpacity
              onPress={() => this.sendOrder()}
              style={{
                backgroundColor: '#2196F3',
                width: '100%',
                padding: 10,
              }}
            >
              <Text style={{
                color: 'white', fontSize: 30, fontWeight: 'bold', alignSelf: 'center',
              }}
              >
Siparişi Tamamla
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
