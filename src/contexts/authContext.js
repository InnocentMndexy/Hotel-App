import React, { useContext,useState, useEffect } from 'react'
 import { auth } from '../../src/config/firebase'

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}
export  function AuthProvider({children}) {
    const[currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email, password){
        return auth.createUserWithEmailAndPassword(email, password)
    }

    // function signin(email, password){
    //     return auth.signInWithEmailAndPassword(email, password)
    // }

    function resetPassword(email){
        return auth.sendPasswordResetEmail(email)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user =>{
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])
    
  
    const value ={
        currentUser,
        // signin,
        signup,
        resetPassword
    }
    return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}
