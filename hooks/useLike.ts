import axios from "axios";
import useCurrentUser from "./useCurrentUser";
import usePost from "./usePost";
import usePosts from "./usePosts";
import { onOpen as onOpenLogin } from "@/redux/loginModalSlice";
import { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import useNotifications from "./useNotifications";


const useLike = ({ postId, userId }: { postId: string; userId?: string }) => {
  // console.log(`userId passed into useLike: ${userId}`)
  const dispatch = useDispatch();
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
  const { mutate: mutateFetchedPosts } = usePosts(userId);
  const { mutate: mutateNotifications} = useNotifications(userId);
  const hasLiked = useMemo(() => {
    const likedList = fetchedPost?.likedIds || [];
    return likedList.includes(currentUser?.id);
  }, [fetchedPost, currentUser]);

  const toggleLike = useCallback(async () => {
    if (!currentUser) {
      dispatch(onOpenLogin());
      return;
    }

    try {
      let request;
      if (hasLiked) {
        request = () =>
          axios.delete("/api/like", {
            data: { postId },
          });
      } else {
        request = () => axios.post("/api/like", { postId });
      }

      const updatedPost = await request();

      // console.log(`userId passed into usePosts: ${userId}`)
      mutateFetchedPosts();
      mutateFetchedPost();
      mutateNotifications();
    } catch (error) {
      console.log(error);
      toast.error("Soemthing went wrong");
    }
  }, [currentUser, dispatch, hasLiked, mutateFetchedPosts, mutateFetchedPost, mutateNotifications, postId]);

  return { hasLiked, toggleLike };
};

export default useLike;
