const { where } = require('sequelize');
const Tought = require('../models/Tought');
const User = require('../models/User');

const { Op } = require('sequelize');

module.exports = class ToughtController {
  static async showAll(req, res) {
    let search = '';

    if (req.query.search) {
      search = req.query.search;
    }

    let order = 'DESC';

    if (req.query.order === 'old') {
      order = 'ASC';
    } else {
      order = 'DESC';
    }

    const toughtsData = await Tought.findAll({
      include: User,
      where: {
        title: { [Op.like]: `%${search}%` },
      },
      order: [['createdAt', order]],
    });
    const toughts = toughtsData.map((result) => result.get({ plain: true }));

    let toughtsQty = toughts.length;

    if (toughtsQty === 0) {
      toughtsQty = false;
    }

    res.render('toughts/home', { toughts, search, toughtsQty });
  }

  static async dashboard(req, res) {
    const userId = req.session.userid;

    const user = await User.findOne({
      where: { id: userId },
      include: Tought,
      plain: true,
    });

    const toughts = user.Toughts.map((result) => result.dataValues);

    let emptyToughts = false;

    if (toughts.length === 0) {
      emptyToughts = true;
    }

    res.render('toughts/dashboard', { toughts, emptyToughts });
  }
  static createTought(req, res) {
    res.render('toughts/create');
  }
  static async createToughtSave(req, res) {
    const tought = {
      title: req.body.title,
      UserId: req.session.userid,
    };
    try {
      await Tought.create(tought);
      req.flash('message', 'Pensamento criado com sucesso');
      req.session.save(() => {
        res.redirect('/toughts/dashboard');
      });
    } catch (error) {
      console.log('aconteceu um erro' + error);
    }
  }
  static async editTought(req, res) {
    const id = req.body.id;

    const editTought = await Tought.findOne({ where: { id: id } });

    const tought = {
      title: req.body.title,
    };
    try {
      await Tought.update(tought, { where: { id: id } });
      req.flash('message', 'Pensamento editado com sucesso!');
      res.redirect('/toughts/dashboard');
    } catch (error) {
      console.log(error);
    }
  }
  static async deleteTought(req, res) {
    const id = req.body.id;
    const userId = req.session.userid;
    try {
      await Tought.destroy({ where: { id: id, userId: userId } });
      await req.flash('message', 'Pensamento removido com sucesso!');
      res.redirect('/toughts/dashboard');
    } catch (error) {
      console.log('aconteceu um erro:' + error);
    }
  }
};
