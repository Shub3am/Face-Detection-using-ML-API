import React from 'react'

function Ranks (props) {
    const {username, Rank} = props;
    return(<h1 className="flex justify-center ttc">Hi {username}, You have used our Tool #{Rank} Times</h1>)
}

export default Ranks;