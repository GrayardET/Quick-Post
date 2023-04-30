import React from "react";
import usePosts from "@/hooks/usePosts";
import PostItem from "./PostItem";

interface PostFeedProps {
  userId?: string;
}

const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
  // fetch tweets of the user
  const { data: posts = [] } = usePosts(userId);

  return (
    <div className="flex flex-col items-start justify-center">
      {posts.map((post: Record<string, any>) => (
        <PostItem key={post.id} data={post} userId={userId}/>
      ))}
    </div>
  );
};

export default PostFeed;
