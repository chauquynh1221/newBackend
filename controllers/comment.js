import { createError } from "../error.js";
import Comment from "../models/Comment.js";
import Video from "../models/Video.js";


export const addComment = async (req,res, next) => {
    try {
        const comment = await new Comment({...req.body, userId: req.user.id})
        const saveComment = await comment.save()
        res.status(200).send(saveComment)
    } catch (err) {
        next(err);
    }
}

export const updateComment = async (req,res, next) => {
    try {
        const commentUpdate = await Comment.findById(req.params.id)
        if(req.user.id === commentUpdate.userId) {
            const updateComment = await Comment.findByIdAndUpdate(req.params.id,{
               $set: req.body
            },
            {new : true}
            )
            res.status(200).json(updateComment)
        }else{

        }
    } catch (err) {
        next(err);
    }
}

export const deleteComment = async (req,res, next) => {
    try {
        const comment = await Comment.findById(req.params.id);
        const video = await Video.findById(req.params.id);
        if(req.user.id === comment.userId || req.user.id === video.userId){
            await Comment.findByIdAndDelete(req.params.id),
            res.status(200).json("Comment has been deleted")
        }else{
            next(createError(401,"You can delete your comment"))
        }
    } catch (err) {
        next(err);
    }
}

export const getComments = async (req,res, next) => {
    try {
        const comments = await Comment.find({videoId : req.params.videoId})
        console.log(comments)
        res.status(200).json(comments)
    } catch (err) {
        next(err);
    }
}