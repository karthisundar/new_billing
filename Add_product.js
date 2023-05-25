import {View, Text, Touchable, TouchableOpacity, TextInput,ImageBackground,StyleSheet,ScrollView} from 'react-native';
// import{Button,Checkbox,Form,Input }  from 'antd';

import React, { useEffect, useState } from 'react';
import Btn from './Btn';
import { darkGreen, green,black,red,lightgreen,glod } from './Constants';
import Axios from 'axios';
import wood2 from './wood2.png';
import wood5 from './wood6.jpg';
import wood4 from './wood4.jpg'
import { app_url } from './Ipaddress';
// import Logout from './Logout';
import { Checkbox,RadioButton } from 'react-native-paper';




const Add_product = ({route,navigation})=>{
    const {loginuser} = route.params


    const [product_code,setProductcode] = useState('')
    const [product_codeerror,setProducterror] = useState('')
    const [product_qty,setproductqty] = useState('')
    const [productqtyerror,setproductqtyerror] = useState('')
    const [product_title,setproduct_title] = useState('')
    const [titleError,settitleerror] = useState('')
    const [amount,setAmount] = useState('')
    const [amount_error,setAmountError] = useState('')
    const [search_product , setProduct] = useState('')
    const [editproduct,setEditproduct] = useState([])
    const [checked,setChecked] = useState('')
    const [userdetail,setuser] = useState([])
    

    useEffect((e)=>{
        setuser(loginuser)
    })

    const handleproductcode =(e)=>{
            const product = e
        // console.log('ee',e)
        if(product!==''){
            // console.log('enter')
            setProductcode(product)
            setProducterror('')
        }else{
            // console.log('else')
            setProducterror('plz enter code')
            setProductcode('')


        }
    }

const handleqty = (e)=>{
  const  qty = e
    if(qty!==''){
        // console.log('enter')
        setproductqty(qty)
        setproductqtyerror('')
    }else{
        // console.log('else')
        setproductqtyerror('plz enter code')
        setproductqty('')

    }
}

const handletitle =(e)=>{
    const title = e
    if(title!==''){
        // console.log('enter')
        setproduct_title(title)
        settitleerror('')
    }else{
        // console.log('else')
        settitleerror('plz enter code')

    }

}

const handleamount = (e)=>{
    const amount  = e

    if(amount !==''){
        setAmount(amount)
        setAmountError('')

    }else{
        setAmountError('plz enter amount')
        setAmount('')
    }

}


const handlesubmit=()=>{

        const count = 1
        console.log("counttttt",count+1)
    // let product_type = checked == 0 ? 'kg':"qty"

    let product_type = (checked == 0) ? 'kg' : (checked == 1) ? "qty" : (checked == 2)?'litter':'ml';

    // console.log('producrrrrrrrrr',loginuser[0].firstname)

    const firstname = loginuser[0]?.firstname
    const email = loginuser[0]?.email
    const mobile = loginuser[0]?.mobile != null ? loginuser[0]?.mobile:'9876543210'


    


   

    const url = `${app_url}/product/${product_code}/${product_title}/${product_qty}/${amount}/${product_type}/${firstname}/${email}/${mobile}`

    Axios.post(url).then((res)=>{
        // console.log('response',res?.data.results?.affectedRows)

       const affectedRows = res?.data.results?.affectedRows

       const message = res?.data?.message

       console.log('res',res)


      

       if( message=='super'){
        alert('ok saved')
       }else{
        alert('did not saved ')
       }
    }).catch(error=>console.log('error',error))
    setAmount('')
    setProductcode('')
    setproduct_title('')
    setproductqty('')
    // localStorage.setItem('email','login')

}

const ViewProduct =()=>{

    navigation.navigate('view_product',{
        loginuser:loginuser
    })

}

const handlesearchBill =()=>{
    navigation.navigate('searchbill',{
        loginuser:loginuser
    })

}

// useEffect(() => {
//     let isAuth = localStorage.getItem("ecommerce")=="Email";
//     if(isAuth  !== null) {
//         navigation.navigate("/Add_product");
//     }
// }, []);
// console.log('title',titleError)

const styles = StyleSheet.create({

    input:{
        backgroundColor:'white',textAlign:'center'  ,color:'black',width:300,borderRadius:30,borderColor:'black',borderWidth:2,borderStartColor:'red',height:35
    }
})

const clear = ()=>{
    setAmount('')
    setProductcode('')
    setproduct_title('')
    setproductqty('')
    setAmount('')
}

        

        const handlesearch_product = ()=>{
            console.log('enter',search_product)
    navigation.navigate('edit_product',{
        loginuser:loginuser
    })


            
        }

          const handlelogout =()=>{
            navigation.navigate('Login')
        }

        const handlecheckbox =(e)=>{
                console.log('e0',e)
                if(e=='KG'){
                    console.log('enter')
                    setChecked(0)
                  }else if(e=='QTY'){
                    setChecked(1)
            
                  }else if(e=='Liter'){
                    setChecked(2)
                  }else{
                    setChecked(3)

                  }
        }

        const handle_product = ()=>{
            
            const url = `${app_url}/checkproduct/${product_code}`
            
            Axios.post(url).then((response)=>{
                console.log('response',response?.data?.results)

                const result = response?.data?.results

                if(result.length>=1){
                    setProducterror('all ready exit product plz change product code')
                }else{
                    setProducterror('')
                }
            })
        }

      const handleshowProduct =()=>{
        navigation.navigate('showall',{
            loginuser:loginuser
        })
      }

    return(

        <ImageBackground style={{height:870}} source={wood4}>
        <View style={{marginTop:100,marginLeft:50}}>
        <ScrollView>
                
            {/* <Text style={{color:black,padding:10,fontSize:30,fontWeight:800}}>Save Product</Text> */}
            <Text style={{fontWeight:'900',color:'green',fontSize:20,padding:5}}>Product Code</Text>
            <TextInput 
            style={styles.input}
            // ref={input => { product_code = input }}
            // clearButtonMode="always" 
            placeholderTextColor='green'
            value={product_code}
            placeholder="Product code"
            onChangeText={handleproductcode}
            onBlur={handle_product}
            />
            <Text style={{color:'red',fontWeight:'900'}}>
                {/* {product_codeerror} */}
            </Text>
            <Text style={{fontWeight:'900',color:'white',fontSize:20,padding:5}}>Product Quantity</Text>

             <TextInput 
            onChangeText={handleqty}
            style={styles.input}
            placeholder="product quantity"
            value={product_qty}
            // tyoe="number"
            />
              <Text style={{color:'red'}}>
                {productqtyerror}
            </Text>
            <Text style={{fontWeight:'900',color:'white',fontSize:20,padding:5}}>Product Title</Text>

            <TextInput 
            onChangeText={handletitle}
            style={styles.input}
            value={product_title}
            placeholder="Product Title"/>
            <Text  style={{color:'red'}}>
                {titleError}
            </Text>
            <Text style={{fontWeight:'900',color:'white',fontSize:20,padding:5}}>Product Amount</Text>
            
             <TextInput 
            style={styles.input}
            value={amount}
            placeholder="Product amount"
            multiline
            onChangeText={handleamount}
            
            />
             <Text  style={{color:'red'}}>
                {amount_error}
            </Text>


            <RadioButton.Group onValueChange={handlecheckbox} >
      <View style={{alignItems:'center',backgroundColor:'lightyellow',width:300}}>
        <Text>Kg</Text>
        <RadioButton status={checked==0?'checked':'unchecked'} value='KG' />
      </View>
      <View style={{alignItems:'center',backgroundColor:'lightyellow',width:300}}>
        <Text>qty</Text>
        <RadioButton  status={checked==1?'checked':'unchecked'} value='QTY' />
      </View>
      <View style={{alignItems:'center',backgroundColor:'lightyellow',width:300}}>
        <Text>litter</Text>
        <RadioButton  status={checked==2?'checked':'unchecked'} value='Liter' />
      </View>
      <View style={{alignItems:'center',backgroundColor:'lightyellow',width:300}}>
        <Text>ML</Text>
        <RadioButton  status={checked==3?'checked':'unchecked'} value='ML' />
      </View>
    </RadioButton.Group>

            {/* <button>Save</button> */}

            <Btn bgColor={(product_codeerror!==''||productqtyerror!==''||titleError!==''||amount_error!=='')||(product_code==''&&product_title==''&&product_qty==''&&amount=='')?green:black} textColor='white' disabled={(product_codeerror!==''||productqtyerror!==''||titleError!==''||amount_error!=='')||(product_code==''&&product_title==''&&product_qty==''&&amount=='')} btnLabel="Save Product" Press={handlesubmit} />
            {/* <Btn bgColor={green} textColor='white' Press={handleshowProduct} btnLabel="Show All Product"  /> */}

            <Btn bgColor={green} textColor='white' Press={handlesearchBill} btnLabel="Search Bill"  />

            <Btn bgColor={black} textColor='white' btnLabel="View Product" Press={ViewProduct} />          




            <Btn bgColor={black} textColor='white' Press={handlesearch_product} btnLabel="Edit Product"  />


           {/* <Logout/> */}
           <Btn bgColor='tomato' textColor='black' btnLabel="Clear" Press={clear} />

           <Btn btnLabel='Logout' bgColor='tomato' textColor='black' Press={handlelogout}/>
        </ScrollView>
            
        </View>
        </ImageBackground>

    )
}

export default Add_product