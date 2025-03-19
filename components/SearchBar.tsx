import React, { useState } from "react";
import { View, TextInput, FlatList, Text, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from "react-native";
import { Search } from "lucide-react-native"; // Lucide for icons
// import { Card } from "react-native-paper"; // For styling results

const SearchBar = () => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);

  // Sample data
  const allPosts = ["React Native is awesome", "Reddit clone project", "Search bar feature", "Native mobile dev", "Lucide icons in React Native"];

  const handleSearch = (text: string) => {
    setQuery(text);
    if (text.trim() === "") {
      setResults([]);
    } else {
      setResults(allPosts.filter((post) => post.toLowerCase().includes(text.toLowerCase())));
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ padding: 10 }}>
        {/* Search Icon */}
        {!searchVisible ? (
          <TouchableOpacity onPress={() => setSearchVisible(true)} style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
            <Search size={24} color="black" />
            <Text style={{ marginLeft: 10, fontSize: 16, color: "gray" }}>Search...</Text>
          </TouchableOpacity>
        ) : (
          // Expanded Search Input
          <TextInput
            autoFocus
            placeholder="Search posts..."
            value={query}
            onChangeText={handleSearch}
            style={{
              backgroundColor: "#f0f0f0",
              padding: 10,
              borderRadius: 10,
              fontSize: 16,
            }}
          />
        )}

        {/* Search Results */}
        {searchVisible && results.length > 0 && (
          <FlatList
            data={results}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={{ marginVertical: 5, padding: 10 }}>
                <Text>{item}</Text>
              </View>
            )}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SearchBar;
