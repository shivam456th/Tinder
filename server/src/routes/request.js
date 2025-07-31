const express = require("express");
const { userAuth } = require("../middlewares/auth");
const userModel = require("../models/user");
const ConnectionRequest = require("../models/connectionRequest");

const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;
      // console.log(fromUserId, toUserId, status);

      const allowedStatus = ["ignored", "interested"]; 
      if (!allowedStatus.includes(status)) {
        return res
        .status(400)
        .json({message: "Invalid status type:"+status})
      }

      const toUser = await userModel.findById(toUserId);
      // console.log(toUser);
      
      if (!toUser) {
        return res.status(404).json({message: "User not found!"})
      }

      //If there is an existing ConnectionRequest
      const existingConnectionRequest = await ConnectionRequest.findOne(
        {$or:[
        {fromUserId,toUserId},
        {fromUserId: toUserId, toUserId: fromUserId}, 
      ]
      })
      if (existingConnectionRequest) {
        return res
        .status(400)
        .send({ message: "Connection Request Already Exists!!"})
      }

      const newConnectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const savedConnectionRequest = await newConnectionRequest.save();
      res.json({
        message: "Connection request sent successfully",
        data: savedConnectionRequest,
      });
    } catch (error) {
      return res.status(400).send("ERROR: " + error.message);
    }
  }
);

requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => { 
  try {
    const {status, requestId} = req.params;
    const loggedInUser = req.user;
    console.log(status, requestId) 

    const allowedStatus = ["accepted", "rejected"]

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({message: "Status not allowed!"});
    }

    const connections = await ConnectionRequest.findOne({
      _id: requestId,
      toUserId: loggedInUser._id, // <-- this must match the token user
      status: "interested"
    });
    

    console.log(connections)

    if (!connections) {
      return res
      .status(404)
      .json({message: "Connection Request not Found"})
    }

    connections.status = status;

    const data = await connections.save();

    res.status(200).json({message: "Connection request", status, data})

    //validate the status
    //Shivam => Ashok
    //loggedInId => toUserId
    //status = interested
    //request Id Should be Valid

  } catch (error) {
    return res.status(400).json("ERROR: " + error.message)
  }
})

module.exports = requestRouter;
