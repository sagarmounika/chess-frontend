import React, { useCallback, useState } from 'react'
import './headerStyle.css'
import { useSelector, useDispatch } from "react-redux";
import { querySetHandler } from "../../Reducers/popUpSlice";
import { FcSearch } from "react-icons/fc";
const Header = () => {

    const { query } = useSelector((state) => state.popup);
    const dispatch = useDispatch();

    // debounce function to prevent multiple api calls when user types
    const debounce = (func) => {
        let timer;
        return function (...args) {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, args);
            }, 500);
        };
    };

    // input change handler
    const changeHandler = (e) => {
        dispatch(querySetHandler(e.target.value))
    }

    // using useCallback hook to memoize changeHandler
    const optimizedFn = useCallback(debounce(changeHandler), []);

    return (
        <div className="header">
            <div className="logo"><img src="/images/logo.png" /></div>
            <div className="searchBox" >
                <input type="text" onChange={(e) => optimizedFn(e)}
                />
                <span className={query !== "" ? "hide" : ""} > <FcSearch /></span>

            </div>
        </div >
    )
}

export default Header