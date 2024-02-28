#Importacion de librerías
from flask import Flask,jsonify,request
from flask_cors import CORS
import BackEnd.Functions as CallMethod
import BackEnd.GlobalInfo.ResponseMessages as ResponseMessage

#Instancia
app=Flask(__name__)
CORS(app)

#Definición de rutas
#Ruta para probar los usuarios de la base de mongo
@app.route('/auth', methods=['GET'])
def getUsers():
    try:
        objResult=CallMethod.fnGetUsers()
        return objResult
    except Exception as e:
        print("Error en getColabs",e)
        return jsonify(ResponseMessage.err500)
#Esta ruta trae un usuario en especifico segun su id
@app.route('/auth/', methods=['GET'])
def getAuth():
    try:
        email=request.args.get("email")
        password=request.args.get("password")
        
        if email=="" or password=="":
            return jsonify(ResponseMessage.err203)
        else:
            objResult=CallMethod.fnGetAuth(email,password)
            return objResult
    except Exception as e:
        print("Error en postAuth",e)
        return jsonify(ResponseMessage.err500)
#Este es para traer todos los datos dentro de la colección de colaboradores 
@app.route('/colaboradores', methods=['GET'])
def getColaboradores():
    try:
        objResult=CallMethod.fnGetColaboradores()
        return objResult
    except Exception as e:
        print("Error en getColabs",e)
        return jsonify(ResponseMessage.err500)
#Esta ruta es para traer un colaborador especifico segun su id   
@app.route('/colaborador/<id>', methods=['GET'])
def getColaborador(id):
    try:
        objResult=CallMethod.fnGetColaborador(id)
        return objResult
    except Exception as e:
        print("Error en getColaborador",e)
        return jsonify(ResponseMessage.err500)
#Esta ruta elimina el registro con id unico de colaborador
@app.route('/colaborador', methods=['DELETE'])
def deleteColaborador():
    try:
        id=None if("id" not in request.json) else request.json['id']
        if id==None:
            return jsonify(ResponseMessage.err203)
        else:
            objResult=CallMethod.fnDeleteColaborador(id)
        return objResult
    except Exception as e:
        print("Error en deleteColaborador",e)
        return jsonify(ResponseMessage.err500)
#Esta ruta actualiza todos los datos de un colaborador en especifico
@app.route('/colaborador', methods=['PUT'])
def putColaborador():
    try:
        id=None if("id" not in request.json) else request.json['id']
        nombre=request.json['nombre']
        apellidoPaterno=request.json['apellidoPaterno']
        apellidoMaterno=request.json['apellidoMaterno']
        correo=request.json['correo']
        rol=request.json['rol']
        telefono=request.json['telefono']
        if id==None:
            return jsonify(ResponseMessage.err203)
        else:
            objResult=CallMethod.fnPutColaborador(id,nombre,apellidoPaterno,apellidoMaterno,correo,telefono,rol)
        return objResult
    except Exception as e:
        print("Error en putColaborador",e)
        return jsonify(ResponseMessage.err500)
#Esta ruta es para agregar o insertar un nuevo registro dentro de la colección
@app.route('/colaborador', methods=['POST'])
def postColaborador():
    try:
        nombre=request.json['nombre']
        apellidoPaterno=request.json['apellidoPaterno']
        apellidoMaterno=request.json['apellidoMaterno']
        correo=request.json['correo']
        rol=request.json['rol']
        telefono=request.json['telefono']
        objResult=CallMethod.fnPostColaborador(nombre,apellidoPaterno,apellidoMaterno,correo,telefono,rol)
        return objResult
    except Exception as e:
        print("Error en postcolaborador",e)
        return jsonify(ResponseMessage.err500)

@app.route('/deleteSkill', methods=['DELETE'])
def deleteColabs():
    try:
        id=None if("id" not in request.json) else request.json['id']
        skill=None if("skill" not in request.json) else request.json['skill']
        if id==None or skill==None:
            return jsonify(ResponseMessage.err203)
        else:
            objResult=CallMethod.fnDeleteSkill(id,skill)
            return objResult
    except Exception as e:
        print("Error en deleteColabs",e)
        return jsonify(ResponseMessage.err500)

@app.route('/skills', methods=['POST'])
def postColabs():
    try:
        id=None if("id" not in request.json) else request.json['id']
        skill=None if("skill" not in request.json) else request.json['skill']
        level=request.json['level']
        numYear=request.json['numYear']
        if id==None or skill==None:
            return jsonify(ResponseMessage.err203)
        else:
            objResult=CallMethod.fnPostSkills(id,skill,level,numYear)
            return objResult
    except  Exception as e:
        print("Error en postColabs",e)
        return jsonify(ResponseMessage.err500)
    
@app.route('/skills', methods=['PUT'])
def putColabs():
    try:
        id=None if("id" not in request.json) else request.json['id']
        skillf=None if("skillf" not in request.json) else request.json['skillf']
        skilln=None if("skilln" not in request.json) else request.json['skilln']
        level=request.json['level']
        numYear=request.json['numYear']
        if id==None or skilln==None:
            return jsonify(ResponseMessage.err203)
        else:
            objResult=CallMethod.fnPutSkills(id,skillf,skilln,level,numYear)
            return objResult
    except  Exception as e:
        print("Error en putColabs",e)
        return jsonify(ResponseMessage.err500)
if __name__=='__main__':
    app.run(host="0.0.0.0", port=9005, debug=True, threaded=True)