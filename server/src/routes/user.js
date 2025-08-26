const express = require ('express');
const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');
const userModel = require('../models/user');
const userRouter = express.Router();


const USER_SAFE_DATA = "firstName  lastName emailId photoUrl _id";

//Get all the pending connection request for the loggedIn user

userRouter.get("/user/connections", userAuth, async (req, res) => {
    try {
      const loggedInUser = req.user;
  
      const connectionRequest = await ConnectionRequest.find({
        $or: [
          { toUserId: loggedInUser._id, status: "accepted" },
          { fromUserId: loggedInUser._id, status: "accepted" }
        ]
      })
        .populate("fromUserId", "firstName lastName photoUrl gender about")
        .populate("toUserId", "firstName lastName photoUrl gender about");
  
      const data = connectionRequest.map((row) => {
        if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
          return row.toUserId;   // dusre user ka pura object return karo
        } else {
          return row.fromUserId;
        }
      });
  
      res.json({ data });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  });
  

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", ["firstName", "lastName", "age", "gender", "about", "photoUrl"]);
        console.log(connectionRequests);
        
        res.json({
            message: "Data fetched Successfully",
            data:connectionRequests
        })

    } catch (error) {
        // return req.statusCode(400).send("ERROR: " + err.message)
        return res.status(400).send("ERROR: " + error.message)
    }
})

 
userRouter.get("/feed", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10; // Corrected to use limit from query

        limit = limit > 50 ? 50 : limit; 
        const skip = (page-1)*limit;

        const connectionRequests = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id },
                { toUserId: loggedInUser._id }
            ]
        }).select("fromUserId toUserId");

        const hideUserfromFeed = new Set();
        connectionRequests.forEach((req) => {
            hideUserfromFeed.add(req.fromUserId.toString());
            hideUserfromFeed.add(req.toUserId.toString());
        });

        hideUserfromFeed.add(loggedInUser._id.toString());

        const users = await userModel.find({
            _id: { $nin: Array.from(hideUserfromFeed) }
        }).select(USER_SAFE_DATA).skip(skip).limit(limit); // Added skip and limit to the query

        res.json(users);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

module.exports = userRouter;
