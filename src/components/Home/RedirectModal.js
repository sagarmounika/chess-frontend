import React from "react"
import {useNavigate} from "react-router-dom"
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
const RedirectModal = ({failed}) => {
  const navigate = useNavigate()
  const loginRedirect = () => {
    localStorage.clear()
    navigate("/")
  }
  return (
    <Modal isOpen={failed} closeOnOverlayClick={false} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Token Expired</ModalHeader>

        <ModalBody>Your token has expired. Please login again.</ModalBody>
        <ModalFooter>
          <Button onClick={loginRedirect}>Login</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default RedirectModal
