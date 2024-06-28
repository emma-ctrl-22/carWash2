import {useState,useCallBack,useEffect} from 'react'
import {SafeAreaView,View,Text,StyleSheet} from "react-native"

const History = () =>{
 return(
 <SafeAreaView style = {styles.container}>
  <Text>Hello This is the history page</Text>
 </SafeAreaView>
 )
}

const styles = StyleSheet.create({
container:{
flex:1,
backgroundColor:"#fff",
justifyContent:"center",
alignItems:"center"
}
})

export default History;