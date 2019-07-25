var React = require('react');
const Template = require('./template.jsx');

class Login extends React.Component {
  render() {
    return (
      <Template>
          <div>
            <h1>Login</h1>
            <form action="/login" method="POST">
                <p>
                    username
                    <input name="username"/>
                </p>
                <p>
                    password
                    <input name="password"/>
                </p>
                <input type="submit" name="login"/>
            </form>
          </div>
        </Template>
    );
  }
}

module.exports = Login;
