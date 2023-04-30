import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/router";
import React, { useCallback, useMemo } from "react";
import Avatar from "../Avatar";

interface CommentItemProps {
  data: Record<string, any>;
}

const CommentItem: React.FC<CommentItemProps> = ({ data }) => {
  console.log(data)
  const router = useRouter();
  const goToUser = useCallback(
    (e: any) => {
      e.stopPropagation();
      router.push(`/users/${data.user.id}`);
    },
    [data.user.id, router]
  );

  const createdAt = useMemo(() => {
    if (!data?.createAt) {
      return null;
    }
    return formatDistanceToNowStrict(new Date(data?.createAt));
  }, [data?.createAt]);

  return (
    <div
      className="
      text-white
      border-neutral-800 
      hover:bg-neutral-900
        pl-12
        w-full 
        p-5
        border-b-[1px] 
        transition
        cursor-pointer
      "
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
              <div className="text-neutral-400 text-sm flex">{createdAt}</div>
            </div>
          </div>
          <div className="text-base text-neutral-200">{data.body}</div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
