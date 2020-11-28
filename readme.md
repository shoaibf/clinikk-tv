## Clinikk Video Streaming App
Clinikk-tv A Simple ExpressJS app using Typescript.

----------

### Getting started

To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- `npm start` to start the local server


----------

## Code overview

### Folders

- `src/controllers` - Contains all the application controller
- `src/routes` - Contains all the route definitions for our API
- `src/database` - Contains all the models and schema for our API
- `src/validators` - Contains all the validations for Post APIs

- `documentation` - Contains the system design, schema implemented for the Project

Run the project in development mode

    npm run dev

The api can now be accessed at

    http://localhost:3000

To compile all `src/app.ts` files to `dist/app.js`

    npm run build

POCs which are yet to be added -

- File Upload to S3 and transcoding the media for optimized video streaming
- Watch history of the user
- Admin Management and Video Management System
- Like, dislike for videos,comments
### License ###

This example codebases is open-sourced software licensed under the MIT license