import React, { useContext, useEffect, useState } from "react";
import { auth as firebaseAuth } from './firebase'

// this is what most component will use - Auth -- if user is logged in, what's the user's id?
interface Auth {
  loggedIn: boolean;
  userId?: string; // will only be available is loggedIn is true
}

// AuthInit is only used by App compnent when initializing firebase auth, so it has initial loading property
interface AuthInit {
  loading: boolean;
  // loggedIn: boolean;
  auth?: Auth; // if an auth object is available, then use it
}

export const AuthContext = React.createContext({ loggedIn: false })

export function useAuth(): Auth {
  return useContext(AuthContext)
}

// initializes auth state
// this now returns an object with loading flag and possibly an auth object if it's available
export function useAuthInit(): AuthInit {
  //const [ authInit, setAuthInit ] = useState<AuthInit>({loading: true, loggedIn: false}) this was before doing the interface with auth?: boolean;
const [ authInit, setAuthInit ] = useState<AuthInit>({loading: true}) //we parameterize the useState using AuthInit as it describes the shape of the object
  useEffect(() => {
    return firebaseAuth.onAuthStateChanged(firebaseUser => { // use return incase react unmounts component it will also stop subscription, becuase this is now a separate hook
    // console.log('onAuthStateChanged: ', user)
    // if firebaseUser is not null, the auth will be an object with loggedIn set to true and setting firebaseUser uid value : logged is false
    const auth = firebaseUser ? { loggedIn: true, userId: firebaseUser.uid } : { loggedIn: false }
    setAuthInit({loading: false, auth })
    // setAuthInit({ loading: false, auth: {loggedIn: Boolean(user)} }) if user is null ? then set to false. when it's an object ? then set to true this was before adding userId?: string;
    }) // have firebase notify us when auth state changes, outside of function so it gets called only once when app is loaded
  }, []) // emtpy array, effect should only run once, then never run again. The array is a list of values this effect depends on, so if one of the values change, this effect will run again

  return authInit

}
