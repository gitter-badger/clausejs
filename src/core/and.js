var isSpec = require( '../utils/isSpec' );
var Spec = require( '../models/Spec' );
var { oneOrMore, cat, ExprSpec } = require( './regex' );
var fspec = require( './fspec' );
var walk = require( '../walk' );

var AndSpec = fspec( {
  args: cat( 'exprs', oneOrMore( ExprSpec ) ),
  ret: isSpec,
} );

function andOp( conformedArgs ) {
  var { exprs } = conformedArgs;

  var andS = new Spec( {
    type: 'AND',
    exprs,
    fragments: exprs,
  } );
  andS.conform = function andConform( x ) {
    return walk( andS, x, { conform: true } );
  }
  return andS;
}

var and = AndSpec.instrumentConformed( andOp );

module.exports = {
  and,
  AndSpec,
};
