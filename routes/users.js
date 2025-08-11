const express = require("express");
const { BookMobel, UserMobel } = require("../models");
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUser,
  getSubscriptionDetailsById,
} = require("../controllers/users-controller");
const router = express.Router();


/**
 * Route: /
 * Method: GET
 * Description: Fetch all users
 * Access: Public
 * Parameters: None
 * Returns: Array of users
 */

router.get("/", getAllUsers);

/**
 * Route: /:id
 * Method: GET
 * Description: Fetch user by ID
 * Access: Public
 * Parameters: id
 * Returns: User object
 */
router.get("/:id", getUserById);

/**
 * Route: /
 * Method: POST
 * Description: Create a new user
 * Access: Public
 * Parameters: None
 * Returns: Created user object
 */
router.post("/", createUser);

/**
 * Route: /:id
 * Method: PUT
 * Description: Update a user by id
 * parameter: id
 * result: updated user
 */
router.put("/:id", updateUserById);

/**
 * Route: /subscription-details/:id
 * Method: GET
 * Description: Fetch all users subscription details
 * Access: Public
 * Parameters: id
 */
router.get("/subscription-details/:id", getSubscriptionDetailsById);

/**
 * Route: /:id
 * Method: DELETE
 * Description: Delete user by id
 * parameters: id
 * results: Delete user from list
 */
router.delete("/:id", deleteUser);



module.exports = router;