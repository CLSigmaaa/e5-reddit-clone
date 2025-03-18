import { Text } from "~/components/ui/text"
import { FlatList } from 'react-native';
import { Post } from "~/components/Post";
import { sub } from "date-fns";


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

export default function Home() {
    return (
        <FlatList
            data={posts}
            renderItem={({ item }) => <Post post={item} />}
        />
    )
}