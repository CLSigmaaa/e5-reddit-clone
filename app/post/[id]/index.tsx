import { useState, useRef, useCallback, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Image,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Post } from "~/components/Post";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Button } from "~/components/ui/button";
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Input } from "~/components/ui/input";

const comments = [
  {
    id: "1",
    content: "This is the first comment.",
    voteCount: 10,
    childComments: [
      {
        id: "1.1",
        content: "This is a reply to the first comment.",
        voteCount: 5,
        childComments: [
          {
            id: "1.1.1",
            content: "This is a reply to the reply.",
            voteCount: 2,
            childComments: [],
          },
        ],
      },
    ]
  },
  {
    id: "2",
    content: "This is the second comment.",
    voteCount: 5,
    childComments: [],
  },
]

const CommentCard = ({ comment, level = 0 }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [reply, setReply] = useState("");

  const [voteState, setVoteState] = useState<'upvoted' | 'downvoted' | null>(null);
  const [voteCount, setVoteCount] = useState(comment.voteCount);

  const handleUpvote = () => {
    if (voteState === 'upvoted') {
      setVoteState(null);
      setVoteCount(voteCount - 1);
    } else {
      setVoteState('upvoted');
      setVoteCount(voteState === 'downvoted' ? voteCount + 2 : voteCount + 1);
    }
  };

  const handleDownvote = () => {
    if (voteState === 'downvoted') {
      setVoteState(null);
      setVoteCount(voteCount + 1);
    } else {
      setVoteState('downvoted');
      setVoteCount(voteState === 'upvoted' ? voteCount - 2 : voteCount - 1);
    }
  };

  const handleReply = () => {
    console.log("Reply:", reply);
    setIsReplying(false);
    setReply("");
  };

  return (
    <Card style={{ marginLeft: level * 20, marginTop: 16 }}>
      <CardHeader>
        <View style={{ flexDirection: "row", alignItems: "center" }} className="gap-x-1">
          <Image source={{ uri: "https://github.com/shadcn.png" }} className="w-6 h-6 rounded-full mr-2" />
          <Text className="text-sm text-gray-500">User</Text>
        </View>
      </CardHeader>
      <CardContent>
        {/* Explicitly set the text color */}
        <Text className="text-gray-400">{comment.content}</Text>
        {isReplying && (
          <View className="flex-row items-center mt-2">
            <Input
              value={reply}
              onChangeText={setReply}
              placeholder="Write a reply..."
              className="flex-1 border border-gray-300 rounded-md p-2 text-gray-400"
            />
            <Button onPress={handleReply} className="ml-2">
              <Text>Post</Text>
            </Button>
          </View>
        )}
      </CardContent>
      <CardFooter className="gap-x-2">
        {/* Upvote/Downvote Section */}
        <View className="bg-gray-700 p-2 rounded-2xl flex-row gap-x- items-center">
          <Pressable onPress={handleUpvote}>
            <AntDesign
              name="arrowup"
              size={16}
              color={voteState === 'upvoted' ? 'orange' : 'white'}
            />
          </Pressable>
          <Text className="text-sm text-white">{voteCount}</Text>
          <Pressable onPress={handleDownvote}>
            <AntDesign
              name="arrowdown"
              size={16}
              color={voteState === 'downvoted' ? 'blue' : 'white'}
            />
          </Pressable>
        </View>
        {/* Comments Section */}
        <Pressable className="bg-gray-700 p-2 rounded-2xl flex-row gap-x-2 items-center" onPress={() => setIsReplying(true)}>
          <Ionicons name="chatbubble-outline" size={16} color="white" />
          <Text className="text-sm text-white">Répondre</Text>
        </Pressable>
      </CardFooter>
      {comment.childComments.map((childComment) => (
        <CommentCard key={childComment.id} comment={childComment} level={level + 1} />
      ))}
    </Card>
  );
};

export default function DetailedPost() {
  const insets = useSafeAreaInsets();
  const flatListRef = useRef<FlatList>(null); // Ref for FlatList

  const post = {
    id: "1",
    title: "Bleach Rebirth Of Souls Gameplay Reveal",
    description: "Bleach: Rebirth of Souls is an upcoming action RPG based on the popular anime and manga series Bleach. The game is being developed by KLabGames and will be released on iOS and Android devices. The game features 3D graphics and real-time combat, with players able to control their favorite characters from the series. The game will also feature a story mode, where players can relive key moments from the series, as well as a multiplayer mode where they can team up with other players to take on powerful bosses. The game is set to be released in 2023.",
    subReddit: "Bleach",
    voteCount: 123,
    imageUrl: 'https://cdn.dlcompare.com/others_jpg/upload/news/image/premier-apercu-du-nouveau-gamepl-14b56e52-image-443086e38.jpg.webp',
    comments: [
      { id: 1 },
      { id: 2 }
    ]
  };
  return (
    <FlatList
      ref={flatListRef} // Attach the ref to FlatList
      data={comments}
      renderItem={({ item }) => <CommentCard comment={item} />}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <Post post={post} />
      }
      contentContainerStyle={{ paddingBottom: insets.bottom }}
      keyboardShouldPersistTaps="handled"
    />
  );
}