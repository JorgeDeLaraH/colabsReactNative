from bson import ObjectId,json_util as j
from flask import jsonify
from pymongo import MongoClient
import BackEnd.GlobalInfo.ResponseMessages as ResponseMessage
import BackEnd.GlobalInfo.Keys as ColabsKey

#Conexion a la base de datos
if ColabsKey.dbconn==None:
    mongoConnect=MongoClient(ColabsKey.strConnection)
    ColabsKey.dbconn=mongoConnect[ColabsKey.strDBConnection]
    dbUsers=ColabsKey.dbconn["clUsers"]
    dbColabs=ColabsKey.dbconn["clColaboradores"]
#Esta funcion trae todos los datos de clColabs formateados
def fnGetUsers():
    try:
        arrFinalColab=[]
        objQuery=dbUsers.find({})
        listColabs=list(objQuery)
        if len(listColabs)!=0:
            for objColab in listColabs:
                print(objColab)
                objFormateado={
                    "_id":str(objColab['_id']),
                    "strEmail":objColab["strEmail"],
                    "strPassword":objColab['strPassword'],
                }
                arrFinalColab.append(objFormateado)
        objResponse=ResponseMessage.succ200.copy()
        objResponse['Respuesta']=arrFinalColab
        return jsonify(objResponse)
    except Exception as e:
        print("Error en fngetcolabs",e)
        return jsonify(ResponseMessage.err500)
#Esta función lo que hace es comparar el correo y usuario con el de mongo si son iguales
#Solo mandamos un true de lo contrario un false
def fnGetAuth(email,password):
    try:
        arraFinalAuth=[]
        objQuery=dbUsers.find({"strEmail":email,"strPassword":password})
        listAuth=list(objQuery)
        if len(listAuth)!=0:
            for objAuth in listAuth:
                objFormateado={
                    "strEmail":objAuth["strEmail"],
                    "strPassword":objAuth["strPassword"]
                }
                arraFinalAuth.append(objFormateado)
        objResponse=ResponseMessage.succ200.copy()
        #Si la longitud es diferente de cero o igual a 1 responde true
        if len(arraFinalAuth)!=0 or len(arraFinalAuth)==1:
            objResponse["Response"]=True
        else:
            objResponse['Response']=False
        return jsonify(objResponse)
    except Exception as e:
        print("Error en fnGetAuth",e)
        return jsonify(ResponseMessage.err500)
#Traemos toda la data formateada de la colección Colaboradores
def fnGetColaboradores():
    try:
        arraFinalColab=[]
        objQuery=dbColabs.find({})
        listColab=list(objQuery)
        if len(listColab)!=0:
            for objColab in listColab:
                objFormateado={
                    "_id":str(objColab["_id"]),
                    "strName":objColab["strName"],
                    "strFirstLast":objColab["strFirstLast"],
                    "strSecondLast":objColab["strSecondLast"]
                }
                arraFinalColab.append(objFormateado)
        objResponse=ResponseMessage.succ200.copy()
        objResponse['Response']=arraFinalColab
        return jsonify(objResponse)
    except Exception as e:
        print("Error en fnGetColaboradores",e)
        return jsonify(ResponseMessage.err500)

def fnGetColaborador(id):
    try:
        arraFinalColab=[]
        objQuery=dbColabs.find({"_id":ObjectId(id)})
        listColab=list(objQuery)
        if len(listColab)!=0:
            for objColab in listColab:
                objFormateado={
                    "_id":str(objColab["_id"]),
                    "strName":objColab["strName"],
                    "strFirstLast":objColab["strFirstLast"],
                    "strSecondLast":objColab["strSecondLast"],
                    "strRole":objColab["strRole"],
                    "strEmail":objColab["strEmail"],
                    "intPhone":objColab["intPhone"],
                    "arrSkills":objColab["arrSkills"]
                }
                arraFinalColab.append(objFormateado)
        objResponse=ResponseMessage.succ200.copy()
        objResponse['Response']=arraFinalColab
        return jsonify(objResponse)
    except Exception as e:
        print("Error en fnGetColaboradores",e)
        return jsonify(ResponseMessage.err500)

def fnDeleteColaborador(id):
    try:
        print("Los datos que eliminare: ",id)
        dbColabs.delete_one({"_id":ObjectId(id)})
        objResponse=ResponseMessage.succ200.copy()
        objResponse['Informacion_Borrada']=True
        return jsonify(objResponse)
    except Exception as e:
        print("Error en fnDeleteColaborador",e)
        return jsonify(ResponseMessage.err500)
    
def fnPutColaborador(id,nombre,apellidoPaterno,apellidoMaterno,correo,telefono,rol):
    try:
        newPhone=int(telefono)
        print("Id a modificar: ",id)
        dbColabs.update_one({"_id":ObjectId(id)},{"$set":{"strName":nombre,"strFirstLast":apellidoPaterno,"strSecondLast":apellidoMaterno,"strEmail":correo,"strRole":rol,"intPhone":newPhone}})
        objResponse=ResponseMessage.succ200.copy()
        objResponse['Informacion_Actualizada']=True
        return jsonify(objResponse)
    except Exception as e:
        print("Error en fnPutColaborador",e)
        return jsonify(ResponseMessage.err500)
    
def fnPostColaborador(nombre,apellidoPaterno,apellidoMaterno,correo,telefono,rol):
    try:
        print("Los datos que eliminare: ",id)
        dbColabs.insert_one({"strName":nombre,"strFirstLast":apellidoPaterno,"strSecondLast":apellidoMaterno,"strEmail":correo,"strRole":rol,"intPhone":telefono,"arrSkills":[]})
        objResponse=ResponseMessage.succ200.copy()
        objResponse['Información_Registrada']=True
        return jsonify(objResponse)
    except Exception as e:
        print("Error en fnPostColaborador",e)
        return jsonify(ResponseMessage.err500)
def fnDeleteSkill(id,skill):
    try:
        print("Los datos que eliminare: ",id,skill)
        dbColabs.update_one({"_id":ObjectId(id)},{"$pull":{"arrSkills":{"strSkillName":skill}}})
        objResponse=ResponseMessage.succ200.copy()
        objResponse['Informacion_Borrada']=True
        return jsonify(objResponse)
    except Exception as e:
        print("Error en fnPostPersona",e)
        return jsonify(ResponseMessage.err500)
def fnPostSkills(id,skill,level,numYear):
    try:
        print("Datos a guardar",id,skill,level,numYear)
        dbColabs.update_one({"_id":ObjectId(id)},{"$addToSet":{"arrSkills":{"strSkillName":skill,"strLevel":level,"numYearExp":numYear}}})
        objResponse=ResponseMessage.succ200.copy()
        objResponse['Informacion_Guardada']=True
        return jsonify(objResponse)
    except Exception as e:
        print("Error en fnPostPersona",e)
        return jsonify(ResponseMessage.err500)
def fnPutSkills(id,skillf,skilln,level,numYear):
    try:
        print("Los datos que voy a actualizar son: ",skilln,level,numYear)
        dbColabs.update_one({"_id":ObjectId(id),"arrSkills.strSkillName":skillf},{"$set":{"arrSkills.$.strSkillName":skilln,"arrSkills.$.strLevel":level,"arrSkills.$.numYearExp":numYear}})
        objResponse=ResponseMessage.succ200.copy()
        objResponse['Informacion_Actualizada']=True
        return jsonify(objResponse)
    except Exception as e:
        print("Error en fnPostPersona",e)
        return jsonify(ResponseMessage.err500)