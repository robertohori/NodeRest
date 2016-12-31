var config = function() {
    var secret= {"secret":"ilovescotchyscotch"};

   var auth = {

       'facebookAuth': {
           'clientID': '1755709718087431', // your App ID
           'clientSecret': '66279012e14917e7e72097b319f74eaa', // your App Secret
           'callbackURL': 'http://keswickbjj.ca/auth/facebook/callback'
       },

       'twitterAuth': {
           'consumerKey': 'your-consumer-key-here',
           'consumerSecret': 'your-client-secret-here',
           'callbackURL': 'http://localhost:8080/auth/twitter/callback'
       },

       'googleAuth': {
           'clientID': 'your-secret-clientID-here',
           'clientSecret': 'your-client-secret-here',
           'callbackURL': 'http://localhost:8080/auth/google/callback'
       }
   };
    return {
        secret:secret,
        auth:auth
    }

};

module.exports = config;
