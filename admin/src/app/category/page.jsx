'use client';

import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import {
  Input,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

import ModalInput from '../../components/modal';

export default function App() {
  const [data, setData] = useState(null);
  const [searchKey, setSearchKey] = useState('');
  const [searchedData, setSearchedData] = useState(null);
  const [dataToEdit, setDataToEdit] = useState(null);

  const router = useRouter();

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4500/category');
      setData(response.data);
    } catch (error) {
      console.error('An error occurred while fetching the data: ', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const fetchSearchedData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4500/category/search/${searchKey}`,
        );
        setSearchedData(response.data);
      } catch (error) {
        console.error(
          'An error occurred while fetching the searched data: ',
          error,
        );
      }
    };

    if (searchKey.trim() !== '') {
      fetchSearchedData();
    }
  }, [searchKey]);

  const itemList =
    searchKey.trim() !== '' ? searchedData?.response : data?.response || [];

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const pages = itemList ? Math.ceil(itemList.length / rowsPerPage) : 0;

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    const slicedItems = itemList ? itemList.slice(start, end) : [];

    return slicedItems;
  }, [page, itemList]);

  const sizes = ['md'];

  const handleSearch = (e) => {
    setSearchKey(e.target.value);
  };

  const handleEditClick = (item) => {
    setDataToEdit(item);
    console.log('item', item);

    try {
      localStorage.setItem('dataToEdit', JSON.stringify(item));
      // if (storeData) {
      router.push(`/category/edit-category/${item._id}`);
      // }
    } catch (error) {
      console.error('Error storing data in local storage: ', error);
    }
  };

  console.log('dataToEdit', dataToEdit);

  return (
    <>
      <div className="flex items-center justify-center ">
        <ModalInput updateData={fetchData} />
      </div>
      <div className="w-full flex flex-col gap-4 border-2 border-black rounded-xl">
        {sizes.map((size) => (
          <div
            key={size}
            className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
          >
            <Input
              size={size}
              type="text"
              label="Search"
              onChange={handleSearch}
            />
          </div>
        ))}
      </div>

      <Table
        aria-label="Example table with client side pagination"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        classNames={{
          wrapper: 'min-h-[222px]',
        }}
      >
        <TableHeader>
          <TableColumn key="name">NAME</TableColumn>
          <TableColumn key="role">DESCRIPTION</TableColumn>
          <TableColumn key="status">GENDER</TableColumn>
          <TableColumn key="status">STATUS</TableColumn>
          <TableColumn key="status">EDIT</TableColumn>
          <TableColumn key="status">DELETE</TableColumn>
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item?._id}>
              <TableCell className="text-lg">{item?.name}</TableCell>
              <TableCell className="text-lg">{item?.description}</TableCell>
              <TableCell className="text-lg">{item?.gender}</TableCell>
              <TableCell className="text-lg">{item?.status}</TableCell>
              <TableCell className="text-lg">
                <Link href={`/category/edit-category/${item?._id}`}>
                  {/* <Link
                  href={{
                    pathname: `/category/edit-category/${item?._id}`,
                    query: data,
                  }}
                > */}
                  {/* <FaEdit onClick={() => handleEditClick(item)} /> */}
                  <FaEdit />
                </Link>
              </TableCell>
              <TableCell className="text-lg text-red-500">
                <MdDelete />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
