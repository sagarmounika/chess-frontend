import React from "react"
import "./popupStyle.css"
import {
    closePopUp,
    incrementIndex,
    decrementIndex,
} from "../../Reducers/popUpSlice"
import { ImPrevious, ImNext } from "react-icons/im"
import { useSelector, useDispatch } from "react-redux"
// import data from '../ImagesList/data.json'


const PopUp = () => {
    // let images = data.photos;
    const { popUpContent, currentIndex } = useSelector(state => state.popup)
    const { images } = useSelector(state => state.images)
    const dispatch = useDispatch();

    // getting next image
    const nextHandler = () => {
        dispatch(incrementIndex({ images }))
    }

    // getting prev image
    const prevHandler = () => {
        dispatch(decrementIndex({ images }))
    }

    return (
        <div className="popupContainer">
            <div className="popupMainContainer">
                <span class="close" onClick={() => dispatch(closePopUp())}>
                    &times;
                </span>
                <img src={popUpContent.src.large} className="popUpImg" />
            </div>
            <div className="iconContainer">
                <div
                    onClick={prevHandler}
                    disabled={currentIndex === 0}
                    className={currentIndex === 0 ? "disabledPrev" : "iconBox"}
                >
                    <ImPrevious />
                </div>
                <div
                    onClick={nextHandler}
                    disabled={currentIndex === images.length - 1}
                    className={
                        currentIndex === images.length - 1
                            ? "disabledNext"
                            : "iconBox"
                    }
                >
                    <ImNext />
                </div>
            </div>
        </div>
    )
}

export default PopUp
