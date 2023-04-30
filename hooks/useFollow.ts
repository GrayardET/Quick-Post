import { mutate, useSWRConfig } from "swr";
import useCurrentUser from "./useCurrentUser";
import useUser from "./useUser";
import fetcher from "@/libs/fetcher";
import { useCallback, useMemo } from "react";
import { current } from "@reduxjs/toolkit";
import { onOpen as onOpenLogin } from "@/redux/loginModalSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import axios from "axios";

const useFollow = (userId: string) => {
  const dispatch = useDispatch();
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(userId);

  const isFollowing = useMemo(() => {
    const followingList = currentUser?.followingIds || [];

    return followingList.includes(userId);
  }, [currentUser?.followingIds, userId]);


  const toggleFollow = useCallback(async () => {
    if (!currentUser) {
      dispatch(onOpenLogin());
      return 
    }

    try {
      let request;

      if (isFollowing) {
        request = () => axios.delete('/api/follow', { data: { userId } });
      } else {
        request = () => axios.post('/api/follow', { userId });
      }

      await request();

      mutateCurrentUser();
      mutateFetchedUser();
    } catch (error) {
      toast.error("Something went wrong");
    }
  }, [
    currentUser,
    userId,
    dispatch,
    mutateCurrentUser,
    mutateFetchedUser,
    isFollowing,
  ]);

  return {
    isFollowing,
    toggleFollow
  }

};


export default useFollow;

