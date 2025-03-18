import { Text } from "~/components/ui/text"
import { FlatList } from 'react-native';
import { Post } from "~/components/Post";
import { sub } from "date-fns";
import useSWR from 'swr';

const posts = [
    {
        id: "1",
        title: "Sample Post Title",
        description: "This is a sample post description. It can be long or short. In this case, it is very long to demonstrate the layout. However, it can be any length. To provide a better user experience, it is recommended to keep it short and concise. Here is some more text to make it even longer. We can add more text if needed.",
        subReddit: "Sample_Subreddit",
        voteCount: 123,
        imageUrl: 'http://172.20.10.4:8080/api/images/code.png',
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
    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const { data: posts, error, isLoading } = useSWR(`${process.env.EXPO_PUBLIC_API_URL}/posts`, fetcher);

    return (
        <FlatList
            data={posts}
            renderItem={({ item }) => <Post post={item} isDetailed={false} />}
        />
    )
}