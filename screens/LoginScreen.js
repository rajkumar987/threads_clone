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
import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const handleLogin = async () => {
    const data = {
      email,
      password,
    };

    axios
      .post("http://localhost:3000/login", data)
      .then((res) => {
        AsyncStorage.setItem("auth-token", res.data.token);
        navigation.replace("Main");
      })
      .catch((error) => {
        console.log(error, "login failed");
        Alert.alert("Error while login");
      });
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("auth-token");
        if (token) {
          navigation.replace("Main");
        }
      } catch (error) {
        console.log(error, "Error checking login status");
      }
    };
    checkLoginStatus();
  }, []);
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
              Login to Your Account
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
                  color: "black",
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
                secureTextEntry
                value={password}
                onChangeText={(text) => setPassword(text)}
                style={{
                  color: "black",
                  marginVertical: 10,
                  fontSize: 14,
                  width: 300,
                }}
                autoCapitalize="none"
                placeholderTextColor="gray"
                placeholder="enter your password"
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 12,
            }}
          >
            <Text>Keep me logged in</Text>
            <Text style={{ fontWeight: 500, color: "#007FFF" }}>
              Forgot password
            </Text>
          </View>

          <Pressable
            onPress={handleLogin}
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
              Login
            </Text>
          </Pressable>
          <Pressable
            style={{
              marginTop: 15,
            }}
            onPress={() => navigation.navigate("Register")}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 15,
              }}
            >
              Don't have an account? Sign Up
            </Text>
          </Pressable>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
