const React = require('react');
const Layout = require('./Layout');

function MainPage({ username, title }) {
  return (
    <Layout username={username} title={title}>
      <div className="mainPage__background">
        <div className="container container_mainPage">
          <div className="mainPage__title">
            <div className="mainPage__title--item">Ищи</div>
            <div className="mainPage__title--item">Вдохновляйся</div>
            <div className="mainPage__title--item">Создавай</div>
            <a className="btn_started_href" href="/auth/signin"><div className="btn_started">Get started</div></a>
          </div>
          <div className="mainPage_images">
            <div className="mainPage_images_picture picture_1" />
            <div className="mainPage_images_picture picture_2" />
          </div>
        </div>
      </div>

    </Layout>
  );
}

module.exports = MainPage;
