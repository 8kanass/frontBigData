"use client"

import { useState , useEffect} from 'react';
//import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import FormTask from '@components/FormTask';

const CreateTask = () => {
  const router = useRouter();
  //const { data: session } = useSession();
  const [persons, setpersons] = useState([])
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    name: '',
    description: '',
    selectedPersonIds: []
  });

  const createTask = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('http://localhost:3001/task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: post.name,
          description: post.description,
          personIds: post.selectedPersonIds,
        }),
      });

      if (response.ok) {
        router.push('/');
      } else {
        console.error('Failed to create person:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating person:', error);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchPosts = async () =>{
      const response = await fetch(`http://localhost:3001/persons`)
      const data = await response.json();
      console.log(data)
      setpersons(data)
    }
    fetchPosts()
  }, [])
  
  return (
    <FormTask
      type="Create"
      persons={persons}
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createTask}
    />
  );
};

export default CreateTask;
