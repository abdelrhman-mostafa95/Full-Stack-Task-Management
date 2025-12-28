const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middlewares/auth');
const { validate, schemas } = require('../middlewares/validate');

router.use(auth);

router.post('/', validate(schemas.createTask), taskController.createTask);
router.get('/', taskController.getTasks);
router.get('/:id', taskController.getTask);
router.put('/:id', validate(schemas.updateTask), taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
