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
        Sentry.captureException( e )
      })
    }    
  }

  return (
    <div className="App-header">
      <button onClick={handleNotExpectedError} className="button1Cls" id="button1">Break the world</button>
      <br/>
      <button onClick={handleExpectedError} className="button2Cls" id="button2">Trigger expected Error</button>
    </div>
  )
}

export default App;
