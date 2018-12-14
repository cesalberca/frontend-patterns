import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { contextValue, Provider } from './rootContainer'
import { LightController } from './LightController'

export class Application extends Component {
  public render(): React.ReactNode {
    return (
      <Provider value={contextValue}>
        <LightController state={contextValue.state}/>
      </Provider>
    )
  }
}

const root = document.getElementById('root')
ReactDOM.render(<Application />, root)
