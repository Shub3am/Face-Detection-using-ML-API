import React from "react";
class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
  }
  onEmailChange = (evt) => {
    this.setState({ email: evt.target.value });
  };
  onPasswordChange = (evt) => {
    this.setState({ password: evt.target.value });
  };

  onSubmitSignIn = (evt) => {
    fetch("http://localhost:3001/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((response) => response.json())
      .then((verify) => {
        if (verify == "Logged In") {
          this.props.onRouteChange("home", this.state);
        } else {
          console.log("Wrong Password");
        }
      });
    console.log(this.state);
    evt.preventDefault();
  };
  render() {
    return (
      <main className="pa4 black-80">
        <form className="measure center ba pa3">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f4 center fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Email
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                onChange={this.onEmailChange}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                onChange={this.onPasswordChange}
              />
            </div>
            <label className="pa0 ma0 lh-copy f6 pointer">
              <input type="checkbox" /> Remember me
            </label>
          </fieldset>
          <div className="">
            <input
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Sign in"
              onClick={this.onSubmitSignIn}
            />
          </div>
          <div className="lh-copy mt3">
            <a
              onClick={() => this.props.onRouteChange("register")}
              href="#0"
              className="f6 link dim black db"
            >
              Sign up
            </a>
            <a href="#0" className="f6 link dim black db">
              Forgot your password?
            </a>
          </div>
        </form>
      </main>
    );
  }
}

export default SignIn;
