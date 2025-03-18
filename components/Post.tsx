import { useState } from 'react';
import { Image, View, Pressable } from 'react-native';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '~/components/ui/card';
import { Text } from '~/components/ui/text';
import { Button } from './ui/button';

type Post = {
    id: number;
    title: string;
    description: string;
    voteCount: number;
    subReddit: string;
    comments: Comment[];
    createdBy: string;
    isModified: boolean;
};

import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';

export const Post = ({ post }) => {
    const [voteState, setVoteState] = useState<'upvoted' | 'downvoted' | null>(null);
    const [voteCount, setVoteCount] = useState(post.voteCount);
    const [isJoined, setIsJoined] = useState(false); // State to track join status

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

    const handleJoin = () => {
        setIsJoined(!isJoined); // Toggle join state
    };

    return (


        <Card className="w-full mb-4">
            <CardHeader>
                <View className="flex-row justify-between items-center">
                    <View className="flex-row items-center gap-x-1">
                        <Image source={{ uri: "https://github.com/shadcn.png" }} className="w-6 h-6 rounded-full mr-2" />
                        {/* post.subReddit.id */}
                        <Link href={`/subreddit/${post.id}`}>
                            <Text className="text-sm text-gray-500">r/{post.subReddit}</Text>
                        </Link>
                        {/* </Link> */}
                    </View>
                    <Pressable
                        onPress={handleJoin}
                        className={`px-4 py-2 rounded-full ${isJoined ? 'bg-white border border-gray-300' : 'bg-blue-600'
                            }`}
                    >
                        <Text className={`text-sm font-bold ${isJoined ? 'text-gray-600' : 'text-white'}`}>
                            {isJoined ? 'Joined' : 'Join'}
                        </Text>
                    </Pressable>
                </View>
                <CardTitle className="text-lg font-bold mt-1">{post.title}</CardTitle>
            </CardHeader>
            <Link href={`/post/${post.id}`}>
                <CardContent>
                    <CardDescription>
                        <Text numberOfLines={1} ellipsizeMode="tail" className="text-gray-400">
                            {post.description}
                        </Text>
                    </CardDescription>
                </CardContent>
            </Link>
            <CardFooter className="flex gap-x-4 items-center mt-4">
                {/* Upvote/Downvote Section */}
                <View className="bg-gray-700 p-2 rounded-2xl flex-row gap-x-2 items-center">
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
                <View className="bg-gray-700 p-2 rounded-2xl flex-row gap-x-2 items-center">
                    <Ionicons name="chatbubble-outline" size={16} color="white" />
                    <Text className="text-sm text-white">{post.comments?.length}</Text>
                </View>
            </CardFooter>
        </Card>
    );
};