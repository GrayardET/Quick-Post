import useCurrentUser from "@/hooks/useCurrentUser";
import { onOpen as onOpenLogin } from "@/redux/loginModalSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import React, { useCallback, useMemo } from "react";
import Avatar from "../Avatar";
import { formatDistanceToNowStrict } from "date-fns";
import { AiOutlineHeart, AiOutlineMessage, AiFillHeart } from "react-icons/ai";
import useLike from "@/hooks/useLike";

interface PostItemProps {
  data: Record<string, any>;
  userId?: string;
}

const PostItem: React.FC<PostItemProps> = ({ data = {}, userId }) => {
  // console.log(`userId in PostItem: ${userId}`);
  const { data: currentUser } = useCurrentUser();
  const { hasLiked, toggleLike } = useLike({ postId: data.id, userId });
  const router = useRouter();
  const dispatch = useDispatch();

  const goToUser = useCallback(
    (e: any) => {
      e.stopPropagation();
      router.push(`/users/${data?.userId}`);
    },
    [router, data.userId]
  );

  const goToPost = useCallback(() => {
    router.push(`/posts/${data?.id}`); //TODO: Need to implement Post page
  }, [router, data.id]);

  const onLike = useCallback(
    async (e: any) => {
      console.log("toggle liked");
      e.stopPropagation();

      if (!currentUser) {
        dispatch(onOpenLogin());
        return;
      }

      toggleLike();

      //TODO: if logged in, increase the like count
    },
    [dispatch, currentUser, toggleLike]
  );

  const createAt = useMemo(() => {
    if (!data.createAt) {
      return null;
    }
    return formatDistanceToNowStrict(new Date(data.createAt));
  }, [data.createAt]);

  const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart;

  return (
    <div
      className="
      text-white
      border-neutral-800 
      hover:bg-neutral-900
        w-full 
        p-5
        border-b-[1px] 
        transition
        cursor-pointer
      "
      onClick={goToPost}
    >
      <div className="flex flex-row items-start justify-start w-full gap-6">
        <div>
          <Avatar userId={data.userId} />
        </div>

        <div className="flex flex-col flex-1 gap-2">
          <div className="flex flex-row gap-2 text-">
            <div className="">{data.user.name}</div>

            <div className="text-neutral-400">@{data.user.username}</div>

            <div className="flex flex-row justify-end items-end flex-1">
              <div className="text-neutral-400 text-sm flex">{createAt}</div>
            </div>
          </div>
          <div className="text-base text-neutral-200">{data.body}</div>

          <div className="flex flex-row justify-start items-start mt-4 gap-8">
            <div
              className="
                flex 
                flex-row 
                justify-center 
                items-center 
                gap-2
                text-neutral-500 
                cursor-pointer 
                hover:text-sky-500
              "
            >
              <AiOutlineMessage size={17} />
              <p>{data.comments?.length || 0}</p>
            </div>

            <div
              onClick={onLike}
              className="
                flex 
                flex-row 
                justify-center 
                items-center 
                gap-2
                text-neutral-500 
                cursor-pointer 
                hover:text-red-500
              "
            >
              <LikeIcon size={17} color={hasLiked ? "crimson" : undefined}/>
              <p>{data.likedIds.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
