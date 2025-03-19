import { Text } from "~/components/ui/text"
import { FlatList } from 'react-native';
import { Post } from "~/components/Post";
import { sub } from "date-fns";
import useSWR from 'swr';

const posts = [
    {
        id: "1",
        title: "Bleach Rebirth Of Souls Gameplay Reveal",
        description: "Bleach: Rebirth of Souls is an upcoming action RPG based on the popular anime and manga series Bleach. The game is being developed by KLabGames and will be released on iOS and Android devices. The game features 3D graphics and real-time combat, with players able to control their favorite characters from the series. The game will also feature a story mode, where players can relive key moments from the series, as well as a multiplayer mode where they can team up with other players to take on powerful bosses. The game is set to be released in 2023.",
        subReddit: "Bleach",
        voteCount: 123,
        imageUrl: 'https://cdn.dlcompare.com/others_jpg/upload/news/image/premier-apercu-du-nouveau-gamepl-14b56e52-image-443086e38.jpg.webp',
        comments: [
            { id: 1 },
            { id: 2 }
        ]
    },
    {
        id: "2",
        title: "Solo Leveling Anime Adaptation Announced",
        subReddit: "Solo_Leveling",
        description: "Solo Leveling is a popular Korean web novel written by Chu-Gong. The story follows Sung Jin-Woo, a weak hunter who becomes the strongest hunter after a mysterious event grants him the powers of a player in a video game. The novel has gained a large following since it was first published in 2016, and has been praised for its action-packed story and well-developed characters. The announcement of an anime adaptation has been met with excitement from fans, who are eager to see their favorite characters brought to life on the screen.",
        voteCount: 123,
        comments: [
            { id: 1 },
            { id: 2 },
            { id: 3 },
            { id: 4 },
        ]
    },
    {
        id: "3",
        title: "New Trailer for Elden Ring Released",
        subReddit: "Elden_Ring",
        description: "Elden Ring is an upcoming action RPG developed by FromSoftware and published by Bandai Namco Entertainment. The game is being directed by Hidetaka Miyazaki, the creator of the Dark Souls series, and features an open-world setting with a focus on exploration and combat. The game is set in the world of the Lands Between, a land ruled by four demigods known as the Elden Lords. Players will take on the role of a Tarnished, an outcast who must journey across the Lands Between to become the Elden Lord and restore order to the world. The game is set to be released on February 25, 2022, for PlayStation, Xbox, and PC.",
        voteCount: 12,
        comments: [
            { id: 1 },
            { id: 2 },
            { id: 3 },
            { id: 4 },
            { id: 5 },
            { id: 6 },
            { id: 7 },
            { id: 8 },
        ]
    },
    {
        id: "4",
        title: "React 18 is out!",
        subReddit: "Reactjs",
        description: "React 18 has been released. Check out the new features and improvements.",
        voteCount: 100,
        comments: [

        ]
    },
    {
        id: "5",
        title: "Shadcn is the best!",
        subReddit: "Shadcn",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhURy69WRNL33k_HnS9Y71H2DmGQWs-hh-l_qAzO_1aYNPn7m_6QE_2ly_AWCmZXUlIQhbhfE99r5KFZ5f_xIgnE18DQ2gIdOcVUIORMusbFR227vkfN7pV0Ra0NOblfm_ojihqg07D08AZ0DlHQXjS6B411X6hzgrhhONTV6rD_QAiKUyQ75p3WDljsiQg/s16000-rw/ShaDCN%20UI.webp",
        voteCount: 12,
        comments: [
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {}
        ]

    }
];



export default function Home() {
    return (
        <FlatList
            data={posts}
            renderItem={({ item }) => <Post post={item} isDetailed={false} />}
        />
    )
}