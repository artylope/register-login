var React = require('react');
const Template = require('./template.jsx');

class App extends React.Component {
  render() {
    return (
          <Template>
            <div>
              <h1>You are logged in</h1>
              <button>Log Out</button>
            </div>
          </Template>

    );
  }
}

module.exports = App;
