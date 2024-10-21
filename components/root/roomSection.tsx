"use client";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

import axiosInstance from "@/lib/axiosInstance";
import { TRoomResponse } from "@/types/room.response.types";

const RoomSection = () => {
  const [rooms, setRooms] = useState<TRoomResponse[] | []>([]);
  const [showRooms, setShowRooms] = useState<TRoomResponse[] | []>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const { data } = await axiosInstance.get("/rooms");

        const roomData = data?.data || [];

        setRooms(roomData);
        setShowRooms(roomData.slice(0, 8)); // Initially showing the first 4 rooms
      } catch (error) {
        console.log("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  const handleToggle = () => {
    if (showAll) {
      setShowRooms(rooms.slice(0, 8)); // Show only the first 4 rooms
    } else {
      setShowRooms(rooms); // Show all rooms
    }
    setShowAll(!showAll); // Toggle the button state
  };

  return (
    <div>
      <h2 className="text-green-500 text-4xl">Best For You</h2>
      <p className="md:w-3/4 py-4">
        Discover a selection of comfortable and affordable rooms designed to
        meet all your needs. Whether you&apos;re looking for a short stay or
        long-term accommodation, Easy Stay ensures you have access to the best
        facilities at competitive prices. Book your next room effortlessly and
        enjoy a hassle-free experience.
      </p>

      {/* Room data */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {showRooms?.map((room) => (
          <Card key={room?._id} className="shadow-md">
            <CardHeader className="w-full">
              <img
                alt={room?.title}
                className="w-full object-cover rounded-xl h-[160px] md:h-[220px]"
                src={room?.picture}
                width={270}
              />
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <h4 className="font-bold text-large">
                {room?.title.length > 24
                  ? `${room?.title.slice(0, 24)}...`
                  : room?.title}
              </h4>
              <p className="text-tiny">Rent: ${room?.rent}</p>
              <small className="text-default-500">
                Facilities: {room?.facilities.join(", ")}
              </small>
              <Link className="flex justify-end " href="/">
                <Button
                  className="flex items-center"
                  color="success"
                  variant="light"
                >
                  <p>Details</p> <MdKeyboardDoubleArrowRight />
                </Button>
              </Link>
            </CardBody>
          </Card>
        ))}
      </div>

      {rooms.length > 4 && (
        <div className="mt-8">
          <Button color="success" variant="flat" onClick={handleToggle}>
            {showAll ? "Show Less" : "Show All"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default RoomSection;
