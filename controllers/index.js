var express = require('express'),
    router = express.Router();

router.use('/comments', require('./comments'));
router.use('/users', require('./users'));

router.get('/', function(req, res) {
    res.render('index');
});

// render index for new and index - handled by Angular router
router.get('/', function(req, res) {
    res.render('index');
});
router.get('/new', function(req, res) {
    res.render('createForm');
});

module.exports = router;
