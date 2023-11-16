import React, {useState, useEffect} from "react"
import {getLocalStorage} from "../../utils"
import {useSelector, useDispatch} from "react-redux"
import {ratingsHandler} from "../../Reducers/playersSlice.js"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react"
const Chart = ({username, isOpen, onClose, failureHandler}) => {
  const {ratingHistory, ratingError, ratingsLoading} = useSelector(
    state => state.players
  )
  const options = {
    title: {
      text: `${username} Rating History`,
    },
    xAxis: {
      type: "datetime",
      title: {
        text: "Date",
      },
    },
    chart: {
      height: (9 / 16) * 100 + "%",
    },
    yAxis: {
      title: {
        text: "Rating",
      },
    },
    series: ratingHistory?.map(entry => ({
      name: entry.name,
      data: entry.points.map(point => [
        new Date(point.date).getTime(),
        point.value,
      ]),
    })),
  }
  const dispatch = useDispatch()
  useEffect(() => {
    const token = getLocalStorage("token")
    const successHandler = () => {}
    dispatch(
      ratingsHandler({
        token: token,
        username: username,
        onSuccess: successHandler,
        onFailure: failureHandler,
      })
    )
  }, [])
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xl">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Rating History</DrawerHeader>

        <DrawerBody>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default Chart
