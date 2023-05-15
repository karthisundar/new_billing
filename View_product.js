import  { useEffect, useState } from 'react';
import *as React from 'react'
import {View, Text, Touchable, TouchableOpacity, TextInput,StyleSheet, ScrollView,Modal,Pressable,ImageBackground,ToastAndroid} from 'react-native';
import Axios from 'axios';
import {  DataTable ,Button} from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import 'react-native-gesture-handler';
import wood2 from './wood2.png'
import * as MailComposer from 'expo-mail-composer';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import Btn from './Btn';
import { app_url } from './Ipaddress';
// import SvgQRCode from 'react-native-qrcode-svg'




const View_product =()=>{
    const [product,setProduct] = useState([])
    const [qr,setqr] = useState([])
    const [visible, setVisible] = useState(false);
    const [page,setPage] = useState(0)
    const optionsPerPage = [0];
    

    // const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[10]);
    const [modalVisible, setModalVisible] = useState(false);
    const [productQRref, setProductQRref] = useState();
    const [isAvailable, setIsAvailable] = useState(false);
    const [recipients, setRecipients] = useState([]);
    const [subject, setSubject] = useState(undefined);
    const [body, setBody] = useState(undefined);
    const [email, setEmail] = useState(undefined);
    const [selectedPrinter, setSelectedPrinter] = useState();
    const [blobimage,setBlobimage] = useState('')
    const [checkid,setId] = useState([])


    // const ref = React.useRef();
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


    const handleqr = (e,id)=>{
        // console.log('enter',e)
        console.log('eeee',e)
        const filter = product.filter(d=>d.id ==e)
        console.log('id',filter)
        // setId(filter)
        setqr(filter)
      setVisible(true)


      productQRref?.toDataURL( data =>{
        // setBlobimage(data)
        // data
        // console.log('opopopopopopopopo',data)
  
        // console.log('data ',data)
        // const QRCodeImg = FileSystem.documentDirectory + "QRCode.png";
        // await FileSystem.writeAsStringAsync(QRCodeImg, data, { encoding: FileSystem.EncodingType.Base64 })
        // MediaLibrary.saveToLibraryAsync(QRCodeImg)
        // .then(()=> ))
        // .catch(console.error)
      })

      // console.log('productQRref',productQRref)

      

      // const eeeee = new Blob()

      // productQRref?.toDataURL(d=>console.log(d,"okookokokok"))

    }
  

    const handleClose =()=>{
      setVisible(false)
    }
    
    useEffect(()=>{
      async function checkAvailability() {
        const isMailAvailable = await MailComposer.isAvailableAsync();
        setIsAvailable(isMailAvailable);
      }
  
        // console.log('enter useEffect')
        // console.log('prprrrr',productQRref)
      checkAvailability();
        const url = `${app_url}/view_product`

        Axios.post(url).then((response)=>{
            // console.log('response',response?.data?.results)
            const product = response?.data?.results
            setProduct(product)

        })

    },[])

    

    const handledelete = (e)=>{
      console.log('eee',e)
      const id = e

      url = `${app_url}/productdelete`

      Axios.post(url,{
          id:id
      }).then((response)=>{
        console.log('========',response?.data?.results?.affectedRows)

        const deleted =  response?.data?.results?.affectedRows 

        if(deleted==1){
          ToastAndroid.showWithGravityAndOffset(
            "Product deleted sucessfully ",
            ToastAndroid.LONG,
            ToastAndroid.TOP,
            25,
            50
          );
        }else{
          ToastAndroid.showWithGravityAndOffset(
            "Plz try again ",
            ToastAndroid.LONG,
            ToastAndroid.TOP,
            25,
            50
          );
        }
      }).catch(err=>console.log('errrrr',err))


    }

    const qr_data = qr[0]?.id
    

    // console.log('visible--------',qr[0]?.id)
    // console.log('reeeee',productQRref?.toDataURL(d=>console.log(d)))

    const new_image = productQRref?.toDataURL(d=>d)


    // const data_2 = new Blob(productQRref?.toDataURL(d=>d))
    // console.log('newewewewew',data_2)


    const print = async () => {


      productQRref?.toDataURL( data =>{
        setBlobimage(data)
  
      })




      
    
      await Print.printAsync({
        html: createDynamicTable(),
        printerUrl: selectedPrinter?.url, // iOS only
      });
    }
  
    const printToFile = async () => {
      // On iOS/android prints the given html. On web prints the HTML from the current page.
      const { uri } = await Print.printToFileAsync({
        html
      });
      console.log('File has been saved to:', uri);
      await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    }
  
    const selectPrinter = async () => {
      const printer = await Print.selectPrinterAsync(); // iOS only
      setSelectedPrinter(printer);
    }
    
    // const product_title = 
 
     productQRref?.toDataURL( data =>{
      setBlobimage(data)
     
    })
    const html = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body style="text-align: center;">
    <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
      QR Images
    </h1>
    <center>
    <h2>Qr Image</h2>
<h1>  product Title :${qr[0]?.product_title} </h1>
</center>
    <img style = "width:80px; height:50px" src="data:image/png;base64,${blobimage}">
 
  </body>
</html>
`;
    // console.log('imagecheckl',ooo)
    
    const createDynamicTable = () => {
     

      // console.log('enter1')
      var table = '';
     
        table = table + `
        <img src="data:image/png;base64,${blobimage}">
        `
      
      // console.log(table);
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
        </style>
        </head>
        <body>
       
        
        <center>
        <h2>Qr Image</h2>
    <h1>  product Title :${qr[0]?.product_title} </h1>
    </center>
        
        <img style="width:180px;height:200px ;align = center;display: block;margin :0 auto" src="data:image/png;base64,${blobimage}">
      
        </body>
      </html>
        `;
      return html;
    }




   
    return(
          <ImageBackground style={{height:870}} source={wood2}>
        <View style={{marginTop:30}}>
          <ScrollView>
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
     <ScrollView >
      <DataTable.Row key={d}>
        <DataTable.Cell >{d.product_code}</DataTable.Cell>
        <DataTable.Cell>{d.product_title}</DataTable.Cell>
        <DataTable.Cell>{d.amount}</DataTable.Cell>
        <DataTable.Cell>{d.quantity}</DataTable.Cell>
        <Button mode='contained'  onPress={handleqr.bind(null,d.id)} >Genarate</Button>

        <Button mode='outlined'  style={{backgroundColor:'red'}} onPress={handledelete.bind(null,d.id)}>Delete</Button>



      </DataTable.Row>
      </ScrollView>
     
      
    </DataTable>
                    )

                })
            }
            {/* {product?.map((value, index) => <DataTable.Row key={index}> {product?.map(({ title }) => <DataTable.Cell key={title}>{value[title]}</DataTable.Cell>)} </DataTable.Row>)} */}
              
{/* <DataTable.Pagination
          page={page}
          numberOfPages={1000}
          onPageChange={(page) => setPage(page)}
          label="1-2 of 10"
          // optionsPerPage={optionsPerPage}
          // itemsPerPage={itemsPerPage}
          // setItemsPerPage={setItemsPerPage}
          optionsLabel={'Rows per page'}
        /> */}

          
<Modal
        animationType="slide"
        transparent={true}
        visible={visible}
       >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>QR</Text>
            <QRCode 
             size={250}
             color="black"
             backgroundColor="white"
          value =  {`${qr_data}`}
          // getRef={(c) => setProductQRref(c)}
          getRef={setProductQRref}
            >

            </QRCode>

            {/* <SvgQRCode  value="hello world" size={100} /> */}
            <View>
              
         <Btn btnLabel='print' Press={print} bgColor='white'  /> 
         
          {/* <Btn btnLabel='Print to PDF file' Press={printToFile} bgColor='white'/> */}
        </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={handleClose}>
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

              {/* <Navbar/> */}
{/* <Pressable
        style={[styles.button, styles.buttonOpen]}
        // visible={visible} 
        // onShow={visible}
        // onPress={!visible}
        
        // onPress={(id) => handledelete(id)}
        onPress={handleqr}
        >
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable> */}       
        
          
          </ScrollView>

        </View>
        </ImageBackground>
    )


    
}

export default View_product