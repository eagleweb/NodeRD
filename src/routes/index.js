// module.exports = {
//   boards: require('./boardRouter')
// };


const router = new require('express').Router();

router.use('/board', require('./boardRouter'));

module.exports = router;
