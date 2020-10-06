import { createAppContainer, createSwitchNavigator } from "react-navigation";

import { createStackNavigator } from "react-navigation-stack";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import SearchCard from "./pages/SearchCard";
import CreateCard from "./pages/CreateCard";
import RandomCard from "./pages/RandomCard";
import Card from "./pages/Card";
import MyCards from "./pages/MyCards";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Howto from "./pages/Howtoplay";

const App = createStackNavigator(
  {
    Dashboard,
    Settings,
    SearchCard,
    CreateCard,
    RandomCard: {
      screen: RandomCard,
      navigationOptions: {
        mode: "modal",
        gestureEnabled: false,
      },
    },
    Contact,
    About,
    Howto,
    Card: {
      screen: Card,
      navigationOptions: {
        mode: "modal",
        gestureEnabled: false,
      },
    },
    MyCards,
  },
  {
    headerMode: "none",
  }
);

const Routes = createAppContainer(
  createSwitchNavigator({
    //Login,
    //Register,
    App,
  })
);

export default Routes;
