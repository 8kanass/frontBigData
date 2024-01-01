"use client"

import { useState } from 'react';
//import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import FormTask from '@components/FormTask';

const CreateTask = () => {
  const router = useRouter();
  //const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    name: '',
    description: ''
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

  return (
    <FormTask
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createTask}
    />
  );
};

export default CreateTask;
