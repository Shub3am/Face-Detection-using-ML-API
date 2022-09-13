import React from "react";

function Ranks(props) {
  let entries;
  const { info } = props;
  console.log("inde", info);
  fetch(`http://localhost:3001/entries/${info.email}`)
    .then((raw) => raw.json())
    .then((data) => {
      info.entries = data[0].entries;
    });

  return (
    <h1 className="flex justify-center ttc">
      Hi {info.name}, You have used our Tool #{info.entries} Times
    </h1>
  );
}

export default Ranks;
