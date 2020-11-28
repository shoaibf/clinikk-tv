# Lawtorney Database Schema
[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)
## Users
##### Description
A table to store all user credentials, tokens, profile info .
##### Schema JSON
  ```
  {
      userId: string,
      email: string,
      fullname: string,
      password: string,
      resetToken: string,
      isVerified: boolean,
      user_role: string,
      profile:
        {
            gender: string,
            gravator: string            
        },
     watchHistory: Object
     {
         videoId: video.videoId,
         title: video.title
         watchTime: Timestamp
     }
      createdAt: Timestamp,
      updatedAt: Timestamp
  }
```
## videos
##### Description
To store of all uploaded videos.
##### Schema JSON
  ```
  {
    videoId: string
    user: {
        id: user.userId
    },
    status: integer,
    title: string,
    category: string,
    description: string,
    tags : Array,
    hours: integer,
    minutes: integer,
    seconds: integer,
    views: integer,
    likes: integer,
    dislikes: integer,
    filePath: url,
    uploadedAt: timestamp,
    updatedAt: timestamp
}
  ```
  
## video_meta
##### Description
To store comments, replies for each video
##### Schema JSON
  ```
  {
      commentId: string,
      videoId: string,
      name: string,
      text: string,
      commentLikes: integer,
      commentDislikes:integer
      replies: Object 
      {
          replyID: string,
          reply: string
      }
  }
  ```
 

