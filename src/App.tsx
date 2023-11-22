import { MoorhenReduxProvider, MoorhenContainer, ErrorBoundary } from 'moorhen'
import React from 'react'

function App() {

  return  <React.StrictMode>
            <ErrorBoundary >
              <div className="App">
                <MoorhenReduxProvider>
                  <MoorhenContainer/>
                </MoorhenReduxProvider>  
              </div>
            </ErrorBoundary>
          </React.StrictMode>
}

export default App
