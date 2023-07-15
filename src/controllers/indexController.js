const renderComponent = require('../lib/renderComponent');
const MainPage = require('../views/MainPage');

exports.indexPage = (req, res, next) => {
  // const name = req.session?.user?.name;
  renderComponent(MainPage, { username: req.session?.user?.name, title: 'Главная страница' }, res);
  // res.send('<h1>Welcome!</h1>');
  next();
};
