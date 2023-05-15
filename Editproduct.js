import { View ,Text,TextInput,ImageBackground,StyleSheet,ScrollView,ToastAndroid,Modal,Pressable} from "react-native";
// import Axios from 'axios'
import React, { useEffect, useState } from 'react';
import Btn from './Btn';
import { darkGreen, green,black,red } from './Constants';
import Axios from 'axios';
import wood2 from './wood4.jpg'
import { app_url } from './Ipaddress';
import {  DataTable ,Button, Divider} from 'react-native-paper';
import { Checkbox,RadioButton } from 'react-native-paper';






export default function Editproduct({route}){

    const {loginuser} = route.params

    const [search_product , setProduct] = useState('')
    const [editproduct,setEditproduct] = useState([])
    const [editok,seteditok] = useState(false)
    const [visibile,setVisisble] = useState(false)
    const [qty,setqty] = useState('')
    const [qtyerror,setqtyerror] = useState('')
    const [amount,setAmount] = useState('')
    const [amounterr,setamounterr] = useState('')
    const [checked,setChecked] = useState('')
    const [loginuser_1,setloginuser] = useState([])



useEffect(()=>{
    setloginuser(loginuser)
  const url = `${app_url}/confromProduct/${search_product}`
    Axios.post(url).then((response)=>{
      const product = response?.data?.results

      if(product.length>=1){
        setEditproduct(product)
        setVisisble(false)
      }else{
        setVisisble(false)
      }
    })
},[visibile])
    const product_edit = (e)=>{
        console.log('eee',e)
        const id = e
        if(id!==''){
            setProduct(e)
        }else{
            // console.log('exit')
        }
    }

    const handlesearch_product = ()=>{
        console.log('enter',loginuser_1)

        if(search_product!==''){
            const url = `${app_url}/updateproduct`
            Axios.post(url,{
                search_product:search_product,
                loginuser_1:loginuser_1
            }).then((response)=>{
                // console.log('response',response?.data?.results)
                const product = response?.data?.results

                if(product.length>=1){
                    setEditproduct(product)
                    seteditok(true)
                }else{
                    ToastAndroid.showWithGravityAndOffset(
                        "Product does not exit ",
                        ToastAndroid.LONG,
                        ToastAndroid.TOP,
                        25,
                        50
                      );
                    seteditok(false)

                }
            }).catch(erroor=>console.log('errrr',erroor))

        }else{

        }
    }

    const styles = StyleSheet.create({

        input:{
            backgroundColor:'white',textAlign:'center'  ,color:'black',width:300,borderRadius:30,borderColor:'black',borderWidth:2,borderStartColor:'red',marginTop:150
        },
        input1:{
            backgroundColor:'white',textAlign:'center'  ,color:'black',width:300,borderRadius:30,borderColor:'black',borderWidth:2,borderStartColor:'red',padding:5,marginTop:10
        },
        image:{
            height:850,
        },
        container: {
            padding: 5,
            borderColor:'black',
            marginBottom:10,
            borderWidth: 1,
            color:'white',
            backgroundColor:'white'
        
          },
          tableHeader: {
            backgroundColor: '#DCDCDC',
            border:'1'
          },
          centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 22,
          },
          modalView: {
            margin: 20,
            backgroundColor: 'lightyellow',
            borderRadius: 20,
            padding: 35,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          },
          button: {
            borderRadius: 20,
            padding: 10,
            elevation: 2,
          },
          buttonOpen: {
            backgroundColor: '#F194FF',
          },
          buttonClose: {
            backgroundColor: '#2196F3',
          },
          textStyle: {
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
          },
          modalText: {
            marginBottom: 15,
            textAlign: 'center',
          },
          header:{
            backgroundColor:'lightyellow',
            color:'white',
            flex: 5,
            flexWrap: 'wrap',
            borderColor: 'yellow',
            borderWidth: 2,
            // backgroundColor:'brown       
                overflow: 'visible',
            fontSize:100,
            // fontStyle:''
            fontVariant:'bold'
          }
    })

    const openmodel =()=>{
        setVisisble(true)

    }
    const handleclose = ()=>{
        setVisisble(false)
    }


    const handleamount=(e)=>{

        const amount  = e
        if(amount==''){
            setamounterr('plz enter amount ')
        }else{
            setamounterr('')
            setAmount(amount)
        }

        console.log('e',e)

    }
    const handleqty=(e)=>{

        const qty = e

        if(qty==''){
            setqtyerror('plz enter correct qty')
        }else{
            setqty(qty)
            setqtyerror('')
        }

        console.log('e',e)

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

    const handleupdate=()=>{
        // console.log('eeeeee')

       const qty_s =  parseInt(editproduct[0].quantity)

       const qty_state = parseInt(qty)

       const total =parseInt( qty_state+qty_s)
       console.log('total',total)
       console.log('amount',amount)


    let product_type = (checked == 0) ? 'kg' : (checked == 1) ? "qty" : (checked == 2)?'litter':'ml';


    //    console.log('totot',editproduct[0].product_code)

       const formdata = []

       formdata.push({total:total,quantity:qty,product_code:editproduct[0].product_code,amount:amount,product_type:product_type})
       console.log('formdata',formdata)

       const url = `${app_url}/updateproduct_search`

       Axios.post(url,{
        formdata:formdata,
        loginuser:loginuser_1
       }).then((response)=>{
        // console.log('responsedta',response?.data?.results)
        const affected_rows = response?.data?.results?.affectedRows

        if(affected_rows==1){
            ToastAndroid.showWithGravityAndOffset(
                "Product Update sucess ",
                ToastAndroid.LONG,
                ToastAndroid.TOP,
                25,
                50
              );
        setVisisble(false)

        }else{
            ToastAndroid.showWithGravityAndOffset(
                "Plz try again ",
                ToastAndroid.LONG,
                ToastAndroid.TOP,
                25,
                50
              );
        }
       }).catch(err=>console.log('errrr',err))

    }

    console.log("editproduct",loginuser)
    return(
        <ImageBackground style={styles.image} source={wood2}>
        <View>
             <View style={{marginTop:50,marginLeft:50}}>
            <TextInput 
            style={styles.input}
            placeholder="Product code"
            onChangeText={product_edit}
            />
            <Btn bgColor={black} textColor='white' Press={handlesearch_product} btnLabel="Search Product"  />


            </View>
           
                {editok?
                <View>
               <DataTable.Header  style={{

                flexWrap: 'wrap-reverse',
                borderColor: 'black',
                borderWidth: 4,
                width:390,
                height:70,
                overflow: 'visible',
                marginVertical:4,

                // marginLeft:10,
                backgroundColor:'white',

                // padding: 10

                }}>
                <DataTable.Title style={{marginVertical:2,flexDirection:'row'}}>
                    Product code
                </DataTable.Title>
                <DataTable.Title>product title</DataTable.Title>
                <DataTable.Title>amount</DataTable.Title>
                <DataTable.Title>ava qty</DataTable.Title>
                <DataTable.Title>Edit</DataTable.Title>

                {/* <DataTable.Title>qty</DataTable.Title>
                <DataTable.Title>Total</DataTable.Title> */}
               </DataTable.Header>

{
               editproduct?.map((data,index)=>{
            return(
<DataTable  style={{
borderColor: 'green',
borderWidth: 2,
width:390,
overflow: 'visible',
backgroundColor:'white',
fontSize: 50, fontWeight: 'bold',
padding: 10
}}>
{/* <ScrollView > */}
<DataTable.Row key={data}>
<DataTable.Cell>{data.product_code}</DataTable.Cell>
<DataTable.Cell>{data.product_title}</DataTable.Cell>
<DataTable.Cell>{data.amount}</DataTable.Cell>
<DataTable.Cell>{data.quantity}</DataTable.Cell>
{/* <DataTable.Cell  style={{flex: 1}}><TextInput style={{backgroundColor:'white',width:55}} /></DataTable.Cell> */}
     {/* <DataTable.Cell>{<Btn/>}</DataTable.Cell> */}
     <Button mode='contained' onPress={openmodel} >Edit</Button>


</DataTable.Row>
{/* </ScrollView> */}


</DataTable>
          )
        })
    }
                    </View>

                    
                :''}
                
                <View>
                <Modal
        animationType="slide"
        transparent={true}
        visible={visibile}
       >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Edit Product</Text>
            
            <View >
                {/* <Text>Product Code</Text>
           <TextInput style={{backgroundColor:'lightyellow',borderRadius:30,borderColor:'black',borderWidth:2,borderStartColor:'red'}} value={editproduct[0].product_code}/> */}
 <TextInput 
            style={styles.input1}
            value={editproduct[0]?.product_code}
            placeholder="Product code"
            multiline
            // onChangeText={handleamount}
            editable={false}
            />
             <TextInput 
            style={styles.input1}
            value={editproduct[0]?.product_title}
            placeholder="Product Title"
            multiline
            editable={false}

            // onChangeText={handleamount}
            
            />
           <TextInput 
            style={styles.input1}
            // value={editproduct[0]?.product_title}
            placeholder="Product amount"
            multiline
            // editable={false}
            numeric
            keyboardType={'numeric'}
            onChangeText={handleamount}
            
            />
            <View style={{paddingTop:10}} >
            <Text style={{color:'black',textAlign:'center',fontSize:15,fontWeight:'800'}} >Old Amount: {editproduct[0]?.amount}</Text>

            </View>
            <View>
                <Text style={{color:'red'}}>
                    {amounterr}
                </Text>
            </View>
            <TextInput 
            style={styles.input1}
            // value={editproduct[0]?.product_title}
            placeholder="Product Quantity"
            multiline
            // editable={false}
            numeric
            keyboardType={'numeric'}
            onChangeText={handleqty}
            
            />
               <View style={{paddingTop:10}} >
            <Text style={{color:'black',textAlign:'center',fontSize:15,fontWeight:'800'}} >Available qty: {editproduct[0]?.quantity}{editproduct[0]?.product_type}</Text>

            </View>
             <View>
                <Text style={{color:'red'}}>
                    {qtyerror}
                </Text>
            </View>




         
        </View>
        <RadioButton.Group onValueChange={handlecheckbox} >
      <View style={{alignItems:'center',backgroundColor:'lightyellow',width:150}}>
        <Text>Kg</Text>
        <RadioButton status={checked==0?'checked':'unchecked'} value='KG' />
      </View>
      <View style={{alignItems:'center',backgroundColor:'lightyellow',width:150}}>
        <Text>qty</Text>
        <RadioButton  status={checked==1?'checked':'unchecked'} value='QTY' />
      </View>
      <View style={{alignItems:'center',backgroundColor:'lightyellow',width:1500}}>
        <Text>litter</Text>
        <RadioButton  status={checked==2?'checked':'unchecked'} value='Liter' />
      </View>
      <View style={{alignItems:'center',backgroundColor:'lightyellow',width:150}}>
        <Text>ML</Text>
        <RadioButton  status={checked==3?'checked':'unchecked'} value='ML' />
      </View>
    </RadioButton.Group>
        
        <View style={{paddingTop:10,width:200}}>
     <Button mode='contained' disabled={(amounterr!==''||qtyerror!=='')||(amount==''||qty=='')} onPress={handleupdate} style={{backgroundColor:'black'}} ><Text style={{color:'white'}}>Update</Text></Button>

     </View>
     <View style={{padding:10,display:"flex",width:200}}>
     <Button mode='contained' onPress={handleclose} >Cancel</Button>
     </View>
          </View>
        </View>
      </Modal>
                </View>
           

        </View>
        </ImageBackground>
    )
}