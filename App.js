import { createStackNavigator, createAppContainer } from 'react-navigation';
import CategoryScreen from './HomeScreen';
import ItemListScreen from './ListScreen';
import OrderScreen from './OrderScreen';
import OrderCompleteScreen from './OrderCompleteScreen';

const App = createAppContainer(createStackNavigator(
  {
    Home: { screen: CategoryScreen, navigationOptions: { header: null } },
    Completed: { screen: OrderCompleteScreen, navigationOptions: { header: null } },
    Order: { screen: OrderScreen, navigationOptions: { header: null } },
    List: { screen: ItemListScreen, navigationOptions: { header: null } },
  },
));

export default App;
