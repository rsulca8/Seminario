import React, {Component} from 'react'
import {View, Text, StyleSheet, Image, Button, Alert, ImageBackground, TouchableOpacity, TextInput, ScrollView}
from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import getTheme from "./src/theme/components";
import variables from "./src/theme/variables/commonColor";
import { StyleProvider } from "native-base";
import * as Font from 'expo-font';
import { Container } from 'native-base';
import Login from './src/Login'
import CreateUser from './src/createUser'
import UserProfile from './src/UserProfile'
import AuthContext from './src/AuthContext'
import Home from "./src/Home"
import Pedido from './src/Pedido'

function App(){

  
  //Reducer son funciones que dado un estado previo y  
  //una acción y te devuelve un estado nuevo
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            userId: null,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userId: action.userId,
            userToken: action.token,
          };
          case 'SIGN_OUT':
            return {
            ...prevState,
            userId: action.userId,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      userId: null
    }
  );

  // El Hook de efecto te permite llevar a
  // cabo efectos secundarios en componentes funcionales:
  React.useEffect(() => {
    // Solicitar el token desde el almacenamiento interno e
    // ir a la pantalla correspondiente
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userData = await AsyncStorage.getItem('@authToken');
        userData = JSON.parse(userData);
      } catch (e) {
        console.log("Falló en obtener el token")
      }

      // Después de restaurar el token hay que validarlo :)
      loadFonts();
      dispatch({ type: 'RESTORE_TOKEN', token: userData.usuario, userId: userData.id});
    };

    bootstrapAsync();
  }, []);


  const loadFonts = async () => {
    await Font.loadAsync({
      Roboto: require("./node_modules/native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("./node_modules/native-base/Fonts/Roboto_medium.ttf")
    });
  }

  //Devuelve un valor memorizado.
  const authContext = React.useMemo(
    //Se ejecutan cualquiera de estas tres funciones según haga falta
    () => ({
      signIn: async (data) => {
        var userToken
        //Aquí hay que ver de enviar el token de acceso al servidor
        //para autenticar al usuario. Y luego almacenarlo localmente
        try {
          var userData = {
            usuario: data.usuario,
            id: data.id
          }
          console.log("ID: ", data)
          await AsyncStorage.setItem('@authToken', JSON.stringify(userData));
        }
        catch (e){
          console.log(e)
        }
        //await AsyncStorage.setItem('@user_data', data);
        dispatch({ type: 'SIGN_IN', token: userData.usuario, user_id: userData.id});
      },
      signOut: async () => {
        var userToken;
        try {
          userToken = await AsyncStorage.removeItem('@authToken');
        } catch(e) {
          console.log(e);
        }
        dispatch({ type: 'SIGN_OUT',  isSignout: true})
      },
      signUp: async data => {
        dispatch({ type: 'SIGN_IN', token: data.usuario, user_id: data.id_cliente});
      },
 
    }),
    []
  );

  const Stack = createStackNavigator();
  return(
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator   
          screenOptions={{
          headerShown: false
          }}
        >
        {state.userToken == null ? (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Home} />
          </>
          ) : (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Login" component={Login} />
          </>
        )}
        <Stack.Screen name="CreateUser" component={CreateUser} />
        <Stack.Screen name="Pedido" component={Pedido}/>

        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  )
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  }
})

export default App