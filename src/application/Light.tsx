import React, { Component } from 'react'

export type LightStates = 'loading' | 'error' | 'success' | 'none'

interface Props {
  state: LightStates
}

export class Light extends Component<Props> {
  public render() {
    return (
      <div>
        <span className={`light light--${this.props.state}`} />
      </div>
    )
  }
}
