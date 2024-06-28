import {useState,useCallBack,useEffect} from 'react'
import {SafeAreaView,View,Text,StyleSheet} from "react-native"

const LoginScreen = () =>{
 return(
 <SafeAreaView>
  <Text>Hello This is the LoginScreen page</Text>
 </SafeAreaView>
 )
}

const styles = StyleSheet.create({
container:{
flex:1,
backgroundColor:"#050c1c"
}
})

export default LoginScreen;