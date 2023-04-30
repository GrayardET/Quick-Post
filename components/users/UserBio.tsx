import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import React, { useMemo } from "react";
import { format } from "date-fns";
import Button from "../Button";
import { current } from "@reduxjs/toolkit";
import { BiCalendar } from "react-icons/bi";
import {
  onClose as onCloseEdit,
  onOpen as onOpenEdit,
} from "@/redux/editModalSlice";
import { useDispatch } from "react-redux";
import useFollow from "@/hooks/useFollow";

interface UserBioProps {
  userId: string;
}

const UserBio: React.FC<UserBioProps> = ({ userId }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedUser } = useUser(userId);

  const dispatch = useDispatch();
  const { isFollowing, toggleFollow } = useFollow(userId);

  const createAt = useMemo(() => {
    if (!fetchedUser?.createAt) {
      return null;
    }

    return format(new Date(fetchedUser.createAt), "MMMM yyyy");
  }, [fetchedUser?.createAt]);

  return (
    <div className="border-b-[1px] border-neutral-800 pb-4">
      <div className="flex justify-end p-2">
        {currentUser?.id === userId ? (
          <Button
            secondary
            label="Edit"
            onClick={() => {
              dispatch(onOpenEdit());
            }}
          />
        ) : (
          <Button
            secondary={!isFollowing}
            label={isFollowing ? "Unfollow" : "Follow"}
            onClick={toggleFollow}
            outline={isFollowing}
          />
        )}
      </div>
      <div className="mt-8 px-4 ">
        <div className="flex flex-col">
          <p className="text-white text-2xl font-semibold">
            {fetchedUser?.name}
          </p>
          <p className="text-neutral-400 text-base">@{fetchedUser?.username}</p>
        </div>

        <div className="flex flex-col mt-4">
          <p className="text-white">{fetchedUser?.bio}</p>
          <div
            className="
              flex
              flex-row
              items-center
              gap-1
              text-neutral-500
            "
          >
            <BiCalendar size={22} />
            <p>Joined {createAt}</p>
          </div>
        </div>
        <div
          className="
            flex
            flex-row
            items-center
            mt-4
            gap-6
          "
        >
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">
              {fetchedUser?.followingIds?.length || 0}
            </p>
            <p className="text-neutral-500">following</p>
          </div>

          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{fetchedUser?.followersCount || 0}</p>
            <p className="text-neutral-500">followers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBio;
