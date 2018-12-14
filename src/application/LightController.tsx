import React, { Component } from 'react'
import { State } from './State'
import { Observer } from '../Observer'
import { Light, LightStates } from './Light'
import { Consumer } from './rootContainer'

interface Props {
  state: State
}

export class LightController extends Component<Props> implements Observer {
  public componentDidMount(): void {
    this.props.state.register(this)
  }

  public getState(): LightStates {
    if (this.props.state.currentState.isLoading) {
      return 'loading'
    }

    if (this.props.state.currentState.hasError) {
      return 'error'
    }

    if (this.props.state.currentState.hasSuccess) {
      return 'success'
    }

    return 'none'
  }

  public render(): React.ReactNode {
    return (
      <Consumer>
        {context => (
          <div>
            <Light state={this.getState()} />
            <button
              disabled={this.props.state.currentState.isLoading}
              className={`button ${
                this.props.state.currentState.isLoading
                  ? 'button--disabled'
                  : ''
              }`}
              onClick={() => {
                context.requestHandler.trigger()
              }}
            >
              Trigger
            </button>
          </div>
        )}
      </Consumer>
    )
  }

  public notify() {
    this.forceUpdate()
  }
}
