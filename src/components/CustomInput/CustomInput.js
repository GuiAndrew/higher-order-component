import React, { Component } from 'react';
import PubSub from 'pubsub-js';

class CustomInput extends Component {
  state = {
    errorInfo: ''
  };

  componentDidMount() {
    PubSub.subscribe(
      'validation-error',
      function(topic, error) {
        if (error.field === this.props.name) {
          // console.log(error.field);
          this.setState({ errorInfo: error.defaultMessage });
        }
        //console.log(error);
      }.bind(this)
    );

    PubSub.subscribe(
      'clean-validation',
      function(topic) {
          this.setState({ errorInfo: '' });
      }.bind(this)
    );

    PubSub.subscribe(
      'server-validation',
      function(topic, error) {
          this.setState({ errorInfo: error });
      }.bind(this)
    );
  }

  render() {
    return (
      <div className="pure-control-group">
        <label htmlFor={this.props.id}>{this.props.label}</label>
        <input
          id={this.props.id}
          type={this.props.type}
          name={this.props.name}
          value={this.props.value}
          onChange={this.props.onChange}
        />
        <span className="error">{this.state.errorInfo}</span>
      </div>
    );
  }
}

export default CustomInput;
