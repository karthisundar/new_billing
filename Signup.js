import React, { useEffect, useState } from 'react';
import {View, Text, Touchable, TouchableOpacity,TextInput,CheckBox,StyleSheet, ImageBackground} from 'react-native';
// import Background from './Background';
import Btn from './Btn';
import {darkGreen} from './Constants';
import Axios from 'axios'
// import { render } from 'react-dom'; 
// import Checkbox from 'expo-checkbox';
// import DropDownPicker from "react-native-dropdown-picker";
import { Checkbox,RadioButton } from 'react-native-paper';
// import Checkbox from './Checkbox'
import wood2 from './wood2.png'
import { app_url } from './Ipaddress';

const Signup = props => {

    const[firstname,setfirstname] = useState('')
    const [fistnameerror,setfirstnameerror] = useState('')
    const[lastname,setlastname] = useState('')
    const [lastnameError,setlastnameerror] = useState('')
    const [Email,setEmail] = useState('')
    const[Emailerror,setEmailerror] = useState('')
    const [mobilenumber,setmobilenumber] = useState('')
    const [mobileerror,setmobileerror] = useState('')
    const [password,setPassword] = useState('')
    const [passworderror,setpassworderror] = useState('')
    const [formdata,setFormdata] = useState([])
    const [checked,setChecked] = useState('')

    const handlefirstname=(e)=>{
      console.log('e',e)
      if(e!==''){
        setfirstname(e)
        setfirstnameerror('')

      }else{
        setfirstnameerror('plz enter firstname')
      }

    }

    const hanldelastname = (e)=>{
      console.log('e',e)

      if(e!==''){
        // console.log('ok')
        setlastname(e)
        setlastnameerror('')
      }else{
        // console.log('illa')
        setlastnameerror('plz enter last name ')
      }

    }
    // useEffect((e)=>{
    //   handleEmail() 
    //  })

    const handleEmail = async (e)=>{

      const email_id = e

      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      const url = 'http://192.168.0.104:7001/checkemail'

      

    // await  Axios.post(url,{
    //     email:email_id
    //   }).then((response)=>{
    //     // console.log('response',response?.data?.results)
    //   })

     

     if(reg.test(email_id) === false)
      {
        console.log("enterere")
 
      setEmailerror('plz enter valid email')
    // return false;

    } 
    else
      {
       
  
// seterror[{email_error:"nvalid email address!"}]
    setEmail(email_id)
    setEmailerror('')

    console.log("error")
    await Axios.post(`${app_url}/checkemail`,{
      email_id
      }).then((response)=>{
        console.log('console',response?.data?.results.length)
        const result = response?.data?.results.length
        if(result == 1){
          setEmailerror('email allready exit')
        }else{
          setEmailerror('')
        }
      })
      }

    }

   

    const handlemobile = (e)=>{
      // console.log('e',e.length)

      if(e.length<=10){
        setmobileerror('')
        setmobilenumber(e)
      }else{
        setmobileerror('plz enter correct mobile number')
      }

    }

    const handlepassword = (e)=>{

      const password_reg=   new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
    if (password_reg.test(e)===false) {
      console.log("enterif")
      setpassworderror('error in password plz fill strong password ')
      return false;
    } else {
      setPassword(e)
      console.log("enterelse")

      setpassworderror('')
      // setPaswword(password)
    }

    }

    const handlesubmit = ()=>{
      // console.log('enter')
      let userType = checked == 0 ? 1:2
      console.log('checked',userType)
     let from_data = []
     const email_id = Email.toString()
     console.log('email_id',typeof(email_id))
     from_data.push({firstname:firstname,lastname:lastname,Email:email_id,mobilenumber:mobilenumber,password:password,userType:userType})

     const url = `${app_url}/signup`

     Axios.post(`${app_url}/signup`,{
      formdata:from_data
     }).then((response)=>{
      const reponse_data = response?.data?.message
      console.log('rererererer',response?.data?.message)
      if(reponse_data =='sucess'){
        props.navigation.navigate('Login')
      }else{
        alert('error')
      }
     }).catch(error=>console.log('error',error))
    }
    
const style = StyleSheet.create({
  container:{
    justifyContent:'center',
    alignItems:'center'
  },
  checkbox:{
    width:25,
    height:25,
    borderWidth:2,
    borderColor:'ryan',
  },
  options:{
    flexDirection:'row',
    marginVertical:10,
  },
  option_name:{
    fontSize:16
  },
  input:{
    backgroundColor:'white',textAlign:'center'  ,color:'black',width:300,borderRadius:30,borderColor:'green',borderWidth:2,borderStartColor:'red'
  }
})

const handlecheckbox =(e)=>{
      console.log('e',e)

      if(e=='admin'){
        console.log('enter')
        setChecked(0)
      }else{
        setChecked(1)

      }
}
    // const options = ['Admin',"Billing"]
    // console.log('eeee',options.map(d=>d))
  return (
    <ImageBackground source={wood2}>
      <View style={{alignItems: 'center', width: 460}}>
        <Text
          style={{
            color: 'white',
            fontSize: 64,
            fontWeight: 'bold',
            marginTop: 20,
          }}>
          Register
        </Text>
        <Text
          style={{
            color: 'white',
            fontSize: 19,
            fontWeight: 'bold',
            marginBottom: 20,
          }}>
          Create a new account
        </Text>
        <View
          style={{
            backgroundColor: 'white',
            height: 700,
            width: 460,
            borderTopLeftRadius: 130,
            paddingTop: 50,
            alignItems: 'center',
          }}>
          <TextInput style={style.input} placeholder="First Name" onChangeText={handlefirstname}/>
          <Text style={{color:'red'}}>{fistnameerror}</Text>
          <TextInput style={style.input} placeholder="Last Name" onChangeText={hanldelastname} />
          <Text style={{color:'red'}}>{lastnameError}</Text>

          <TextInput
            placeholder="Email "
            keyboardType={'email-address'}
            onChangeText={handleEmail}
            style={style.input}
          />
          <Text style={{color:'red'}}>{Emailerror}</Text>

          <TextInput placeholder="Contact Number" style={style.input}   placeholderTextColor="#60605e"
          numeric
          keyboardType={'numeric'} maxLength={10} onChangeText={handlemobile}/>
          <Text style={{color:'red'}}>{mobileerror}</Text>

          <TextInput placeholder="Password" style={style.input} secureTextEntry={true} onChangeText={handlepassword} />
          <Text style={{color:'red'}}>{passworderror}</Text>

         

          {/* <TextInput placeholder="Confirm Password" secureTextEntry={true} /> */}
          

         
                {/* <input type='checkbox' name='admin'/> */}
                {/* <CheckBox
                  // value={'item.isChecked'}
                 
                /> */}
            {/* <View style={style.container}>
                {

                  options.map(option=>{
                    return(
                    <View key={option} style={style.options}>
                      <TouchableOpacity style={style.checkbox}>
                     <Text style={style.option_name} >Name: {option} </Text>   
                      </TouchableOpacity>

                      </View>
                      )
                  })
                }
                </View> */}

               

              {/* {
                options.map((d)=>{
                  return(
                    <View key={d}>
                        <Text>{d}</Text>
                      </View>
                  )
                })
              } */}
              <RadioButton.Group onValueChange={handlecheckbox} >
      <View>
        <Text>Admin</Text>
        <RadioButton status={checked==0?'checked':'unchecked'} value='admin' />
      </View>
      <View>
        <Text>Billing</Text>
        <RadioButton  status={checked==1?'checked':'unchecked'} value='bill' />
      </View>
    </RadioButton.Group>

            {/* <Checkbox.Item status={checked} label="Admin"  onPress={(e)=>handlecheckbox("admin")} />
            <Checkbox.Item label="Bill" onPress={(e)=>handlecheckbox("billing ")} /> */}


            {/* <Checkbox  label='Admin' />
            <Checkbox status={'checked'} onPress={()=>handlecheckbox()} label='Bill' /> */}


          <Btn
            textColor="white"
            bgColor={darkGreen}
            btnLabel="Signup"
            Press={
              handlesubmit
              // alert('Accoutn created');
              // props.navigation.navigate('Login');
            }
            disabled={(Emailerror!==''||lastnameError!==''||fistnameerror!==''||mobileerror!==''||passworderror!=='')
          ||(Email ==''||password==''||mobilenumber==''||firstname==''||lastname=='')
          }
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
              Already have an account ?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Login')}>
              <Text
                style={{color: darkGreen, fontWeight: 'bold', fontSize: 16}}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Signup;