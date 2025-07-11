const mongoose = require('mongoose')

const ConnectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    toUserId: {
        type: mongoose.Schema.Type.ObjectId,
        required: true,
    },
    status:{
        type: String,
        required: true,
        enum: {
            values: ["ignore", "interested", "accepted", "rejected "],
            message: `{VALUE} is incorrect status type`,
        }
    }
},
{
    timestamps: true,
 }
);

const connectionRequestModel = new mongoose.model(
    "ConnectionRequest",
    ConnectionRequestSchema
);

module.exports = ConnectionRequestModel;