import React from "react";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", name: "" };
  }
  onEmailChange = (evt) => {
    this.setState({ email: evt.target.value });
  };
  onPasswordChange = (evt) => {
    this.setState({ password: evt.target.value });
  };
  onNameChange = (evt) => {
    this.setState({ name: evt.target.value });
  };
  onRegisterChange = (evt) => {
    fetch("http://localhost:3001/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((res) => res.json())
      .then((user) => {
        if (user) {
          const data = user[user.length - 1];
          this.props.loadUser(data);
          this.props.onRouteChange("home");
        }
      });

    evt.preventDefault();
  };
  render() {
    return (
      <main className="pa4 black-80">
        <form
          className="measure center ba pa3"
          action="sign-up_submit"
          method="get"
          accept-charset="utf-8"
        >
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="ph0 mh0 fw6 center f4">Sign Up</legend>
            <div className="mt3">
              <label className="db fw4 lh-copy f6" htmlFor="name">
                Name
              </label>
              <input
                onChange={this.onNameChange}
                className="pa2 input-reset ba bg-transparent w-100 measure"
                type="text"
                name="name"
                id="name"
              />
            </div>
            <div className="mt3">
              <label className="db fw4 lh-copy f6" htmlFor="email-address">
                Email address
              </label>
              <input
                onChange={this.onEmailChange}
                className="pa2 input-reset ba bg-transparent w-100 measure"
                type="email"
                name="email-address"
                id="email-address"
              />
            </div>
            <div className="mt3">
              <label className="db fw4 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                onChange={this.onPasswordChange}
                className="b pa2 input-reset ba bg-transparent"
                type="password"
                name="password"
                id="password"
              />
            </div>
          </fieldset>
          <div className="mt3">
            <input
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6"
              type="submit"
              value="Sign Up"
              onClick={this.onRegisterChange}
            />
          </div>
        </form>
      </main>
    );
  }
}

export default SignUp;
