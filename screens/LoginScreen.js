import { KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

const LoginScreen = () => {
    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')
    const navigation= useNavigation(); 
  return (
    <View style={{flex:1, backgroundColor:'white',padding:10 , alignItems:'center'}}>
      <KeyboardAvoidingView>
        <View style={{marginTop:100,justifyContent:'center',alignItems:'center'}}>
            <Text style={{color:'#4A55A2',fontSize: 17,fontWeight:'600'}} >
                SIGN IN
            </Text>
                <Text style={{fontSize: 17,fontWeight:'600',marginTop:15}} >Sign In To Your Account </Text>
        </View>
        <View style={{marginTop:50}} >
            <Text>Email</Text>
            <TextInput value={email} onChange={(text) => setEmail(text)} placeholderTextColor={'black'} placeholder='Enter Your Email' style={{fontSize:email ? 18: 18 ,borderBottomColor:'gray',borderBottomWidth:1,marginVertical:10,width:300}}/>
        </View>
        <View style={{marginTop:15}} >
            <Text>Password</Text>
            <TextInput value={password} onChange={(text) => setPassword(text)} secureTextEntry={true} placeholderTextColor={'black'} placeholder='Enter Your Password' style={{fontSize:email ? 18: 18 ,borderBottomColor:'gray',borderBottomWidth:1,marginVertical:10,width:300}}/>
        </View>
        <Pressable
           
            style={{
              width: 200,
              backgroundColor: "#4A55A2",
              padding: 15,
              marginTop: 50,
              marginLeft: "auto",
              marginRight: "auto",
              borderRadius: 6,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Login
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("Register")}
            style={{ marginTop: 15 }}
          >
            <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
              Dont't have an account? SIGN UP
            </Text>
          </Pressable>

        </KeyboardAvoidingView>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})