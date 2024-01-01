"use client"

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@components/Form';
import FormTask from '@components/FormTask';

const EditPerson = () => {
  // Retrieve the person ID from the URL query parameters
  const searchParams = useSearchParams();
  const taskId = searchParams.get('id');
  const router = useRouter();

  // State to manage form data and submission status
  const [submitting, setSubmitting] = useState(false);
  const [personData, setPersonData] = useState({
    name: '',
    description: ''
  });

  // Fetch person details on component mount
  useEffect(() => {
    const getPersonDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3001/task/${taskId}`);
        const data = await response.json();
        setPersonData({
            name: data.name,
            description: data.description
        });
      } catch (error) {
        console.error(error);
      }
    };

    if (taskId) getPersonDetails();
  }, [taskId]);

  // Function to handle form submission and update person details
  const updatePerson = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!taskId) return alert('Task ID not found');

    try {
      const response = await fetch(`http://localhost:3001/task/${taskId}`, {
        method: 'PUT', // Change to 'PATCH' if your server supports partial updates
        body: JSON.stringify({
          newName: personData.name,
          newDescription: personData.description
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        router.push('/'); // Redirect to the home page after successful update
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  // Render the form component
  return (
    <FormTask
      type="Edit"
      post={personData}
      setPost={setPersonData}
      submitting={submitting}
      handleSubmit={updatePerson}
    />
  );
};

export default EditPerson;
