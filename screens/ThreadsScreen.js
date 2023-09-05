import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import React from "react";

const ThreadsScreen = () => {
  return (
    <SafeAreaView style={{ padding: 10 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          padding: 10,
        }}
      >
        <Image
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            resizeMode: "contain",
          }}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/128/149/149071.png",
          }}
        />
        <Text
          style={{
            fontSize: 15,
            fontWeight: 500,
          }}
        >
          Name
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ThreadsScreen;

const styles = StyleSheet.create({});
