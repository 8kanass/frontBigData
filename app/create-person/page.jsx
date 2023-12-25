"use client"

import { useState } from 'react';
//import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Form from '@components/Form';

const CreatePerson = () => {
  const router = useRouter();
  //const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    name: '',
    age: ''
  });

  const createPerson = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('http://localhost:3001/person', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: post.name,
          age: post.age,
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
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPerson}
    />
  );
};

export default CreatePerson;
