import { Link } from "expo-router"
import { Image, ScrollView, View } from "react-native"
import { Text } from "~/components/ui/text"

const conversations = [
    {
        id: 1,
        title: "John Doe",
        lastMessage: "Are we still on for the meeting tomorrow?",
        lastMessageOwner: "John"
    },
    {
        id: 2,
        title: "Jane Smith",
        lastMessage: "Thanks for your help earlier!",
        lastMessageOwner: "Jane"
    },
    {
        id: 3,
        title: "Project Team",
        lastMessage: "Let's finalize the presentation by EOD.",
        lastMessageOwner: "Team Lead"
    },
    {
        id: 4,
        title: "Support",
        lastMessage: "Your issue has been resolved. Let us know if you need anything else.",
        lastMessageOwner: "Support"
    },
    {
        id: 5,
        title: "Alice Johnson",
        lastMessage: "Can you review the document I sent?",
        lastMessageOwner: "Alice"
    }
];

const ConversationCard = ({ conversation }) => {
    return (
        <Link href={`/conversation/${conversation.id}`}>
            <View className="w-full p-4 flex-row items-center gap-x-4 border-b-[1px] border-neutral-800">
                <Image className="w-12 h-12 rounded-full" source={{ uri: "https://i.pinimg.com/originals/ef/a2/8d/efa28d18a04e7fa40ed49eeb0ab660db.jpg" }} />
                <View className="flex-col">
                    <Text className="">{conversation.title}</Text>
                    <Text className="text-sm">
                        <Text className="text-gray-400">{conversation.lastMessageOwner}: </Text>
                        {conversation.lastMessage}
                    </Text>
                </View>
            </View>
        </Link>
    )
}

export default function Chat() {
    return (
        <ScrollView className="h-full w-full">
            {conversations.map((conversation) => (
                <ConversationCard conversation={conversation} key={conversation.id} />
            ))}
        </ScrollView>
    )
}