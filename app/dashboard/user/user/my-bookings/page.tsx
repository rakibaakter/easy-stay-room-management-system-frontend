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
import Link from "next/link";
import Swal from "sweetalert2";

import axiosInstance from "@/lib/axiosInstance";

const MyBookings = () => {
  const [bookingList, setBookingList] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await axiosInstance.get("/bookings/my-bookings");

        setBookingList(data.data);
      } catch (error) {
        console.log("Failed to fetch bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  const handleDeleteBooking = async (id) => {
    try {
      Swal.fire({
        title: "Do you want to cancel the request?",
        background: "#333",
        color: "#fff",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: `No`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await axiosInstance.delete(`/bookings/${id}`);
          if (response.data.success) {
            Swal.fire({
              background: "#333",
              color: "#fff",
              title: "Your booking has been cancelled successfully!",
              icon: "success",
            });

            // Remove the cancelled booking from the state
            setBookingList((prevList) =>
              prevList.filter((booking) => booking._id !== id)
            );
          }
        }
      });
    } catch (error) {
      console.log("Failed to cancel booking:", error);
    }
  };

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
              <TableCell>
                <Avatar
                  isBordered
                  radius="sm"
                  size="lg"
                  src={item?.room?.picture}
                />
              </TableCell>
              <TableCell>{item?.room?.title}</TableCell>
              <TableCell>{`${item?.room?.rent}`}</TableCell>
              <TableCell>
                {dayjs(item?.checkInDate).format("YYYY-MM-DD")}
              </TableCell>
              <TableCell>
                {dayjs(item?.checkOutDate).format("YYYY-MM-DD")}
              </TableCell>
              <TableCell>
                <Chip variant="faded">
                  {item?.status.charAt(0).toUpperCase() + item?.status.slice(1)}
                </Chip>
              </TableCell>
              <TableCell>
                <Link href={`/rooms/${item?.room?._id}`}>
                  <Button color="primary" variant="light">
                    Details
                  </Button>
                </Link>
                <Button
                  onClick={() => handleDeleteBooking(item._id)}
                  color="danger"
                  variant="light"
                >
                  Cancel
                </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default MyBookings;
