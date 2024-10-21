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

import Logo from "./logo";

import { ThemeSwitch } from "@/components/theme-switch";
import useAuth from "@/hooks/useAuth";
import Swal from "sweetalert2";

export const Navbar = () => {
  const decodedUser = useAuth();

  const handleLogOut = () => {
    Swal.fire({
      title: "Do you want to log out?",
      background: "#333",
      color: "#fff",
      showDenyButton: true,
      confirmButtonText: "Log Out Now!",
      denyButtonText: `Cancel`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        Swal.fire({
          background: "#333",
          color: "#fff",
          title: "User Logged Out Successfully!",
          icon: "success",
        });
      }
    });
  };

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
              <Button onClick={handleLogOut} variant="bordered">Log Out</Button>
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
