import React, {useEffect} from 'react'
//import { View , Text, StyleSheet, Image, Button} from 'react-native'
import AuthContext from "./AuthContext"
import API from "./API"
import Pedidos from './Pedido'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Productos from "./Productos"
import UserProfile from './UserProfile'
import { createStackNavigator } from '@react-navigation/stack';

const drawNavigator = createDrawerNavigator()
const stackPedido = createStackNavigator()
 
function Home(){
  return(
      <drawNavigator.Navigator>
        <drawNavigator.Screen name="UserProfile" component={UserProfile}/>
        <drawNavigator.Screen name="Productos" component={Productos}/>
      </drawNavigator.Navigator>
  )
}
//<stackPedido.Screen name="Pedidos" component={Pedidos}/>
export default Home
