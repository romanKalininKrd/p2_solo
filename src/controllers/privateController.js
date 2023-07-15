const renderComponent = require('../lib/renderComponent');
const PrivatePage = require('../views/PrivatePage');
const { User, Collection } = require('../../db/models');

exports.privatePage = async (req, res) => {
  const userid = req.session?.user?.id;
  try {
  } catch (err) {
  }
  console.log('USERID--->', userid);
  renderComponent(PrivatePage, { username: req.session?.user?.name, id: req.session?.user?.id }, res);
};

exports.privatePageCollection = async (req, res) => {
  const data = req.body;
  const id = req.session?.user?.id;
  try {
    const result = await User.findOne({
      where: { id },
      include: [Collection],
    });
    const outData = result.get({ plain: true }).Collections;
    console.log(outData);
    res.send(JSON.stringify(outData));
  } catch (err) {
    console.log('Не могу обработать запрос на коллекцию', err);
  }
};

exports.privatePageFavorite = async (req, res) => {
  const { alt_description, urls_thumb, href } = req.body;
  const userid = req.session?.user?.id;
  try {
    const picture = await Collection.create({
      userid, urls_thumb, alt_description, href,
    });
    console.log(picture);
    res.sendStatus(200);
  } catch (err) {
    console.log('Не могу обработать запрос в БД на фаворит', err);
  }
};

exports.privatePageDelete = async (req, res) => {
  const { alt_description, urls_thumb, href } = req.body;
  console.log('--->>>', alt_description);
  try {
    const picture = await Collection.destroy({ where: { urls_thumb } });
    console.log(picture);
    res.sendStatus(200);
  } catch (err) {
    console.log('Не могу удалить с БД', err);
  }
};
