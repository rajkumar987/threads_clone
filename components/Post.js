import { Pressable, Text, View } from "react-native";
import React, { useContext } from "react";
import { timeAgo } from "../utils/timesAgo";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign, EvilIcons, Feather } from "@expo/vector-icons";
import { UserType } from "../context/UserContext";
import { Image } from "expo-image";
import { blurhash } from "../utils/blurHash";

const Post = (post) => {
  const { userId } = useContext(UserType);
  return (
    <>
      <Pressable style={{ gap: 8, paddingVertical: 20, flexDirection: "row" }}>
        <View>
          <Image
            source={post.user.profilePicture}
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
            }}
            placeholder={blurhash}
            contentFit="contain"
            transition={200}
          />
          <View
            style={{
              flexGrow: 1,
              borderWidth: 0.5,
              alignSelf: "center",
              borderColor: "gray",
            }}
          ></View>
          <View
            style={{
              width: 20,
              alignItems: "center",
              alignSelf: "center",
              gap: 5,
            }}
          >
            {[1, 2, 3].map((index) => (
              <Image
                key={index}
                source={post.replies[index - 1]?.user.profilePicture}
                style={{
                  width: index * 8,
                  height: index * 8,
                  borderRadius: "50%",
                }}
                placeholder={blurhash}
                contentFit="cover"
                transition={500}
              />
            ))}
          </View>
        </View>
        <View style={{ flexShrink: 1, gap: 8 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                gap: 2,
              }}
            >
              <Text style={{ fontSize: 15, fontWeight: "600" }}>
                {post.user.name?.split(" ").join("_")}
              </Text>
              <Text>
                {post.user?.verified && (
                  <MaterialIcons name="verified" size={16} color="#60a5fa" />
                )}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", gap: 16, alignItems: "center" }}
            >
              <Text style={{ fontWeight: 400, color: "gray", fontSize: 14 }}>
                {timeAgo(post.createdAt)}
              </Text>
              <Entypo name="dots-three-horizontal" size={18} color="gray" />
            </View>
          </View>
          <View>
            <Text style={{ fontSize: 14 }}>{post.content}</Text>
            {post.image && (
              <Image
                source={post.image}
                style={{
                  width: "100%",
                  height: 300,
                  borderRadius: 10,
                }}
                placeholder={blurhash}
                contentFit="contain"
                transition={200}
              />
            )}
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            {post.likes.includes(userId) ? (
              <AntDesign name="heart" size={22} color="red" />
            ) : (
              <AntDesign name="hearto" size={22} color="gray" />
            )}
            <EvilIcons name="comment" size={28} color="black" />
            <AntDesign name="retweet" size={24} color="gray" />
            <Feather name="send" size={22} color="gray" />
          </View>
          <View>
            <Text style={{ color: "gray" }}>
              {post.repliesCount} replies · {post.likesCount} likes
            </Text>
          </View>
        </View>
      </Pressable>
    </>
  );
};

export default Post;

{
  /* <View style={{ gap: 10, flexBasis: 1 }}>


<View>
  <Text style={{ fontSize: 14 }}>{post.content}</Text>
  {post.image && (
    <Image
      source={post.image}
      style={{
        width: "100%",
        height: 300,
        borderRadius: 10,
      }}
      placeholder={blurhash}
      contentFit="contain"
      transition={200}
    />
  )}
</View>
<View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
  {post.likes.some((like) => like._id === userId) ? (
    <AntDesign name="heart" size={22} color="red" />
  ) : (
    <AntDesign name="hearto" size={22} color="gray" />
  )}
  <EvilIcons name="comment" size={28} color="black" />
  <AntDesign name="retweet" size={24} color="gray" />
  <Feather name="send" size={22} color="gray" />
</View>
<View>
  <Text style={{ color: "gray" }}>
    {post.repliesCount} replies · {post.likesCount} likes
  </Text>
</View>
</View> */
}
