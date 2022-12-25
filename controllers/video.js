
import { createError } from "../error.js";
import Video from "../models/Video.js";
import User from "../models/User.js";

export const addVideo = async (req,res, next) => {
    const newVideo = new  Video ({userId: req.user.id, ...req.body})
    try{
        const saveVideo = await newVideo.save()
        res.status(200).json(saveVideo)
    }catch(err){
        next(err);
    }

}

export const updateVideo = async (req,res, next) => {
    try{
        const video = await Video.findById(req.params.id)
        if(!video) return next(createError(404, "Video not found"))
        if(req.user.id === req.video.id) {
            const updateVideo = await Video.updateByIdAndUpfate(req.params.id,{
                $set: req.body,
            },
            {new : true}
            )
            res.status(200).json(updateVideo)
        }else{
            return next(createError(404,"You can update your video "))
        }
        

    }catch(err){
        next(err);
    }

}


export const deleteVideo = async (req,res, next) => {
    try{
        const video = await Video.findById(req.params.id)
        if(!video) return next(createError(404, "Video not found"))
        if(req.user.id === req.video.id) {
            await Video.updateByIdAndDelete(req.params.id
            )
            res.status(200).json("Video deleted")
        }else{
            return next(createError(404,"You can delete your video "))
        }
        

    }catch(err){
        next(err);
    }
    

}

export const getVideo = async (req, res, next) => {
    try {
      const video = await Video.findById(req.params.id);
      res.status(200).json(video);
    } catch (err) {
      next(err);
    }
  };

export const viewVideo = async (req,res, next) => {
    try {
        await Video.findByIdAndUpdate(req.params.id,{
            $inc : {views : 1}
        })

        res.status(200).json("The view has been increase");
    } catch (error) {
            next(error);
    }

}

export const randomVideo = async (req,res, next) => {
    try {
        const videos = await Video.aggregate([{$sample : {size: 20}}])
        res.status(200).json(videos);
    } catch (error) {
            next(error);
    }
    

}

export const trendVideo = async (req,res, next) => {
    
    try {
        const videos = await Video.find().sort({view : -1})
        res.status(200).json(videos);
    } catch (error) {
            next(error);
    }
    
}

export const subVideo = async (req,res, next) => {
   
    try {
        const user = await User.findById(req.user.id)
        const sub  = user.subscribedUsers
        const list = await Promise.all( 
            sub.map( channelId => {
                return Video.find({userId: channelId})
            })
        )
        res.status(200).json(list.flat());
    } catch (error) {
            next(error);
    }
    
}



// export const getByTag = async (req, res, next) => {
//     const tags = req.query.tags.split(",");
//     try {
//         const videos = await Video.find({tags : {$in : tags} }).limit(20);
//         res.status(200).json(videos);
//     } catch (error) {
//             next(error);
//     }
    
// }

export const getByTag = async (req, res, next) => {
    const tags = req.query.tags.split(",");
    try {
      const videos = await Video.find({ tags: { $in: tags } }).limit(20);
      res.status(200).json(videos);
    } catch (err) {
      next(err);
    }
  };

  export const getByChannel = async (req, res, next) => {
    try {
      const videos = await Video.find({userId: req.params.id});
      res.status(200).json(videos);
    } catch (err) {
      next(err);
    }
  };

export const searchVideo = async (req,res, next) => {
    const query = req.query.q
    try {
        const videos = await Video.find({
            title: { $regex : query , $options : 'i'}
        }).limit(40)
        res.status(200).json(videos);
    } catch (error) {
            next(error);
    }
    
}