import { NextFunction, Request, Response } from "express";
import Videos, { IVideos } from "../database/models/videos";
import Comments, { IComments } from "../database/models/comments";
import User, { IUser } from "./../database/models/user";
import multer from 'multer';
import path from 'path';
import { getVideoDurationInSeconds }  from "get-video-duration";



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname));
    }
});
const fileFilter = (req:any, file:any, cb:any) => {
    if (file.mimetype == 'video/mp4' || file.mimetype == 'video/quicktime'
    || file.mimetype == 'video/mpeg'
    || file.mimetype == 'video/avi'
    || file.mimetype == 'video/x-flv') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
var upload = multer({ storage: storage, fileFilter: fileFilter }).single('video');

/* POST api/upload
 * Upload Video - Admin / Creator only
 */
export const uploadToServer = (req: Request,
    res: Response,
    next: NextFunction) => {
        upload(req, res, function(err: any) {
            if(err) {
                return res.json({ msg: "Upload failed!" }); 
            }
            getVideoDurationInSeconds(req.file.path).then((duration) => {
                var hours = Math.floor(duration / 60 / 60);
                var minutes = Math.floor(duration / 60) - (hours * 60);
                var seconds = Math.floor(duration % 60);
            const user = req.user as IUser;
            const video = new Videos({
                title: req.body.title,
                category: req.body.category,
                tags: req.body.tags,
                description:req.body.description,
                filePath : req.headers.host+ '/uploads/'+req.file.filename,
                user : {
                    id: user._id
                },
                hours: hours,
                minutes: minutes,
                seconds: seconds
            })
            video.save((err => {
                if(err){
                    return res.json({ msg: "Upload failed!" });
                }
                return res.json({ msg: "File Uploaded!" });
            }))
        })
        })
        
}

/* POST /api/videos/:videoId
 * Update Video details
 */

export const updateVideo = (req: Request, res: Response, next: NextFunction) => {
     
    const user = req.user as IUser;
    Videos.findOneAndUpdate({ _id: req.params.videoId }, req.body, { new: true }, (err, video) => {
        if(err){
            return res.status(404).send({
                msg: "Video not Found"
            });
        }
        res.json(video);
    });
   
};

/* GET api/videos
 * List uploaded videos
 */

export const browseVideos = (req: Request, res: Response) => {
    const query: any = {};
    if (req.query.category) {
        query.category = req.query.category;
    }
    Videos.find(query, (err, videos) => {
        if (err) {
            return res.send(err);
        }
        res.json(videos);
    });
}

/* GET api/videos/:videoId
 * Show single video
 */

 export const showVideo = (req: Request, res: Response) => {
    

     const findVideo =  new Promise((resolve, reject) => {
        Videos.find({_id: req.params.videoId, }, (err, video) => {
            if (err) reject(err);
        console.log(video)
            resolve(video); 
        });
        })

        // Show five comments
    const findComments =  new Promise((resolve, reject) => {
        Comments.find({_id: req.params.videoId },null,{limit:5}, (err, comments) => {
            if (err) reject(err);
            resolve(comments); 
        });
        })
        return Promise.all([findVideo, findComments])
                    .then(array => {
                        
                       res.json(array);
                  })
                  .catch(function(err) {
                    res.status(404).send({
                        msg: "Not found"
                    });
                  });
 }

 /* GET api/comment/:videoId
 * Get next 5 comments
 */
export const getComments = (req: Request, res: Response) => {
    const query: any = {};
    const size = 5;
    let page = parseInt(req.query.page as string);

    if (page < 0 || page === 0) {
        page = 1;
    }
    query.skip = size * (page - 1);
    query.limit = size;
    
    Comments.find({_id: req.params.videoId}, null , query, (err, comments) => {
        if (err) {
            return res.send(err);
        }
        if (comments) {
            return res.json(comments);
        }
            return res.json({ msg: "No comments" });
    });
}

 /* POST api/comment/:videoId
 * Post Comment
 */

 export const postComment = (req: Request,
    res: Response,
    next: NextFunction) => {
        const user = req.user as IUser;
        User.findById(user._id, (err, user: IUser) => {
            if (err) {
                return next(err);
            }
            const comment = new Comments({
                userId: user._id,
                name: user.fullname,
                videoId : req.params.videoId,
                commentText: req.body.commentText   
    
            });
            comment.save((err => {
                if(err){
                    return res.json({ msg: "Comment failed!" });
                }
                return res.json({ msg: "Comment posted" });
            }))        
    });        
}

/* POST api/reply/:commentId
 * Reply to comment
 */

export const postReply = (req: Request,
    res: Response,
    next: NextFunction) => {
        const user = req.user as IUser;
        var commentId = req.params.commentId
        User.findById(user._id, (err, user: IUser) => {
            if (err) {
                return next(err);
            }
        var replyTo = {
            commentId: req.params.commentId,
            userId: user._id,
            name: user.fullname,
            reply: req.body.reply,
            replyTime: new Date()
        }   
    
        Comments.findOne({ commentId}, (err, comment) => {
            if (err) {
                return next(err);
            }
            if (comment) {
                comment.replies.push(replyTo)
                comment.save();
                return res.status(200).send({
                    msg: "Replied to comment",
                });
        }                       
    })
})        
}