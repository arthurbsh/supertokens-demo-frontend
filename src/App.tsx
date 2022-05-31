import './App.css';
import SuperTokens, { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import ThirdPartyEmailPassword, {Google} from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import { ThirdPartyEmailPasswordAuth } from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import { signOut } from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import Session from "supertokens-auth-react/recipe/session";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { useSessionContext } from 'supertokens-auth-react/recipe/session'; 

import * as reactRouterDom from 'react-router-dom';
import { useEffect } from 'react';

SuperTokens.init({
    appInfo: {
        // learn more about this on https://supertokens.com/docs/thirdpartyemailpassword/appinfo
        appName: "SuperTokensTest",
        apiDomain: "https://ahol-supertokens-test.azurewebsites.net",
        websiteDomain: "http://localhost:3000",
        apiBasePath: "/auth",
        websiteBasePath: "/auth"
    },
    recipeList: [
        ThirdPartyEmailPassword.init({
          emailVerificationFeature: {
            mode: "REQUIRED"
        },
            signInAndUpFeature: {
                providers: [
                    Google.init(),
                ]
            }
        }),
        Session.init()
    ]
});

function App() {

  useEffect(() => {}, []);



  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {getSuperTokensRoutesForReactRouterDom(reactRouterDom)}
          <Route path="/" element={<p>Landing page</p>}></Route>
          <Route path="/dashboard" element={<ThirdPartyEmailPasswordAuth><Dashboard/></ThirdPartyEmailPasswordAuth>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function Dashboard() {

  const onSignout = async () => {
    await signOut();
    window.location.href = '/';
  }

  let {userId, accessTokenPayload } = useSessionContext();

  console.log(userId, accessTokenPayload);

  return (
    <>
      <div>Dashboard</div>
      <button onClick={onSignout}>Sign-out </button>
      </>
    
  )
}

export default App;
