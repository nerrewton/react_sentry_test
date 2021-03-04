import React, { useState } from 'react';
import * as Sentry from "@sentry/react";
import './App.css';

function App() {
  const [status, setStatus] = useState(false)

  const handleNotExpectedError = () => {
    throw new Error("Unexpected error just happen!");
  }

  const handleExpectedError = async () => {
    try{
      let promise = new Promise<string>((resolve, reject) => {
        setTimeout(() => {
          if (status === false) return resolve("Everything was all right!")
          reject("There has been an expected error")
        }, 1000)
      })
  
      await promise.then( response => {
        alert( response )
        setStatus( !status )
      }).catch(e => {
        setStatus( !status )
        throw new Error( e )
      })
    } catch( e ){
      Sentry.withScope( ( scope ) => {
        scope.clear()
        scope.setTag("section", "articles")
        scope.setExtras({
          id: 123,
          name: "Gerardo"
        })
        scope.setTransactionName("Error from home")
        scope.setLevel(Sentry.Severity.Log)
        Sentry.captureMessage( e.getMessage() )
      })
    }    
  }

  return (
    <React.Fragment>
      <button onClick={handleNotExpectedError}>Break the world</button>
      <button onClick={handleExpectedError}>Trigger expected Error</button>
    </React.Fragment>
  )
}

export default App;
