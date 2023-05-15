import {View, Text, Touchable, TouchableOpacity, TextInput,ImageBackground,StyleSheet,ScrollView} from 'react-native';
import wood2 from './wood4.jpg'
import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { app_url } from './Ipaddress';
import {  DataTable ,Button} from 'react-native-paper';
import Btn from './Btn';
import * as Print from 'expo-print';



export default function ShowallProduct() {

    const [product,setProduct] = useState([])
    const styles = StyleSheet.create({
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
          backgroundColor: 'white',
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
      });


      const print = async () => {
   
        await Print.printAsync({
          html: createDynamicTable(),
          printerUrl: selectedPrinter?.url, // iOS only
        });
      
       
      };
      const createDynamicTable = () => {
        var table = "";
        // const orginalbill = billno==0?1:billno
    
        for (let i in product) {
          const item = orginal[i];
          table =
            table +
            `
            <tr>
              <td>${item.product_code}</td>
              <td>${item.product_title}</td>
              <td>${item.amount}  </td>
              <td>${item.net_qty}</td>
              <td>${item.count_new}</td>
            </tr>
            `;
        }
    
        console.log(table);
        const html = `
        <!DOCTYPE html>
        <html>
          <head>
          <style>
            table {
              font-family: arial, sans-serif;
              border-collapse: collapse;
              width: 100%;
            }
            
            td, th {
              border: 1px solid #dddddd;
              text-align: left;
              padding: 8px;
            }
            
            tr:nth-child(even) {
              background-color: #dddddd;
            }
            .head{
    text-align: left;
    margin-top:25px;
    
              
            }
            .cell{
              text-align: right;
            }
            .total{
            
            }
          </style>
          </head>
          <body>
          <div>
        
          <table>
            <tr>
              <th>Product code</th>
              <th>Product Title</th>
              <th>Amount</th>
              <th>Net qty </th>
              <th>Sub total </th>
            </tr>
            ${table}
          </table>
          
          
         
          
         
       
    
          </body>
        </html>
            `;
        return html;
      };

    useEffect(()=>{
        const url  = `${app_url}/showallproduct`
            Axios.post(url).then((response)=>{
                const result = response?.data?.results

                if(result.length){
                    setProduct(result)
                }else{
                    alert('plz add product')
                }
            })
    })
  return (
    <ImageBackground source={wood2} style={{height:870}}>
    <View style={{marginTop:50,justifyContent:'center'}}>
    <ScrollView >
    <DataTable.Header  style={styles.header}>
        <DataTable.Title>product code</DataTable.Title>
        <DataTable.Title>product title</DataTable.Title>
        <DataTable.Title>amount</DataTable.Title>
        <DataTable.Title>quantity</DataTable.Title>
        <DataTable.Title>Qr genarate</DataTable.Title>
        <DataTable.Title>Delete</DataTable.Title>



      </DataTable.Header>

            {
                product&&product?.map((d)=>{
                    return(
<DataTable style={styles.container}>
     
      <DataTable.Row key={d}>
        <DataTable.Cell >{d.product_code}</DataTable.Cell>
        <DataTable.Cell>{d.product_title}</DataTable.Cell>
        <DataTable.Cell>{d.amount}</DataTable.Cell>
        <DataTable.Cell>{d.quantity}</DataTable.Cell>
        {/* <Button mode='contained'  onPress={handleqr.bind(null,d.id)} >Genarate</Button> */}

        {/* <Button mode='outlined'  style={{backgroundColor:'red'}} onPress={handledelete.bind(null,d.id)}>Delete</Button> */}



      </DataTable.Row>
    
     
      
    </DataTable>
                    )

                })
            }
      {/* <Text>ShowallProduct</Text> */}

      <Btn
                  btnLabel="print"
                 
                  Press={print}
                  bgColor={"lightgreen"}
                />
      </ScrollView>
    </View>
    </ImageBackground>
  )
}