import React from "react"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Text,
} from "@chakra-ui/react"
import {Link} from "react-router-dom"
import {FaCheckCircle, FaArrowRight} from "react-icons/fa"
const SignUpSuccess = ({success}) => {
  console.log(success, "success")
  return (
    <Modal isOpen={success} closeOnOverlayClick={false} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          bg="teal"
          display="flex"
          fontSize="6xl"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          color="white"
          p="20"
        >
          <FaCheckCircle />
          <Text fontSize="xl" mt="2" color="#D3D3D3">
            Sign Up Success
          </Text>
        </ModalHeader>

        <ModalBody
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          p="5"
        >
          <Text textAlign="center">
            Congartulations! Your account hase been succesfully created.
          </Text>
          <Button
            mt="4"
            variant="outline"
            colorScheme="teal"
            rightIcon={<FaArrowRight />}
            size="lg"
          >
            <Link to={`/login`}>Login</Link>
          </Button>
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default SignUpSuccess
