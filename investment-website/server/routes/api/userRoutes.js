const router = require('express').Router();
const { User, Portfolio, Valuation, Comment } = require('../../models');
// const withAuth = require('../../utils/auth');

// GET all users
router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll();
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET single user
router.get('/:id', async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
            attributes: { exclude: ['password'] },
            include: [{
                model: Valuation,
                through: Portfolio, as: 'portfolio_stocks',
                include: [
                    {
                        model: Comment,
                        attributes: ['id', 'ticker', 'comment', 'created_at']
                    }]
            }]
        });

        if (!userData) {
            res.status(404).json({ message: 'No user with this id!' });
            return;
        }
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// create a new user
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// login a user
router.post('/login', async (req, res) => {
    const username = req.body.username
    try {
        const userData = await User.findOne({
            where: { username },
            include: [{ model: Valuation, through: Portfolio, as: 'portfolio_stocks' }]
        });

        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect username or password, please try again' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect username or password, please try again' });
            return;
        }

        let portfolioIds = [];

        const user_id = userData.id;

        userData.portfolio_stocks.forEach(stock => {
            portfolioIds.push(stock.id);
        })

        res.send({ user_id, username, portfolioIds })

    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
