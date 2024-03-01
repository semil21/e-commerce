import React, { useEffect, useState } from 'react';

import {
  Button,
  Checkbox,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import axios from 'axios';
import Select from 'react-select';

export default function ModalInput({ updateData }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [status, setStatus] = useState();
  const [gender, setGender] = useState();
  const statusValue = [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
  ];

  const genderValue = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Both', value: 'both' },
  ];

  const extractGender = gender?.value;
  const extractSatus = status?.value;

  const categoryData = {
    name,
    description,
    gender: extractGender,
    status: extractSatus,
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        'http://localhost:4500/category/create',
        categoryData,
      );

      updateData();
    } catch (error) {
      console.error('Error adding new category:', error);
    }
  };
  return (
    <>
      <Button
        onPress={onOpen}
        color="primary"
        style={{ width: '250px', height: '50px', fontSize: '17px' }}
      >
        Add Category
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add New Category
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  placeholder="Enter name"
                  variant="bordered"
                  onValueChange={setName}
                />
                <Input
                  placeholder="Enter description"
                  type="text"
                  variant="bordered"
                  onValueChange={setDescription}
                />

                <Select
                  options={statusValue}
                  placeholder="Select Status"
                  value={status}
                  onChange={setStatus}
                />
                <Select
                  options={genderValue}
                  value={gender}
                  onChange={setGender}
                  placeholder="Select Gender"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="success"
                  onPress={onClose}
                  onClick={handleSubmit}
                >
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
