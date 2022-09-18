import React from "react";
import "./App.css";
import Header from "../Components/Header";
import ImageInput from "../Components/Imageinput";
import Identifier from "../Components/Identifier";
import Output from "../Components/Output";
import SignIn from "../Components/Login/SignIn";
import SignUp from "../Components/Login/Register";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ImageURL: "",
      Data: "",
      box: "",
      route: "signin",
      isLoggedin: false,
      user: {
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: new Date(),
      },
    };
  }
  ImageDetector = (evt) => {
    this.setState({ Data: evt.target.value });
  };
  loadUser = (data) => {
    this.setState(
      {
        user: {
          id: data.id,
          name: data.name,
          email: data.email,
          entries: data.entries,
          joined: data.joined,
        },
      },
      () => {
        console.log("state updated");
      }
    );
  };
  submitted = async () => {
    this.setState({ ImageURL: this.state.Data }, async () => {
      const rawdata = await fetch(
        "https://lit-ridge-69049.herokuapp.com/imageDetect",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ImageURL: this.state.ImageURL }),
        }
      );
      let val = await rawdata.json().then((res) => {
        this.displayfacebox(this.facebox(res));
      });
      fetch("https://lit-ridge-69049.herokuapp.com/image", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: this.state.user.id }),
      })
        .then((res) => res.json())
        .then((resp) => {
          this.setState({
            user: { ...this.state.user, entries: resp[0].entries },
          });
        });
    });
  };
  facebox = (info) => {
    const dimensions = info.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.querySelector("#main-image");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      top: dimensions.top_row * height,
      left: dimensions.left_col * width,
      right: width - dimensions.right_col * width,
      bottom: height - dimensions.bottom_row * height,
    };
  };
  displayfacebox = (box) => {
    this.setState({ box: box });
  };
  onRouteChange = (route) => {
    if (route === "signin") {
      this.setState({ isLoggedin: false });
    } else if (route === "home") {
      this.setState({ isLoggedin: true });
    }
    this.setState({ route: route });
  };
  render() {
    const { route, isLoggedin, ImageURL, box } = this.state;
    const { ImageDetector, submitted, onRouteChange } = this;
    return (
      <div style={{ dispay: "flex" }}>
        <Header
          route={route}
          loggedin={isLoggedin}
          onRouteChange={onRouteChange}
        />
        {this.state.route === "home" ? (
          <div>
            <Identifier info={this.state.user} />
            <ImageInput data={ImageDetector} submit={submitted} />
            <Output identifier={box} Image={ImageURL} />
          </div>
        ) : this.state.route === "signin" ? (
          <SignIn onRouteChange={onRouteChange} loadUser={this.loadUser} />
        ) : (
          <SignUp loadUser={this.loadUser} onRouteChange={onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;
