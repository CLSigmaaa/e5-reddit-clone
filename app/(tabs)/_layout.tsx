import { Link, Tabs } from "expo-router";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Pressable, View, Text, StyleSheet, Image, useColorScheme, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useSWR from "swr";
import { Scroll } from "lucide-react-native";

const LeftDrawer = createDrawerNavigator(); // Drawer for the left menu
const RightDrawer = createDrawerNavigator(); // Drawer for the right user menu

function CustomDrawerContent() {
  const insets = useSafeAreaInsets();
  const fetcher = (...args) => fetch(...args).then((res) => res.json())
  const { data, error, isLoading } = useSWR(`${process.env.EXPO_PUBLIC_API_URL}/subreddits`, fetcher)

  // console.log(data)
  console.log(error)

  return (
    <View style={[styles.drawerContent, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <Text className="font-bold text-2xl text-gray-300">Your communities</Text>
      <Link href="/subreddit/create">
        <Text className="text-white">Créer</Text>
      </Link>

      <ScrollView>
        {data?.map((subreddit) => (
          <Link href={`/subreddit/${subreddit.id}`} key={subreddit.id}>
            <Image source={{ uri: "https://i.pinimg.com/originals/ef/a2/8d/efa28d18a04e7fa40ed49eeb0ab660db.jpg" }} className="w-6 h-6 rounded-full" />
            <Text className="text-white">{subreddit.name}</Text>
          </Link>
        ))}
      </ScrollView>
    </View>
  );
}

function UserDrawerContent() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.drawerContent, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <Text className="text-white">User Menu</Text>
      <Text className="text-white">Profile</Text>
      <Text className="text-white">Settings</Text>
      <Text className="text-white">Logout</Text>
    </View>
  );
}

function TabLayout({ navigation }) {
  const insets = useSafeAreaInsets();
  const isLoggedIn = true; // Replace with actual authentication state

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FF5700",
        headerStyle: { height: 56 + insets.top }, // Adjust height for safe area
        headerLeft: () => (
          <Pressable onPress={() => navigation.getParent("LeftDrawer")?.openDrawer()} style={{ marginLeft: 16 }}>
            <Feather name="menu" size={24} color="#FF5700" />
          </Pressable>
        ),
        headerRight: () => (
          isLoggedIn ? (
            <Pressable onPress={() => navigation.getParent("RightDrawer")?.openDrawer()} style={{ marginRight: 16 }}>
              <Image
                source={{ uri: "https://github.com/shadcn.png" }} // Replace with user's avatar URL
                style={{ width: 32, height: 32, borderRadius: 16 }}
              />
            </Pressable>
          ) : (
            <Pressable onPress={() => console.log("Login pressed")} style={{ marginRight: 16 }}>
              <AntDesign name="login" size={24} color="#FF5700" />
            </Pressable>
          )
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Reddit",
          title: "Home",
          headerTintColor: "#FF5700",
          tabBarIcon: ({ color }) => <AntDesign name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          headerTitle: "Reddit",
          title: "",
          headerTintColor: "#FF5700",
          tabBarIcon: ({ color }) => <AntDesign name="plus" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          headerTitle: "Reddit",
          title: "Chats",
          headerTintColor: "#FF5700",
          tabBarIcon: ({ color }) => <Ionicons name="chatbubble-ellipses-outline" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}

export default function AppLayout() {
  const colorScheme = useColorScheme(); // Detect the current theme (light or dark)

  return (
    <LeftDrawer.Navigator
      id="LeftDrawer" // Assign an ID to the left drawer
      drawerContent={() => <CustomDrawerContent />}
      screenOptions={{
        drawerPosition: "left", // Open the drawer from the left
        drawerStyle: {
          backgroundColor: colorScheme === "dark" ? "#1c1c1e" : "#fff", // Adapt to dark mode
          width: 240,
        },
      }}
    >
      <LeftDrawer.Screen
        name="Main"
        options={{ headerShown: false }}
      >
        {() => (
          <RightDrawer.Navigator
            id="RightDrawer" // Assign an ID to the right drawer
            drawerContent={() => <UserDrawerContent />}
            screenOptions={{
              drawerPosition: "right", // Open the drawer from the right
              drawerStyle: {
                backgroundColor: colorScheme === "dark" ? "#1c1c1e" : "#fff", // Adapt to dark mode
                width: 240,
              },
            }}
          >
            <RightDrawer.Screen
              name="Tabs"
              component={TabLayout}
              options={{ headerShown: false }}
            />
          </RightDrawer.Navigator>
        )}
      </LeftDrawer.Screen>
    </LeftDrawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    paddingHorizontal: 16,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  menuOption: {
    marginBottom: 8,
  },
});