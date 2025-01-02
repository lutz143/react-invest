const router = require('express').Router();
const commentData = require('../../controllers/commentData.js');
const { Comment, Valuation, User } = require('../../models');

// GET all comments
router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll();
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.body.user_id,
            valuation_id: req.body.valuation_id,
            Ticker: req.body.Ticker
        });

        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

// GET Stock comments
router.get('/:id', async (req, res) => {
    try {
        const stockComments = await commentData.getStockComments(req, res);
        if (!stockComments) {
            res.status(404).json({ message: 'No stock found with this id!' });
            return;
        }
        res.status(200).json(stockComments);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET a single comment
// router.get('/:id', async (req, res) => {
//   try {
//     const commentData = await Valuation.findByPk(req.params.id, {
//       // JOIN with locations, using the Trip through table
//       include: [{ model: Comment,
//         attributes: ['id', 'Ticker', 'comment', 'created_at'],
//         include: {
//           model: User,
//           attributes: ['username', 'id']
//         }
//       }],
//     });

//     if (!commentData) {
//       res.status(404).json({ message: 'No stock found with this id!' });
//       return;
//     }
//     res.status(200).json(commentData.comments);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get('/user/:id', async (req, res) => {
    try {
        const commentUserData = await Comment.findAll({
            where: {
                user_id: req.params.id
            }
        });
        res.status(200).json(commentUserData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updateComment = await Comment.update(req.body, {
            where: {
                id: req.params.id,
                user_id: req.body.user_id,
                valuation_id: req.body.valuation_id
            }
            // comment: req.body
        });

        res.status(200).json(updateComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.body.user_id,
                valuation_id: req.body.valuation_id
            },
        });

        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;