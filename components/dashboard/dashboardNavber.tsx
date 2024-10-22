"use client";

import { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";

import useAuth from "@/hooks/useAuth";
import getLoggedInUser from "@/utils/getLoggedInUser";

const DashboardNavber = () => {
  const [user, setUser] = useState(null);
  const decodedUser = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getLoggedInUser(decodedUser?.id);

      setUser(data);
    };

    fetchUser();
  }, [decodedUser]);

  return (
    <div>
      <h1 className="mt-8 text-3xl font-bold">{user?.fullName}</h1>
      <Navbar isBordered isBlurred={false}>
        <NavbarContent className="" justify="end">
          <NavbarItem>
            <Link color="foreground" href="/dashboard/user/my-bookings">
              My Bookings
            </Link>
          </NavbarItem>
        </NavbarContent>
       
      </Navbar>
    </div>
  );
};

export default DashboardNavber;
