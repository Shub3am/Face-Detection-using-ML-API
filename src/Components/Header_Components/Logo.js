import React from 'react'
import logo from './logo.png'
import Tilt from 'react-parallax-tilt';
function Logo () {
    return(<Tilt><img src={logo} width="100rem"/></Tilt>)
}


export default Logo;