import brcypt from 'bcryptjs'

const users = [
    {
      name: 'Admin User',
      email: 'admin@example.com',
      password: brcypt.hashSync('123456', 10),
      isAdmin: true,
    },
    {
      name: 'Bhavika',
      email: 'bhavika@example.com',
      password: brcypt.hashSync('123456', 10),
    },
    {
      name: 'Suraj',
      email: 'suraj@example.com',
      password: brcypt.hashSync('123456', 10),
    },
  ]
  
  export default users