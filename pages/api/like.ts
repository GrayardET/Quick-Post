import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";
import { METHODS } from "http";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST" && req.method !== "DELETE") {
    return res.status(405).end();
  }

  try {
    const { currentUser } = await serverAuth(req, res);
    const { postId } = req.body;
    if (!currentUser) {
      throw new Error("not logged in");
    }

    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid Post Id");
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new Error("Invalid Post Id");
    }

    let likedIds = [...post.likedIds] || [];

    // check for specific method to filter/push id
    if (req.method === "POST") {
      likedIds.push(currentUser.id);

      if(post?.userId) {
        await prisma.notification.create({
          data:{
            body: 'Someone liked your tweet!',
            userId: post.userId
          }
        })

        await prisma.user.update({
          where: {
            id: post.userId
          },
          data:{
            hasNotification: true
          }
        })
      }
      
      try {   // Allow failure of notification without affecting the like functionality
        
      } catch (error) {
        console.log(error)
      }

    } else {
      likedIds = likedIds.filter((id)=>id!=currentUser.id);
    }
    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likedIds,
      },
    });

    res.status(200).json(updatedPost);

  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
}
