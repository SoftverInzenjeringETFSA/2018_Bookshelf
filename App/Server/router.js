/*eslint no-undef: "off"*/
module.exports = [{ 
  path: '/',
  handler: require('routes/indexRoute'),
}, {
  path: '/registration',
  handler: require('routes/registrationRoute'),
}];

// Router.forEach(route => {
//   app.use(route.path, route.handler);
// });
