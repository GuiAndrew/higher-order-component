import React, { Component } from "react";
import AuthorForm from "../AuthorForm/AuthorForm";
import AuthorTable from "../AuthorTable/AuthorTable";
import PubSub from 'pubsub-js';

class AuthorBox extends Component {
  constructor() {
    super();
    this.state = {
      list: []
    };
  }

  componentDidMount() {
    // console.log(this);
    fetch("https://cdc-react.herokuapp.com/api/autores/")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            list: result.slice(result.length - 13, result.length)
          });
        },
        error => {
          this.setState({
            error
          });
        }
      );

      PubSub.subscribe('update-author-list', function(topic, res) {
        this.setState({ list: res.slice(res.length - 13, res.length) });
        // console.log(topic);
      }.bind(this));
  }

  render() {
    return (
      <div className="pure-control-group">
        <AuthorForm />
        <AuthorTable list={this.state.list} />
      </div>
    );
  }
}

export default AuthorBox;
