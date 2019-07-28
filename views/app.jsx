var React = require('react');
const Template = require('./template.jsx');

class App extends React.Component {
  render() {
    console.log(this.props);
    return (
          <Template>
            <div>
              <h1>hi {this.props.user.username}, you are logged in</h1>
              <a href="/logout">Log Out</a>
            </div>
          </Template>

    );
  }
}

module.exports = App;
