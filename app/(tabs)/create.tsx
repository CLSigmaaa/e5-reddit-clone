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
import { AntDesign } from "@expo/vector-icons"; // Import AntDesign for the cross icon

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

export default function Create() {
    const [titleValue, setTitleValue] = useState("");
    const [textValue, setTextValue] = useState("");
    const [activeTab, setActiveTab] = useState("text");
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedSubReddit, setSelectedSubReddit] = useState<string>("");

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            alert("Permission to access the gallery is required!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    const handleDeleteImage = () => {
        setSelectedImage(null); // Clear the selected image
    };

    const handlePublish = () => {
        console.log({
            title: titleValue,
            text: textValue,
            image: selectedImage,
        });
    };

    return (
        <SafeAreaView className="flex-1">
            <View className="w-full gap-y-4 p-4">
                <H3>Make a new post</H3>
                <View className="w-[75vw] flex justify-center">
                    <Select
                        className="rounded-full"
                        value={selectedSubReddit}
                        onValueChange={(value) => setSelectedSubReddit(value)}
                    >
                        <SelectTrigger className="rounded-2xl bg-neutral-800">
                            <SelectValue
                                className="text-foreground text-sm native:text-lg"
                                placeholder="Select a SubReddit"
                            />
                        </SelectTrigger>
                        <SelectContent className="w-[75vw]">
                            <View style={{ maxHeight: 240, overflow: "hidden" }}>
                                <ScrollView>
                                    <SelectGroup>
                                        <SelectLabel>SubReddits</SelectLabel>
                                        {subReddits.map((subReddit) => (
                                            <SelectItem
                                                key={subReddit}
                                                value={subReddit}
                                                label={subReddit}
                                            >
                                                {subReddit}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </ScrollView>
                            </View>
                        </SelectContent>
                    </Select>
                </View>
                <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="w-full gap-y-4"
                >
                    <TabsList className="flex-row w-full">
                        <TabsTrigger value="text" className="flex-1">
                            <Text>Text</Text>
                        </TabsTrigger>
                        <TabsTrigger value="image" className="flex-1">
                            <Text>Pics and Video</Text>
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="text" className="gap-y-2">
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
                    </TabsContent>
                    <TabsContent value="image" className="gap-y-2">
                        <Input
                            value={titleValue}
                            onChangeText={setTitleValue}
                            placeholder="Title"
                        />
                        {selectedImage && (
                            <View style={{ position: "relative", marginTop: 20 }}>
                                <Image
                                    source={{ uri: selectedImage }}
                                    style={{
                                        width: "100%",
                                        height: 200,
                                        borderRadius: 10,
                                    }}
                                />
                                <Pressable
                                    onPress={handleDeleteImage}
                                    style={{
                                        position: "absolute",
                                        top: 10,
                                        right: 10,
                                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                                        borderRadius: 15,
                                        padding: 5,
                                    }}
                                >
                                    <AntDesign name="close" size={20} color="white" />
                                </Pressable>
                            </View>
                        )}
                        <Pressable
                            onPress={pickImage}
                            className="bg-blue-600 px-4 py-2 rounded-full"
                        >
                            <Text className="text-white text-center">Pick an Image</Text>
                        </Pressable>
                    </TabsContent>
                </Tabs>
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