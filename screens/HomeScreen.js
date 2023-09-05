import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Alert,
  Pressable,
} from "react-native";
import React, { useEffect, useContext, useState } from "react";
import { UserType } from "../context/UserContext";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import axios from "axios";
import Post from "../components/Post";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { setUserId, userId } = useContext(UserType);
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUsers = async (users) => {
      const token = await AsyncStorage.getItem("auth-token");
      const { Userid } = jwt_decode(token);
      setUserId(Userid);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      axios
        .get("http://localhost:3000/posts")
        .then((response) => {
          setPostData(response.data.posts);
        })
        .catch((err) => {
          Alert.alert("Error Fetching posts");
          console.log(err);
        });
    };
    fetchPosts();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          paddingVertical: 10,
          justifyContent: "center",
          alignItems: "center",
          shadowOffset: 1,
        }}
      >
        <Image
          style={{ width: 50, height: 50, resizeMode: "contain" }}
          source={{
            uri: "https://freelogopng.com/images/all_img/1688663386threads-logo-transparent.png",
          }}
        />
      </View>
      <ScrollView
        style={{
          paddingHorizontal: 10,
        }}
      >
        {postData.map((post) => (
          <Post key={post._id} {...post} />
        ))}
      </ScrollView>
      <Pressable
        onPress={() => navigation.navigate("Create")}
        style={{
          width: 60,
          height: 60,
          borderRadius: "50%",
          backgroundColor: "black",
          position: "absolute",
          bottom: 10,
          right: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 30 }}>+</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default HomeScreen;
