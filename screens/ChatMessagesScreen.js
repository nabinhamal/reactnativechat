import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    KeyboardAvoidingView,
    TextInput,
    Pressable,
    Image,
  } from "react-native";
  import React, { useState, useContext, useLayoutEffect, useEffect,useRef } from "react";
  import { Feather } from "@expo/vector-icons";
  import { Ionicons } from "@expo/vector-icons";
  import { FontAwesome } from "@expo/vector-icons";
  import { MaterialIcons } from "@expo/vector-icons";
  import { Entypo } from "@expo/vector-icons";
  import EmojiSelector from "react-native-emoji-selector";
  import { UserType } from "../UserContext";
  import { useNavigation, useRoute } from "@react-navigation/native";



const ChatMessagesScreen = () => {
    const [showEmojiSelector, setShowEmojiSelector] = useState(false);
    const [selectedMessages, setSelectedMessages] = useState([]);
    const [messages, setMessages] = useState([]);
    const [recepientData, setRecepientData] = useState();
    const navigation = useNavigation();
    const [selectedImage, setSelectedImage] = useState("");
    const route = useRoute();
    const { recepientId } = route.params;
    const [message, setMessage] = useState("");
    const { userId, setUserId } = useContext(UserType);

    const handleSend = async (messageType, imageUri) => {
        try {
             const apiUrl = process.env.EXPO_PUBLIC_API_URL;
          const formData = new FormData();
          formData.append("senderId", userId);
          formData.append("recepientId", recepientId);
    
          //if the message type id image or a normal text
          if (messageType === "image") {
            formData.append("messageType", "image");
            formData.append("imageFile", {
              uri: imageUri,
              name: "image.jpg",
              type: "image/jpeg",
            });
          } else {
            formData.append("messageType", "text");
            formData.append("messageText", message);
          }
          
          const response = await fetch(`${apiUrl}/messages`, {
            method: "POST",
            body: formData,
          });
    
          if (response.ok) {
            setMessage("");
            setSelectedImage("");
    
            fetchMessages();
          }
        } catch (error) {
          console.log("error in sending the message", error);
        }
      };
    
      console.log("messages", selectedMessages);


      useLayoutEffect(() => {
        navigation.setOptions({
          headerTitle: "",
          headerLeft: () => (
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <Ionicons
                onPress={() => navigation.goBack()}
                name="arrow-back"
                size={24}
                color="black"
              />
              <Image source={}/>
              </View>
          )
})
},[])

  return ( 
    <KeyboardAvoidingView style={{flex:1,backgroundColor:'#F0F0F0'}}>
      <ScrollView>
        {/**All the chat messages go over her */}
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderTopWidth: 1,
          borderTopColor: "#dddddd",
          marginBottom: showEmojiSelector ? 0 : 25,
        }}
      >
        <Entypo   style={{ marginRight: 5 }} name='emoji-happy' size={24} color='black'/>
        <TextInput
          value={message}
          onChangeText={(text) => setMessage(text)}
          style={{
            flex: 1,
            height: 40,
            borderWidth: 1,
            borderColor: "#dddddd",
            borderRadius: 20,
            paddingHorizontal: 10,
          }}
          placeholder="Type Your message..."
        />
       
          <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 7,
            marginHorizontal: 8,
          }}
        >
          <Entypo  name="camera" size={24} color="gray" />

          <Feather name="mic" size={24} color="gray" />
          <Pressable
          onPress={() => handleSend("text")}
          style={{
            backgroundColor: "#007bff",
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderRadius: 20,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Send</Text>
        </Pressable>
        </View>
        
      
      {showEmojiSelector && (
        <EmojiSelector
          onEmojiSelected={(emoji) => {
            setMessage((prevMessage) => prevMessage + emoji);
          }}
          style={{ height: 250 }}
        />
      )}
      </View>
    </KeyboardAvoidingView>
  )
}

export default ChatMessagesScreen

const styles = StyleSheet.create({})