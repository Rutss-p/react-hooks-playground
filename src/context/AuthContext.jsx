import { createContext, useState } from "react";

const AuthContext = createContext(null);

function AuthProvider({children}){
    const[user, setUser]= useState({
        name:'rutuja',
        role:'Admin'
})
return(
    <AuthContext.Provider value={{user, setUser}}>
        {children}
    </AuthContext.Provider>
)
}
export {AuthProvider};
export default AuthContext;

// user stores the logged-in user's information.
// setUser updates the user information
// Initially, the user is Rutuja and the role is admin.

// children represents whatever components we place inside this component.
// children is a special React prop that represents whatever components or JSX elements we place between the opening and closing tags of AuthProvider.

// - AuthProvider receives <App /> through its children prop.
// - It renders <App /> inside AuthContext.Provider.
// - The context value { user, setUser } becomes available to components inside App.