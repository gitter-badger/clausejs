module.exports = function oneOf( ) {
  var items;

  if ( arguments.length === 1 && Array.isArray( arguments[ 0 ] ) ) {
    items = arguments[ 0 ];
  } else if ( arguments.length > 0 ) {
    items = Array.prototype.slice.call( arguments );
  } else {
    throw new Error( 'Items list is required.' );
  }
  return function oneOfItems( x ) {
    return items.indexOf( x ) >= 0;
  }
}
