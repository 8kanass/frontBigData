"use client"
import {useState} from 'react'
import Image from 'next/image'
//import { useSession } from 'next-auth/react'
import { usePathname , useRouter } from 'next/navigation'

const PersonCard = ({post , handleTagClick , handleEdit , handleDelete}) => {
  //const{data : session} = useSession()
  const pathName = usePathname()
  const router = useRouter()

  const [copied, setCopied] = useState("")

  const handleCopy = () => {
    setCopied(post.name)
    navigator.clipboard.writeText(post.prompt)
    setTimeout(() => setCopied(""), 2500);
  }

  
  
  return (
    <div className='prompt_card'>
      
      <p className='my-4 font-satoshi text-sm text-gray-700'>
        <b>Full name :</b> {post.name}
      </p>
      <p className='my-4 font-satoshi text-sm text-gray-700'
        onClick={()=> handleTagClick && handleTagClick(post.tag)}
      > 
        <b>Age : </b>{post.age}
      </p>
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p className='font-inter text-sm green_gradient cursor-pointer' onClick={handleEdit}>
            Edit
          </p>
          <p className='font-inter text-sm orange_gradient cursor-pointer' onClick={handleDelete}>
            Delete
          </p>
        </div>
      
    </div>
  )
}

export default PersonCard