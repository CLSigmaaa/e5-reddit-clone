import {
    ScrollView,
    View,
    Image,
    Pressable,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import { Text } from "~/components/ui/text";
import { H3 } from "~/components/ui/typography";
import { useState } from "react";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { mutate } from "swr";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";

export default function CreateSubreddit() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [icon, setIcon] = useState<string | null>(null);

    const handlePickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            alert("Permission to access gallery is required!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setIcon(result.assets[0].uri);
        }
    };

    const handlePublish = async () => {
        const formData = new FormData();
        formData.append("subreddit", 
            JSON.stringify({
                name: name,
                description: description,
            })
        );

    
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/subreddits`, {
            method: "POST",
            body: formData,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        const data = await response.json();
        console.log(data);
        mutate(`${process.env.EXPO_PUBLIC_API_URL}/subreddits`);
        // console.log(data);
        router.push("/");
    };

    return (
        <SafeAreaView className="flex-1">
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1"
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View className="w-full gap-y-4 p-4">
                        <H3>Make a new SubReddit</H3>
                        <View className="flex-row items-center gap-x-4">
                            {icon && (
                                <Image
                                    source={{ uri: icon }}
                                    style={{ width: 50, height: 50, borderRadius: 25 }}
                                />
                            )}
                            <Input
                                value={name}
                                onChangeText={setName}
                                placeholder="Title"
                                className="flex-1"
                            />
                        </View>
                        <Pressable
                            onPress={handlePickImage}
                            className="bg-blue-600 px-4 py-2 rounded-full mt-4"
                        >
                            <Text className="text-center text-lg">
                                {icon ? "Change Icon" : "Choose Icon"}
                            </Text>
                        </Pressable>
                        <Textarea
                            value={description}
                            onChangeText={setDescription}
                            placeholder="What's on your mind?"
                            style={{ height: 200 }}
                        />
                        <Pressable
                            onPress={handlePublish}
                            className="bg-green-600 px-4 py-2 rounded-full mt-4"
                        >
                            <Text className="text-center text-lg text-white">Submit</Text>
                        </Pressable>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}