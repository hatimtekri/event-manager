import logo from './logo.svg';
import React, { useEffect , Suspense, lazy } from 'react'
import './App.css';
import { BrowserRouter as Switch, Router, Route, BrowserRouter } from "react-router-dom";
import LoginPage from './Components/LoginPage';
import RegistrationPage from './Components/RegistrationPage';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useClearCache } from 'react-clear-cache';

import PrintPass from './Components/PrintPass';

function App() {
  const { isLatestVersion, emptyCacheStorage } = useClearCache();

  let ss = "huffazBarnamaj1443";


  useEffect(() => {
    if (!isLatestVersion) {
      console.log("cache delete");
      emptyCacheStorage();
    }
    else {
      console.log("same cache");
    }
  }, [isLatestVersion])



  const Lazy_Login = lazy(() => import('./Components/LoginPage'));
  const Lazy_Registration = lazy(() => import('./Components/RegistrationPage'));
  const Lazy_PrintPass = lazy(() => import('./Components/PrintPass'));
  const Lazy_Photos = lazy(() => import('./Components/Photos'));
  const Lazy_PhotosGeneral = lazy(() => import('./Components/GeneralPhotos'));
  const Lazy_Test = lazy(() => import('./Components/PhotosNavigation'));



  return (
    <>
      {/* <RegistrationPage></RegistrationPage> */}
      <BrowserRouter>

        <Route path={`/${ss}/Login`}>
          <Suspense fallback={<div>loading....</div>}>
            <Lazy_Login />
          </Suspense>
        </Route>
         <Route path={`/${ss}/test`}>
          <Suspense fallback={<div>loading....</div>}>
            <Lazy_Test />
          </Suspense>
        </Route> 
        {/* <Route path={`/${ss}/Registration`}>
          <Suspense fallback={<div>loading....</div>}>
            <Lazy_Registration />
          </Suspense>
        </Route>
        <Route path={`/${ss}/PrintPass`}>
          <Suspense fallback={<div>loading....</div>}>
            <Lazy_PrintPass />
          </Suspense>
        </Route> */}
        {/* <Route path={`/${ss}/GroupPhotos`}>
          <Suspense fallback={<div>loading....</div>}>
            <Lazy_Photos />
          </Suspense>
        </Route>
        <Route path={`/${ss}/GeneralPhotos`}>
          <Suspense fallback={<div>loading....</div>}>
            <Lazy_PhotosGeneral />
          </Suspense>
        </Route> */}

      </BrowserRouter>
    </>

  );
}

export default App;
