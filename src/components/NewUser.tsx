import React, { useState, useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import { View, Text, StyleSheet, TextInput,TouchableOpacity } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import { Modal,List } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ObjectId } from 'mongodb'
import { exitoso,fallo } from '../services/Alert'
interface FormData {
  _id: ObjectId
  strName: string;
  strFirstLast: string;
  strSecondLast: string;
  strEmail: string;
  strRole: 'Administrator' | 'Project Manager' | 'DevOps' | 'Software Developer'; // Definimos los posibles valores para el radio input
  intPhone: string;
}
export const NewUser:React.FC<{navigation:any}> = ({navigation}) => {
  const { control, handleSubmit, setValue } = useForm<FormData>();
  const [roles, setRoles] = React.useState<string[]>(['Administrator', 'Project Manager', 'DevOps', 'Sofware Developer']);
  const [modalVisible, setModalVisible] = useState(false);

  const onSubmit = (data: FormData) => {
    // Guardar el nuevo dato en el array de datos guardados
    let phone=parseInt(data.intPhone)
    const datos={
      nombre: data.strName,
      apellidoPaterno: data.strFirstLast,
      apellidoMaterno: data.strSecondLast,
      correo: data.strEmail,
      rol: data.strRole,
      telefono:phone
    }
    console.log(datos)
    axios.post('http://192.168.18.6:9005/colaborador',datos)
    .then((res:any)=>{
      console.log("Registro Exitosa",res.data.Response)
      exitoso()
    }).catch(err=>{console.log(err);fallo()})
  }
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  const handleSelectRole = (itemValue: any) => {
    setValue('strRole', itemValue);
    hideModal();
  };
  return (
  <KeyboardAwareScrollView>
    <View style={styles.container}>
      <Text style={{fontSize:19,fontWeight:'bold'}}>Nombre:</Text>
      <Controller
        control={control}
        render={({ field }) => <TextInput style={styles.input} value={field.value} onChangeText={field.onChange} />}
        name="strName"
        rules={{ required: 'Campo requerido' }}
      />

      <Text style={{fontSize:19,fontWeight:'bold'}}>Apellido:</Text>
      <Controller
        control={control}
        render={({ field }) => <TextInput style={styles.input} value={field.value} onChangeText={field.onChange} />}
        name="strFirstLast"
        rules={{ required: 'Campo requerido' }}
      />

      <Text style={{fontSize:19,fontWeight:'bold'}}>Segundo Apellido:</Text>
      <Controller
        control={control}
        render={({ field }) => <TextInput style={styles.input} value={field.value} onChangeText={field.onChange} />}
        name="strSecondLast"
        rules={{ required: 'Campo requerido' }}
      />
      <Text style={{fontSize:19,fontWeight:'bold'}}>Correo:</Text>
      <Controller
        control={control}
        render={({ field }) => <TextInput keyboardType='email-address' style={styles.input} value={field.value} onChangeText={field.onChange} />}
        name="strEmail"
        rules={{ required: 'Campo requerido' }}
      />

      <Text style={{fontSize:19,fontWeight:'bold'}}>Teléfono:</Text>
      <Controller
        control={control}
        render={({ field }) => <TextInput style={styles.input} keyboardType='numeric' value={field.value} onChangeText={field.onChange} />}
        name="intPhone"
        rules={{ required: 'Campo requerido' }}
      />

      <Text style={{fontSize:19,fontWeight:'bold'}}>Rol:</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Seleccione su rol"
            onFocus={showModal}
            onBlur={onBlur}
            onChangeText={(text) => onChange(text)}
            value={value}
          />
        )}
        name="strRole"
      />
      {/* Modal para seleccionar el rol */}
      <Modal
        visible={modalVisible}
        onDismiss={hideModal}
        contentContainerStyle={{ backgroundColor: 'white', padding: 20 }}
      >
        <List.Section>
          <List.Subheader>Seleccionar Rol</List.Subheader>
          {roles.map((role, index) => (
            <List.Item
              key={index}
              title={role}
              onPress={() => {
                if (roles.includes(role)) {
                  setValue('strRole', role as never);
                  hideModal();
                } else {
                  // Puedes manejar el caso donde el rol seleccionado no es válido
                  console.error(`Rol no válido: ${role}`);
                }
              }}
            />
          ))}
        </List.Section>
      </Modal>
      <View style={styles.containerBtn}>
        <TouchableOpacity
          style={styles.buttonCon}
          onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Guardar Colaborador</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonCon,styles.button3]}
          onPress={()=>navigation.goBack()}>
          <Text style={styles.buttonText}>Regresar</Text>
        </TouchableOpacity>
      </View>
    </View>
  </KeyboardAwareScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  button3: {
    backgroundColor:'#d9534f',
    marginTop: 100, // Ajusta el margen inferior para el tercer botón
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007BFF',
  },
  savedDataTitle: {
    marginTop: 20,
    fontSize: 18,
  },
  savedData: {
    fontSize: 16,
  },
  containerBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:30,
  },
  buttonCon: {
    backgroundColor: '#3498db', // Puedes ajustar el color según tus preferencias
    padding: 10,
    //marginVertical: 10, // Espacio vertical entre los botones
    width: 270, // Ancho del botón
    borderRadius: 5, // Borde redondeado
    alignItems: 'center',
  },
  buttonText: {
    color: 'white', // Color del texto
    fontSize: 19,
    fontWeight: 'bold',
  },
});