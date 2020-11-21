const express = require('express');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const aws = require('aws-sdk');
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');
const UploaderS3Router = require('react-dropzone-s3-uploader/s3router');

// Route includes
const adminPhotos = require('./routes/adminphotos.router');
const adminRouter = require('./routes/admin.router');
const contestDetailsRouter = require('./routes/contestDetails.router');
const contestRouter = require('./routes/contest.router');
const challengePhotosRouter = require('./routes/challengephotos.router');
const challengesRouter = require('./routes/challenges.router');
const dailyChallengeRouter = require('./routes/dailychallenge.router');
const faqRouter = require('./routes/faq.router');
const logsRouter = require('./routes/logs.router');
const photosRouter = require('./routes/photos.router');
const rulesRouter = require('./routes/rules.router');
const stepsRouter = require('./routes/steps.router');
const subtractSteps = require('./routes/subtractsteps.router');
const teamDetailsRouter = require('./routes/teamdetails.router');
const teamsRouter = require('./routes/teams.router');
const userRouter = require('./routes/user.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/admin', adminRouter);
app.use('/api/adminphotos', adminPhotos);
app.use('/api/challengephotos', challengePhotosRouter);
app.use('/api/challenges', challengesRouter);
app.use('/api/contest', contestRouter);
app.use('/api/contestDetails', contestDetailsRouter);
app.use('/api/dailychallenge', dailyChallengeRouter);
app.use('/api/faq', faqRouter);
app.use('/api/logs', logsRouter);
app.use('/api/photos', photosRouter);
app.use('/api/rules', rulesRouter);
app.use('/api/steps', stepsRouter);
app.use('/api/subtractsteps', subtractSteps);
app.use('/api/teamDetails', teamDetailsRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/user', userRouter);

app.use('/s3', UploaderS3Router({
  bucket: process.env.S3_BUCKET,                // required
  region: 'us-east-2',                            // optional
  headers: {'Access-Control-Allow-Origin': '*'},  // optional
  ACL: 'public-read',                             // this is the default - set to `public-read` to let anyone view uploads
}));

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
