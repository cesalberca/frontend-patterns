import React, { Component } from 'react'
import { StateManager } from './state/StateManager'
import { Observer } from './state/Observer'
import { Light, LightStates } from './Light'
import { Consumer } from './rootContainer'

interface Props {
  stateManager: StateManager
}

interface State {
  isWarningVisible: boolean
}

export class LightContainer extends Component<Props, State> implements Observer {
  public constructor(props: Props) {
    super(props)
    this.state = {
      isWarningVisible: false
    }
  }

  public componentDidMount(): void {
    this.props.stateManager.register(this)
  }

  public getState(): LightStates {
    if (this.props.stateManager.state.isLoading) {
      return 'loading'
    }

    if (this.props.stateManager.state.hasError) {
      return 'error'
    }

    if (this.props.stateManager.state.hasSuccess) {
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
              disabled={this.props.stateManager.state.isLoading}
              className={`button ${this.props.stateManager.state.isLoading ? 'button--disabled' : ''}`}
              onClick={async () => {
                this.props.stateManager.state.users = await context.fakeUserRepository.findAll()
              }}
            >
              Get users
            </button>

            {!(this.props.stateManager.state.hasWarning && this.state.isWarningVisible) ? (
              <button
                className="button"
                onClick={async () => {
                  this.setState({ isWarningVisible: true })
                  await context.fakeUserRepository.deleteAll()

                  if (!this.props.stateManager.state.userHasCanceledOperation) {
                    this.props.stateManager.state.users = await context.fakeUserRepository.findAll()
                  }
                }}
              >
                Delete users
              </button>
            ) : (
              <button
                className="button button--warning"
                onClick={() => {
                  this.props.stateManager.state.userHasCanceledOperation = true
                  this.setState({ isWarningVisible: false })
                }}
              >
                Cancel delete users
              </button>
            )}

            <h3>Users</h3>
            {this.props.stateManager.state.users.map(user => (
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
