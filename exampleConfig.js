module.exports = {
  email: {
    from: 'emailfrom@example.com',
    host: 'smtp.example.com',
    auth: {
      user: 'emailusername',
      pass: 'emailpassword'
    }
  },
  sessionSecret: 'sessionSecret (any random string)',
  env: process.env.NODE_ENV || 'development',
  defaultUser: {
    username: 'defaultUser',
    password: 'password',
    email: 'whatever@example.com',
    actualName: 'Monty Dawson'
  }
};
