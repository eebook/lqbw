import * as express from 'express';

const router = express.Router();

router.get('/knarfeh', function(req, res, next) {
  res.send('request for user knarfeh\' info');
});

module.exports = router;
