const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy(
  {
    // all sensitive information should be in .env
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  (accessToken, refreshToken, profile, done) => {
    console.log('======================');
    console.log({ profile });
    console.log('======================');
    done(null, profile);
  },
));

passport.serializeUser((user, done) => {
  console.log('serializeUser=====================');
  console.log({ user });
  console.log('serializeUser=====================');
  done(null, { userId: user.id, name: user.displayName });
});

passport.deserializeUser((user, done) => {
  console.log('deserializeUser=====================');
  console.log({ user });
  console.log('deserializeUser=====================');
  done(null, user);
});
