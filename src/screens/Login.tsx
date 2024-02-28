import React,{useState} from 'react'
import { Image,StyleSheet, TextInput, View, Text, Alert,TouchableOpacity } from 'react-native'
import axios from 'axios';

 export const Login:React.FC<{navigation:any}>=({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const iniciarSesion=()=>{
        axios.get(`http://192.168.18.6:9005/auth/?email=${email}&password=${password}`)
        .then(response =>{
          console.log("Entre al response",response.data)
          if(email=='' || password==''){
            nullAlert()
          }
          else{
            if(response.data.Response==true){
              navigation.navigate('principal')
            }
            else{
              createAlert()
            }
          }
        }).catch(err =>{
          console.log(err)
        })
    }
    const createAlert = () =>
    Alert.alert('Aviso', 'Tu credenciales son erroneas', [
      {
        text: 'Cancel',
        style: 'cancel'
      },
      {
        text: 'Ok',
      }
    ],{cancelable:true})
    const nullAlert = () =>
    Alert.alert('Aviso', 'Completa los campos por favor', [
      {
        text: 'Ok',
      }
    ],{cancelable:true})
    return (
        <View style={styles.container}>
          <Image
          style={styles.img}
          source={require('../../assets/logo.png')}/>
          <Text style={styles.title}>Correo</Text>
          <TextInput
          keyboardType='email-address'
          style={styles.input}
          onChangeText={(text)=>setEmail(text)}
          />
          <Text style={styles.title}>Contraseña</Text>
          <TextInput
          style={styles.input}
          secureTextEntry
          onChangeText={(text)=>setPassword(text)}
          />
          <TouchableOpacity
          style={styles.buttonCon}
          onPress={iniciarSesion}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
        </View>
      )
    }
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      buttonCon: {
        backgroundColor: '#3498db', // Puedes ajustar el color según tus preferencias
        padding: 10,
        marginVertical: 30, // Espacio vertical entre los botones
        width: 270, // Ancho del botón
        borderRadius: 5, // Borde redondeado
        alignItems: 'center',
      },
      buttonText: {
        color: 'white', // Color del texto
        fontSize: 19,
        fontWeight: 'bold',
      },
      title: {
        fontSize: 24,
        marginBottom: 20,
      },
      input: {
        fontSize:18,
        height: 40,
        width: 300,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
        borderRadius:5,
      },
      img:{
        width:350,
        height:90,
        marginBottom:80,
      },
    });
    