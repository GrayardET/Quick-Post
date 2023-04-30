import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { userId } = req.body;

    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid user id");
    }

    if (req.method !== "POST" && req.method !== "DELETE") {
      return res.status(405).end();
    }

    const { currentUser } = await serverAuth(req, res);
    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid ID");
    }
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error("Invalid user id");
    }

    let updatedFollowingIds = [...(user?.followingIds || [])];

    if (req.method === "POST") {
      updatedFollowingIds.push(userId);

      try {
        await prisma.notification.create({
          data:{
            userId,
            body: 'Someone followed you!'
          }
        }) 

        await prisma.user.update({
          where: {
            id: userId
          },
          data: {
            hasNotification: true
          }
        })

      } catch (error) {
        console.log(error)
      }

    } else {
      updatedFollowingIds = updatedFollowingIds.filter(
        (followingId) => followingId !== userId
      );
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        followingIds: updatedFollowingIds,
      },
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}