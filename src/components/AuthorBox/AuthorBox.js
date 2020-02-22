import React, { Component } from "react";
import AuthorForm from "../AuthorForm/AuthorForm";
import AuthorTable from "../AuthorTable/AuthorTable";

class AuthorBox extends Component {
  constructor() {
    super();
    this.state = {
      list: []
      // nome: 'Bruce', email: 'bruce.kim@mail.com', senha: '123456'
      // nome: '', email: '', senha: ''
    };

    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    // console.log(this);
    this.getData();
  }

  getData() {
    fetch("https://cdc-react.herokuapp.com/api/autores/")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            // list: result.slice(0,13)
            list: result.slice(result.length - 13, result.length)
          });
        },
        error => {
          this.setState({
            error
          });
        }
      );
  }

  render() {
    return (
      <div className="pure-control-group">
        <AuthorForm updateListCallBack={this.getData} />
        <AuthorTable list={this.state.list} />
      </div>
    );
  }
}

export default AuthorBox;
