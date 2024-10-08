const router = require("express").Router();
const userAuthController = require("../controllers/userAuthController");
const menuController = require("../controllers/menuController");
const userController = require("../controllers/userController");
const multer_imgs_upload = require("../middlewares/multer_imgs_upload");

// middleware to make sure only restaurant owner can perform operation
router.use(userAuthController.protected_user, userController.restrict_user);
router.post("/create_menu", multer_imgs_upload, menuController.create_menu);
// get update delete menu
router
  .route("/:menu_id")
  .get(menuController.get_specific_menu)
  .patch(multer_imgs_upload, menuController.update_menu)
  .delete(menuController.delete_menu);
// add toppings to a menu
router.post("/add_toppings/:menu_id", menuController.add_toppings);
// add toppings option to menu toppings
router.post(
  "/add_toppings_options/:menu_id/:toppings_slug",
  menuController.add_options_to_toppings
);
// get update delete toppings
router
  .route("/toppings/:menu_id/:toppings_slug")
  .get(menuController.get_specific_menu_toppings)
  .patch(menuController.update_menu_toppings)
  .delete(menuController.delete_menu_toppings);

router
  .route("/toppings_option/:menu_id/:toppings_slug/:option_slug")
  .get(menuController.get_toppings_opt)
  .patch(menuController.update_toppings_opt)
  .delete(menuController.delete_toppings_opt);
// router.post("/update_menu/:menu_id")

module.exports = router;
