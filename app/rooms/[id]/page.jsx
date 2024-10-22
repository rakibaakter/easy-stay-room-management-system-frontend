"use client";
import { useState, useEffect } from "react";
import React from "react";
import { Button, Card, CardBody, Chip, Image } from "@nextui-org/react";

import getRoomById from "@/utils/getRoomById";

const RoomDetails = ({ params }) => {
  const [room, setRoom] = useState(null);
  const { id } = params;

  useEffect(() => {
    const fetchRoom = async () => {
      const data = await getRoomById(id);

      setRoom(data);
    };

    fetchRoom();
  }, [id]);

  console.log(room);

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
                  <h3 className="font-bold text-foreground/90 text-2xl ">
                    {room?.title}
                  </h3>
                  <Chip
                    color={room?.status == "available" ? "success" : "default"}
                    variant="faded"
                  >
                    {room?.status}
                  </Chip>
                  <p className="font-semibold">Facilities:</p>
                  <div className=" flex items-center gap-2 flex-wrap">
                    {room?.facilities?.map((facility, indx) => {
                      return (
                        <Card key={indx} className="">
                          <CardBody>
                            <p>{facility}</p>
                          </CardBody>
                        </Card>
                      );
                    })}
                  </div>
                  <div className="flex flex-wrap gap-4 mt-8">
                    <p className="">
                      <span className="text-3xl font-bold">${room?.rent}</span>{" "}
                      /Day
                    </p>
                  </div>

                  {room?.status === "available" ? (
                    <div className="flex flex-wrap gap-4 mt-8">
                      <Button className="w-full" color="success" variant="flat">
                        Book Now
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
    </div>
  );
};

export default RoomDetails;
