import { FlatList, Image, Pressable, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const messages = [
    { id: 1, content: "Hey !", owner: "Théonar", time: "12:00" },
    { id: 2, content: "Hello", owner: "You", time: "12:01" },
    { id: 3, content: "How are you ?", owner: "Théonar", time: "12:02" },
    { id: 4, content: "I'm fine, thanks !", owner: "You", time: "12:03" },
    { id: 5, content: "Do you want to play a game ?", owner: "Théonar", time: "12:04" },
    { id: 6, content: "Yes, let's play !", owner: "You", time: "12:05" },
    { id: 7, content: "What game do you want to play ?", owner: "You", time: "12:06" },
    { id: 8, content: "League of Legends ?", owner: "Théonar", time: "12:07" },
    { id: 9, content: "Okay, fine !", owner: "You", time: "12:08" },
    { id: 10, content: "Let's go !", owner: "Théonar", time: "12:09" },
    { id: 11, content: "I'm going to invite you", owner: "Théonar", time: "12:10" },
    { id: 12, content: "Okay, I'm waiting", owner: "You", time: "12:11" },
];

const MessageCard = ({ message, index }) => {
    const uri = index % 2 === 0
        ? "https://i.pinimg.com/originals/ef/a2/8d/efa28d18a04e7fa40ed49eeb0ab660db.jpg"
        : "https://github.com/shadcn.png";

    return (
        <View className="w-full p-4 flex-row items-center gap-x-4 border-b-[1px] border-neutral-800">
            <Image className="w-12 h-12 rounded-full" source={{ uri }} />
            <View className="flex-col">
                <View className="flex-row gap-x-4 items-center">
                    <Text className="text-white text-lg font-semibold">{message.owner}</Text>
                    <Text className="text-gray-400 text-sm">{message.time}</Text>
                </View>
                <Text className="text-sm text-gray-400">{message.content}</Text>
            </View>
        </View>
    );
};

export default function Conversation() {
    const insets = useSafeAreaInsets();

    return (
        <View className="h-full w-full flex-1">
            <FlatList
                data={messages}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => <MessageCard message={item} index={index} />}
                contentContainerStyle={{ paddingBottom: 100 }}
            />
            <View className="absolute bottom-0 w-full p-4 bg-neutral-900 border-t-[1px] border-neutral-800 flex-row items-center justify-center gap-x-2">
                <TextInput
                    className="flex-1 bg-neutral-800 text-white p-3 rounded-lg"
                    placeholder="Write a message..."
                    placeholderTextColor="#888"
                    style={{ marginBottom: insets.bottom }}
                />
                <Pressable style={{ marginBottom: insets.bottom }} className="p-2 flex justify-center items-center bg-blue-600 rounded-3xl">
                    <Text className="text-white">Send</Text>
                </Pressable>
            </View>
        </View>
    );
}
