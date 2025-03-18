import { View, Text, Pressable } from "react-native";
import { Entypo, Octicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState, memo } from "react";

type Comment = {
  id: string;
  comment: string;
  created_at: string;
  user_id: string;
  upvotes: number;
  replies?: Comment[];
};

type CommentListItemProps = {
  comment: Comment;
  depth: number;
  handleReplyButtonPressed: (commentId: string) => void;
};

const CommentListItem = ({
  comment,
  depth,
  handleReplyButtonPressed,
}: CommentListItemProps) => {
  const [isShowReplies, setIsShowReplies] = useState<boolean>(false);

  const replies = comment.replies || []; // Static replies

  return (
    <View
      style={{
        backgroundColor: "white",
        marginTop: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        gap: 10,
        borderLeftColor: "#E5E7EB",
        borderLeftWidth: depth > 0 ? 1 : 0,
      }}
    >
      {/* Comment Content */}
      <Text>{comment.comment}</Text>
      {/* Comment Actions */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 14,
        }}
      >
        <Entypo
          onPress={() => console.log("Delete comment:", comment.id)}
          name="trash"
          size={15}
          color="#737373"
        />
        <Octicons
          name="reply"
          size={16}
          color="#737373"
          onPress={() => handleReplyButtonPressed(comment.id)}
        />
        <MaterialCommunityIcons
          name="trophy-outline"
          size={16}
          color="#737373"
        />
        <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
          <MaterialCommunityIcons
            name="arrow-up-bold-outline"
            size={18}
            color="#737373"
          />
          <Text style={{ fontWeight: "500", color: "#737373" }}>
            {comment.upvotes}
          </Text>
          <MaterialCommunityIcons
            name="arrow-down-bold-outline"
            size={18}
            color="#737373"
          />
        </View>
      </View>
      {/* Show Replies Button */}
      {!!replies.length && !isShowReplies && depth < 5 && (
        <Pressable
          onPress={() => setIsShowReplies(true)}
          style={{
            backgroundColor: "#EDEDED",
            borderRadius: 2,
            paddingVertical: 3,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 12,
              letterSpacing: 0.5,
              fontWeight: "500",
              color: "#545454",
            }}
          >
            Show Replies
          </Text>
        </Pressable>
      )}
      {/* List of Replies */}
      {isShowReplies &&
        replies.map((item) => (
          <CommentListItem
            key={item.id}
            comment={item}
            depth={depth + 1}
            handleReplyButtonPressed={handleReplyButtonPressed}
          />
        ))}
    </View>
  );
};

export default memo(CommentListItem);