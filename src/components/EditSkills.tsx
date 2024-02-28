import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native'
import { useRoute } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import { skillDel } from '../services/Alert'

interface UserData {
    strSkillName: string;
    strLevel: string;
    numYearExp: number;
}

export const EditSkills: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [data, setData] = useState<UserData[]>([])
    const id: any = useRoute().params
    const ide = id.ide
    const userId=ide
    const fetchData=()=>{
        axios.get(`http://192.168.18.6:9005/colaborador/${ide}`)
            .then((res: any) => {
                console.log(res.data.Response[0].arrSkills)
                setData(res.data.Response[0].arrSkills)
            }).catch(err => console.log(err))
    }
    const eEffect=()=>{
        fetchData()
    }
    useEffect(() => {
        eEffect()
    }, []);
    const salir=()=>{
        navigation.navigate('EditUser',{userId})
      }
    const deleteSkill=(userId:number,strSkillName:string)=>{
        skillDel(userId,strSkillName,fetchData)
    }
    const modify=(strSkillName:string,index:number)=>{
        navigation.navigate('ModSkills',{userId,strSkillName,index})
    }
    const handleAdd=()=>{
        navigation.navigate('NewSkill',{userId})
    }
    const updateList=()=>{
        fetchData()
      }
    const renderItem = ({ item, index }: { item: UserData; index: number }) => (
        <View style={styles.item}>
            <Text style={styles.textNormal}>{item.strSkillName}</Text>
            <Text style={styles.textNormal}>{item.strLevel}</Text>
            <Text style={styles.textNormal}>{item.numYearExp}</Text>
            <TouchableOpacity onPress={()=>modify(item.strSkillName,index)}>
                <Icon style={[styles.button, { color: '#0d6efd' }]} name='pencil-square-o' size={35} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>deleteSkill(userId,item.strSkillName)}>
                <Icon style={[styles.button, { color: '#dc3545' }]} name='trash-o' size={35} />
            </TouchableOpacity>
        </View>
    );
    return (
        <View style={styles.container}>
            <Image
                style={styles.img}
                source={require('../../assets/logo.png')} />
            <Text style={[styles.title]}>Skills: </Text>
            <TouchableOpacity onPress={handleAdd}>
                <Icon style={[{ color: '#0d6efd', marginBottom: 15 }]} name='plus' size={35} />
            </TouchableOpacity>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.numYearExp.toString()}
            />
            <TouchableOpacity onPress={updateList}>
                <Icon style={[{ color: '#0d6efd' }]} name='refresh' size={35} />
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.buttonSalir, styles.button3]}
                onPress={salir}
            >
                <Text style={styles.buttonText}>Salir</Text>
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
    button3: {
        backgroundColor: '#d9534f',
        marginTop: 24, // Ajusta el margen inferior para el tercer botón
    },
    buttonSalir: {
        backgroundColor: '#3498db', // Puedes ajustar el color según tus preferencias
        padding: 10,
        marginVertical: 20, // Espacio vertical entre los botones
        width: 270, // Ancho del botón
        borderRadius: 5, // Borde redondeado
        alignItems: 'center',
      },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 10,
    },
    buttonCon: {
        backgroundColor: '#3498db', // Puedes ajustar el color según tus preferencias
        padding: 10,
        marginVertical: 10, // Espacio vertical entre los botones
        width: 270, // Ancho del botón
        borderRadius: 5, // Borde redondeado
        alignItems: 'center',
    },
    buttonText: {
        color: 'white', // Color del texto
        fontSize: 19,
        fontWeight: 'bold',
    },
    img: {
        marginTop: 20,
        width: 350,
        height: 90,
        marginBottom: 40,
    },
    item: {
        backgroundColor: '#e4e4e5',
        marginBottom: 10,
        width: 370,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 8,
        padding: 12,
        alignContent: 'center',
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#3498db', // Puedes ajustar el color según tus preferencias
        padding: 12,
        marginVertical: 10, // Espacio vertical entre los botones
        width: 55, // Ancho del botón
        borderRadius: 5, // Borde redondeado
    },
    textNormal: {
        fontSize: 15,
    }
});
