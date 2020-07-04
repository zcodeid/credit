import React from "react";
import Nav from '../../component/nav';
import { IoLogoUsd } from "react-icons/io";
import CicilanList from "./CicilanList";

function Cicilan(props){
    return (
        <>
            <Nav title="Cicilan" icon={IoLogoUsd} />
            <CicilanList {...props} />
        </>
    )
}

export default Cicilan;