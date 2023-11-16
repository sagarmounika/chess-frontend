import React from "react"
import {Outlet} from "react-router-dom"
import Navbar from "../Navbar/Navbar"
import {Center} from "@chakra-ui/react"
export default function Layout() {
  return (
    <>
      <Navbar />
      <Center width="100%" height="100%">
        <Outlet />
      </Center>
    </>
  )
}
