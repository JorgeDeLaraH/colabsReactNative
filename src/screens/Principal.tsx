import React from 'react'
import { View,Image,StyleSheet,TouchableOpacity,Text,Alert } from 'react-native'

export const Principal:React.FC<{navigation:any}> = ({navigation}) => {
  const salir=()=>{
    navigation.navigate('Login')
  }
  const colabs=()=>{
    navigation.navigate('colaboradores')
  }
  const createAlert = () =>
  Alert.alert('Aviso', 'Módulo en construcción', [
    {
      text: 'Ok',
    }
  ],{cancelable:true})
  return (
    <View style={styles.container}>
      <Image
          style={styles.img}
          source={require('../../assets/logo.png')}/>
      <View>
      <TouchableOpacity
        style={styles.button}
        onPress={colabs}>
        <Text style={styles.buttonText}>Colaboradores</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={createAlert}>
        <Text style={styles.buttonText}>Skills</Text>
      </TouchableOpacity>

      <TouchableOpacity 
      style={[styles.button,styles.button3]}
      onPress={salir}>
        <Text style={styles.buttonText}>Salir</Text>
      </TouchableOpacity>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  button: {
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
  button3: {
    backgroundColor:'#d9534f',
    marginTop: 120, // Ajusta el margen inferior para el tercer botón
  },
});
