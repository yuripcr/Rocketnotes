const { Router, response } = require("express");
const usersRouter = Router();
const UsersController = require("../controllers/usersController");
const usersController = new UsersController();
const ensureAuth = require('../middlewares/ensureAuth');
const multer = require('multer');
const uploadConfig = require('../configs/upload')
const upload = multer(uploadConfig.MULTER);
const UsersAvatarController = require("../controllers/userAvatarController");
const userAvatarController = new UsersAvatarController();

usersRouter.post('/', usersController.create);
usersRouter.put('/', ensureAuth ,usersController.update);
usersRouter.patch('/avatar', ensureAuth, upload.single('avatar'), userAvatarController.update);

module.exports = usersRouter;