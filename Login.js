import React, { useState,useEffect } from 'react';
import {View, Text, Touchable, TouchableOpacity,Button,ImageBackground} from 'react-native';
// import Background from './Background';
import Btn from './Btn';
import {black, darkGreen, green} from './Constants';
// import Field from './Field';
import {TextInput} from 'react-native';
import Axios from 'axios';
import {app_url} from './Ipaddress';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import wood2 from './wood2.png'
// import Navbar from './Navbar';
// import Ionicons from '@expo/vector-icons/Ionicons';




const Login = ({navigation}) => {

    const [name,setname] = useState('')
    const [emailError,setEmailerror] = useState('')
    const [Email,setEmail]= useState('')
    const [passworderror,setPassworderror] = useState('')
    const [password,setPassword] = useState('')
    const [loginuser,setloginuser] = useState([])


    const handlepassword =(e)=>{

      const password = e

      if(password!==''){
          // console.log('enter')
      setPassword(password)
      setPassworderror('')

      }else{
          // console.log('enterelse')
          setPassworderror('plz enter password')
      }


    }



    const handleEmail=(e)=>{
        // console.log('e',e.target.value)
        // console.log('text',e)

        const email_id = e

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


 if(reg.test(email_id) === false)
{
   
  setEmailerror('plz enter valid email')
  return false;

}
else
{
  // seterror[{email_error:"nvalid email address!"}]
  setEmail(email_id)
  setEmailerror('')

  console.log("error")
}
    }

    useEffect(()=>{
  handlesubmit()
},[])


    

    const handlesubmit = async()=>{
      // console.log('enter')
      // if(Email == ''|| password==''){
      //   alert('plzenter')
      // }else{
        

        
      // }
      const url = 'http://192.168.29.169:7001/login'

      const app_url_1 = 'http://192.168.0.104:7001/login'
      // console.log('apppp',url)

      // Axios.post(url,{
        
      // }).catch(error=>console.log('error',error))

     await Axios.post(`${app_url}/login/${Email}/${password}`,{
      Email:Email,
      password:password
     }).then((response)=>{
      // console.log('response',response?.data?.results)
      const user_data = response?.data?.results
      // console.log('user',user_data[0].user_typeid)

      const userId = response?.data?.results[0]?.user_typeid
      // console.log('userid',userId==undefined)

      
      
        setEmail('')
        setPassword('')
     
        // navigation.replace('Home');
        // navigation.replace('Home')
        // navigation.navigate('Home')
        if(userId == 1){
          navigation.navigate('add_product',{
            loginuser:loginuser
          })
          setloginuser(user_data)
          // AsyncStorage.setItem('user', 'Login')

        }else if(userId == 2){
          navigation.navigate('barcode',{
            loginuser:loginuser
          })
          setloginuser(user_data)

        }else{
        alert('user not found')
        console.log('enrtrtrtrtrtrt140')

        }
        // localStorage.setItem('')
        

      
     }).catch(error=>console.log('login',error))

    //   Axios.post(`http://localhost:7001/login`,{
    //   Email:Email,
    //   password:password
      
    // })
    }
// console.log('name',password)

// console.log('app_url',loginuser)

  return (
    <ImageBackground source={wood2}>
      <View style={{alignItems: 'center', width: 460}}>
        <Text
          style={{
            color: 'lightyellow',
            fontSize: 64,
            fontWeight: 'bold',
            marginVertical: 20,
          }}>
          Login
        </Text>
        <View
          style={{
            backgroundColor: 'lightyellow',
            height: 800,
            width: 460,
            borderTopLeftRadius: 250,
            paddingTop: 100,
            alignItems: 'center',
            marginRight:30
          }}>
          <Text style={{fontSize: 40, color: darkGreen, fontWeight: 'bold'}}>
            Welcome Back
          </Text>
          <Text
            style={{
              color: 'grey',
              fontSize: 19,
              fontWeight: 'bold',
              marginBottom: 20,
            }}>
            Login to your account
          </Text>
          <TextInput
            placeholder="Email "
            keyboardType={'email-address'}
            style={{backgroundColor:'white',textAlign:'center'  ,color:'black',width:300,borderRadius:30,borderColor:'black',borderWidth:2,borderStartColor:'red'}}

            // onChangeText={text => onChange({ name, type, text })}
            // onBlur={(text)=>handleEmail(text)}
            onChangeText={handleEmail}
            
          />
          <Text style={{color:'red'}}>
            {emailError}
          </Text>
          <TextInput placeholder="Password" 
                style={{backgroundColor:'white',textAlign:'center'  ,color:'black',width:300,borderRadius:30,borderColor:'black',borderWidth:2,borderStartColor:'red'}}
          
          onChangeText={handlepassword}  secureTextEntry={true} />
          <Text style={{color:'red'}}>
            {passworderror}
          </Text>
          {/* <View
            style={{alignItems: 'flex-end', width: '78%', paddingRight: 16, marginBottom: 200}}>
            <Text style={{color: darkGreen, fontWeight: 'bold', fontSize: 16}}>
              Forgot Password ?
            </Text>
          </View> */}
          {/* <Button>Sigin in </Button> */}

          <Btn textColor='white'  bgColor={(emailError!==''||passworderror!=='')||(Email==''||password=='')?green:black} btnLabel="Login"  disabled={(emailError!==''||passworderror!=='')||(Email==''||password=='')} Press={handlesubmit} />
          <View style={{ display: 'flex', flexDirection :'row', justifyContent: "center" }}>
            <Text style={{ fontSize: 16, fontWeight:"bold" }}>Don't have an account ? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>Signup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Login;