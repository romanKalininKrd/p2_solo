const express = require('express');

const router = express.Router();
const {
  privatePage,
  privatePageCollection,
  privatePageFavorite,
  privatePageDelete,
} = require('../controllers/privateController');

function isAuth(req, res, next) {
  if (req.session?.user) next();
  else res.redirect('/auth/signin');
}

router
  .get('/', isAuth, privatePage)
  .post('/collection', isAuth, privatePageCollection)
  .put('/', isAuth, privatePageFavorite)
  .delete('/', isAuth, privatePageDelete);

module.exports = router;
