import { findRenderedComponentWithType, findRenderedDOMComponentWithClass,
  renderIntoDocument } from 'react-dom/test-utils';
import { assert } from 'chai';
import ErrorBoundary from '../src';
import EvalComponent from './EvalComponent';
import React from 'react';

let savedHandler : EventListener = undefined;
before( () => {
  // Save Mocha's handler.
  savedHandler = window.onerror;
} );

describe( 'ErrorWrapper', () => {

  // Stop Mocha from handling uncaughtExceptions.
  // See https://github.com/facebook/react/issues/13681
  // Receipt from https://stackoverflow.com/a/39354332
  // Also missing 'process' var definition for Mocha :-(
  // eslint-disable-next-line
  before( () : unknown => ( Mocha as any ).process.removeListener( 'uncaughtException' ) );

  it( 'displays children if no errors', () => {

    const rendered = renderIntoDocument( <ErrorBoundary logToConsole={false}>
      <EvalComponent />
    </ErrorBoundary> ) as unknown as ErrorBoundary;
    assert.ok( rendered );

    const evalComponent : EvalComponent =
      findRenderedComponentWithType( rendered, EvalComponent ) as unknown as EvalComponent;

    evalComponent.setScript( '1' );
    assert.strictEqual( '1', evalComponent.getResult() );

    try {
      evalComponent.setScript( 'throw \'test error\'' );
    } catch ( err ) {
      // expected
    }
    assert.strictEqual( true, rendered.state.hasError );
    assert.strictEqual( 'test error', rendered.state.error );

    const alertDiv : HTMLDivElement =
      findRenderedDOMComponentWithClass( rendered, 'alert' ) as unknown as HTMLDivElement;
    assert.strictEqual( 'Error occured: "test error"', alertDiv.textContent );
  } );

  /* Restore the handler so that the next tests are treated as mocha treats them */
  after( (): unknown => window.onerror = savedHandler );
} );
