
import React from "react"
import { Alert } from "react-native"
import axios from "axios"
export const deleteAlert=(_id:number,strName:string,strFirstLast:string,fetchData:any)=>{
  Alert.alert('Aviso', `Seguro que quieres eliminar al colaborador ${strName} ${strFirstLast}?`, [
    {
      text: 'Eliminar',
      onPress:()=> {
        
        const ide=_id.toString()
        const data={id:ide}
        axios.delete('http://192.168.18.6:9005/colaborador',{data:data as any}).then((res:any)=>{
          console.log("Se borro con exito")
          fetchData()
        }).catch((err:any)=>{
          errorCom()
          console.log(err)
        })

      }
    },
    {
      text:'Cancelar',
      style:'cancel',
    }
  ],{cancelable:true})}

export const errorCom=()=>{
  Alert.alert('Aviso', `Hubo un error de comunicación`, [
    {
      text: 'Ok',
      }
  ],{cancelable:true})
}

export const skillDel=(_id:number,strSkillName:string,fetchData:any)=>{
  Alert.alert('Aviso', `Seguro que quieres eliminar el skill ${strSkillName}?`, [
    {
      text: 'Eliminar',
      onPress:()=> {
        
        const ide=_id.toString()
        const data={
          id:ide,
          skill:strSkillName}
        axios.delete("http://192.168.18.6:9005/deleteSkill",{data:data})
        .then((res:any)=>{
            console.log(res.data)
            fetchData()
        }).catch(err=>console.log(err))

      }
    },
    {
      text:'Cancelar',
      style:'cancel',
    }
  ],{cancelable:true})}
  export const exitoso=()=>{
    Alert.alert('Aviso', `Tu información fue guardada con exito`, [
      {
        text: 'Ok',
      },
      
    ],{cancelable:true})}

  export const fallo=()=>{
    Alert.alert('Aviso', `Hubo un error de comunicación, intentelo más tarde`, [
      {
        text: 'Ok',
      },
      
    ],{cancelable:true})}
  