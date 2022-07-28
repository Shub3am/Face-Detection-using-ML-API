import "../Container/App.css";
function Output({ Image, identifier }) {
  return (
    <div className="image ma">
      <div className="absolute mt2">
        <img
          alt="image"
          id="main-image"
          src={Image}
          width="500px"
          height="auto"
        />
        <div
          className="bounding-box"
          style={{
            top: identifier.top,
            bottom: identifier.bottom,
            left: identifier.left,
            right: identifier.right,
          }}
        ></div>
      </div>
    </div>
  );
}

export default Output;
