import serverAuth from '@/libs/serverAuth';
import { NextApiRequest, NextApiResponse } from 'next';
import React from 'react'
import prisma from '@/libs/prismadb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
){
  if (req.method !== 'PATCH'){
    return res.status(405).end()
  }

  try {
   const { currentUser } = await serverAuth(req, res);

   const { name, username, bio, profileImage, coverImage } = req.body;

   if (!currentUser){
    throw new Error('userNotFound with Edit')
   }

   if (!name || !username){
    throw new Error('missing fields')
   }

   const updatedUser = await prisma.user.update({
    where:{
      id: currentUser.id
    },
    data:{
      name,
      username,
      bio,
      profileImage,
      coverImage,
    }
   })

   return res.status(200).json(updatedUser);

  } catch (error) {
   console.log(error) 
  }
}