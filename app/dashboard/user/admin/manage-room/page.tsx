// @ts-nocheck : for saving time.
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

const ManageRoom = () => {
    const [allRooms, setAllRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const { data } = await axiosInstance.get("/rooms");

        setAllRooms(data.data);
      } catch (error) {
        console.log("Failed to fetch room:", error);
      }
    };

    fetchRooms();
  }, []);

  const handleDeleteRoom = async (id) => {
    try {
      Swal.fire({
        title: "Do you want to delete the room?",
        background: "#333",
        color: "#fff",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: `No`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await axiosInstance.delete(`/rooms/${id}`);
          if (response.data.success) {
            Swal.fire({
              background: "#333",
              color: "#fff",
              title: "Your Room has been cancelled successfully!",
              icon: "success",
            });

            // Remove the cancelled room from the state
            setAllRooms((prevList) =>
              prevList.filter((room) => room._id !== id)
            );
          }
        }
      });
    } catch (error) {
      console.log("Failed to cancel room:", error);
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
      key: "action",
      label: "Action",
    },
  ];

    return (
        <div className="my-4">
      <h2 className="mb-4 text-xl font-semibold">Manage Room</h2>
      <Table aria-label="Bookings Table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={allRooms}>
          {(room) => (
            <TableRow key={room._id}>
              <TableCell>
                <Avatar
                  isBordered
                  radius="sm"
                  size="lg"
                  src={room?.picture}
                />
              </TableCell>
              <TableCell>{room?.title}</TableCell>
              <TableCell>{"$"}{room?.rent}</TableCell>
              <TableCell>
                <Link href={`/rooms/${room?._id}`}>
                  <Button color="success" variant="light">
                    View
                  </Button>
                </Link>
                <Link href={`/dashboard/user/admin/edit-room/${room?._id}`}>
                  <Button color="primary" variant="light">
                    Edit
                  </Button>
                </Link>
                <Button
                  onClick={() => handleDeleteRoom(room._id)}
                  color="danger"
                  variant="light"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
    );
};

export default ManageRoom;