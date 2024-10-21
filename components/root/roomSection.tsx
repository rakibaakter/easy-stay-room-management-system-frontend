"use client";
import { useEffect, useState } from "react";

import axiosInstance from "@/lib/axiosInstance";
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";

const RoomSection = () => {
  const [rooms, setRooms] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const {data} = await axiosInstance.get("/rooms");

        setRooms(data.data); // Assuming the API returns an array of room objects
      } catch (error) {
        console.log("Error fetching rooms:", error);
      }
    };
    fetchRooms();
  }, []);

  console.log(rooms);
  

  return (
    <div>
      <h2 className="text-green-500 text-4xl">Best For You</h2>
      <p className="w-3/4 py-4">
        Discover a selection of comfortable and affordable rooms designed to
        meet all your needs. Whether you&apos;re looking for a short stay or
        long-term accommodation, Easy Stay ensures you have access to the best
        facilities at competitive prices. Book your next room effortlessly and
        enjoy a hassle-free experience.
      </p>
      {/* room data */}
      <div className="mt-8 grid grid-cols-4 gap-4" >
      {
        rooms?.map((room) => <Card key={room._id} className=" ">
        <CardHeader className="">
          <Image
            alt="Card background"
            className="w-full object-fill rounded-xl h-[220px]"
            src={room.picture}
            width={270}
          />
        </CardHeader>
        <CardBody className="overflow-visible py-2">
        <p className="text-tiny uppercase font-bold">Daily Mix</p>
          <small className="text-default-500">12 Tracks</small>
          <h4 className="font-bold text-large">Frontend Radio</h4>
        </CardBody>
      </Card>)
    }
        </div>
    </div>
  );
};

export default RoomSection;
