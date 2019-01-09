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

  private getState = (): LightStates => {
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

  private toggleWarning = () => {
    this.setState((previousState) => ({
      isWarningVisible: !previousState.isWarningVisible
    }))
  }

  public render(): React.ReactNode {
    const { state } = this.props.stateManager

    return (
      <Consumer>
        {context => (
          <div className="light-controller">
            <Light state={this.getState()} />
            <button
              disabled={state.isLoading}
              className={`button ${state.isLoading ? 'button--disabled' : ''}`}
              onClick={async () => {
                state.users = await context.fakeUserRepository.findAll()
              }}
            >
              Get users
            </button>

            {!(state.hasWarning && this.state.isWarningVisible) ? (
              <button
                className="button"
                onClick={async () => {
                  this.toggleWarning()
                  await context.fakeUserRepository.deleteAll()

                  if (!state.userHasCanceledOperation) {
                    state.users = await context.fakeUserRepository.findAll()
                  }
                }}
              >
                Delete users
              </button>
            ) : (
              <button
                className="button button--warning"
                onClick={() => {
                  state.userHasCanceledOperation = true
                  this.toggleWarning()
                }}
              >
                Cancel delete users
              </button>
            )}

            <h3>Users</h3>
            {state.users.map(user => (
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
