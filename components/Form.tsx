import useCurrentUser from '@/hooks/useCurrentUser';
import usePosts from '@/hooks/usePosts';
import React, { useCallback, useState } from 'react'
import Button from './Button';
import { onClose as onCloseRegister, onOpen as onOpenRegister } from '@/redux/registerModalSlice';
import { onClose as onCloseLogin, onOpen as onOpenLogin } from '@/redux/loginModalSlice';
import { useDispatch } from 'react-redux';
import Avatar from './Avatar';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import usePost from '@/hooks/usePost';

interface FormProps {
  placeholder: string,
  isComment?: boolean;
  postId?: string;
}

const Form: React.FC<FormProps> = ({
  placeholder,
  isComment,
  postId
}) => {
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts();
  const { mutate: mutatePost } = usePost(postId);
  const [body, setBody] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();


  const handleClickLogin = () => {
    dispatch(onOpenLogin());
  }
  const handleClickRegister = () => {
    dispatch(onOpenRegister());
  }
  const onTweet = useCallback(async () => {
    try {
      setIsLoading(true);

      // check if the form is used for a post or a reply(comment)
      const url = isComment ? `/api/comments/?postId=${postId}` : '/api/posts';

      console.log(`url: ${url}`);

      await axios.post(url, {body});
      toast.success("Tweet created!")
      setBody('');
      mutatePosts();
      mutatePost();
      console.log('mutated Posts')
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  },[body, isComment, mutatePost, mutatePosts, postId])

  return (
    <div className='text-white border-b-[1px] border-neutral-800 px-5 py-2'>
      {!currentUser ? (
        <div className='my-8'>
          <div>
            <h1 className="text-2xl text-center font-bold mb-6">
              Welcome to Quick Post!
            </h1>

            <div className="flex flex-row items-center justify-center gap-4 ">
              <Button label="login" onClick={handleClickLogin} />
              <Button label="Register" onClick={handleClickRegister} secondary />
            </div>

          </div>
        </div>
      ) : (
        <div className="flex flex-row gap-4">
          <div>
            <Avatar userId={currentUser.id} />
          </div>
          <div className="w-full">
            <textarea
              disabled={isLoading}
              onChange={(e) => { setBody(e.target.value) }}
              value={body}
              placeholder={placeholder}
              className='
                disabled:opacity-80
                peer
                resize-none
                mt-3
                w-full
                bg-black
                outline-none
                text-lg
                placeholder-neutral-500
                scrollbar-color
              '
            >

            </textarea>

            <hr className="
              opacity-0
              peer-hover:opacity-100
              peer-focus:opacity-100
              h-[1px]
              w-full
              border-neutral-800
              transition
            "/>
            <div className="mt-2 flex flex-row justify-end">
              <Button label="Tweet" onClick={onTweet} disabled={isLoading || !body}/>
            </div>
          </div>
          {/* fetch posts from the user */}

          {/* Hello {currentUser.username} */}
        </div>
      )}
    </div>
  )
}

export default Form