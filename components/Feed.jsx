"use client";

import React from 'react'
import AllRecords from './AllRecords';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";

const Feed = () => {
    const router = useRouter()
    //const {data : session } = useSession();
    const [posts, setPosts] = useState([])
    const handleEdit = (post) =>{
      router.push(`/update-person?id=${post.id}`)
    }
  
    const handleDelete = async(post) =>{
      const hasConfirmed = confirm("are you sure you want to delete this person?");
  
      if(hasConfirmed){
        try {
          await fetch(`http://localhost:3001/person/${post.id.toString()}`,{
            method:"DELETE"
          });
          fetchPosts()
        } catch (error) {
          console.log(error)
        }
      }
    }

    useEffect(()=>{
      const fetchPosts = async () =>{
        const response = await fetch(`http://localhost:3001/persons`)
        const data = await response.json();
        console.log(data)
        setPosts(data)
      }
      fetchPosts()
    },[])
    return (
      <AllRecords
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    )
}

export default Feed