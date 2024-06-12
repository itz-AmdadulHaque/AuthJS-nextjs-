// mimiking a database
const users = [
    {
      email: "amdad@gmail.com",
      password: "password"
    },
    {
      email: "alex@email.com",
      password: "password"
    },
    {
      email: "bob@email.com",
      password: "password"
    }
  ]
  
  // cheking if user exist
  export const getUserByEmail = (email) => {
    const found = users.find(user => user.email === email);
    return found;
  }