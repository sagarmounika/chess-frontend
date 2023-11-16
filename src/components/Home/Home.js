import React, {useState, useEffect} from "react"
import {getLocalStorage} from "../../utils"
import {useSelector, useDispatch} from "react-redux"
import {getPlayersData} from "../../Reducers/playersSlice.js"
import {CircularProgress} from "@chakra-ui/react"
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Center,
} from "@chakra-ui/react"
import Chart from "./Chart.js"
const Home = () => {
  const dispatch = useDispatch()
  const {players, loading} = useSelector(state => state.players)
  const [view, setView] = useState("table")
  const [current, setCurrent] = useState("")
  useEffect(() => {
    const token = getLocalStorage("token")
    const successHandler = () => {}
    const failureHandler = status => {
      if (status) {
      } else {
      }
    }
    dispatch(
      getPlayersData({
        token: token,
        onSuccess: successHandler,
        onFailure: failureHandler,
      })
    )
  }, [])
  const rowHandler = username => {
    setCurrent(username)
    setView("chart")
  }
  const onClose = () => {
    setView("table")
  }
  return (
    <>
      {view === "chart" && (
        <Chart username={current} isOpen={view === "chart"} onClose={onClose} />
      )}{" "}
      {loading ? (
        <Center width="100%" height="100vh">
          <CircularProgress
            isIndeterminate={loading}
            color="teal.500"
            size="100px"
            thickness="4px"
          />
        </Center>
      ) : players ? (
        <TableContainer width="80%">
          <Table variant="striped" colorScheme="teal">
            <TableCaption>Imperial to metric conversion factors</TableCaption>
            <Thead>
              <Tr cursor="pointer">
                <Th>ID</Th>
                <Th>Username</Th>
                <Th>Rating</Th>
              </Tr>
            </Thead>
            <Tbody>
              {players.map((player, index) => (
                <Tr key={index} onClick={() => rowHandler(player.username)}>
                  <Th>{player.id}</Th>
                  <Th>{player.username}</Th>
                  <Th>{player.rating}</Th>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>To convert</Th>
                <Th>into</Th>
                <Th isNumeric>multiply by</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      ) : null}
    </>
  )
}

export default Home
