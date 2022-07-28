import React from "react";
import "./App.css";
import Header from "../Components/Header";
import ImageInput from "../Components/Imageinput";
import Identifier from "../Components/Identifier";
import Output from "../Components/Output";
import SignIn from "../Components/Login/SignIn";
import SignUp from "../Components/Login/Register";

const USER_ID = "shubhamv";
const APP_ID = "116ff9b8510a4de4bb5aaffa487d6237";
const MODEL_ID = "face-detection";
const PAT = "504063f497e449b7b445dc7106ddab72";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ImageURL: "",
      Data: "",
      box: "",
      route: "home",
      isLoggedin: false,
    };
  }
  ImageDetector = (evt) => {
    this.setState({ Data: evt.target.value });
  };
  submitted = async () => {
    this.setState({ ImageURL: this.state.Data }, async () => {
      const rawdata = await fetch(
        "https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: "Key " + PAT,
          },
          body: JSON.stringify({
            user_app_id: {
              user_id: USER_ID,
              app_id: APP_ID,
            },
            inputs: [
              {
                data: {
                  image: {
                    url: this.state.ImageURL,
                  },
                },
              },
            ],
          }),
        }
      );
      let val = await rawdata
        .json()
        .then((res) => this.displayfacebox(this.facebox(res)));
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
            <Identifier username="default" Rank="0" />
            <ImageInput data={ImageDetector} submit={submitted} />
            <Output identifier={box} Image={ImageURL} />
          </div>
        ) : this.state.route === "signin" ? (
          <SignIn onRouteChange={onRouteChange} />
        ) : (
          <SignUp onRouteChange={onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;
