import Form from "@/components/Form";
import Header from "@/components/Header";
import CommentFeed from "@/components/posts/CommentFeed";
import PostItem from "@/components/posts/PostItem";
import usePost from "@/hooks/usePost";
import { NextApiRequest, NextApiResponse } from "next";
import { useRouter } from "next/router";
import React from "react";

const PostView: React.FC<any> = (req: NextApiRequest, res: NextApiResponse) => {
  const router = useRouter();
  const { postId } = router.query;
  const { data: post, isLoading } = usePost(postId as string);
  
  // console.log(post)
  return (
    <div>
      <Header label="Tweet" showBackArrow />
      {post && <PostItem data={post} />}
      <Form
        placeholder="what do you think?"
        isComment
        postId={postId as string}
      />
      <CommentFeed comments={post?.comments} />
    </div>
  );
};

export default PostView;
