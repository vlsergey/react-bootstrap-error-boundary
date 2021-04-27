import React, { ErrorInfo, PureComponent, ReactNode } from 'react';
import Alert from 'react-bootstrap/Alert';

export interface PropsType {
  logToConsole?: boolean;
  errorMessage?: ( error : unknown ) => ReactNode;
  errorMessagePrefix?: ReactNode;
  variant?: string;
}

interface StateType {
  error: unknown;
  hasError : boolean;
}

export default class ErrorBoundary
  extends PureComponent<PropsType, StateType> {

  static defaultProps = {
    errorMessagePrefix: 'Error occured: ',
    logToConsole: true,
    variant: 'danger',
  }

  static getDerivedStateFromError( error : unknown ) : Partial<StateType> {
    return { hasError: true, error };
  }

  private defaultErrorMessage = ( error:unknown ) : ReactNode => <>
    {this.props.errorMessagePrefix}
    { typeof ( error as {message?: string} ).message === 'string'
      ? ( error as {message?: string} ).message
      : JSON.stringify( error ) }
  </>;

  state : StateType = {
    error: null,
    hasError: false,
  };

  componentDidCatch( error : unknown, errorInfo: ErrorInfo ) : void {
    this.setState( { error, hasError: true } );
    if ( this.props.logToConsole ) {
      console.log( error );
      console.log( errorInfo );
    }
  }

  render() : ReactNode {
    if ( this.state.hasError ) {
      return <Alert variant={this.props.variant}>
        {( this.props.errorMessage || this.defaultErrorMessage )( this.state.error )}
      </Alert>;
    }

    return this.props.children;
  }

}
