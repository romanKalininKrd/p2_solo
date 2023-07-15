const express = require('express');
const passport = require('passport');

const {
  renderSignUpForm,
  createUserAndSession,
  renderSignInForm,
  checkUserAndCreateSession,
  destroySession,
} = require('../controllers/authController');

const router = express.Router();

// * Роутер для формы регистрации
router
  .route('/signup')
  .get(renderSignUpForm)
  .post(createUserAndSession);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login', successReturnToOrRedirect: '/private' }));

// * Роутер для формы аутентификации
router
  .route('/signin')
  .get(renderSignInForm)
  .post(checkUserAndCreateSession);

// * Роутер для выхода из Private
router.get('/signout', destroySession);

module.exports = router;
