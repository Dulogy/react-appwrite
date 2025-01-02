import React, { useState } from 'react'
import appWriteService from "../appwrite/postService";
import { Link } from 'react-router-dom';

function PostCard({$id,title,blog_image}) {
  const[imageSrc,setImageSrc]=useState("");
  appWriteService.filePreview(blog_image).then((res)=>{
    setImageSrc(res)
  })
  return (
    <Link to={`/post/${$id}`}>
        <div className="w-full bg-gray-100 rounded-lg p-4">
            
            <div className="w-full justify-center mb-4">
                <img src={imageSrc} alt={title} className='rounded-xl' />
            </div>

            <h2 className='text-xl font-bold'>
                {title}
            </h2>
        </div>
    </Link>
  )
}

export default PostCard