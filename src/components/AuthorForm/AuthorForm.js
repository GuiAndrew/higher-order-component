import React, { Component } from "react";
import CustomInput from "../CustomInput/CustomInput";

class AuthorForm extends Component {
  constructor() {
    super();
    this.state = {
      nome: "",
      email: "",
      senha: ""
    };

    this.submitForm = this.submitForm.bind(this);
    this.setName = this.setName.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setPassword = this.setPassword.bind(this);
  }

  submitForm(event) {
    event.preventDefault();
    // console.log('What', event);

    fetch("https://cdc-react.herokuapp.com/api/autores", {
      credentials: "include",
      // mode: 'cors',
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: this.state.nome,
        email: this.state.email,
        senha: this.state.senha
      })
    })
      // .then((res) => res.json())
      .then(res => {
        if (res.status !== 200) {
          console.log(
            "Warning, the data wasn't sent! Status code: " + res.status
          );
          return;
        }

        res.json().then(res => console.log("Request was a success!", res));
        // res.json().then(res => console.log('Request was a success!'));
      })
      .then(() => this.props.updateListCallBack())
      // .then((data) => console.log(data))
      .catch(error => console.log(error));

    this.setState({ nome: "", email: "", senha: "" });
  }  

  setName(event) {
    this.setState({ nome: event.target.value });
  }

  setEmail(event) {
    this.setState({ email: event.target.value });
  }

  setPassword(event) {
    this.setState({ senha: event.target.value });
  }

  render() {
    return (
      <div className="pure-form pure-form-aligned">
        <form
          className="pure-form pure-form-aligned"
          onSubmit={this.submitForm}
          method="post"
        >
          <CustomInput
            id="name"
            type="text"
            name="name"
            value={this.state.nome}
            onChange={this.setName}
            label="Name:"
          />

          <CustomInput
            id="eamil"
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.setEmail}
            label="Email:"
          />

          <CustomInput
            id="password"
            type="password"
            name="password"
            value={this.state.senha}
            onChange={this.setPassword}
            label="Password:"
          />

          <div className="pure-control-group">
            <label></label>
            <button type="submit" className="pure-button pure-button-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default AuthorForm;
