import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '~/components/ui/select';

import AntDesign from '@expo/vector-icons/AntDesign';

import { Post } from '~/components/Post';
import { FlatList, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
    }
]

export default function History() {
    const insets = useSafeAreaInsets();
    const contentInsets = {
        top: insets.top,
        bottom: insets.bottom,
        left: 12,
        right: 12,
    };
    return (
        <View className='flex-col'>
            <View className='bg-neutral-900 p-2'>
                <Select className='bg-transparent' defaultValue={{ value: 'upvoted', label: 'Upvoted' }}>
                    <SelectTrigger className='w-[150px] bg-transparent border-0'>
                        <SelectValue
                            className='text-foreground text-sm native:text-lg'
                            placeholder='Select a fruit'
                        />
                    </SelectTrigger>
                    <SelectContent insets={contentInsets} className='w-[150px]'>
                        <SelectGroup>
                            <SelectItem value="recent" label='Recent'>
                                <AntDesign name="clockcircleo" size={24} color="white" />
                                Recent
                            </SelectItem>
                            <SelectItem value="upvoted" label='Upvoted'>Upvoted</SelectItem>
                            <SelectItem value="downvoted" label='Downvoted'>Downvoted</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </View>

            <FlatList
                data={posts}
                renderItem={({ item }) => <Post post={item} isDetailed={false} />}
                keyboardShouldPersistTaps="handled"
            />

        </View>
    )
}