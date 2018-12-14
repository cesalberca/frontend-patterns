import React, { Component } from 'react'
import { StateManager } from './state/StateManager'
import { Observer } from './state/Observer'
import { Light, LightStates } from './Light'
import { Consumer } from './rootContainer'

interface Props {
  state: StateManager
}

export class LightController extends Component<Props> implements Observer {
  public componentDidMount(): void {
    this.props.state.register(this)
  }

  public getState(): LightStates {
    if (this.props.state.state.isLoading) {
      return 'loading'
    }

    if (this.props.state.state.hasError) {
      return 'error'
    }

    if (this.props.state.state.hasSuccess) {
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
              disabled={this.props.state.state.isLoading}
              className={`button ${
                this.props.state.state.isLoading
                  ? 'button--disabled'
                  : ''
              }`}
              onClick={async () => {
                this.props.state.state.users = []
                this.props.state.state.users = await context.fakeUserRepository.findAll()
              }}
            >
              Get users
            </button>
            <h3>Users</h3>
            {this.props.state.state.users.map(user => (
              <p key={user.name}>{user.name}</p>
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
