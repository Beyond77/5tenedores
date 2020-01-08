import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { withNavigation } from "react-navigation"
import { validateEmail } from "../../utils/Validation"
import * as firebase from "firebase";
import Loading from "../Loading";


    function RegisterForm(props){
    const { toastRef, navigation } = props;
    const [hidePassword, setHidePassword]  = useState(true);
    const [hideRepeatPassword, setHideRepeatPassword] = useState(true);
    const [isVisibleLoading, setIsVisibleLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepetPassword] = useState("");


    const register = async  () => {
        setIsVisibleLoading(true);
       if(!email || !password || !repeatPassword){
           toastRef.current.show("Todos los campos son obligatorios");
       } else {
          if(!validateEmail(email)){
              console.log("El email no es correcto");
                toastRef.current.show("El email no es correcto");
          } else{
              if(password !== repeatPassword){
                console.log("Las contraseñas no son iguales");
                toastRef.current.show("Las contraseñas no son iguales");
              } else{
                  await firebase
                    .auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then(() => {
                        navigation.navigate("MyAccount");
                    }) 
                    .catch (() => {
                        console.log("Error al crear la cuenta, intentelo más tarde.");
                        toastRef.current.show("Error al crear la cuenta, intentelo más tarde");
                    })          
              }
              }
       }
       setIsVisibleLoading(false);
    };

    return (
        <View style={styles.formContainer} behavior="padding" enabled>
            <Input
             placeholder="Correo electronico"
             containerStyle={styles.inputForm}
             onChange={e => setEmail(e.nativeEvent.text)}
             rightIcon={
                 <Icon
                    type="material-community"
                    name="at"
                    iconStyle={styles.IconRight}
               />
             }
            />
            <Input
             placeholder="Contraseña"
             password={true}
             secureTextEntry={hidePassword}
             containerStyle={styles.inputForm}
             onChange={e => setPassword(e.nativeEvent.text)}
             rightIcon={
                <Icon
                    type="material-community"
                    name={hidePassword ? "eye-outline" : "eye-off-outline"}
                    iconStyle={styles.IconRight}
                    onPress={() => setHidePassword(!hidePassword)}
               /> 
             }
            />  
            <Input 
            placeholder="Repetir Contraseña"
            password={true}
            secureTextEntry={hideRepeatPassword}
            containerStyle={styles.inputForm}
            onChange={e => setRepetPassword(e.nativeEvent.text)}
            rightIcon={
                <Icon 
                type="material-community"
                name={hideRepeatPassword ? "eye-outline" : "eye-off-outline"}
                iconStyle={styles.IconRight}
                onPress={() => setHideRepeatPassword(!hideRepeatPassword)}
                />
            }
       />
       <Button
            title="Unirse"
            containerStyle={styles.btnContainerRegister}
            buttonStyle={styles.btnRegister}
            onPress={register}
           />
           <Loading text="Creando cuenta" isVisible={isVisibleLoading} />
         </View>
         
        )
    }

    export default withNavigation(RegisterForm);

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30
    },
    inputForm:{
        width:"100%",
        marginTop:20,
    },
    IconRight:{
        color: "#c1c1c1"
    },
    btnContainerRegister:{
        marginTop: 20,
        width: "95%"
    },
    btnRegister:{
        backgroundColor:"#00a680"
    }
})