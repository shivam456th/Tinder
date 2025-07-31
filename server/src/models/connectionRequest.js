const mongoose = require('mongoose');

const ConnectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", //reference to the the user the collection
        required: true,
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ["ignore", "interested", "accepted", "rejected"],
        message: '{VALUE} is an incorrect status type',
    }
}, {
    timestamps: true,
});

ConnectionRequestSchema.pre("save", function (next) {
    const connectionRequest = this;
    //check if the fromUserId is same as toUserId
    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error("Cannot send connection request to yourself")
    }
    next()
})

const ConnectionRequest = mongoose.model(
    "ConnectionRequest",
    ConnectionRequestSchema
);

module.exports = ConnectionRequest;