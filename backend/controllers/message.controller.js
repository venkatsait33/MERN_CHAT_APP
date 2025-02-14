import { Message } from "../model/message.model.js"
import { User } from "../model/user.model.js"
import cloudinary from "../utils/cloudinary.js"

export const getUser = async (req, res) => {

    try {
        const loggedInUser = req.user._id

        const filteredUsers = await User.find({ _id: { $ne: loggedInUser } }).select("-password")

        return res.status(200).json({ message: "Users fetched successfully", data: filteredUsers })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error in getting user" })
    }

}

export const getMessage = async (req, res) => {
    try {
        const { id: userToChatId } = req.params
        const myId = req.user._id
        const messages = await Message.find({
            $or: [
                {
                    senderId: myId,
                    receiverId: userToChatId
                },
                {
                    senderId: userToChatId,
                    receiverId: myId
                }
            ]
        })
        return res.status(200).json({ message: "Messages fetched successfully", data: messages })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error in getting message" })
    }
}

export const sendMessage = async (req, res) => {
    try {

        const { text, image } = req.body;
        const { id: receiverId } = req.params
        const senderId = req.user._id
        let imageUrl;
        if (image) {
            const uploadImage = await cloudinary.uploader.upload(image);
            imageUrl = uploadImage.secure_url;
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        });

        await newMessage.save();

        //todo realtime functionality goes for socket io

        res.status(200).json({ message: "Message sent successfully", data: newMessage });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error in sending message" })
    }
}