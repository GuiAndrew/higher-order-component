import React, { Component } from "react";

class AuthorTable extends Component {
  render() {
    return (
      <table className="pure-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {this.props.list.map((author, index) => {
            return (
              <tr key={index}>
                <td>{author.nome}</td>
                <td>{author.email}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default AuthorTable;
