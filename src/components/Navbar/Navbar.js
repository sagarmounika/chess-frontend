// Navbar.js
import {Box, Flex, Spacer, Image, Button} from "@chakra-ui/react"
import {Link} from "react-router-dom"
import {useNavigate} from "react-router-dom"
const Navbar = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.clear()
    navigate("/")
  }

  return (
    <Flex
      align="center"
      justifyContent="space-around"
      bg="white"
      color="teal.500"
      boxShadow="md"
    >
      <Link to="/">
        <Box display="flex" alignItems="center">
          <Image
            src="./images/logo.png"
            alt="Logo"
            height="100px"
            width="100px"
          />
        </Box>
      </Link>
      <Spacer />
      <Box>
        <Button
          variant="outline"
          color="teal.500"
          mr="2"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </Flex>
  )
}

export default Navbar
