import React from 'react';
import {View, StyleSheet, Text,TouchableOpacity,ImageBackground} from 'react-native';
import { Button } from 'react-native-paper';
// import Background from './Background';
// import Btn from './Btn';
// import { darkGreen, green } from './Constants';
import wood2 from './wood4.jpg'

const Home = (props) => {
  return (
    <ImageBackground style={{height:870}} source={wood2}>
      <View style={{ marginHorizontal: 40, marginVertical: 200 }}>
      <Text style={{ color: 'green', fontSize: 70 ,marginBottom:60,fontWeight:'800',textAlign:'center'}}>Welcome</Text>
      {/* <Text style={{ color: 'white', fontSize: 64, marginBottom: 40 }}>Coding</Text> */}
      <View style={{marginRight:-10,marginBottom:10}}>
      <Button labelStyle={{ color: "white", fontSize: 23 }} style={{backgroundColor:'black',textColor :'black',marginBottom:40,width:320}} onPress={()=>props.navigation.navigate("Login")}>Login</Button>
      <Button labelStyle={{ color: "black", fontSize: 20 }} style={{backgroundColor:'white',textColor :'black'}} onPress={()=>props.navigation.navigate("Signup")}>Signup</Button>
      </View>
      
      
      {/* <Btn bgColor={green} sat textColor='white' btnLabel="Login" Press={() => props.navigation.navigate("Login")} />
      <Btn bgColor='white' textColor={darkGreen} btnLabel="Signup" Press={() => props.navigation.navigate("Signup")} /> */}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({})

export default Home;