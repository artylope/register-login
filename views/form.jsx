var React = require('react');
const Template = require('./template.jsx');

class Form extends React.Component {
  render() {
    return (
      <Template>
          <div>
            <h1>Hello</h1>
            <form action="/form" method="POST">
                <p>
                    title
                    <input name="title"/>
                </p>
                <p>
                    instructions
                    <input name="instructions"/>
                </p>
                <input type="submit"/>
            </form>
          </div>
      </Template>
    );
  }
}

module.exports = Form;
