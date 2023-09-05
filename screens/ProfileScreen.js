import {
  Text,
  View,
  SafeAreaView,
  Pressable,
  Alert,
  ScrollView,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { blurhash } from "../utils/blurHash";
import { UserType } from "../context/UserContext";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import Threads from "../components/Threads";

const profileTabs = [
  {
    name: "Threads",
  },
  {
    name: "Replies",
  },
];

const TopProfile = (profile) => (
  <View>
    <View className="px-3 py-1 flex-row justify-between items-center">
      <MaterialCommunityIcons name="web" size={38} color="black" />
      <MaterialCommunityIcons name="menu" size={32} color="black" />
    </View>
    <View className="flex-row justify-between px-3 items-center py-3">
      <View className="gap-1">
        <Text className="text-2xl font-semibold tracking-wider capitalize">
          {profile?.name}
        </Text>
        <Text className="tracking-wider text-[16px] ">
          {profile?.name?.split(" ").join("_")}
        </Text>
        <View className=" gap-y-1">
          <Text className="font-sm">Dreams 👉 Goals</Text>
          <Text>Dreams 👉 Goals</Text>
        </View>
        <View className="pt-3">
          <Text className="text-[16px] text-gray-500">
            {profile?.followers?.length} Followers
          </Text>
        </View>
      </View>

      <View className="pr-5">
        <Image
          source={profile.profilePicture}
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
          }}
          placeholder={blurhash}
          contentFit="contain"
          transition={200}
        />
      </View>
    </View>
    <View className="flex-row justify-around mt-2">
      <Pressable className="border border-gray-400 px-10 py-1.5 rounded-lg">
        <Text className="text-[16px]">Edit Profile</Text>
      </Pressable>
      <Pressable className="border border-gray-400 px-10 py-1.5 rounded-lg">
        <Text className="text-[16px]">Share Profile</Text>
      </Pressable>
    </View>
  </View>
);

const ProfileScreen = () => {
  const { userId } = useContext(UserType);
  const [profile, setProfile] = useState({});
  const [active, setActive] = useState(profileTabs[0]);
  const [threads, setThreads] = useState([]);

  async function getProfile() {
    axios
      .get(`http://localhost:3000/user/profile/${userId}`)
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Something went wrong while fetching profile");
      });
  }
  async function getThreads() {
    axios
      .get(`http://localhost:3000/user/${userId}/${active.name.toLowerCase()}`)

      .then((res) => {
        setThreads(res.data);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Something went wrong while fetching threads");
      });
  }
  useFocusEffect(
    useCallback(() => {
      getProfile();
      getThreads();
    }, [userId])
  );

  return (
    <SafeAreaView className="bg-white flex-1 ">
      <TopProfile {...profile} />
      <View className="flex-row justify-around mt-5">
        {profileTabs.map((_, idx) => (
          <Pressable
            key={idx}
            onPress={() => setActive(profileTabs[idx])}
            className={`${
              _.name === active.name && "border-b border-b-black"
            } w-1/2 items-center pb-4`}
          >
            <Text
              className={`text-lg text-gray-500 ${
                _.name === active.name && "text-black"
              } `}
            >
              {_.name}
            </Text>
          </Pressable>
        ))}
      </View>
      <Threads threads={threads} />
    </SafeAreaView>
  );
};

export default ProfileScreen;
