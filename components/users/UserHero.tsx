import useUser from '@/hooks/useUser';
import React from 'react';
import Image from'next/image';
import Avatar from '../Avatar';

interface UserHeroProps{
  userId: string;
}

const UserHero: React.FC<UserHeroProps> = ({userId}) => {
  const { data: fetchedUser } = useUser(userId);

  return (
    <div>
      <div className="bg-neutral-700 h-44 relative">
        {fetchedUser?.coverImage && (
          <Image 
            fill
            src={fetchedUser.coverImage}
            alt="User's Cover Image"
            style={{objectFit: 'cover'}}
          />
        )}

        <div className="absolute -bottom-12 left-4">
          <Avatar userId={userId} isLarge/>
        </div>

      </div>
    </div>
  )
}

export default UserHero