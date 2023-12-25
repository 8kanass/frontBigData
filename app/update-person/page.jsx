"use client"

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@components/Form';

const EditPerson = () => {
  // Retrieve the person ID from the URL query parameters
  const searchParams = useSearchParams();
  const personId = searchParams.get('id');
  const router = useRouter();

  // State to manage form data and submission status
  const [submitting, setSubmitting] = useState(false);
  const [personData, setPersonData] = useState({
    name: '',
    age: ''
  });

  // Fetch person details on component mount
  useEffect(() => {
    const getPersonDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3001/person/${personId}`);
        const data = await response.json();
        setPersonData({
            name: data.name,
            age: data.age
        });
      } catch (error) {
        console.error(error);
      }
    };

    if (personId) getPersonDetails();
  }, [personId]);

  // Function to handle form submission and update person details
  const updatePerson = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!personId) return alert('Person ID not found');

    try {
      const response = await fetch(`http://localhost:3001/person/${personId}`, {
        method: 'PUT', // Change to 'PATCH' if your server supports partial updates
        body: JSON.stringify({
          newName: personData.name,
          newAge: personData.age
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
    <Form
      type="Edit"
      post={personData}
      setPost={setPersonData}
      submitting={submitting}
      handleSubmit={updatePerson}
    />
  );
};

export default EditPerson;
