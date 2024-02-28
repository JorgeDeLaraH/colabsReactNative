import React, { useState, useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import { View, StyleSheet, TextInput,TouchableOpacity } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import { Modal as RNModal,List,Text,Provider,Button} from 'react-native-paper';
import { exitoso,fallo } from '../services/Alert'

interface FormData {
  strSkillName: Skill
  strLevel: Level
  numYearNum:string;
  
}
type Skill = '.Net' | 'React' | 'React Native' | 'PHP' | 'Angular' | 'Ionic' | 'Python' | 'SQL' | 'Flutter' | 'Swift';
type Level = 'Básico' | 'Intermedio' | 'Avanzado';
export const ModSkills:React.FC<{navigation:any}> = ({navigation}) => {
  const { control, handleSubmit, setValue } = useForm<FormData>();
  const [skills,setSkills]=useState<string[]>(['.Net' , 'React' , 'React Native'  , 'Angular' , 'Ionic' , 'Python' , 'SQL' , 'Flutter'])
  const [levels,setLevels]=useState<Level[]>(['Básico' , 'Intermedio' , 'Avanzado'])
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const id: any = useRoute().params
  const ide = id.userId
  const skill=id.index
  const [skillViejo,setSkillViejo]=useState('')

  const fetchData=()=>{
    axios.get(`http://192.168.18.6:9005/colaborador/${ide}`)
    .then((res:any)=>{
      const {strSkillName,strLevel,numYearExp}=res.data.Response[0].arrSkills[skill]
      setSkillViejo(strSkillName)
      setValue('strLevel',strLevel)
      setValue('strSkillName',strSkillName)
      setValue('numYearNum',numYearExp.toString())
    }).catch(err=>console.log(err))
  }
  const exeEffect=()=>{
    fetchData();
  }

  useEffect(() => {
    // Llamada a la función del efecto
    exeEffect();
  }, [setValue]);
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  const [levelModal, setLevelModal] = useState(false);
  const showLevel = () => setLevelModal(true);
  const hideLevel = () => setLevelModal(false);
  const onSubmit=(data:FormData)=>{
    console.log(data)
    let year=parseInt(data.numYearNum)
    const datos={
      id:ide,
      skillf:skillViejo,
      skilln:data.strSkillName,
      level:data.strLevel,
      numYear:year
    }
    console.log(datos)
    axios.put(`http://192.168.18.6:9005/skills`,datos)
    .then((res:any)=>{
        console.log("Información Actualizada",res.data)
        exitoso()
        exeEffect()
    }).catch(err=>{console.log(err);fallo()})
  }
  return (
    <>
      <Provider>
      <View style={styles.container}>
        <Text style={{fontSize:19,fontWeight:'bold'}}>Habilidad:</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Seleccione habilidad"
              onFocus={showModal}
              onBlur={onBlur}
              onChangeText={(text) => onChange(text)}
              value={value}
            />
          )}
          name="strSkillName"
        />
        <RNModal visible={modalVisible} onDismiss={hideModal} style={{ position: 'relative' }}>
          <View style={{ backgroundColor: 'white',height:600,marginTop:500}}>
            <List.Section>
              <List.Subheader>Selecciona Habilidad</List.Subheader>
              {skills.map((role, index) => (
                <List.Item
                  key={index}
                  title={role}
                  onPress={() => {setValue('strSkillName',role as never); hideModal()}}
                />
              ))}
            </List.Section>
            <Button onPress={hideModal}>Cancelar</Button>
          </View>
        </RNModal>
        
        <Text style={{fontSize:19,fontWeight:'bold'}}>Nivel:</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Seleccione nivel"
              onFocus={showLevel}
              onBlur={onBlur}
              onChangeText={(text) => onChange(text)}
              value={value}
            />
          )}
          name="strLevel"
        />
        <RNModal visible={levelModal} onDismiss={hideLevel} style={{ position: 'relative', marginTop: 50 }}>
          <View style={{ backgroundColor: 'white',height:600,marginTop:520}}>
            <List.Section>
              <List.Subheader>Selecciona Nivel</List.Subheader>
              {levels.map((role, index) => (
                <List.Item
                  key={index}
                  title={role}
                  onPress={() => {setValue('strLevel',role as never); hideLevel()}}
                />
              ))}
            </List.Section>
            <Button onPress={hideLevel}>Cancelar</Button>
          </View>
        </RNModal>

      <Text style={{fontSize:19,fontWeight:'bold'}}>Años de experiencia:</Text>
      <Controller
        control={control}
        render={({ field: { onChange,value }}) => <TextInput style={styles.input} keyboardType='numeric' value={value} onChangeText={onChange} />}
        name="numYearNum"
        rules={{ required: 'Campo requerido' }}
      />
      </View>
    </Provider>
    <View style={styles.containerBtn}>
      <TouchableOpacity
          style={styles.buttonCon}
          onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Guardar Cambios</Text>
        </TouchableOpacity>
        </View>
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    alignContent:'center',
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
    marginTop:90,
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
});