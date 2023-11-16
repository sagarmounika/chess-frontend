import {useState, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {
  Center,
  Container,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  Heading,
} from "@chakra-ui/react"

import {Alert, AlertIcon, AlertTitle} from "@chakra-ui/react"
import {loginHandler, clearError} from "../../Reducers/authSlice"
import {useNavigate} from "react-router-dom"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [usernameError, setUsernameError] = useState(null)

  const [passwordError, setPasswordError] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {loginLoading, loginError} = useSelector(state => state.auth)
  useEffect(() => {
    dispatch(clearError())
  }, [])
  const handleLogin = () => {
    setUsernameError(null)

    setPasswordError(null)

    if (!username) {
      setUsernameError("Username is required")
    }

    if (!password) {
      setPasswordError("Password is required")
    }

    if (!username || !password) {
      return
    }

    dispatch(
      loginHandler({
        userData: {username, password},
        onSuccess: data => {
          setUsername("")

          setPassword("")

          navigate("/home")
        },
        onFailure: () => {
          // Handle failure if needed
        },
      })
    )
  }

  return (
    <Center width="100%" height="100vh">
      <Container
        maxW="lg"
        pb={{base: "12", md: "24"}}
        px={{base: "0", sm: "8"}}
        borderWidth="1px"
        borderRadius="lg"
      >
        <Heading p="4" mb="5" textAlign="center">
          Login
        </Heading>
        <FormControl isInvalid={usernameError}>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={e => {
              setUsername(e.target.value)
              setUsernameError(null)
            }}
          />
          <FormErrorMessage>{usernameError}</FormErrorMessage>
        </FormControl>

        <FormControl mt="4" isInvalid={passwordError}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={e => {
              setPassword(e.target.value)
              setPasswordError(null)
            }}
          />
          <FormErrorMessage>{passwordError}</FormErrorMessage>
        </FormControl>

        <Button
          mt="4"
          colorScheme="teal"
          onClick={handleLogin}
          isLoading={loginLoading}
          loadingText="Logging in.."
        >
          Login
        </Button>
        {loginError && (
          <Alert mt="4" status="error">
            <AlertIcon />
            <AlertTitle mr={2}>{loginError}</AlertTitle>
          </Alert>
        )}
      </Container>
    </Center>
  )
}
export default Login
