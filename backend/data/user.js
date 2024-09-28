import brcypt from 'bcryptjs'

const users = [
    {
      name: 'Admin User',
      email: 'admin@example.com',
      password: brcypt.hashSync('123456', 10),
      isAdmin: true,
    },
    {
      name: 'vipin Yadav',
      email: 'vipin@gmail.com',
      password: brcypt.hashSync('123456', 10),
    },
    {
      name: 'Prashali Gangwar',
      email: 'prashali@gnail.com',
      password: brcypt.hashSync('123456', 10),
    },
    {
      name: 'Nitin Yadav',
      email: 'nitin@gnail.com',
      password: brcypt.hashSync('123456', 10),
    },
  ]
  
  export default users