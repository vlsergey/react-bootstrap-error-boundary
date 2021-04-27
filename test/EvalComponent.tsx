import React, { PureComponent, ReactNode } from 'react';

interface StateType {
  script: string;
}

export default class EvalComponent extends PureComponent<unknown, StateType> {

  private divRef = React.createRef<HTMLDivElement>();

  state = {
    script: '0',
  };

  getResult = () : string =>
    this.divRef.current ? this.divRef.current.textContent : null;

  setScript = ( script : string ) : unknown =>
    this.setState( { script } );

  render() : ReactNode {
    const { script } = this.state;
    return <div ref={this.divRef}>
      { eval( script ) as ReactNode }
    </div>;
  }

}
