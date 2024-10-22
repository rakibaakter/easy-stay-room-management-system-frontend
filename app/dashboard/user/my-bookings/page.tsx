"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Avatar,
  Chip,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import dayjs from "dayjs"; // Use to format dates

import axiosInstance from "@/lib/axiosInstance";

const MyBookings = () => {
  const [bookingList, setBookingList] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await axiosInstance.get("/bookings/my-bookings");

        setBookingList(data.data);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  const columns = [
    {
      key: "picture",
      label: "Picture",
    },
    {
      key: "title",
      label: "Title",
    },
    {
      key: "rent",
      label: "Rent",
    },
    {
      key: "checkInDate",
      label: "Check In",
    },
    {
      key: "checkOutDate",
      label: "Check Out",
    },
    {
      key: "status",
      label: "STATUS",
    },
    {
      key: "action",
      label: "Action",
    },
  ];

  return (
    <div className="my-4">
      <h2 className="mb-4 text-xl font-semibold">Manage Bookings</h2>
      <Table aria-label="Bookings Table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={bookingList}>
          {(item) => (
            <TableRow key={item?._id}>
              <TableCell><Avatar isBordered radius="sm" size="lg" src={item?.room?.picture}/></TableCell> 
              <TableCell>{item?.room?.title}</TableCell> 
              <TableCell>{`${item?.room?.rent}`}</TableCell> 
              <TableCell>
                {dayjs(item?.checkInDate).format("YYYY-MM-DD")}
                {/* Check-In Date */}
              </TableCell>
              <TableCell>
                {dayjs(item?.checkOutDate).format("YYYY-MM-DD")}
                {/* Check-Out Date */}
              </TableCell>
              <TableCell><Chip variant="faded">{item?.status.charAt(0).toUpperCase() + item?.status.slice(1)}</Chip></TableCell>
              <TableCell>
                <Button variant="light" color="danger">Cancel</Button> 
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default MyBookings;
