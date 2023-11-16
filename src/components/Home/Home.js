import React, {useState, useEffect, useCallback} from "react"
import {getLocalStorage} from "../../utils"
import {useSelector, useDispatch} from "react-redux"
import {getPlayersData} from "../../Reducers/playersSlice.js"
import {FaChartLine} from "react-icons/fa"
import {
  Skeleton,
  Table,
  Thead,
  Tbody,
  AlertIcon,
  Alert,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Center,
  Tooltip,
  IconButton,
} from "@chakra-ui/react"
import Chart from "./Chart.js"
import RedirectModal from "./RedirectModal"
const Home = () => {
  const dispatch = useDispatch()
  const {players, loading} = useSelector(state => state.players)
  const [view, setView] = useState("table")
  const [current, setCurrent] = useState("")
  const [failed, setFailed] = useState(false)
  const successHandler = useCallback(() => {

  }, [])

  const failureHandler = useCallback(status => {
    if (status) {
      setFailed(true)
    } else {
    }
  }, [])

  useEffect(() => {
    const token = getLocalStorage("token")

    dispatch(
      getPlayersData({
        token: token,
        onSuccess: successHandler,
        onFailure: failureHandler,
      })
    )
  }, [dispatch, successHandler, failureHandler])

  const rowHandler = useCallback(username => {
    setCurrent(username)
    setView("chart")
  }, [])

  const onClose = useCallback(() => {
    setView("table")
  }, [])
  return (
    <>
      {view === "chart" && (
        <Chart
          username={current}
          isOpen={view === "chart"}
          onClose={onClose}
          failureHandler={failureHandler}
        />
      )}{" "}
      {failed && <RedirectModal failed={failed} />}
      <TableContainer
        width="80%"
        margin="auto"
        border="1px"
        borderRadius="lg"
        borderColor="gray.300"
        overflow="hidden"
      >
        <Table variant="striped" colorScheme="gray" borderRadius="lg">
          <TableCaption>Player Information</TableCaption>
          <Thead>
            <Tr cursor="pointer" borderBottom="2px" borderColor="teal.600">
              <Th>ID</Th>
              <Th>Username</Th>
              <Th>Rating</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {loading && players.length === 0 ? (
              <Tr>
                <Td>
                  <Skeleton height="20px" />
                </Td>
                <Td>
                  <Skeleton height="20px" />
                </Td>
                <Td>
                  <Skeleton height="20px" />
                </Td>
                <Td>
                  <Skeleton height="20px" />
                </Td>
              </Tr>
            ) : (
              players &&
              players.map((player, index) => (
                <Tr key={index} onClick={() => rowHandler(player.username)}>
                  <Td>{player.id}</Td>
                  <Td>{player.username}</Td>
                  <Td>{player.rating}</Td>
                  <Td>
                    <Tooltip label="View Rating History" hasArrow>
                      <IconButton
                        icon={<FaChartLine />}
                        onClick={() => rowHandler(player.username)}
                        size="sm"
                      />
                    </Tooltip>
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Home
