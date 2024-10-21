export type TRoomResponse = {
    _id: string;
    title: string;
    rent: number;
    facilities: string[];
    picture: string;
    details: string;
    status: "available" | "unavailable";
  };
  