import React from "react";

function Imageinput ({data, submit}) {
    return( <div className="flex justify-center">
        <input className="tc ph3 pv3 ma3 f3 w-40 " type="textarea" placeholder="Input Image Url" onChange={data} />
        <button onClick={submit} className="h3 mt3 f4 w4">Analyze</button>
        </div>)
}

export default Imageinput;