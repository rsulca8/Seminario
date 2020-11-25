import React from 'react'


const AuthContext = React.createContext({
  user: '',
  password: '',
  logged: false
});



export default AuthContext