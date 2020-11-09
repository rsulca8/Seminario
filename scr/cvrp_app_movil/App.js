import 'react-native-gesture-handler';
import * as React from 'react';
import {View, Text, StyleSheet, Image, Button, Alert, ImageBackground, 
  TouchableOpacity, TextInput, ScrollView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from './src/SignInScreen'
import UserProfile from './src/UserProfile'
import Loading from './src/SplashScreen'
import {AsyncStorage} from '@react-native-async-storage/async-storage'



export const AuthContext = React.createContext();
var Stack = createStackNavigator();
function CVRP(){
  
  const estadoInicial = {
    isLoading: true,
    isSignout: false,
    userToken: null,
  }

  const reducer = (prevState, action) => {
    console.log(prevState)
    switch (action.type) {
      case 'RESTORE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'SIGN_IN':
        return {
          ...prevState,
          isSignout: false,
          userToken: action.token,
        };
      case 'SIGN_OUT':
        return {
          ...prevState,
          isSignout: true,
          userToken: null,
        };
    }

  }

  const [state, dispatch] = React.useReducer(reducer, estadoInicial)

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        console.log("logeando")
        setTimeout(async () => { "cargando..." }, 2000)
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    //Define un método ásincrono para el loading
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
        console.log("Algo anduvo mal :(")
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);


  
  
  return (
    <NavigationContainer>
      <AuthContext.Provider value={authContext}>
        <Stack.Navigator>
          {state.userToken == null ? (
            <Stack.Screen name="SignIn" component={SignInScreen} />
          ) : (
            <Stack.Screen name="UserProfile" component={UserProfile} />
          )}
        </Stack.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
  );
}

  export default CVRP