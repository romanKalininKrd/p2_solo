const React = require('react');
const NavBar = require('./NavBar');
const Footer = require('./Footer');

function Layout({ children, title, username }) {
  // console.log('LAyout->>>', username);
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" />
        {/* <link rel="stylesheet" href="/styles/normalize.css" /> */}
        <link rel="stylesheet" href="/styles/style.css" />
        <script defer src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" />
        <script defer src="/js/index.js" />
        <title>{title}</title>
      </head>
      <body>
        <NavBar username={username} />
        {children}
        <Footer />
      </body>
    </html>
  );
}

module.exports = Layout;
