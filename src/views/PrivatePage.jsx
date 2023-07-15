const React = require('react');
const Layout = require('./Layout');

module.exports = function PrivatePage({ username, title }) {
  return (
    <Layout username={username}>
      <div className="container main">
        <div className="main_PrivatePage">
          <div className="privatePage_row">
            <div className="second_menu">
              <div className="btn__second_menu" id="my_collection">Моя коллекция</div>
            </div>

          </div>
          <div className="privatePage_row">
            <div id="masonry" />
          </div>

        </div>

      </div>
      {/* <form id="formReq"> */}
      {/*  <input type="text" name="userRequest" /> */}
      {/*  <button type="submit">Отправить</button> */}
      {/* </form> */}

    </Layout>
  );
};
