import { Link, useLocalSearchParams } from "expo-router";
import { Image, Pressable, View } from "react-native";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { H1, H2, H3, Muted } from "~/components/ui/typography";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '~/components/ui/card';
import { cn } from "~/lib/utils";
import { FlatList } from "react-native";
import { Post } from "~/components/Post";

const posts = [
    {
        id: "1",
        title: "Sample Post Title",
        description: "This is a sample post description. It can be long or short. In this case, it is very long to demonstrate the layout. However, it can be any length. To provide a better user experience, it is recommended to keep it short and concise. Here is some more text to make it even longer. We can add more text if needed.",
        subReddit: "Sample_Subreddit",
        voteCount: 123,
        comments: [
            { id: 1 },
            { id: 2 }
        ]
    },
    {
        id: "2",
        title: "Another Post Title",
        subReddit: "Another_Subreddit",
        description: "This is another sample post description.",
        created_at: "2023-01-01T12:00:00Z",
        group: {
            name: "Another Group",
            image: "https://source.unsplash.com/random/800x600",
        },
        upvotes: [{ sum: 456 }],
        nr_of_comments: [{ count: 20 }],
    },
];

const subReddit = {
    id: "1",
    name: "reactjs",
    description: "A community for learning and developing web applications using React.",
    subscribers: [
        { id: 1, name: "John Doe", role: "default" },
        { id: 2, name: "Jane Doe", role: "moderator" },
    ],
    posts: [
        {
            id: 1,
            title: "React 18 is out!",
            description: "React 18 has been released. Check out the new features and improvements.",
            voteCount: 100,
            comments: [
                { id: 1, text: "Great news!" },
                { id: 2, text: "I can't wait to try it out." },
            ],
            createdBy: "John Doe",
            isModified: false,
        },
        {
            id: 2,
            title: "React Navigation v6 released",
            description: "React Navigation v6 has been released. Check out the new features and improvements.",
            voteCount: 50,
            comments: [
                { id: 1, text: "Awesome!" },
                { id: 2, text: "I'm excited to upgrade." },
            ],
            createdBy: "Jane Doe",
            isModified: false,
        },
    ],

}

const formatNumberOfSubscribers = (subscribers: { id: number, name: string, role: string }[]) => {
    const count = subscribers.length;
    if (count >= 1_000_000) {
        return `${(count / 1_000_000).toFixed(1)}M members`;
    } else if (count >= 1_000) {
        return `${(count / 1_000).toFixed(1)}K members`;
    } else {
        return `${count} members`;
    }
};

export default function Subreddit() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [isJoined, setIsJoined] = useState(false);

    const [activeTab, setActiveTab] = useState("posts");

    const handleJoin = () => {
        setIsJoined(!isJoined); // Toggle join state
    };

    return (
        <View className="flex-col gap-y-4">
            <View className="w-full h-60 flex-col px-8 gap-y-6 justify-center border-b-[1px] border-neutral-800">
                <View className="flex-row gap-x-4">
                    <Image
                        source={{ uri: "https://i.pinimg.com/originals/ef/a2/8d/efa28d18a04e7fa40ed49eeb0ab660db.jpg" }}
                        className="rounded-full w-14 h-14"
                    />
                    <View className="flex-col">
                        <H3>r/reactjs</H3>
                        <Muted>{formatNumberOfSubscribers(subReddit.subscribers)}</Muted>
                    </View>
                </View>
                <View className="flex-row gap-x-4">
                    <Link href='/create' asChild>
                        <Button className="rounded-2xl flex-row gap-x-2 items-center" variant="secondary">
                            <AntDesign name="plus" size={24} color="white" />
                            <Text>Make a new post</Text>
                        </Button>
                    </Link>
                    <Pressable
                        onPress={handleJoin}
                        className={`px-4 py-2 rounded-full flex items-center justify-center ${isJoined ? 'bg-white border border-gray-300' : 'bg-blue-600'
                            }`}
                    >
                        <Text className={`text-sm font-bold ${isJoined ? 'text-gray-600' : 'text-white'}`}>
                            {isJoined ? 'Joined' : 'Join'}
                        </Text>
                    </Pressable>
                </View>
            </View>
            <View className="px-4">
                <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="w-full gap-y-4"
                >
                    <TabsList className='flex-row w-full bg-transparent'>
                        <TabsTrigger value="posts" className={cn('flex-1 rounded-xl p-2 h-12', activeTab === 'posts' ? 'bg-neutral-800' : 'bg-transparent')}>
                            <Text>Posts</Text>
                        </TabsTrigger>
                        <TabsTrigger value="about" className={cn('flex-1 rounded-xl p-2 h-12', activeTab === 'about' ? 'bg-neutral-800' : 'bg-transparent')}>
                            <Text>About</Text>
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="about">
                        <View className="p-4">
                            <Card className="w-full">
                                <CardHeader>
                                    <H2>About r/reactjs</H2>
                                </CardHeader>
                                <CardContent>
                                    <Text className="text-gray-500">{subReddit.description}</Text>
                                </CardContent>
                            </Card>
                        </View>
                    </TabsContent>
                    <TabsContent value="posts">
                        <FlatList
                            data={posts}
                            renderItem={({ item }) => <Post post={item} />}
                        />
                    </TabsContent>
                </Tabs>
            </View>
        </View>
    )
}