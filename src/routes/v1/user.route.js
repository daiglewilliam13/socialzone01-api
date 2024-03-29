const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');
const User = require('../../models/user.model');
const mongoose = require('mongoose');
const Block = require('../../models/block.model');

const router = express.Router();

router
  .route('/')
  .post(auth('manageUsers'), validate(userValidation.createUser), userController.createUser)
  .get(auth('getUsers'), validate(userValidation.getUsers), userController.getUsers);

router
  .route('/:userId')
  .get(auth('getUsers'), validate(userValidation.getUser), userController.getUser)
  .patch(auth('manageUsers'), validate(userValidation.updateUser), userController.updateUser)
  .delete(auth('manageUsers'), validate(userValidation.deleteUser), userController.deleteUser);


router
  .route('/:userId/follow')
  .post(async (req, res) => {
    console.log(req.body)
    let userToFollow = req.params.userId;
    let userFollowing = req.body.id
    let follower = await User.findByIdAndUpdate(
      userToFollow,
      { $addToSet: { followers: userFollowing } },
      { new: true }
    );
    let following = await User.findByIdAndUpdate(
      userFollowing,
      { $addToSet: { following: userToFollow } },
      { new: true }
    );
    let response = { following, follower }
    res.send(response)
  })
router
  .route('/:userId/unfollow')
  .post(async (req, res) => {
    console.log(req.body)
    let userToUnfollow = req.params.userId;
    let userUnfollowing = req.body.id
    let unFollower = await User.findByIdAndUpdate(
      userToUnfollow,
      { $pull: { followers: userUnfollowing } },
      { new: true });
    let unFollowing = await User.findByIdAndUpdate(
      userUnfollowing,
      { $pull: { following: userToUnfollow } },
      { new: true })
    let response = { message: 'unfollowed', unFollowing, unFollower }
    res.send(response)
  })

router
  .route('/:blockedUser/block')
  .post(async (req, res) => {
    const blockObject = {
      blockedUser: req.params.blockedUser,
      blockingUser: req.body.id,
    }
    const checkForBlock = await Block.findOne({
      $and: [
        { blockedUser: blockObject.blockedUser },
        { blockingUser: blockObject.blockingUser }
      ]
    })
    if(checkForBlock){
      res.send({message: "block already exists", checkForBlock, blocked: true})
    } else {
      const newBlock = new Block(blockObject);
      const response = await newBlock.save();
      res.send({ blocked: true, response })
    }
  })

router
  .route('/:user1/blocked_from/:user2')
  .get(async (req, res) => {
    Block.findOne({
      $and: [
        { blockedUser: req.params.user1 },
        { blockingUser: req.params.user2 }
      ]
    }, function (error, block) {
      if (error) { res.send(error) }
      res.send({ block })
    })
  })

router
  .route('/:blockedUser/unblock')
  .post(async (req, res) => {
    console.log('post unblock')
    Block.findOneAndDelete({
      $and: [
        { blockedUser: req.params.blockedUser },
        { blockingUser: req.body.id }
      ]
    }, function (error, block) {
      if (error) { res.send({message: "error: ", error}) }
      res.send({ blocked: false, block })
    })
  })

router
  .route('/:userId/details/edit')
  .get(async (req,res)=>{
    const foundUser = await User.findById(req.params.userId)
    res.send({message: "GET USER EDIT PROFILE DETAILS ROUTE", user: foundUser})
  })
  .post(async (req, res)=>{
    const newDetailsObj = {
      username: req.body.newUsername,
      email: req.body.newEmail,
      firstName: req.body.newFirstName,
      lastName: req.body.newLastName,
      birthdate: req.body.newBirthdate 
    }

    await User.findByIdAndUpdate({_id: req.params.userId}, newDetailsObj,{new: true}, function(err, result){
      if(err){
        res.send(err)
      } else {
        res.send({message: 'success', user: result})
      }
    })
  })

router
  .route('/:userId/update/picture')
  .post(async (req, res)=>{
    console.log(req.body)
    const foundUser = await User.findByIdAndUpdate(req.params.userId, {profileImg: req.body.profileImg}, {new: true})
    console.log(await foundUser)
    res.send(await foundUser);
  })

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and retrieval
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a user
 *     description: Only admins can create other users.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *               role:
 *                  type: string
 *                  enum: [user, admin]
 *             example:
 *               name: fake name
 *               email: fake@example.com
 *               password: password1
 *               role: user
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all users
 *     description: Only admins can retrieve all users.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: User name
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: User role
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of users
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user
 *     description: Logged in users can fetch only their own user information. Only admins can fetch other users.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a user
 *     description: Logged in users can only update their own information. Only admins can update other users.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *             example:
 *               name: fake name
 *               email: fake@example.com
 *               password: password1
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a user
 *     description: Logged in users can delete only themselves. Only admins can delete other users.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
