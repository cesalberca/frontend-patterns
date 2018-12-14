import React, { Component } from 'react'
import { State } from '../State'
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
          <div className="light-controller">
            <Light state={this.getState()} />
            <button
              disabled={this.props.state.currentState.isLoading}
              className={`button ${
                this.props.state.currentState.isLoading
                  ? 'button--disabled'
                  : ''
              }`}
              onClick={async () => {
                this.props.state.currentState.users = []
                this.props.state.currentState.users = await context.fakeUserRepository.findAll()
              }}
            >
              Get users
            </button>
            <h3>Users</h3>
            {this.props.state.currentState.users.map(user => (
              <p>{user.name}</p>
            ))}
          </div>
        )}
      </Consumer>
    )
  }

  public notify() {
    this.forceUpdate()
  }
}
