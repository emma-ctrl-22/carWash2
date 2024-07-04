import {useState,useContext} from 'react';
import { StyleSheet, SafeAreaView, KeyboardAvoidingView, View, Text, TextInput, TouchableOpacity, Image, ScrollView, Pressable } from 'react-native';
import { Feather,EvilIcons } from '@expo/vector-icons';
import { AuthContext } from '../utils/AuthContext';

const LoginScreen = () =>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {login} = useContext(AuthContext);
 return(
 <SafeAreaView style={styles.safeArea}>
<View style={styles.logoContainer}>
          <Text style={styles.logoText} >
            Welcome back kindly sign in to access {"\n"}your account.
          </Text>
      </View>
        <View style={styles.formContainer}>
          <Text style={{marginLeft:"8%"}}>Email</Text>
          <View style={styles.inputGroup}>
            <Feather name="user" size={24} color="black" style={styles.sideIcon}/>
            <TextInput value={username} onChangeText={(text)=>setUsername(text)} style={styles.input}/>
          </View>
          <Text style={{marginLeft:"8%"}}>Password</Text>
          <View style={styles.inputGroup}>
            <EvilIcons name="lock" size={24} color="black" style={styles.sideIcon}/>
            <TextInput value={password} onChangeText={(text)=>setPassword(text)} style={styles.input}/>
          </View>
        </View>
        <View style={styles.loginGroup}>
          <TouchableOpacity style={styles.registerBtn} onPress={()=>login(username,password)}>
             <Text style={{color:"#fff",fontSize:16}}>Log In</Text>
          </TouchableOpacity>
        </View>
 </SafeAreaView>
 )
}

const styles = StyleSheet.create({
    safeArea:{
      flex:1,
      backgroundColor: "#fff",
      alignItems:"center"
    },
    logoContainer:{
      width:"75%",
      height:"20%",
      display: "flex",
      flexDirection:"column",
      alignItems:"center",
      justifyContent:"space-between",
      marginTop:"15%"
    },
    logoText:{
      textAlign:'center',
      width:"95%",
      color: "#6E6D7A",
    },
    formContainer:{
      width:"100%",
      height:"25%",
      marginTop:"2%",
      display:"flex",
      flexDirection:"column",

      justifyContent:"space-evenly"
    },
    inputGroup:{
     backgroundColor:"#ECECEC",
     width:"85%",
     height:"33%",
     borderRadius:5,
     display:"flex",
     flexDirection:'row',
     alignItems:"center",
     justifyContent:"space-between",
     alignSelf:"center"
    },
    sideIcon:{
     marginLeft:"4%"
    },
    registerBtn:{
     width:"100%",
     height:"20%",
     backgroundColor:"#2328a0",
     borderRadius:5,
     display:"flex",
     justifyContent:"center",
     alignItems:"center"
    },
    input:{
     width:"90%",
     height:"90%",
     borderRadius:10,
     fontSize:18,
     marginLeft:"2%"
    },
    loginGroup:{
      position:'absolute',
      width:"90%",
      marginBottom:0,
      top:"70%",
      height:"30%",
      display:"flex",
      flexDirection:"column",
      alignItems:"center",
      justifyContent:"space-evenly"
    },
    resetPwd:{
      color: "#6E6D7A",
      textAlign:"center"
    }
  });
  

export default LoginScreen;