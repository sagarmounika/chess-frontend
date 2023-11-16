// Navbar.js
import {Box, Flex, Spacer, Image, Button} from "@chakra-ui/react"
import {Link} from "react-router-dom"

const Navbar = () => {
  const handleLogout = () => {
    console.log("Logout clicked")
  }

  return (
    <Flex align="center" p={4} bg="teal.500" color="white">
      <Link to="/">
        LOGO
      </Link>
      <Spacer />
      <Box>
        <Button variant="outline" color="white" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </Flex>
  )
}

export default Navbar
