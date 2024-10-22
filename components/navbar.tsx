"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import NextLink from "next/link";
import Link from "next/link";
import { useEffect, useState } from "react";

import Logo from "./logo";

import { ThemeSwitch } from "@/components/theme-switch";
import useAuth from "@/hooks/useAuth";
import logout from "@/utils/logout";
import getLoggedInUser from "@/utils/getLoggedInUser";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, User } from "@nextui-org/react";

export const Navbar = () => {
  const [user, setUser] = useState(null);
  const decodedUser = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getLoggedInUser(decodedUser?.id);

      setUser(data);
    };

    fetchUser();
  }, [decodedUser]);

  // const user = getLoggedInUser(decodedUser?.id);
  console.log(user);

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          {decodedUser ? (
            <Dropdown>
            <DropdownTrigger>
              <Button variant="light">
                <User
                description={decodedUser?.userEmail}
                name={user?.fullName}
              />
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Action event example" 
              onAction={(key) => alert(key)}
            >
              {/* <DropdownItem><Link href="/dashboard/use/profile">Profile</Link></DropdownItem> */}
              
              <DropdownItem><Link href="/dashboard">Dashboard</Link></DropdownItem>
              <DropdownItem>
              <Button variant="light" color="danger" onClick={() => logout()}>
               Log Out
             </Button>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          ) : (
            <Link href="/auth/login">
              <Button variant="bordered">Login</Button>
            </Link>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
      </NavbarContent>
    </NextUINavbar>
  );
};
