import { Image, Pressable, Text, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { formatDistanceToNowStrict } from "date-fns";
import { Link } from "expo-router";

import AntDesign from '@expo/vector-icons/AntDesign';

type Post = {
  id: string;
  title: string;
  description?: string;
  image?: string;
  created_at: string;
  group: {
    name: string;
    image: string;
  };
  upvotes: { sum: number }[];
  nr_of_comments?: { count: number }[];
};

type PostListItemProps = {
  post: Post;
  isDetailedPost?: boolean;
};

export default function PostListItem({
  post,
  isDetailedPost,
}: PostListItemProps) {
  const isUpvoted = false; // Static value
  const isDownvoted = false; // Static value

  const shouldShowImage = isDetailedPost || post.image;
  const shouldShowDescription = isDetailedPost || !post.image;

  return (
    <></>
    // <Link href={`/post/${post.id}`} asChild>
    //   <Pressable className="px-4 py-3 bg-white border-b border-gray-300">
    //     {/* HEADER */}
    //     <View className="flex-row items-center">
    //       <Image
    //         source={{ uri: post.group?.image || "https://via.placeholder.com/20" }}
    //         className="w-5 h-5 rounded-full mr-2"
    //       />
    //       <View>
    //         <View className="flex-row space-x-2">
    //           <Text className="font-bold text-sm text-gray-800">
    //             {post.group?.name || "Unknown Group"}
    //           </Text>
    //           <Text className="text-sm text-gray-500">
    //             {formatDistanceToNowStrict(new Date(post.created_at))}
    //           </Text>
    //         </View>
    //         {isDetailedPost && (
    //           <Text className="text-sm text-blue-600">John Doe</Text>
    //         )}
    //       </View>
    //       <Pressable
    //         onPress={() => console.log("Join button pressed")}
    //         className="ml-auto bg-blue-800 rounded px-2 py-1"
    //       >
    //         <Text className="text-white text-xs font-bold">Join</Text>
    //       </Pressable>
    //     </View>

    //     {/* CONTENT */}
    //     <Text className="font-bold text-lg mt-2">{post.title}</Text>
    //     {shouldShowDescription && post.description && (
    //       <Text
    //         className={`text-sm mt-1 ${
    //           isDetailedPost ? "" : "line-clamp-4"
    //         }`}
    //       >
    //         {post.description}
    //       </Text>
    //     )}

    //     {/* FOOTER */}
    //     <View className="flex-row mt-3">
    //       <View className="flex-row space-x-4">
    //         <View className="flex-row items-center space-x-2">
    //           <MaterialCommunityIcons
    //             onPress={() => console.log("Upvote pressed")}
    //             name={isUpvoted ? "arrow-up-bold" : "arrow-up-bold-outline"}
    //             size={19}
    //             color={isUpvoted ? "crimson" : "black"}
    //           />
    //           <Text className="font-medium text-gray-700">
    //             {post.upvotes[0]?.sum || 0}
    //           </Text>
    //           <View className="w-px h-3 bg-gray-300 mx-2" />
    //           <MaterialCommunityIcons
    //             onPress={() => console.log("Downvote pressed")}
    //             name={
    //               isDownvoted ? "arrow-down-bold" : "arrow-down-bold-outline"
    //             }
    //             size={19}
    //             color={isDownvoted ? "crimson" : "black"}
    //           />
    //         </View>
    //         <View className="flex-row items-center space-x-2">
    //           <MaterialCommunityIcons
    //             name="comment-outline"
    //             size={19}
    //             color="black"
    //           />
    //           <Text className="font-medium text-gray-700">
    //             {post.nr_of_comments?.[0]?.count || 0}
    //           </Text>
    //         </View>
    //       </View>
    //       <View className="ml-auto flex-row space-x-4">
    //         <MaterialCommunityIcons
    //           name="trophy-outline"
    //           size={19}
    //           color="black"
    //         />
    //         <MaterialCommunityIcons
    //           name="share-outline"
    //           size={19}
    //           color="black"
    //         />
    //       </View>
    //     </View>
    //   </Pressable>
    // </Link>
  );
}
