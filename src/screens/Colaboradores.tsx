import React,{useState,useEffect} from 'react'
import { View, StyleSheet, Image, Text, FlatList, ScrollView, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome'
import {deleteAlert} from '../services/Alert';
interface UserData {
  _id:number
  strName: string;
  strFirstLast: string;
  // Otros campos según la estructura real
}
export const Colaboradores:React.FC<{navigation:any}> = ({navigation}) => {
  const [data, setData] = useState<UserData[]>([]);
  const fetchData=()=>{
    axios.get('http://192.168.18.6:9005/colaboradores')
      .then(response => {
        setData(response.data.Response)
        console.log(data)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
  const exeEffect=()=>{
    fetchData();
  }

  useEffect(() => {
    // Llamada a la función del efecto
    exeEffect();
  }, []);
  const handleEdit = (userId: number) => {
    // Navegar a la pantalla de edición pasando el ID del usuario
    console.log(userId)
    navigation.navigate('EditUser', { userId });
  };
  const handleDelete = (_id:number,strName: string,strFirstLast:string) => {
    // Lógica para eliminar el usuario (puedes implementarla según tus necesidades)
    console.log(`Eliminar usuario con ID: ${strName}`);
    deleteAlert(_id,strName,strFirstLast,fetchData)
  };

  const handleAdd=()=>{
    console.log("Entre a new")
    navigation.navigate('NewUser',{id: null})
  }
  const updateList=()=>{
    fetchData()
  }
  const renderItem = ({ item,index }: { item: UserData; index:number }) => (
    <View style={styles.item}>
      <Text style={styles.textNormal}>{item.strName}</Text>
      <Text style={styles.textNormal}>{item.strFirstLast}</Text>
      <TouchableOpacity onPress={() => handleEdit(item._id)}>
      <Icon style={[styles.button,{color:'#0d6efd'}]} name='pencil-square-o' size={35}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDelete(item._id,item.strName,item.strFirstLast)}>
        <Icon style={[styles.button,{color:'#dc3545'}]} name='trash-o' size={35}/>
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.container}>
      <Image
          style={styles.img}
          source={require('../../assets/logo.png')}/>
      <Text style={[styles.title]}>Colaboradores: </Text>
      <TouchableOpacity onPress={handleAdd}>
        <Icon style={[{color:'#0d6efd',marginBottom:15}]} name='plus' size={35}/>
        </TouchableOpacity>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.toString()}
      />
      <TouchableOpacity onPress={updateList}>
                <Icon style={[{ color: '#0d6efd', marginBottom: 90 }]} name='refresh' size={35} />
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
  title: {
    fontWeight:'bold',
    fontSize: 24,
    marginBottom: 10,
  },
  img:{
    marginTop:20,
    width:350,
    height:90,
    marginBottom:40,
  },
  item: {
    backgroundColor: '#e4e4e5',
    marginBottom:10,
    width:370,
    flexDirection: 'row',
    justifyContent:'space-around',
    alignItems:'center',
    borderRadius:8,
    padding:12,
    alignContent:'center',
  },
  button: {
    flex:1,
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
    //backgroundColor: '#3498db', // Puedes ajustar el color según tus preferencias
    padding: 12,
    marginVertical: 10, // Espacio vertical entre los botones
    width: 55, // Ancho del botón
    borderRadius: 5, // Borde redondeado
  },
  textNormal:{
    fontSize:21,
  }
});
