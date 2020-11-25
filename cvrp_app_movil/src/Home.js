import React, {useEffect} from 'react'
//import { View , Text, StyleSheet, Image, Button} from 'react-native'
import AuthContext from "./AuthContext"
import API from "./API"

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Productos from "./Productos"
import UserProfile from './UserProfile'

const tabNavigator = createBottomTabNavigator()

function Home(){
  return(
      <tabNavigator.Navigator>
        <tabNavigator.Screen name="UserProfile" component={UserProfile}/>
        <tabNavigator.Screen name="Productos" component={Productos}/>
      </tabNavigator.Navigator>
  )
}
export default Home
