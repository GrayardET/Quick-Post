import React from 'react'
import { BiCommentMinus } from 'react-icons/bi';
import CommentItem from './CommentItem';

interface CommentFeedProps{
  comments?: Record<string, any>[];
}

const CommentFeed:React.FC<CommentFeedProps> = ({comments=[]}) => {
  // console.log('comment:')
  // console.log(comments);
  return (
    <div>
      {comments.map((comment)=>(
        <CommentItem key={comment.id} data={comment} />
      ))}
    </div>
    
  )
}

export default CommentFeed