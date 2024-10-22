"use client";
import { useState, useEffect } from "react";
import React from "react";
import { Button, Card, CardBody, Chip, DatePicker, Image } from "@nextui-org/react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
} from "@nextui-org/react";

import getRoomById from "@/utils/getRoomById";
import useAuth from "@/hooks/useAuth";
import axiosInstance from "@/lib/axiosInstance";

const RoomDetails = ({ params }) => {
  const [room, setRoom] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const decodedUser = useAuth();
  const { id } = params;
  const router = useRouter();

  useEffect(() => {
    const fetchRoom = async () => {
      const data = await getRoomById(id);
      setRoom(data);
    };

    fetchRoom();
  }, [id]);

  const handleOpenBookingModal = () => {
    if (!decodedUser) {
      // Only push to login if room ID is available
      if (room?._id) {
        router.push(`/auth/login?redirect=${room._id}`);
      } else {
        console.log("Room data is not loaded yet");
      }
      return;
    }

    switch (decodedUser?.role) {
      case "admin":
        Swal.fire({
          background: "#333",
          color: "#fff",
          icon: "info",
          title: "Admin Cannot Book Any Room",
        });
        break;
      default:
        setOpenModal(true);
        onOpen();
        break;
    }
  };

  const handleBooking = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const bookingData = {
    //   user : decodedUser?.id,
      checkInDate: formData.get("checkInDate"),
      checkOutDate: formData.get("checkOutDate"),
      room: room?._id,
    };

    // console.log("Booking Data: ", bookingData);
    try {
      //  send bookingData to the backend here via an API call.
      const response = await axiosInstance.post('/bookings/create-booking', bookingData);
      if(response.success){
        Swal.fire({
            background: "#333",
            color: "#fff",
            icon: "success",
            title: "Booking Successful!",
            text: `Your booking for room ${room?.title} has been confirmed.`,
          });
      }
      
    } catch (error) {
      console.error("Booking failed", error);
      Swal.fire({
        background: "#333",
        color: "#fff",
        icon: "error",
        title: "Booking Failed",
        text: "Something went wrong with your booking. Please try again.",
      });
    }
    onOpenChange(false); // Close the modal after booking
  };

  return (
    <div>
      <Card
        isBlurred
        className="border-none bg-background/60 dark:bg-default-100/50 w-full p-4 mt-8"
        shadow="sm"
      >
        <CardBody>
          <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 justify-center">
            <div className="relative col-span-6 md:col-span-8">
              <Image
                alt={room?.title}
                className="object-cover"
                height={400}
                shadow="md"
                src={room?.picture}
                width="100%"
              />
              <p className="mt-2 text-sm">{room?.details}</p>
            </div>

            <div className="flex flex-col col-span-6 md:col-span-4 pl-4">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-0 space-y-4">
                  <h3 className="font-bold text-foreground/90 text-2xl">
                    {room?.title}
                  </h3>
                  <Chip
                    color={room?.status == "available" ? "success" : "default"}
                    variant="faded"
                  >
                    {room?.status}
                  </Chip>
                  <p className="font-semibold">Facilities:</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {room?.facilities?.map((facility, indx) => (
                      <Card key={indx}>
                        <CardBody>
                          <p>{facility}</p>
                        </CardBody>
                      </Card>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-4 mt-8">
                    <p>
                      <span className="text-3xl font-bold">${room?.rent}</span>{" "}
                      /Day
                    </p>
                  </div>

                  {room?.status === "available" ? (
                    <div className="flex flex-wrap gap-4 mt-8">
                      <Button
                        className="w-full"
                        color="success"
                        variant="flat"
                        onClick={handleOpenBookingModal}
                      >
                        Confirm Booking
                      </Button>
                    </div>
                  ) : (
                    <Button
                      isDisabled
                      className="cursor-not-allowed w-full"
                      color="success"
                      variant="faded"
                    >
                      Room Unavailable
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {openModal && (
        <Modal
          backdrop="blur"
          className="w-[600px]"
          isOpen={isOpen}
          placement="top-center"
          size="4xl"
          onOpenChange={onOpenChange}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Book {room.title}
                </ModalHeader>
                <ModalBody>
                  <form onSubmit={handleBooking}>
                    <Input
                      isReadOnly
                      defaultValue={decodedUser?.userEmail}
                      name="email"
                      label="Email"
                      labelPlacement="outside"
                      type="email"
                    />
                    <div className="flex flex-col md:flex-row gap-6 my-4">
                      <DatePicker
                        label="Check In"
                        labelPlacement="outside"
                        name="checkInDate"
                        required
                      />
                      <DatePicker
                        label="Check Out"
                        labelPlacement="outside"
                        name="checkOutDate"
                        required
                      />
                    </div>
                    <ModalFooter>
                      <Button color="success" type="submit">
                        Book Now
                      </Button>
                      <Button
                        color="danger"
                        type="button"
                        variant="flat"
                        onClick={onClose}
                      >
                        Close
                      </Button>
                    </ModalFooter>
                  </form>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default RoomDetails;
