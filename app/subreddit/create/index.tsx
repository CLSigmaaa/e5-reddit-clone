import { ScrollView, View, Image, Pressable, SafeAreaView } from "react-native";
import { Text } from "~/components/ui/text";
import { H3 } from "~/components/ui/typography";
import { useState } from "react";
import { Input } from "~/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import * as ImagePicker from "expo-image-picker";
import { Textarea } from "~/components/ui/textarea";

const subReddits = [
    "r/AskReddit",
    "r/aww",
    "r/funny",
    "r/gaming",
    "r/movies",
    "r/music",
    "r/news",
    "r/pics",
    "r/science",
    "r/sports",
    "r/technology",
    "r/worldnews",
];

export default function CreateSubreddit() {
    const [titleValue, setTitleValue] = useState("");
    const [textValue, setTextValue] = useState("");



    const handlePublish = () => {
        // Publish the post
        console.log({
            title: titleValue,
            text: textValue,
        });
    }

    return (
        <SafeAreaView className="flex-1">
            <View className="w-full gap-y-4">
                <H3>Make a new SubReddit</H3>
                <View className="w-[75vw] flex justify-center">
                </View>
                <Input
                    value={titleValue}
                    onChangeText={setTitleValue}
                    placeholder="Title"
                />

                <Textarea
                    value={textValue}
                    onChangeText={setTextValue}
                    placeholder="What's on your mind?"
                    style={{ height: 200 }}
                />
            </View>
            <View className="absolute bottom-0 w-full p-4">
                <Pressable
                    onPress={handlePublish}
                    className="bg-blue-600 px-4 py-2 rounded-full"
                >
                    <Text className="text-white text-center text-lg">Publish</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}