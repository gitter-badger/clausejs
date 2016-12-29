var getFragments = require( './fragmenter' );
var isPred = require( '../utils/isPred' );
var isSpec = require( '../utils/isSpec' );
var isStr = require( '../preds/isStr' );
var fnName = require( '../utils/fnName' );

function describe( expr ) {
  return _strFragments( expr ).join( '' );
}

function _strFragments( expr, interceptor ) {

  if ( isPred( expr ) ) {
    return [ fnName( expr ), '()' ];
  } else if ( expr.type === 'PRED' ) {
    return _strFragments( expr.opts.predicate, interceptor );
  } else if ( isSpec( expr ) ) {
    if ( expr.type === 'DELAYED' || expr.type === 'SPEC_REF' ) {
      return _strFragments( expr.get(), interceptor );
    } else {
      return [ expr.type.toLowerCase(), '(', ]
        .concat( _processInner( expr, interceptor ) )
        .concat( [ ')' ] );
    }
  } else {
    console.error( expr );
    throw new Error( 'Argument must be an expression' );
  }
}

function _processInner( spec, interceptor ) {
  // TODO: remove first part
  var fragments = getFragments( spec, interceptor );
  return fragments.reduce(
    ( acc, piece ) =>
      isStr( piece ) ? acc.concat( piece ) :
      acc.concat( _strFragments( piece, interceptor ) ), []
    );
}

module.exports = describe;
