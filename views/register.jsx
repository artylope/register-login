var React = require('react');
const Template = require('./template.jsx');

class Register extends React.Component {
  render() {
    return (
      <Template>
          <div>
            <h1>Register</h1>
            <form action="/users" method="POST">
                <p>
                    username
                    <input name="username"/>
                </p>
                <p>
                    password
                    <input name="password"/>
                </p>
                <input type="submit" name="Create Account"/>
            </form>
          </div>
        </Template>
    );
  }
}

module.exports = Register;
