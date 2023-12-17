import { StyleSheet, Text, View,ScrollView, Pressable } from 'react-native'
import React, { useContext, useState ,useEffect} from 'react'
import { UserType } from '../UserContext';
import { useNavigation } from '@react-navigation/native';
import UserChat from '../components/UserChat';

const ChatsScreen = () => {
  const [acceptedFriends, setAcceptedFriends] = useState([])
  const { userId, setUserId } = useContext(UserType);
  const navigation = useNavigation();


  useEffect(() => {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const acceptedFriendsList = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/accepted-friends/${userId}`
        );
        const data = await response.json();

        if (response.ok) {
          setAcceptedFriends(data);
        }
      } catch (error) {
        console.log("error showing the accepted friends", error);
      }
    };

    acceptedFriendsList();
  }, []);
  console.log("friends",acceptedFriends)





  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Pressable>
        {acceptedFriends.map((item,index)=>(
          <UserChat key={index} item={item} />
        ))}
      </Pressable>
    </ScrollView>
  )
}

export default ChatsScreen

const styles = StyleSheet.create({})