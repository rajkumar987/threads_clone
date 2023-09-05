import { View, Text, ScrollView } from "react-native";
import React from "react";
import Post from "./Post";

const Threads = ({ threads }) => {
  return (
    <ScrollView className="px-3">
      {threads.length > 0 &&
        threads.map((thread) => (
          <View key={thread._id}>
            <Post {...thread} />
            <View className="border-b border-b-gray-200 w-screen"></View>
          </View>
        ))}
    </ScrollView>
  );
};

export default Threads;
