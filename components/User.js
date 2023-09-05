import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useContext } from "react";
import axios from "axios";
import { UserType } from "../context/UserContext";
import { Image } from "expo-image";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const User = ({
  user: { name, _id, receivedFollowRequests, profilePicture },
}) => {
  const { userId } = useContext(UserType);

  const handleSendFollowRequest = (id) => {
    const data = {
      currentUser: userId,
      receiveUser: id,
    };

    try {
      axios
        .post("http://localhost:3000/user/send-follow", data)
        .catch((err) => console.log(err, "error sending follow request"));
    } catch (e) {
      console.log(e, "follow request sending error");
    }
  };
  return (
    <View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Image
          source={
            profilePicture ||
            "https://cdn-icons-png.flaticon.com/128/149/149071.png"
          }
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            resizeMode: "contain",
          }}
          placeholder={blurhash}
          contentFit="contain"
          transition={200}
        />
        <Text
          style={{
            fontSize: 15,
            fontWeight: 500,
            flex: 1,
          }}
        >
          {name}
        </Text>
        <TouchableOpacity
          onPress={() => handleSendFollowRequest(_id)}
          style={{
            borderColor: "#D0D0D0",
            borderWidth: 1,
            padding: 10,
            marginLeft: 10,
            width: 100,
            borderRadius: 7,
          }}
        >
          <Text
            style={{ textAlign: "center", fontSize: 15, fontWeight: "bold" }}
          >
            Follow
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default User;
