const React = require('react');
const ReactDOMServer = require('react-dom/server');

const renderComponent = (component, props = {}, responce) => {
  const reactComponent = React.createElement(component, props);
  const markup = ReactDOMServer.renderToStaticMarkup(reactComponent);

  responce.send(`<!DOCTYPE html>${markup}`);
};

module.exports = renderComponent;
