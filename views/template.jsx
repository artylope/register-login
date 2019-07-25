var React = require('react');


class Template extends React.Component {
  render() {
    return (
      <html>
        <head>
          <link rel="stylesheet" href="/style.css"></link>
        </head>
        <body>
          <header>
            <div>
              <p>This is header</p>
            </div>
          </header>
            {/*THIS IS THE IMPORTANT PART*/}
              {this.props.children}
            <footer>
              <div>
                <p>This is footer</p>
              </div>
            </footer>
        </body>
      </html>
    );
  }
}


module.exports = Template;
