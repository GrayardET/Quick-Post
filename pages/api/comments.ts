import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    // only accept post request to update comment
    return res.status(405).end();
  }

  try {
    const { currentUser } = await serverAuth(req, res);
    const { body } = req.body
    const { postId } = req.query;
    
    if (!postId || typeof postId !== 'string'){
       throw new Error('Invalid post id')
    }
    
    if (!body){
      throw new Error('Empty comment');
    }

    const comment = await prisma.comment.create({
      data: {
        body,
        userId: currentUser.id,
        postId
      }
    });

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if(post?.userId) {
      await prisma.notification.create({
        data:{
          body: 'Someone commented on your tweet!',
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

    return res.status(200).json(comment);

  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
