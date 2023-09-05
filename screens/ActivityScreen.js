import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import { UserType } from "../context/UserContext";
import axios from "axios";
import User from "../components/User";

const ActivityScreen = () => {
  const [selectedButton, setSelectedButton] = useState("people");
  const [content, setContent] = useState("people content");
  const [users, setUsers] = useState([]);
  const { setUserId } = useContext(UserType);

  const handleButtonPress = (button) => {
    setSelectedButton(button);
  };

  useEffect(() => {
    const fetchUsers = async (users) => {
      const token = await AsyncStorage.getItem("auth-token");
      const { Userid } = jwt_decode(token);
      setUserId(Userid);
      axios
        .get(`http://localhost:3000/user/${Userid}`)
        .then((response) => {
          setUsers(response.data.users);
        })
        .catch((error) => {
          console.error(error, "error fetching users");
        });
    };
    fetchUsers();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 10 }}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          Activity
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginTop: 12,
          }}
        >
          <TouchableOpacity
            onPress={() => handleButtonPress("all")}
            style={[
              {
                flex: 1,
                paddingVertical: 10,
                paddingHorizontal: 20,
                backgroundColor: "white",
                borderColor: "#D0D0D0",
                borderRadius: 6,
                borderWidth: 0.7,
              },
              selectedButton === "all" && { backgroundColor: "black" },
            ]}
          >
            <Text
              style={[
                { textAlign: "center", fontWeight: "bold" },
                selectedButton === "all" && { color: "white" },
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleButtonPress("people")}
            style={[
              {
                flex: 1,
                paddingVertical: 10,
                paddingHorizontal: 20,
                backgroundColor: "white",
                borderColor: "#D0D0D0",
                borderRadius: 6,
                borderWidth: 0.7,
              },
              selectedButton === "people" && { backgroundColor: "black" },
            ]}
          >
            <Text
              style={[
                { textAlign: "center", fontWeight: "bold" },
                selectedButton === "people" && { color: "white" },
              ]}
            >
              People
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleButtonPress("requests")}
            style={[
              {
                flex: 1,
                paddingVertical: 10,
                paddingHorizontal: 20,
                backgroundColor: "white",
                borderColor: "#D0D0D0",
                borderRadius: 6,
                borderWidth: 0.7,
              },
              selectedButton === "requests" && { backgroundColor: "black" },
            ]}
          >
            <Text
              style={[
                { textAlign: "center", fontWeight: "bold" },
                selectedButton === "requests" && { color: "white" },
              ]}
            >
              Requests
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        alwaysBounceVertical={false}
        style={{
          paddingHorizontal: 10,
        }}
      >
        <View style={{ gap: 15 }}>
          {selectedButton === "people" &&
            users.map((user) => <User user={user} key={user._id} />)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ActivityScreen;

const styles = StyleSheet.create({});
