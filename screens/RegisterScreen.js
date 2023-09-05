import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const LoginScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const handleRegister = () => {
    const data = {
      name,
      email,
      password,
    };

    axios
      .post("http://localhost:3000/register", data)
      .then((res) => {
        Alert.alert("Successfully registered");
        setEmail("");
        setName("");
        setPassword("");
      })
      .catch((error) => {
        console.log(error, "register failed");
        Alert.alert("Error while registering");
      });
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
      }}
    >
      <View style={{ marginTop: 50, alignItems: "center" }}>
        <Image
          style={{ width: 150, height: 100, resizeMode: "contain" }}
          source={{
            uri: "https://freelogopng.com/images/all_img/1688663386threads-logo-transparent.png",
          }}
        />
        <KeyboardAvoidingView>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 25 }}>
              Register Your Account
            </Text>
          </View>
          <View style={{ marginTop: 40, gap: 30 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                paddingVertical: 5,
                borderRadius: 5,
              }}
            >
              <Ionicons
                style={{ marginLeft: 8 }}
                name="person"
                size={24}
                color="gray"
              />
              <TextInput
                autoCapitalize="none"
                value={name}
                onChangeText={(text) => setName(text)}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: 300,
                  fontSize: 14,
                }}
                placeholderTextColor="gray"
                placeholder="Enter your name"
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                paddingVertical: 5,
                borderRadius: 5,
              }}
            >
              <MaterialIcons
                style={{ marginLeft: 8 }}
                name="email"
                size={24}
                color="gray"
              />
              <TextInput
                autoCapitalize="none"
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: 300,
                  fontSize: 14,
                }}
                placeholderTextColor="gray"
                placeholder="enter your email address"
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                paddingVertical: 5,
                borderRadius: 5,
              }}
            >
              <AntDesign
                style={{ marginLeft: 8 }}
                name="lock"
                size={24}
                color="gray"
              />
              <TextInput
                autoCapitalize="none"
                secureTextEntry
                value={password}
                onChangeText={(text) => setPassword(text)}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  fontSize: 14,
                  width: 300,
                }}
                placeholderTextColor="gray"
                placeholder="enter your password"
              />
            </View>
          </View>

          <Pressable
            onPress={handleRegister}
            style={{
              marginTop: 40,
              marginLeft: "auto",
              marginRight: "auto",
              marginVertical: "auto",
              backgroundColor: "black",
              borderRadius: 6,
              padding: 15,
              width: 200,
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Register
            </Text>
          </Pressable>
          <Pressable
            style={{
              marginTop: 15,
            }}
            onPress={() => navigation.navigate("Login")}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 15,
              }}
            >
              Already have an account? Sign In
            </Text>
          </Pressable>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
