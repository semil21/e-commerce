'use client';

import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { Button, Input } from '@nextui-org/react';
import axios from 'axios';
import Select from 'react-select';

function page() {
  const [gender, setGender] = useState();

  const rawCategoryData = localStorage.getItem('dataToEdit');
  const categoryData = JSON.parse(rawCategoryData);

  console.log('categoryData', categoryData);

  const [name, setName] = useState(categoryData?.name);
  const [description, setDescription] = useState(categoryData?.description);

  const genderValue = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Both', value: 'both' },
  ];

  useEffect(() => {
    const selectedGenderOption = genderValue.find(
      (option) => option.value === categoryData?.gender,
    );
    setGender(selectedGenderOption);
  }, []);

  console.log('++', categoryData);

  const router = useRouter();

  const setData = {
    id: categoryData?._id,
    name: name || categoryData?.name,
    description: description || categoryData?.description,
    gender: gender?.value,
    status: categoryData?.status,
  };

  const handleUpdate = () => {
    const updateResponse = axios.put(
      'http://localhost:4500/category/edit',
      setData,
    );
    if (updateResponse) {
      router.push('/category');
    }
    console.log('updateResponse', updateResponse);
  };

  // console.log('setData', setData);

  return (
    <>
      <form class="max-w-sm mx-auto pt-40">
        <label
          for="email"
          class="block mb-2 text-sm font-medium  dark:text-white text-white"
        >
          Category Name
        </label>
        <input
          type="text"
          id="email"
          aria-describedby="helper-text-explanation"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br />
        <label
          for="email"
          class="block mb-2 text-sm font-medium  dark:text-white text-white"
        >
          Category Description
        </label>
        <input
          type="text"
          id="email"
          aria-describedby="helper-text-explanation"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <label
          for="email"
          class="block mb-2 text-sm font-medium  dark:text-white text-white"
        >
          Gender
        </label>

        <Select
          options={genderValue}
          defaultValue={gender}
          onChange={setGender}
        />

        <p
          id="helper-text-explanation"
          class="mt-2 text-sm text-black dark:text-gray-400"
        >
          We’ll never share your details. Read our{' '}
          <a
            href="#"
            class="font-medium text-black hover:underline dark:text-blue-500"
          >
            Privacy Policy
          </a>
          .
        </p>

        <Button color="success" onClick={handleUpdate}>
          Update
        </Button>
      </form>
    </>
  );
}

export default page;
