import React, { Component } from 'react';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    return (
      <div>
        test app
        {
          this.props.app.title
        }
      </div>
    );
  }
}
export default connect(({ app }) => {
  return { app };
})(App);
