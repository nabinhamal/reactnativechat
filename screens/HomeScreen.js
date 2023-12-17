import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useLayoutEffect, useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import axios from "axios";
import User from "../components/User";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { userId, setUserId } = useContext(UserType);
  const [users, setUsers] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Swift Chat</Text>
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Ionicons
            onPress={() => navigation.navigate("Chats")}
            name="chatbox-ellipses-outline"
            size={24}
            color="black"
          />
          <MaterialIcons
            onPress={() => navigation.navigate("Friends")}
            name="people-outline"
            size={24}
            color="black"
          />
          <Pressable onPress={handleLogout} style={styles.logoutButton}>
            <Ionicons
              name="log-out-outline"
              size={24}
              color="black"
              style={{ marginLeft: 16 }}
            />
          </Pressable>
        </View>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      const apiUrl = process.env.EXPO_PUBLIC_API_URL;
      setUserId(userId);
      console.log("User ID:", userId);
      axios
        .get(`${apiUrl}/users/${userId}`)
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
          console.log("Error retrieving users", error);
        });
    };

    fetchUsers();
  }, [setUserId]);

  const handleLogout = async () => {
    // Implement your logout logic here
    // Clear AsyncStorage, navigate to the login screen, etc.
    await AsyncStorage.removeItem("authToken");
    navigation.replace("Login");
  };

  return (
    <View>
      <View style={{ padding: 10 }}>
        {users.map((item, index) => (
          <User key={index} item={item} />
        ))}
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  logoutButton: {
    padding: 8,
    borderRadius: 8,
  },
});
