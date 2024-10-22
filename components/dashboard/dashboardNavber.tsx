// @ts-nocheck : for saving time.
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

  console.log(user);
  

  return (
    <div>
      <h1 className="mt-6 text-3xl font-bold">{user?.fullName}</h1>
      <Navbar isBordered isBlurred={false}>
        {user?.role === "admin" ? (
          <NavbarContent justify="end">
            <NavbarItem>
              <Link color="foreground" href="/dashboard/user/admin/upload-room">
                Upload Room
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link color="foreground" href="/dashboard/user/admin/manage-room">
                Manage Room
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link
                color="foreground"
                href="/dashboard/user/admin/manage-bookings"
              >
                Manage Bookings
              </Link>
            </NavbarItem>
          </NavbarContent>
        ) : (
          <NavbarContent justify="end">
            <NavbarItem>
              <Link color="foreground" href="/dashboard/user/user/my-bookings">
                My Bookings
              </Link>
            </NavbarItem>
          </NavbarContent>
        )}
      </Navbar>
    </div>
  );
};

export default DashboardNavber;
