import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './Home';
import Signup from './Signup';
import Login from './Login';
import Add_product from './Add_product';
import View_product from './View_product';
import Barcode from './Barcode';
import Editproduct from './Editproduct';
import SearchBill from './SearchBill';
import ShowallProduct from './ShowallProduct';
// import Logout from './Logout';



const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name = 'add_product' component={Add_product}/>
      <Stack.Screen name = 'view_product' component={View_product}/>
      <Stack.Screen name = 'barcode' component={Barcode}/>
      <Stack.Screen name = 'edit_product' component={Editproduct}/>
      <Stack.Screen name = 'searchbill' component={SearchBill}/>
      <Stack.Screen name = 'showall' component={ShowallProduct}/>

      {/* <Stack.Screen name = 'barcode' component={Barcode}/>
      <Stack.Screen name = 'logout'   component={Logout}/> */}

    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
