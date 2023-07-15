const bcrypt = require('bcrypt');
const renderComponent = require('../lib/renderComponent');
const SignUpPage = require('../views/SignUpPage');
const SignInPage = require('../views/SignInPage');
const { User } = require('../../db/models');

/**
 * Завершает запрос с ошибкой аутентификации
 * @param {object} res Ответ express
 * @param err сообщение об ошибке
 */

const failAuth = (res, err) => res.status(401).json({ err });

// * Рендерим страницу формы регистрации
exports.renderSignUpForm = (req, res) => {
  renderComponent(SignUpPage, { username: req.session?.user?.name, title: 'Зарегистрируйся в приложении' }, res);
};

// TODO: Получаем данные с формы регистрации
exports.createUserAndSession = async (req, res, next) => {
  const { username, useremail, userpassword } = req.body;
  try {
    // TODO: Разобраться почему нельзя передавать SALT через .env
    const hasPassword = await bcrypt.hash(userpassword, 10);
    const user = await User.create({
      username,
      useremail,
      userpassword: hasPassword,
    });
    //???????????? Записываем в req.session.user
    req.session.user = { id: user.id, name: user.username };
    console.log('SESSION SUCCESS-->', req.session.user);
    res.status(200).end();
  } catch (err) {
    // TODO: Доделать ошибки по алгоритму Ромы
    console.log('ERROR: Не записать пользователя -->', err.message);
  }
};

// * Рендерим форму регистрации
exports.renderSignInForm = (req, res) => {
  renderComponent(SignInPage, { username: req.session?.user?.name, title: 'Вход в приложение' }, res);
};

// TODO: Получить данные с формы регистрации и обработать
exports.checkUserAndCreateSession = async (req, res, next) => {
  const { useremail, userpassword } = req.body;
  try {
    const user = await User.findOne({ raw: true, where: { useremail } });
    if (!user) return failAuth(res, 'Неправильное имя/пароль!');

    const isValidPassword = await bcrypt.compare(userpassword, user.userpassword);
    if (!isValidPassword) return failAuth(res, 'Неправильное имя//пароль');
    req.session.user = { id: user.id, name: user.username };
    res.status(200).end();
  } catch (err) {
    console.error('Err message', err.message);
    console.error('Err code', err.code);
    // TODO: Написать обработчик событий как делал Рома failAuth(res, err.message)
    failAuth(res, err.message);
  }
};

// * Выход
exports.destroySession = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    res.clearCookie('solo').redirect('/');
    // console.log(req.session);
  });
};
