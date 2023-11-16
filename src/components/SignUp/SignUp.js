import {useState,useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {
  Center,
  Container,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react"
import {Alert, AlertIcon, AlertTitle, AlertDescription} from "@chakra-ui/react"
import {signUpHandler, clearError} from "../../Reducers/authSlice"
import SignUpSuccess from "./SignUpSuccess"
const validateEmail = email =>
  email.match(/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/)
const validatePassword = password => password.length >= 6

const SignupForm = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [success,setSuccess]=useState(false)
  const [usernameError, setUsernameError] = useState(null)
  const [emailError, setEmailError] = useState(null)
  const [passwordError, setPasswordError] = useState(null)
  const dispatch = useDispatch()
  const {loading,error} = useSelector(state => state.auth)
    useEffect(() => {
      dispatch(clearError())
    }, [])
  const handleSignup = () => {
    setUsernameError(null)
    setEmailError(null)
    setPasswordError(null)

    if (!username) {
      setUsernameError("Username is required")
    }

    if (!validateEmail(email)) {
      setEmailError("Invalid email")
    }

    if (!validatePassword(password)) {
      setPasswordError("Password should be at least 6 characters")
    }

    if (!username || !validateEmail(email) || !validatePassword(password)) {
      return // Do not proceed if there are validation errors
    }

    dispatch(
      signUpHandler({
        userData: {email, username, password},
        onSuccess: () => {
          setUsername("")
          setEmail("")
          setPassword("")
          setSuccess(true)
        },
        onFailure: () => {
          // Handle failure if needed
        },
      })
    )
  }


  return (
    <Center width="100%" height="100vh">
      {success ? (
        <SignUpSuccess success={success} />
      ) : (
        <Container
          maxW="lg"
          py={{base: "12", md: "24"}}
          px={{base: "0", sm: "8"}}
          borderWidth="1px"
          borderRadius="lg"
        >
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

          <FormControl mt="4" isInvalid={emailError}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => {
                setEmail(e.target.value)
                setEmailError(null)
              }}
            />
            <FormErrorMessage>{emailError}</FormErrorMessage>
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
            onClick={handleSignup}
            isLoading={loading}
            loadingText="Submitting"
          >
            Sign Up
          </Button>
          {error && (
            <Alert mt="4" status="error">
              <AlertIcon />
              <AlertTitle mr={2}>{error}</AlertTitle>
            </Alert>
          )}
        </Container>
      )}
    </Center>
  )
}

export default SignupForm
