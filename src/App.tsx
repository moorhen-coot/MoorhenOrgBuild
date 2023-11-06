import { MoorhenReduxProvider, MoorhenContainer } from 'moorhen'
import React from 'react'

function App() {

  return  <React.StrictMode>
            <div className="App">
              <MoorhenReduxProvider>
                <MoorhenContainer/>
              </MoorhenReduxProvider>  
            </div>
          </React.StrictMode>
}

export default App
