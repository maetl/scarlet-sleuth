/*!
 * jQuery JavaScript Library v2.1.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-18T15:11Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//

var arr = [];

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	version = "2.1.3",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	},

	isPlainObject: function( obj ) {
		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		if ( obj.constructor &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		// Support: Android<4.0, iOS<6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {
			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf("use strict") === 1 ) {
				script = document.createElement("script");
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {
			// Otherwise, avoid the DOM node creation, insertion
			// and removal by using an indirect global eval
				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE9-11+
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];
	nodeType = context.nodeType;

	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	if ( !seed && documentIsHTML ) {

		// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
		if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType !== 1 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;
	parent = doc.defaultView;

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Support tests
	---------------------------------------------------------------------- */
	documentIsHTML = !isXML( doc );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\f]' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Support: Blackberry 4.6
					// gEBID returns nodes no longer in the document (#6963)
					if ( elem && elem.parentNode ) {
						// Inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter(function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.unique( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// Add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// If we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed, false );
	window.removeEventListener( "load", completed, false );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// We once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[0], key ) : emptyGet;
};


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( owner ) {
	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};


function Data() {
	// Support: Android<4,
	// Old WebKit does not have Object.preventExtensions/freeze method,
	// return new empty object instead with no [[set]] accessor
	Object.defineProperty( this.cache = {}, 0, {
		get: function() {
			return {};
		}
	});

	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;
Data.accepts = jQuery.acceptData;

Data.prototype = {
	key: function( owner ) {
		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return the key for a frozen object.
		if ( !Data.accepts( owner ) ) {
			return 0;
		}

		var descriptor = {},
			// Check if the owner object already has a cache key
			unlock = owner[ this.expando ];

		// If not, create one
		if ( !unlock ) {
			unlock = Data.uid++;

			// Secure it in a non-enumerable, non-writable property
			try {
				descriptor[ this.expando ] = { value: unlock };
				Object.defineProperties( owner, descriptor );

			// Support: Android<4
			// Fallback to a less secure definition
			} catch ( e ) {
				descriptor[ this.expando ] = unlock;
				jQuery.extend( owner, descriptor );
			}
		}

		// Ensure the cache object
		if ( !this.cache[ unlock ] ) {
			this.cache[ unlock ] = {};
		}

		return unlock;
	},
	set: function( owner, data, value ) {
		var prop,
			// There may be an unlock assigned to this node,
			// if there is no entry for this "owner", create one inline
			// and set the unlock as though an owner entry had always existed
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {
			// Fresh assignments by object are shallow copied
			if ( jQuery.isEmptyObject( cache ) ) {
				jQuery.extend( this.cache[ unlock ], data );
			// Otherwise, copy the properties one-by-one to the cache object
			} else {
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		// Either a valid cache is found, or will be created.
		// New caches will be created and the unlock returned,
		// allowing direct access to the newly created
		// empty data object. A valid owner object must be provided.
		var cache = this.cache[ this.key( owner ) ];

		return key === undefined ?
			cache : cache[ key ];
	},
	access: function( owner, key, value ) {
		var stored;
		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				((key && typeof key === "string") && value === undefined) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase(key) );
		}

		// [*]When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		if ( key === undefined ) {
			this.cache[ unlock ] = {};

		} else {
			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );
				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {
					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;
			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}
	},
	hasData: function( owner ) {
		return !jQuery.isEmptyObject(
			this.cache[ owner[ this.expando ] ] || {}
		);
	},
	discard: function( owner ) {
		if ( owner[ this.expando ] ) {
			delete this.cache[ owner[ this.expando ] ];
		}
	}
};
var data_priv = new Data();

var data_user = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			data_user.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend({
	hasData: function( elem ) {
		return data_user.hasData( elem ) || data_priv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return data_user.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		data_user.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to data_priv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return data_priv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		data_priv.remove( elem, name );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = data_user.get( elem );

				if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					data_priv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				data_user.set( this, key );
			});
		}

		return access( this, function( value ) {
			var data,
				camelKey = jQuery.camelCase( key );

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {
				// Attempt to get data from the cache
				// with the key as-is
				data = data_user.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to get data from the cache
				// with the key camelized
				data = data_user.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each(function() {
				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = data_user.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				data_user.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf("-") !== -1 && data !== undefined ) {
					data_user.set( this, key, value );
				}
			});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each(function() {
			data_user.remove( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = data_priv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = data_priv.access( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return data_priv.get( elem, key ) || data_priv.access( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				data_priv.remove( elem, [ type + "queue", key ] );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = data_priv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};

var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Safari<=5.1
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari<=5.1, Android<4.2
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<=11+
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
})();
var strundefined = typeof undefined;



support.focusinBubbles = "onfocusin" in window;


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.hasData( elem ) && data_priv.get( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;
			data_priv.remove( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome<28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle, false );
	}
};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: Android<4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && e.preventDefault ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && e.stopPropagation ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// Support: Chrome 15+
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// Support: Firefox, Chrome, Safari
// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				data_priv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					data_priv.remove( doc, fix );

				} else {
					data_priv.access( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {

		// Support: IE9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

// Support: IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: 1.x compatibility
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute("type");
	}

	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		data_priv.set(
			elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
		);
	}
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( data_priv.hasData( src ) ) {
		pdataOld = data_priv.access( src );
		pdataCur = data_priv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( data_user.hasData( src ) ) {
		udataOld = data_user.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		data_user.set( dest, udataCur );
	}
}

function getAll( context, tag ) {
	var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
			context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	},

	cleanData: function( elems ) {
		var data, elem, type, key,
			special = jQuery.event.special,
			i = 0;

		for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
			if ( jQuery.acceptData( elem ) ) {
				key = elem[ data_priv.expando ];

				if ( key && (data = data_priv.cache[ key ]) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}
					if ( data_priv.cache[ key ] ) {
						// Discard any remaining `private` data
						delete data_priv.cache[ key ];
					}
				}
			}
			// Discard any remaining `user` data
			delete data_user.cache[ elem[ data_user.expando ] ];
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each(function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				});
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							// Support: QtWebKit
							// jQuery.merge because push.apply(_, arraylike) throws
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optimization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {
		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		if ( elem.ownerDocument.defaultView.opener ) {
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		}

		return window.getComputedStyle( elem, null );
	};



function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];
	}

	if ( computed ) {

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// Support: iOS < 6
		// A tribute to the "awesome hack by Dean Edwards"
		// iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
		// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
		if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?
		// Support: IE
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {
				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	var pixelPositionVal, boxSizingReliableVal,
		docElem = document.documentElement,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	if ( !div.style ) {
		return;
	}

	// Support: IE9-11+
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" +
		"position:absolute";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computePixelPositionAndBoxSizingReliable() {
		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";
		div.innerHTML = "";
		docElem.appendChild( container );

		var divStyle = window.getComputedStyle( div, null );
		pixelPositionVal = divStyle.top !== "1%";
		boxSizingReliableVal = divStyle.width === "4px";

		docElem.removeChild( container );
	}

	// Support: node.js jsdom
	// Don't assume that getComputedStyle is a property of the global object
	if ( window.getComputedStyle ) {
		jQuery.extend( support, {
			pixelPosition: function() {

				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computePixelPositionAndBoxSizingReliable();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				if ( boxSizingReliableVal == null ) {
					computePixelPositionAndBoxSizingReliable();
				}
				return boxSizingReliableVal;
			},
			reliableMarginRight: function() {

				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
					marginDiv = div.appendChild( document.createElement( "div" ) );

				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =
					// Support: Firefox<29, Android 2.3
					// Vendor-prefix box-sizing
					"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
					"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				docElem.appendChild( container );

				ret = !parseFloat( window.getComputedStyle( marginDiv, null ).marginRight );

				docElem.removeChild( container );
				div.removeChild( marginDiv );

				return ret;
			}
		});
	}
})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
	// Swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[0].toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = data_priv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = data_priv.access( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend({

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Support: IE9-11+
			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
				style[ name ] = value;
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*.
					// Use string for doubling so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur(),
				// break the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = data_priv.get( elem, "fxshow" );

	// Handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// Ensure the complete handler is called before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// Height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			data_priv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always(function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		});
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = data_priv.access( elem, "fxshow", {} );
		}

		// Store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;

			data_priv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// Don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || data_priv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = data_priv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = data_priv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS<=5.1, Android<=4.2+
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE<=11+
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: Android<=2.3
	// Options inside disabled selects are incorrectly marked as disabled
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<=11+
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
})();


var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {
			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
});




var rfocusable = /^(?:input|select|textarea|button)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each(function() {
			delete this[ jQuery.propFix[ name ] || name ];
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
					elem.tabIndex :
					-1;
			}
		}
	}
});

if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = arguments.length === 0 || typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// Toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					data_priv.set( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// Handle most common string cases
					ret.replace(rreturn, "") :
					// Handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE6-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( (option.selected = jQuery.inArray( option.value, values ) >= 0) ) {
						optionSet = true;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		tmp = new DOMParser();
		xml = tmp.parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = window.location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,
			// URL without anti-cache param
			cacheURL,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapAll( html.call(this, i) );
			});
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
};
jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


jQuery.ajaxSettings.xhr = function() {
	try {
		return new XMLHttpRequest();
	} catch( e ) {}
};

var xhrId = 0,
	xhrCallbacks = {},
	xhrSuccessStatus = {
		// file protocol always yields status code 0, assume 200
		0: 200,
		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE9
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]();
		}
	});
}

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport(function( options ) {
	var callback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr(),
					id = ++xhrId;

				xhr.open( options.type, options.url, options.async, options.username, options.password );

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers["X-Requested-With"] ) {
					headers["X-Requested-With"] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							delete xhrCallbacks[ id ];
							callback = xhr.onload = xhr.onerror = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {
								complete(
									// file: protocol always yields status 0; see #8605, #14207
									xhr.status,
									xhr.statusText
								);
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,
									// Support: IE9
									// Accessing binary-data responseText throws an exception
									// (#11426)
									typeof xhr.responseText === "string" ? {
										text: xhr.responseText
									} : undefined,
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				xhr.onerror = callback("error");

				// Create the abort callback
				callback = xhrCallbacks[ id ] = callback("abort");

				try {
					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {
					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {
	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery("<script>").prop({
					async: true,
					charset: s.scriptCharset,
					src: s.url
				}).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};




var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// Support: BlackBerry 5, iOS 3 (original iPhone)
		// If we don't have gBCR, just use 0,0 rather than error
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : window.pageXOffset,
					top ? val : window.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Support: Safari<7+, Chrome<37+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
//     Underscore.js 1.7.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    concat           = ArrayProto.concat,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.7.0';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var createCallback = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      case 2: return function(value, other) {
        return func.call(context, value, other);
      };
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  // A mostly-internal function to generate callbacks that can be applied
  // to each element in a collection, returning the desired result — either
  // identity, an arbitrary callback, a property matcher, or a property accessor.
  _.iteratee = function(value, context, argCount) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return createCallback(value, context, argCount);
    if (_.isObject(value)) return _.matches(value);
    return _.property(value);
  };

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    if (obj == null) return obj;
    iteratee = createCallback(iteratee, context);
    var i, length = obj.length;
    if (length === +length) {
      for (i = 0; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };

  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {
    if (obj == null) return [];
    iteratee = _.iteratee(iteratee, context);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length),
        currentKey;
    for (var index = 0; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = function(obj, iteratee, memo, context) {
    if (obj == null) obj = [];
    iteratee = createCallback(iteratee, context, 4);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        index = 0, currentKey;
    if (arguments.length < 3) {
      if (!length) throw new TypeError(reduceError);
      memo = obj[keys ? keys[index++] : index++];
    }
    for (; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      memo = iteratee(memo, obj[currentKey], currentKey, obj);
    }
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = function(obj, iteratee, memo, context) {
    if (obj == null) obj = [];
    iteratee = createCallback(iteratee, context, 4);
    var keys = obj.length !== + obj.length && _.keys(obj),
        index = (keys || obj).length,
        currentKey;
    if (arguments.length < 3) {
      if (!index) throw new TypeError(reduceError);
      memo = obj[keys ? keys[--index] : --index];
    }
    while (index--) {
      currentKey = keys ? keys[index] : index;
      memo = iteratee(memo, obj[currentKey], currentKey, obj);
    }
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var result;
    predicate = _.iteratee(predicate, context);
    _.some(obj, function(value, index, list) {
      if (predicate(value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    if (obj == null) return results;
    predicate = _.iteratee(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(_.iteratee(predicate)), context);
  };

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    if (obj == null) return true;
    predicate = _.iteratee(predicate, context);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        index, currentKey;
    for (index = 0; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    if (obj == null) return false;
    predicate = _.iteratee(predicate, context);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        index, currentKey;
    for (index = 0; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (obj.length !== +obj.length) obj = _.values(obj);
    return _.indexOf(obj, target) >= 0;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matches(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matches(attrs));
  };

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = obj.length === +obj.length ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value > result) {
          result = value;
        }
      }
    } else {
      iteratee = _.iteratee(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = obj.length === +obj.length ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value < result) {
          result = value;
        }
      }
    } else {
      iteratee = _.iteratee(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Shuffle a collection, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var set = obj && obj.length === +obj.length ? obj : _.values(obj);
    var length = set.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
      rand = _.random(0, index);
      if (rand !== index) shuffled[index] = shuffled[rand];
      shuffled[rand] = set[index];
    }
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (obj.length !== +obj.length) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    iteratee = _.iteratee(iteratee, context);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iteratee(value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iteratee, context) {
      var result = {};
      iteratee = _.iteratee(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key]++; else result[key] = 1;
  });

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = _.iteratee(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = low + high >>> 1;
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return obj.length === +obj.length ? obj.length : _.keys(obj).length;
  };

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(obj, predicate, context) {
    predicate = _.iteratee(predicate, context);
    var pass = [], fail = [];
    _.each(obj, function(value, key, obj) {
      (predicate(value, key, obj) ? pass : fail).push(value);
    });
    return [pass, fail];
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[0];
    if (n < 0) return [];
    return slice.call(array, 0, n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return slice.call(array, Math.max(array.length - n, 0));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, output) {
    if (shallow && _.every(input, _.isArray)) {
      return concat.apply(output, input);
    }
    for (var i = 0, length = input.length; i < length; i++) {
      var value = input[i];
      if (!_.isArray(value) && !_.isArguments(value)) {
        if (!strict) output.push(value);
      } else if (shallow) {
        push.apply(output, value);
      } else {
        flatten(value, shallow, strict, output);
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (array == null) return [];
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = _.iteratee(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = array.length; i < length; i++) {
      var value = array[i];
      if (isSorted) {
        if (!i || seen !== value) result.push(value);
        seen = value;
      } else if (iteratee) {
        var computed = iteratee(value, i, array);
        if (_.indexOf(seen, computed) < 0) {
          seen.push(computed);
          result.push(value);
        }
      } else if (_.indexOf(result, value) < 0) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(flatten(arguments, true, true, []));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    if (array == null) return [];
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = array.length; i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      for (var j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = flatten(slice.call(arguments, 1), true, true, []);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function(array) {
    if (array == null) return [];
    var length = _.max(arguments, 'length').length;
    var results = Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(arguments, i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, length = list.length; i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, length = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = isSorted < 0 ? Math.max(0, length + isSorted) : isSorted;
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    for (; i < length; i++) if (array[i] === item) return i;
    return -1;
  };

  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var idx = array.length;
    if (typeof from == 'number') {
      idx = from < 0 ? idx + from + 1 : Math.min(idx, from + 1);
    }
    while (--idx >= 0) if (array[idx] === item) return idx;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = step || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var Ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    var args, bound;
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    args = slice.call(arguments, 2);
    bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      Ctor.prototype = func.prototype;
      var self = new Ctor;
      Ctor.prototype = null;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (_.isObject(result)) return result;
      return self;
    };
    return bound;
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    return function() {
      var position = 0;
      var args = boundArgs.slice();
      for (var i = 0, length = args.length; i < length; i++) {
        if (args[i] === _) args[i] = arguments[position++];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return func.apply(this, args);
    };
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var i, length = arguments.length, key;
    if (length <= 1) throw new Error('bindAll must be passed function names');
    for (i = 1; i < length; i++) {
      key = arguments[i];
      obj[key] = _.bind(obj[key], obj);
    }
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = hasher ? hasher.apply(this, arguments) : key;
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){
      return func.apply(null, args);
    }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;

      if (last < wait && last > 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed before being called N times.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      } else {
        func = null;
      }
      return memo;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    if (!_.isObject(obj)) return obj;
    var source, prop;
    for (var i = 1, length = arguments.length; i < length; i++) {
      source = arguments[i];
      for (prop in source) {
        if (hasOwnProperty.call(source, prop)) {
            obj[prop] = source[prop];
        }
      }
    }
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj, iteratee, context) {
    var result = {}, key;
    if (obj == null) return result;
    if (_.isFunction(iteratee)) {
      iteratee = createCallback(iteratee, context);
      for (key in obj) {
        var value = obj[key];
        if (iteratee(value, key, obj)) result[key] = value;
      }
    } else {
      var keys = concat.apply([], slice.call(arguments, 1));
      obj = new Object(obj);
      for (var i = 0, length = keys.length; i < length; i++) {
        key = keys[i];
        if (key in obj) result[key] = obj[key];
      }
    }
    return result;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj, iteratee, context) {
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
    } else {
      var keys = _.map(concat.apply([], slice.call(arguments, 1)), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    if (!_.isObject(obj)) return obj;
    for (var i = 1, length = arguments.length; i < length; i++) {
      var source = arguments[i];
      for (var prop in source) {
        if (obj[prop] === void 0) obj[prop] = source[prop];
      }
    }
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }
    // Objects with different constructors are not equivalent, but `Object`s
    // from different frames are.
    var aCtor = a.constructor, bCtor = b.constructor;
    if (
      aCtor !== bCtor &&
      // Handle Object.create(x) cases
      'constructor' in a && 'constructor' in b &&
      !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
        _.isFunction(bCtor) && bCtor instanceof bCtor)
    ) {
      return false;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size, result;
    // Recursively compare objects and arrays.
    if (className === '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size === b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      size = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      result = _.keys(b).length === size;
      if (result) {
        while (size--) {
          // Deep compare each member
          key = keys[size];
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj) || _.isArguments(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return _.has(obj, 'callee');
    };
  }

  // Optimize `isFunction` if appropriate. Work around an IE 11 bug.
  if (typeof /./ !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj !== +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };

  // Predicate-generating functions. Often useful outside of Underscore.
  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  _.property = function(key) {
    return function(obj) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of `key:value` pairs.
  _.matches = function(attrs) {
    var pairs = _.pairs(attrs), length = pairs.length;
    return function(obj) {
      if (obj == null) return !length;
      obj = new Object(obj);
      for (var i = 0; i < length; i++) {
        var pair = pairs[i], key = pair[0];
        if (pair[1] !== obj[key] || !(key in obj)) return false;
      }
      return true;
    };
  };

  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = createCallback(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {
    return new Date().getTime();
  };

   // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return void 0;
    var value = object[property];
    return _.isFunction(value) ? object[property]() : value;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offest.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    try {
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}.call(this));
//     Backbone.js 1.1.2

//     (c) 2010-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://backbonejs.org

(function(root, factory) {

  // Set up Backbone appropriately for the environment. Start with AMD.
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'jquery', 'exports'], function(_, $, exports) {
      // Export global even in AMD case in case this script is loaded with
      // others that may still expect a global Backbone.
      root.Backbone = factory(root, exports, _, $);
    });

  // Next for Node.js or CommonJS. jQuery may not be needed as a module.
  } else if (typeof exports !== 'undefined') {
    var _ = require('underscore');
    factory(root, exports, _);

  // Finally, as a browser global.
  } else {
    root.Backbone = factory(root, {}, root._, (root.jQuery || root.Zepto || root.ender || root.$));
  }

}(this, function(root, Backbone, _, $) {

  // Initial Setup
  // -------------

  // Save the previous value of the `Backbone` variable, so that it can be
  // restored later on, if `noConflict` is used.
  var previousBackbone = root.Backbone;

  // Create local references to array methods we'll want to use later.
  var array = [];
  var push = array.push;
  var slice = array.slice;
  var splice = array.splice;

  // Current version of the library. Keep in sync with `package.json`.
  Backbone.VERSION = '1.1.2';

  // For Backbone's purposes, jQuery, Zepto, Ender, or My Library (kidding) owns
  // the `$` variable.
  Backbone.$ = $;

  // Runs Backbone.js in *noConflict* mode, returning the `Backbone` variable
  // to its previous owner. Returns a reference to this Backbone object.
  Backbone.noConflict = function() {
    root.Backbone = previousBackbone;
    return this;
  };

  // Turn on `emulateHTTP` to support legacy HTTP servers. Setting this option
  // will fake `"PATCH"`, `"PUT"` and `"DELETE"` requests via the `_method` parameter and
  // set a `X-Http-Method-Override` header.
  Backbone.emulateHTTP = false;

  // Turn on `emulateJSON` to support legacy servers that can't deal with direct
  // `application/json` requests ... will encode the body as
  // `application/x-www-form-urlencoded` instead and will send the model in a
  // form param named `model`.
  Backbone.emulateJSON = false;

  // Backbone.Events
  // ---------------

  // A module that can be mixed in to *any object* in order to provide it with
  // custom events. You may bind with `on` or remove with `off` callback
  // functions to an event; `trigger`-ing an event fires all callbacks in
  // succession.
  //
  //     var object = {};
  //     _.extend(object, Backbone.Events);
  //     object.on('expand', function(){ alert('expanded'); });
  //     object.trigger('expand');
  //
  var Events = Backbone.Events = {

    // Bind an event to a `callback` function. Passing `"all"` will bind
    // the callback to all events fired.
    on: function(name, callback, context) {
      if (!eventsApi(this, 'on', name, [callback, context]) || !callback) return this;
      this._events || (this._events = {});
      var events = this._events[name] || (this._events[name] = []);
      events.push({callback: callback, context: context, ctx: context || this});
      return this;
    },

    // Bind an event to only be triggered a single time. After the first time
    // the callback is invoked, it will be removed.
    once: function(name, callback, context) {
      if (!eventsApi(this, 'once', name, [callback, context]) || !callback) return this;
      var self = this;
      var once = _.once(function() {
        self.off(name, once);
        callback.apply(this, arguments);
      });
      once._callback = callback;
      return this.on(name, once, context);
    },

    // Remove one or many callbacks. If `context` is null, removes all
    // callbacks with that function. If `callback` is null, removes all
    // callbacks for the event. If `name` is null, removes all bound
    // callbacks for all events.
    off: function(name, callback, context) {
      var retain, ev, events, names, i, l, j, k;
      if (!this._events || !eventsApi(this, 'off', name, [callback, context])) return this;
      if (!name && !callback && !context) {
        this._events = void 0;
        return this;
      }
      names = name ? [name] : _.keys(this._events);
      for (i = 0, l = names.length; i < l; i++) {
        name = names[i];
        if (events = this._events[name]) {
          this._events[name] = retain = [];
          if (callback || context) {
            for (j = 0, k = events.length; j < k; j++) {
              ev = events[j];
              if ((callback && callback !== ev.callback && callback !== ev.callback._callback) ||
                  (context && context !== ev.context)) {
                retain.push(ev);
              }
            }
          }
          if (!retain.length) delete this._events[name];
        }
      }

      return this;
    },

    // Trigger one or many events, firing all bound callbacks. Callbacks are
    // passed the same arguments as `trigger` is, apart from the event name
    // (unless you're listening on `"all"`, which will cause your callback to
    // receive the true name of the event as the first argument).
    trigger: function(name) {
      if (!this._events) return this;
      var args = slice.call(arguments, 1);
      if (!eventsApi(this, 'trigger', name, args)) return this;
      var events = this._events[name];
      var allEvents = this._events.all;
      if (events) triggerEvents(events, args);
      if (allEvents) triggerEvents(allEvents, arguments);
      return this;
    },

    // Tell this object to stop listening to either specific events ... or
    // to every object it's currently listening to.
    stopListening: function(obj, name, callback) {
      var listeningTo = this._listeningTo;
      if (!listeningTo) return this;
      var remove = !name && !callback;
      if (!callback && typeof name === 'object') callback = this;
      if (obj) (listeningTo = {})[obj._listenId] = obj;
      for (var id in listeningTo) {
        obj = listeningTo[id];
        obj.off(name, callback, this);
        if (remove || _.isEmpty(obj._events)) delete this._listeningTo[id];
      }
      return this;
    }

  };

  // Regular expression used to split event strings.
  var eventSplitter = /\s+/;

  // Implement fancy features of the Events API such as multiple event
  // names `"change blur"` and jQuery-style event maps `{change: action}`
  // in terms of the existing API.
  var eventsApi = function(obj, action, name, rest) {
    if (!name) return true;

    // Handle event maps.
    if (typeof name === 'object') {
      for (var key in name) {
        obj[action].apply(obj, [key, name[key]].concat(rest));
      }
      return false;
    }

    // Handle space separated event names.
    if (eventSplitter.test(name)) {
      var names = name.split(eventSplitter);
      for (var i = 0, l = names.length; i < l; i++) {
        obj[action].apply(obj, [names[i]].concat(rest));
      }
      return false;
    }

    return true;
  };

  // A difficult-to-believe, but optimized internal dispatch function for
  // triggering events. Tries to keep the usual cases speedy (most internal
  // Backbone events have 3 arguments).
  var triggerEvents = function(events, args) {
    var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
    switch (args.length) {
      case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx); return;
      case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1); return;
      case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2); return;
      case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3); return;
      default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args); return;
    }
  };

  var listenMethods = {listenTo: 'on', listenToOnce: 'once'};

  // Inversion-of-control versions of `on` and `once`. Tell *this* object to
  // listen to an event in another object ... keeping track of what it's
  // listening to.
  _.each(listenMethods, function(implementation, method) {
    Events[method] = function(obj, name, callback) {
      var listeningTo = this._listeningTo || (this._listeningTo = {});
      var id = obj._listenId || (obj._listenId = _.uniqueId('l'));
      listeningTo[id] = obj;
      if (!callback && typeof name === 'object') callback = this;
      obj[implementation](name, callback, this);
      return this;
    };
  });

  // Aliases for backwards compatibility.
  Events.bind   = Events.on;
  Events.unbind = Events.off;

  // Allow the `Backbone` object to serve as a global event bus, for folks who
  // want global "pubsub" in a convenient place.
  _.extend(Backbone, Events);

  // Backbone.Model
  // --------------

  // Backbone **Models** are the basic data object in the framework --
  // frequently representing a row in a table in a database on your server.
  // A discrete chunk of data and a bunch of useful, related methods for
  // performing computations and transformations on that data.

  // Create a new model with the specified attributes. A client id (`cid`)
  // is automatically generated and assigned for you.
  var Model = Backbone.Model = function(attributes, options) {
    var attrs = attributes || {};
    options || (options = {});
    this.cid = _.uniqueId('c');
    this.attributes = {};
    if (options.collection) this.collection = options.collection;
    if (options.parse) attrs = this.parse(attrs, options) || {};
    attrs = _.defaults({}, attrs, _.result(this, 'defaults'));
    this.set(attrs, options);
    this.changed = {};
    this.initialize.apply(this, arguments);
  };

  // Attach all inheritable methods to the Model prototype.
  _.extend(Model.prototype, Events, {

    // A hash of attributes whose current and previous value differ.
    changed: null,

    // The value returned during the last failed validation.
    validationError: null,

    // The default name for the JSON `id` attribute is `"id"`. MongoDB and
    // CouchDB users may want to set this to `"_id"`.
    idAttribute: 'id',

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Return a copy of the model's `attributes` object.
    toJSON: function(options) {
      return _.clone(this.attributes);
    },

    // Proxy `Backbone.sync` by default -- but override this if you need
    // custom syncing semantics for *this* particular model.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Get the value of an attribute.
    get: function(attr) {
      return this.attributes[attr];
    },

    // Get the HTML-escaped value of an attribute.
    escape: function(attr) {
      return _.escape(this.get(attr));
    },

    // Returns `true` if the attribute contains a value that is not null
    // or undefined.
    has: function(attr) {
      return this.get(attr) != null;
    },

    // Set a hash of model attributes on the object, firing `"change"`. This is
    // the core primitive operation of a model, updating the data and notifying
    // anyone who needs to know about the change in state. The heart of the beast.
    set: function(key, val, options) {
      var attr, attrs, unset, changes, silent, changing, prev, current;
      if (key == null) return this;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      options || (options = {});

      // Run validation.
      if (!this._validate(attrs, options)) return false;

      // Extract attributes and options.
      unset           = options.unset;
      silent          = options.silent;
      changes         = [];
      changing        = this._changing;
      this._changing  = true;

      if (!changing) {
        this._previousAttributes = _.clone(this.attributes);
        this.changed = {};
      }
      current = this.attributes, prev = this._previousAttributes;

      // Check for changes of `id`.
      if (this.idAttribute in attrs) this.id = attrs[this.idAttribute];

      // For each `set` attribute, update or delete the current value.
      for (attr in attrs) {
        val = attrs[attr];
        if (!_.isEqual(current[attr], val)) changes.push(attr);
        if (!_.isEqual(prev[attr], val)) {
          this.changed[attr] = val;
        } else {
          delete this.changed[attr];
        }
        unset ? delete current[attr] : current[attr] = val;
      }

      // Trigger all relevant attribute changes.
      if (!silent) {
        if (changes.length) this._pending = options;
        for (var i = 0, l = changes.length; i < l; i++) {
          this.trigger('change:' + changes[i], this, current[changes[i]], options);
        }
      }

      // You might be wondering why there's a `while` loop here. Changes can
      // be recursively nested within `"change"` events.
      if (changing) return this;
      if (!silent) {
        while (this._pending) {
          options = this._pending;
          this._pending = false;
          this.trigger('change', this, options);
        }
      }
      this._pending = false;
      this._changing = false;
      return this;
    },

    // Remove an attribute from the model, firing `"change"`. `unset` is a noop
    // if the attribute doesn't exist.
    unset: function(attr, options) {
      return this.set(attr, void 0, _.extend({}, options, {unset: true}));
    },

    // Clear all attributes on the model, firing `"change"`.
    clear: function(options) {
      var attrs = {};
      for (var key in this.attributes) attrs[key] = void 0;
      return this.set(attrs, _.extend({}, options, {unset: true}));
    },

    // Determine if the model has changed since the last `"change"` event.
    // If you specify an attribute name, determine if that attribute has changed.
    hasChanged: function(attr) {
      if (attr == null) return !_.isEmpty(this.changed);
      return _.has(this.changed, attr);
    },

    // Return an object containing all the attributes that have changed, or
    // false if there are no changed attributes. Useful for determining what
    // parts of a view need to be updated and/or what attributes need to be
    // persisted to the server. Unset attributes will be set to undefined.
    // You can also pass an attributes object to diff against the model,
    // determining if there *would be* a change.
    changedAttributes: function(diff) {
      if (!diff) return this.hasChanged() ? _.clone(this.changed) : false;
      var val, changed = false;
      var old = this._changing ? this._previousAttributes : this.attributes;
      for (var attr in diff) {
        if (_.isEqual(old[attr], (val = diff[attr]))) continue;
        (changed || (changed = {}))[attr] = val;
      }
      return changed;
    },

    // Get the previous value of an attribute, recorded at the time the last
    // `"change"` event was fired.
    previous: function(attr) {
      if (attr == null || !this._previousAttributes) return null;
      return this._previousAttributes[attr];
    },

    // Get all of the attributes of the model at the time of the previous
    // `"change"` event.
    previousAttributes: function() {
      return _.clone(this._previousAttributes);
    },

    // Fetch the model from the server. If the server's representation of the
    // model differs from its current attributes, they will be overridden,
    // triggering a `"change"` event.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var model = this;
      var success = options.success;
      options.success = function(resp) {
        if (!model.set(model.parse(resp, options), options)) return false;
        if (success) success(model, resp, options);
        model.trigger('sync', model, resp, options);
      };
      wrapError(this, options);
      return this.sync('read', this, options);
    },

    // Set a hash of model attributes, and sync the model to the server.
    // If the server returns an attributes hash that differs, the model's
    // state will be `set` again.
    save: function(key, val, options) {
      var attrs, method, xhr, attributes = this.attributes;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (key == null || typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      options = _.extend({validate: true}, options);

      // If we're not waiting and attributes exist, save acts as
      // `set(attr).save(null, opts)` with validation. Otherwise, check if
      // the model will be valid when the attributes, if any, are set.
      if (attrs && !options.wait) {
        if (!this.set(attrs, options)) return false;
      } else {
        if (!this._validate(attrs, options)) return false;
      }

      // Set temporary attributes if `{wait: true}`.
      if (attrs && options.wait) {
        this.attributes = _.extend({}, attributes, attrs);
      }

      // After a successful server-side save, the client is (optionally)
      // updated with the server-side state.
      if (options.parse === void 0) options.parse = true;
      var model = this;
      var success = options.success;
      options.success = function(resp) {
        // Ensure attributes are restored during synchronous saves.
        model.attributes = attributes;
        var serverAttrs = model.parse(resp, options);
        if (options.wait) serverAttrs = _.extend(attrs || {}, serverAttrs);
        if (_.isObject(serverAttrs) && !model.set(serverAttrs, options)) {
          return false;
        }
        if (success) success(model, resp, options);
        model.trigger('sync', model, resp, options);
      };
      wrapError(this, options);

      method = this.isNew() ? 'create' : (options.patch ? 'patch' : 'update');
      if (method === 'patch') options.attrs = attrs;
      xhr = this.sync(method, this, options);

      // Restore attributes.
      if (attrs && options.wait) this.attributes = attributes;

      return xhr;
    },

    // Destroy this model on the server if it was already persisted.
    // Optimistically removes the model from its collection, if it has one.
    // If `wait: true` is passed, waits for the server to respond before removal.
    destroy: function(options) {
      options = options ? _.clone(options) : {};
      var model = this;
      var success = options.success;

      var destroy = function() {
        model.trigger('destroy', model, model.collection, options);
      };

      options.success = function(resp) {
        if (options.wait || model.isNew()) destroy();
        if (success) success(model, resp, options);
        if (!model.isNew()) model.trigger('sync', model, resp, options);
      };

      if (this.isNew()) {
        options.success();
        return false;
      }
      wrapError(this, options);

      var xhr = this.sync('delete', this, options);
      if (!options.wait) destroy();
      return xhr;
    },

    // Default URL for the model's representation on the server -- if you're
    // using Backbone's restful methods, override this to change the endpoint
    // that will be called.
    url: function() {
      var base =
        _.result(this, 'urlRoot') ||
        _.result(this.collection, 'url') ||
        urlError();
      if (this.isNew()) return base;
      return base.replace(/([^\/])$/, '$1/') + encodeURIComponent(this.id);
    },

    // **parse** converts a response into the hash of attributes to be `set` on
    // the model. The default implementation is just to pass the response along.
    parse: function(resp, options) {
      return resp;
    },

    // Create a new model with identical attributes to this one.
    clone: function() {
      return new this.constructor(this.attributes);
    },

    // A model is new if it has never been saved to the server, and lacks an id.
    isNew: function() {
      return !this.has(this.idAttribute);
    },

    // Check if the model is currently in a valid state.
    isValid: function(options) {
      return this._validate({}, _.extend(options || {}, { validate: true }));
    },

    // Run validation against the next complete set of model attributes,
    // returning `true` if all is well. Otherwise, fire an `"invalid"` event.
    _validate: function(attrs, options) {
      if (!options.validate || !this.validate) return true;
      attrs = _.extend({}, this.attributes, attrs);
      var error = this.validationError = this.validate(attrs, options) || null;
      if (!error) return true;
      this.trigger('invalid', this, error, _.extend(options, {validationError: error}));
      return false;
    }

  });

  // Underscore methods that we want to implement on the Model.
  var modelMethods = ['keys', 'values', 'pairs', 'invert', 'pick', 'omit'];

  // Mix in each Underscore method as a proxy to `Model#attributes`.
  _.each(modelMethods, function(method) {
    Model.prototype[method] = function() {
      var args = slice.call(arguments);
      args.unshift(this.attributes);
      return _[method].apply(_, args);
    };
  });

  // Backbone.Collection
  // -------------------

  // If models tend to represent a single row of data, a Backbone Collection is
  // more analagous to a table full of data ... or a small slice or page of that
  // table, or a collection of rows that belong together for a particular reason
  // -- all of the messages in this particular folder, all of the documents
  // belonging to this particular author, and so on. Collections maintain
  // indexes of their models, both in order, and for lookup by `id`.

  // Create a new **Collection**, perhaps to contain a specific type of `model`.
  // If a `comparator` is specified, the Collection will maintain
  // its models in sort order, as they're added and removed.
  var Collection = Backbone.Collection = function(models, options) {
    options || (options = {});
    if (options.model) this.model = options.model;
    if (options.comparator !== void 0) this.comparator = options.comparator;
    this._reset();
    this.initialize.apply(this, arguments);
    if (models) this.reset(models, _.extend({silent: true}, options));
  };

  // Default options for `Collection#set`.
  var setOptions = {add: true, remove: true, merge: true};
  var addOptions = {add: true, remove: false};

  // Define the Collection's inheritable methods.
  _.extend(Collection.prototype, Events, {

    // The default model for a collection is just a **Backbone.Model**.
    // This should be overridden in most cases.
    model: Model,

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // The JSON representation of a Collection is an array of the
    // models' attributes.
    toJSON: function(options) {
      return this.map(function(model){ return model.toJSON(options); });
    },

    // Proxy `Backbone.sync` by default.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Add a model, or list of models to the set.
    add: function(models, options) {
      return this.set(models, _.extend({merge: false}, options, addOptions));
    },

    // Remove a model, or a list of models from the set.
    remove: function(models, options) {
      var singular = !_.isArray(models);
      models = singular ? [models] : _.clone(models);
      options || (options = {});
      var i, l, index, model;
      for (i = 0, l = models.length; i < l; i++) {
        model = models[i] = this.get(models[i]);
        if (!model) continue;
        delete this._byId[model.id];
        delete this._byId[model.cid];
        index = this.indexOf(model);
        this.models.splice(index, 1);
        this.length--;
        if (!options.silent) {
          options.index = index;
          model.trigger('remove', model, this, options);
        }
        this._removeReference(model, options);
      }
      return singular ? models[0] : models;
    },

    // Update a collection by `set`-ing a new list of models, adding new ones,
    // removing models that are no longer present, and merging models that
    // already exist in the collection, as necessary. Similar to **Model#set**,
    // the core operation for updating the data contained by the collection.
    set: function(models, options) {
      options = _.defaults({}, options, setOptions);
      if (options.parse) models = this.parse(models, options);
      var singular = !_.isArray(models);
      models = singular ? (models ? [models] : []) : _.clone(models);
      var i, l, id, model, attrs, existing, sort;
      var at = options.at;
      var targetModel = this.model;
      var sortable = this.comparator && (at == null) && options.sort !== false;
      var sortAttr = _.isString(this.comparator) ? this.comparator : null;
      var toAdd = [], toRemove = [], modelMap = {};
      var add = options.add, merge = options.merge, remove = options.remove;
      var order = !sortable && add && remove ? [] : false;

      // Turn bare objects into model references, and prevent invalid models
      // from being added.
      for (i = 0, l = models.length; i < l; i++) {
        attrs = models[i] || {};
        if (attrs instanceof Model) {
          id = model = attrs;
        } else {
          id = attrs[targetModel.prototype.idAttribute || 'id'];
        }

        // If a duplicate is found, prevent it from being added and
        // optionally merge it into the existing model.
        if (existing = this.get(id)) {
          if (remove) modelMap[existing.cid] = true;
          if (merge) {
            attrs = attrs === model ? model.attributes : attrs;
            if (options.parse) attrs = existing.parse(attrs, options);
            existing.set(attrs, options);
            if (sortable && !sort && existing.hasChanged(sortAttr)) sort = true;
          }
          models[i] = existing;

        // If this is a new, valid model, push it to the `toAdd` list.
        } else if (add) {
          model = models[i] = this._prepareModel(attrs, options);
          if (!model) continue;
          toAdd.push(model);
          this._addReference(model, options);
        }

        // Do not add multiple models with the same `id`.
        model = existing || model;
        if (order && (model.isNew() || !modelMap[model.id])) order.push(model);
        modelMap[model.id] = true;
      }

      // Remove nonexistent models if appropriate.
      if (remove) {
        for (i = 0, l = this.length; i < l; ++i) {
          if (!modelMap[(model = this.models[i]).cid]) toRemove.push(model);
        }
        if (toRemove.length) this.remove(toRemove, options);
      }

      // See if sorting is needed, update `length` and splice in new models.
      if (toAdd.length || (order && order.length)) {
        if (sortable) sort = true;
        this.length += toAdd.length;
        if (at != null) {
          for (i = 0, l = toAdd.length; i < l; i++) {
            this.models.splice(at + i, 0, toAdd[i]);
          }
        } else {
          if (order) this.models.length = 0;
          var orderedModels = order || toAdd;
          for (i = 0, l = orderedModels.length; i < l; i++) {
            this.models.push(orderedModels[i]);
          }
        }
      }

      // Silently sort the collection if appropriate.
      if (sort) this.sort({silent: true});

      // Unless silenced, it's time to fire all appropriate add/sort events.
      if (!options.silent) {
        for (i = 0, l = toAdd.length; i < l; i++) {
          (model = toAdd[i]).trigger('add', model, this, options);
        }
        if (sort || (order && order.length)) this.trigger('sort', this, options);
      }

      // Return the added (or merged) model (or models).
      return singular ? models[0] : models;
    },

    // When you have more items than you want to add or remove individually,
    // you can reset the entire set with a new list of models, without firing
    // any granular `add` or `remove` events. Fires `reset` when finished.
    // Useful for bulk operations and optimizations.
    reset: function(models, options) {
      options || (options = {});
      for (var i = 0, l = this.models.length; i < l; i++) {
        this._removeReference(this.models[i], options);
      }
      options.previousModels = this.models;
      this._reset();
      models = this.add(models, _.extend({silent: true}, options));
      if (!options.silent) this.trigger('reset', this, options);
      return models;
    },

    // Add a model to the end of the collection.
    push: function(model, options) {
      return this.add(model, _.extend({at: this.length}, options));
    },

    // Remove a model from the end of the collection.
    pop: function(options) {
      var model = this.at(this.length - 1);
      this.remove(model, options);
      return model;
    },

    // Add a model to the beginning of the collection.
    unshift: function(model, options) {
      return this.add(model, _.extend({at: 0}, options));
    },

    // Remove a model from the beginning of the collection.
    shift: function(options) {
      var model = this.at(0);
      this.remove(model, options);
      return model;
    },

    // Slice out a sub-array of models from the collection.
    slice: function() {
      return slice.apply(this.models, arguments);
    },

    // Get a model from the set by id.
    get: function(obj) {
      if (obj == null) return void 0;
      return this._byId[obj] || this._byId[obj.id] || this._byId[obj.cid];
    },

    // Get the model at the given index.
    at: function(index) {
      return this.models[index];
    },

    // Return models with matching attributes. Useful for simple cases of
    // `filter`.
    where: function(attrs, first) {
      if (_.isEmpty(attrs)) return first ? void 0 : [];
      return this[first ? 'find' : 'filter'](function(model) {
        for (var key in attrs) {
          if (attrs[key] !== model.get(key)) return false;
        }
        return true;
      });
    },

    // Return the first model with matching attributes. Useful for simple cases
    // of `find`.
    findWhere: function(attrs) {
      return this.where(attrs, true);
    },

    // Force the collection to re-sort itself. You don't need to call this under
    // normal circumstances, as the set will maintain sort order as each item
    // is added.
    sort: function(options) {
      if (!this.comparator) throw new Error('Cannot sort a set without a comparator');
      options || (options = {});

      // Run sort based on type of `comparator`.
      if (_.isString(this.comparator) || this.comparator.length === 1) {
        this.models = this.sortBy(this.comparator, this);
      } else {
        this.models.sort(_.bind(this.comparator, this));
      }

      if (!options.silent) this.trigger('sort', this, options);
      return this;
    },

    // Pluck an attribute from each model in the collection.
    pluck: function(attr) {
      return _.invoke(this.models, 'get', attr);
    },

    // Fetch the default set of models for this collection, resetting the
    // collection when they arrive. If `reset: true` is passed, the response
    // data will be passed through the `reset` method instead of `set`.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var success = options.success;
      var collection = this;
      options.success = function(resp) {
        var method = options.reset ? 'reset' : 'set';
        collection[method](resp, options);
        if (success) success(collection, resp, options);
        collection.trigger('sync', collection, resp, options);
      };
      wrapError(this, options);
      return this.sync('read', this, options);
    },

    // Create a new instance of a model in this collection. Add the model to the
    // collection immediately, unless `wait: true` is passed, in which case we
    // wait for the server to agree.
    create: function(model, options) {
      options = options ? _.clone(options) : {};
      if (!(model = this._prepareModel(model, options))) return false;
      if (!options.wait) this.add(model, options);
      var collection = this;
      var success = options.success;
      options.success = function(model, resp) {
        if (options.wait) collection.add(model, options);
        if (success) success(model, resp, options);
      };
      model.save(null, options);
      return model;
    },

    // **parse** converts a response into a list of models to be added to the
    // collection. The default implementation is just to pass it through.
    parse: function(resp, options) {
      return resp;
    },

    // Create a new collection with an identical list of models as this one.
    clone: function() {
      return new this.constructor(this.models);
    },

    // Private method to reset all internal state. Called when the collection
    // is first initialized or reset.
    _reset: function() {
      this.length = 0;
      this.models = [];
      this._byId  = {};
    },

    // Prepare a hash of attributes (or other model) to be added to this
    // collection.
    _prepareModel: function(attrs, options) {
      if (attrs instanceof Model) return attrs;
      options = options ? _.clone(options) : {};
      options.collection = this;
      var model = new this.model(attrs, options);
      if (!model.validationError) return model;
      this.trigger('invalid', this, model.validationError, options);
      return false;
    },

    // Internal method to create a model's ties to a collection.
    _addReference: function(model, options) {
      this._byId[model.cid] = model;
      if (model.id != null) this._byId[model.id] = model;
      if (!model.collection) model.collection = this;
      model.on('all', this._onModelEvent, this);
    },

    // Internal method to sever a model's ties to a collection.
    _removeReference: function(model, options) {
      if (this === model.collection) delete model.collection;
      model.off('all', this._onModelEvent, this);
    },

    // Internal method called every time a model in the set fires an event.
    // Sets need to update their indexes when models change ids. All other
    // events simply proxy through. "add" and "remove" events that originate
    // in other collections are ignored.
    _onModelEvent: function(event, model, collection, options) {
      if ((event === 'add' || event === 'remove') && collection !== this) return;
      if (event === 'destroy') this.remove(model, options);
      if (model && event === 'change:' + model.idAttribute) {
        delete this._byId[model.previous(model.idAttribute)];
        if (model.id != null) this._byId[model.id] = model;
      }
      this.trigger.apply(this, arguments);
    }

  });

  // Underscore methods that we want to implement on the Collection.
  // 90% of the core usefulness of Backbone Collections is actually implemented
  // right here:
  var methods = ['forEach', 'each', 'map', 'collect', 'reduce', 'foldl',
    'inject', 'reduceRight', 'foldr', 'find', 'detect', 'filter', 'select',
    'reject', 'every', 'all', 'some', 'any', 'include', 'contains', 'invoke',
    'max', 'min', 'toArray', 'size', 'first', 'head', 'take', 'initial', 'rest',
    'tail', 'drop', 'last', 'without', 'difference', 'indexOf', 'shuffle',
    'lastIndexOf', 'isEmpty', 'chain', 'sample'];

  // Mix in each Underscore method as a proxy to `Collection#models`.
  _.each(methods, function(method) {
    Collection.prototype[method] = function() {
      var args = slice.call(arguments);
      args.unshift(this.models);
      return _[method].apply(_, args);
    };
  });

  // Underscore methods that take a property name as an argument.
  var attributeMethods = ['groupBy', 'countBy', 'sortBy', 'indexBy'];

  // Use attributes instead of properties.
  _.each(attributeMethods, function(method) {
    Collection.prototype[method] = function(value, context) {
      var iterator = _.isFunction(value) ? value : function(model) {
        return model.get(value);
      };
      return _[method](this.models, iterator, context);
    };
  });

  // Backbone.View
  // -------------

  // Backbone Views are almost more convention than they are actual code. A View
  // is simply a JavaScript object that represents a logical chunk of UI in the
  // DOM. This might be a single item, an entire list, a sidebar or panel, or
  // even the surrounding frame which wraps your whole app. Defining a chunk of
  // UI as a **View** allows you to define your DOM events declaratively, without
  // having to worry about render order ... and makes it easy for the view to
  // react to specific changes in the state of your models.

  // Creating a Backbone.View creates its initial element outside of the DOM,
  // if an existing element is not provided...
  var View = Backbone.View = function(options) {
    this.cid = _.uniqueId('view');
    options || (options = {});
    _.extend(this, _.pick(options, viewOptions));
    this._ensureElement();
    this.initialize.apply(this, arguments);
    this.delegateEvents();
  };

  // Cached regex to split keys for `delegate`.
  var delegateEventSplitter = /^(\S+)\s*(.*)$/;

  // List of view options to be merged as properties.
  var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events'];

  // Set up all inheritable **Backbone.View** properties and methods.
  _.extend(View.prototype, Events, {

    // The default `tagName` of a View's element is `"div"`.
    tagName: 'div',

    // jQuery delegate for element lookup, scoped to DOM elements within the
    // current view. This should be preferred to global lookups where possible.
    $: function(selector) {
      return this.$el.find(selector);
    },

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // **render** is the core function that your view should override, in order
    // to populate its element (`this.el`), with the appropriate HTML. The
    // convention is for **render** to always return `this`.
    render: function() {
      return this;
    },

    // Remove this view by taking the element out of the DOM, and removing any
    // applicable Backbone.Events listeners.
    remove: function() {
      this.$el.remove();
      this.stopListening();
      return this;
    },

    // Change the view's element (`this.el` property), including event
    // re-delegation.
    setElement: function(element, delegate) {
      if (this.$el) this.undelegateEvents();
      this.$el = element instanceof Backbone.$ ? element : Backbone.$(element);
      this.el = this.$el[0];
      if (delegate !== false) this.delegateEvents();
      return this;
    },

    // Set callbacks, where `this.events` is a hash of
    //
    // *{"event selector": "callback"}*
    //
    //     {
    //       'mousedown .title':  'edit',
    //       'click .button':     'save',
    //       'click .open':       function(e) { ... }
    //     }
    //
    // pairs. Callbacks will be bound to the view, with `this` set properly.
    // Uses event delegation for efficiency.
    // Omitting the selector binds the event to `this.el`.
    // This only works for delegate-able events: not `focus`, `blur`, and
    // not `change`, `submit`, and `reset` in Internet Explorer.
    delegateEvents: function(events) {
      if (!(events || (events = _.result(this, 'events')))) return this;
      this.undelegateEvents();
      for (var key in events) {
        var method = events[key];
        if (!_.isFunction(method)) method = this[events[key]];
        if (!method) continue;

        var match = key.match(delegateEventSplitter);
        var eventName = match[1], selector = match[2];
        method = _.bind(method, this);
        eventName += '.delegateEvents' + this.cid;
        if (selector === '') {
          this.$el.on(eventName, method);
        } else {
          this.$el.on(eventName, selector, method);
        }
      }
      return this;
    },

    // Clears all callbacks previously bound to the view with `delegateEvents`.
    // You usually don't need to use this, but may wish to if you have multiple
    // Backbone views attached to the same DOM element.
    undelegateEvents: function() {
      this.$el.off('.delegateEvents' + this.cid);
      return this;
    },

    // Ensure that the View has a DOM element to render into.
    // If `this.el` is a string, pass it through `$()`, take the first
    // matching element, and re-assign it to `el`. Otherwise, create
    // an element from the `id`, `className` and `tagName` properties.
    _ensureElement: function() {
      if (!this.el) {
        var attrs = _.extend({}, _.result(this, 'attributes'));
        if (this.id) attrs.id = _.result(this, 'id');
        if (this.className) attrs['class'] = _.result(this, 'className');
        var $el = Backbone.$('<' + _.result(this, 'tagName') + '>').attr(attrs);
        this.setElement($el, false);
      } else {
        this.setElement(_.result(this, 'el'), false);
      }
    }

  });

  // Backbone.sync
  // -------------

  // Override this function to change the manner in which Backbone persists
  // models to the server. You will be passed the type of request, and the
  // model in question. By default, makes a RESTful Ajax request
  // to the model's `url()`. Some possible customizations could be:
  //
  // * Use `setTimeout` to batch rapid-fire updates into a single request.
  // * Send up the models as XML instead of JSON.
  // * Persist models via WebSockets instead of Ajax.
  //
  // Turn on `Backbone.emulateHTTP` in order to send `PUT` and `DELETE` requests
  // as `POST`, with a `_method` parameter containing the true HTTP method,
  // as well as all requests with the body as `application/x-www-form-urlencoded`
  // instead of `application/json` with the model in a param named `model`.
  // Useful when interfacing with server-side languages like **PHP** that make
  // it difficult to read the body of `PUT` requests.
  Backbone.sync = function(method, model, options) {
    var type = methodMap[method];

    // Default options, unless specified.
    _.defaults(options || (options = {}), {
      emulateHTTP: Backbone.emulateHTTP,
      emulateJSON: Backbone.emulateJSON
    });

    // Default JSON-request options.
    var params = {type: type, dataType: 'json'};

    // Ensure that we have a URL.
    if (!options.url) {
      params.url = _.result(model, 'url') || urlError();
    }

    // Ensure that we have the appropriate request data.
    if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
      params.contentType = 'application/json';
      params.data = JSON.stringify(options.attrs || model.toJSON(options));
    }

    // For older servers, emulate JSON by encoding the request into an HTML-form.
    if (options.emulateJSON) {
      params.contentType = 'application/x-www-form-urlencoded';
      params.data = params.data ? {model: params.data} : {};
    }

    // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
    // And an `X-HTTP-Method-Override` header.
    if (options.emulateHTTP && (type === 'PUT' || type === 'DELETE' || type === 'PATCH')) {
      params.type = 'POST';
      if (options.emulateJSON) params.data._method = type;
      var beforeSend = options.beforeSend;
      options.beforeSend = function(xhr) {
        xhr.setRequestHeader('X-HTTP-Method-Override', type);
        if (beforeSend) return beforeSend.apply(this, arguments);
      };
    }

    // Don't process data on a non-GET request.
    if (params.type !== 'GET' && !options.emulateJSON) {
      params.processData = false;
    }

    // If we're sending a `PATCH` request, and we're in an old Internet Explorer
    // that still has ActiveX enabled by default, override jQuery to use that
    // for XHR instead. Remove this line when jQuery supports `PATCH` on IE8.
    if (params.type === 'PATCH' && noXhrPatch) {
      params.xhr = function() {
        return new ActiveXObject("Microsoft.XMLHTTP");
      };
    }

    // Make the request, allowing the user to override any Ajax options.
    var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
    model.trigger('request', model, xhr, options);
    return xhr;
  };

  var noXhrPatch =
    typeof window !== 'undefined' && !!window.ActiveXObject &&
      !(window.XMLHttpRequest && (new XMLHttpRequest).dispatchEvent);

  // Map from CRUD to HTTP for our default `Backbone.sync` implementation.
  var methodMap = {
    'create': 'POST',
    'update': 'PUT',
    'patch':  'PATCH',
    'delete': 'DELETE',
    'read':   'GET'
  };

  // Set the default implementation of `Backbone.ajax` to proxy through to `$`.
  // Override this if you'd like to use a different library.
  Backbone.ajax = function() {
    return Backbone.$.ajax.apply(Backbone.$, arguments);
  };

  // Backbone.Router
  // ---------------

  // Routers map faux-URLs to actions, and fire events when routes are
  // matched. Creating a new one sets its `routes` hash, if not set statically.
  var Router = Backbone.Router = function(options) {
    options || (options = {});
    if (options.routes) this.routes = options.routes;
    this._bindRoutes();
    this.initialize.apply(this, arguments);
  };

  // Cached regular expressions for matching named param parts and splatted
  // parts of route strings.
  var optionalParam = /\((.*?)\)/g;
  var namedParam    = /(\(\?)?:\w+/g;
  var splatParam    = /\*\w+/g;
  var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;

  // Set up all inheritable **Backbone.Router** properties and methods.
  _.extend(Router.prototype, Events, {

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Manually bind a single named route to a callback. For example:
    //
    //     this.route('search/:query/p:num', 'search', function(query, num) {
    //       ...
    //     });
    //
    route: function(route, name, callback) {
      if (!_.isRegExp(route)) route = this._routeToRegExp(route);
      if (_.isFunction(name)) {
        callback = name;
        name = '';
      }
      if (!callback) callback = this[name];
      var router = this;
      Backbone.history.route(route, function(fragment) {
        var args = router._extractParameters(route, fragment);
        router.execute(callback, args);
        router.trigger.apply(router, ['route:' + name].concat(args));
        router.trigger('route', name, args);
        Backbone.history.trigger('route', router, name, args);
      });
      return this;
    },

    // Execute a route handler with the provided parameters.  This is an
    // excellent place to do pre-route setup or post-route cleanup.
    execute: function(callback, args) {
      if (callback) callback.apply(this, args);
    },

    // Simple proxy to `Backbone.history` to save a fragment into the history.
    navigate: function(fragment, options) {
      Backbone.history.navigate(fragment, options);
      return this;
    },

    // Bind all defined routes to `Backbone.history`. We have to reverse the
    // order of the routes here to support behavior where the most general
    // routes can be defined at the bottom of the route map.
    _bindRoutes: function() {
      if (!this.routes) return;
      this.routes = _.result(this, 'routes');
      var route, routes = _.keys(this.routes);
      while ((route = routes.pop()) != null) {
        this.route(route, this.routes[route]);
      }
    },

    // Convert a route string into a regular expression, suitable for matching
    // against the current location hash.
    _routeToRegExp: function(route) {
      route = route.replace(escapeRegExp, '\\$&')
                   .replace(optionalParam, '(?:$1)?')
                   .replace(namedParam, function(match, optional) {
                     return optional ? match : '([^/?]+)';
                   })
                   .replace(splatParam, '([^?]*?)');
      return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
    },

    // Given a route, and a URL fragment that it matches, return the array of
    // extracted decoded parameters. Empty or unmatched parameters will be
    // treated as `null` to normalize cross-browser behavior.
    _extractParameters: function(route, fragment) {
      var params = route.exec(fragment).slice(1);
      return _.map(params, function(param, i) {
        // Don't decode the search params.
        if (i === params.length - 1) return param || null;
        return param ? decodeURIComponent(param) : null;
      });
    }

  });

  // Backbone.History
  // ----------------

  // Handles cross-browser history management, based on either
  // [pushState](http://diveintohtml5.info/history.html) and real URLs, or
  // [onhashchange](https://developer.mozilla.org/en-US/docs/DOM/window.onhashchange)
  // and URL fragments. If the browser supports neither (old IE, natch),
  // falls back to polling.
  var History = Backbone.History = function() {
    this.handlers = [];
    _.bindAll(this, 'checkUrl');

    // Ensure that `History` can be used outside of the browser.
    if (typeof window !== 'undefined') {
      this.location = window.location;
      this.history = window.history;
    }
  };

  // Cached regex for stripping a leading hash/slash and trailing space.
  var routeStripper = /^[#\/]|\s+$/g;

  // Cached regex for stripping leading and trailing slashes.
  var rootStripper = /^\/+|\/+$/g;

  // Cached regex for detecting MSIE.
  var isExplorer = /msie [\w.]+/;

  // Cached regex for removing a trailing slash.
  var trailingSlash = /\/$/;

  // Cached regex for stripping urls of hash.
  var pathStripper = /#.*$/;

  // Has the history handling already been started?
  History.started = false;

  // Set up all inheritable **Backbone.History** properties and methods.
  _.extend(History.prototype, Events, {

    // The default interval to poll for hash changes, if necessary, is
    // twenty times a second.
    interval: 50,

    // Are we at the app root?
    atRoot: function() {
      return this.location.pathname.replace(/[^\/]$/, '$&/') === this.root;
    },

    // Gets the true hash value. Cannot use location.hash directly due to bug
    // in Firefox where location.hash will always be decoded.
    getHash: function(window) {
      var match = (window || this).location.href.match(/#(.*)$/);
      return match ? match[1] : '';
    },

    // Get the cross-browser normalized URL fragment, either from the URL,
    // the hash, or the override.
    getFragment: function(fragment, forcePushState) {
      if (fragment == null) {
        if (this._hasPushState || !this._wantsHashChange || forcePushState) {
          fragment = decodeURI(this.location.pathname + this.location.search);
          var root = this.root.replace(trailingSlash, '');
          if (!fragment.indexOf(root)) fragment = fragment.slice(root.length);
        } else {
          fragment = this.getHash();
        }
      }
      return fragment.replace(routeStripper, '');
    },

    // Start the hash change handling, returning `true` if the current URL matches
    // an existing route, and `false` otherwise.
    start: function(options) {
      if (History.started) throw new Error("Backbone.history has already been started");
      History.started = true;

      // Figure out the initial configuration. Do we need an iframe?
      // Is pushState desired ... is it available?
      this.options          = _.extend({root: '/'}, this.options, options);
      this.root             = this.options.root;
      this._wantsHashChange = this.options.hashChange !== false;
      this._wantsPushState  = !!this.options.pushState;
      this._hasPushState    = !!(this.options.pushState && this.history && this.history.pushState);
      var fragment          = this.getFragment();
      var docMode           = document.documentMode;
      var oldIE             = (isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || docMode <= 7));

      // Normalize root to always include a leading and trailing slash.
      this.root = ('/' + this.root + '/').replace(rootStripper, '/');

      if (oldIE && this._wantsHashChange) {
        var frame = Backbone.$('<iframe src="javascript:0" tabindex="-1">');
        this.iframe = frame.hide().appendTo('body')[0].contentWindow;
        this.navigate(fragment);
      }

      // Depending on whether we're using pushState or hashes, and whether
      // 'onhashchange' is supported, determine how we check the URL state.
      if (this._hasPushState) {
        Backbone.$(window).on('popstate', this.checkUrl);
      } else if (this._wantsHashChange && ('onhashchange' in window) && !oldIE) {
        Backbone.$(window).on('hashchange', this.checkUrl);
      } else if (this._wantsHashChange) {
        this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
      }

      // Determine if we need to change the base url, for a pushState link
      // opened by a non-pushState browser.
      this.fragment = fragment;
      var loc = this.location;

      // Transition from hashChange to pushState or vice versa if both are
      // requested.
      if (this._wantsHashChange && this._wantsPushState) {

        // If we've started off with a route from a `pushState`-enabled
        // browser, but we're currently in a browser that doesn't support it...
        if (!this._hasPushState && !this.atRoot()) {
          this.fragment = this.getFragment(null, true);
          this.location.replace(this.root + '#' + this.fragment);
          // Return immediately as browser will do redirect to new url
          return true;

        // Or if we've started out with a hash-based route, but we're currently
        // in a browser where it could be `pushState`-based instead...
        } else if (this._hasPushState && this.atRoot() && loc.hash) {
          this.fragment = this.getHash().replace(routeStripper, '');
          this.history.replaceState({}, document.title, this.root + this.fragment);
        }

      }

      if (!this.options.silent) return this.loadUrl();
    },

    // Disable Backbone.history, perhaps temporarily. Not useful in a real app,
    // but possibly useful for unit testing Routers.
    stop: function() {
      Backbone.$(window).off('popstate', this.checkUrl).off('hashchange', this.checkUrl);
      if (this._checkUrlInterval) clearInterval(this._checkUrlInterval);
      History.started = false;
    },

    // Add a route to be tested when the fragment changes. Routes added later
    // may override previous routes.
    route: function(route, callback) {
      this.handlers.unshift({route: route, callback: callback});
    },

    // Checks the current URL to see if it has changed, and if it has,
    // calls `loadUrl`, normalizing across the hidden iframe.
    checkUrl: function(e) {
      var current = this.getFragment();
      if (current === this.fragment && this.iframe) {
        current = this.getFragment(this.getHash(this.iframe));
      }
      if (current === this.fragment) return false;
      if (this.iframe) this.navigate(current);
      this.loadUrl();
    },

    // Attempt to load the current URL fragment. If a route succeeds with a
    // match, returns `true`. If no defined routes matches the fragment,
    // returns `false`.
    loadUrl: function(fragment) {
      fragment = this.fragment = this.getFragment(fragment);
      return _.any(this.handlers, function(handler) {
        if (handler.route.test(fragment)) {
          handler.callback(fragment);
          return true;
        }
      });
    },

    // Save a fragment into the hash history, or replace the URL state if the
    // 'replace' option is passed. You are responsible for properly URL-encoding
    // the fragment in advance.
    //
    // The options object can contain `trigger: true` if you wish to have the
    // route callback be fired (not usually desirable), or `replace: true`, if
    // you wish to modify the current URL without adding an entry to the history.
    navigate: function(fragment, options) {
      if (!History.started) return false;
      if (!options || options === true) options = {trigger: !!options};

      var url = this.root + (fragment = this.getFragment(fragment || ''));

      // Strip the hash for matching.
      fragment = fragment.replace(pathStripper, '');

      if (this.fragment === fragment) return;
      this.fragment = fragment;

      // Don't include a trailing slash on the root.
      if (fragment === '' && url !== '/') url = url.slice(0, -1);

      // If pushState is available, we use it to set the fragment as a real URL.
      if (this._hasPushState) {
        this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);

      // If hash changes haven't been explicitly disabled, update the hash
      // fragment to store history.
      } else if (this._wantsHashChange) {
        this._updateHash(this.location, fragment, options.replace);
        if (this.iframe && (fragment !== this.getFragment(this.getHash(this.iframe)))) {
          // Opening and closing the iframe tricks IE7 and earlier to push a
          // history entry on hash-tag change.  When replace is true, we don't
          // want this.
          if(!options.replace) this.iframe.document.open().close();
          this._updateHash(this.iframe.location, fragment, options.replace);
        }

      // If you've told us that you explicitly don't want fallback hashchange-
      // based history, then `navigate` becomes a page refresh.
      } else {
        return this.location.assign(url);
      }
      if (options.trigger) return this.loadUrl(fragment);
    },

    // Update the hash location, either replacing the current entry, or adding
    // a new one to the browser history.
    _updateHash: function(location, fragment, replace) {
      if (replace) {
        var href = location.href.replace(/(javascript:|#).*$/, '');
        location.replace(href + '#' + fragment);
      } else {
        // Some browsers require that `hash` contains a leading #.
        location.hash = '#' + fragment;
      }
    }

  });

  // Create the default Backbone.history.
  Backbone.history = new History;

  // Helpers
  // -------

  // Helper function to correctly set up the prototype chain, for subclasses.
  // Similar to `goog.inherits`, but uses a hash of prototype properties and
  // class properties to be extended.
  var extend = function(protoProps, staticProps) {
    var parent = this;
    var child;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.
    if (protoProps && _.has(protoProps, 'constructor')) {
      child = protoProps.constructor;
    } else {
      child = function(){ return parent.apply(this, arguments); };
    }

    // Add static properties to the constructor function, if supplied.
    _.extend(child, parent, staticProps);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.
    var Surrogate = function(){ this.constructor = child; };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate;

    // Add prototype properties (instance properties) to the subclass,
    // if supplied.
    if (protoProps) _.extend(child.prototype, protoProps);

    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;

    return child;
  };

  // Set up inheritance for the model, collection, router, view and history.
  Model.extend = Collection.extend = Router.extend = View.extend = History.extend = extend;

  // Throw an error when a URL is needed, and none is supplied.
  var urlError = function() {
    throw new Error('A "url" property or function must be specified');
  };

  // Wrap an optional error callback with a fallback error event.
  var wrapError = function(model, options) {
    var error = options.error;
    options.error = function(resp) {
      if (error) error(model, resp, options);
      model.trigger('error', model, resp, options);
    };
  };

  return Backbone;

}));
/*
	This is rot.js, the ROguelike Toolkit in JavaScript.
	Version 0.6~dev, generated on Tue Oct 14 15:41:20 CEST 2014.
*/
/**
 * @namespace Top-level ROT namespace
 */

var ROT = {
	/**
	 * @returns {bool} Is rot.js supported by this browser?
	 */
	isSupported: function() {
		return !!(document.createElement("canvas").getContext && Function.prototype.bind);
	},

	/** Default with for display and map generators */
	DEFAULT_WIDTH: 80,
	/** Default height for display and map generators */
	DEFAULT_HEIGHT: 25,

	/** Directional constants. Ordering is important! */
	DIRS: {
		"4": [
			[ 0, -1],
			[ 1,  0],
			[ 0,  1],
			[-1,  0]
		],
		"8": [
			[ 0, -1],
			[ 1, -1],
			[ 1,  0],
			[ 1,  1],
			[ 0,  1],
			[-1,  1],
			[-1,  0],
			[-1, -1]
		],
		"6": [
			[-1, -1],
			[ 1, -1],
			[ 2,  0],
			[ 1,  1],
			[-1,  1],
			[-2,  0]
		]
	},

	/** Cancel key. */
	VK_CANCEL: 3, 
	/** Help key. */
	VK_HELP: 6, 
	/** Backspace key. */
	VK_BACK_SPACE: 8, 
	/** Tab key. */
	VK_TAB: 9, 
	/** 5 key on Numpad when NumLock is unlocked. Or on Mac, clear key which is positioned at NumLock key. */
	VK_CLEAR: 12, 
	/** Return/enter key on the main keyboard. */
	VK_RETURN: 13, 
	/** Reserved, but not used. */
	VK_ENTER: 14, 
	/** Shift key. */
	VK_SHIFT: 16, 
	/** Control key. */
	VK_CONTROL: 17, 
	/** Alt (Option on Mac) key. */
	VK_ALT: 18, 
	/** Pause key. */
	VK_PAUSE: 19, 
	/** Caps lock. */
	VK_CAPS_LOCK: 20, 
	/** Escape key. */
	VK_ESCAPE: 27, 
	/** Space bar. */
	VK_SPACE: 32, 
	/** Page Up key. */
	VK_PAGE_UP: 33, 
	/** Page Down key. */
	VK_PAGE_DOWN: 34, 
	/** End key. */
	VK_END: 35, 
	/** Home key. */
	VK_HOME: 36, 
	/** Left arrow. */
	VK_LEFT: 37, 
	/** Up arrow. */
	VK_UP: 38, 
	/** Right arrow. */
	VK_RIGHT: 39, 
	/** Down arrow. */
	VK_DOWN: 40, 
	/** Print Screen key. */
	VK_PRINTSCREEN: 44, 
	/** Ins(ert) key. */
	VK_INSERT: 45, 
	/** Del(ete) key. */
	VK_DELETE: 46, 
	/***/
	VK_0: 48,
	/***/
	VK_1: 49,
	/***/
	VK_2: 50,
	/***/
	VK_3: 51,
	/***/
	VK_4: 52,
	/***/
	VK_5: 53,
	/***/
	VK_6: 54,
	/***/
	VK_7: 55,
	/***/
	VK_8: 56,
	/***/
	VK_9: 57,
	/** Colon (:) key. Requires Gecko 15.0 */
	VK_COLON: 58, 
	/** Semicolon (;) key. */
	VK_SEMICOLON: 59, 
	/** Less-than (<) key. Requires Gecko 15.0 */
	VK_LESS_THAN: 60, 
	/** Equals (=) key. */
	VK_EQUALS: 61, 
	/** Greater-than (>) key. Requires Gecko 15.0 */
	VK_GREATER_THAN: 62, 
	/** Question mark (?) key. Requires Gecko 15.0 */
	VK_QUESTION_MARK: 63, 
	/** Atmark (@) key. Requires Gecko 15.0 */
	VK_AT: 64, 
	/***/
	VK_A: 65,
	/***/
	VK_B: 66,
	/***/
	VK_C: 67,
	/***/
	VK_D: 68,
	/***/
	VK_E: 69,
	/***/
	VK_F: 70,
	/***/
	VK_G: 71,
	/***/
	VK_H: 72,
	/***/
	VK_I: 73,
	/***/
	VK_J: 74,
	/***/
	VK_K: 75,
	/***/
	VK_L: 76,
	/***/
	VK_M: 77,
	/***/
	VK_N: 78,
	/***/
	VK_O: 79,
	/***/
	VK_P: 80,
	/***/
	VK_Q: 81,
	/***/
	VK_R: 82,
	/***/
	VK_S: 83,
	/***/
	VK_T: 84,
	/***/
	VK_U: 85,
	/***/
	VK_V: 86,
	/***/
	VK_W: 87,
	/***/
	VK_X: 88,
	/***/
	VK_Y: 89,
	/***/
	VK_Z: 90,
	/***/
	VK_CONTEXT_MENU: 93,
	/** 0 on the numeric keypad. */
	VK_NUMPAD0: 96, 
	/** 1 on the numeric keypad. */
	VK_NUMPAD1: 97, 
	/** 2 on the numeric keypad. */
	VK_NUMPAD2: 98, 
	/** 3 on the numeric keypad. */
	VK_NUMPAD3: 99, 
	/** 4 on the numeric keypad. */
	VK_NUMPAD4: 100, 
	/** 5 on the numeric keypad. */
	VK_NUMPAD5: 101, 
	/** 6 on the numeric keypad. */
	VK_NUMPAD6: 102, 
	/** 7 on the numeric keypad. */
	VK_NUMPAD7: 103, 
	/** 8 on the numeric keypad. */
	VK_NUMPAD8: 104, 
	/** 9 on the numeric keypad. */
	VK_NUMPAD9: 105, 
	/** * on the numeric keypad. */
	VK_MULTIPLY: 106,
	/** + on the numeric keypad. */
	VK_ADD: 107, 
	/***/
	VK_SEPARATOR: 108,
	/** - on the numeric keypad. */
	VK_SUBTRACT: 109, 
	/** Decimal point on the numeric keypad. */
	VK_DECIMAL: 110, 
	/** / on the numeric keypad. */
	VK_DIVIDE: 111, 
	/** F1 key. */
	VK_F1: 112, 
	/** F2 key. */
	VK_F2: 113, 
	/** F3 key. */
	VK_F3: 114, 
	/** F4 key. */
	VK_F4: 115, 
	/** F5 key. */
	VK_F5: 116, 
	/** F6 key. */
	VK_F6: 117, 
	/** F7 key. */
	VK_F7: 118, 
	/** F8 key. */
	VK_F8: 119, 
	/** F9 key. */
	VK_F9: 120, 
	/** F10 key. */
	VK_F10: 121, 
	/** F11 key. */
	VK_F11: 122, 
	/** F12 key. */
	VK_F12: 123, 
	/** F13 key. */
	VK_F13: 124, 
	/** F14 key. */
	VK_F14: 125, 
	/** F15 key. */
	VK_F15: 126, 
	/** F16 key. */
	VK_F16: 127, 
	/** F17 key. */
	VK_F17: 128, 
	/** F18 key. */
	VK_F18: 129, 
	/** F19 key. */
	VK_F19: 130, 
	/** F20 key. */
	VK_F20: 131, 
	/** F21 key. */
	VK_F21: 132, 
	/** F22 key. */
	VK_F22: 133, 
	/** F23 key. */
	VK_F23: 134, 
	/** F24 key. */
	VK_F24: 135, 
	/** Num Lock key. */
	VK_NUM_LOCK: 144, 
	/** Scroll Lock key. */
	VK_SCROLL_LOCK: 145, 
	/** Circumflex (^) key. Requires Gecko 15.0 */
	VK_CIRCUMFLEX: 160, 
	/** Exclamation (!) key. Requires Gecko 15.0 */
	VK_EXCLAMATION: 161, 
	/** Double quote () key. Requires Gecko 15.0 */
	VK_DOUBLE_QUOTE: 162, 
	/** Hash (#) key. Requires Gecko 15.0 */
	VK_HASH: 163, 
	/** Dollar sign ($) key. Requires Gecko 15.0 */
	VK_DOLLAR: 164, 
	/** Percent (%) key. Requires Gecko 15.0 */
	VK_PERCENT: 165, 
	/** Ampersand (&) key. Requires Gecko 15.0 */
	VK_AMPERSAND: 166, 
	/** Underscore (_) key. Requires Gecko 15.0 */
	VK_UNDERSCORE: 167, 
	/** Open parenthesis (() key. Requires Gecko 15.0 */
	VK_OPEN_PAREN: 168, 
	/** Close parenthesis ()) key. Requires Gecko 15.0 */
	VK_CLOSE_PAREN: 169, 
	/* Asterisk (*) key. Requires Gecko 15.0 */
	VK_ASTERISK: 170,
	/** Plus (+) key. Requires Gecko 15.0 */
	VK_PLUS: 171, 
	/** Pipe (|) key. Requires Gecko 15.0 */
	VK_PIPE: 172, 
	/** Hyphen-US/docs/Minus (-) key. Requires Gecko 15.0 */
	VK_HYPHEN_MINUS: 173, 
	/** Open curly bracket ({) key. Requires Gecko 15.0 */
	VK_OPEN_CURLY_BRACKET: 174, 
	/** Close curly bracket (}) key. Requires Gecko 15.0 */
	VK_CLOSE_CURLY_BRACKET: 175, 
	/** Tilde (~) key. Requires Gecko 15.0 */
	VK_TILDE: 176, 
	/** Comma (,) key. */
	VK_COMMA: 188, 
	/** Period (.) key. */
	VK_PERIOD: 190, 
	/** Slash (/) key. */
	VK_SLASH: 191, 
	/** Back tick (`) key. */
	VK_BACK_QUOTE: 192, 
	/** Open square bracket ([) key. */
	VK_OPEN_BRACKET: 219, 
	/** Back slash (\) key. */
	VK_BACK_SLASH: 220, 
	/** Close square bracket (]) key. */
	VK_CLOSE_BRACKET: 221, 
	/** Quote (''') key. */
	VK_QUOTE: 222, 
	/** Meta key on Linux, Command key on Mac. */
	VK_META: 224, 
	/** AltGr key on Linux. Requires Gecko 15.0 */
	VK_ALTGR: 225, 
	/** Windows logo key on Windows. Or Super or Hyper key on Linux. Requires Gecko 15.0 */
	VK_WIN: 91, 
	/** Linux support for this keycode was added in Gecko 4.0. */
	VK_KANA: 21, 
	/** Linux support for this keycode was added in Gecko 4.0. */
	VK_HANGUL: 21, 
	/** 英数 key on Japanese Mac keyboard. Requires Gecko 15.0 */
	VK_EISU: 22, 
	/** Linux support for this keycode was added in Gecko 4.0. */
	VK_JUNJA: 23, 
	/** Linux support for this keycode was added in Gecko 4.0. */
	VK_FINAL: 24, 
	/** Linux support for this keycode was added in Gecko 4.0. */
	VK_HANJA: 25, 
	/** Linux support for this keycode was added in Gecko 4.0. */
	VK_KANJI: 25, 
	/** Linux support for this keycode was added in Gecko 4.0. */
	VK_CONVERT: 28, 
	/** Linux support for this keycode was added in Gecko 4.0. */
	VK_NONCONVERT: 29, 
	/** Linux support for this keycode was added in Gecko 4.0. */
	VK_ACCEPT: 30, 
	/** Linux support for this keycode was added in Gecko 4.0. */
	VK_MODECHANGE: 31, 
	/** Linux support for this keycode was added in Gecko 4.0. */
	VK_SELECT: 41, 
	/** Linux support for this keycode was added in Gecko 4.0. */
	VK_PRINT: 42, 
	/** Linux support for this keycode was added in Gecko 4.0. */
	VK_EXECUTE: 43, 
	/** Linux support for this keycode was added in Gecko 4.0.	 */
	VK_SLEEP: 95 
};
/**
 * @namespace
 * Contains text tokenization and breaking routines
 */
ROT.Text = {
	RE_COLORS: /%([bc]){([^}]*)}/g,

	/* token types */
	TYPE_TEXT:		0,
	TYPE_NEWLINE:	1,
	TYPE_FG:		2,
	TYPE_BG:		3,

	/**
	 * Measure size of a resulting text block
	 */
	measure: function(str, maxWidth) {
		var result = {width:0, height:1};
		var tokens = this.tokenize(str, maxWidth);
		var lineWidth = 0;

		for (var i=0;i<tokens.length;i++) {
			var token = tokens[i];
			switch (token.type) {
				case this.TYPE_TEXT:
					lineWidth += token.value.length;
				break;

				case this.TYPE_NEWLINE:
					result.height++;
					result.width = Math.max(result.width, lineWidth);
					lineWidth = 0;
				break;
			}
		}
		result.width = Math.max(result.width, lineWidth);

		return result;
	},

	/**
	 * Convert string to a series of a formatting commands
	 */
	tokenize: function(str, maxWidth) {
		var result = [];

		/* first tokenization pass - split texts and color formatting commands */
		var offset = 0;
		str.replace(this.RE_COLORS, function(match, type, name, index) {
			/* string before */
			var part = str.substring(offset, index);
			if (part.length) {
				result.push({
					type: ROT.Text.TYPE_TEXT,
					value: part
				});
			}

			/* color command */
			result.push({
				type: (type == "c" ? ROT.Text.TYPE_FG : ROT.Text.TYPE_BG),
				value: name.trim()
			});

			offset = index + match.length;
			return "";
		});

		/* last remaining part */
		var part = str.substring(offset);
		if (part.length) {
			result.push({
				type: ROT.Text.TYPE_TEXT,
				value: part
			});
		}

		return this._breakLines(result, maxWidth);
	},

	/* insert line breaks into first-pass tokenized data */
	_breakLines: function(tokens, maxWidth) {
		if (!maxWidth) { maxWidth = Infinity; };

		var i = 0;
		var lineLength = 0;
		var lastTokenWithSpace = -1;

		while (i < tokens.length) { /* take all text tokens, remove space, apply linebreaks */
			var token = tokens[i];
			if (token.type == ROT.Text.TYPE_NEWLINE) { /* reset */
				lineLength = 0; 
				lastTokenWithSpace = -1;
			}
			if (token.type != ROT.Text.TYPE_TEXT) { /* skip non-text tokens */
				i++;
				continue; 
			}

			/* remove spaces at the beginning of line */
			while (lineLength == 0 && token.value.charAt(0) == " ") { token.value = token.value.substring(1); }

			/* forced newline? insert two new tokens after this one */
			var index = token.value.indexOf("\n");
			if (index != -1) { 
				token.value = this._breakInsideToken(tokens, i, index, true); 

				/* if there are spaces at the end, we must remove them (we do not want the line too long) */
				var arr = token.value.split("");
				while (arr[arr.length-1] == " ") { arr.pop(); }
				token.value = arr.join("");
			}

			/* token degenerated? */
			if (!token.value.length) {
				tokens.splice(i, 1);
				continue;
			}

			if (lineLength + token.value.length > maxWidth) { /* line too long, find a suitable breaking spot */

				/* is it possible to break within this token? */
				var index = -1;
				while (1) {
					var nextIndex = token.value.indexOf(" ", index+1);
					if (nextIndex == -1) { break; }
					if (lineLength + nextIndex > maxWidth) { break; }
					index = nextIndex;
				}

				if (index != -1) { /* break at space within this one */
					token.value = this._breakInsideToken(tokens, i, index, true);
				} else if (lastTokenWithSpace != -1) { /* is there a previous token where a break can occur? */
					var token = tokens[lastTokenWithSpace];
					var breakIndex = token.value.lastIndexOf(" ");
					token.value = this._breakInsideToken(tokens, lastTokenWithSpace, breakIndex, true);
					i = lastTokenWithSpace;
				} else { /* force break in this token */
					token.value = this._breakInsideToken(tokens, i, maxWidth-lineLength, false);
				}

			} else { /* line not long, continue */
				lineLength += token.value.length;
				if (token.value.indexOf(" ") != -1) { lastTokenWithSpace = i; }
			}
			
			i++; /* advance to next token */
		}


		tokens.push({type: ROT.Text.TYPE_NEWLINE}); /* insert fake newline to fix the last text line */

		/* remove trailing space from text tokens before newlines */
		var lastTextToken = null;
		for (var i=0;i<tokens.length;i++) {
			var token = tokens[i];
			switch (token.type) {
				case ROT.Text.TYPE_TEXT: lastTextToken = token; break;
				case ROT.Text.TYPE_NEWLINE: 
					if (lastTextToken) { /* remove trailing space */
						var arr = lastTextToken.value.split("");
						while (arr[arr.length-1] == " ") { arr.pop(); }
						lastTextToken.value = arr.join("");
					}
					lastTextToken = null;
				break;
			}
		}

		tokens.pop(); /* remove fake token */

		return tokens;
	},

	/**
	 * Create new tokens and insert them into the stream
	 * @param {object[]} tokens
	 * @param {int} tokenIndex Token being processed
	 * @param {int} breakIndex Index within current token's value
	 * @param {bool} removeBreakChar Do we want to remove the breaking character?
	 * @returns {string} remaining unbroken token value
	 */
	_breakInsideToken: function(tokens, tokenIndex, breakIndex, removeBreakChar) {
		var newBreakToken = {
			type: ROT.Text.TYPE_NEWLINE
		}
		var newTextToken = {
			type: ROT.Text.TYPE_TEXT,
			value: tokens[tokenIndex].value.substring(breakIndex + (removeBreakChar ? 1 : 0))
		}
		tokens.splice(tokenIndex+1, 0, newBreakToken, newTextToken);
		return tokens[tokenIndex].value.substring(0, breakIndex);
	}
}
/**
 * @returns {any} Randomly picked item, null when length=0
 */
Array.prototype.random = function() {
	if (!this.length) { return null; }
	return this[Math.floor(ROT.RNG.getUniform() * this.length)];
}

/**
 * @returns {array} New array with randomized items
 * FIXME destroys this!
 */
Array.prototype.randomize = function() {
	var result = [];
	while (this.length) {
		var index = this.indexOf(this.random());
		result.push(this.splice(index, 1)[0]);
	}
	return result;
}
/**
 * Always positive modulus
 * @param {int} n Modulus
 * @returns {int} this modulo n
 */
Number.prototype.mod = function(n) {
	return ((this%n)+n)%n;
}
/**
 * @returns {string} First letter capitalized
 */
String.prototype.capitalize = function() {
	return this.charAt(0).toUpperCase() + this.substring(1);
}

/** 
 * Left pad
 * @param {string} [character="0"]
 * @param {int} [count=2]
 */
String.prototype.lpad = function(character, count) {
	var ch = character || "0";
	var cnt = count || 2;

	var s = "";
	while (s.length < (cnt - this.length)) { s += ch; }
	s = s.substring(0, cnt-this.length);
	return s+this;
}

/** 
 * Right pad
 * @param {string} [character="0"]
 * @param {int} [count=2]
 */
String.prototype.rpad = function(character, count) {
	var ch = character || "0";
	var cnt = count || 2;

	var s = "";
	while (s.length < (cnt - this.length)) { s += ch; }
	s = s.substring(0, cnt-this.length);
	return this+s;
}

/**
 * Format a string in a flexible way. Scans for %s strings and replaces them with arguments. List of patterns is modifiable via String.format.map.
 * @param {string} template
 * @param {any} [argv]
 */
String.format = function(template) {
	var map = String.format.map;
	var args = Array.prototype.slice.call(arguments, 1);

	var replacer = function(match, group1, group2, index) {
		if (template.charAt(index-1) == "%") { return match.substring(1); }
		if (!args.length) { return match; }
		var obj = args[0];

		var group = group1 || group2;
		var parts = group.split(",");
		var name = parts.shift();
		var method = map[name.toLowerCase()];
		if (!method) { return match; }

		var obj = args.shift();
		var replaced = obj[method].apply(obj, parts);

		var first = name.charAt(0);
		if (first != first.toLowerCase()) { replaced = replaced.capitalize(); }

		return replaced;
	}
	return template.replace(/%(?:([a-z]+)|(?:{([^}]+)}))/gi, replacer);
}

String.format.map = {
	"s": "toString"
}

/**
 * Convenience shortcut to String.format(this)
 */
String.prototype.format = function() {
	var args = Array.prototype.slice.call(arguments);
	args.unshift(this);
	return String.format.apply(String, args);
}

if (!Object.create) {  
	/**
	 * ES5 Object.create
	 */
	Object.create = function(o) {  
		var tmp = function() {};
		tmp.prototype = o;
		return new tmp();
	};  
}  
/**
 * Sets prototype of this function to an instance of parent function
 * @param {function} parent
 */
Function.prototype.extend = function(parent) {
	this.prototype = Object.create(parent.prototype);
	this.prototype.constructor = this;
	return this;
}
window.requestAnimationFrame =
	window.requestAnimationFrame
	|| window.mozRequestAnimationFrame
	|| window.webkitRequestAnimationFrame
	|| window.oRequestAnimationFrame
	|| window.msRequestAnimationFrame
	|| function(cb) { return setTimeout(cb, 1000/60); };

window.cancelAnimationFrame =
	window.cancelAnimationFrame
	|| window.mozCancelAnimationFrame
	|| window.webkitCancelAnimationFrame
	|| window.oCancelAnimationFrame
	|| window.msCancelAnimationFrame
	|| function(id) { return clearTimeout(id); };
/**
 * @class Visual map display
 * @param {object} [options]
 * @param {int} [options.width=ROT.DEFAULT_WIDTH]
 * @param {int} [options.height=ROT.DEFAULT_HEIGHT]
 * @param {int} [options.fontSize=15]
 * @param {string} [options.fontFamily="monospace"]
 * @param {string} [options.fontStyle=""] bold/italic/none/both
 * @param {string} [options.fg="#ccc"]
 * @param {string} [options.bg="#000"]
 * @param {float} [options.spacing=1]
 * @param {float} [options.border=0]
 * @param {string} [options.layout="rect"]
 * @param {int} [options.tileWidth=32]
 * @param {int} [options.tileHeight=32]
 * @param {object} [options.tileMap={}]
 * @param {image} [options.tileSet=null]
 */
ROT.Display = function(options) {
	var canvas = document.createElement("canvas");
	this._context = canvas.getContext("2d");
	this._data = {};
	this._dirty = false; /* false = nothing, true = all, object = dirty cells */
	this._options = {};
	this._backend = null;
	
	var defaultOptions = {
		width: ROT.DEFAULT_WIDTH,
		height: ROT.DEFAULT_HEIGHT,
		transpose: false,
		layout: "rect",
		fontSize: 15,
		spacing: 1,
		border: 0,
		fontFamily: "monospace",
		fontStyle: "",
		fg: "#ccc",
		bg: "#000",
		tileWidth: 32,
		tileHeight: 32,
		tileMap: {},
		tileSet: null
	};
	for (var p in options) { defaultOptions[p] = options[p]; }
	this.setOptions(defaultOptions);
	this.DEBUG = this.DEBUG.bind(this);

	this._tick = this._tick.bind(this);
	requestAnimationFrame(this._tick);
}

/**
 * Debug helper, ideal as a map generator callback. Always bound to this.
 * @param {int} x
 * @param {int} y
 * @param {int} what
 */
ROT.Display.prototype.DEBUG = function(x, y, what) {
	var colors = [this._options.bg, this._options.fg];
	this.draw(x, y, null, null, colors[what % colors.length]);
}

/**
 * Clear the whole display (cover it with background color)
 */
ROT.Display.prototype.clear = function() {
	this._data = {};
	this._dirty = true;
}

/**
 * @see ROT.Display
 */
ROT.Display.prototype.setOptions = function(options) {
	for (var p in options) { this._options[p] = options[p]; }
	if (options.width || options.height || options.fontSize || options.fontFamily || options.spacing || options.layout) {
		if (options.layout) { 
			this._backend = new ROT.Display[options.layout.capitalize()](this._context);
		}

		var font = (this._options.fontStyle ? this._options.fontStyle + " " : "") + this._options.fontSize + "px " + this._options.fontFamily;
		this._context.font = font;
		this._backend.compute(this._options);
		this._context.font = font;
		this._context.textAlign = "center";
		this._context.textBaseline = "middle";
		this._dirty = true;
	}
	return this;
}

/**
 * Returns currently set options
 * @returns {object} Current options object 
 */
ROT.Display.prototype.getOptions = function() {
	return this._options;
}

/**
 * Returns the DOM node of this display
 * @returns {node} DOM node
 */
ROT.Display.prototype.getContainer = function() {
	return this._context.canvas;
}

/**
 * Compute the maximum width/height to fit into a set of given constraints
 * @param {int} availWidth Maximum allowed pixel width
 * @param {int} availHeight Maximum allowed pixel height
 * @returns {int[2]} cellWidth,cellHeight
 */
ROT.Display.prototype.computeSize = function(availWidth, availHeight) {
	return this._backend.computeSize(availWidth, availHeight, this._options);
}

/**
 * Compute the maximum font size to fit into a set of given constraints
 * @param {int} availWidth Maximum allowed pixel width
 * @param {int} availHeight Maximum allowed pixel height
 * @returns {int} fontSize
 */
ROT.Display.prototype.computeFontSize = function(availWidth, availHeight) {
	return this._backend.computeFontSize(availWidth, availHeight, this._options);
}

/**
 * Convert a DOM event (mouse or touch) to map coordinates. Uses first touch for multi-touch.
 * @param {Event} e event
 * @returns {int[2]} -1 for values outside of the canvas
 */
ROT.Display.prototype.eventToPosition = function(e) {
	if (e.touches) {
		var x = e.touches[0].clientX;
		var y = e.touches[0].clientY;
	} else {
		var x = e.clientX;
		var y = e.clientY;
	}

	var rect = this._context.canvas.getBoundingClientRect();
	x -= rect.left;
	y -= rect.top;
	
	if (x < 0 || y < 0 || x >= this._context.canvas.width || y >= this._context.canvas.height) { return [-1, -1]; }

	return this._backend.eventToPosition(x, y);
}

/**
 * @param {int} x
 * @param {int} y
 * @param {string || string[]} ch One or more chars (will be overlapping themselves)
 * @param {string} [fg] foreground color
 * @param {string} [bg] background color
 */
ROT.Display.prototype.draw = function(x, y, ch, fg, bg) {
	if (!fg) { fg = this._options.fg; }
	if (!bg) { bg = this._options.bg; }
	this._data[x+","+y] = [x, y, ch, fg, bg];
	
	if (this._dirty === true) { return; } /* will already redraw everything */
	if (!this._dirty) { this._dirty = {}; } /* first! */
	this._dirty[x+","+y] = true;
}

/**
 * Draws a text at given position. Optionally wraps at a maximum length. Currently does not work with hex layout.
 * @param {int} x
 * @param {int} y
 * @param {string} text May contain color/background format specifiers, %c{name}/%b{name}, both optional. %c{}/%b{} resets to default.
 * @param {int} [maxWidth] wrap at what width?
 * @returns {int} lines drawn
 */
ROT.Display.prototype.drawText = function(x, y, text, maxWidth) {
	var fg = null;
	var bg = null;
	var cx = x;
	var cy = y;
	var lines = 1;
	if (!maxWidth) { maxWidth = this._options.width-x; }

	var tokens = ROT.Text.tokenize(text, maxWidth);

	while (tokens.length) { /* interpret tokenized opcode stream */
		var token = tokens.shift();
		switch (token.type) {
			case ROT.Text.TYPE_TEXT:
				var isSpace = isPrevSpace = isFullWidth = isPrevFullWidth = false;
				for (var i=0;i<token.value.length;i++) {
					var cc = token.value.charCodeAt(i);
					var c = token.value.charAt(i);
					// Assign to `true` when the current char is full-width.
					isFullWidth = (cc > 0xff && cc < 0xff61) || (cc > 0xffdc && cc < 0xffe8) && cc > 0xffee;
					// Current char is space, whatever full-width or half-width both are OK.
					isSpace = (c.charCodeAt(0) == 0x20 || c.charCodeAt(0) == 0x3000);
					// The previous char is full-width and
					// current char is nether half-width nor a space.
					if (isPrevFullWidth && !isFullWidth && !isSpace) { cx++; } // add an extra position
					// The current char is full-width and
					// the previous char is not a space.
					if(isFullWidth && !isPrevSpace) { cx++; } // add an extra position
					this.draw(cx++, cy, c, fg, bg);
					isPrevSpace = isSpace;
					isPrevFullWidth = isFullWidth;
				}
			break;

			case ROT.Text.TYPE_FG:
				fg = token.value || null;
			break;

			case ROT.Text.TYPE_BG:
				bg = token.value || null;
			break;

			case ROT.Text.TYPE_NEWLINE:
				cx = x;
				cy++;
				lines++
			break;
		}
	}

	return lines;
}

/**
 * Timer tick: update dirty parts
 */
ROT.Display.prototype._tick = function() {
	requestAnimationFrame(this._tick);

	if (!this._dirty) { return; }

	if (this._dirty === true) { /* draw all */
		this._context.fillStyle = this._options.bg;
		this._context.fillRect(0, 0, this._context.canvas.width, this._context.canvas.height);

		for (var id in this._data) { /* redraw cached data */
			this._draw(id, false);
		}

	} else { /* draw only dirty */
		for (var key in this._dirty) {
			this._draw(key, true);
		}
	}

	this._dirty = false;
}

/**
 * @param {string} key What to draw
 * @param {bool} clearBefore Is it necessary to clean before?
 */
ROT.Display.prototype._draw = function(key, clearBefore) {
	var data = this._data[key];
	if (data[4] != this._options.bg) { clearBefore = true; }

	this._backend.draw(data, clearBefore);
}
/**
 * @class Abstract display backend module
 * @private
 */
ROT.Display.Backend = function(context) {
	this._context = context;
}

ROT.Display.Backend.prototype.compute = function(options) {
}

ROT.Display.Backend.prototype.draw = function(data, clearBefore) {
}

ROT.Display.Backend.prototype.computeSize = function(availWidth, availHeight) {
}

ROT.Display.Backend.prototype.computeFontSize = function(availWidth, availHeight) {
}

ROT.Display.Backend.prototype.eventToPosition = function(x, y) {
}
/**
 * @class Rectangular backend
 * @private
 */
ROT.Display.Rect = function(context) {
	ROT.Display.Backend.call(this, context);
	
	this._spacingX = 0;
	this._spacingY = 0;
	this._canvasCache = {};
	this._options = {};
}
ROT.Display.Rect.extend(ROT.Display.Backend);

ROT.Display.Rect.cache = false;

ROT.Display.Rect.prototype.compute = function(options) {
	this._canvasCache = {};
	this._options = options;

	var charWidth = Math.ceil(this._context.measureText("W").width);
	this._spacingX = Math.ceil(options.spacing * charWidth);
	this._spacingY = Math.ceil(options.spacing * options.fontSize);
	this._context.canvas.width = options.width * this._spacingX;
	this._context.canvas.height = options.height * this._spacingY;
}

ROT.Display.Rect.prototype.draw = function(data, clearBefore) {
	if (this.constructor.cache) {
		this._drawWithCache(data, clearBefore);
	} else {
		this._drawNoCache(data, clearBefore);
	}
}

ROT.Display.Rect.prototype._drawWithCache = function(data, clearBefore) {
	var x = data[0];
	var y = data[1];
	var ch = data[2];
	var fg = data[3];
	var bg = data[4];

	var hash = ""+ch+fg+bg;
	if (hash in this._canvasCache) {
		var canvas = this._canvasCache[hash];
	} else {
		var b = this._options.border;
		var canvas = document.createElement("canvas");
		var ctx = canvas.getContext("2d");
		canvas.width = this._spacingX;
		canvas.height = this._spacingY;
		ctx.fillStyle = bg;
		ctx.fillRect(b, b, canvas.width-b, canvas.height-b);
		
		if (ch) {
			ctx.fillStyle = fg;
			ctx.font = this._context.font;
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";

			var chars = [].concat(ch);
			for (var i=0;i<chars.length;i++) {
				ctx.fillText(chars[i], this._spacingX/2, this._spacingY/2);
			}
		}
		this._canvasCache[hash] = canvas;
	}
	
	this._context.drawImage(canvas, x*this._spacingX, y*this._spacingY);
}

ROT.Display.Rect.prototype._drawNoCache = function(data, clearBefore) {
	var x = data[0];
	var y = data[1];
	var ch = data[2];
	var fg = data[3];
	var bg = data[4];

	if (clearBefore) { 
		var b = this._options.border;
		this._context.fillStyle = bg;
		this._context.fillRect(x*this._spacingX + b, y*this._spacingY + b, this._spacingX - b, this._spacingY - b);
	}
	
	if (!ch) { return; }

	this._context.fillStyle = fg;

	var chars = [].concat(ch);
	for (var i=0;i<chars.length;i++) {
		this._context.fillText(chars[i], (x+0.5) * this._spacingX, (y+0.5) * this._spacingY);
	}
}

ROT.Display.Rect.prototype.computeSize = function(availWidth, availHeight) {
	var width = Math.floor(availWidth / this._spacingX);
	var height = Math.floor(availHeight / this._spacingY);
	return [width, height];
}

ROT.Display.Rect.prototype.computeFontSize = function(availWidth, availHeight) {
	var boxWidth = Math.floor(availWidth / this._options.width);
	var boxHeight = Math.floor(availHeight / this._options.height);

	/* compute char ratio */
	var oldFont = this._context.font;
	this._context.font = "100px " + this._options.fontFamily;
	var width = Math.ceil(this._context.measureText("W").width);
	this._context.font = oldFont;
	var ratio = width / 100;
		
	var widthFraction = ratio * boxHeight / boxWidth;
	if (widthFraction > 1) { /* too wide with current aspect ratio */
		boxHeight = Math.floor(boxHeight / widthFraction);
	}
	return Math.floor(boxHeight / this._options.spacing);
}

ROT.Display.Rect.prototype.eventToPosition = function(x, y) {
	return [Math.floor(x/this._spacingX), Math.floor(y/this._spacingY)];
}
/**
 * @class Hexagonal backend
 * @private
 */
ROT.Display.Hex = function(context) {
	ROT.Display.Backend.call(this, context);

	this._spacingX = 0;
	this._spacingY = 0;
	this._hexSize = 0;
	this._options = {};
}
ROT.Display.Hex.extend(ROT.Display.Backend);

ROT.Display.Hex.prototype.compute = function(options) {
	this._options = options;

	/* FIXME char size computation does not respect transposed hexes */
	var charWidth = Math.ceil(this._context.measureText("W").width);
	this._hexSize = Math.floor(options.spacing * (options.fontSize + charWidth/Math.sqrt(3)) / 2);
	this._spacingX = this._hexSize * Math.sqrt(3) / 2;
	this._spacingY = this._hexSize * 1.5;

	if (options.transpose) {
		var xprop = "height";
		var yprop = "width";
	} else {
		var xprop = "width";
		var yprop = "height";
	}
	this._context.canvas[xprop] = Math.ceil( (options.width + 1) * this._spacingX );
	this._context.canvas[yprop] = Math.ceil( (options.height - 1) * this._spacingY + 2*this._hexSize );
}

ROT.Display.Hex.prototype.draw = function(data, clearBefore) {
	var x = data[0];
	var y = data[1];
	var ch = data[2];
	var fg = data[3];
	var bg = data[4];

	var px = [
		(x+1) * this._spacingX,
		y * this._spacingY + this._hexSize
	];
	if (this._options.transpose) { px.reverse(); }

	if (clearBefore) { 
		this._context.fillStyle = bg;
		this._fill(px[0], px[1]);
	}
	
	if (!ch) { return; }

	this._context.fillStyle = fg;

	var chars = [].concat(ch);
	for (var i=0;i<chars.length;i++) {
		this._context.fillText(chars[i], px[0], px[1]);
	}
}

ROT.Display.Hex.prototype.computeSize = function(availWidth, availHeight) {
	if (this._options.transpose) {
		availWidth += availHeight;
		availHeight = availWidth - availHeight;
		availWidth -= availHeight;
	}

	var width = Math.floor(availWidth / this._spacingX) - 1;
	var height = Math.floor((availHeight - 2*this._hexSize) / this._spacingY + 1);
	return [width, height];
}

ROT.Display.Hex.prototype.computeFontSize = function(availWidth, availHeight) {
	if (this._options.transpose) {
		availWidth += availHeight;
		availHeight = availWidth - availHeight;
		availWidth -= availHeight;
	}

	var hexSizeWidth = 2*availWidth / ((this._options.width+1) * Math.sqrt(3)) - 1;
	var hexSizeHeight = availHeight / (2 + 1.5*(this._options.height-1));
	var hexSize = Math.min(hexSizeWidth, hexSizeHeight);

	/* compute char ratio */
	var oldFont = this._context.font;
	this._context.font = "100px " + this._options.fontFamily;
	var width = Math.ceil(this._context.measureText("W").width);
	this._context.font = oldFont;
	var ratio = width / 100;

	hexSize = Math.floor(hexSize)+1; /* closest larger hexSize */

	/* FIXME char size computation does not respect transposed hexes */
	var fontSize = 2*hexSize / (this._options.spacing * (1 + ratio / Math.sqrt(3)));

	/* closest smaller fontSize */
	return Math.ceil(fontSize)-1;
}

ROT.Display.Hex.prototype.eventToPosition = function(x, y) {
	if (this._options.transpose) {
		x += y;
		y = x-y;
		x -= y;
		var prop = "width";
	} else {
		var prop = "height";
	}
	var size = this._context.canvas[prop] / this._options[prop];
	y = Math.floor(y/size);

	if (y.mod(2)) { /* odd row */
		x -= this._spacingX;
		x = 1 + 2*Math.floor(x/(2*this._spacingX));
	} else {
		x = 2*Math.floor(x/(2*this._spacingX));
	}
	
	return [x, y];
}

/**
 * Arguments are pixel values. If "transposed" mode is enabled, then these two are already swapped.
 */
ROT.Display.Hex.prototype._fill = function(cx, cy) {
	var a = this._hexSize;
	var b = this._options.border;
	
	this._context.beginPath();

	if (this._options.transpose) {
		this._context.moveTo(cx-a+b,	cy);
		this._context.lineTo(cx-a/2+b,	cy+this._spacingX-b);
		this._context.lineTo(cx+a/2-b,	cy+this._spacingX-b);
		this._context.lineTo(cx+a-b,	cy);
		this._context.lineTo(cx+a/2-b,	cy-this._spacingX+b);
		this._context.lineTo(cx-a/2+b,	cy-this._spacingX+b);
		this._context.lineTo(cx-a+b,	cy);
	} else {
		this._context.moveTo(cx,					cy-a+b);
		this._context.lineTo(cx+this._spacingX-b,	cy-a/2+b);
		this._context.lineTo(cx+this._spacingX-b,	cy+a/2-b);
		this._context.lineTo(cx,					cy+a-b);
		this._context.lineTo(cx-this._spacingX+b,	cy+a/2-b);
		this._context.lineTo(cx-this._spacingX+b,	cy-a/2+b);
		this._context.lineTo(cx,					cy-a+b);
	}
	this._context.fill();
}
/**
 * @class Tile backend
 * @private
 */
ROT.Display.Tile = function(context) {
	ROT.Display.Rect.call(this, context);
	
	this._options = {};
}
ROT.Display.Tile.extend(ROT.Display.Rect);

ROT.Display.Tile.prototype.compute = function(options) {
	this._options = options;
	this._context.canvas.width = options.width * options.tileWidth;
	this._context.canvas.height = options.height * options.tileHeight;
}

ROT.Display.Tile.prototype.draw = function(data, clearBefore) {
	var x = data[0];
	var y = data[1];
	var ch = data[2];
	var fg = data[3];
	var bg = data[4];

	var tileWidth = this._options.tileWidth;
	var tileHeight = this._options.tileHeight;

	if (clearBefore) {
		var b = this._options.border;
		this._context.fillStyle = bg;
		this._context.fillRect(x*tileWidth, y*tileHeight, tileWidth, tileHeight);
	}

	if (!ch) { return; }

	var chars = [].concat(ch);
	for (var i=0;i<chars.length;i++) {
		var tile = this._options.tileMap[chars[i]];
		if (!tile) { throw new Error("Char '" + chars[i] + "' not found in tileMap"); }
		
		this._context.drawImage(
			this._options.tileSet,
			tile[0], tile[1], tileWidth, tileHeight,
			x*tileWidth, y*tileHeight, tileWidth, tileHeight
		);
	}
}

ROT.Display.Tile.prototype.computeSize = function(availWidth, availHeight) {
	var width = Math.floor(availWidth / this._options.tileWidth);
	var height = Math.floor(availHeight / this._options.tileHeight);
	return [width, height];
}

ROT.Display.Tile.prototype.computeFontSize = function(availWidth, availHeight) {
	var width = Math.floor(availWidth / this._options.width);
	var height = Math.floor(availHeight / this._options.height);
	return [width, height];
}

ROT.Display.Tile.prototype.eventToPosition = function(x, y) {
	return [Math.floor(x/this._options.tileWidth), Math.floor(y/this._options.tileHeight)];
}
/**
 * @namespace
 * This code is an implementation of Alea algorithm; (C) 2010 Johannes Baagøe.
 * Alea is licensed according to the http://en.wikipedia.org/wiki/MIT_License.
 */
ROT.RNG = {
	/**
	 * @returns {number} 
	 */
	getSeed: function() {
		return this._seed;
	},

	/**
	 * @param {number} seed Seed the number generator
	 */
	setSeed: function(seed) {
		seed = (seed < 1 ? 1/seed : seed);

		this._seed = seed;
		this._s0 = (seed >>> 0) * this._frac;

		seed = (seed*69069 + 1) >>> 0;
		this._s1 = seed * this._frac;

		seed = (seed*69069 + 1) >>> 0;
		this._s2 = seed * this._frac;

		this._c = 1;
		return this;
	},

	/**
	 * @returns {float} Pseudorandom value [0,1), uniformly distributed
	 */
	getUniform: function() {
		var t = 2091639 * this._s0 + this._c * this._frac;
		this._s0 = this._s1;
		this._s1 = this._s2;
		this._c = t | 0;
		this._s2 = t - this._c;
		return this._s2;
	},

	/**
	 * @param {int} lowerBound The lower end of the range to return a value from, inclusive
	 * @param {int} upperBound The upper end of the range to return a value from, inclusive
	 * @returns {int} Pseudorandom value [lowerBound, upperBound], using ROT.RNG.getUniform() to distribute the value
	 */
	getUniformInt: function(lowerBound, upperBound) {
		var max = Math.max(lowerBound, upperBound);
		var min = Math.min(lowerBound, upperBound);
		return Math.floor(this.getUniform() * (max - min + 1)) + min;
	},

	/**
	 * @param {float} [mean=0] Mean value
	 * @param {float} [stddev=1] Standard deviation. ~95% of the absolute values will be lower than 2*stddev.
	 * @returns {float} A normally distributed pseudorandom value
	 */
	getNormal: function(mean, stddev) {
		do {
			var u = 2*this.getUniform()-1;
			var v = 2*this.getUniform()-1;
			var r = u*u + v*v;
		} while (r > 1 || r == 0);

		var gauss = u * Math.sqrt(-2*Math.log(r)/r);
		return (mean || 0) + gauss*(stddev || 1);
	},

	/**
	 * @returns {int} Pseudorandom value [1,100] inclusive, uniformly distributed
	 */
	getPercentage: function() {
		return 1 + Math.floor(this.getUniform()*100);
	},
	
	/**
	 * @param {object} data key=whatever, value=weight (relative probability)
	 * @returns {string} whatever
	 */
	getWeightedValue: function(data) {
		var avail = [];
		var total = 0;
		
		for (var id in data) {
			total += data[id];
		}
		var random = Math.floor(this.getUniform()*total);
		
		var part = 0;
		for (var id in data) {
			part += data[id];
			if (random < part) { return id; }
		}
		
		return null;
	},

	/**
	 * Get RNG state. Useful for storing the state and re-setting it via setState.
	 * @returns {?} Internal state
	 */
	getState: function() {
		return [this._s0, this._s1, this._s2, this._c];
	},

	/**
	 * Set a previously retrieved state.
	 * @param {?} state
	 */
	setState: function(state) {
		this._s0 = state[0];
		this._s1 = state[1];
		this._s2 = state[2];
		this._c  = state[3];
		return this;
	},

	/**
	 * Returns a cloned RNG
	 */
	clone: function() {
		var clone = Object.create(this);
		clone.setState(this.getState());
		return clone;
	},

	_s0: 0,
	_s1: 0,
	_s2: 0,
	_c: 0,
	_frac: 2.3283064365386963e-10 /* 2^-32 */
}

ROT.RNG.setSeed(Date.now());
/**
 * @class (Markov process)-based string generator. 
 * Copied from a <a href="http://www.roguebasin.roguelikedevelopment.org/index.php?title=Names_from_a_high_order_Markov_Process_and_a_simplified_Katz_back-off_scheme">RogueBasin article</a>. 
 * Offers configurable order and prior.
 * @param {object} [options]
 * @param {bool} [options.words=false] Use word mode?
 * @param {int} [options.order=3]
 * @param {float} [options.prior=0.001]
 */
ROT.StringGenerator = function(options) {
	this._options = {
		words: false,
		order: 3,
		prior: 0.001
	}
	for (var p in options) { this._options[p] = options[p]; }

	this._boundary = String.fromCharCode(0);
	this._suffix = this._boundary;
	this._prefix = [];
	for (var i=0;i<this._options.order;i++) { this._prefix.push(this._boundary); }

	this._priorValues = {};
	this._priorValues[this._boundary] = this._options.prior;

	this._data = {};
}

/**
 * Remove all learning data
 */
ROT.StringGenerator.prototype.clear = function() {
	this._data = {};
	this._priorValues = {};
}

/**
 * @returns {string} Generated string
 */
ROT.StringGenerator.prototype.generate = function() {
	var result = [this._sample(this._prefix)];
	while (result[result.length-1] != this._boundary) {
		result.push(this._sample(result));
	}
	return this._join(result.slice(0, -1));
}

/**
 * Observe (learn) a string from a training set
 */
ROT.StringGenerator.prototype.observe = function(string) {
	var tokens = this._split(string);

	for (var i=0; i<tokens.length; i++) {
		this._priorValues[tokens[i]] = this._options.prior;
	}

	tokens = this._prefix.concat(tokens).concat(this._suffix); /* add boundary symbols */

	for (var i=this._options.order; i<tokens.length; i++) {
		var context = tokens.slice(i-this._options.order, i);
		var event = tokens[i];
		for (var j=0; j<context.length; j++) {
			var subcontext = context.slice(j);
			this._observeEvent(subcontext, event);
		}
	}
}

ROT.StringGenerator.prototype.getStats = function() {
	var parts = [];

	var priorCount = 0;
	for (var p in this._priorValues) { priorCount++; }
	priorCount--; /* boundary */
	parts.push("distinct samples: " + priorCount);

	var dataCount = 0;
	var eventCount = 0;
	for (var p in this._data) { 
		dataCount++; 
		for (var key in this._data[p]) {
			eventCount++;
		}
	}
	parts.push("dictionary size (contexts): " + dataCount);
	parts.push("dictionary size (events): " + eventCount);

	return parts.join(", ");
}

/**
 * @param {string}
 * @returns {string[]}
 */
ROT.StringGenerator.prototype._split = function(str) {
	return str.split(this._options.words ? /\s+/ : "");
}

/**
 * @param {string[]}
 * @returns {string} 
 */
ROT.StringGenerator.prototype._join = function(arr) {
	return arr.join(this._options.words ? " " : "");
}

/**
 * @param {string[]} context
 * @param {string} event
 */
ROT.StringGenerator.prototype._observeEvent = function(context, event) {
	var key = this._join(context);
	if (!(key in this._data)) { this._data[key] = {}; }
	var data = this._data[key];

	if (!(event in data)) { data[event] = 0; }
	data[event]++;
}

/**
 * @param {string[]}
 * @returns {string}
 */
ROT.StringGenerator.prototype._sample = function(context) {
	context = this._backoff(context);
	var key = this._join(context);
	var data = this._data[key];

	var available = {};

	if (this._options.prior) {
		for (var event in this._priorValues) { available[event] = this._priorValues[event]; }
		for (var event in data) { available[event] += data[event]; }
	} else { 
		available = data;
	}

	return this._pickRandom(available);
}

/**
 * @param {string[]}
 * @returns {string[]}
 */
ROT.StringGenerator.prototype._backoff = function(context) {
	if (context.length > this._options.order) {
		context = context.slice(-this._options.order);
	} else if (context.length < this._options.order) {
		context = this._prefix.slice(0, this._options.order - context.length).concat(context);
	}

	while (!(this._join(context) in this._data) && context.length > 0) { context = context.slice(1); }

	return context;
}


ROT.StringGenerator.prototype._pickRandom = function(data) {
	var total = 0;
	
	for (var id in data) {
		total += data[id];
	}
	var random = ROT.RNG.getUniform()*total;
	
	var part = 0;
	for (var id in data) {
		part += data[id];
		if (random < part) { return id; }
	}
}
/**
 * @class Generic event queue: stores events and retrieves them based on their time
 */
ROT.EventQueue = function() {
	this._time = 0;
	this._events = [];
	this._eventTimes = [];
}

/**
 * @returns {number} Elapsed time
 */
ROT.EventQueue.prototype.getTime = function() {
	return this._time;
}

/**
 * Clear all scheduled events
 */
ROT.EventQueue.prototype.clear = function() {
	this._events = [];
	this._eventTimes = [];
	return this;
}

/**
 * @param {?} event
 * @param {number} time
 */
ROT.EventQueue.prototype.add = function(event, time) {
	var index = this._events.length;
	for (var i=0;i<this._eventTimes.length;i++) {
		if (this._eventTimes[i] > time) {
			index = i;
			break;
		}
	}

	this._events.splice(index, 0, event);
	this._eventTimes.splice(index, 0, time);
}

/**
 * Locates the nearest event, advances time if necessary. Returns that event and removes it from the queue.
 * @returns {? || null} The event previously added by addEvent, null if no event available
 */
ROT.EventQueue.prototype.get = function() {
	if (!this._events.length) { return null; }

	var time = this._eventTimes.splice(0, 1)[0];
	if (time > 0) { /* advance */
		this._time += time;
		for (var i=0;i<this._eventTimes.length;i++) { this._eventTimes[i] -= time; }
	}

	return this._events.splice(0, 1)[0];
}

/**
 * Remove an event from the queue
 * @param {?} event
 * @returns {bool} success?
 */
ROT.EventQueue.prototype.remove = function(event) {
	var index = this._events.indexOf(event);
	if (index == -1) { return false }
	this._remove(index);
	return true;
}

/**
 * Remove an event from the queue
 * @param {int} index
 */
ROT.EventQueue.prototype._remove = function(index) {
	this._events.splice(index, 1);
	this._eventTimes.splice(index, 1);
}
/**
 * @class Abstract scheduler
 */
ROT.Scheduler = function() {
	this._queue = new ROT.EventQueue();
	this._repeat = [];
	this._current = null;
}

/**
 * @see ROT.EventQueue#getTime
 */
ROT.Scheduler.prototype.getTime = function() {
	return this._queue.getTime();
}

/**
 * @param {?} item
 * @param {bool} repeat
 */
ROT.Scheduler.prototype.add = function(item, repeat) {
	if (repeat) { this._repeat.push(item); }
	return this;
}

/**
 * Clear all items
 */
ROT.Scheduler.prototype.clear = function() {
	this._queue.clear();
	this._repeat = [];
	this._current = null;
	return this;
}

/**
 * Remove a previously added item
 * @param {?} item
 * @returns {bool} successful?
 */
ROT.Scheduler.prototype.remove = function(item) {
	var result = this._queue.remove(item);

	var index = this._repeat.indexOf(item);
	if (index != -1) { this._repeat.splice(index, 1); }

	if (this._current == item) { this._current = null; }

	return result;
}

/**
 * Schedule next item
 * @returns {?}
 */
ROT.Scheduler.prototype.next = function() {
	this._current = this._queue.get();
	return this._current;
}
/**
 * @class Simple fair scheduler (round-robin style)
 * @augments ROT.Scheduler
 */
ROT.Scheduler.Simple = function() {
	ROT.Scheduler.call(this);
}
ROT.Scheduler.Simple.extend(ROT.Scheduler);

/**
 * @see ROT.Scheduler#add
 */
ROT.Scheduler.Simple.prototype.add = function(item, repeat) {
	this._queue.add(item, 0);
	return ROT.Scheduler.prototype.add.call(this, item, repeat);
}

/**
 * @see ROT.Scheduler#next
 */
ROT.Scheduler.Simple.prototype.next = function() {
	if (this._current && this._repeat.indexOf(this._current) != -1) {
		this._queue.add(this._current, 0);
	}
	return ROT.Scheduler.prototype.next.call(this);
}
/**
 * @class Speed-based scheduler
 * @augments ROT.Scheduler
 */
ROT.Scheduler.Speed = function() {
	ROT.Scheduler.call(this);
}
ROT.Scheduler.Speed.extend(ROT.Scheduler);

/**
 * @param {object} item anything with "getSpeed" method
 * @param {bool} repeat
 * @see ROT.Scheduler#add
 */
ROT.Scheduler.Speed.prototype.add = function(item, repeat) {
	this._queue.add(item, 1/item.getSpeed());
	return ROT.Scheduler.prototype.add.call(this, item, repeat);
}

/**
 * @see ROT.Scheduler#next
 */
ROT.Scheduler.Speed.prototype.next = function() {
	if (this._current && this._repeat.indexOf(this._current) != -1) {
		this._queue.add(this._current, 1/this._current.getSpeed());
	}
	return ROT.Scheduler.prototype.next.call(this);
}
/**
 * @class Action-based scheduler
 * @augments ROT.Scheduler
 */
ROT.Scheduler.Action = function() {
	ROT.Scheduler.call(this);
	this._defaultDuration = 1; /* for newly added */
	this._duration = this._defaultDuration; /* for this._current */
}
ROT.Scheduler.Action.extend(ROT.Scheduler);

/**
 * @param {object} item
 * @param {bool} repeat
 * @param {number} [time=1]
 * @see ROT.Scheduler#add
 */
ROT.Scheduler.Action.prototype.add = function(item, repeat, time) {
	this._queue.add(item, time || this._defaultDuration);
	return ROT.Scheduler.prototype.add.call(this, item, repeat);
}

ROT.Scheduler.Action.prototype.clear = function() {
	this._duration = this._defaultDuration;
	return ROT.Scheduler.prototype.clear.call(this);
}

ROT.Scheduler.Action.prototype.remove = function(item) {
	if (item == this._current) { this._duration = this._defaultDuration; }
	return ROT.Scheduler.prototype.remove.call(this, item);
}

/**
 * @see ROT.Scheduler#next
 */
ROT.Scheduler.Action.prototype.next = function() {
	if (this._current && this._repeat.indexOf(this._current) != -1) {
		this._queue.add(this._current, this._duration || this._defaultDuration);
		this._duration = this._defaultDuration;
	}
	return ROT.Scheduler.prototype.next.call(this);
}

/**
 * Set duration for the active item
 */
ROT.Scheduler.Action.prototype.setDuration = function(time) {
	if (this._current) { this._duration = time; }
	return this;
}
/**
 * @class Asynchronous main loop
 * @param {ROT.Scheduler} scheduler
 */
ROT.Engine = function(scheduler) {
	this._scheduler = scheduler;
	this._lock = 1;
}

/**
 * Start the main loop. When this call returns, the loop is locked.
 */
ROT.Engine.prototype.start = function() {
	return this.unlock();
}

/**
 * Interrupt the engine by an asynchronous action
 */
ROT.Engine.prototype.lock = function() {
	this._lock++;
	return this;
}

/**
 * Resume execution (paused by a previous lock)
 */
ROT.Engine.prototype.unlock = function() {
	if (!this._lock) { throw new Error("Cannot unlock unlocked engine"); }
	this._lock--;

	while (!this._lock) {
		var actor = this._scheduler.next();
		if (!actor) { return this.lock(); } /* no actors */
		var result = actor.act();
		if (result && result.then) { /* actor returned a "thenable", looks like a Promise */
			this.lock();
			result.then(this.unlock.bind(this));
		}
	}

	return this;
}
/**
 * @class Base map generator
 * @param {int} [width=ROT.DEFAULT_WIDTH]
 * @param {int} [height=ROT.DEFAULT_HEIGHT]
 */
ROT.Map = function(width, height) {
	this._width = width || ROT.DEFAULT_WIDTH;
	this._height = height || ROT.DEFAULT_HEIGHT;
};

ROT.Map.prototype.create = function(callback) {}

ROT.Map.prototype._fillMap = function(value) {
	var map = [];
	for (var i=0;i<this._width;i++) {
		map.push([]);
		for (var j=0;j<this._height;j++) { map[i].push(value); }
	}
	return map;
}
/**
 * @class Simple empty rectangular room
 * @augments ROT.Map
 */
ROT.Map.Arena = function(width, height) {
	ROT.Map.call(this, width, height);
}
ROT.Map.Arena.extend(ROT.Map);

ROT.Map.Arena.prototype.create = function(callback) {
	var w = this._width-1;
	var h = this._height-1;
	for (var i=0;i<=w;i++) {
		for (var j=0;j<=h;j++) {
			var empty = (i && j && i<w && j<h);
			callback(i, j, empty ? 0 : 1);
		}
	}
	return this;
}
/**
 * @class Recursively divided maze, http://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_division_method
 * @augments ROT.Map
 */
ROT.Map.DividedMaze = function(width, height) {
	ROT.Map.call(this, width, height);
	this._stack = [];
}
ROT.Map.DividedMaze.extend(ROT.Map);

ROT.Map.DividedMaze.prototype.create = function(callback) {
	var w = this._width;
	var h = this._height;
	
	this._map = [];
	
	for (var i=0;i<w;i++) {
		this._map.push([]);
		for (var j=0;j<h;j++) {
			var border = (i == 0 || j == 0 || i+1 == w || j+1 == h);
			this._map[i].push(border ? 1 : 0);
		}
	}
	
	this._stack = [
		[1, 1, w-2, h-2]
	];
	this._process();
	
	for (var i=0;i<w;i++) {
		for (var j=0;j<h;j++) {
			callback(i, j, this._map[i][j]);
		}
	}
	this._map = null;
	return this;
}

ROT.Map.DividedMaze.prototype._process = function() {
	while (this._stack.length) {
		var room = this._stack.shift(); /* [left, top, right, bottom] */
		this._partitionRoom(room);
	}
}

ROT.Map.DividedMaze.prototype._partitionRoom = function(room) {
	var availX = [];
	var availY = [];
	
	for (var i=room[0]+1;i<room[2];i++) {
		var top = this._map[i][room[1]-1];
		var bottom = this._map[i][room[3]+1];
		if (top && bottom && !(i % 2)) { availX.push(i); }
	}
	
	for (var j=room[1]+1;j<room[3];j++) {
		var left = this._map[room[0]-1][j];
		var right = this._map[room[2]+1][j];
		if (left && right && !(j % 2)) { availY.push(j); }
	}

	if (!availX.length || !availY.length) { return; }

	var x = availX.random();
	var y = availY.random();
	
	this._map[x][y] = 1;
	
	var walls = [];
	
	var w = []; walls.push(w); /* left part */
	for (var i=room[0]; i<x; i++) { 
		this._map[i][y] = 1;
		w.push([i, y]); 
	}
	
	var w = []; walls.push(w); /* right part */
	for (var i=x+1; i<=room[2]; i++) { 
		this._map[i][y] = 1;
		w.push([i, y]); 
	}

	var w = []; walls.push(w); /* top part */
	for (var j=room[1]; j<y; j++) { 
		this._map[x][j] = 1;
		w.push([x, j]); 
	}
	
	var w = []; walls.push(w); /* bottom part */
	for (var j=y+1; j<=room[3]; j++) { 
		this._map[x][j] = 1;
		w.push([x, j]); 
	}
		
	var solid = walls.random();
	for (var i=0;i<walls.length;i++) {
		var w = walls[i];
		if (w == solid) { continue; }
		
		var hole = w.random();
		this._map[hole[0]][hole[1]] = 0;
	}

	this._stack.push([room[0], room[1], x-1, y-1]); /* left top */
	this._stack.push([x+1, room[1], room[2], y-1]); /* right top */
	this._stack.push([room[0], y+1, x-1, room[3]]); /* left bottom */
	this._stack.push([x+1, y+1, room[2], room[3]]); /* right bottom */
}
/**
 * @class Icey's Maze generator
 * See http://www.roguebasin.roguelikedevelopment.org/index.php?title=Simple_maze for explanation
 * @augments ROT.Map
 */
ROT.Map.IceyMaze = function(width, height, regularity) {
	ROT.Map.call(this, width, height);
	this._regularity = regularity || 0;
}
ROT.Map.IceyMaze.extend(ROT.Map);

ROT.Map.IceyMaze.prototype.create = function(callback) {
	var width = this._width;
	var height = this._height;
	
	var map = this._fillMap(1);
	
	width -= (width % 2 ? 1 : 2);
	height -= (height % 2 ? 1 : 2);

	var cx = 0;
	var cy = 0;
	var nx = 0;
	var ny = 0;

	var done = 0;
	var blocked = false;
	var dirs = [
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0]
	];
	do {
		cx = 1 + 2*Math.floor(ROT.RNG.getUniform()*(width-1) / 2);
		cy = 1 + 2*Math.floor(ROT.RNG.getUniform()*(height-1) / 2);

		if (!done) { map[cx][cy] = 0; }
		
		if (!map[cx][cy]) {
			this._randomize(dirs);
			do {
				if (Math.floor(ROT.RNG.getUniform()*(this._regularity+1)) == 0) { this._randomize(dirs); }
				blocked = true;
				for (var i=0;i<4;i++) {
					nx = cx + dirs[i][0]*2;
					ny = cy + dirs[i][1]*2;
					if (this._isFree(map, nx, ny, width, height)) {
						map[nx][ny] = 0;
						map[cx + dirs[i][0]][cy + dirs[i][1]] = 0;
						
						cx = nx;
						cy = ny;
						blocked = false;
						done++;
						break;
					}
				}
			} while (!blocked);
		}
	} while (done+1 < width*height/4);
	
	for (var i=0;i<this._width;i++) {
		for (var j=0;j<this._height;j++) {
			callback(i, j, map[i][j]);
		}
	}
	this._map = null;
	return this;
}

ROT.Map.IceyMaze.prototype._randomize = function(dirs) {
	for (var i=0;i<4;i++) {
		dirs[i][0] = 0;
		dirs[i][1] = 0;
	}
	
	switch (Math.floor(ROT.RNG.getUniform()*4)) {
		case 0:
			dirs[0][0] = -1; dirs[1][0] = 1;
			dirs[2][1] = -1; dirs[3][1] = 1;
		break;
		case 1:
			dirs[3][0] = -1; dirs[2][0] = 1;
			dirs[1][1] = -1; dirs[0][1] = 1;
		break;
		case 2:
			dirs[2][0] = -1; dirs[3][0] = 1;
			dirs[0][1] = -1; dirs[1][1] = 1;
		break;
		case 3:
			dirs[1][0] = -1; dirs[0][0] = 1;
			dirs[3][1] = -1; dirs[2][1] = 1;
		break;
	}
}

ROT.Map.IceyMaze.prototype._isFree = function(map, x, y, width, height) {
	if (x < 1 || y < 1 || x >= width || y >= height) { return false; }
	return map[x][y];
}
/**
 * @class Maze generator - Eller's algorithm
 * See http://homepages.cwi.nl/~tromp/maze.html for explanation
 * @augments ROT.Map
 */
ROT.Map.EllerMaze = function(width, height) {
	ROT.Map.call(this, width, height);
}
ROT.Map.EllerMaze.extend(ROT.Map);

ROT.Map.EllerMaze.prototype.create = function(callback) {
	var map = this._fillMap(1);
	var w = Math.ceil((this._width-2)/2);
	
	var rand = 9/24;
	
	var L = [];
	var R = [];
	
	for (var i=0;i<w;i++) {
		L.push(i);
		R.push(i);
	}
	L.push(w-1); /* fake stop-block at the right side */

	for (var j=1;j+3<this._height;j+=2) {
		/* one row */
		for (var i=0;i<w;i++) {
			/* cell coords (will be always empty) */
			var x = 2*i+1;
			var y = j;
			map[x][y] = 0;
			
			/* right connection */
			if (i != L[i+1] && ROT.RNG.getUniform() > rand) {
				this._addToList(i, L, R);
				map[x+1][y] = 0;
			}
			
			/* bottom connection */
			if (i != L[i] && ROT.RNG.getUniform() > rand) {
				/* remove connection */
				this._removeFromList(i, L, R);
			} else {
				/* create connection */
				map[x][y+1] = 0;
			}
		}
	}

	/* last row */
	for (var i=0;i<w;i++) {
		/* cell coords (will be always empty) */
		var x = 2*i+1;
		var y = j;
		map[x][y] = 0;
		
		/* right connection */
		if (i != L[i+1] && (i == L[i] || ROT.RNG.getUniform() > rand)) {
			/* dig right also if the cell is separated, so it gets connected to the rest of maze */
			this._addToList(i, L, R);
			map[x+1][y] = 0;
		}
		
		this._removeFromList(i, L, R);
	}
	
	for (var i=0;i<this._width;i++) {
		for (var j=0;j<this._height;j++) {
			callback(i, j, map[i][j]);
		}
	}
	
	return this;
}

/**
 * Remove "i" from its list
 */
ROT.Map.EllerMaze.prototype._removeFromList = function(i, L, R) {
	R[L[i]] = R[i];
	L[R[i]] = L[i];
	R[i] = i;
	L[i] = i;
}

/**
 * Join lists with "i" and "i+1"
 */
ROT.Map.EllerMaze.prototype._addToList = function(i, L, R) {
	R[L[i+1]] = R[i];
	L[R[i]] = L[i+1];
	R[i] = i+1;
	L[i+1] = i;
}
/**
 * @class Cellular automaton map generator
 * @augments ROT.Map
 * @param {int} [width=ROT.DEFAULT_WIDTH]
 * @param {int} [height=ROT.DEFAULT_HEIGHT]
 * @param {object} [options] Options
 * @param {int[]} [options.born] List of neighbor counts for a new cell to be born in empty space
 * @param {int[]} [options.survive] List of neighbor counts for an existing  cell to survive
 * @param {int} [options.topology] Topology 4 or 6 or 8
 */
ROT.Map.Cellular = function(width, height, options) {
	ROT.Map.call(this, width, height);
	this._options = {
		born: [5, 6, 7, 8],
		survive: [4, 5, 6, 7, 8],
		topology: 8,
		connected: false
	};
	this.setOptions(options);
	
	this._dirs = ROT.DIRS[this._options.topology];
	this._map = this._fillMap(0);
}
ROT.Map.Cellular.extend(ROT.Map);

/**
 * Fill the map with random values
 * @param {float} probability Probability for a cell to become alive; 0 = all empty, 1 = all full
 */
ROT.Map.Cellular.prototype.randomize = function(probability) {
	for (var i=0;i<this._width;i++) {
		for (var j=0;j<this._height;j++) {
			this._map[i][j] = (ROT.RNG.getUniform() < probability ? 1 : 0);
		}
	}
	return this;
}

/**
 * Change options.
 * @see ROT.Map.Cellular
 */
ROT.Map.Cellular.prototype.setOptions = function(options) {
	for (var p in options) { this._options[p] = options[p]; }
}

ROT.Map.Cellular.prototype.set = function(x, y, value) {
	this._map[x][y] = value;
}

ROT.Map.Cellular.prototype.create = function(callback) {
	var newMap = this._fillMap(0);
	var born = this._options.born;
	var survive = this._options.survive;


	for (var j=0;j<this._height;j++) {
		var widthStep = 1;
		var widthStart = 0;
		if (this._options.topology == 6) { 
			widthStep = 2;
			widthStart = j%2;
		}

		for (var i=widthStart; i<this._width; i+=widthStep) {

			var cur = this._map[i][j];
			var ncount = this._getNeighbors(i, j);
			
			if (cur && survive.indexOf(ncount) != -1) { /* survive */
				newMap[i][j] = 1;
			} else if (!cur && born.indexOf(ncount) != -1) { /* born */
				newMap[i][j] = 1;
			}			
		}
	}
	
	this._map = newMap;

	// optinially connect every space
	if (this._options.connected) {
		this._completeMaze();	
	}

	if (callback) { 
		for (var i = 0; i < this._width; i++) {
			for (var j = 0; j < this._height; j++) {
				callback(i, j, newMap[i][j]);
			}
		}
	}
}

/**
 * Get neighbor count at [i,j] in this._map
 */
ROT.Map.Cellular.prototype._getNeighbors = function(cx, cy) {
	var result = 0;
	for (var i=0;i<this._dirs.length;i++) {
		var dir = this._dirs[i];
		var x = cx + dir[0];
		var y = cy + dir[1];
		
		if (x < 0 || x >= this._width || x < 0 || y >= this._width) { continue; }
		result += (this._map[x][y] == 1 ? 1 : 0);
	}
	
	return result;
}

/**
 * Make sure every non-wall space is accessible.
 */
ROT.Map.Cellular.prototype._completeMaze = function() {
	var allFreeSpace = [];
	var notConnected = {};
	// find all free space
	for (var x = 0; x < this._width; x++) {
		for (var y = 0; y < this._height; y++) {
			if (this._freeSpace(x, y)) {
				var p = [x, y];
				notConnected[this._pointKey(p)] = p;
				allFreeSpace.push([x, y]);
			}
		}
	}
	var start = allFreeSpace[ROT.RNG.getUniformInt(0, allFreeSpace.length - 1)];

	var key = this._pointKey(start);
	var connected = {};
	connected[key] = start;
	delete notConnected[key]

	// find what's connected to the starting point
	this._findConnected(connected, notConnected, [start]);

	while(Object.keys(notConnected).length > 0) {

		// find two points from notConnected to connected
		var p = this._getFromTo(connected, notConnected);
		var from = p[0]; // notConnected
		var to = p[1]; // connected

		// find everything connected to the starting point
		var local = {};
		local[this._pointKey(from)] = from;
		this._findConnected(local, notConnected, [from], true);

		// connect to a connected square
		this._tunnelToConnected(to, from, connected, notConnected);

		// now all of local is connected
		for (var k in local) {
			var pp = local[k];
			this._map[pp[0]][pp[1]] = 0;
			connected[k] = pp;
			delete notConnected[k];
		}
	}
}

/**
 * Find random points to connect. Search for the closest point in the larger space. 
 * This is to minimize the length of the passage while maintaining good performance.
 */
ROT.Map.Cellular.prototype._getFromTo = function(connected, notConnected) {
	var from, to, d;
	var connectedKeys = Object.keys(connected);
	var notConnectedKeys = Object.keys(notConnected);
	for (var i = 0; i < 5; i++) {
		if (connectedKeys.length < notConnectedKeys.length) {
			var keys = connectedKeys;
			to = connected[keys[ROT.RNG.getUniformInt(0, keys.length - 1)]]
			from = this._getClosest(to, notConnected);
		} else {
			var keys = notConnectedKeys;
			from = notConnected[keys[ROT.RNG.getUniformInt(0, keys.length - 1)]]
			to = this._getClosest(from, connected);
		}
		d = (from[0] - to[0]) * (from[0] - to[0]) + (from[1] - to[1]) * (from[1] - to[1]);
		if (d < 64) {
			break;
		}
	}
	// console.log(">>> connected=" + to + " notConnected=" + from + " dist=" + d);
	return [from, to];
}

ROT.Map.Cellular.prototype._getClosest = function(point, space) {
	var minPoint = null;
	var minDist = null;
	for (k in space) {
		var p = space[k];
		var d = (p[0] - point[0]) * (p[0] - point[0]) + (p[1] - point[1]) * (p[1] - point[1]);
		if (minDist == null || d < minDist) {
			minDist = d;
			minPoint = p;
		}
	}
	return minPoint;
}

ROT.Map.Cellular.prototype._findConnected = function(connected, notConnected, stack, keepNotConnected) {
	while(stack.length > 0) {
		var p = stack.splice(0, 1)[0];
		var tests = [
			[p[0] + 1, p[1]],
			[p[0] - 1, p[1]],
			[p[0],     p[1] + 1],
			[p[0],     p[1] - 1]
		];
		for (var i = 0; i < tests.length; i++) {
			var key = this._pointKey(tests[i]);
			if (connected[key] == null && this._freeSpace(tests[i][0], tests[i][1])) {
				connected[key] = tests[i];
				if (!keepNotConnected) {
					delete notConnected[key];
				}
				stack.push(tests[i]);
			}
		}
	}
}

ROT.Map.Cellular.prototype._tunnelToConnected = function(to, from, connected, notConnected) {
	var key = this._pointKey(from);
	var a, b;
	if (from[0] < to[0]) {
		a = from;
		b = to;
	} else {
		a = to;
		b = from;
	}
	for (var xx = a[0]; xx <= b[0]; xx++) {
		this._map[xx][a[1]] = 0;
		var p = [xx, a[1]];
		var pkey = this._pointKey(p);
		connected[pkey] = p;
		delete notConnected[pkey];
	}

	// x is now fixed
	var x = b[0];

	if (from[1] < to[1]) {
		a = from;
		b = to;
	} else {
		a = to;
		b = from;
	}
	for (var yy = a[1]; yy < b[1]; yy++) {
		this._map[x][yy] = 0;
		var p = [x, yy];
		var pkey = this._pointKey(p);
		connected[pkey] = p;
		delete notConnected[pkey];
	}
}

ROT.Map.Cellular.prototype._freeSpace = function(x, y) {
	return x >= 0 && x < this._width && y >= 0 && y < this._height && this._map[x][y] != 1;
}

ROT.Map.Cellular.prototype._pointKey = function(p) {
	return p[0] + "." + p[1];
}

/**
 * @class Dungeon map: has rooms and corridors
 * @augments ROT.Map
 */
ROT.Map.Dungeon = function(width, height) {
	ROT.Map.call(this, width, height);
	this._rooms = []; /* list of all rooms */
	this._corridors = [];
}
ROT.Map.Dungeon.extend(ROT.Map);

/**
 * Get all generated rooms
 * @returns {ROT.Map.Feature.Room[]}
 */
ROT.Map.Dungeon.prototype.getRooms = function() {
	return this._rooms;
}

/**
 * Get all generated corridors
 * @returns {ROT.Map.Feature.Corridor[]}
 */
ROT.Map.Dungeon.prototype.getCorridors = function() {
	return this._corridors;
}
/**
 * @class Random dungeon generator using human-like digging patterns.
 * Heavily based on Mike Anderson's ideas from the "Tyrant" algo, mentioned at 
 * http://www.roguebasin.roguelikedevelopment.org/index.php?title=Dungeon-Building_Algorithm.
 * @augments ROT.Map.Dungeon
 */
ROT.Map.Digger = function(width, height, options) {
	ROT.Map.Dungeon.call(this, width, height);
	
	this._options = {
		roomWidth: [3, 9], /* room minimum and maximum width */
		roomHeight: [3, 5], /* room minimum and maximum height */
		corridorLength: [3, 10], /* corridor minimum and maximum length */
		dugPercentage: 0.2, /* we stop after this percentage of level area has been dug out */
		timeLimit: 1000 /* we stop after this much time has passed (msec) */
	}
	for (var p in options) { this._options[p] = options[p]; }
	
	this._features = {
		"Room": 4,
		"Corridor": 4
	}
	this._featureAttempts = 20; /* how many times do we try to create a feature on a suitable wall */
	this._walls = {}; /* these are available for digging */
	
	this._digCallback = this._digCallback.bind(this);
	this._canBeDugCallback = this._canBeDugCallback.bind(this);
	this._isWallCallback = this._isWallCallback.bind(this);
	this._priorityWallCallback = this._priorityWallCallback.bind(this);
}
ROT.Map.Digger.extend(ROT.Map.Dungeon);

/**
 * Create a map
 * @see ROT.Map#create
 */
ROT.Map.Digger.prototype.create = function(callback) {
	this._rooms = [];
	this._corridors = [];
	this._map = this._fillMap(1);
	this._walls = {};
	this._dug = 0;
	var area = (this._width-2) * (this._height-2);

	this._firstRoom();
	
	var t1 = Date.now();

	do {
		var t2 = Date.now();
		if (t2 - t1 > this._options.timeLimit) { break; }

		/* find a good wall */
		var wall = this._findWall();
		if (!wall) { break; } /* no more walls */
		
		var parts = wall.split(",");
		var x = parseInt(parts[0]);
		var y = parseInt(parts[1]);
		var dir = this._getDiggingDirection(x, y);
		if (!dir) { continue; } /* this wall is not suitable */
		
//		console.log("wall", x, y);

		/* try adding a feature */
		var featureAttempts = 0;
		do {
			featureAttempts++;
			if (this._tryFeature(x, y, dir[0], dir[1])) { /* feature added */
				//if (this._rooms.length + this._corridors.length == 2) { this._rooms[0].addDoor(x, y); } /* first room oficially has doors */
				this._removeSurroundingWalls(x, y);
				this._removeSurroundingWalls(x-dir[0], y-dir[1]);
				break; 
			}
		} while (featureAttempts < this._featureAttempts);
		
		var priorityWalls = 0;
		for (var id in this._walls) { 
			if (this._walls[id] > 1) { priorityWalls++; }
		}

	} while (this._dug/area < this._options.dugPercentage || priorityWalls); /* fixme number of priority walls */

	this._addDoors();

	if (callback) {
		for (var i=0;i<this._width;i++) {
			for (var j=0;j<this._height;j++) {
				callback(i, j, this._map[i][j]);
			}
		}
	}
	
	this._walls = {};
	this._map = null;

	return this;
}

ROT.Map.Digger.prototype._digCallback = function(x, y, value) {
	if (value == 0 || value == 2) { /* empty */
		this._map[x][y] = 0;
		this._dug++;
	} else { /* wall */
		this._walls[x+","+y] = 1;
	}
}

ROT.Map.Digger.prototype._isWallCallback = function(x, y) {
	if (x < 0 || y < 0 || x >= this._width || y >= this._height) { return false; }
	return (this._map[x][y] == 1);
}

ROT.Map.Digger.prototype._canBeDugCallback = function(x, y) {
	if (x < 1 || y < 1 || x+1 >= this._width || y+1 >= this._height) { return false; }
	return (this._map[x][y] == 1);
}

ROT.Map.Digger.prototype._priorityWallCallback = function(x, y) {
	this._walls[x+","+y] = 2;
}

ROT.Map.Digger.prototype._firstRoom = function() {
	var cx = Math.floor(this._width/2);
	var cy = Math.floor(this._height/2);
	var room = ROT.Map.Feature.Room.createRandomCenter(cx, cy, this._options);
	this._rooms.push(room);
	room.create(this._digCallback);
}

/**
 * Get a suitable wall
 */
ROT.Map.Digger.prototype._findWall = function() {
	var prio1 = [];
	var prio2 = [];
	for (var id in this._walls) {
		var prio = this._walls[id];
		if (prio == 2) { 
			prio2.push(id); 
		} else {
			prio1.push(id);
		}
	}
	
	var arr = (prio2.length ? prio2 : prio1);
	if (!arr.length) { return null; } /* no walls :/ */
	
	var id = arr.random();
	delete this._walls[id];

	return id;
}

/**
 * Tries adding a feature
 * @returns {bool} was this a successful try?
 */
ROT.Map.Digger.prototype._tryFeature = function(x, y, dx, dy) {
	var feature = ROT.RNG.getWeightedValue(this._features);
	feature = ROT.Map.Feature[feature].createRandomAt(x, y, dx, dy, this._options);
	
	if (!feature.isValid(this._isWallCallback, this._canBeDugCallback)) {
//		console.log("not valid");
//		feature.debug();
		return false;
	}
	
	feature.create(this._digCallback);
//	feature.debug();

	if (feature instanceof ROT.Map.Feature.Room) { this._rooms.push(feature); }
	if (feature instanceof ROT.Map.Feature.Corridor) { 
		feature.createPriorityWalls(this._priorityWallCallback);
		this._corridors.push(feature); 
	}
	
	return true;
}

ROT.Map.Digger.prototype._removeSurroundingWalls = function(cx, cy) {
	var deltas = ROT.DIRS[4];

	for (var i=0;i<deltas.length;i++) {
		var delta = deltas[i];
		var x = cx + delta[0];
		var y = cy + delta[1];
		delete this._walls[x+","+y];
		var x = cx + 2*delta[0];
		var y = cy + 2*delta[1];
		delete this._walls[x+","+y];
	}
}

/**
 * Returns vector in "digging" direction, or false, if this does not exist (or is not unique)
 */
ROT.Map.Digger.prototype._getDiggingDirection = function(cx, cy) {
	var result = null;
	var deltas = ROT.DIRS[4];
	
	for (var i=0;i<deltas.length;i++) {
		var delta = deltas[i];
		var x = cx + delta[0];
		var y = cy + delta[1];
		
		if (x < 0 || y < 0 || x >= this._width || y >= this._width) { return null; }
		
		if (!this._map[x][y]) { /* there already is another empty neighbor! */
			if (result) { return null; }
			result = delta;
		}
	}
	
	/* no empty neighbor */
	if (!result) { return null; }
	
	return [-result[0], -result[1]];
}

/**
 * Find empty spaces surrounding rooms, and apply doors.
 */
ROT.Map.Digger.prototype._addDoors = function() {
	var data = this._map;
	var isWallCallback = function(x, y) {
		return (data[x][y] == 1);
	}
	for (var i = 0; i < this._rooms.length; i++ ) {
		var room = this._rooms[i];
		room.clearDoors();
		room.addDoors(isWallCallback);
	}
}
/**
 * @class Dungeon generator which tries to fill the space evenly. Generates independent rooms and tries to connect them.
 * @augments ROT.Map.Dungeon
 */
ROT.Map.Uniform = function(width, height, options) {
	ROT.Map.Dungeon.call(this, width, height);

	this._options = {
		roomWidth: [3, 9], /* room minimum and maximum width */
		roomHeight: [3, 5], /* room minimum and maximum height */
		roomDugPercentage: 0.1, /* we stop after this percentage of level area has been dug out by rooms */
		timeLimit: 1000 /* we stop after this much time has passed (msec) */
	}
	for (var p in options) { this._options[p] = options[p]; }

	this._roomAttempts = 20; /* new room is created N-times until is considered as impossible to generate */
	this._corridorAttempts = 20; /* corridors are tried N-times until the level is considered as impossible to connect */

	this._connected = []; /* list of already connected rooms */
	this._unconnected = []; /* list of remaining unconnected rooms */
	
	this._digCallback = this._digCallback.bind(this);
	this._canBeDugCallback = this._canBeDugCallback.bind(this);
	this._isWallCallback = this._isWallCallback.bind(this);
}
ROT.Map.Uniform.extend(ROT.Map.Dungeon);

/**
 * Create a map. If the time limit has been hit, returns null.
 * @see ROT.Map#create
 */
ROT.Map.Uniform.prototype.create = function(callback) {
	var t1 = Date.now();
	while (1) {
		var t2 = Date.now();
		if (t2 - t1 > this._options.timeLimit) { return null; } /* time limit! */
	
		this._map = this._fillMap(1);
		this._dug = 0;
		this._rooms = [];
		this._unconnected = [];
		this._generateRooms();
		if (this._rooms.length < 2) { continue; }
		if (this._generateCorridors()) { break; }
	}
	
	if (callback) {
		for (var i=0;i<this._width;i++) {
			for (var j=0;j<this._height;j++) {
				callback(i, j, this._map[i][j]);
			}
		}
	}
	
	return this;
}

/**
 * Generates a suitable amount of rooms
 */
ROT.Map.Uniform.prototype._generateRooms = function() {
	var w = this._width-2;
	var h = this._height-2;

	do {
		var room = this._generateRoom();
		if (this._dug/(w*h) > this._options.roomDugPercentage) { break; } /* achieved requested amount of free space */
	} while (room);

	/* either enough rooms, or not able to generate more of them :) */
}

/**
 * Try to generate one room
 */
ROT.Map.Uniform.prototype._generateRoom = function() {
	var count = 0;
	while (count < this._roomAttempts) {
		count++;
		
		var room = ROT.Map.Feature.Room.createRandom(this._width, this._height, this._options);
		if (!room.isValid(this._isWallCallback, this._canBeDugCallback)) { continue; }
		
		room.create(this._digCallback);
		this._rooms.push(room);
		return room;
	} 

	/* no room was generated in a given number of attempts */
	return null;
}

/**
 * Generates connectors beween rooms
 * @returns {bool} success Was this attempt successfull?
 */
ROT.Map.Uniform.prototype._generateCorridors = function() {
	var cnt = 0;
	while (cnt < this._corridorAttempts) {
		cnt++;
		this._corridors = [];

		/* dig rooms into a clear map */
		this._map = this._fillMap(1);
		for (var i=0;i<this._rooms.length;i++) { 
			var room = this._rooms[i];
			room.clearDoors();
			room.create(this._digCallback); 
		}

		this._unconnected = this._rooms.slice().randomize();
		this._connected = [];
		if (this._unconnected.length) { this._connected.push(this._unconnected.pop()); } /* first one is always connected */
		
		while (1) {
			/* 1. pick random connected room */
			var connected = this._connected.random();
			
			/* 2. find closest unconnected */
			var room1 = this._closestRoom(this._unconnected, connected);
			
			/* 3. connect it to closest connected */
			var room2 = this._closestRoom(this._connected, room1);
			
			var ok = this._connectRooms(room1, room2);
			if (!ok) { break; } /* stop connecting, re-shuffle */
			
			if (!this._unconnected.length) { return true; } /* done; no rooms remain */
		}
	}
	return false;
}

/**
 * For a given room, find the closest one from the list
 */
ROT.Map.Uniform.prototype._closestRoom = function(rooms, room) {
	var dist = Infinity;
	var center = room.getCenter();
	var result = null;
	
	for (var i=0;i<rooms.length;i++) {
		var r = rooms[i];
		var c = r.getCenter();
		var dx = c[0]-center[0];
		var dy = c[1]-center[1];
		var d = dx*dx+dy*dy;
		
		if (d < dist) {
			dist = d;
			result = r;
		}
	}
	
	return result;
}

ROT.Map.Uniform.prototype._connectRooms = function(room1, room2) {
	/*
		room1.debug();
		room2.debug();
	*/

	var center1 = room1.getCenter();
	var center2 = room2.getCenter();

	var diffX = center2[0] - center1[0];
	var diffY = center2[1] - center1[1];

	if (Math.abs(diffX) < Math.abs(diffY)) { /* first try connecting north-south walls */
		var dirIndex1 = (diffY > 0 ? 2 : 0);
		var dirIndex2 = (dirIndex1 + 2) % 4;
		var min = room2.getLeft();
		var max = room2.getRight();
		var index = 0;
	} else { /* first try connecting east-west walls */
		var dirIndex1 = (diffX > 0 ? 1 : 3);
		var dirIndex2 = (dirIndex1 + 2) % 4;
		var min = room2.getTop();
		var max = room2.getBottom();
		var index = 1;
	}

	var start = this._placeInWall(room1, dirIndex1); /* corridor will start here */
	if (!start) { return false; }

	if (start[index] >= min && start[index] <= max) { /* possible to connect with straight line (I-like) */
		var end = start.slice();
		var value = null;
		switch (dirIndex2) {
			case 0: value = room2.getTop()-1; break;
			case 1: value = room2.getRight()+1; break;
			case 2: value = room2.getBottom()+1; break;
			case 3: value = room2.getLeft()-1; break;
		}
		end[(index+1)%2] = value;
		this._digLine([start, end]);
		
	} else if (start[index] < min-1 || start[index] > max+1) { /* need to switch target wall (L-like) */

		var diff = start[index] - center2[index];
		switch (dirIndex2) {
			case 0:
			case 1:	var rotation = (diff < 0 ? 3 : 1); break;
			case 2:
			case 3:	var rotation = (diff < 0 ? 1 : 3); break;
		}
		dirIndex2 = (dirIndex2 + rotation) % 4;
		
		var end = this._placeInWall(room2, dirIndex2);
		if (!end) { return false; }

		var mid = [0, 0];
		mid[index] = start[index];
		var index2 = (index+1)%2;
		mid[index2] = end[index2];
		this._digLine([start, mid, end]);
		
	} else { /* use current wall pair, but adjust the line in the middle (S-like) */
	
		var index2 = (index+1)%2;
		var end = this._placeInWall(room2, dirIndex2);
		if (!end) { return; }
		var mid = Math.round((end[index2] + start[index2])/2);

		var mid1 = [0, 0];
		var mid2 = [0, 0];
		mid1[index] = start[index];
		mid1[index2] = mid;
		mid2[index] = end[index];
		mid2[index2] = mid;
		this._digLine([start, mid1, mid2, end]);
	}

	room1.addDoor(start[0], start[1]);
	room2.addDoor(end[0], end[1]);
	
	var index = this._unconnected.indexOf(room1);
	if (index != -1) {
		this._unconnected.splice(index, 1);
		this._connected.push(room1);
	}

	var index = this._unconnected.indexOf(room2);
	if (index != -1) {
		this._unconnected.splice(index, 1);
		this._connected.push(room2);
	}
	
	return true;
}

ROT.Map.Uniform.prototype._placeInWall = function(room, dirIndex) {
	var start = [0, 0];
	var dir = [0, 0];
	var length = 0;
	
	switch (dirIndex) {
		case 0:
			dir = [1, 0];
			start = [room.getLeft(), room.getTop()-1];
			length = room.getRight()-room.getLeft()+1;
		break;
		case 1:
			dir = [0, 1];
			start = [room.getRight()+1, room.getTop()];
			length = room.getBottom()-room.getTop()+1;
		break;
		case 2:
			dir = [1, 0];
			start = [room.getLeft(), room.getBottom()+1];
			length = room.getRight()-room.getLeft()+1;
		break;
		case 3:
			dir = [0, 1];
			start = [room.getLeft()-1, room.getTop()];
			length = room.getBottom()-room.getTop()+1;
		break;
	}
	
	var avail = [];
	var lastBadIndex = -2;

	for (var i=0;i<length;i++) {
		var x = start[0] + i*dir[0];
		var y = start[1] + i*dir[1];
		avail.push(null);
		
		var isWall = (this._map[x][y] == 1);
		if (isWall) {
			if (lastBadIndex != i-1) { avail[i] = [x, y]; }
		} else {
			lastBadIndex = i;
			if (i) { avail[i-1] = null; }
		}
	}
	
	for (var i=avail.length-1; i>=0; i--) {
		if (!avail[i]) { avail.splice(i, 1); }
	}
	return (avail.length ? avail.random() : null);
}

/**
 * Dig a polyline.
 */
ROT.Map.Uniform.prototype._digLine = function(points) {
	for (var i=1;i<points.length;i++) {
		var start = points[i-1];
		var end = points[i];
		var corridor = new ROT.Map.Feature.Corridor(start[0], start[1], end[0], end[1]);
		corridor.create(this._digCallback);
		this._corridors.push(corridor);
	}
}

ROT.Map.Uniform.prototype._digCallback = function(x, y, value) {
	this._map[x][y] = value;
	if (value == 0) { this._dug++; }
}

ROT.Map.Uniform.prototype._isWallCallback = function(x, y) {
	if (x < 0 || y < 0 || x >= this._width || y >= this._height) { return false; }
	return (this._map[x][y] == 1);
}

ROT.Map.Uniform.prototype._canBeDugCallback = function(x, y) {
	if (x < 1 || y < 1 || x+1 >= this._width || y+1 >= this._height) { return false; }
	return (this._map[x][y] == 1);
}

/**
 * @author hyakugei
 * @class Dungeon generator which uses the "orginal" Rogue dungeon generation algorithm. See http://kuoi.com/~kamikaze/GameDesign/art07_rogue_dungeon.php
 * @augments ROT.Map
 * @param {int} [width=ROT.DEFAULT_WIDTH]
 * @param {int} [height=ROT.DEFAULT_HEIGHT]
 * @param {object} [options] Options
 * @param {int[]} [options.cellWidth=3] Number of cells to create on the horizontal (number of rooms horizontally)
 * @param {int[]} [options.cellHeight=3] Number of cells to create on the vertical (number of rooms vertically) 
 * @param {int} [options.roomWidth] Room min and max width - normally set auto-magically via the constructor.
 * @param {int} [options.roomHeight] Room min and max height - normally set auto-magically via the constructor. 
 */
ROT.Map.Rogue = function(width, height, options) {
	ROT.Map.call(this, width, height);
	
	this._options = {
		cellWidth: 3,  // NOTE to self, these could probably work the same as the roomWidth/room Height values
		cellHeight: 3  //     ie. as an array with min-max values for each direction....
	}
	
	for (var p in options) { this._options[p] = options[p]; }
	
	/*
	Set the room sizes according to the over-all width of the map, 
	and the cell sizes. 
	*/
	
	if (!this._options.hasOwnProperty("roomWidth")) {
		this._options["roomWidth"] = this._calculateRoomSize(this._width, this._options["cellWidth"]);
	}
	if (!this._options.hasOwnProperty["roomHeight"]) {
		this._options["roomHeight"] = this._calculateRoomSize(this._height, this._options["cellHeight"]);
	}
	
}

ROT.Map.Rogue.extend(ROT.Map); 

/**
 * @see ROT.Map#create
 */
ROT.Map.Rogue.prototype.create = function(callback) {
	this.map = this._fillMap(1);
	this.rooms = [];
	this.connectedCells = [];
	
	this._initRooms();
	this._connectRooms();
	this._connectUnconnectedRooms();
	this._createRandomRoomConnections();
	this._createRooms();
	this._createCorridors();
	
	if (callback) {
		for (var i = 0; i < this._width; i++) {
			for (var j = 0; j < this._height; j++) {
				callback(i, j, this.map[i][j]);   
			}
		}
	}
	
	return this;
}

ROT.Map.Rogue.prototype._getRandomInt = function(min, max) {
	return Math.floor(ROT.RNG.getUniform() * (max - min + 1)) + min;
}

ROT.Map.Rogue.prototype._calculateRoomSize = function(size, cell) {
	var max = Math.floor((size/cell) * 0.8);
	var min = Math.floor((size/cell) * 0.25);
	if (min < 2) min = 2;
	if (max < 2) max = 2;
	return [min, max];
}

ROT.Map.Rogue.prototype._initRooms = function () { 
	// create rooms array. This is the "grid" list from the algo.  
	for (var i = 0; i < this._options.cellWidth; i++) {  
		this.rooms.push([]);
		for(var j = 0; j < this._options.cellHeight; j++) {
			this.rooms[i].push({"x":0, "y":0, "width":0, "height":0, "connections":[], "cellx":i, "celly":j});
		}
	}
}

ROT.Map.Rogue.prototype._connectRooms = function() {
	//pick random starting grid
	var cgx = this._getRandomInt(0, this._options.cellWidth-1);
	var cgy = this._getRandomInt(0, this._options.cellHeight-1);
	
	var idx;
	var ncgx;
	var ncgy;
	
	var found = false;
	var room;
	var otherRoom;
	
	// find  unconnected neighbour cells
	do {
	
		//var dirToCheck = [0,1,2,3,4,5,6,7];
		var dirToCheck = [0,2,4,6];
		dirToCheck = dirToCheck.randomize();
		
		do {
			found = false;
			idx = dirToCheck.pop();
			
			
			ncgx = cgx + ROT.DIRS[8][idx][0];
			ncgy = cgy + ROT.DIRS[8][idx][1];
			
			if(ncgx < 0 || ncgx >= this._options.cellWidth) continue;
			if(ncgy < 0 || ncgy >= this._options.cellHeight) continue;
			
			room = this.rooms[cgx][cgy];
			
			if(room["connections"].length > 0)
			{
				// as long as this room doesn't already coonect to me, we are ok with it. 
				if(room["connections"][0][0] == ncgx &&
				room["connections"][0][1] == ncgy)
				{
					break;
				}
			}
			
			otherRoom = this.rooms[ncgx][ncgy];
			
			if (otherRoom["connections"].length == 0) { 
				otherRoom["connections"].push([cgx,cgy]);
				
				this.connectedCells.push([ncgx, ncgy]);
				cgx = ncgx;
				cgy = ncgy;
				found = true;
			}
					
		} while (dirToCheck.length > 0 && found == false)
		
	} while (dirToCheck.length > 0)

}

ROT.Map.Rogue.prototype._connectUnconnectedRooms = function() {
	//While there are unconnected rooms, try to connect them to a random connected neighbor 
	//(if a room has no connected neighbors yet, just keep cycling, you'll fill out to it eventually).
	var cw = this._options.cellWidth;
	var ch = this._options.cellHeight;
	
	var randomConnectedCell;
	this.connectedCells = this.connectedCells.randomize();
	var room;
	var otherRoom;
	var validRoom;
	
	for (var i = 0; i < this._options.cellWidth; i++) {
		for (var j = 0; j < this._options.cellHeight; j++)  {
				
			room = this.rooms[i][j];
			
			if (room["connections"].length == 0) {
				var directions = [0,2,4,6];
				directions = directions.randomize();
				
				var validRoom = false;
				
				do {
					
					var dirIdx = directions.pop();
					var newI = i + ROT.DIRS[8][dirIdx][0];
					var newJ = j + ROT.DIRS[8][dirIdx][1];
					
					if (newI < 0 || newI >= cw || 
					newJ < 0 || newJ >= ch) {
						continue;
					}
					
					otherRoom = this.rooms[newI][newJ];
					
					validRoom = true;
					
					if (otherRoom["connections"].length == 0) {
						break;
					}
					
					for (var k = 0; k < otherRoom["connections"].length; k++) {
						if(otherRoom["connections"][k][0] == i && 
						otherRoom["connections"][k][1] == j) {
							validRoom = false;
							break;
						}
					}
					
					if (validRoom) break;
					
				} while (directions.length)
				
				if(validRoom) { 
					room["connections"].push( [otherRoom["cellx"], otherRoom["celly"]] );  
				} else {
					console.log("-- Unable to connect room.");
				}
			}
		}
	}
}

ROT.Map.Rogue.prototype._createRandomRoomConnections = function(connections) {
	// Empty for now. 
}


ROT.Map.Rogue.prototype._createRooms = function() {
	// Create Rooms 
	
	var w = this._width;
	var h = this._height;
	
	var cw = this._options.cellWidth;
	var ch = this._options.cellHeight;
	
	var cwp = Math.floor(this._width / cw);
	var chp = Math.floor(this._height / ch);
	
	var roomw;
	var roomh;
	var roomWidth = this._options["roomWidth"];
	var roomHeight = this._options["roomHeight"];
	var sx;
	var sy;
	var tx;
	var ty;
	var otherRoom;
	
	for (var i = 0; i < cw; i++) {
		for (var j = 0; j < ch; j++) {
			sx = cwp * i;
			sy = chp * j;
			
			if (sx == 0) sx = 1;
			if (sy == 0) sy = 1;
			
			roomw = this._getRandomInt(roomWidth[0], roomWidth[1]);
			roomh = this._getRandomInt(roomHeight[0], roomHeight[1]);
			
			if (j > 0) {
				otherRoom = this.rooms[i][j-1];
				while (sy - (otherRoom["y"] + otherRoom["height"] ) < 3) {
					sy++;
				}
			}
			
			if (i > 0) {
				otherRoom = this.rooms[i-1][j];
				while(sx - (otherRoom["x"] + otherRoom["width"]) < 3) {
					sx++;
				}
			}
						
			var sxOffset = Math.round(this._getRandomInt(0, cwp-roomw)/2);
			var syOffset = Math.round(this._getRandomInt(0, chp-roomh)/2);
			
			while (sx + sxOffset + roomw >= w) {
				if(sxOffset) {
					sxOffset--;
				} else {
					roomw--; 
				}
			}
			
			while (sy + syOffset + roomh >= h) { 
				if(syOffset) {
					syOffset--;
				} else {
					roomh--; 
				}
			}
			
			sx = sx + sxOffset;
			sy = sy + syOffset;
			
			this.rooms[i][j]["x"] = sx;
			this.rooms[i][j]["y"] = sy;
			this.rooms[i][j]["width"] = roomw;
			this.rooms[i][j]["height"] = roomh;  
			
			for (var ii = sx; ii < sx + roomw; ii++) {
				for (var jj = sy; jj < sy + roomh; jj++) {
					this.map[ii][jj] = 0;
				}
			}  
		}
	}
}

ROT.Map.Rogue.prototype._getWallPosition = function(aRoom, aDirection) {
	var rx;
	var ry;
	var door;
	
	if (aDirection == 1 || aDirection == 3) {
		rx = this._getRandomInt(aRoom["x"] + 1, aRoom["x"] + aRoom["width"] - 2);
		if (aDirection == 1) {
			ry = aRoom["y"] - 2;
			door = ry + 1;
		} else {
			ry = aRoom["y"] + aRoom["height"] + 1;
			door = ry -1;
		}
		
		this.map[rx][door] = 0; // i'm not setting a specific 'door' tile value right now, just empty space. 
		
	} else if (aDirection == 2 || aDirection == 4) {
		ry = this._getRandomInt(aRoom["y"] + 1, aRoom["y"] + aRoom["height"] - 2);
		if(aDirection == 2) {
			rx = aRoom["x"] + aRoom["width"] + 1;
			door = rx - 1;
		} else {
			rx = aRoom["x"] - 2;
			door = rx + 1;
		}
		
		this.map[door][ry] = 0; // i'm not setting a specific 'door' tile value right now, just empty space. 
		
	}
	return [rx, ry];
}

/***
* @param startPosition a 2 element array
* @param endPosition a 2 element array
*/
ROT.Map.Rogue.prototype._drawCorridore = function (startPosition, endPosition) {
	var xOffset = endPosition[0] - startPosition[0];
	var yOffset = endPosition[1] - startPosition[1];
	
	var xpos = startPosition[0];
	var ypos = startPosition[1];
	
	var tempDist;
	var xDir;
	var yDir;
	
	var move; // 2 element array, element 0 is the direction, element 1 is the total value to move. 
	var moves = []; // a list of 2 element arrays
	
	var xAbs = Math.abs(xOffset);
	var yAbs = Math.abs(yOffset);
	
	var percent = ROT.RNG.getUniform(); // used to split the move at different places along the long axis
	var firstHalf = percent;
	var secondHalf = 1 - percent;
	
	xDir = xOffset > 0 ? 2 : 6;
	yDir = yOffset > 0 ? 4 : 0;
	
	if (xAbs < yAbs) {
		// move firstHalf of the y offset
		tempDist = Math.ceil(yAbs * firstHalf);
		moves.push([yDir, tempDist]);
		// move all the x offset
		moves.push([xDir, xAbs]);
		// move sendHalf of the  y offset
		tempDist = Math.floor(yAbs * secondHalf);
		moves.push([yDir, tempDist]);
	} else {
		//  move firstHalf of the x offset
		tempDist = Math.ceil(xAbs * firstHalf);
		moves.push([xDir, tempDist]);
		// move all the y offset
		moves.push([yDir, yAbs]);
		// move secondHalf of the x offset.
		tempDist = Math.floor(xAbs * secondHalf);
		moves.push([xDir, tempDist]);  
	}
	
	this.map[xpos][ypos] = 0;
	
	while (moves.length > 0) {
		move = moves.pop();
		while (move[1] > 0) {
			xpos += ROT.DIRS[8][move[0]][0];
			ypos += ROT.DIRS[8][move[0]][1];
			this.map[xpos][ypos] = 0;
			move[1] = move[1] - 1;
		}
	}
}

ROT.Map.Rogue.prototype._createCorridors = function () {
	// Draw Corridors between connected rooms
	
	var cw = this._options.cellWidth;
	var ch = this._options.cellHeight;
	var room;
	var connection;
	var otherRoom;
	var wall;
	var otherWall;
	
	for (var i = 0; i < cw; i++) {
		for (var j = 0; j < ch; j++) {
			room = this.rooms[i][j];
			
			for (var k = 0; k < room["connections"].length; k++) {
					
				connection = room["connections"][k]; 
				
				otherRoom = this.rooms[connection[0]][connection[1]];
				
				// figure out what wall our corridor will start one.
				// figure out what wall our corridor will end on. 
				if (otherRoom["cellx"] > room["cellx"] ) {
					wall = 2;
					otherWall = 4;
				} else if (otherRoom["cellx"] < room["cellx"] ) {
					wall = 4;
					otherWall = 2;
				} else if(otherRoom["celly"] > room["celly"]) {
					wall = 3;
					otherWall = 1;
				} else if(otherRoom["celly"] < room["celly"]) {
					wall = 1;
					otherWall = 3;
				}
				
				this._drawCorridore(this._getWallPosition(room, wall), this._getWallPosition(otherRoom, otherWall));
			}
		}
	}
}
/**
 * @class Dungeon feature; has own .create() method
 */
ROT.Map.Feature = function() {}
ROT.Map.Feature.prototype.isValid = function(canBeDugCallback) {}
ROT.Map.Feature.prototype.create = function(digCallback) {}
ROT.Map.Feature.prototype.debug = function() {}
ROT.Map.Feature.createRandomAt = function(x, y, dx, dy, options) {}

/**
 * @class Room
 * @augments ROT.Map.Feature
 * @param {int} x1
 * @param {int} y1
 * @param {int} x2
 * @param {int} y2
 * @param {int} [doorX]
 * @param {int} [doorY]
 */
ROT.Map.Feature.Room = function(x1, y1, x2, y2, doorX, doorY) {
	this._x1 = x1;
	this._y1 = y1;
	this._x2 = x2;
	this._y2 = y2;
	this._doors = {};
	if (arguments.length > 4) { this.addDoor(doorX, doorY); }
}
ROT.Map.Feature.Room.extend(ROT.Map.Feature);

/**
 * Room of random size, with a given doors and direction
 */
ROT.Map.Feature.Room.createRandomAt = function(x, y, dx, dy, options) {
	var min = options.roomWidth[0];
	var max = options.roomWidth[1];
	var width = min + Math.floor(ROT.RNG.getUniform()*(max-min+1));
	
	var min = options.roomHeight[0];
	var max = options.roomHeight[1];
	var height = min + Math.floor(ROT.RNG.getUniform()*(max-min+1));
	
	if (dx == 1) { /* to the right */
		var y2 = y - Math.floor(ROT.RNG.getUniform() * height);
		return new this(x+1, y2, x+width, y2+height-1, x, y);
	}
	
	if (dx == -1) { /* to the left */
		var y2 = y - Math.floor(ROT.RNG.getUniform() * height);
		return new this(x-width, y2, x-1, y2+height-1, x, y);
	}

	if (dy == 1) { /* to the bottom */
		var x2 = x - Math.floor(ROT.RNG.getUniform() * width);
		return new this(x2, y+1, x2+width-1, y+height, x, y);
	}

	if (dy == -1) { /* to the top */
		var x2 = x - Math.floor(ROT.RNG.getUniform() * width);
		return new this(x2, y-height, x2+width-1, y-1, x, y);
	}
}

/**
 * Room of random size, positioned around center coords
 */
ROT.Map.Feature.Room.createRandomCenter = function(cx, cy, options) {
	var min = options.roomWidth[0];
	var max = options.roomWidth[1];
	var width = min + Math.floor(ROT.RNG.getUniform()*(max-min+1));
	
	var min = options.roomHeight[0];
	var max = options.roomHeight[1];
	var height = min + Math.floor(ROT.RNG.getUniform()*(max-min+1));

	var x1 = cx - Math.floor(ROT.RNG.getUniform()*width);
	var y1 = cy - Math.floor(ROT.RNG.getUniform()*height);
	var x2 = x1 + width - 1;
	var y2 = y1 + height - 1;

	return new this(x1, y1, x2, y2);
}

/**
 * Room of random size within a given dimensions
 */
ROT.Map.Feature.Room.createRandom = function(availWidth, availHeight, options) {
	var min = options.roomWidth[0];
	var max = options.roomWidth[1];
	var width = min + Math.floor(ROT.RNG.getUniform()*(max-min+1));
	
	var min = options.roomHeight[0];
	var max = options.roomHeight[1];
	var height = min + Math.floor(ROT.RNG.getUniform()*(max-min+1));
	
	var left = availWidth - width - 1;
	var top = availHeight - height - 1;

	var x1 = 1 + Math.floor(ROT.RNG.getUniform()*left);
	var y1 = 1 + Math.floor(ROT.RNG.getUniform()*top);
	var x2 = x1 + width - 1;
	var y2 = y1 + height - 1;

	return new this(x1, y1, x2, y2);
}

ROT.Map.Feature.Room.prototype.addDoor = function(x, y) {
	this._doors[x+","+y] = 1;
	return this;
}

/**
 * @param {function}
 */
ROT.Map.Feature.Room.prototype.getDoors = function(callback) {
	for (var key in this._doors) {
		var parts = key.split(",");
		callback(parseInt(parts[0]), parseInt(parts[1]));
	}
	return this;
}

ROT.Map.Feature.Room.prototype.clearDoors = function() {
	this._doors = {};
	return this;
}

ROT.Map.Feature.Room.prototype.addDoors = function(isWallCallback) {
	var left = this._x1-1;
	var right = this._x2+1;
	var top = this._y1-1;
	var bottom = this._y2+1;

	for (var x=left; x<=right; x++) {
		for (var y=top; y<=bottom; y++) {
			if (x != left && x != right && y != top && y != bottom) { continue; }
			if (isWallCallback(x, y)) { continue; }

			this.addDoor(x, y);
		}
	}

	return this;
}

ROT.Map.Feature.Room.prototype.debug = function() {
	console.log("room", this._x1, this._y1, this._x2, this._y2);
}

ROT.Map.Feature.Room.prototype.isValid = function(isWallCallback, canBeDugCallback) { 
	var left = this._x1-1;
	var right = this._x2+1;
	var top = this._y1-1;
	var bottom = this._y2+1;
	
	for (var x=left; x<=right; x++) {
		for (var y=top; y<=bottom; y++) {
			if (x == left || x == right || y == top || y == bottom) {
				if (!isWallCallback(x, y)) { return false; }
			} else {
				if (!canBeDugCallback(x, y)) { return false; }
			}
		}
	}

	return true;
}

/**
 * @param {function} digCallback Dig callback with a signature (x, y, value). Values: 0 = empty, 1 = wall, 2 = door. Multiple doors are allowed.
 */
ROT.Map.Feature.Room.prototype.create = function(digCallback) { 
	var left = this._x1-1;
	var right = this._x2+1;
	var top = this._y1-1;
	var bottom = this._y2+1;
	
	var value = 0;
	for (var x=left; x<=right; x++) {
		for (var y=top; y<=bottom; y++) {
			if (x+","+y in this._doors) {
				value = 2;
			} else if (x == left || x == right || y == top || y == bottom) {
				value = 1;
			} else {
				value = 0;
			}
			digCallback(x, y, value);
		}
	}
}

ROT.Map.Feature.Room.prototype.getCenter = function() {
	return [Math.round((this._x1 + this._x2)/2), Math.round((this._y1 + this._y2)/2)];
}

ROT.Map.Feature.Room.prototype.getLeft = function() {
	return this._x1;
}

ROT.Map.Feature.Room.prototype.getRight = function() {
	return this._x2;
}

ROT.Map.Feature.Room.prototype.getTop = function() {
	return this._y1;
}

ROT.Map.Feature.Room.prototype.getBottom = function() {
	return this._y2;
}

/**
 * @class Corridor
 * @augments ROT.Map.Feature
 * @param {int} startX
 * @param {int} startY
 * @param {int} endX
 * @param {int} endY
 */
ROT.Map.Feature.Corridor = function(startX, startY, endX, endY) {
	this._startX = startX;
	this._startY = startY;
	this._endX = endX; 
	this._endY = endY;
	this._endsWithAWall = true;
}
ROT.Map.Feature.Corridor.extend(ROT.Map.Feature);

ROT.Map.Feature.Corridor.createRandomAt = function(x, y, dx, dy, options) {
	var min = options.corridorLength[0];
	var max = options.corridorLength[1];
	var length = min + Math.floor(ROT.RNG.getUniform()*(max-min+1));
	
	return new this(x, y, x + dx*length, y + dy*length);
}

ROT.Map.Feature.Corridor.prototype.debug = function() {
	console.log("corridor", this._startX, this._startY, this._endX, this._endY);
}

ROT.Map.Feature.Corridor.prototype.isValid = function(isWallCallback, canBeDugCallback){ 
	var sx = this._startX;
	var sy = this._startY;
	var dx = this._endX-sx;
	var dy = this._endY-sy;
	var length = 1 + Math.max(Math.abs(dx), Math.abs(dy));
	
	if (dx) { dx = dx/Math.abs(dx); }
	if (dy) { dy = dy/Math.abs(dy); }
	var nx = dy;
	var ny = -dx;
	
	var ok = true;
	for (var i=0; i<length; i++) {
		var x = sx + i*dx;
		var y = sy + i*dy;

		if (!canBeDugCallback(     x,      y)) { ok = false; }
		if (!isWallCallback  (x + nx, y + ny)) { ok = false; }
		if (!isWallCallback  (x - nx, y - ny)) { ok = false; }
		
		if (!ok) {
			length = i;
			this._endX = x-dx;
			this._endY = y-dy;
			break;
		}
	}
	
	/**
	 * If the length degenerated, this corridor might be invalid
	 */
	 
	/* not supported */
	if (length == 0) { return false; } 
	
	 /* length 1 allowed only if the next space is empty */
	if (length == 1 && isWallCallback(this._endX + dx, this._endY + dy)) { return false; }
	
	/**
	 * We do not want the corridor to crash into a corner of a room;
	 * if any of the ending corners is empty, the N+1th cell of this corridor must be empty too.
	 * 
	 * Situation:
	 * #######1
	 * .......?
	 * #######2
	 * 
	 * The corridor was dug from left to right.
	 * 1, 2 - problematic corners, ? = N+1th cell (not dug)
	 */
	var firstCornerBad = !isWallCallback(this._endX + dx + nx, this._endY + dy + ny);
	var secondCornerBad = !isWallCallback(this._endX + dx - nx, this._endY + dy - ny);
	this._endsWithAWall = isWallCallback(this._endX + dx, this._endY + dy);
	if ((firstCornerBad || secondCornerBad) && this._endsWithAWall) { return false; }

	return true;
}

/**
 * @param {function} digCallback Dig callback with a signature (x, y, value). Values: 0 = empty.
 */
ROT.Map.Feature.Corridor.prototype.create = function(digCallback) { 
	var sx = this._startX;
	var sy = this._startY;
	var dx = this._endX-sx;
	var dy = this._endY-sy;
	var length = 1+Math.max(Math.abs(dx), Math.abs(dy));
	
	if (dx) { dx = dx/Math.abs(dx); }
	if (dy) { dy = dy/Math.abs(dy); }
	var nx = dy;
	var ny = -dx;
	
	for (var i=0; i<length; i++) {
		var x = sx + i*dx;
		var y = sy + i*dy;
		digCallback(x, y, 0);
	}
	
	return true;
}

ROT.Map.Feature.Corridor.prototype.createPriorityWalls = function(priorityWallCallback) {
	if (!this._endsWithAWall) { return; }

	var sx = this._startX;
	var sy = this._startY;

	var dx = this._endX-sx;
	var dy = this._endY-sy;
	if (dx) { dx = dx/Math.abs(dx); }
	if (dy) { dy = dy/Math.abs(dy); }
	var nx = dy;
	var ny = -dx;

	priorityWallCallback(this._endX + dx, this._endY + dy);
	priorityWallCallback(this._endX + nx, this._endY + ny);
	priorityWallCallback(this._endX - nx, this._endY - ny);
}/**
 * @class Base noise generator
 */
ROT.Noise = function() {
};

ROT.Noise.prototype.get = function(x, y) {}
/**
 * A simple 2d implementation of simplex noise by Ondrej Zara
 *
 * Based on a speed-improved simplex noise algorithm for 2D, 3D and 4D in Java.
 * Which is based on example code by Stefan Gustavson (stegu@itn.liu.se).
 * With Optimisations by Peter Eastman (peastman@drizzle.stanford.edu).
 * Better rank ordering method by Stefan Gustavson in 2012.
 */

/**
 * @class 2D simplex noise generator
 * @param {int} [gradients=256] Random gradients
 */
ROT.Noise.Simplex = function(gradients) {
	ROT.Noise.call(this);

	this._F2 = 0.5 * (Math.sqrt(3) - 1);
    this._G2 = (3 - Math.sqrt(3)) / 6;

	this._gradients = [
		[ 0, -1],
		[ 1, -1],
		[ 1,  0],
		[ 1,  1],
		[ 0,  1],
		[-1,  1],
		[-1,  0],
		[-1, -1]
	];

	var permutations = [];
	var count = gradients || 256;
	for (var i=0;i<count;i++) { permutations.push(i); }
	permutations = permutations.randomize();

	this._perms = [];
	this._indexes = [];

	for (var i=0;i<2*count;i++) {
		this._perms.push(permutations[i % count]);
		this._indexes.push(this._perms[i] % this._gradients.length);
	}

};
ROT.Noise.Simplex.extend(ROT.Noise);

ROT.Noise.Simplex.prototype.get = function(xin, yin) {
	var perms = this._perms;
	var indexes = this._indexes;
	var count = perms.length/2;
	var G2 = this._G2;

	var n0 =0, n1 = 0, n2 = 0, gi; // Noise contributions from the three corners

	// Skew the input space to determine which simplex cell we're in
	var s = (xin + yin) * this._F2; // Hairy factor for 2D
	var i = Math.floor(xin + s);
	var j = Math.floor(yin + s);
	var t = (i + j) * G2;
	var X0 = i - t; // Unskew the cell origin back to (x,y) space
	var Y0 = j - t;
	var x0 = xin - X0; // The x,y distances from the cell origin
	var y0 = yin - Y0;

	// For the 2D case, the simplex shape is an equilateral triangle.
	// Determine which simplex we are in.
	var i1, j1; // Offsets for second (middle) corner of simplex in (i,j) coords
	if (x0 > y0) {
		i1 = 1;
		j1 = 0;
	} else { // lower triangle, XY order: (0,0)->(1,0)->(1,1)
		i1 = 0;
		j1 = 1;
	} // upper triangle, YX order: (0,0)->(0,1)->(1,1)

	// A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
	// a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
	// c = (3-sqrt(3))/6
	var x1 = x0 - i1 + G2; // Offsets for middle corner in (x,y) unskewed coords
	var y1 = y0 - j1 + G2;
	var x2 = x0 - 1 + 2*G2; // Offsets for last corner in (x,y) unskewed coords
	var y2 = y0 - 1 + 2*G2;

	// Work out the hashed gradient indices of the three simplex corners
	var ii = i.mod(count);
	var jj = j.mod(count);

	// Calculate the contribution from the three corners
	var t0 = 0.5 - x0*x0 - y0*y0;
	if (t0 >= 0) {
		t0 *= t0;
		gi = indexes[ii+perms[jj]];
		var grad = this._gradients[gi];
		n0 = t0 * t0 * (grad[0] * x0 + grad[1] * y0);
	}
	
	var t1 = 0.5 - x1*x1 - y1*y1;
	if (t1 >= 0) {
		t1 *= t1;
		gi = indexes[ii+i1+perms[jj+j1]];
		var grad = this._gradients[gi];
		n1 = t1 * t1 * (grad[0] * x1 + grad[1] * y1);
	}
	
	var t2 = 0.5 - x2*x2 - y2*y2;
	if (t2 >= 0) {
		t2 *= t2;
		gi = indexes[ii+1+perms[jj+1]];
		var grad = this._gradients[gi];
		n2 = t2 * t2 * (grad[0] * x2 + grad[1] * y2);
	}

	// Add contributions from each corner to get the final noise value.
	// The result is scaled to return values in the interval [-1,1].
	return 70 * (n0 + n1 + n2);
}
/**
 * @class Abstract FOV algorithm
 * @param {function} lightPassesCallback Does the light pass through x,y?
 * @param {object} [options]
 * @param {int} [options.topology=8] 4/6/8
 */
ROT.FOV = function(lightPassesCallback, options) {
	this._lightPasses = lightPassesCallback;
	this._options = {
		topology: 8
	}
	for (var p in options) { this._options[p] = options[p]; }
};

/**
 * Compute visibility for a 360-degree circle
 * @param {int} x
 * @param {int} y
 * @param {int} R Maximum visibility radius
 * @param {function} callback
 */
ROT.FOV.prototype.compute = function(x, y, R, callback) {}

/**
 * Return all neighbors in a concentric ring
 * @param {int} cx center-x
 * @param {int} cy center-y
 * @param {int} r range
 */
ROT.FOV.prototype._getCircle = function(cx, cy, r) {
	var result = [];
	var dirs, countFactor, startOffset;

	switch (this._options.topology) {
		case 4:
			countFactor = 1;
			startOffset = [0, 1];
			dirs = [
				ROT.DIRS[8][7],
				ROT.DIRS[8][1],
				ROT.DIRS[8][3],
				ROT.DIRS[8][5]
			]
		break;

		case 6:
			dirs = ROT.DIRS[6];
			countFactor = 1;
			startOffset = [-1, 1];
		break;

		case 8:
			dirs = ROT.DIRS[4];
			countFactor = 2;
			startOffset = [-1, 1];
		break;
	}

	/* starting neighbor */
	var x = cx + startOffset[0]*r;
	var y = cy + startOffset[1]*r;

	/* circle */
	for (var i=0;i<dirs.length;i++) {
		for (var j=0;j<r*countFactor;j++) {
			result.push([x, y]);
			x += dirs[i][0];
			y += dirs[i][1];

		}
	}

	return result;
}
/**
 * @class Discrete shadowcasting algorithm. Obsoleted by Precise shadowcasting.
 * @augments ROT.FOV
 */
ROT.FOV.DiscreteShadowcasting = function(lightPassesCallback, options) {
	ROT.FOV.call(this, lightPassesCallback, options);
}
ROT.FOV.DiscreteShadowcasting.extend(ROT.FOV);

/**
 * @see ROT.FOV#compute
 */
ROT.FOV.DiscreteShadowcasting.prototype.compute = function(x, y, R, callback) {
	var center = this._coords;
	var map = this._map;

	/* this place is always visible */
	callback(x, y, 0);

	/* standing in a dark place. FIXME is this a good idea?  */
	if (!this._lightPasses(x, y)) { return; }
	
	/* start and end angles */
	var DATA = [];
	
	var A, B, cx, cy, blocks;

	/* analyze surrounding cells in concentric rings, starting from the center */
	for (var r=1; r<=R; r++) {
		var neighbors = this._getCircle(x, y, r);
		var angle = 360 / neighbors.length;

		for (var i=0;i<neighbors.length;i++) {
			cx = neighbors[i][0];
			cy = neighbors[i][1];
			A = angle * (i - 0.5);
			B = A + angle;
			
			blocks = !this._lightPasses(cx, cy);
			if (this._visibleCoords(Math.floor(A), Math.ceil(B), blocks, DATA)) { callback(cx, cy, r, 1); }
			
			if (DATA.length == 2 && DATA[0] == 0 && DATA[1] == 360) { return; } /* cutoff? */

		} /* for all cells in this ring */
	} /* for all rings */
}

/**
 * @param {int} A start angle
 * @param {int} B end angle
 * @param {bool} blocks Does current cell block visibility?
 * @param {int[][]} DATA shadowed angle pairs
 */
ROT.FOV.DiscreteShadowcasting.prototype._visibleCoords = function(A, B, blocks, DATA) {
	if (A < 0) { 
		var v1 = arguments.callee(0, B, blocks, DATA);
		var v2 = arguments.callee(360+A, 360, blocks, DATA);
		return v1 || v2;
	}
	
	var index = 0;
	while (index < DATA.length && DATA[index] < A) { index++; }
	
	if (index == DATA.length) { /* completely new shadow */
		if (blocks) { DATA.push(A, B); } 
		return true;
	}
	
	var count = 0;
	
	if (index % 2) { /* this shadow starts in an existing shadow, or within its ending boundary */
		while (index < DATA.length && DATA[index] < B) {
			index++;
			count++;
		}
		
		if (count == 0) { return false; }
		
		if (blocks) { 
			if (count % 2) {
				DATA.splice(index-count, count, B);
			} else {
				DATA.splice(index-count, count);
			}
		}
		
		return true;

	} else { /* this shadow starts outside an existing shadow, or within a starting boundary */
		while (index < DATA.length && DATA[index] < B) {
			index++;
			count++;
		}
		
		/* visible when outside an existing shadow, or when overlapping */
		if (A == DATA[index-count] && count == 1) { return false; }
		
		if (blocks) { 
			if (count % 2) {
				DATA.splice(index-count, count, A);
			} else {
				DATA.splice(index-count, count, A, B);
			}
		}
			
		return true;
	}
}
/**
 * @class Precise shadowcasting algorithm
 * @augments ROT.FOV
 */
ROT.FOV.PreciseShadowcasting = function(lightPassesCallback, options) {
	ROT.FOV.call(this, lightPassesCallback, options);
}
ROT.FOV.PreciseShadowcasting.extend(ROT.FOV);

/**
 * @see ROT.FOV#compute
 */
ROT.FOV.PreciseShadowcasting.prototype.compute = function(x, y, R, callback) {
	/* this place is always visible */
	callback(x, y, 0, 1);

	/* standing in a dark place. FIXME is this a good idea?  */
	if (!this._lightPasses(x, y)) { return; }
	
	/* list of all shadows */
	var SHADOWS = [];
	
	var cx, cy, blocks, A1, A2, visibility;

	/* analyze surrounding cells in concentric rings, starting from the center */
	for (var r=1; r<=R; r++) {
		var neighbors = this._getCircle(x, y, r);
		var neighborCount = neighbors.length;

		for (var i=0;i<neighborCount;i++) {
			cx = neighbors[i][0];
			cy = neighbors[i][1];
			/* shift half-an-angle backwards to maintain consistency of 0-th cells */
			A1 = [i ? 2*i-1 : 2*neighborCount-1, 2*neighborCount];
			A2 = [2*i+1, 2*neighborCount]; 
			
			blocks = !this._lightPasses(cx, cy);
			visibility = this._checkVisibility(A1, A2, blocks, SHADOWS);
			if (visibility) { callback(cx, cy, r, visibility); }

			if (SHADOWS.length == 2 && SHADOWS[0][0] == 0 && SHADOWS[1][0] == SHADOWS[1][1]) { return; } /* cutoff? */

		} /* for all cells in this ring */
	} /* for all rings */
}

/**
 * @param {int[2]} A1 arc start
 * @param {int[2]} A2 arc end
 * @param {bool} blocks Does current arc block visibility?
 * @param {int[][]} SHADOWS list of active shadows
 */
ROT.FOV.PreciseShadowcasting.prototype._checkVisibility = function(A1, A2, blocks, SHADOWS) {
	if (A1[0] > A2[0]) { /* split into two sub-arcs */
		var v1 = this._checkVisibility(A1, [A1[1], A1[1]], blocks, SHADOWS);
		var v2 = this._checkVisibility([0, 1], A2, blocks, SHADOWS);
		return (v1+v2)/2;
	}

	/* index1: first shadow >= A1 */
	var index1 = 0, edge1 = false;
	while (index1 < SHADOWS.length) {
		var old = SHADOWS[index1];
		var diff = old[0]*A1[1] - A1[0]*old[1];
		if (diff >= 0) { /* old >= A1 */
			if (diff == 0 && !(index1 % 2)) { edge1 = true; }
			break;
		}
		index1++;
	}

	/* index2: last shadow <= A2 */
	var index2 = SHADOWS.length, edge2 = false;
	while (index2--) {
		var old = SHADOWS[index2];
		var diff = A2[0]*old[1] - old[0]*A2[1];
		if (diff >= 0) { /* old <= A2 */
			if (diff == 0 && (index2 % 2)) { edge2 = true; }
			break;
		}
	}

	var visible = true;
	if (index1 == index2 && (edge1 || edge2)) {  /* subset of existing shadow, one of the edges match */
		visible = false; 
	} else if (edge1 && edge2 && index1+1==index2 && (index2 % 2)) { /* completely equivalent with existing shadow */
		visible = false;
	} else if (index1 > index2 && (index1 % 2)) { /* subset of existing shadow, not touching */
		visible = false;
	}
	
	if (!visible) { return 0; } /* fast case: not visible */
	
	var visibleLength, P;

	/* compute the length of visible arc, adjust list of shadows (if blocking) */
	var remove = index2-index1+1;
	if (remove % 2) {
		if (index1 % 2) { /* first edge within existing shadow, second outside */
			var P = SHADOWS[index1];
			visibleLength = (A2[0]*P[1] - P[0]*A2[1]) / (P[1] * A2[1]);
			if (blocks) { SHADOWS.splice(index1, remove, A2); }
		} else { /* second edge within existing shadow, first outside */
			var P = SHADOWS[index2];
			visibleLength = (P[0]*A1[1] - A1[0]*P[1]) / (A1[1] * P[1]);
			if (blocks) { SHADOWS.splice(index1, remove, A1); }
		}
	} else {
		if (index1 % 2) { /* both edges within existing shadows */
			var P1 = SHADOWS[index1];
			var P2 = SHADOWS[index2];
			visibleLength = (P2[0]*P1[1] - P1[0]*P2[1]) / (P1[1] * P2[1]);
			if (blocks) { SHADOWS.splice(index1, remove); }
		} else { /* both edges outside existing shadows */
			if (blocks) { SHADOWS.splice(index1, remove, A1, A2); }
			return 1; /* whole arc visible! */
		}
	}

	var arcLength = (A2[0]*A1[1] - A1[0]*A2[1]) / (A1[1] * A2[1]);

	return visibleLength/arcLength;
}
/**
 * @class Recursive shadowcasting algorithm
 * Currently only supports 4/8 topologies, not hexagonal.
 * Based on Peter Harkins' implementation of Björn Bergström's algorithm described here: http://www.roguebasin.com/index.php?title=FOV_using_recursive_shadowcasting
 * @augments ROT.FOV
 */
ROT.FOV.RecursiveShadowcasting = function(lightPassesCallback, options) {
	ROT.FOV.call(this, lightPassesCallback, options);
}
ROT.FOV.RecursiveShadowcasting.extend(ROT.FOV);

/** Octants used for translating recursive shadowcasting offsets */
ROT.FOV.RecursiveShadowcasting.OCTANTS = [
	[-1,  0,  0,  1],
	[ 0, -1,  1,  0],
	[ 0, -1, -1,  0],
	[-1,  0,  0, -1],
	[ 1,  0,  0, -1],
	[ 0,  1, -1,  0],
	[ 0,  1,  1,  0],
	[ 1,  0,  0,  1]
];

/**
 * Compute visibility for a 360-degree circle
 * @param {int} x
 * @param {int} y
 * @param {int} R Maximum visibility radius
 * @param {function} callback
 */
ROT.FOV.RecursiveShadowcasting.prototype.compute = function(x, y, R, callback) {
	//You can always see your own tile
	callback(x, y, 0, true);
	for(var i = 0; i < ROT.FOV.RecursiveShadowcasting.OCTANTS.length; i++) {
		this._renderOctant(x, y, ROT.FOV.RecursiveShadowcasting.OCTANTS[i], R, callback);
	}
}

/**
 * Compute visibility for a 180-degree arc
 * @param {int} x
 * @param {int} y
 * @param {int} R Maximum visibility radius
 * @param {int} dir Direction to look in (expressed in a ROT.DIR value);
 * @param {function} callback
 */
ROT.FOV.RecursiveShadowcasting.prototype.compute180 = function(x, y, R, dir, callback) {
	//You can always see your own tile
	callback(x, y, 0, true);
	var previousOctant = (dir - 1 + 8) % 8; //Need to retrieve the previous octant to render a full 180 degrees
	var nextPreviousOctant = (dir - 2 + 8) % 8; //Need to retrieve the previous two octants to render a full 180 degrees
	var nextOctant = (dir+ 1 + 8) % 8; //Need to grab to next octant to render a full 180 degrees
	this._renderOctant(x, y, ROT.FOV.RecursiveShadowcasting.OCTANTS[nextPreviousOctant], R, callback);
	this._renderOctant(x, y, ROT.FOV.RecursiveShadowcasting.OCTANTS[previousOctant], R, callback);
	this._renderOctant(x, y, ROT.FOV.RecursiveShadowcasting.OCTANTS[dir], R, callback);
	this._renderOctant(x, y, ROT.FOV.RecursiveShadowcasting.OCTANTS[nextOctant], R, callback);
}

/**
 * Compute visibility for a 90-degree arc
 * @param {int} x
 * @param {int} y
 * @param {int} R Maximum visibility radius
 * @param {int} dir Direction to look in (expressed in a ROT.DIR value);
 * @param {function} callback
 */
ROT.FOV.RecursiveShadowcasting.prototype.compute90 = function(x, y, R, dir, callback) {
	//You can always see your own tile
	callback(x, y, 0, true);
	var previousOctant = (dir - 1 + 8) % 8; //Need to retrieve the previous octant to render a full 90 degrees
	this._renderOctant(x, y, ROT.FOV.RecursiveShadowcasting.OCTANTS[dir], R, callback);
	this._renderOctant(x, y, ROT.FOV.RecursiveShadowcasting.OCTANTS[previousOctant], R, callback);
}

/**
 * Render one octant (45-degree arc) of the viewshed
 * @param {int} x
 * @param {int} y
 * @param {int} octant Octant to be rendered
 * @param {int} R Maximum visibility radius
 * @param {function} callback
 */
ROT.FOV.RecursiveShadowcasting.prototype._renderOctant = function(x, y, octant, R, callback) {
	//Radius incremented by 1 to provide same coverage area as other shadowcasting radiuses
	this._castVisibility(x, y, 1, 1.0, 0.0, R + 1, octant[0], octant[1], octant[2], octant[3], callback);
}

/**
 * Actually calculates the visibility
 * @param {int} startX The starting X coordinate
 * @param {int} startY The starting Y coordinate
 * @param {int} row The row to render
 * @param {float} visSlopeStart The slope to start at
 * @param {float} visSlopeEnd The slope to end at
 * @param {int} radius The radius to reach out to
 * @param {int} xx 
 * @param {int} xy 
 * @param {int} yx 
 * @param {int} yy 
 * @param {function} callback The callback to use when we hit a block that is visible
 */
ROT.FOV.RecursiveShadowcasting.prototype._castVisibility = function(startX, startY, row, visSlopeStart, visSlopeEnd, radius, xx, xy, yx, yy, callback) {
	if(visSlopeStart < visSlopeEnd) { return; }
	for(var i = row; i <= radius; i++) {
		var dx = -i - 1;
		var dy = -i;
		var blocked = false;
		var newStart = 0;

		//'Row' could be column, names here assume octant 0 and would be flipped for half the octants
		while(dx <= 0) {
			dx += 1;

			//Translate from relative coordinates to map coordinates
			var mapX = startX + dx * xx + dy * xy;
			var mapY = startY + dx * yx + dy * yy;

			//Range of the row
			var slopeStart = (dx - 0.5) / (dy + 0.5);
			var slopeEnd = (dx + 0.5) / (dy - 0.5);
		
			//Ignore if not yet at left edge of Octant
			if(slopeEnd > visSlopeStart) { continue; }
			
			//Done if past right edge
			if(slopeStart < visSlopeEnd) { break; }
				
			//If it's in range, it's visible
			if((dx * dx + dy * dy) < (radius * radius)) {
				callback(mapX, mapY, i, true);
			}
	
			if(!blocked) {
				//If tile is a blocking tile, cast around it
				if(!this._lightPasses(mapX, mapY) && i < radius) {
					blocked = true;
					this._castVisibility(startX, startY, i + 1, visSlopeStart, slopeStart, radius, xx, xy, yx, yy, callback);
					newStart = slopeEnd;
				}
			} else {
				//Keep narrowing if scanning across a block
				if(!this._lightPasses(mapX, mapY)) {
					newStart = slopeEnd;
					continue;
				}
			
				//Block has ended
				blocked = false;
				visSlopeStart = newStart;
			}
		}
		if(blocked) { break; }
	}
}
/**
 * @namespace Color operations
 */
ROT.Color = {
	fromString: function(str) {
		var cached, r;
		if (str in this._cache) {
			cached = this._cache[str];
		} else {
			if (str.charAt(0) == "#") { /* hex rgb */

				var values = str.match(/[0-9a-f]/gi).map(function(x) { return parseInt(x, 16); });
				if (values.length == 3) {
					cached = values.map(function(x) { return x*17; });
				} else {
					for (var i=0;i<3;i++) {
						values[i+1] += 16*values[i];
						values.splice(i, 1);
					}
					cached = values;
				}

			} else if (r = str.match(/rgb\(([0-9, ]+)\)/i)) { /* decimal rgb */
				cached = r[1].split(/\s*,\s*/).map(function(x) { return parseInt(x); });
			} else { /* html name */
				cached = [0, 0, 0];
			}

			this._cache[str] = cached;
		}

		return cached.slice();
	},

	/**
	 * Add two or more colors
	 * @param {number[]} color1
	 * @param {number[]} color2
	 * @returns {number[]}
	 */
	add: function(color1, color2) {
		var result = color1.slice();
		for (var i=0;i<3;i++) {
			for (var j=1;j<arguments.length;j++) {
				result[i] += arguments[j][i];
			}
		}
		return result;
	},

	/**
	 * Add two or more colors, MODIFIES FIRST ARGUMENT
	 * @param {number[]} color1
	 * @param {number[]} color2
	 * @returns {number[]}
	 */
	add_: function(color1, color2) {
		for (var i=0;i<3;i++) {
			for (var j=1;j<arguments.length;j++) {
				color1[i] += arguments[j][i];
			}
		}
		return color1;
	},

	/**
	 * Multiply (mix) two or more colors
	 * @param {number[]} color1
	 * @param {number[]} color2
	 * @returns {number[]}
	 */
	multiply: function(color1, color2) {
		var result = color1.slice();
		for (var i=0;i<3;i++) {
			for (var j=1;j<arguments.length;j++) {
				result[i] *= arguments[j][i] / 255;
			}
			result[i] = Math.round(result[i]);
		}
		return result;
	},

	/**
	 * Multiply (mix) two or more colors, MODIFIES FIRST ARGUMENT
	 * @param {number[]} color1
	 * @param {number[]} color2
	 * @returns {number[]}
	 */
	multiply_: function(color1, color2) {
		for (var i=0;i<3;i++) {
			for (var j=1;j<arguments.length;j++) {
				color1[i] *= arguments[j][i] / 255;
			}
			color1[i] = Math.round(color1[i]);
		}
		return color1;
	},

	/**
	 * Interpolate (blend) two colors with a given factor
	 * @param {number[]} color1
	 * @param {number[]} color2
	 * @param {float} [factor=0.5] 0..1
	 * @returns {number[]}
	 */
	interpolate: function(color1, color2, factor) {
		if (arguments.length < 3) { factor = 0.5; }
		var result = color1.slice();
		for (var i=0;i<3;i++) {
			result[i] = Math.round(result[i] + factor*(color2[i]-color1[i]));
		}
		return result;
	},

	/**
	 * Interpolate (blend) two colors with a given factor in HSL mode
	 * @param {number[]} color1
	 * @param {number[]} color2
	 * @param {float} [factor=0.5] 0..1
	 * @returns {number[]}
	 */
	interpolateHSL: function(color1, color2, factor) {
		if (arguments.length < 3) { factor = 0.5; }
		var hsl1 = this.rgb2hsl(color1);
		var hsl2 = this.rgb2hsl(color2);
		for (var i=0;i<3;i++) {
			hsl1[i] += factor*(hsl2[i]-hsl1[i]);
		}
		return this.hsl2rgb(hsl1);
	},

	/**
	 * Create a new random color based on this one
	 * @param {number[]} color
	 * @param {number[]} diff Set of standard deviations
	 * @returns {number[]}
	 */
	randomize: function(color, diff) {
		if (!(diff instanceof Array)) { diff = ROT.RNG.getNormal(0, diff); }
		var result = color.slice();
		for (var i=0;i<3;i++) {
			result[i] += (diff instanceof Array ? Math.round(ROT.RNG.getNormal(0, diff[i])) : diff);
		}
		return result;
	},

	/**
	 * Converts an RGB color value to HSL. Expects 0..255 inputs, produces 0..1 outputs.
	 * @param {number[]} color
	 * @returns {number[]}
	 */
	rgb2hsl: function(color) {
		var r = color[0]/255;
		var g = color[1]/255;
		var b = color[2]/255;

		var max = Math.max(r, g, b), min = Math.min(r, g, b);
		var h, s, l = (max + min) / 2;

		if (max == min) {
			h = s = 0; // achromatic
		} else {
			var d = max - min;
			s = (l > 0.5 ? d / (2 - max - min) : d / (max + min));
			switch(max) {
				case r: h = (g - b) / d + (g < b ? 6 : 0); break;
				case g: h = (b - r) / d + 2; break;
				case b: h = (r - g) / d + 4; break;
			}
			h /= 6;
		}

		return [h, s, l];
	},

	/**
	 * Converts an HSL color value to RGB. Expects 0..1 inputs, produces 0..255 outputs.
	 * @param {number[]} color
	 * @returns {number[]}
	 */
	hsl2rgb: function(color) {
		var l = color[2];

		if (color[1] == 0) {
			l = Math.round(l*255);
			return [l, l, l];
		} else {
			function hue2rgb(p, q, t) {
				if (t < 0) t += 1;
				if (t > 1) t -= 1;
				if (t < 1/6) return p + (q - p) * 6 * t;
				if (t < 1/2) return q;
				if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
				return p;
			}

			var s = color[1];
			var q = (l < 0.5 ? l * (1 + s) : l + s - l * s);
			var p = 2 * l - q;
			var r = hue2rgb(p, q, color[0] + 1/3);
			var g = hue2rgb(p, q, color[0]);
			var b = hue2rgb(p, q, color[0] - 1/3);
			return [Math.round(r*255), Math.round(g*255), Math.round(b*255)];
		}
	},

	toRGB: function(color) {
		return "rgb(" + this._clamp(color[0]) + "," + this._clamp(color[1]) + "," + this._clamp(color[2]) + ")";
	},

	toHex: function(color) {
		var parts = [];
		for (var i=0;i<3;i++) {
			parts.push(this._clamp(color[i]).toString(16).lpad("0", 2));
		}
		return "#" + parts.join("");
	},

	_clamp: function(num) {
		if (num < 0) {
			return 0;
		} else if (num > 255) {
			return 255;
		} else {
			return num;
		}
	},

	_cache: {
		"black": [0,0,0],
		"navy": [0,0,128],
		"darkblue": [0,0,139],
		"mediumblue": [0,0,205],
		"blue": [0,0,255],
		"darkgreen": [0,100,0],
		"green": [0,128,0],
		"teal": [0,128,128],
		"darkcyan": [0,139,139],
		"deepskyblue": [0,191,255],
		"darkturquoise": [0,206,209],
		"mediumspringgreen": [0,250,154],
		"lime": [0,255,0],
		"springgreen": [0,255,127],
		"aqua": [0,255,255],
		"cyan": [0,255,255],
		"midnightblue": [25,25,112],
		"dodgerblue": [30,144,255],
		"forestgreen": [34,139,34],
		"seagreen": [46,139,87],
		"darkslategray": [47,79,79],
		"darkslategrey": [47,79,79],
		"limegreen": [50,205,50],
		"mediumseagreen": [60,179,113],
		"turquoise": [64,224,208],
		"royalblue": [65,105,225],
		"steelblue": [70,130,180],
		"darkslateblue": [72,61,139],
		"mediumturquoise": [72,209,204],
		"indigo": [75,0,130],
		"darkolivegreen": [85,107,47],
		"cadetblue": [95,158,160],
		"cornflowerblue": [100,149,237],
		"mediumaquamarine": [102,205,170],
		"dimgray": [105,105,105],
		"dimgrey": [105,105,105],
		"slateblue": [106,90,205],
		"olivedrab": [107,142,35],
		"slategray": [112,128,144],
		"slategrey": [112,128,144],
		"lightslategray": [119,136,153],
		"lightslategrey": [119,136,153],
		"mediumslateblue": [123,104,238],
		"lawngreen": [124,252,0],
		"chartreuse": [127,255,0],
		"aquamarine": [127,255,212],
		"maroon": [128,0,0],
		"purple": [128,0,128],
		"olive": [128,128,0],
		"gray": [128,128,128],
		"grey": [128,128,128],
		"skyblue": [135,206,235],
		"lightskyblue": [135,206,250],
		"blueviolet": [138,43,226],
		"darkred": [139,0,0],
		"darkmagenta": [139,0,139],
		"saddlebrown": [139,69,19],
		"darkseagreen": [143,188,143],
		"lightgreen": [144,238,144],
		"mediumpurple": [147,112,216],
		"darkviolet": [148,0,211],
		"palegreen": [152,251,152],
		"darkorchid": [153,50,204],
		"yellowgreen": [154,205,50],
		"sienna": [160,82,45],
		"brown": [165,42,42],
		"darkgray": [169,169,169],
		"darkgrey": [169,169,169],
		"lightblue": [173,216,230],
		"greenyellow": [173,255,47],
		"paleturquoise": [175,238,238],
		"lightsteelblue": [176,196,222],
		"powderblue": [176,224,230],
		"firebrick": [178,34,34],
		"darkgoldenrod": [184,134,11],
		"mediumorchid": [186,85,211],
		"rosybrown": [188,143,143],
		"darkkhaki": [189,183,107],
		"silver": [192,192,192],
		"mediumvioletred": [199,21,133],
		"indianred": [205,92,92],
		"peru": [205,133,63],
		"chocolate": [210,105,30],
		"tan": [210,180,140],
		"lightgray": [211,211,211],
		"lightgrey": [211,211,211],
		"palevioletred": [216,112,147],
		"thistle": [216,191,216],
		"orchid": [218,112,214],
		"goldenrod": [218,165,32],
		"crimson": [220,20,60],
		"gainsboro": [220,220,220],
		"plum": [221,160,221],
		"burlywood": [222,184,135],
		"lightcyan": [224,255,255],
		"lavender": [230,230,250],
		"darksalmon": [233,150,122],
		"violet": [238,130,238],
		"palegoldenrod": [238,232,170],
		"lightcoral": [240,128,128],
		"khaki": [240,230,140],
		"aliceblue": [240,248,255],
		"honeydew": [240,255,240],
		"azure": [240,255,255],
		"sandybrown": [244,164,96],
		"wheat": [245,222,179],
		"beige": [245,245,220],
		"whitesmoke": [245,245,245],
		"mintcream": [245,255,250],
		"ghostwhite": [248,248,255],
		"salmon": [250,128,114],
		"antiquewhite": [250,235,215],
		"linen": [250,240,230],
		"lightgoldenrodyellow": [250,250,210],
		"oldlace": [253,245,230],
		"red": [255,0,0],
		"fuchsia": [255,0,255],
		"magenta": [255,0,255],
		"deeppink": [255,20,147],
		"orangered": [255,69,0],
		"tomato": [255,99,71],
		"hotpink": [255,105,180],
		"coral": [255,127,80],
		"darkorange": [255,140,0],
		"lightsalmon": [255,160,122],
		"orange": [255,165,0],
		"lightpink": [255,182,193],
		"pink": [255,192,203],
		"gold": [255,215,0],
		"peachpuff": [255,218,185],
		"navajowhite": [255,222,173],
		"moccasin": [255,228,181],
		"bisque": [255,228,196],
		"mistyrose": [255,228,225],
		"blanchedalmond": [255,235,205],
		"papayawhip": [255,239,213],
		"lavenderblush": [255,240,245],
		"seashell": [255,245,238],
		"cornsilk": [255,248,220],
		"lemonchiffon": [255,250,205],
		"floralwhite": [255,250,240],
		"snow": [255,250,250],
		"yellow": [255,255,0],
		"lightyellow": [255,255,224],
		"ivory": [255,255,240],
		"white": [255,255,255]
	}
}
/**
 * @class Lighting computation, based on a traditional FOV for multiple light sources and multiple passes.
 * @param {function} reflectivityCallback Callback to retrieve cell reflectivity (0..1)
 * @param {object} [options]
 * @param {int} [options.passes=1] Number of passes. 1 equals to simple FOV of all light sources, >1 means a *highly simplified* radiosity-like algorithm.
 * @param {int} [options.emissionThreshold=100] Cells with emissivity > threshold will be treated as light source in the next pass.
 * @param {int} [options.range=10] Max light range
 */
ROT.Lighting = function(reflectivityCallback, options) {
	this._reflectivityCallback = reflectivityCallback;
	this._options = {
		passes: 1,
		emissionThreshold: 100,
		range: 10
	};
	this._fov = null;

	this._lights = {};
	this._reflectivityCache = {};
	this._fovCache = {};

	this.setOptions(options);
}

/**
 * Adjust options at runtime
 * @see ROT.Lighting
 * @param {object} [options]
 */
ROT.Lighting.prototype.setOptions = function(options) {
	for (var p in options) { this._options[p] = options[p]; }
	if (options.range) { this.reset(); }
	return this;
}

/**
 * Set the used Field-Of-View algo
 * @param {ROT.FOV} fov
 */
ROT.Lighting.prototype.setFOV = function(fov) {
	this._fov = fov;
	this._fovCache = {};
	return this;
}

/**
 * Set (or remove) a light source
 * @param {int} x
 * @param {int} y
 * @param {null || string || number[3]} color
 */
ROT.Lighting.prototype.setLight = function(x, y, color) {
	var key = x+","+y;

	if (color) {
		this._lights[key] = (typeof(color) == "string" ? ROT.Color.fromString(color) : color);
	} else {
		delete this._lights[key];
	}
	return this;
}

/**
 * Reset the pre-computed topology values. Call whenever the underlying map changes its light-passability.
 */
ROT.Lighting.prototype.reset = function() {
	this._reflectivityCache = {};
	this._fovCache = {};

	return this;
}

/**
 * Compute the lighting
 * @param {function} lightingCallback Will be called with (x, y, color) for every lit cell
 */
ROT.Lighting.prototype.compute = function(lightingCallback) {
	var doneCells = {};
	var emittingCells = {};
	var litCells = {};

	for (var key in this._lights) { /* prepare emitters for first pass */
		var light = this._lights[key];
		if (!(key in emittingCells)) { emittingCells[key] = [0, 0, 0]; }

		ROT.Color.add_(emittingCells[key], light);
	}

	for (var i=0;i<this._options.passes;i++) { /* main loop */
		this._emitLight(emittingCells, litCells, doneCells);
		if (i+1 == this._options.passes) { continue; } /* not for the last pass */
		emittingCells = this._computeEmitters(litCells, doneCells);
	}

	for (var litKey in litCells) { /* let the user know what and how is lit */
		var parts = litKey.split(",");
		var x = parseInt(parts[0]);
		var y = parseInt(parts[1]);
		lightingCallback(x, y, litCells[litKey]);
	}

	return this;
}

/**
 * Compute one iteration from all emitting cells
 * @param {object} emittingCells These emit light
 * @param {object} litCells Add projected light to these
 * @param {object} doneCells These already emitted, forbid them from further calculations
 */
ROT.Lighting.prototype._emitLight = function(emittingCells, litCells, doneCells) {
	for (var key in emittingCells) {
		var parts = key.split(",");
		var x = parseInt(parts[0]);
		var y = parseInt(parts[1]);
		this._emitLightFromCell(x, y, emittingCells[key], litCells);
		doneCells[key] = 1;
	}
	return this;
}

/**
 * Prepare a list of emitters for next pass
 * @param {object} litCells
 * @param {object} doneCells
 * @returns {object}
 */
ROT.Lighting.prototype._computeEmitters = function(litCells, doneCells) {
	var result = {};

	for (var key in litCells) {
		if (key in doneCells) { continue; } /* already emitted */

		var color = litCells[key];

		if (key in this._reflectivityCache) {
			var reflectivity = this._reflectivityCache[key];
		} else {
			var parts = key.split(",");
			var x = parseInt(parts[0]);
			var y = parseInt(parts[1]);
			var reflectivity = this._reflectivityCallback(x, y);
			this._reflectivityCache[key] = reflectivity;
		}

		if (reflectivity == 0) { continue; } /* will not reflect at all */

		/* compute emission color */
		var emission = [];
		var intensity = 0;
		for (var i=0;i<3;i++) {
			var part = Math.round(color[i]*reflectivity);
			emission[i] = part;
			intensity += part;
		}
		if (intensity > this._options.emissionThreshold) { result[key] = emission; }
	}

	return result;
}

/**
 * Compute one iteration from one cell
 * @param {int} x
 * @param {int} y
 * @param {number[]} color
 * @param {object} litCells Cell data to by updated
 */
ROT.Lighting.prototype._emitLightFromCell = function(x, y, color, litCells) {
	var key = x+","+y;
	if (key in this._fovCache) {
		var fov = this._fovCache[key];
	} else {
		var fov = this._updateFOV(x, y);
	}

	for (var fovKey in fov) {
		var formFactor = fov[fovKey];

		if (fovKey in litCells) { /* already lit */
			var result = litCells[fovKey];
		} else { /* newly lit */
			var result = [0, 0, 0];
			litCells[fovKey] = result;
		}

		for (var i=0;i<3;i++) { result[i] += Math.round(color[i]*formFactor); } /* add light color */
	}

	return this;
}

/**
 * Compute FOV ("form factor") for a potential light source at [x,y]
 * @param {int} x
 * @param {int} y
 * @returns {object}
 */
ROT.Lighting.prototype._updateFOV = function(x, y) {
	var key1 = x+","+y;
	var cache = {};
	this._fovCache[key1] = cache;
	var range = this._options.range;
	var cb = function(x, y, r, vis) {
		var key2 = x+","+y;
		var formFactor = vis * (1-r/range);
		if (formFactor == 0) { return; }
		cache[key2] = formFactor;
	}
	this._fov.compute(x, y, range, cb.bind(this));

	return cache;
}
/**
 * @class Abstract pathfinder
 * @param {int} toX Target X coord
 * @param {int} toY Target Y coord
 * @param {function} passableCallback Callback to determine map passability
 * @param {object} [options]
 * @param {int} [options.topology=8]
 */
ROT.Path = function(toX, toY, passableCallback, options) {
	this._toX = toX;
	this._toY = toY;
	this._fromX = null;
	this._fromY = null;
	this._passableCallback = passableCallback;
	this._options = {
		topology: 8
	}
	for (var p in options) { this._options[p] = options[p]; }

	this._dirs = ROT.DIRS[this._options.topology];
	if (this._options.topology == 8) { /* reorder dirs for more aesthetic result (vertical/horizontal first) */
		this._dirs = [
			this._dirs[0],
			this._dirs[2],
			this._dirs[4],
			this._dirs[6],
			this._dirs[1],
			this._dirs[3],
			this._dirs[5],
			this._dirs[7]
		]
	}
}

/**
 * Compute a path from a given point
 * @param {int} fromX
 * @param {int} fromY
 * @param {function} callback Will be called for every path item with arguments "x" and "y"
 */
ROT.Path.prototype.compute = function(fromX, fromY, callback) {
}

ROT.Path.prototype._getNeighbors = function(cx, cy) {
	var result = [];
	for (var i=0;i<this._dirs.length;i++) {
		var dir = this._dirs[i];
		var x = cx + dir[0];
		var y = cy + dir[1];
		
		if (!this._passableCallback(x, y)) { continue; }
		result.push([x, y]);
	}
	
	return result;
}
/**
 * @class Simplified Dijkstra's algorithm: all edges have a value of 1
 * @augments ROT.Path
 * @see ROT.Path
 */
ROT.Path.Dijkstra = function(toX, toY, passableCallback, options) {
	ROT.Path.call(this, toX, toY, passableCallback, options);

	this._computed = {};
	this._todo = [];
	this._add(toX, toY, null);
}
ROT.Path.Dijkstra.extend(ROT.Path);

/**
 * Compute a path from a given point
 * @see ROT.Path#compute
 */
ROT.Path.Dijkstra.prototype.compute = function(fromX, fromY, callback) {
	var key = fromX+","+fromY;
	if (!(key in this._computed)) { this._compute(fromX, fromY); }
	if (!(key in this._computed)) { return; }
	
	var item = this._computed[key];
	while (item) {
		callback(item.x, item.y);
		item = item.prev;
	}
}

/**
 * Compute a non-cached value
 */
ROT.Path.Dijkstra.prototype._compute = function(fromX, fromY) {
	while (this._todo.length) {
		var item = this._todo.shift();
		if (item.x == fromX && item.y == fromY) { return; }
		
		var neighbors = this._getNeighbors(item.x, item.y);
		
		for (var i=0;i<neighbors.length;i++) {
			var neighbor = neighbors[i];
			var x = neighbor[0];
			var y = neighbor[1];
			var id = x+","+y;
			if (id in this._computed) { continue; } /* already done */	
			this._add(x, y, item); 
		}
	}
}

ROT.Path.Dijkstra.prototype._add = function(x, y, prev) {
	var obj = {
		x: x,
		y: y,
		prev: prev
	}
	this._computed[x+","+y] = obj;
	this._todo.push(obj);
}
/**
 * @class Simplified A* algorithm: all edges have a value of 1
 * @augments ROT.Path
 * @see ROT.Path
 */
ROT.Path.AStar = function(toX, toY, passableCallback, options) {
	ROT.Path.call(this, toX, toY, passableCallback, options);

	this._todo = [];
	this._done = {};
	this._fromX = null;
	this._fromY = null;
}
ROT.Path.AStar.extend(ROT.Path);

/**
 * Compute a path from a given point
 * @see ROT.Path#compute
 */
ROT.Path.AStar.prototype.compute = function(fromX, fromY, callback) {
	this._todo = [];
	this._done = {};
	this._fromX = fromX;
	this._fromY = fromY;
	this._add(this._toX, this._toY, null);

	while (this._todo.length) {
		var item = this._todo.shift();
		if (item.x == fromX && item.y == fromY) { break; }
		var neighbors = this._getNeighbors(item.x, item.y);

		for (var i=0;i<neighbors.length;i++) {
			var neighbor = neighbors[i];
			var x = neighbor[0];
			var y = neighbor[1];
			var id = x+","+y;
			if (id in this._done) { continue; }
			this._add(x, y, item); 
		}
	}
	
	var item = this._done[fromX+","+fromY];
	if (!item) { return; }
	
	while (item) {
		callback(item.x, item.y);
		item = item.prev;
	}
}

ROT.Path.AStar.prototype._add = function(x, y, prev) {
	var obj = {
		x: x,
		y: y,
		prev: prev,
		g: (prev ? prev.g+1 : 0),
		h: this._distance(x, y)
	}
	this._done[x+","+y] = obj;
	
	/* insert into priority queue */
	
	var f = obj.g + obj.h;
	for (var i=0;i<this._todo.length;i++) {
		var item = this._todo[i];
		if (f < item.g + item.h) {
			this._todo.splice(i, 0, obj);
			return;
		}
	}
	
	this._todo.push(obj);
}

ROT.Path.AStar.prototype._distance = function(x, y) {
	switch (this._options.topology) {
		case 4:
			return (Math.abs(x-this._fromX) + Math.abs(y-this._fromY));
		break;

		case 6:
			var dx = Math.abs(x - this._fromX);
			var dy = Math.abs(y - this._fromY);
			return dy + Math.max(0, (dx-dy)/2);
		break;

		case 8: 
			return Math.max(Math.abs(x-this._fromX), Math.abs(y-this._fromY));
		break;
	}
}
;
(function () {
    var arrayMethods = {
        /** Returns a shallow copy of this array */
        copy: function () { return this.slice(0); },

        /** Returns true if this array contains 'element', returns false otherwise */
        contains: function (element) { return this.indexOf(element) >= 0; },

        /**  Returns a copy of this array, removing the elements 'from' index 'to' index within it */
        remove: function (from, to) {
            var res = [];
            var i = 0, j = 0;
            for (i = 0; i < from; i++) {
                res[i] = this[i];
            }
            j = i;
            for (i = to; i < this.length; i++) {
                res[j++] = this[i];
            }
            return res;
        },

        /** Returns a copy of this array, rotated 'n' places, counterclockwise if 'n' is positive, clockwise otherwise*/
        rotate: function (n) {
            if (!n) return this.slice(0);
            var length = this.length;
            var res = new Array(length);
            var thisIndex = (n > 0) ? n : length + n, i = 0, j = 0;
            for (i = thisIndex; i < length; i++) {
                res[j++] = this[i];
            }
            for (i = 0; i < thisIndex; i++) {
                res[j++] = this[i];
            }
            return res;
        },

        /**
         * Returns a copy of this array, removing but
         *         the first 'n' elements from it
         *         assumes n=1 when called with no arguments.
         */
        skipFirst: function (n) {
            if (n === 'undefined') n = 1;
            return this.slice(n);
        },

        /**
         * Returns a copy of this array, removing
         *         but the last 'n' elements from it
         *         assumes n=1 when called with no arguments.
         */
        skipLast: function (n) {
            if (n === 'undefined') n = 1;
            if (n > this.length) return [];
            return this.slice(0, this.length - n);
        },

        /**
         * Returns a copy of this array,
         *         sorting its elements randomly
         */

        shuffle: function () {
            array = this.splice(0);
            var m = array.length, t, i;

            // While there remain elements to shuffle…
            while (m) {

                // Pick a remaining element…
                i = Math.floor(Math.random() * m--);

                // And swap it with the current element.
                t = array[m];
                array[m] = array[i];
                array[i] = t;
            }

            return array;
        },

        /**
         * Returns an unique array
         */
        makeUnique: function(){
            var u = {}, a = [];
            for(var i = 0, l = this.length; i < l; ++i){
                if(u.hasOwnProperty(this[i])) {
                    continue;
                }
                a.push(this[i]);
                u[this[i]] = 1;
            }
            return a;
        },

        /**
         * Returns this associative array length
         */
        getAssociativeArrayLength: function () {
            return this.length;
        },

        /**
         * Returns a copy of this array that contains the difference
         *         between source array and 'array'
         */
        difference: function (array) {
            var filterFunc = filterOnOtherArray_diff.bind(array);
            return this.filter(filterFunc);
        },

        /**
         * Returns a copy of this array that contains the
         *         intersection between source array and 'array'
         */
        intersection: function (array) {
            var filterFunc = filterOnOtherArray_inter.bind(array);
            return this.filter(filterFunc);
        },

        /**
         * Returns a copy of this array that contains the union
         *   between source array with 'array', removing duplicates
         *    ! fails with a sparse array !
         */
        union: function (array) {
            var obj = {}, res = [], i = 0, k = 0;
            for (i = 0; i < this.length; i++) {
                obj[this[i]] = this[i];
            }
            for (i = 0; i < array.length; i++) {
                obj[array[i]] = array[i];
            }
            for (k in obj) {
                res.push(obj[k]);
            }
            return res;
        }
    };

    // let's install those methods on the prototype
    for (var newMethodName in arrayMethods) {
        installFunction(newMethodName, arrayMethods[newMethodName]);
    }

    function installFunction(name, fn) {
        if (Array.prototype[name]) throw ('Array method ' + name + '() already defined.');
        Object.defineProperty(Array.prototype, name, {
            value: fn
        });
    }

    function filterOnOtherArray_diff(arr, i) {
        return (arr.indexOf(i) < 0);
    }

    function filterOnOtherArray_inter(arr, i) {
        return (arr.indexOf(i) >= 0);
    }
})();
function SimpleRant() {
    this.rantConstructor = function (input) {
        var result = input, re;
        var regex = /\<(.*?)\>/g;
        var matches, token;
        var replacement = [], i = 0, tags={};

        var stringCase=this.getCase(input);

        // TAG matches (anything inside bracket notation)
        // From the Wiki https://github.com/TheBerkin/Rant/wiki
        // Tags are instructions that can be placed anywhere inside a pattern.
        // They change various aspects of how the pattern is interpreted past that point.
        // Tags are defined inside of square brackets ([ ]).
        // There are several types of tags: functions, metapatterns, replacers, list functions, and subroutines.

        result = input, matches, token, replacement = [], i= 0, regex = /(\[.*?\])/g;
        tags.valid=["rep","case"];
        while (matches = regex.exec(input)) {
            input = input.replace(matches[0], '');

            // [rep:4] - repeat 4 times (loop)
            // [rep:4][sep:\s]{\8,x}
            re = new RegExp("\\w+", "g");
            token = matches[1].match(re);


        }




        // lexer matches (anything inside arrow notation)
        result = input, matches, token, replacement = [], i = 0, regex = /\<(.*?)\>/g;
        while (matches = regex.exec(input)) {
            //var input = "noun long animal";
            // We accept a number of keywords, and they all correlate to the entries in the DIC files
            // First, get the DIC token
            re = new RegExp("\\w+", "g");
            token = matches[1].match(re);
            // Match against valid keywords in valid_tokens
            if (dic.tokens.indexOf(token[0]) != -1) {
                // Now we're ready to pass the token to the parser. It should
                // include the token and any modifiers and subs
                result = lexer(this, matches, result);
            }
        }
        return this.capitalize(result,stringCase);
    };
}


if ('undefined' != typeof module) {
    module.exports.SimpleRant = SimpleRant;
}
var lexer = function (rant, matches, input) {
    var result, modifier= 0, re=new RegExp("\\w+","g");
    var token = matches[1].match(re)[0];
    var matched=matches[1].match(re);

    // matched[0] contains the token. It can be noun, verb, adj etc.
    // we already know it's valid, because this function doesn't get
    // called unless it is.


    // Let's check if there's any qualifiers or modifiers
    if(token.length>1){
        // yes, there are. There are two classes. Filters and subs. Let's see what we got
        var mysubs=myfilters=[];
        var dictionary=[];
        if(matched.length>1){
            matched.forEach(function(entry,idx) {
                if(idx>0){
                    if("undefined" != typeof dic[token].filters){
                        if(dic[token].filters.indexOf(entry)>-1){
                            //console.log("valid filter: "+entry);
                            // Filters are categories of the token, so <adj emotion> will
                            // set filters valid for emotion for the token adj
                            myfilters.push(entry);
                        }
                    }
                    if("undefined" != typeof dic[token].subs){
                        if(dic[token].subs.indexOf(entry)>-1){
                            // Subs are grammatical instructions
                            modifier = dic[token].subs.indexOf(entry);
                            //console.log("valid sub: "+entry);
                        }
                    }
                }
                // So.. now we got the token, the filters and the subs. Let's do some magic
            });
        }

    }
    if(myfilters.length<=0){
        //console.log(token);
        //console.log(dic[token]);
        if("undefined" != typeof dic[token].all){
            dictionary=dictionary.concat(dic[token].all);
        }
    } else {
        myfilters.forEach(function(e){
            dictionary=dictionary.concat(dic[token][e]);
        });
    }



    if(modifier===0){
        matched.forEach(function(e){
            if(e.toLowerCase() === "modifier"){
                modifier=1;
            }
        });
    }

    var rand, re, i, newToken, replacement = [];
    re = new RegExp( matches[0], 'g');
    if(null !== input.match(re)) i = input.match(re).length;
    while (i > 0) {
        rand = Math.floor(Math.random()*dictionary.length);
        if(dictionary[rand].match(/\//) <=0){
            newToken=dictionary[rand];
        } else {
            newToken=dictionary[rand].split("/")[modifier];
        }
        replacement.push(newToken);
        i--;
    }

    //console.log("using dictionary ");
    var rand=Math.floor(Math.random()*dictionary.length);
    //console.dir(dictionary[rand]);

    re = new RegExp(matches[0], 'g');
    input = input.replace(re, function () {
        return replacement[i++];
    });

    return input;
};



String.prototype.toTitleCase = function() {
    var i, j, str, lowers, uppers;
    str = this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });

    // Certain minor words should be left lowercase unless
    // they are the first or last words in the string
    lowers = ['A', 'An', 'The', 'And', 'But', 'Or', 'For', 'Nor', 'As', 'At',
        'By', 'For', 'From', 'In', 'Into', 'Near', 'Of', 'On', 'Onto', 'To', 'With'];
    for (i = 0, j = lowers.length; i < j; i++)
        str = str.replace(new RegExp('\\s' + lowers[i] + '\\s', 'g'),
            function(txt) {
                return txt.toLowerCase();
            });

    // Certain words should be left uppercase
    uppers = ['Id', 'Tv'];
    for (i = 0, j = uppers.length; i < j; i++)
        str = str.replace(new RegExp('\\b' + uppers[i] + '\\b', 'g'),
            uppers[i].toUpperCase());

    return str;
};

String.prototype.toWordCase = function() {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

String.prototype.toSentenceCase = function() {
    var re = /(^\s*\w{1}|\.\s*\w{1})/gi;
    return this.replace(re, function(str) {
        return str.toUpperCase();
    });
};

SimpleRant.prototype.getCase = function (tokenStream) {
    var _case = 0;
    var cases = ["default", "none", "lower", "upper", "title", "word", "first", "sentence"];
    var token, matches, re;
    while (matches = /(\[.*?\])/g.exec(tokenStream)) {
        re = new RegExp("\\w+", "g");
        token = matches[1].match(re);
        if (["case"].indexOf(token[0]) != -1) {
            if (token[0] === "case") {
                if (cases.indexOf(token[1] != -1)) {
                    _case = cases.indexOf(token[1]);
                }
            }
        }
        return cases[_case];
    }
};




SimpleRant.prototype.capitalize = function (s,_case) {
    if(_case==="upper")
        return s.toUpperCase();
    else if(_case==="lower")
        return s.toLowerCase();
    else if(_case==="word")
        return s.toWordCase();
    else if(_case==="title")
        return s.toTitleCase();
    else if(_case==="sentence")
        return s.toSentenceCase();
    else if(_case==="none")
        return s;
    else
        return s[0].toUpperCase() + s.slice(1); //default && first

};
var dic={};

dic.tokens=["preposition","firstname","abstract", "activity", "adj", "adv", "color", "conj", "country", "emo", "em", "x", "face", "firstname", "greet", "surname", "noun", "sound", "title", "place", "prefix", "prepos", "pron", "quality", "rel", "sconj", "substance", "timeadv", "timenoun", "unit", "verbimg", "say", "verb", "vocal", "preposition", "yn"];

var abstract={};
dic.abstract=abstract;
dic.abstract.concept=["idea/ideas","lie/lies","philosophy/philosophies","hypothesis/hypotheses","theory/theories","concept/concepts","thought/thoughts","plan/plans","scheme/schemes","notion/notions","conception/conceptions","impression/impressions","proposal/proposals","law/laws","vision/visions","conclusion/conclusions"];
dic.abstract.subjective=["belief/beliefs","opinion/opinions"];
dic.abstract.social=["relationship/relationships","conflict/conflicts","fight/fights","disagreement/disagreements","consensus/consensuses","agreement/agreements","understanding/understandings","friendship/friendships","rivalry/rivalries","feud/feuds","romance/romances"];
dic.abstract.linguistic=["question/questions","answer/answers"];
dic.abstract.all=[].concat(dic.abstract.concept,dic.abstract.subjective,dic.abstract.social,dic.abstract.linguistic);
dic.abstract.subs=["singular","plural"];
dic.abstract.filters=["concept","subjective","social","linguistic"];
var activity={};
dic.activity=activity;
dic.activity.game=["Football","Soccer","Tennis","Basketball","Baseball","Golf","Chess","Checkers","Backgammon","Pong","Super Mario Bros.","The Legend of Zelda","Sonic the Hedgehog","Call of Duty","Battlefield","Hitman","Morrowind","Oblivion","Skyrim","World of Warcraft","Contra","Halo","Doom","Half-Life","Left 4 Dead","Counter-Strike"];
dic.activity.sport=["Football","Soccer","Tennis","Basketball","Baseball","Golf"];
dic.activity.board=["Chess","Checkers","Backgammon"];
dic.activity.video=["Pong","Super Mario Bros.","The Legend of Zelda","Sonic the Hedgehog","Call of Duty","Battlefield","Hitman","Morrowind","Oblivion","Skyrim","World of Warcraft","Contra","Halo","Doom","Half-Life","Left 4 Dead","Counter-Strike"];
dic.activity.all=[].concat(dic.activity.game,dic.activity.sport,dic.activity.board,dic.activity.video);
dic.activity.subs=["default"];
dic.activity.filters=["game","sport","board","video"];
var adj={};
dic.adj=adj;
dic.adj.appearance=["sweaty/sweatiness","soapy/soapiness","veiny/veininess","shady/shadiness","corrugated/corrugation","hulking/hulkingness","jagged/jaggedness","ratty/rattiness","stout/stoutness","whopping/whoppingness","humongous/humongousness","mammoth/mammothness","enormous/enormousness","colossal/colossality","monochromatic/monochromaticness","grimy/griminess","funny-looking/funny looks","gigantic/impressive size","limp/limpness","naked/nakedness","revealing/nakedness","pretty/prettiness","grey/greyness","microscopic/microscopicness","bearded/beardedness","floppy/floppiness","fluffy/fluffiness","dirty/dirt","petite/petiteness","sloppy/sloppiness","wide/wideness","slippery/slipperiness","sopping/wetness","slender/slenderness","dry/dryness","lickable/lickability","wooly/wooliness","colorful/color","mossy/mossiness","transparent/transparence","narrow/narrowness","glossy/glossiness","ancient/ancience","wrinkly/raisins","shriveled/raisins","plump/plumpness","green/greenness","brown/brownness","red/redness","white/whiteness","black/blackness","spiky/spikiness","thick/thickness","furry/furriness","fuzzy/fuzziness","wooden/woodness","bubbly/bubbliness","foamy/foaminess","smoky/smokiness","battered/batteredness","ugly/ugliness","glamourous/glamour","attractive/attractiveness","smoggy/smogginess","sparkling/sparkle","spotless/cleanliness","wide-eyed/wideness","cubic/cubic shape","symmetrical/symmetry","orbital/roundness","exposed/exposure","red-hot/glowing-red heat","bent/deformation","crooked/crookedness","uneven/unevenness","delicate/delicateness","moldy/moldiness","crusty/crustiness","filthy/filth","muscular/beefiness","glittery/glitter","purple/purpleness","ragged/raggedness","weedy/weediness","papery/paperiness","dazzling/sparkle","blinding/brightness","beautiful/beauty","windy/windiness","dusty/dustiness","short/shortness","towering/height","tall/height","menthol/menthol goodness","emaciated/emaciation","iridescent/iridescence","golden/golden luster","invisible/invisibility","powdery/powderiness","furrowed/furrowedness","flaccid/flaccidness"];
dic.adj.nationality=["Spanish/Spanish heritage","French/French heritage","German/German heritage","Italian/Italian heritage","Japanese/Japanese heritage","Chinese/Chinese heritage","Korean/Korean heritage","British/British heritage","African/African heritage","American/American heritage","Norwegian/Norwegian heritage","Russian/Russian heritage","Irish/Irish heritage","Mexican/Mexican heritage","Canadian/Canadian heritage","Australian/Australian heritage","African-American/African-Americanness"];
dic.adj.emotion=["severe/severity","sullen/sullenness","naughty/naughtiness","devilish/devilishness","arrogant/arrogance","indifferent/indifference","cranky/crankiness","bittersweet/bittersweetness","jealous/envy","gay/gayness","thankful/thankfulness","groggy/grogginess","flirty/flirtiness","frightened/fright","evil/evil","cheeky/cheekiness","emo/emo-ness","gleeful/glee","joyful/joy","happy/happiness","bored/boredom","sorrowful/sorrow","sad/sadness","angry/anger","rageing/rage","guilty/guilt","envious/envy","blissful/bliss","interested/interest","smug/smugness","proud/pride","hungry/hunger","ashamed/shame","loving/love","mad/madness","hateful/hate","humiliated/humility","impatient/impatience","surprised/surprise","optimistic/optimism","disappointed/disappointment","remorseful/remorse","contemptuous/contempt","awed/awe","lustful/lust","longing/longing","content/contentfulness","pleasured/pleasure","tormented/torment","horrified/horror","shocked/shock","furious/fury","sly/slyness","aggravated/aggression"];
dic.adj.weather=["sunny/sunniness","rainy/raininess","cloudy/cloudiness","snowy/snowiness","moonlit/moonlight","starry/starriness","foggy/fogginess"];
dic.adj.nsfw=["erect/erectness","sexy/sex appeal","ravishing/rock-solid arousal","horny/horniness","kinky/kinkiness","trashy/trashiness","sexual/sexuality"];
dic.adj.all=["sensible/sensibility","headless/headlessness","charitable/charitability","sociopathic/sociopathicness","ergonomic/ergonomicness","organic/organicness","regal/regalness","constitutional/constitutionalness","unconstitutional/unconstitutionalness","all-natural/all-naturalness","whole-grain/whole-graininess","Victorian/Victorianness","rustic/rusticness","luxurious/luxuriousness","invigorating/invigoratingness","tangy/tanginess","jazzy/jazziness","retro/retroness","ductile/ductileness","old-fashioned/old-fashionedness","flexible/flexibility","tender/tenderness","fabulous/fabulousness","fatherly/fatherliness","toasty/toastiness","mellow/mellowness","historical/historicalness","fragrant/fragrance","superfluous/superfluousness","squishy/squishiness","flappy/flappiness","slippy/slippiness","Confederate/Confederateness","slow/slowness","messy/messiness","holy/holiness","organized/order","nifty/niftiness","athletic/athleticness","juvenile/juvenileness","gallant/gallantness","corny/corniness","groovy/grooviness","weightless/weightlessness","rough/roughness","gourmet/gourmetness","deluxe/deluxeness","wholesome/wholesomeness","buttery/butteriness","religious/religiousness","righteous/righteousness","patriotic/patrioticness","spine-tingling/tingliness","waddly/waddliness","wobbly/wobbliness","traditional/tradition","appetizing/appetizingness","strict/strictness","dreadful/dreadfulness","mythical/mythicalness","philosophical/philosophy","enticing/enticingness","offensive/offensiveness","luscious/lusciousness","bouncy/bounciness","plentiful/plentifulness","major-league/major-leagueness","significant/significance","expressive/expression","cuddly/cuddliness","nude/nudity","rude/rudeness","political/politicalness","creative/creativity","sinful/sin","glorious/gloriousness","merciful/mercy","forgiving/forgiveness","smart/smartness","salty/saltiness","peppery/pepperiness","slurpee/slurpiness","criminal/criminality","domestic/domesticness","meaningful/meaning","manly/manliness","barbeque/barbequeness","casual/casualness","standard/standardness","nasty/nastiness","exquisite/exquisiteness","bold/boldness","proper/properness","fresh/freshness","informative/informativeness","jiggly/jiggliness","rebellious/rebelliousness","direful/direfulness","soothing/soothingness","disloyal/disloyalty","loyal/loyalty","victorious/victory","deep/depth","zen/zenness","royal/royalty","delightful/delightfulness","yummy/yumminess","refreshing/refreshingness","pleasurable/pleasurability","delectable/delectableness","intense/intensity","ghetto/ghettoness","strange/strangeness","odd/oddness","wasted/wastedness","eccentric/eccentricity","satisfactory/satisfaction","pharmaceutical/pharmaceuticalness","fishy/fishiness","jelly-belly/jelly-bellyness","exotic/exoticness","queer/queerness","outlandish/outlandishness","alien/alienness","seductive/seductiveness","superb/superbness","divine/divinity","celestial/celestial power","vibrating/vibration","wet/moisture","silly/silliness","spidery/spideriness","legitimate/legitimacy","flavorful/flavor","savory/flavor","silky/silkiness","slammin/worth","slimy/sliminess","impressive/impressiveness","appealing/appeal","revolting/revoltingness","captivating/captivation","amazing/amazingness","masculine/masculinity","gelatinous/gelatinous goodness","disjointed/disjointedness","tropical/tropicalness","rock-hard/rock-hardness","steamy/steaminess","lumpy/lumpiness","swift/lightning speed","long/longness","large/largeness","small/smallness","frosty/frostiness","glassy/glassiness","hard/hardness","formal/formality","blue/blueness","soft/softness","moist/moisture","smooth/smoothness","torturous/torturousness","well-used/thoroughness","well-loved/sweet love","shiny/shininess","sleek/sleekness","greasy/grasiness","hairy/hairiness","splintered/splinters","dreamy/dreaminess","spicy/spiciness","terrible/terror","throbbing/throbbing pleasure","fluttering/light-weightedness","mysterious/mystery","velvety/velvety goodness","dangerous/danger","metallic/luster","skinny/skininess","fat/fatness","painful/pain","oozing/excretory wetness","flaming/fire","exploding/explosiveness","wild/wildness","rambunctious/wildness","sizzling/fizzly shizzliness","perfect/perfection","raunchy/raunchiness","romantic/romance","young/youth","old/age","bloodthirsty/bloodthirstiness","fleshy/fleshiness","warm/warmth","cold/coldness","icy/iciness","electric/electricity","sharp/sharpness","deadly/deadliness","pulsating/pumpiness","bloody/bloodiness","pregnant/pregnancy","bulging/bulges","stretchy/stretchiness","creamy/creaminess","lovely/loveliness","grainy/graininess","rocky/rockiness","grassy/grassiness","musical/music","outstanding/amazement","identical/identity","famous/fame","cheerful/cheer","livid/anger","obstinate/stubbornness","exhausted/fatigue","graceful/grace","outrageous/outrage","radical/radishes","childish/immaturity","snobbish/snobbishness","miserly/misery","amiable/phallus","disgusting/disgust","awful/terror","humorous/humor","fanciful/fancy","pathetic/lameness","bashful/bashfulness","freaky/freakiness","chilly/chill","stormy/storminess","humid/humidity","bountiful/bountifulness","jubilant/happiness","irritated/anger","patient/patience","dizzy/dizziness","skeptical/skepticism","puzzled/confusion","light-hearted/light-heartedness","perplexed/confusion","over-whelmed/domination","jovial/cheer","hyper/energy","squirrely/furriness","jittery/jitteriness","sensational/sensationalism","elegant/elegance","flabbergasted/confusion","dreary/dreariness","impish/impishness","sneaky/sneakiness","horrid/horridness","monsterous/largeness","acidic/acidity","acoustic/loudness","active/activity","adaptable/adaptability","aggressive/agressiveness","additional/extra cheese","adequate/adequacy","administrative/domination","advantageous/advantage","advisable/wisdom","extreme/extremity","hardcore/hardcoreness","snappy/snappiness","scary/scariness","immense/immensity","woody/woodiness","dominant/dominance","submissive/submissiveness","pitiful/pity","sickening/sickness","questionable/questionability","intriguing/interest","fantastic/fantasticness","thrilling/thrill","tactical/tacticalness","drooling/sliminess","epic/epicness","succulant/deliciousness","slick/slickness","damp/dampness","explosive/explosiveness","flammable/flammability","water-tight/virginity","watery/wateriness","heavy/heaviness","disagreeable/disagreement","keen/keenness","fertile/fertility","sterile/sterility","distorted/distortion","itchy/itchiness","fruity/fruitiness","hazardous/hazardousness","troubling/trouble","critical/criticalness","treacherous/treachery","speculative/speculation","menacing/menace","threatening/intimidation","ticklish/ticklishness","vulnerable/vulnerability","wicked/wickedness","formidable/formidableness","brave/bravery","supple/softness","splendid/splendidness","nutritious/nutrition","melodic/melodicness","infectious/infectiousness","sticky/stickiness","magnificent/magnificence","fantastical/fantasticness","incredible/incredibility","unbelievable/falseness","shocking/shock","horrifying/horror","unstable/instability","funny/humorousness","delicious/deliciousness","tasty/tastiness","finger-licking/finger-lickingness","super/superness","juicy/juiciness","drippy/drippiness","dripping/drippingness","defiant/defiance","resonant/resonance","crackly/crackliness","high-flying/aerodynamics","wavy/waviness","nutty/nuttiness","insane/insanity","unpleasant/unpleasant nature","inadvisable/inadvisable nature","pleasant/pleasant nature","sandy/sandiness","stinky/stinkiness","dead/deadness","honest/honesty","trustworthy/trustworthiness","profitable/proifitability","essential/essentialness","courageous/courage","charming/charm","beloved/belovedness","marvelous/marvelousness","breathtaking/breathtakingness","surprising/surprise","awesome/awesomeness","zesty/zestiness","astounding/astoundingness","lubricated/lubrication","stimulating/stimulus","clever/cleverness","magical/magic","harmless/harmlessness","gentle/gentleness","raging/rage","noisy/noisiness","passionate/passion","interracial/interracialness","chrome-plated/chrome-platedness","ripped/wear","tattered/wear","heinous/heinousness","crapulous/crapulousness","feckless/fecklessness","peckish/peckishness","comely/comeliness","bilious/biliousness","serene/serenity","delinquent/delinquency","dashing/dashingness","considerate/consideration","busted/bustedness","spontaneous/spontaneity","daring/dare","radioactive/radioactivity","poisonous/toxicity","savage/savageness","terrifying/scariness","unlikely/unlikelihood","speedy/speediness","indestructible/involunurability","odorous/odor","penetrative/penetrative power","immaculate/immaculateness","rowdy/rowdiness","rational/rationality","irrational/irrationality","blasphemous/blasphemy","cooperative/cooperation","professional/professionalism","punctual/punctuality","festive/festiveness","polluted/pollution","potent/potency","powerful/power","piggy/pigginess","assertive/assetiveness","ethical/ethicalness","tight-lipped/tight lips","firm/firmness","unethical/unethicalness","highbrow/highbrowness","scholarly/scholarliness","academic/academicness","sophisticated/sophistication","intelligent/intelligence","intellectual/intellect","cultural/culture","popular/popularity","illiterate/illiteracy","educated/education","durable/durability","sublime/sublimeness","ambitious/ambition","family-friendly/family-friendliness","contaminated/contamination","unfortunate/misfortune","fortunate/fortune","absolute/absoluteness","logical/logical","frictional/friction","cream-filled/creaminess","malleable/malleability","fast/speed","squeamish/squeamishness","unlimited/unlimitedness","gassy/gassiness","edgy/edginess","artsy/artsiness","feasible/feasibility","infeasible/infeasibility","possible/possibility","potential/potential","intentional/intention","dumb/dumbness","disorganized/disorder","irregular/irregularity","certified/certification","sure/sureness","complimentary/complimentariness","supplementary/supplementariness","derogatory/derogatoriness","scornful/scorn","gross/grossness"].concat(dic.adj.appearance,dic.adj.nationality,dic.adj.emotion,dic.adj.weather);
dic.adj.subs=["normal","ness"];
dic.adj.filters=["appearance","nationality","emotion","weather","nsfw"];
var adv={};
dic.adv=adv;
dic.adv.sexy=["smoothly","slowly","lovingly","forcibly","up and down","side to side","romantically","hungrily","sweetly","roughly","delightedly"];
dic.adv.emotion=["happily","gladly","grudgingly","arrogantly","sadly","frantically","greedily","cautiously","hollowly","enviously","angrily","warily","shamefully","gleefully","grumpily","anxiously","regretfully","patiently","evilly","terrifyingly"];
dic.adv.all=["gloriously","majestically","sarcastically","obscenely","unbelievably","royally","buoyantly","comfortably","justly","continually","bitterly","accidentally","absentmindedly","generously","coaxingly","faithfully","explosively","spontaneously","magestically","kindly","fiercely","strongly","fervently","genuinely","wholeheartedly","honestly","truly","keenly","rashly","stubbornly","persistently","firmly","purposefully","strictly","weakly","sharply","intensively","solemnly","determinedly","lightly","gravely","deeply","earnestly","animatedly","ardently","carefully","diligently","hastily","laboriously","restlessly","speedily","spiritedly","strenuously","vigilantly","fearlessly","sluggishly","densely","closely","rebelliously","thirstily","meekly","mildly","modestly","calmly","discreetly","silently","greatly","intently","nimbly","vigorously","actively","readily","rapidly","promptly","efficiently","merrily","briskly","stealthily","forgivingly","mercifully","awkwardly","coldly","joyfully","urgently","adventurously","indubitably","beautifully","hatefully","wisely","blissfully","terribly","bravely","sympathetically","suspiciously","intensely","crossly","mysteriously","single-handedly","naturally","ferociously","heavily","dreamily","loudly","effortlessly","wetly","peacefully","daintily","snugly","crunchily","ticklishly","pointedly","noisily","wildly","enthusiastically","elegantly","energetically","busily","quickly","slickly","saggingly","quietly","defiantly","inappropriately","immediately","torturously","hurriedly","formally","courageously","with haste","excitedly","thickly","boldly","proudly","deliciously","fleetingly","secretly","violently","appreciatively","thoughtlessly","carelessly","smartly","delicately","sloppily","slimily","anally","eagerly","brightly","correctly","curiously","intentionally","deliberately","magically","necessarily","unnecessarily","fluidly","expertly","professionally","partially","intuitively","artfully","thoroughly","illegally","mortally","harmonically","objectively","cooly","casually","perfectly","imperfectly","victoriously","grandly","richly","heartily","musically","to kingdom come","methodically","nonchalantly","systematically","recklessly","neatly"].concat(dic.adv.sexy,dic.adv.emotion);
dic.adv.subs=["default"];
dic.adv.filters=["sexy","emotion"];
var color={};
dic.color=color;
dic.color.primary=["red/reddish","green/greenish","blue/bluish"];
dic.color.secondary=["cyan/cyan-ish","magenta/magenta-ish","yellow/yellowish"];
dic.color.all=["orange/orangish","purple/purplish","turquoise/turquoise-ish","pink/pinkish","grey/greyish","black/blackish","white/whitish","brown/brownish","lime green/lime-green-ish","lavender/lavenderish","maroon/maroonish","gold/goldish","silver/silverish","crimson/crimsonish"].concat(dic.color.primary,dic.color.secondary);
dic.color.subs=["default","ish"];
dic.color.filters=["primary","secondary"];
var conj={};
dic.conj=conj;
dic.conj.all=["and","or","but","nor","for","yet","so"].concat();
dic.conj.subs=["default"];
dic.conj.filters=[];
var country={};
dic.country=country;
dic.country.asia=["Afghanistan","Cambodia","China","Hong Kong","India","Indonesia","Japan","North Korea","South Korea","Kyrgyzstan","Malaysia","Mongolia","Nepal","Russia","Singapore","Taiwan","Thailand"];
dic.country.middleeast=["Afghanistan","Iran","Iraq","Israel","Pakistan","Saudi Arabia","Syria","United Arab Emirates"];
dic.country.mediterranean=["Akrotiri","Cyprus"];
dic.country.europe=["Albania","Austria","Belgium","Bulgaria","Denmark","Finland","France","Germany","Greece","Hungary","Ireland","Italy","Latvia","Lithuania","Luxembourg","Netherlands","Norway","Poland","Portugal","Romania","Russia","Slovakia","Slovenia","Spain","Sweden","Switzerland","Turkey","United Kingdom"];
dic.country.southamerica=["Argentina","Brazil","Chile","Colombia","Peru"];
dic.country.oceania=["Australia","Guam","Indonesia","New Zealand","Papua New Guinea","Philippines","Samoa","Solomon Islands"];
dic.country.northamerica=["Canada","Mexico","United States"];
dic.country.africa=["Democratic Republic of the Congo","Republic of the Congo","Egypt","Ghana","Kenya","Libya","Madagascar","Morocco","Niger","Nigeria","Rwanda","Somalia","South Africa","Sudan"];
dic.country.centralamerica=["Costa Rica","Guatemala","Haiti","Honduras","Nicaragua","Panama"];
dic.country.caribbean=["Cuba","Dominica","Jamaica"];
dic.country.eurasia=["Russia"];
dic.country.all=["Algeria","American Samoa","Andorra","Angola","Anguilla","Antarctica","Antigua and Barbuda","Armenia","Aruba","Ashmore and Cartier Islands","Azerbaijan","The Bahamas","Bahrain","Bangladesh","Barbados","Bassas da India","Belarus","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Bouvet Island","British Indian Ocean Territory","British Virgin Islands","Brunei","Burkina Faso","Burma","Burundi","Cameroon","Cape Verde","Cayman Islands","Central African Republic","Chad","Christmas Island","Clipperton Island","Cocos Islands","Comoros","Cook Islands","Coral Sea Islands","Cote d'Ivoire","Croatia","Czech Republic","Dhekelia","Djibouti","Dominican Republic","Ecuador","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Europa Island","Falkland Islands","Faroe Islands","Fiji","French Guiana","French Polynesia","French Southern and Antarctic Lands","Gabon","The Gambia","Gaza Strip","Georgia","Gibraltar","Glorioso Islands","Greenland","Grenada","Guadeloupe","Guernsey","Guinea","Guinea-Bissau","Guyana","Heard Island and McDonald Islands","Holy See","Iceland","Isle of Man","Jan Mayen","Jersey","Jordan","Juan de Nova Island","Kazakhstan","Kiribati","Kuwait","Laos","Lebanon","Lesotho","Liberia","Liechtenstein","Macau","Macedonia","Malawi","Maldives","Mali","Malta","Marshall Islands","Martinique","Mauritania","Mauritius","Mayotte","Federated States of Micronesia","Moldova","Monaco","Montserrat","Mozambique","Namibia","Nauru","Navassa Island","Netherlands Antilles","New Caledonia","Niue","Norfolk Island","Northern Mariana Islands","Oman","Palau","Paracel Islands","Paraguay","Pitcairn Islands","Puerto Rico","Qatar","Reunion","Saint Helena","Saint Kitts and Nevis","Saint Lucia","Saint Pierre and Miquelon","Saint Vincent and the Grenadines","San Marino","Sao Tome and Principe","Senegal","Serbia and Montenegro","Seychelles","Sierra Leone","South Georgia and the South Sandwich Islands","Spratly Islands","Sri Lanka","Suriname","Svalbard","Swaziland","Tajikistan","Tanzania","Timor-Leste","Togo","Tokelau","Tonga","Trinidad and Tobago","Tromelin Island","Tunisia","Turkmenistan","Turks and Caicos Islands","Tuvalu","Uganda","Ukraine","Uruguay","Uzbekistan","Vanuatu","Venezuela","Vietnam","Virgin Islands","Wake Island","Wallis and Futuna","West Bank","Western Sahara","Yemen","Zambia","Zimbabwe"].concat(dic.country.asia,dic.country.middleeast,dic.country.mediterranean,dic.country.europe,dic.country.southamerica,dic.country.oceania,dic.country.northamerica,dic.country.africa,dic.country.centralamerica,dic.country.caribbean,dic.country.eurasia);
dic.country.subs=["default"];
dic.country.filters=["asia","middleeast","mediterranean","europe","southamerica","oceania","northamerica","africa","centralamerica","caribbean","eurasia"];
var em={};
dic.em=em;
dic.em.all=["very","rather","quite","extremely","incredibly","really","thoroughly","most","absolutely","positively","unbelievably","super","majorly","oh so"].concat();
dic.em.subs=["default"];
dic.em.filters=[];
var emo={};
dic.emo=emo;
dic.emo.all=["joy","fright","happiness","boredom","sorrow","sadness","anger","rage","guilt","envy","passion","bliss","pain","interest","smugness","pride","hunger","despair","shame","love","madness","hatred","pity","humility","anticipation","surprise","optimism","disappointment","remorse","contempt","awe","lust","longing","contentment","pleasure","irritation","torment","horror","shock","terror","ecstasy","satisfaction","gratitude","melancholy","fury","excitement","confusion","bewilderment"].concat();
dic.emo.subs=["default"];
dic.emo.filters=[];
var face={};
dic.face=face;
dic.face.all=["smile","frown","grimace","evil grin","cheeky grin","sneer","pucker","smirk","grin","snarl","trollface","visage","snicker","pout","poker face","toothy grin","blank face","pout lip"].concat();
dic.face.subs=["default"];
dic.face.filters=[];
var firstname={};
dic.firstname=firstname;
dic.firstname.male=["Billybob/B","Moses/M","Barack/B","Vijay/V","Rex/R","Sasquatch/S","Elvis/E","Zachy/Z","John/J","Mickey/M","Jake/J","Stan/S","Jamier/J","Sean/S","Snuggles/S","Max/M","Mitchell/M","Collin/C","Nick/N","Danny/D","Ronald/R","Tim/T","Timmy/T","Scott/S","Cody/C","Louie/L","Keith/K","Luke/L","Nicholas","Todd","Barney","Brandon","Victor","William","Ken","Gordon","Grover","Steve","Kyle","George","Rick","Craig","Greg","Andy","Kevin","Dick","Tom","Harry","Bill","Brian","Francis","Corbin","Gilbert","Jeff","Bruce","Benny","Justin","Tony","Robin","Roger","Parker","Vanshay","Lee","Ian","Joshua","Michael","Shonuff","Tristan","Kermit","Wilbur","Malcolm","Akbar","Ambar","Athumani","Jela","Jengo","Kabili","Kanaifu","Kandoro","Keto","Khalfan","Kiango","Kijani","Kondo","Nuru","Penda","Penha","Safari","Thimba","Adish","Arash","Ariabod","Arwan","Arya","Asho","Atish","Baback","Baraz","Barbod","Bardia","Barid","Bast","Benham","Bian","Dareh","Darius","Darrius","Dastan","Gul","Jahan","Kamran","Kaveh","Kaysar","Menelin","Masih","Meghdad","Milad","Nasha","Naveed","Navid","Parham","Pouria","Radwan","Roshan","Saman","Sardar","Sarmad","Shadan","Shahan","Shahin","Shahryar","Shapur","Sher","Abeeku","Abu","Addae","Ade","Adeben","Adjatay","Adjo","Adwin","Agu","Ajamu","Ajani","Akello","Akia","Akins","Akintunde","Anane","Ande","Andwele","Armani","Asante","Ashanti","Ayele","Ayinde","Ayzize","Azibo","Badru","Bahari","Bandele","Banji","Barke","Belay","Bem","Berta","Birungi","Braima","Camara","Chiazam","Chincha","Chikezie","Chimelu","Chinelo","Chinua","Davu","Deka","Akuna","Binda","Euroa","Thor","Gidja","Kaawa","Kinta","Kumba","Mani","Omeo","Onyx","Paratyl","Ponto","Quoba","Taworri","Teangi","Thono","Tyipa","Yamparti","Yarran","Yoyko","Abbot","Abe","Acton","Adair","Aidric","Alan","Alastair","Albert","Albion","Aldan","Alden","Aldis","Alfred","Algernon","Alick","Allard","Alvar","Ansley","Anson","Aragorn","Arathorn","Arden","Argyle","Art","Ash","Ashford","Ashton","Atherton","Atticus","Aubrey","August","Austin","Axton","Bailey","Baker","Baldwin","Balthasar","Bardolf","Barnaby","Baron","Barrett","Barrington","Barton","Baxter","Beauchamp","Beauregard","Beck","Beckett","Beckham","Benjamin","Benson","Bently","Benton","Berke","Beverly","Bevis","Bringham","Birch","Bishop","Blake","Blaze","Boniface","Bono","Booker","Boston","Brad","Bradley","Bradshaw","Brantley","Brenton","Brett","Brewster","Breyson","Briar","Brice","Bridger","Brighton","Bristol","Brock","Bronson","Brook","Bryan","Buckley","Burgess","Burris","Burton","Byron","Caldwell","Caledon","Calico","Camden","Canon","Carlton","Carrington","Carter","Carver","Cash","Caspian","Cecil","Celtic","Chad","Chadwick","Chainey","Chandler","Charleston","Charlie","Charlton","Chauncey","Chay","Chester","Chet","Chip","Clarence","Clark","Clayton","Cleavon","Clement","Cleaveland","Clifford","Clifton","Clint","Clinton","Clive","Colby","Coleman","Colton","Conrad","Conroy","Cornell","Cosmo","Cotton","Crawford","Creighton","Crimson","Crosby","Dalton","Darrel","Darryl","Darwin","Dash","Daughtry","Dawson","Deacon","Dennis","Derek","Derring","Devon","Dexter","Dexton","Diamond","Dixon","Don","Donnie","Dorsey","Doug","Dracen","Drake","Dryden","Dudley","Duke","Dustin","Dwayne","Dwight","Dyson","Earl","Easton","Eastwood","Ed","Edd","Eddy","Edgar","Edgerton","Edison","Edmund","Edric","Edward","Edwin","Egbert","Elden","Elias","Elliot","Ellis","Elmer","Elmo","Elton","Elvin","Elwood","Emerson","Emmet","Ernie","Errol","Erv","Ervin","Erwin","Eugene","Fairfax","Falcon","Farley","Ferguson","Ferris","Filbert","Fisher","Fitzwilliam","Fletcher","Floyd","Forbes","Ford","Forrest","Foster","Fraley","Frank","Frederick","Frenchie","Fulbright","Gage","Galahad","Gale","Gardner","Garland","Garrison","Garth","Gary","Gavin","Gaylord","Godfrey","Graham","Graydon","Griff","Gulliver","Gus"];
dic.firstname.female=["Karen","Heidi","Gabrielle","Jessica","Laura","Sara","Linda","Britney","Kristin","Kate","Amanda","Renae","Ruth","Betty","Lindsey","Saralyn","Alice","Stacey","Sadie","Kat","Marge","Mary","Michelle","Kimberly","Debbie","Megan","Susan","Maria","Jennifer","Helen","Sandra","Rebecca","Martha","Stephanie","Gloria","Jane","Tina","Tiffany","Valerie","Lauren","Bertha","Vicki","Delores","Jacki","Varlerie","Scarlett","Christina","Maggie","Crystal","Ember","Papa"];
dic.firstname.neutral=["Sam","Adrian","Quinn","Sidney","Jessie","Jamie","Jordan","Tracy","Alex"];
dic.firstname.all=[].concat(dic.firstname.male,dic.firstname.female,dic.firstname.neutral);
dic.firstname.subs=["default","abbr"];
dic.firstname.filters=["male","female","neutral"];
var greet={};
dic.greet=greet;
dic.greet.all=["hello","greetings","hola","hey","what's up","whazzup","yo","good day","good morning","good afternoon","good evening","good night","hey buddy","ahoy","sup","salutations","aloha","konichi wa","what's happening","how's it hanging","how's it going","what's new","guten Tag"].concat();
dic.greet.subs=["default"];
dic.greet.filters=[];
var noun={};
dic.noun=noun;
dic.noun.body=["mouth/mouths","afro/afros","cornea/corneas","bone/bones","fanny/fannies","chin/chins","nostril/nostrils","unibrow/unibrows","mustache/mustaches","head/heads","armpit/armpits","rump/rumps","throat/throats","goatee/goatees","nose/noses","elbow/elbows","esophagus/esophaguses","toe/toes","pancreas/pancreases","stinger/stingers","scapula/scapulas","gallbladder/gallbladders","skin/skin","neck/necks","toenail/toenails","horn/horns","epidermis/epidermises","duodenum/duodenums","heart/hearts","fibula/fibulas","knuckle/knuckles","uvula/uvulas","lip/lips","snout/snouts","tooth/teeth","body/bodies","jowl/jowls","whisker/whiskers","beak/beaks","navel/navels","mandible/mandibles","kneecap/kneecaps","face/faces","loin/loins","femur/femurs","dimple/dimples","micropenis/micropenises","pussy/pussies","vagflap/vagflaps","cuntflap/cuntflaps","cunt/cunts","anus/anuses","sphincter/sphincters","tit/tits","taint/taints","foreskin/foreskins","boob/boobs","boner/boners","dick/dicks","cock/cocks","asshole/assholes","ballsack/ballsacks","testicle/testicles","scrotum/scrotums","pube/pubes","penis/penises","vagina/vaginas","pussy/pussies","chesticle/chesticles","willy/willies","prick/pricks","manhood/manhoods"];
dic.noun.hole=["mouth/mouths","tunnel/tunnels","anus/anuses","sphincter/sphincters","goatse/goatses","asshole/assholes","vagina/vaginas","pussy/pussies"];
dic.noun.person=["teen/teens","child/children","dude/dudes","elf/elves","man/men","woman/women","lady/ladies","baby/babies"];
dic.noun.sex=["handcuff/handcuffs","garden hose/garden hoses","cuntrocket/cuntrockets","micropenis/micropenises","cuntwaffle/cuntwaffles","blue waffle/blue waffles","dildo/dildos","double dildo/double dildos","dinocock/dinococks","pussy/pussies","vagflap/vagflaps","cuntflap/cuntflaps","cunt/cunts","anus/anuses","sphincter/sphincters","tit/tits","taint/taints","foreskin/foreskins","goatse/goatses","boob/boobs","boner/boners","dick/dicks","cock/cocks","ballsack/ballsacks","testicle/testicles","scrotum/scrotums","penis/penises","vagina/vaginas","pussy/pussies","willy/willies","prick/pricks","manhood/manhoods"];
dic.noun.weapon=["musket/muskets","wheelbarrow/wheelbarrows","needle/needles","pipe/pipes","lawn mower/lawn mowers","lampstand/lampstands","bottle/bottles","brick/bricks","cleat/cleats","dagger/daggers","horsewhip/horsewhips","nail/nails","bullet/bullets","razor/razors","arrow/arrows","dart/darts","pencil/pencils","telephone pole/telephone poles","torch/torches","broomstick/broomsticks","baton/batons","drill/drills","pickaxe/pickaxes","fork/forks","shovel/shovels","chainsaw/chainsaws","bomb/bombs","sword/swords","spear/spears","stapler/staplers","pitchfork/pitchforks","machete/machetes","flamethrower/flamethrowers","stun gun/stun guns","shotgun/shotguns","harpoon/harpoons","battering ram/battering rams"];
dic.noun.animal=["bass/basses","tuna/tuna","salmon/salmon","leech/leeches","squid/squids","octopus/octopi","velociraptor/velociraptors","tyrannosaurus rex/tyrannosaurus rexes","sphinx/sphinxes","viking/vikings","tadpole/tadpoles","skunk/skunks","seagull/seagulls","parrot/parrots","weasel/weasels","mammoth/mammoths","bat/bats","landlord/landlords","moose/moose","frog/frogs","toad/toads","ant/ants","chihuahua/chihuahuas","deer/deer","rat/rats","cat/cats","mayor/mayors","flamingo/flamingos","turtle/turtles","blowfish/blowfish","anaconda/anacondas","fish/fishes","owl/owls","otter/otters","lemur/lemurs","bull/bulls","chicken/chickens","peacock/peacocks","gorilla/gorillas","dove/doves","pony/ponies","squirrel/squirrels","horse/horses","donkey/donkeys","baboon/baboon","cockroach/cockroaches","butler/butlers","yeti/yetis","demon/demons","devil/devils","ogre/ogres","goat/goats","llama/llamas","porcupine/porcupines","tiger/tigers","lion/lions","wolf/wolves","hyena/hyenas","titan/titans","lizard/lizards","hedgehog/hedgehogs","zebra/zebras","quokka/quokkas","newt/newts","vulture/vultures","yak/yaks","jaguar/jaguars","xerus/xeruses","dog/dogs","bulldog/bulldogs","beagle/beagles","poodle/poodles","rottweiler/rottweilers","grasshopper/grasshoppers","locust/locusts","cricket/crickets","beetle/beetles","bitch/bitches"];
dic.noun.tool=["wheelbarrow/wheelbarrows","robot/robots","lawn mower/lawn mowers","horsewhip/horsewhips","razor/razors","arrow/arrows","pencil/pencils","drill/drills","iron maiden/iron maidens","leaf blower/leaf blowers","pickaxe/pickaxes","pistol/pistols","spoon/spoons","fork/forks","blender/blenders","squeegee/squeegees","shovel/shovels","loincloth/loincloths","nutcracker/nutcrackers","hammer/hammers","chainsaw/chainsaws","microscope/microscopes","pot/pots","pan/pans","screwdriver/screwdrivers","jackhammer/jackhammers","jockstrap/jockstraps","hacksaw/hacksaws","ladder/ladders","shopping cart/shopping carts","bomb/bombs","firecracker/firecrackers","drug/drugs","sword/swords","spear/spears","cattle prod/cattle prods","vacuum/vacuums","wrench/wrenches","phone/phones","can opener/can openers","stapler/staplers","pitchfork/pitchforks","blowtorch/blowtorches","machete/machetes","rumpus/rumpuses","flamethrower/flamethrowers","garden hose/garden hoses","wand/wands","stun gun/stun guns","bunsen burner/bunsen burners","battering ram/battering rams","nipple clamp/nipple clamps","butthair/butthairs"];
dic.noun.food=["bread/bread","prune/prunes","grape/grapes","kumquat/kumquats","tuna/tuna","hazelnut/hazelnuts","walnut/walnuts","almond/almonds","onion/onions","grapefruit/grapefruits","peanut/peanuts","potato/potatoes","apricot/apricots","meatloaf/meatloaves","spinach/spinach","pretzel/pretzels","cornflake/cornflakes","corn/corns","marshmallow/marshmallows","salmon/salmon","fudge/fudge","biscuit/biscuits"];
dic.noun.drug=["cocaine/cocaine","LSD/LSD","PCP/PCP","mescaline/mescaline","marijuana/marijuana","meth/meth","crack/crack","roofie/roofies","heroin/heroin","smack/smack","shroom/shrooms","bath salts/bath salts","extacy/extacy"];
dic.noun.article=["bra/bras","vest/vests","boot/boots","zipper/zippers","sock/socks","shoe/shoes","slipper/slippers","pants/pants","sweatshirt/sweatshirts","kilt/kilts","belt/belts","skirt/skirts","girdle/girdles","pantaloons/pantaloons","shirt/shirts","dress/dresses","jacket/jackets","hat/hats","top hat/top hats","underwear/underwear","tuxedo/tuxedoes","suit/suits","boxers/boxers","panties/panties","thong/thongs"];
dic.noun.fruit=["prune/prunes","grape/grapes","kumquat/kumquats","grapefruit/grapefruits","apricot/apricots","apple/apples","lime/limes","orange/oranges","lemon/lemons","watermelon/watermelons","pineapple/pineapples","coconut/coconuts","blueberry/blueberries","strawberry/strawberries","raspberry/raspberries","tangerine/tangerines","kiwi/kiwis","grape/grapes","tomato/tomatoes","nectarine/nectarines","baby/babies"];
dic.noun.container=["garbage can/garbage cans","bottle/bottles","barrel/barrels","coffin/coffins","pickle jar/pickle jars","package/packages","cup/cups","wallet/wallets","glass/glasses","shot glass/shot glasses","bowl/bowls","container/containers","flask/flasks","bottle/bottles","pitcher/pitchers","pipe/pipes","bong/bongs","pouch/pouches","purse/purses","pocket/pockets","jar/jars","suitcase/suitcases","box/boxes","trunk/trunks","package/packages","case/cases","packet/packets","cell/cells","test tube/test tubes","vial/vials","vat/vats","pot/pots","turkey baster/turkey basters","trashcan/trashcans","drawer/drawers","chest/chests","well/wells","kettle/kettles","bag/bags","balloon/balloons","sack/sacks","basket/baskets","carton/cartons","oven/ovens","tub/tubs","toilet/toilets","freezer/freezers","skillet/skillets"];
dic.noun.furniture=["chair/chairs","bed/beds","chair/chairs","desk/desks","coffee table/coffee tables","couch/couches","recliner/recliners","lawn chair/lawn chairs","rocking chair/rocking chairs","nightstand/nightstands"];
dic.noun.instrument=["piano/pianos","trombone/trombones","accordion/accordions","flute/flutes","clarinet/clarinets","trumpet/trumpets"];
dic.noun.plant=["pumpkin/pumpkins","fern/ferns","maple tree/maple trees","thistle/thistles","daisy/daisies","stinging nettle/stinging nettles","dandelion/dandelions","tulip/tulips","clover/clovers","marigold/marigolds","hedge/hedges"];
dic.noun.shape=["square/squares","triangle/triangles","oval/ovals","circle/circles"];
dic.noun.ball=["basketball/basketballs","baseball/baseballs","beach ball/beach balls","tennis ball/tennis balls","boulder/boulders","meatball/meatballs","golf ball/golf balls"];
dic.noun.surface=["floor/floors","wall/walls","ceiling/ceilings","patio/patios","bed/beds","bedsheet/bedsheets","window/windows","door/doors","chair/chairs","carpet/carpets","desk/desks","roof/roofs","tabletop/tabletops"];
dic.noun.liquid=["saliva/saliva","tar/tar","water/water","soup/soups","soap/soaps","slime/slime","bleach/bleach","pudding/puddings","lotion/lotions","sauce/sauces","earwax/earwax","snot/snots","sweat/sweats","acid/acids","wine/wines","oil/oils","olive oil/olive oil","urine/urine","diarrhea/diarrhea","beer/beers","rain/rains","toothpaste/toothpastes","yogurt/yogurts","cream/creams","grease/grease","vodka/vodka"];
dic.noun.long=["toothpick/toothpicks","turd/turds","rocket/rockets","flute/flutes","clarinet/clarinets","trumpet/trumpets","arrow/arrows","dart/darts","pencil/pencils","cigarette/cigarettes","pickle/pickles","ruler/rulers","cucumber/cucumbers","staple/staples","panhandle/panhandles","telephone pole/telephone poles","extension cord/extension cords","candle/candles","tree/trees","knife/knives","torch/torches","broom/brooms","broomstick/broomsticks","pole/poles","crack pipe/crack pipes","lightbulb/lightbulbs","umbrella/umbrellas","cannon/cannons","sausage/sausages","chain/chains","banana/bananas","plunger/plungers","spork/sporks","toothbrush/toothbrushes","banister/banisters","baton/batons","drill/drills","spoon/spoons","fork/forks","shovel/shovels","hammer/hammers","screwdriver/screwdrivers","jackhammer/jackhammers","sword/swords","spear/spears","wrench/wrenches","pitchfork/pitchforks","blowtorch/blowtorches","machete/machetes","flamethrower/flamethrowers","garden hose/garden hoses","snake/snakes","umbilical cord/umbilical cords","leg/legs","tentacle/tentacles","tongue/tongues","finger/fingers","wand/wands","bunsen burner/bunsen burners","jalapeno/jalapenos","shotgun/shotguns","harpoon/harpoons","silo/silos","battering ram/battering rams","double dildo/double dildos","boner/boners","dick/dicks","cock/cocks","penis/penises","willy/willies","prick/pricks","manhood/manhoods"];
dic.noun.dog=["dog/dogs","bulldog/bulldogs","beagle/beagles","poodle/poodles","rottweiler/rottweilers"];
dic.noun.job=["carpenter/carpenters","reporter/reporters","journalist/journalists","guitarist/guitarists","archaeologist/archaeologists","urologist/urologists","circus performer/circus performers","juggler/jugglers","explorer/explorers","artist/artists","mechanic/mechanics","hunter/hunters","spelunker/spelunkers","bartender/bartenders","accountant/accountants","movie star/movie stars","mailman/mailmen","construction worker/construction workers","principal/principals","prince/princes","princess/princesses","surgeon/surgeons","gambler/gamblers","dentist/dentists","chef/chefs","celebrity/celebrities","waitress/waitresses","burglar/burglars","waiter/waiters","doctor/doctors","nurse/nurses","lawyer/lawyers","butler/butlers","actor/actors","athlete/athletes","babysitter/babysitters","golfer/golfers","vampire/vampires","fireman/firemen","rapper/rappers","gangster/gangsters","hippie/hippies","clown/clowns","banker/bankers","pianist/pianists","politician/politicians","president/presidents","magician/magicians","stock broker/stock brokers","cop/cops","sky diver/sky divers","snake charmer/snake charmers","fortune teller/fortune tellers","serial killer/serial killers","plumber/plumbers","FBI agent/FBI agents","assassin/assassins","wizard/wizards","salesman/salesmen","singer/singers","policeman/policemen","physician/physicians","paramedic/paramedics","ninja/ninjas","teacher/teachers","senator/senators","scientist/scientists","constable/constables","taxidermist/taxidermists","biologist/biologists","pope/popes","bachelor/bachelors","haberdasher/haberdashers","armorer/armorers","tanner/tanners","hobbit/hobbits","pirate/pirates","stripper/strippers","hooker/hookers","pornstar/pornstars"];
dic.noun.round=["kidney/kidneys","golf ball/golf balls","tit/tits","boob/boobs"];
dic.noun.clothes=["boot/boots","zipper/zippers","sock/socks","shoe/shoes","slipper/slippers"];
dic.noun.vehicle=["train/trains","minivan/minivans","semi/semis","hot rod/hot rods","truck/trucks","boat/boats","submarine/submarines","aircraft carrier/aircraft carriers","airplane/airplanes","blimp/blimps","motorcycle/motorcycles"];
dic.noun.insect=["grasshopper/grasshoppers","locust/locusts","cricket/crickets","beetle/beetles"];
dic.noun.nsfw=["shit/shits","poo-poo/poo-poos","yeast/yeast infections","poop/poops","motherfucker/motherfuckers"];
dic.noun.all=["wedgie/wedgies","zygote/zygotes","fetus/fetuses","peninsula/peninsulas","truth/truths","pedestrian/pedestrians","disco ball/disco balls","rotisserie/rotisseries","pizza/pizzas","caboose/cabooses","frosting/frostings","giblet/giblets","avocado/avocados","banjo/banjos","bingo/bingos","nickel/nickels","dime/dimes","penny/pennies","cheeseburger/cheeseburgers","sponge/sponges","popsicle/popsicles","credit card/credit cards","truffle/truffles","gearshift/gearshifts","ghost/ghosts","ridge/ridges","meat/meats","dictionary/dictionaries","asymptote/asymptotes","peppermint/peppermints","candy cane/candy canes","bulge/bulges","lump/lumps","garden/gardens","treasure/treasures","scuba/scubas","football/footballs","dollar bill/dollar bills","log/logs","chicken wing/chicken wings","pylon/pylons","card/cards","rock/rocks","book/books","rabies/rabies","fan/fans","eraser/erasers","fart/farts","booger/boogers","monster/monsters","nerd/nerds","lemonade/lemonades","cramp/cramps","doodle/doodles","stone/stones","waffle/waffles","jelly bean/jelly beans","sofa/sofas","muffin/muffins","ragamuffin/ragamuffins","puppet/puppets","swag/swag","magnifying glass/magnifying glasses","diaper/diapers","dishrag/dishrags","money/money","car/cars","flowerpot/flowerpots","sharpie/sharpies","carcass/carcasses","raisin/raisins","grass/grasses","manure/manure","carpet/carpets","earwax/earwax","fog/fogs","hemorroid/hemorroids","cork/corks","mirror/mirrors","urinal/urinals","ventricle/ventricles","cement/cement","shrub/shrubs","laptop/laptops","wall/walls","globe/globes","kite/kites","radish/radishes","scab/scabs","leaf/leaves","bench/benches","rubber/rubbers","feces/feces","snorkel/snorkels","cocktail/cocktails","papaya/papayas","hole/holes","dynamite/dynamites","kettle/kettles","enigma/enigmas","keyboard/keyboards","lube/lubes","mask/masks","duct tape/duct tape","button/buttons","tuber/tubers","joint/joints","horseradish/horseradishes","cabbage/cabbages","wool/wool","tea bag/tea bags","teapot/teapots","canister/canisters","battery/batteries","clock/clocks","plug/plugs","towel/towels","towelette/towelettes","moist towelette/moist towelettes","cuckoo/cuckoos","doll/dolls","tampon/tampons","loaf/loaves","manhole/manholes","basket/baskets","pope/popes","flapjack/flapjacks","ointment/ointments","wrinkle/wrinkles","hubcap/hubcaps","wig/wigs","constitution/constitutions","mohawk/mohawks","dingleberry/dingleberries","teddy bear/teddy bears","tire/tires","shuttlecock/shuttlecocks","Communist/Communists","Democrat/Democrats","Republican/Republicans","president/presidents","anthill/anthills"].concat(dic.noun.body,dic.noun.hole,dic.noun.person,dic.noun.sex,dic.noun.weapon,dic.noun.animal,dic.noun.tool,dic.noun.food,dic.noun.drug,dic.noun.article,dic.noun.fruit,dic.noun.container,dic.noun.furniture,dic.noun.instrument,dic.noun.plant,dic.noun.shape,dic.noun.ball,dic.noun.surface,dic.noun.liquid,dic.noun.long,dic.noun.dog,dic.noun.job,dic.noun.round,dic.noun.clothes,dic.noun.vehicle,dic.noun.insect);
dic.noun.subs=["singular","plural"];
dic.noun.filters=["body","hole","person","sex","weapon","animal","tool","food","drug","article","fruit","container","furniture","instrument","plant","shape","ball","surface","liquid","long","dog","job","round","clothes","vehicle","insect","nsfw"];
var place={};
dic.place=place;
dic.place.building=["palace/palaces","jail/jails","tomb/tombs","coffeeshop/coffeeshops","tower/towers","stable/stables","barn/barns","mansion/mansions","castle/castles","stadium/stadiums","school/schools","mall/malls","store/stores","shanty/shanties","prison/prisons","shack/shacks","tent/tents","outhouse/outhouses","cottage/cottages","asylum/asylums","bar/bars","pub/pubs","nightclub/nightclubs","factory/factories","firehouse/firehouses","safehouse/safehouses","warehouse/warehouses","bomb shelter/bomb shelters","homeless shelter/homeless shelters","church/churches","distillery/distilleries","conservatory/conservatories","morgue/morgues","funeral home/funeral homes","courthouse/courthouses","theater/theaters","studio/studios","fort/forts","nursery/nurseries","library/libraries","hospital/hospitals","hostel/hostels","hotel/hostels","post office/post offices","laboratory/laboratories"];
dic.place.indoor=["palace/palaces","classroom/classrooms","nest/nests","office/offices","ditch/ditches","cave/caves","house/houses","bathroom/bathrooms","bedroom/bedrooms","town/towns","jail/jails","shop/shops","tomb/tombs","basement/basements","dungeon/dungeons","coffeeshop/coffeeshops","tower/towers","stable/stables","barn/barns","mansion/mansions","castle/castles","attic/attics","cage/cages","stadium/stadiums","school/schools","mall/malls","store/stores","stand/stands","company/companies","land/lands","garden/gardens","wonderland/wonderlands","abyss/abysses","shanty/shanties","prison/prisons","apartment/apartments","closet/closets","shack/shacks","tent/tents","car/cars","van/vans","alley/alleys","forest/forests","meadow/meadows","outhouse/outhouses","boat/boats","port-a-potty/port-a-potties","sauna/saunas","cottage/cottages","bank/banks","asylum/asylums","arcade/arcades","bar/bars","pub/pubs","nightclub/nightclubs","factory/factories","station/stations","firehouse/firehouses","safehouse/safehouses","warehouse/warehouses","bomb shelter/bomb shelters","homeless shelter/homeless shelters","firetruck/firetrucks","ambulance/ambulances","kitchen/kitchens","church/churches","distillery/distilleries","conservatory/conservatories","morgue/morgues","funeral home/funeral homes","courthouse/courthouses","trailer/trailers","theater/theaters","studio/studios","ring/rings","fort/forts","nursery/nurseries","library/libraries","hospital/hospitals","hostel/hostels","hotel/hostels","sanctuary/sanctuaries","bus/buses","post office/post offices","skyway/skyways","opera/operas","laboratory/laboratories","garage/garages","festival/festivals","carnival/carnivals","dispensary/dispensaries"];
dic.place.natural=["nest/nests","ditch/ditches","cave/caves","land/lands","forest/forests","meadow/meadows","beach/beaches","mountain/mountains","hill/hills","hilltop/hilltops","lakeside/lakesides","grassy plain/grassy plains","crater/craters","valley/valleys","volcano/volcanoes","island/islands","wasteland/wastelands"];
dic.place.outdoor=["beach/beaches","highway/highways","mountain/mountains","hill/hills","railroad/railroads","road/roads","hilltop/hilltops","park/parks","lakeside/lakesides","grassy plain/grassy plains","crater/craters","valley/valleys","volcano/volcanoes","island/islands","farm/farms","rooftop/rooftops","dance floor/dance floors","graveyard/graveyards","cemetary/cemetaries","field/fields","street/streets","battlefield/battlefields","wasteland/wastelands","playground/playgrounds","amusement park/amusement parks"];
dic.place.all=[].concat(dic.place.building,dic.place.indoor,dic.place.natural,dic.place.outdoor);
dic.place.subs=["singular","plural"];
dic.place.filters=["building","indoor","natural","outdoor"];
var prefix={};
dic.prefix=prefix;
dic.prefix.position=["pre","post","extra","intra","endo","mid","under","over"];
dic.prefix.quantity=["bi","tri","quad","octo","penta","mono"];
dic.prefix.scale=["micro","macro"];
dic.prefix.anatomy=["cardio","neuro"];
dic.prefix.all=["mega","exo","a","anti","un","in","pseudo","pyro","super","mini","psycho","trans","fore","semi","mis","non","auto","circum","contra","homo","hyper","sub","omni","uni"].concat(dic.prefix.position,dic.prefix.quantity,dic.prefix.scale,dic.prefix.anatomy);
dic.prefix.subs=["default"];
dic.prefix.filters=["position","quantity","scale","anatomy"];
var prepos={};
dic.prepos=prepos;
dic.prepos.space=["aboard","about","above","across","against","along","amid","among","around","as","at","behind","below","beneath","beside","besides","between","beyond","by","down","from","in","inside","into","near","of","off","on","onto","opposite","outside","over","past","round","through","to","toward","towards","under","underneath","up","upon","versus","via","with","within","without"];
dic.prepos.time=["after","before","during","despite","following","for","until","since","regarding"];
dic.prepos.all=[].concat(dic.prepos.space,dic.prepos.time);
dic.prepos.subs=["default"];
dic.prepos.filters=["space","time"];
var preposition={};
dic.preposition=preposition;
dic.preposition.all=["with","without","alongside","inside of","using","with the help of"].concat();
dic.preposition.subs=["default"];
dic.preposition.filters=[];
var pron={};
dic.pron=pron;
dic.pron.male=["him/he/himself/his/his"];
dic.pron.female=["her/she/herself/her/hers"];
dic.pron.neutral=["it/it/itself/its/its"];
dic.pron.all=[].concat(dic.pron.male,dic.pron.female,dic.pron.neutral);
dic.pron.subs=["acc","nom","self","poss","s"];
dic.pron.filters=["male","female","neutral"];
var quality={};
dic.quality=quality;
dic.quality.physical=["speed/faster/slower/fastest","size/bigger/smaller/biggest","wetness/wetter/drier/wettest","force/harder/softer/hardest","weight/heavier/lighter/heaviest","color/more colorful/duller/most colorful","luminosity/brighter/darker/brightest","power level/more powerful/weaker/most powerful","height/taller/shorter/tallest","length/longer/shorter/longest","width/wider/skinnier/widest","girth/girthier/less girthy/girthiest"];
dic.quality.human=["race/racier/less racier/raciest","age/older/younger/oldest","gender/sexier/more gender neutral/sexiest","ethnicity/more ethnic/less ethnic/most ethnic","honesty/more thuthful/less truthful/most truthful"];
dic.quality.all=[].concat(dic.quality.physical,dic.quality.human);
dic.quality.subs=["property","more","less","est"];
dic.quality.filters=["physical","human"];
var rel={};
dic.rel=rel;
dic.rel.male=["brother/brothers","father/fathers","grandpa/grandpas","uncle/uncles","boyfriend/boyfriends","husband/husbands","stepfather/stepfathers","godfather/godfathers","son/sons","grandson/grandsons","boy/boys","man/men","daddy/daddies"];
dic.rel.female=["mommy/mommies","sister/sisters","mother/mothers","grandma/grandmas","stepmother/stepmothers","aunt/aunts","girlfriend/girlfriends","wife/wives","daughter/daughters","granddaughter/granddaughters","girl/girls","woman/women"];
dic.rel.neutral=["friend/friends","cousin/cousins","colleague/colleagues","boss/bosses","master/masters","buddy/buddies","child/children","baby/babies","fella/fellas"];
dic.rel.all=[].concat(dic.rel.male,dic.rel.female,dic.rel.neutral);
dic.rel.subs=["singular","plural"];
dic.rel.filters=["male","female","neutral"];
var say={};
dic.say=say;
dic.say.all=["say/saying/said/says/sayer/said/saying","shoot/shooting/shot/shoots/shooter/shot/shooting","call/calling/called/calls/caller/called/calling","croak/croaking/croaked/croaks/croaker/croaked/croaking","cry/crying/cried/cries/cryer/cried/crying","whimper/whimpering/whimpered/whimpers/whimperer/whimpered/whimpering","mumble/mumbling/mumbled/mumbles/mumbler/mumbled/mumbling","scream/screaming/screamed/screams/screamer/screamed/screaming","shriek/shrieking/shrieked/shrieks/shrieker/shrieked/shrieking","moan/moaning/moaned/moans/moaner/moaned/moaning","shout/shouting/shouted/shouts/shouter/shouted/shouting","yell/yelling/yelled/yells/yeller/yelled/yelling","wail/wailing/wailed/wails/wailer/wailed/wailing","swear/swearing/swore/swears/swearer/sworn/swearing","bawl/bawling/bawled/bawls/bawler/bawled/bawling","snap/snapping/snapped/snaps/snapper/snapped/snapping","whisper/whispering/whispered/whispers/whisperer/whispered/whispering","cackle/cackling/cackled/cackles/cackler/cackled/cackling","grunt/grunting/grunted/grunts/grunter/grunted/grunting","roar/roaring/roared/roars/roarer/roared/roaring","snort/snorting/snorted/snorts/snorter/snorted/snorting","whine/whining/whined/whines/whiner/whined/whining","screech/screeching/screeched/screeches/screecher/screeched/screeching","squeal/squealing/squealed/squeals/squealer/squealed/squealing","hoot/hooting/hooted/hoots/hooter/hooted/hooting","ejaculate/ejaculating/ejaculated/ejaculates/ejaculator/ejaculated/ejaculation","squelch/squelching/squelched/squelches/squelcher/squelched/squelching","spit/spitting/spat/spits/spitter/spat/spitting","declare/declaring/declared/declares/declarer/declared/declaration","breathe/breathing/breathed/breathes/breather/breathed/breathing","announce/announcing/announced/announces/announcer/announced/announcing","snicker/snickering/snickered/snickers/snickerer/snickered/snickering","beep/beeping/beeped/beeps/beeper/beeped/beeping","exclaim/exclaiming/exclaimed/exclaims/exclaimer/exclaimed/exclamation","burp/burping/burped/burps/burper/burped/burping","laugh/laughing/laughed/laughs/laugher/laughed/laughter","mutter/muttering/muttered/mutters/mutterer/muttered/muttering","hiss/hissing/hissed/hisses/hisser/hissed/hissing"].concat();
dic.say.subs=["simple","ing","ed","s","er","pp","noun"];
dic.say.filters=[];
var sconj={};
dic.sconj=sconj;
dic.sconj.all=["after","although","as","as if","as long as","as much as","as soon as","as though","because","before","even","even if","even though","if","if only","if when","if then","inasmuch","in order that","just as","lest","now","now since","now that","now when","once","provided","provided that","rather than","since","so that","supposing","than","that","though","til","unless","until","when","whenever","where","whereas","where if","wherever","whether","which","while","who","whoever","why"].concat();
dic.sconj.subs=["default"];
dic.sconj.filters=[];
var sound={};
dic.sound=sound;
dic.sound.all=["bang/bangs","squelch/squelches","squeal/squeals","boom/booms","beep/beeps","crash/crashes","wail/wails","roar/roars","shatter/shatters","pop/pops","note/notes","thump/thumps","rumble/rumbles","scrape/scrapes","screech/screeches","flap/flaps","flutter/flutters","swoosh/swooshes","pound/pounds","slap/slaps","clang/clangs","toot/toots","tick/ticks","foom/fooms","rap/raps","tap/taps","shudder/shudders","crack/cracks"].concat();
dic.sound.subs=["singular","plural"];
dic.sound.filters=[];
var substance={};
dic.substance=substance;
dic.substance.liquid=["water","vomit","orange juice","sweat","blood","lava","gasoline","oil","molten iron","grease","tears","ketchup","mustard","mayonnaise","soy sauce","beer","wine","vodka","olive oil","extra-virgin olive oil","vinegar","paint","liquid nitrogen","tomato sauce","ink","lemonade","sap","plasma","acid","magma","cum","lube","crotch juice","pee","piss","pisswater","diarrhea","jizz","urine"];
dic.substance.nsfw=["happiness","dick cheese"];
dic.substance.all=["sand","earwax","oatmeal","spaghetti","flour","dark matter","antimatter","corn","snow"].concat(dic.substance.liquid);
dic.substance.subs=["default"];
dic.substance.filters=["liquid","nsfw"];
var surname={};
dic.surname=surname;
dic.surname.all=["Pollock","Washington","Hayne","Machler","Kaye","Murdock","Dick","Johnson","Jackson","Anderson","Smith","Bingley","Presley","Olson","Pederson","Clark","Stark","Lee","Meyer","Palin","Shaw","Andrews","Sampson","Mueller","Allan","Underwood","Cyrus","Harris","Lewis","Phillips","Thompson","Miller","Pratt","Griff","Wright","Jones","Brown","Davis","Wilson","Moore","Taylor","Thomas","White","Martin","Garcia","Martinez","Robinson","Rodriguez","Walker","Hall","Allen","Young","Hernandez","Underthun","Werdal","King","Lopez","Hill","Green","Adams","Baker","Gonzalez","Nelson","Carter","Mitchell","Roberts","Turner","Campbell","Parker","Evans","Edwards","Collins","Stewart","Sanchez","Morris","Rogers","Reed","Cook","Morgan","Bell","Murphy","Bailey","Rivera","Cooper","Richardson","Sterling","Cox","Howard","Ward","Torres","Gray","Watson","Brooks","Kelly","Sanders","Price","Bennett","Wood","Ross","Jenkins","Perry","Long","Butler","Simmons","Russell","Bryant","McDonald","Little","Jacobs","Wang","Schroeder","Hartman","Woodard","Kemp","Glenn","Baxter","Bond","Nixon","Strong","Hurst","Farrell","Roth","Prince","Serrano","Glass","Knox","Randolph","Maynard","Foley","Chang","Bauer","Rivers","Walls","Sexton","Gentry","Leon","Barron","Estes","Middleton","Best","Dudley","Herman","Pennington","Solomon","Kerr","Chen","Blackburn","Gay","Avery","Hendricks","Barry","Horne","Meadows","Velentine","Church","Russo","Benton","Howe","Hinton","Tillman","Key","Peck","Morin","Gamble","Bentley","Stout","Petty","Osborn","Joyner","Rosario","Stein","Huber","Vanyo","Guthrie","Noel","Vang","Cooke","Wooten","Forbes","Hewitt"].concat();
dic.surname.subs=["default"];
dic.surname.filters=[];
var timeadv={};
dic.timeadv=timeadv;
dic.timeadv.time=["at sunrise","a month ago","a week ago","a day ago","an hour ago","a year ago","millions of years ago","billions of years ago","trillions of years ago","today","tonight","presently","now","just 5 minutes ago","5 minutes later","1 hour later","1 day later","1 week later","1 month later","6 months later","a year later","5 years later","10 years later","at the full moon","at sunset","later","recently"];
dic.timeadv.past=["a month ago","a week ago","a day ago","an hour ago","a year ago","millions of years ago","billions of years ago","trillions of years ago","just 5 minutes ago"];
dic.timeadv.present=["today","tonight","presently","now"];
dic.timeadv.frequency=["once again","never again","instantly","usually","yesterday","sometimes","occasionally","often","once in a while","never","frequently","once a week","daily","once a month","again","repeatedly","all the time","hardly","barely","several times","every night","this time","biweekly","centenially","every now and then","from now on","until further notice","for 10 weeks","for 36 hours","on Mondays","every Tuesday","profusely","perpetually"];
dic.timeadv.all=[].concat(dic.timeadv.time,dic.timeadv.past,dic.timeadv.present,dic.timeadv.frequency);
dic.timeadv.subs=["default"];
dic.timeadv.filters=["time","past","present","frequency"];
var timenoun={};
dic.timenoun=timenoun;
dic.timenoun.timeofday=["dawn/dawns","morning/mornings","noon/noons","day/days","afternoon/afternoons","evening/evenings","dusk/dusks","night/nights","midnight/midnights"];
dic.timenoun.dayofweek=["Sunday/Sundays","Monday/Mondays","Tuesday/Tuesdays","Wednesday/Wednesdays","Thursday/Thursdays","Friday/Fridays","Saturday/Saturdays"];
dic.timenoun.month=["January/Januaries","February/Februaries","March/Marches","April/Aprils","May/Mays","June/Junes","July/Julies","August/Augusts","September/Septembers","October/Octobers","November/Novembers","December/Decembers"];
dic.timenoun.holiday=["New Year's Eve/New Year's Eves","New Year's Day/New Year's Days","Valentine's Day/Valentine's Days","Easter/Easters","Labor Day/Labor Days","Halloween/Halloweens","Thanksgiving/Thanksgivings","Christmas/Christmasses","Hanukkah/Hanukkahs","Black Friday/Black Fridays","Kwanzaa/Kwanzaas","Boxing Day/Boxing Days","Labor Day/Labor Days","Father's Day/Father's Days","Mother's Day/Mother's Days","Groundhog Day/Groundhog Days"];
dic.timenoun.unit=["millisecond/milliseconds","second/seconds","minute/minutes","hour/hours","day/days","month/months","year/years","century/centuries"];
dic.timenoun.all=[].concat(dic.timenoun.timeofday,dic.timenoun.dayofweek,dic.timenoun.month,dic.timenoun.holiday,dic.timenoun.unit);
dic.timenoun.subs=["singular","plural"];
dic.timenoun.filters=["timeofday","dayofweek","month","holiday","unit"];
var title={};
dic.title=title;
dic.title.all=["Dr.","Sir","Honorable","Madam","King","Queen","Prince","Granny","Master","Mayor","Governor","Colonel","Sergeant","Daddy","Mama","Papa","Sensei","Dojo","Ms","Mrs.","Mr.","Mistress","Moist","Old","Professor"].concat();
dic.title.subs=["default"];
dic.title.filters=[];
var unit={};
dic.unit=unit;
dic.unit.length=["centimeter/centimeters/cm","meter/meters/m","kilometer/kilometers/km","inch/inches/in","foot/feet/ft","yard/yards/y","mile/miles/mi","light-year/light-years/ly"];
dic.unit.small=["centimeter/centimeters/cm","milliliter/milliliters/mL","millivolt/millivolts/mV","microfarad/microfarads/μF","milliampere/milliamperes/mA","milliwatt/milliwatts/mW"];
dic.unit.factor=["centimeter/centimeters/cm","kilometer/kilometers/km","kilogram/kilograms/kg","megaton/megatons/Mt","milliliter/milliliters/mL","kilopascal/kilopascals/kPa","millivolt/millivolts/mV","kilovolt/kilovolts/kV","microfarad/microfarads/μF","kilojoule/kilojoules/kJ","milliampere/milliamperes/mA","kilowatt/kilowatts/kW","milliwatt/milliwatts/mW","megawatt/megawatts/MW"];
dic.unit.large=["kilometer/kilometers/km","kilogram/kilograms/kg","megaton/megatons/Mt","kilopascal/kilopascals/kPa","kilovolt/kilovolts/kV","kilojoule/kilojoules/kJ","kilowatt/kilowatts/kW","megawatt/megawatts/MW"];
dic.unit.weight=["pound/pounds/lb","gram/grams/g","kilogram/kilograms/kg","ton/tons/t","megaton/megatons/Mt","ounce/ounces/oz"];
dic.unit.volume=["gallon/gallons/gal","bucket/buckets/bucket","liter/liters/L","teaspoon/teaspoons/tsp","cup/cups/c","quart/quarts/qt","pint/pints/pt","milliliter/milliliters/mL","tablespoon/tablespoons/tbsp","cubic centimeter/cubic centimeters/cc"];
dic.unit.pressure=["decibel/decibels/dB","pascal/pascals/Pa","kilopascal/kilopascals/kPa"];
dic.unit.energy=["volt/volts/V","millivolt/millivolts/mV","kilovolt/kilovolts/kV","farad/farads/F","microfarad/microfarads/μF","joule/joules/J","kilojoule/kilojoules/kJ","ampere/amperes/A","milliampere/milliamperes/mA","watt/watts/W","kilowatt/kilowatts/kW","milliwatt/milliwatts/mW","megawatt/megawatts/MW","henry/henries/H"];
dic.unit.potential=["volt/volts/V","millivolt/millivolts/mV","kilovolt/kilovolts/kV"];
dic.unit.capacitance=["farad/farads/F","microfarad/microfarads/μF"];
dic.unit.current=["ampere/amperes/A","milliampere/milliamperes/mA"];
dic.unit.power=["watt/watts/W","kilowatt/kilowatts/kW","milliwatt/milliwatts/mW","megawatt/megawatts/MW"];
dic.unit.inductance=["henry/henries/H"];
dic.unit.all=[].concat(dic.unit.length,dic.unit.small,dic.unit.factor,dic.unit.large,dic.unit.weight,dic.unit.volume,dic.unit.pressure,dic.unit.energy,dic.unit.potential,dic.unit.capacitance,dic.unit.current,dic.unit.power,dic.unit.inductance);
dic.unit.subs=["singular","plural","abbr"];
dic.unit.filters=["length","small","factor","large","weight","volume","pressure","energy","potential","capacitance","current","power","inductance"];
var verb={};
dic.verb=verb;
dic.verb.emotion=["love/loving/loved/loves/lover/loved/loving","hate/hating/hated/hates/hater/hated/hating"];
dic.verb.transitive=["invigorate/invigorating/invigorated/invigorates/invigorator/invigorated/invigoration","extrapolate/extrapolating/extrapolated/extrapolates/extrapolator/extrapolated/extrapolation","extrude/extruding/extruded/extrudes/extruder/extruded/extruding","articulate/articulating/articulated/articulates/articulator/articulated/articulation","transcribe/transcribing/transcribed/transcribes/transcriber/transcribed/transcribing","draft/drafting/drafted/drafts/drafter/drafted/drafting","tune/tuning/tuned/tunes/tuner/tuned/tunings","withdraw/withdrawing/withdrew/withdraws/withdrawer/withdrawn/withdrawing","zip/zipping/zipped/zips/zipper/zipped/zipping","extend/extending/extended/extends/extender/extended/extending","streamline/streamlining/streamlined/streamlines/streamliner/streamlined/streamlining","organize/organizing/organized/organizes/organizer/organized/organization","quantify/quantifying/quantified/quantifies/quantifier/quantified/quantification","grate/grating/grated/grates/grater/grated/grating","tape/taping/taped/tapes/taper/taped/taping","oil/oiling/oiled/oils/oiler/oiled/oiling","strap/strapping/strapped/straps/strapper/strapped/strapping","cultivate/cultivating/cultivated/cultivates/cultivater/cultivated/cultivation","discipline/disciplining/disciplined/disciplines/discipliner/disciplined/discipline","examine/examining/examined/examines/examiner/examined/examination","stew/stewing/stewed/stews/stewer/stewed/stewing","stir/stirring/stirred/stirs/stirrer/stirred/stirring","hug/hugging/hugged/hugs/hugger/hugged/hugging","pop/popping/popped/pops/popper/popped/popping","sanitize/sanitizing/sanitized/sanitizes/sanitizer/sanitized/sanitization","clean/cleaning/cleaned/cleans/cleaner/cleaned/cleaning","touch/touching/touched/touches/toucher/touched/touching","strain/straining/strained/strains/strainer/strained/straining","kill/killing/killed/kills/killer/killed/killing","gargle/gargling/gargled/gargles/gargler/gargled/gargling","crumple/crumpling/crumpled/crumples/crumpler/crumpled/crumpling","salt/salting/salted/salts/salter/salted/salting","season/seasoning/seasoned/seasons/seasoner/seasoned/seasoning","marinate/marinating/marinated/marinates/marinater/marinated/marination","pickle/pickling/pickled/pickles/pickler/pickled/pickling","polish/polishing/polished/polishes/polisher/polished/polishing","caress/caressing/caressed/caresses/caresser/caressed/caressing","stimulate/stimulating/stimulated/stimulates/stimulator/stimulated/stimulation","hunt/hunting/hunted/hunts/hunter/hunted/hunting","dishonor/dishonoring/dishonored/dishonors/dishonorer/dishonored/dishonoring","suckle/suckling/suckled/suckles/suckler/suckled/suckling","squeeze/squeezing/squeezed/squeezes/squeezer/squeezed/squeezing","infest/infesting/infested/infests/infester/infested/infestation","tap/tapping/tapped/taps/tapper/tapped/tapping","probe/probing/probed/probes/proper/probed/probing","blast/blasting/blasted/blasts/blaster/blasted/blasting","shave/shaving/shaved/shaves/shaver/shaved/shaving","wrinkle/wrinkling/wrinkled/wrinkles/wrinkler/wrinkled/wrinkling","kiss/kissing/kissed/kisses/kisser/kissed/kissing","cuddle/cuddling/cuddled/cuddles/cuddler/cuddled/cuddling","soak/soaking/soaked/soaks/soaker/soaked/soaking","grip/gripping/gripped/grips/gripper/gripped/gripping","jerk/jerking/jerked/jerks/jerker/jerked/jerking","scrub/scrubbing/scrubbed/scrubs/scrubber/scrubbed/scrubbing","mist/misting/misted/mists/mister/misted/misting","burn/burning/burned/burns/burner/burnt/burning","freeze/freezing/froze/freezes/freezer/frozen/freezing","dry-freeze/dry-freezing/dry-froze/dry-freezes/dry-freezer/dry-frozen/dry-freezing","bake/baking/baked/bakes/baker/baked/baking","deep-fry/deep-frying/deep-fried/deep-fries/deep-frier/deep-fried/deep-frying","swallow/swallowing/swallowed/swallows/swallower/swallowed/swallowing","flatten/flattening/flattened/flattens/flattener/flattened/flattening","glue/gluing/glued/glues/gluer/glued/gluing","rub/rubbing/rubbed/rubs/rubber/rubbed/rubbing","swipe/swiping/swiped/swipes/swiper/swiped/swiping","sculpt/sculpting/sculpted/sculpts/sculptor/sculpted/sculpture","iron/ironing/ironed/irons/ironer/ironed/ironing","roll/rolling/rolled/rolls/roller/rolled/rolling","slit/slitting/slit/slits/slitter/slit/slitting","cut/cutting/cut/cuts/cutter/cut/cutting","loosen/loosening/loosened/loosens/loosener/loosened/loosening","tighten/tightening/tightened/tightens/tightener/tightened/tightening","penetrate/penetrating/penetrated/penetrates/penetrator/penetrated/penetration","strike/striking/struck/strikes/striker/stricken/striking","recycle/recycling/recycled/recycles/recycler/recycled/recycling","groom/grooming/groomed/grooms/groomer/groomed/grooming","hypnotize/hypnotizing/hypnotized/hypnotizes/hypnotist/hypnotized/hypnosis","dig/digging/dug/digs/digger/dug/digging","crush/crushing/crushed/crushes/crusher/crushed/crushing","cook/cooking/cooked/cooks/cooker/cooked/cooking","massage/massaging/massaged/massages/massager/massaged/massage","toke/toking/toked/tokes/toker/toked/toking","pull/pulling/pulled/pulls/puller/pulled/pulling","yank/yanking/yanked/yanks/yanker/yanked/yanking","dice/dicing/diced/dices/dicer/diced/dicing","chop/chopping/chopped/chops/chopper/chopped/chopping","boil/boiling/boiled/boils/boiler/boiled/boiling","uproot/uprooting/uprooted/uproots/uprooter/uprooted/uprooting","clip/clipping/clipped/clips/clipper/clipped/clipping","stroke/stroking/stroked/strokes/stroker/stroked/stroking","plaster/plastering/plastered/plasters/plasterer/plastered/plastering","scrunch/scrunching/scrunched/scrunches/scruncher/scrunched/scrunching","superglue/supergluing/superglued/superglues/supergluer/superglued/supergluing","embrace/embracing/embraced/embraces/embracer/embraced/embrace","smoke/smoking/smoked/smokes/smoker/smoked/smoking","moisten/moistening/moistened/moistens/moistener/moistened/moisturization","flick/flicking/flicked/flicks/flicker/flicked/flicking","scorch/scorching/scorched/scorches/scorcher/scorched/scorching","scold/scolding/scolded/scolds/scolder/scolded/scolding","punish/punishing/punished/punishes/punisher/punished/punishment","handle/handling/handled/handles/handler/handled/handling","manipulate/manipulating/manipulated/manipulates/manipulator/manipulated/manipulation","exploit/exploiting/exploited/exploits/exploiter/exploited/exploitation","misuse/misusing/misused/misuses/misuser/misused/misuse","breastfeed/breastfeeding/breastfed/breastfeeds/breastfeeder/breastfed/breastfeeding","pillage/pillaging/pillaged/pillages/pillager/pillaged/pillaging","eliminate/eliminating/eliminated/eliminates/eliminater/eliminated/elimination","waste/wasting/wasted/wastes/waster/wasted/wasting","grind/grinding/grinded/grinds/grinder/ground/grinding","fight/fighting/fought/fights/fighter/fighted/fighting","stuff/stuffing/stuffed/stuffs/stuffer/stuffed/stuffing","eat/eating/ate/eats/eater/eaten/eating","suck/sucking/sucked/sucks/sucker/sucked/sucking","guzzle/guzzling/guzzled/guzzles/guzzler/guzzled/guzzling","sniff/sniffing/sniffed/sniffs/sniffer/sniffed/sniffing","nibble/nibbling/nibbled/nibbles/nibbler/nibbled/nibbling","spurt/spurting/spurted/spurts/spurter/spurted/spurting","smear/smearing/smeared/smears/smearer/smeared/smearing","paint/painting/painted/paints/painter/painted/painting","shower/showering/showered/showers/showerer/showered/showering","sputter/sputtering/sputtered/sputters/sputterer/sputtered/sputtering","drain/draining/drained/drains/drainer/drained/draining","splatter/splattering/splattered/splatters/splatterer/splattered/splattering","spray/spraying/sprayed/sprays/sprayer/sprayed/spraying","jet-spray/jet-spraying/jet-sprayed/jet-sprays/jet-sprayer/jet-sprayed/jet-spraying","squirt/squirting/squirted/squirts/squirter/squirted/squirting","sprinkle/sprinkling/sprinkled/sprinkles/sprinkler/sprinkled/sprinkling","drip/dripping/dripped/drips/dripper/dripped/dripping","piss/pissing/pissed/pisses/pisser/pissed/pissing","pour/pouring/poured/pours/pourer/poured/pouring","splash/splashing/splashed/splashes/splasher/splashed/splashing","sue/suing/sued/sues/suer/sued/suing","prosecute/prosecuting/prosecuted/prosecutes/prosecuter/prosecuted/prosecution","convict/convicting/convicted/convicts/convicter/convicted/conviction","legalize/legalizing/legalized/legalizes/legalizer/legalized/legalization","bathe/bathing/bathed/bathes/bather/bathed/bathing","cripple/crippling/crippled/cripples/crippler/crippled/crippling","customize/customizing/customized/customizes/customizer/customized/customization","decorate/decorating/decorated/decorates/decorator/decorated/decoration","feed/feeding/fed/feeds/feeder/fed/feeding","harass/harassing/harassed/harasses/harasser/harassed/harassment","hoist/hostng/hoisted/hoists/hoister/hoisted/hoisting","nab/nabbing/nabbed/nabs/nabber/nabbed/nabbing","nail/nailing/nailed/nails/nailer/nailed/nailing","preen/preening/preened/preens/preener/preened/preening","ride/riding/rode/rides/rider/ridden/riding","rob/robbing/robbed/robs/robber/robbed/robbery","sharpen/sharpening/sharpened/sharpens/sharpener/sharpened/sharpening","snuggle/snuggling/snuggled/snuggles/snuggler/snuggled/snuggling","donate/donating/donated/donates/donater/donated/donation","purify/purifying/purified/purifies/purifier/purified/purification","toast/toasting/toasted/toasts/toaster/toasted/toasting","liquidate/liquidating/liquidated/liquidates/liquidator/liquidated/liquidation","masticate/masticating/masticated/masticates/masticater/masticated/mastication","chew/chewing/chewed/chews/chewer/chewed/chewing","rotate/rotating/rotated/rotates/rotator/rotated/rotation","push/pushing/pushed/pushes/pusher/pushed/pushing","chill/chilling/chilled/chills/chiller/chilled/chilling","report/reporting/reported/reports/reporter/reported/reporting","plunge/plunging/plunged/plunges/plunger/plunged/plunging","ram/ramming/rammed/rams/rammer/rammed/ramming","vaporize/vaporizing/vaporized/vaporizes/vaporizer/vaporized/vaporization","bless/blessing/blessed/blesses/blesser/blessed/blessing","liquefy/liquefying/liquefied/liquefies/liquefier/liquefied/liquefication","shred/shredding/shredded/shreds/shredder/shredded/shredding","erect/erecting/erected/erects/erector/erected/erection","cockblast/cockblasting/cockflasted/cockblasts/cockblaster/cockblasted/cockblasting","fertilize/fertilizing/fertilized/fertilizes/fertilizer/fertilized/fertilization","please/pleasing/pleased/pleases/pleaser/pleasted/pleasing","thrust/thrusting/thrust/thrusts/thruster/thrusted/thrusting","mount/mounting/mounted/mounts/mounter/mounted/mounting","fuck/fucking/fucked/fucks/fucker/fucked/fucking","fellate/fellating/fellated/fellates/fellater/fellated/fellatio","titfuck/titfucking/titfucked/titucks/titfucker/titfucked/titfucking","turbohump/turbohumping/turbohumped/turbohumps/turbohumper/turbohumped/turbohumpification","grope/groping/groped/gropes/groper/groped/groping","defecate/defecating/defecated/defecates/defecator/defecated/defecation","finger/fingering/fingered/fingers/fingerer/fingered/fingering"];
dic.verb.walk=["snoop/snooping/snooped/snoops/snooper/snooped/snooping","joust/jousting/jousted/jousts/jouster/jousted/jousting","slouch/slouching/slouched/slouches/sloucher/slouched/slouching","walk/walking/walked/walks/walker/walked/walking","skip/skipping/skipped/skips/skipper/skipped/skipping","march/marching/marched/marches/marcher/marched/marching","run/running/ran/runs/runner/run/running","stampede/stampeding/stampeded/stampedes/stampeder/stampeded/stampeding","strut/strutting/strutted/struts/strutter/strutted/strutting","tiptoe/tiptoeing/tiptoed/tiptoes/tiptoer/tiptoed/tiptoeing","sprint/sprinting/sprinted/sprints/sprinter/sprinted/sprinting","gallop/galloping/galloped/gallops/galloper/galloped/galloping","crawl/crawling/crawled/crawls/crawler/crawled/crawling","trot/trotting/trotted/trots/trotter/trotted/trotting","sleepwalk/sleepwalking/sleepwalked/sleepwalks/sleepwalker/sleepwalked/sleepwalking"];
dic.verb.intransitive=["moan/moaning/moaned/moans/moaner/moaned/moaning","rustle/rustling/rustled/rustles/rustler/rustled/rustling","fiddle/fiddling/fiddled/fiddles/fiddler/fiddled/fiddling","hiccup/hiccuping/hiccuped/hiccups/hiccuper/hiccuped/hiccuping","vibrate/vibrating/vibrated/vibrates/vibrator/vibrated/vibration","strain/straining/strained/strains/strainer/strained/straining","tinkle/tinkling/tinkled/tinkles/tinkler/tinkled/tinkling","shave/shaving/shaved/shaves/shaver/shaved/shaving","kiss/kissing/kissed/kisses/kisser/kissed/kissing","cuddle/cuddling/cuddled/cuddles/cuddler/cuddled/cuddling","soak/soaking/soaked/soaks/soaker/soaked/soaking","jerk/jerking/jerked/jerks/jerker/jerked/jerking","scrub/scrubbing/scrubbed/scrubs/scrubber/scrubbed/scrubbing","burn/burning/burned/burns/burner/burnt/burning","freeze/freezing/froze/freezes/freezer/frozen/freezing","bake/baking/baked/bakes/baker/baked/baking","swallow/swallowing/swallowed/swallows/swallower/swallowed/swallowing","flatten/flattening/flattened/flattens/flattener/flattened/flattening","rot/rotting/rotted/rots/rotter/rotten/rotting","sculpt/sculpting/sculpted/sculpts/sculptor/sculpted/sculpture","roll/rolling/rolled/rolls/roller/rolled/rolling","cut/cutting/cut/cuts/cutter/cut/cutting","dig/digging/dug/digs/digger/dug/digging","cook/cooking/cooked/cooks/cooker/cooked/cooking","rattle/rattling/rattled/rattles/rattler/rattled/rattling","pull/pulling/pulled/pulls/puller/pulled/pulling","yank/yanking/yanked/yanks/yanker/yanked/yanking","boil/boiling/boiled/boils/boiler/boiled/boiling","plaster/plastering/plastered/plasters/plasterer/plastered/plastering","smoke/smoking/smoked/smokes/smoker/smoked/smoking","flick/flicking/flicked/flicks/flicker/flicked/flicking","scorch/scorching/scorched/scorches/scorcher/scorched/scorching","breastfeed/breastfeeding/breastfed/breastfeeds/breastfeeder/breastfed/breastfeeding","waste/wasting/wasted/wastes/waster/wasted/wasting","fume/fuming/fumed/fumes/fumer/fumed/fuming","stand/standing/stood/stands/stander/stood/standing","sit/sitting/sat/sits/sitter/sat/sitting","lay/laying/laid/lays/layer/laid/laying","crouch/crouching/crouched/crouches/croucher/crouched/crouching","squat/squatting/squatted/squats/squatter/squatted/squatting","slurp/slurping/slurped/slurps/slurper/slurped/slurping","lick/licking/licked/licks/licker/licked/licking","snort/snorting/snorted/snorts/snorter/snorted/snorting","eat/eating/ate/eats/eater/eaten/eating","snuffle/snuffling/snuffled/snuffles/snuffler/snuffled/snuffling","sniff/sniffing/sniffed/sniffs/sniffer/sniffed/sniffing","spurt/spurting/spurted/spurts/spurter/spurted/spurting","paint/painting/painted/paints/painter/painted/painting","sputter/sputtering/sputtered/sputters/sputterer/sputtered/sputtering","drain/draining/drained/drains/drainer/drained/draining","smatter/smattering/smattered/smatters/smatterer/smattered/smattering","squirt/squirting/squirted/squirts/squirter/squirted/squirting","sprinkle/sprinkling/sprinkled/sprinkles/sprinkler/sprinkled/sprinkling","drip/dripping/dripped/drips/dripper/dripped/dripping","piss/pissing/pissed/pisses/pisser/pissed/pissing","splash/splashing/splashed/splashes/splasher/splashed/splashing","bathe/bathing/bathed/bathes/bather/bathed/bathing","snuggle/snuggling/snuggled/snuggles/snuggler/snuggled/snuggling","puke/puking/puked/pukes/puker/puked/puking","lather/lathering/lathered/lathers/latherer/lathered/lathering","masticate/masticating/masticated/masticates/masticater/masticated/mastication","chew/chewing/chewed/chews/chewer/chewed/chewing","rotate/rotating/rotated/rotates/rotator/rotated/rotation","pray/praying/prayed/prays/prayer/prayed/prayer","ejaculate/ejaculating/ejaculated/ejaculates/ejaculator/ejaculated/ejaculation","thrust/thrusting/thrust/thrusts/thruster/thrusted/thrusting","fuck/fucking/fucked/fucks/fucker/fucked/fucking","masturbate/masturbating/masturbated/masturbates/masturbator/masturbated/masturbation","gyrate/gyrating/gyrated/gyrates/gyrator/gyrated/gyration","twerk/twerking/twerked/twerks/twerker/twerked/twerking","defecate/defecating/defecated/defecates/defecator/defecated/defecation","urinate/urinating/urinated/urinates/urinator/urinated/urination"];
dic.verb.sex=["stroke/stroking/stroked/strokes/stroker/stroked/stroking","cockblast/cockblasting/cockflasted/cockblasts/cockblaster/cockblasted/cockblasting","ejaculate/ejaculating/ejaculated/ejaculates/ejaculator/ejaculated/ejaculation","please/pleasing/pleased/pleases/pleaser/pleasted/pleasing","thrust/thrusting/thrust/thrusts/thruster/thrusted/thrusting","mount/mounting/mounted/mounts/mounter/mounted/mounting","fuck/fucking/fucked/fucks/fucker/fucked/fucking","masturbate/masturbating/masturbated/masturbates/masturbator/masturbated/masturbation","fellate/fellating/fellated/fellates/fellater/fellated/fellatio","titfuck/titfucking/titfucked/titucks/titfucker/titfucked/titfucking","turbohump/turbohumping/turbohumped/turbohumps/turbohumper/turbohumped/turbohumpification"];
dic.verb.pose=["stand/standing/stood/stands/stander/stood/standing","sit/sitting/sat/sits/sitter/sat/sitting","lay/laying/laid/lays/layer/laid/laying","crouch/crouching/crouched/crouches/croucher/crouched/crouching","squat/squatting/squatted/squats/squatter/squatted/squatting"];
dic.verb.eat=["slurp/slurping/slurped/slurps/slurper/slurped/slurping","lick/licking/licked/licks/licker/licked/licking","snort/snorting/snorted/snorts/snorter/snorted/snorting","eat/eating/ate/eats/eater/eaten/eating","suck/sucking/sucked/sucks/sucker/sucked/sucking","snuffle/snuffling/snuffled/snuffles/snuffler/snuffled/snuffling","guzzle/guzzling/guzzled/guzzles/guzzler/guzzled/guzzling","sniff/sniffing/sniffed/sniffs/sniffer/sniffed/sniffing","nibble/nibbling/nibbled/nibbles/nibbler/nibbled/nibbling","gnaw/gnawing/gnawed/gnaws/gnawer/gnawed/gnawing","nip/nipping/nipped/nips/nipper/nipped/nipping","masticate/masticating/masticated/masticates/masticater/masticated/mastication","chew/chewing/chewed/chews/chewer/chewed/chewing"];
dic.verb.liquid=["spurt/spurting/spurted/spurts/spurter/spurted/spurting","smear/smearing/smeared/smears/smearer/smeared/smearing","paint/painting/painted/paints/painter/painted/painting","shower/showering/showered/showers/showerer/showered/showering","sputter/sputtering/sputtered/sputters/sputterer/sputtered/sputtering","drain/draining/drained/drains/drainer/drained/draining","smatter/smattering/smattered/smatters/smatterer/smattered/smattering","splatter/splattering/splattered/splatters/splatterer/splattered/splattering","spray/spraying/sprayed/sprays/sprayer/sprayed/spraying","jet-spray/jet-spraying/jet-sprayed/jet-sprays/jet-sprayer/jet-sprayed/jet-spraying","squirt/squirting/squirted/squirts/squirter/squirted/squirting","sprinkle/sprinkling/sprinkled/sprinkles/sprinkler/sprinkled/sprinkling","drip/dripping/dripped/drips/dripper/dripped/dripping","piss/pissing/pissed/pisses/pisser/pissed/pissing","pour/pouring/poured/pours/pourer/poured/pouring","splash/splashing/splashed/splashes/splasher/splashed/splashing","gush/gushing/gushed/gushes/gusher/gushed/gushing","puke/puking/puked/pukes/puker/puked/puking","cockblast/cockblasting/cockflasted/cockblasts/cockblaster/cockblasted/cockblasting","ejaculate/ejaculating/ejaculated/ejaculates/ejaculator/ejaculated/ejaculation","defecate/defecating/defecated/defecates/defecator/defecated/defecation","urinate/urinating/urinated/urinates/urinator/urinated/urination"];
dic.verb.motion=["tremble/trembling/trembled/trembles/trembler/trembled/trembling","waddle/waddling/waddled/woddles/woddler/waddled/waddling","wiggle/wiggling/wiggled/wiggles/wiggler/wiggled/wiggling","slam/slamming/slammed/slams/slammer/slammed/slamming","kick/kicking/kicked/kicks/kicker/kicked/kicking","smack/smacking/smacked/smacks/smacker/smacked/smacking","stomp/stomping/stomped/stomps/stomper/stomped/stomping","shoot/shooting/shot/shoots/shooter/shot/shooting","screw/screwing/screwed/screws/screwer/screwed/screwing","pump/pumping/pumped/pumps/pumper/pumped/pumping","hack/hacking/hacked/hacks/hacker/hacked/hacking","poke/poking/poked/pokes/poker/poked/poking","crank/cranking/cranked/cranks/cranker/cranked/cranking","serve/serving/served/serves/server/served/serving","force/forcing/forced/forces/forcer/forced/forcing","stick/sticking/stuck/sticks/sticker/stuck/sticking","move/moving/moved/moves/mover/moved/moving","bind/binding/bound/binds/binder/bound/binding","staple/stapling/stapled/staples/stapler/stapled/stapling","eject/ejecting/ejected/ejects/ejector/ejected/ejection","crunch/crunching/crunched/crunches/cruncher/crunched/crunching","squish/squishing/squished/squishes/squisher/squished/squishing","prod/prodding/prodded/prods/prodder/prodded/prodding","wedge/wedging/wedged/wedges/wedger/wedged/wedging","blow/blowing/blew/blows/blower/blown/blowing","knead/kneading/kneaded/kneads/kneader/kneaded/kneading","twist/twisting/twisted/twists/twister/twisted/twisting","throw/throwing/threw/throws/thrower/thrown/throwing","fly/flying/flew/flies/flier/flown/flying","shake/shaking/shook/shakes/shaker/shaken/shaking","bang/banging/banged/bangs/banger/banged/banging","press/pressing/pressed/presses/presser/pressed/pressing","inject/injecting/injected/injects/injector/injected/injection","slip/slipping/slipped/slips/slipper/slipped/slipping","rip/ripping/ripped/rips/ripper/ripped/ripping","twang/twanging/twanged/twangs/twanger/twanged/twanging","cram/cramming/crammed/crams/crammer/crammed/cramming","hurl/hurling/hurled/hurls/hurler/hurled/hurling","lunge/lunging/lunged/lunges/lunger/lunged/lunging","jump/jumping/jumped/jumps/jumper/jumped/jumping","rotate/rotating/rotated/rotates/rotator/rotated/rotation","thrust/thrusting/thrust/thrusts/thruster/thrusted/thrusting","gyrate/gyrating/gyrated/gyrates/gyrator/gyrated/gyration","twerk/twerking/twerked/twerks/twerker/twerked/twerking"];
dic.verb.insert=["screw/screwing/screwed/screws/screwer/screwed/screwing","poke/poking/poked/pokes/poker/poked/poking","stick/sticking/stuck/sticks/sticker/stuck/sticking","prod/prodding/prodded/prods/prodder/prodded/prodding","wedge/wedging/wedged/wedges/wedger/wedged/wedging","inject/injecting/injected/injects/injector/injected/injection","cram/cramming/crammed/crams/crammer/crammed/cramming","feed/feeding/fed/feeds/feeder/fed/feeding","nail/nailing/nailed/nails/nailer/nailed/nailing","push/pushing/pushed/pushes/pusher/pushed/pushing","plunge/plunging/plunged/plunges/plunger/plunged/plunging","ram/ramming/rammed/rams/rammer/rammed/ramming","thrust/thrusting/thrust/thrusts/thruster/thrusted/thrusting"];
dic.verb.violent=["pluck/plucking/plucked/plucks/plucker/plucked/plucking","bite/biting/bit/bites/biter/bitten/biting","fart/farting/farted/farts/farter/farted/farting","manhandle/manhandling/manhandled/manhandles/manhandler/manhandled/manhandling","maul/mauling/mauled/mauls/mauler/mauled/mauling","whip/whipping/whipped/whips/whipper/whipped/whipping","dominate/dominating/dominated/dominates/dominator/dominated/domination","punch/punching/punched/punches/puncher/punched/punching","headbutt/headbutting/headbutted/headbutts/headbutter/headbutted/headbutting","impale/impaling/impaled/impales/impaler/impaled/impalement","scratch/scratching/scratched/scratches/scratcher/scratched/scratching","grab/grabbing/grabbed/grabs/grabber/grabbed/grabbing","snip/snipping/snipped/snips/snipper/snipped/snipping","shatter/shattering/shattered/shatters/shatterer/shattered/shattering","slap/slapping/slapped/slaps/slapper/slapped/slapping","tickle/tickling/tickled/tickles/tickler/tickled/tickling","stab/stabbing/stabbed/stabs/stabber/stabbed/stabbing","strangle/strangling/strangled/strangles/strangler/strangled/strangulation","decapitate/decapitating/decapitated/decapitates/decapitater/decapitated/decapitation","behead/beheading/beheaded/beheads/beheader/beheaded/beheading","dangle/dangling/dangled/dangles/dangler/dangled/dangling","hang/hanging/hung/hangs/hanger/hanged/hanging","gouge/gouging/gouged/gouges/gouger/gouged/gouging","electrocute/electrocuting/electrocuted/electrocutes/electrocuter/electrocuted/electrocution","slash/slashing/slashed/slashes/slasher/slashed/slashing","hammer/hammering/hammered/hammers/hammerer/hammered/hammering","bludgeon/bludgeoning/bludgeoned/bludgeons/bludgeoner/bludgeoned/bludgeoning","pierce/piercing/pierced/pierces/piercer/pierced/piercing","skewer/skewering/skewered/skewers/skewerer/skewered/skewering","spank/spanking/spanked/spanks/spanker/spanked/spanking","vomit/vomiting/vomited/vomits/vomiter/vomited/vomiting","pinch/pinching/pinched/pinches/pincher/pinched/pinching","shove/shoving/shoved/shoves/shover/shoved/shoving","amputate/amputating/amputated/amputates/amputator/amputated/amputation","throttle/throttling/throttled/throttles/throttler/throttled/throttling","implode/imploding/imploded/implodes/imploder/imploded/implosion","explode/exploding/exploded/explodes/exploder/exploded/explosion","cremate/cremating/cremated/cremates/cremater/cremated/cremation","assault/assaulting/assaulted/assaults/assaulter/assaulted/assault","attack/attacking/attacked/attacks/attacker/attacked/attack","cripple/crippling/crippled/cripples/crippler/crippled/crippling","dissect/dissecting/dissected/dissects/dissector/dissected/dissection","harass/harassing/harassed/harasses/harasser/harassed/harassment","injure/injuring/injured/injures/injurer/injured/injury","kidnap/kidnapping/kidnapped/kidnaps/kidnapper/kidnapped/kidnapping","mangle/mangling/mangled/mangles/mangler/mangled/mangling","maim/maiming/maimed/maims/maimer/maimed/maiming","mutilate/mutilating/mutilated/mutilates/mutilater/mutilated/mutilation","nab/nabbing/nabbed/nabs/nabber/nabbed/nabbing","nail/nailing/nailed/nails/nailer/nailed/nailing","nip/nipping/nipped/nips/nipper/nipped/nipping","rob/robbing/robbed/robs/robber/robbed/robbery","vaporize/vaporizing/vaporized/vaporizes/vaporizer/vaporized/vaporization","liquefy/liquefying/liquefied/liquefies/liquefier/liquefied/liquefication","shred/shredding/shredded/shreds/shredder/shredded/shredding","grope/groping/groped/gropes/groper/groped/groping"];
dic.verb.political=["veto/vetoing/vetoed/vetoes/vetoer/vetoed/vetoing","elect/electing/elected/elects/electer/elected/election","ratify/ratifying/ratified/ratifies/ratifier/ratified/ratification","amend/amending/amended/amends/amender/amended/amendment","impeach/impeaching/impeached/impeaches/impeacher/impeached/impeachment","inaugurate/inaugurating/inaugurated/inaugurates/inaugurater/inaugurated/inauguration"];
dic.verb.legal=["sue/suing/sued/sues/suer/sued/suing","prosecute/prosecuting/prosecuted/prosecutes/prosecuter/prosecuted/prosecution","convict/convicting/convicted/convicts/convicter/convicted/conviction","legalize/legalizing/legalized/legalizes/legalizer/legalized/legalization"];
dic.verb.move=["lunge/lunging/lunged/lunges/lunger/lunged/lunging","jump/jumping/jumped/jumps/jumper/jumped/jumping","push/pushing/pushed/pushes/pusher/pushed/pushing","gyrate/gyrating/gyrated/gyrates/gyrator/gyrated/gyration"];
dic.verb.all=["whisper/whispering/whispered/whispers/whisperer/whispered/whispering","spelunk/spelunking/spelunked/spelunks/spelunker/spelunked/spelunking","squelch/squelching/squelched/squelches/squelcher/squelched/squelching","strategize/strategizing/strategized/strategizes/strategizer/strategized/strategizing","click/clicking/clicked/clicks/clicker/clicked/clicking","flap/flapping/flapped/flaps/flapper/flapped/flapping","barbeque/barbequing/barbequed/barbeques/barbequer/barbequed/barbequing","puff/puffing/puffed/puffs/puffer/puffed/puffing","petition/petitioning/petitioned/petitions/petitioner/petitioned/petitioning","abduct/abducting/abducted/abducts/abductor/abducted/abduction","abolish/abolishing/abolished/abolishes/abolisher/abolished/abolishment","apprehend/apprehending/apprehended/apprehends/apprehender/apprehended/apprehension","authenticate/authenticating/authenticated/authenticates/authenticator/authenticated/authentication","choke/choking/choked/chokes/choker/choked/choking","commandeer/commandeering/commandeered/commandeers/commandeerer/commandeered/commandeering","conserve/conserving/conserved/conserves/conserver/conserved/conservation","crash/crashing/crashed/crashes/crasher/crashed/crashing","dramatize/dramatizing/dramatized/dramatizes/dramatizer/dramatized/dramatization","forecast/forecasting/forecasted/forecasts/forecaster/forecasted/forecasting","jingle/jingling/jingled/jingles/jingler/jingled/jingling","jimmy/jimmying/jimmied/jimmies/jimmier/jimmied/jimmying","lecture/lecturing/lectured/lectures/lecturer/lectured/lecturing","rapture/rapturing/raptured/raptures/rapturer/raptured/rapture"].concat(dic.verb.emotion,dic.verb.transitive,dic.verb.walk,dic.verb.intransitive,dic.verb.sex,dic.verb.pose,dic.verb.eat,dic.verb.liquid,dic.verb.motion,dic.verb.insert,dic.verb.violent,dic.verb.political,dic.verb.legal,dic.verb.move);
dic.verb.subs=["simple","ing","ed","s","er","pp","noun"];
dic.verb.filters=["emotion","transitive","walk","intransitive","sex","pose","eat","liquid","motion","insert","violent","political","legal","move"];
var verbimg={};
dic.verbimg=verbimg;
dic.verbimg.all=["shine/shining/shone/shines/shiner","gleam/gleaming/gleamed/gleams/gleamer","crumple/crumpling/crumpled/crumples/crumpler","sparkle/sparkling/sparkled/sparkles/sparkler","bloom/blooming/bloomed/blooms/bloomer","grow/growing/grew/grows/grower","shrink/shrinking/shrunk/shrinks/shrinker","glow/glowing/glowed/glows/glower","lighten/lightening/lightened/lightens/lightener","darken/darkening/darkened/darkens/darkener","steam/steaming/steamed/steams/steamer","flash/flashing/flashed/flashes/flasher","bubble/bubbling/bubbled/bubbles/bubbler","burn/burning/burned/burns/burner","flutter/fluttering/fluttered/flutters/flutterer","flap/flapping/flapped/flaps/flapper","ripple/rippling/rippled/ripples/rippler","smolder/smoldering/smoldered/smolders/smolderer","fizz/fizzing/fizzed/fizzes/fizzer","fester/festering/festered/festers/festerer","froth/frothing/frothed/froths/frother","rise/rising/rose/rises/riser","churn/churning/churned/churns/churner","shimmer/shimmering/shimmered/shimmers/shimmerer","blossom/blossoming/blossomed/blossoms/blossomer","wilt/wilting/wilted/wilts/wilter","twinkle/twinkling/twinkled/twinkles/twinkler","radiate/radiating/radiated/radiates/radiator","bloat/bloating/bloated/bloats/bloater","twist/twisting/twisted/twists/twister","wave/waving/waved/waves/waver","shudder/shuddering/shuddered/shudders/shudderer","shiver/shivering/shivered/shivers/shiverer","shake/shaking/shook/shakes/shaker","soften/softening/softened/softens/softener","harden/hardening/hardened/hardens/hardener","bleed/bleeding/bled/bleeds/bleeder","crack/cracking/cracked/cracks/cracker","blacken/blackening/blackened/blackens/blackener","whiten/whitening/whitened/whitens/whitener","wiggle/wiggling/wiggled/wiggles/wiggler"].concat();
dic.verbimg.subs=["normal","ing","ed","s","er"];
dic.verbimg.filters=[];
var vocal={};
dic.vocal=vocal;
dic.vocal.all=["mmmmmm","oooh","uhhhm","eeeeeeee","oof","wow","ouch","yikes","ahhhh","ugh","eeek","ahem","aargh","boo hoo","ha ha ha","muahahaha"].concat();
dic.vocal.subs=["default"];
dic.vocal.filters=[];
var x={};
dic.x=x;
dic.x.all=["I'll be damned","bravo","geez","holy cow","good heavens","holy moley","ermahgerd","LOL","Bingo","ROFL","WTF","good lord","awesome","excellent","jolly good","this is the end","run for your lives","wicked","epic","damn","oh boy","boy oh boy oh boy","what in the world","what the hell","oh joy","woot","omgomgomg","no way","this can't be","mine eyes are deceiving me","gasp","oh my goodness","oh dear","oh my","dear me","dear dear","my my","my oh my","aw shucks","whoa","wow","oh wow","trololol","oho","oh glorious day","disgraceful","oh hell yes","hella good","hurrah","what","beautiful","ahhhhh mahh gahh","by golly","this is delicious","oh gog","K.O.","finish him","my leg","I'm gonna faint","alas","rats"].concat();
dic.x.subs=["default"];
dic.x.filters=[];
var yn={};
dic.yn=yn;
dic.yn.yes=["yes","yayaya","yep","yeppers","definitely","absolutely","without a doubt","indeed","affirmative","undoubtedly","undeniably","yes/yes","hell yes","ya","certainly","obviously","oh yes","I couldn't agree more"];
dic.yn.no=["no","definitely not","absolutely not","no way","impossible","negative","nope","hell no","nooooo","not at all","certainly not","obviously not","oh no","most certainly not","there's no way","that can't be"];
dic.yn.all=[].concat(dic.yn.yes,dic.yn.no);
dic.yn.subs=[];
dic.yn.filters=["yes","no"];

var amount ={
};
dic.amount = amount;
var amount_all  = ["a few", "a bunch of", "some", "many more"];
dic.amount.all = amount_all;
dic.tokens.push("amount");

var faced ={
};
dic.faced = faced;
var faced_all  = ["smiled", "frowned", "grimaced", "grinned evilly", "grinned cheekily", "sneered", "puckered", "smirked", "snarled", "snickered", "pouted"];
dic.faced.all = faced_all;
dic.tokens.push("faced");

var pron_female ={
};
dic.pron_female = pron_female;
var pron_female_all  =  ["her/she/herself/her/hers"];
dic.pron_female.all = pron_female_all;
dic.tokens.push("pron_female");

dic.firstname.filters=["male","female"];


dic.alien = {};
var alien_race  = ["Badoon/Badoons","Brood/The Broods","Celestials/The Celestials","Kree/The Kree"];
dic.alien.all = alien_race;
dic.alien.races = alien_race;
dic.alien.subs=["plural"];
dic.tokens.push("alien");
/// File: unicodetiles.js
/// This file contains the main tile engine namespace.
/// All coordinates are assumed to be integers - behaviour is undefined
/// if you feed in floats (or anything other) as x and y (or similar) parameters.

/*jshint browser:true devel:true trailing:true latedef:true undef:true unused:true newcap:true */


if (!window.console) { window.console = {}; window.console.log = function(){}; }

/// Namespace: ut
/// Container namespace.
var ut = ut || {};

/// Constants: Semi-internal constants for ut namespace
/// VERSION  - Version of the library as string.
/// NULLCHAR - Character used when none is specified otherwise.
/// CSSCLASS - The CSS class name used for the tile engine element.
/// NULLTILE - The tile used as placeholder for empty tile.
ut.VERSION = "2.1";
ut.NULLCHAR = " ";
ut.CSSCLASS = "unicodetiles";
ut.NULLTILE = {}; // Initialized properly after ut.Tile is defined

/// Class: Tile
/// Represents a unicode character tile with various attributes.

/// Constructor: Tile
/// Constructs a new Tile object.
///
/// Parameters:
///   ch - a character to display for this tile
///   r - (optional) red foregorund color component 0-255
///   g - (optional) green foreground color component 0-255
///   b - (optional) blue foreground color component 0-255
///   br - (optional) red background color component 0-255
///   bg - (optional) green background color component 0-255
///   bb - (optional) blue background color component 0-255
ut.Tile = function(ch, r, g, b, br, bg, bb) {
	"use strict";
	this.ch = ch || ut.NULLCHAR;
	this.r = r;
	this.g = g;
	this.b = b;
	this.br = br;
	this.bg = bg;
	this.bb = bb;
};

	/// Function: getChar
	/// Returns the character of this tile.
	ut.Tile.prototype.getChar = function() { return this.ch; };
	/// Function: setChar
	/// Sets the character of this tile.
	ut.Tile.prototype.setChar = function(ch) { this.ch = ch; };
	/// Function: setColor
	/// Sets the foreground color of this tile.
	ut.Tile.prototype.setColor = function(r, g, b) { this.r = r; this.g = g; this.b = b; };
	/// Function: setGrey
	/// Sets the foreground color to the given shade (0-255) of grey.
	ut.Tile.prototype.setGrey = function(grey) { this.r = grey; this.g = grey; this.b = grey; };
	/// Function: setBackground
	/// Sets the background color of this tile.
	ut.Tile.prototype.setBackground = function(r, g, b) { this.br = r; this.bg = g; this.bb = b; };
	/// Function: resetColor
	/// Clears the color of this tile / assigns default color.
	ut.Tile.prototype.resetColor = function() { this.r = this.g = this.b = undefined; };
	/// Function: resetBackground
	/// Clears the background color of this tile.
	ut.Tile.prototype.resetBackground = function() { this.br = this.bg = this.bb = undefined; };
	/// Function: getColorHex
	/// Returns the hexadecimal representation of the color
	ut.Tile.prototype.getColorHex = function() {
		if (this.r !== undefined && this.g !== undefined && this.b !== undefined)
			return "#" + this.r.toString(16) + this.g.toString(16) + this.b.toString(16);
		else return "";
	};
	/// Function: getBackgroundHex
	/// Returns the hexadecimal representation of the background color
	ut.Tile.prototype.getBackgroundHex = function() {
		if (this.br !== undefined && this.bg !== undefined && this.bb !== undefined)
			return "#" + this.br.toString(16) + this.bg.toString(16) + this.bb.toString(16);
		else return "";
	};
	/// Function: getColorRGB
	/// Returns the CSS rgb(r,g,b) representation of the color
	ut.Tile.prototype.getColorRGB = function() {
		if (this.r !== undefined && this.g !== undefined && this.b !== undefined)
			return 'rgb('+this.r+','+this.g+','+this.b+')';
		else return "";
	};
	/// Function: getBackgroundRGB
	/// Returns the CSS rgb(r,g,b) representation of the background color
	ut.Tile.prototype.getBackgroundRGB = function() {
		if (this.br !== undefined && this.bg !== undefined && this.bb !== undefined)
			return 'rgb('+this.br+','+this.bg+','+this.bb+')';
		else return "";
	};
	/// Function: getColorJSON
	/// Returns the JSON representation of the color, i.e. object { r, g, b }
	ut.Tile.prototype.getColorJSON = function() {
		if (this.r !== undefined && this.g !== undefined && this.b !== undefined)
			return { "r": this.r, "g": this.g, "b": this.b };
		else return {};
	};
	/// Function: getBackgroundJSON
	/// Returns the JSON representation of the background color, i.e. object { r, g, b }
	ut.Tile.prototype.getBackgroundJSON = function() {
		if (this.r !== undefined && this.g !== undefined && this.b !== undefined)
			return { "r": this.br, "g": this.bg, "b": this.bb };
		else return {};
	};
	/// Function: copy
	/// Makes this tile identical to the one supplied. Custom properties are not copied.
	ut.Tile.prototype.copy = function(other) {
		this.ch = other.ch;
		this.r = other.r; this.g = other.g; this.b = other.b;
		this.br = other.br; this.bg = other.bg; this.bb = other.bb;
	};
	/// Function: clone
	/// Returns a new copy of this tile. Custom properties are not cloned.
	ut.Tile.prototype.clone = function() {
		return new ut.Tile(this.ch, this.r, this.g, this.b, this.br, this.bg, this.bb);
	};

ut.NULLTILE = new ut.Tile();


/// Class: Viewport
/// The tile engine viewport / window. Takes care of initializing a proper renderer.

/// Constructor: Viewport
/// Constructs a new Viewport object.
/// If you wish to display a player character at the center, you should use odd sizes.
///
/// Parameters:
///   elem - the DOM element which shall be transformed into the tile engine
///   w - (integer) width in tiles
///   h - (integer) height in tiles
///   renderer - (optional) choose rendering engine, see <Viewport.setRenderer>, defaults to "auto".
///   squarify - (optional) set to true to force the tiles square; may break some box drawing
ut.Viewport = function(elem, w, h, renderer, squarify) {
	"use strict";
	this.elem = elem;
	this.elem.innerHTML = "";
	this.w = w;
	this.h = h;
	this.renderer = null; // setRenderer() is called later
	this.squarify = squarify;
	this.cx = Math.floor(w/2);
	this.cy = Math.floor(h/2);

	// Add CSS class if not added already
	if (elem.className.indexOf(ut.CSSCLASS) === -1) {
		if (elem.className.length === 0) elem.className = ut.CSSCLASS;
		else elem.className += " " + ut.CSSCLASS;
	}

	// Create two 2-dimensional array to hold the viewport tiles
	this.buffer = new Array(h);
	for (var j = 0; j < h; ++j) {
		this.buffer[j] = new Array(w);
		for (var i = 0; i < w; ++i) {
			this.buffer[j][i] = new ut.Tile();
		}
	}

	/// Function: updateStyle
	/// If the style of the parent element is modified, this needs to be called.
	this.updateStyle = function(updateRenderer) {
		var s = window.getComputedStyle(this.elem, null);
		this.defaultColor = s.color;
		this.defaultBackground = s.backgroundColor;
		if (updateRenderer !== false)
			this.renderer.updateStyle(s);
	};

	/// Function: setRenderer
	/// Switch renderer at runtime. All methods fallback to "dom" if unsuccesful.
	/// Possible values:
	///   * "webgl" - Use WebGL with an HTML5 <canvas> element
	///   * "canvas" - Use HTML5 <canvas> element
	///   * "dom" - Use regular HTML element manipulation through DOM
	///   * "auto" - Use best available, i.e. try the above in order, picking the first that works
	this.setRenderer = function(newrenderer) {
		this.elem.innerHTML = "";
		if (newrenderer === "auto" || newrenderer === "webgl") {
			try {
				this.renderer = new ut.WebGLRenderer(this);
			} catch (e) {
				console.log(e);
				newrenderer = "canvas";
				this.elem.innerHTML = "";
			}
		}
		if (newrenderer === "canvas") {
			try {
				this.renderer = new ut.CanvasRenderer(this);
			} catch (e) {
				console.log(e);
				newrenderer = "dom";
				this.elem.innerHTML = "";
			}
		}
		if (newrenderer === "dom") {
			this.renderer = new ut.DOMRenderer(this);
		}
		this.updateStyle(false);
	};

	this.setRenderer(renderer || "auto");
};

	/// Function: getRendererString
	/// Gets the currently used renderer.
	///
	/// Returns:
	///   One of "webgl", "canvas", "dom", "".
	ut.Viewport.prototype.getRendererString = function() {
		if (this.renderer instanceof ut.WebGLRenderer) return "webgl";
		if (this.renderer instanceof ut.CanvasRenderer) return "canvas";
		if (this.renderer instanceof ut.DOMRenderer) return "dom";
		return "";
	};

	/// Function: put
	/// Puts a tile to the given coordinates.
	/// Checks bounds and does nothing if invalid coordinates are given.
	///
	/// Parameters:
	///   tile - the tile to put
	///   x - (integer) x coordinate
	///   y - (integer) y coordinate
	ut.Viewport.prototype.put = function(tile, x, y) {
		if (x < 0 || y < 0 || x >= this.w || y >= this.h) return;
		this.buffer[y][x] = tile;
	};

	/// Function: unsafePut
	/// Puts a tile to the given coordinates.
	/// Does *not* check bounds; throws exception if invalid coordinates are given.
	///
	/// Parameters:
	///   tile - the tile to put
	///   x - (integer) x coordinate
	///   y - (integer) y coordinate
	ut.Viewport.prototype.unsafePut = function(tile, x, y) {
		this.buffer[y][x] = tile;
	};

	/// Function: putString
	/// Creates a row of tiles with the chars of the given string.
	/// Wraps to next line if it can't fit the chars on one line.
	///
	/// Parameters:
	///   str - (string) the string to put
	///   x - (integer) x coordinate (column)
	///   y - (integer) y coordinate (row)
	///   r - (optional) red foregorund color component 0-255
	///   g - (optional) green foreground color component 0-255
	///   b - (optional) blue foreground color component 0-255
	///   br - (optional) red background color component 0-255
	///   bg - (optional) green background color component 0-255
	///   bb - (optional) blue background color component 0-255
	ut.Viewport.prototype.putString = function(str, x, y, r, g, b, br, bg, bb) {
		var len = str.length;
		var tile;
		if (x < 0 || y < 0) return;
		for (var i = 0; i < len; ++i) {
			if (x >= this.w) { x = 0; ++y;}
			if (y >= this.h) return;
			tile = new ut.Tile(str[i], r, g, b, br, bg, bb);
			this.unsafePut(tile, x, y);
			++x;
		}
	};

	/// Function: get
	/// Returns the tile in the given coordinates.
	/// Checks bounds and returns empty tile if invalid coordinates are given.
	///
	/// Parameters:
	///   x - (integer) x coordinate
	///   y - (integer) y coordinate
	///
	/// Returns:
	///   The tile.
	ut.Viewport.prototype.get = function(x, y) {
		if (x < 0 || y < 0 || x >= this.w || y >= this.h) return ut.NULLTILE;
		return this.buffer[y][x];
	};

	/// Function: clear
	/// Clears the viewport buffer by assigning empty tiles.
	ut.Viewport.prototype.clear = function() {
		for (var j = 0; j < this.h; ++j) {
			for (var i = 0; i < this.w; ++i) {
				this.buffer[j][i] = ut.NULLTILE;
			}
		}
		this.renderer.clear();
	};

	/// Function: render
	/// Renders the buffer as html to the element specified at construction.
	ut.Viewport.prototype.render = function() {
		this.renderer.render();
	};


/// Class: Engine
/// The tile engine itself.

/// Constructor: Engine
/// Constructs a new Engine object. If width or height is given,
/// it will not attempt to fetch tiles outside the boundaries.
/// In that case 0,0 is assumed as the upper-left corner of the world,
/// but if no width/height is given also negative coords are valid.
///
/// Parameters:
///   vp - the <Viewport> instance to use as the viewport
///   func - the function used for fetching tiles
///   w - (integer) (optional) world width in tiles
///   h - (integer) (optional) world height in tiles
ut.Engine = function(vp, func, w, h) {
	"use strict";
	this.viewport = vp;
	this.tileFunc = func;
	this.w = w;
	this.h = h;
	this.refreshCache = true;
	this.cacheEnabled = false;
	this.transitionTimer = null;
	this.transitionDuration = 0;
	this.transition = null;
	this.cachex = 0;
	this.cachey = 0;
	this.tileCache = new Array(vp.h);
	this.tileCache2 = new Array(vp.h);
	for (var j = 0; j < vp.h; ++j) {
		this.tileCache[j] = new Array(vp.w);
		this.tileCache2[j] = new Array(vp.w);
	}
};

	/// Function: setTileFunc
	/// Sets the function to be called with coordinates to fetch each tile.
	/// Optionally can apply a transition effect. Effects are:
	/// "boxin", "boxout", "circlein", "circleout", "random"
	///
	/// Parameters:
	///   func - function taking parameters (x, y) and returning an ut.Tile
	///   effect - (string) (optional) name of effect to use (see above for legal values)
	///   duration - (integer) (optional) how many milliseconds the transition effect should last
	ut.Engine.prototype.setTileFunc = function(func, effect, duration) {
		"use strict";
		if (effect) {
			this.transition = undefined;
			if (typeof effect === "string") {
				if (effect === "boxin") this.transition = function(x, y, w, h, new_t, old_t, factor) {
					var halfw = w * 0.5, halfh = h * 0.5;
					x -= halfw; y -= halfh;
					if (Math.abs(x) < halfw * factor && Math.abs(y) < halfh * factor) return new_t;
					else return old_t;
				};
				else if (effect === "boxout") this.transition = function(x, y, w, h, new_t, old_t, factor) {
					var halfw = w * 0.5, halfh = h * 0.5;
					x -= halfw; y -= halfh;
					factor = 1.0 - factor;
					if (Math.abs(x) < halfw * factor && Math.abs(y) < halfh * factor) return old_t;
					else return new_t;
				};
				else if (effect === "circlein") this.transition = function(x, y, w, h, new_t, old_t, factor) {
					var halfw = w * 0.5, halfh = h * 0.5;
					x -= halfw; y -= halfh;
					if (x*x + y*y < (halfw*halfw + halfh*halfh) * factor) return new_t;
					else return old_t;
				};
				else if (effect === "circleout") this.transition = function(x, y, w, h, new_t, old_t, factor) {
					var halfw = w * 0.5, halfh = h * 0.5;
					x -= halfw; y -= halfh;
					factor = 1.0 - factor;
					if (x*x + y*y > (halfw*halfw + halfh*halfh) * factor) return new_t;
					else return old_t;
				};
				else if (effect === "random") this.transition = function(x, y, w, h, new_t, old_t, factor) {
					if (Math.random() > factor) return old_t;
					else return new_t;
				};
			}
			if (this.transition) {
				this.transitionTimer = (new Date()).getTime();
				this.transitionDuration = duration || 500;
			}
		}
		this.tileFunc = func;
	};

	/// Function: setMaskFunc
	/// Sets the function to be called to fetch mask information according to coordinates.
	/// If mask function returns false to some coordinates, then that tile is not rendered.
	///
	/// Parameters:
	///   func - function taking parameters (x, y) and returning a true if the tile is visible
	ut.Engine.prototype.setMaskFunc = function(func) { this.maskFunc = func; };

	/// Function: setShaderFunc
	/// Sets the function to be called to post-process / shade each visible tile.
	/// Shader function is called even if caching is enabled, see <Engine.setCacheEnabled>.
	///
	/// Parameters:
	///   func - function taking parameters (tile, x, y) and returning an ut.Tile
	ut.Engine.prototype.setShaderFunc = function(func) { this.shaderFunc = func; };

	/// Function: setWorldSize
	/// Tiles outside of the range x = [0,width[; y = [0,height[ are not fetched.
	/// Set to undefined in order to make the world infinite.
	///
	/// Parameters:
	///   width - (integer) new world width
	///   height - (integer) new world height
	ut.Engine.prototype.setWorldSize = function(width, height) { this.w = width; this.h = height; };

	/// Function: setCacheEnabled
	/// Enables or disables the usage of tile cache. This means that
	/// extra measures are taken to not call the tile function unnecessarily.
	/// This means that all animating must be done in a shader function,
	/// see <Engine.setShaderFunc>.
	/// Cache is off by default, but should be enabled if the tile function
	/// does more computation than a simple array look-up.
	///
	/// Parameters:
	///   mode - true to enable, false to disable
	ut.Engine.prototype.setCacheEnabled = function(mode) { this.cacheEnabled = mode; this.refreshCache = true; };

	/// Function: update
	/// Updates the viewport according to the given player coordinates.
	/// The algorithm goes as follows:
	///   * Record the current time
	///   * For each viewport tile:
	///   * Check if the tile is visible by testing the mask
	///   * If not visible, continue to the next tile in the viewport
	///   * Otherwise, if cache is enabled try to fetch the tile from there
	///   * Otherwise, call the tile function and check for shader function presence
	///   * If there is shader function, apply it to the tile, passing the recorded time
	///   * Put the tile to viewport
	///
	/// Parameters:
	///   x - (integer) viewport center x coordinate in the tile world
	///   y - (integer) viewport center y coordinate in the tile world
	ut.Engine.prototype.update = function(x, y) {
		"use strict";
		x = x || 0;
		y = y || 0;
		// World coords of upper left corner of the viewport
		var xx = x - this.viewport.cx;
		var yy = y - this.viewport.cy;
		var timeNow = (new Date()).getTime(); // For passing to shaderFunc
		var transTime;
		if (this.transition) transTime = (timeNow - this.transitionTimer) / this.transitionDuration;
		if (transTime >= 1.0) this.transition = undefined;
		var tile;
		// For each tile in viewport...
		for (var j = 0; j < this.viewport.h; ++j) {
			for (var i = 0; i < this.viewport.w; ++i) {
				var ixx = i+xx, jyy = j+yy;
				// Check horizontal bounds if requested
				if (this.w && (ixx < 0 || ixx >= this.w)) {
					tile = ut.NULLTILE;
				// Check vertical bounds if requested
				} else if (this.h && (jyy < 0 || jyy >= this.w)) {
					tile = ut.NULLTILE;
				// Check mask
				} else if (this.maskFunc && !this.maskFunc(ixx, jyy)) {
					tile = ut.NULLTILE;
				// Check transition effect
				} else if (this.transition && !this.refreshCache) {
					tile = this.transition(i, j, this.viewport.w, this.viewport.h,
						this.tileFunc(ixx, jyy), this.tileCache[j][i], transTime);
				// Check cache
				} else if (this.cacheEnabled && !this.refreshCache) {
					var lookupx = ixx - this.cachex;
					var lookupy = jyy - this.cachey;
					if (lookupx >= 0 && lookupx < this.viewport.w && lookupy >= 0 && lookupy < this.viewport.h) {
						tile = this.tileCache[lookupy][lookupx];
						if (tile === ut.NULLTILE) tile = this.tileFunc(ixx, jyy);
					} else // Cache miss
						tile = this.tileFunc(ixx, jyy);
				// If all else fails, call tileFunc
				} else tile = this.tileFunc(ixx, jyy);
				// Save the tile to cache (always due to transition effects)
				this.tileCache2[j][i] = tile;
				// Apply shader function
				if (this.shaderFunc && tile !== ut.NULLTILE)
					tile = this.shaderFunc(tile, ixx, jyy, timeNow);
				// Put shaded tile to viewport
				this.viewport.unsafePut(tile, i, j);
			}
		}
		// Cache stuff is enabled always, because it is also required by transitions
		// Save the new cache origin
		this.cachex = xx;
		this.cachey = yy;
		// Swap cache buffers
		var tempCache = this.tileCache;
		this.tileCache = this.tileCache2;
		this.tileCache2 = tempCache;
		this.refreshCache = false;
	};
/*global ut */

/// Class: WebGLRenderer
/// Renders the <Viewport> with WebGL.
/// Given decent GPU drivers and browser support, this is the fastest renderer.
///
/// *Note:* This is an internal class used by <Viewport>
ut.WebGLRenderer = function(view) {
	"use strict";
	this.view = view;
	this.canvas = document.createElement("canvas");
	// Try to fetch the context
	if (!this.canvas.getContext) throw("Canvas not supported");
	this.gl = this.canvas.getContext("experimental-webgl");
	if (!this.gl) throw("WebGL not supported");
	var gl = this.gl;
	view.elem.appendChild(this.canvas);

	this.charMap = {};
	this.charArray = [];
	this.defaultColors = { r: 1.0, g: 1.0, b: 1.0, br: 0.0, bg: 0.0, bb: 0.0 };

	this.attribs = {
		position:  { buffer: null, data: null, itemSize: 2, location: null, hint: gl.STATIC_DRAW },
		texCoord:  { buffer: null, data: null, itemSize: 2, location: null, hint: gl.STATIC_DRAW },
		color:     { buffer: null, data: null, itemSize: 3, location: null, hint: gl.DYNAMIC_DRAW },
		bgColor:   { buffer: null, data: null, itemSize: 3, location: null, hint: gl.DYNAMIC_DRAW },
		charIndex: { buffer: null, data: null, itemSize: 1, location: null, hint: gl.DYNAMIC_DRAW }
	};

	function insertQuad(arr, i, x, y, w, h) {
		var x1 = x, y1 = y, x2 = x + w, y2 = y + h;
		arr[  i] = x1; arr[++i] = y1;
		arr[++i] = x2; arr[++i] = y1;
		arr[++i] = x1; arr[++i] = y2;
		arr[++i] = x1; arr[++i] = y2;
		arr[++i] = x2; arr[++i] = y1;
		arr[++i] = x2; arr[++i] = y2;
	}

	this.initBuffers = function() {
		var a, attrib, attribs = this.attribs;
		var w = this.view.w, h = this.view.h;
		// Allocate data arrays
		for (a in this.attribs) {
			attrib = attribs[a];
			attrib.data = new Float32Array(attrib.itemSize * 6 * w * h);
		}
		// Generate static data
		for (var j = 0; j < h; ++j) {
			for (var i = 0; i < w; ++i) {
				// Position & texCoords
				var k = attribs.position.itemSize * 6 * (j * w + i);
				insertQuad(attribs.position.data, k, i * this.tw, j * this.th, this.tw, this.th);
				insertQuad(attribs.texCoord.data, k, 0.0, 0.0, 1.0, 1.0);
			}
		}
		// Upload
		for (a in this.attribs) {
			attrib = attribs[a];
			if (attrib.buffer) gl.deleteBuffer(attrib.buffer);
			attrib.buffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, attrib.buffer);
			gl.bufferData(gl.ARRAY_BUFFER, attrib.data, attrib.hint);
			gl.enableVertexAttribArray(attrib.location);
			gl.vertexAttribPointer(attrib.location, attrib.itemSize, gl.FLOAT, false, 0, 0);
		}
	};

	// Create an offscreen canvas for rendering text to texture
	if (!this.offscreen)
		this.offscreen = document.createElement("canvas");
	this.offscreen.style.position = "absolute";
	this.offscreen.style.top = "0px";
	this.offscreen.style.left = "0px";
	this.ctx = this.offscreen.getContext("2d");
	// WebGL drawing canvas
	this.updateStyle();
	this.canvas.width = (view.squarify ? this.th : this.tw) * view.w;
	this.canvas.height = this.th * view.h;
	this.offscreen.width = 0;
	this.offscreen.height = 0;
	// Doing this again since setting canvas w/h resets the state
	this.updateStyle();

	gl.viewport(0, 0, this.canvas.width, this.canvas.height);

	// Setup GLSL
	function compileShader(type, source) {
		var shader = gl.createShader(type);
		gl.shaderSource(shader, source);
		gl.compileShader(shader);
		var ok = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
		if (!ok) {
			var msg = "Error compiling shader: " + gl.getShaderInfoLog(shader);
			gl.deleteShader(shader);
			throw msg;
		}
		return shader;
	}
	var vertexShader = compileShader(gl.VERTEX_SHADER, ut.WebGLRenderer.VERTEX_SHADER);
	var fragmentShader = compileShader(gl.FRAGMENT_SHADER, ut.WebGLRenderer.FRAGMENT_SHADER);
	var program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);
	gl.deleteShader(vertexShader);
	gl.deleteShader(fragmentShader);
	var ok = gl.getProgramParameter(program, gl.LINK_STATUS);
	if (!ok) {
		var msg = "Error linking program: " + gl.getProgramInfoLog(program);
		gl.deleteProgram(program);
		throw msg;
	}
	gl.useProgram(program);

	// Get attribute locations
	this.attribs.position.location  = gl.getAttribLocation(program, "position");
	this.attribs.texCoord.location  = gl.getAttribLocation(program, "texCoord");
	this.attribs.color.location     = gl.getAttribLocation(program, "color");
	this.attribs.bgColor.location   = gl.getAttribLocation(program, "bgColor");
	this.attribs.charIndex.location = gl.getAttribLocation(program, "charIndex");

	// Setup buffers and uniforms
	this.initBuffers();
	var resolutionLocation = gl.getUniformLocation(program, "uResolution");
	gl.uniform2f(resolutionLocation, this.canvas.width, this.canvas.height);
	this.tileCountsLocation = gl.getUniformLocation(program, "uTileCounts");
	gl.uniform2f(this.tileCountsLocation, this.view.w, this.view.h);
	this.paddingLocation = gl.getUniformLocation(program, "uPadding");
	gl.uniform2f(this.paddingLocation, 0.0, 0.0);

	// Setup texture
	//view.elem.appendChild(this.offscreen); // Debug offscreen
	var texture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, texture);
	this.cacheChars(" !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~");
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.activeTexture(gl.TEXTURE0);
};


/////////////////
// Build texture
ut.WebGLRenderer.prototype.buildTexture = function() {
	"use strict";
	var gl = this.gl;
	var w = this.offscreen.width / (this.tw + this.pad), h = this.offscreen.height / (this.th + this.pad);
	// Check if need to resize the canvas
	var charCount = this.charArray.length;
	if (charCount > Math.floor(w) * Math.floor(h)) {
		w = Math.ceil(Math.sqrt(charCount));
		h = w + 2; // Allocate some extra space too
		this.offscreen.width = w * (this.tw + this.pad);
		this.offscreen.height = h * (this.th + this.pad);
		this.updateStyle();
		gl.uniform2f(this.tileCountsLocation, w, h);
	}
	gl.uniform2f(this.paddingLocation, this.pad / this.offscreen.width, this.pad / this.offscreen.height);

	var c = 0, ch;
	var halfGap = 0.5 * this.gap; // Squarification
	this.ctx.fillStyle = "#000000";
	this.ctx.fillRect(0, 0, this.offscreen.width, this.offscreen.height);
	this.ctx.fillStyle = "#ffffff";
	var tw = this.tw + this.pad;
	var th = this.th + this.pad;
	var y = 0.5 * th; // Half because textBaseline is middle
	for (var j = 0; j < h; ++j) {
		var x = this.pad * 0.5;
		for (var i = 0; i < w; ++i, ++c) {
			ch = this.charArray[c];
			if (ch === undefined) break;
			this.ctx.fillText(ch, x + halfGap, y);
			x += tw;
		}
		if (!ch) break;
		y += th;
	}
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.offscreen);
};


///////////////
// Cache chars
ut.WebGLRenderer.prototype.cacheChars = function(chars, build) {
	"use strict";
	if (!this.gl) return; // Nothing to do if not using WebGL renderer
	var changed = false;
	for (var i = 0; i < chars.length; ++i) {
		if (!this.charMap[chars[i]]) {
			changed = true;
			this.charArray.push(chars[i]);
			this.charMap[chars[i]] = this.charArray.length-1;
		}
	}

	if (changed && build !== false) this.buildTexture();
};


////////////////
// Update style
ut.WebGLRenderer.prototype.updateStyle = function(s) {
	"use strict";
	s = s || window.getComputedStyle(this.view.elem, null);
	this.ctx.font = s.fontSize + "/" + s.lineHeight + " " + s.fontFamily;
	this.ctx.textBaseline = "middle";
	this.ctx.fillStyle = "#ffffff";
	this.tw = this.ctx.measureText("M").width;
	this.th = parseInt(s.fontSize, 10);
	this.gap = this.view.squarify ? (this.th - this.tw) : 0;
	if (this.view.squarify) this.tw = this.th;
	this.pad = Math.ceil(this.th * 0.2) * 2.0; // Must be even number
	var color = s.color.match(/\d+/g);
	var bgColor = s.backgroundColor.match(/\d+/g);
	this.defaultColors.r = parseInt(color[0], 10) / 255;
	this.defaultColors.g = parseInt(color[1], 10) / 255;
	this.defaultColors.b = parseInt(color[2], 10) / 255;
	this.defaultColors.br = parseInt(bgColor[0], 10) / 255;
	this.defaultColors.bg = parseInt(bgColor[1], 10) / 255;
	this.defaultColors.bb = parseInt(bgColor[2], 10) / 255;
};

ut.WebGLRenderer.prototype.clear = function() { /* No op */ };


//////////
// Render
ut.WebGLRenderer.prototype.render = function() {
	"use strict";
	var gl = this.gl;
	gl.clear(gl.COLOR_BUFFER_BIT);
	var attribs = this.attribs;
	var w = this.view.w, h = this.view.h;
	// Create new tile data
	var tiles = this.view.buffer;
	var defaultColor = this.view.defaultColor;
	var defaultBgColor = this.view.defaultBackground;
	var newChars = false;
	for (var j = 0; j < h; ++j) {
		for (var i = 0; i < w; ++i) {
			var tile = tiles[j][i];
			var ch = this.charMap[tile.ch];
			if (ch === undefined) { // Auto-cache new characters
				this.cacheChars(tile.ch, false);
				newChars = true;
				ch = this.charMap[tile.ch];
			}
			var k = attribs.color.itemSize * 6 * (j * w + i);
			var kk = attribs.charIndex.itemSize * 6 * (j * w + i);
			var r = tile.r === undefined ? this.defaultColors.r : tile.r / 255;
			var g = tile.g === undefined ? this.defaultColors.g : tile.g / 255;
			var b = tile.b === undefined ? this.defaultColors.b : tile.b / 255;
			var br = tile.br === undefined ? this.defaultColors.br : tile.br / 255;
			var bg = tile.bg === undefined ? this.defaultColors.bg : tile.bg / 255;
			var bb = tile.bb === undefined ? this.defaultColors.bb : tile.bb / 255;
			for (var m = 0; m < 6; ++m) {
				var n = k + m * attribs.color.itemSize;
				attribs.color.data[n+0] = r;
				attribs.color.data[n+1] = g;
				attribs.color.data[n+2] = b;
				attribs.bgColor.data[n+0] = br;
				attribs.bgColor.data[n+1] = bg;
				attribs.bgColor.data[n+2] = bb;
				attribs.charIndex.data[kk+m] = ch;
			}
		}
	}
	// Upload
	if (newChars) this.buildTexture();
	gl.bindBuffer(gl.ARRAY_BUFFER, attribs.color.buffer);
	gl.bufferData(gl.ARRAY_BUFFER, attribs.color.data, attribs.color.hint);
	gl.bindBuffer(gl.ARRAY_BUFFER, attribs.bgColor.buffer);
	gl.bufferData(gl.ARRAY_BUFFER, attribs.bgColor.data, attribs.bgColor.hint);
	gl.bindBuffer(gl.ARRAY_BUFFER, attribs.charIndex.buffer);
	gl.bufferData(gl.ARRAY_BUFFER, attribs.charIndex.data, attribs.charIndex.hint);

	var attrib = this.attribs.position;
	gl.drawArrays(gl.TRIANGLES, 0, attrib.data.length / attrib.itemSize);
};


ut.WebGLRenderer.VERTEX_SHADER = [
	"attribute vec2 position;",
	"attribute vec2 texCoord;",
	"attribute vec3 color;",
	"attribute vec3 bgColor;",
	"attribute float charIndex;",
	"uniform vec2 uResolution;",
	"uniform vec2 uTileCounts;",
	"uniform vec2 uPadding;",
	"varying vec2 vTexCoord;",
	"varying vec3 vColor;",
	"varying vec3 vBgColor;",

	"void main() {",
		"vec2 tileCoords = floor(vec2(mod(charIndex, uTileCounts.x), charIndex / uTileCounts.x));",
		"vTexCoord = (texCoord + tileCoords) / uTileCounts;",
		"vTexCoord += (0.5 - texCoord) * uPadding;",
		"vColor = color;",
		"vBgColor = bgColor;",
		"vec2 pos = position / uResolution * 2.0 - 1.0;",
		"gl_Position = vec4(pos.x, -pos.y, 0.0, 1.0);",
	"}"
].join('\n');

ut.WebGLRenderer.FRAGMENT_SHADER = [
	"precision mediump float;",
	"uniform sampler2D uFont;",
	"varying vec2 vTexCoord;",
	"varying vec3 vColor;",
	"varying vec3 vBgColor;",

	"void main() {",
		"vec4 color = texture2D(uFont, vTexCoord);",
		"color.rgb = mix(vBgColor, vColor, color.rgb);",
		"gl_FragColor = color;",
	"}"
].join('\n');
/*global ut */

/// Class: CanvasRenderer
/// Renders the <Viewport> into an HTML5 <canvas> element.
///
/// *Note:* This is an internal class used by <Viewport>
ut.CanvasRenderer = function(view) {
	"use strict";
	this.view = view;
	this.canvas = document.createElement("canvas");
	if (!this.canvas.getContext) throw("Canvas not supported");
	this.ctx2 = this.canvas.getContext("2d");
	if (!this.ctx2 || !this.ctx2.fillText) throw("Canvas not supported");
	view.elem.appendChild(this.canvas);

	// Create an offscreen canvas for rendering
	this.offscreen = document.createElement("canvas");
	this.ctx = this.offscreen.getContext("2d");
	this.updateStyle();
	this.canvas.width = (view.squarify ? this.th : this.tw) * view.w;
	this.canvas.height = this.th * view.h;
	this.offscreen.width = this.canvas.width;
	this.offscreen.height = this.canvas.height;
	// Doing this again since setting canvas w/h resets the state
	this.updateStyle();
};

ut.CanvasRenderer.prototype.updateStyle = function(s) {
	"use strict";
	s = s || window.getComputedStyle(this.view.elem, null);
	this.ctx.font = s.fontSize + "/" + s.lineHeight + " " + s.fontFamily;
	this.ctx.textBaseline = "middle";
	this.tw = this.ctx.measureText("M").width;
	this.th = parseInt(s.fontSize, 10);
	this.gap = this.view.squarify ? (this.th - this.tw) : 0;
	if (this.view.squarify) this.tw = this.th;
};

ut.CanvasRenderer.prototype.clear = function() { /* No op */ };

ut.CanvasRenderer.prototype.render = function() {
	"use strict";
	var tile, ch, fg, bg, x, y;
	var view = this.view, buffer = this.view.buffer;
	var w = view.w, h = view.h;
	var hth = 0.5 * this.th;
	var hgap = 0.5 * this.gap; // Squarification
	// Clearing with one big rect is much faster than with individual char rects
	this.ctx.fillStyle = view.defaultBackground;
	this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
	y = hth; // half because textBaseline is middle
	for (var j = 0; j < h; ++j) {
		x = 0;
		for (var i = 0; i < w; ++i) {
			tile = buffer[j][i];
			ch = tile.ch;
			fg = tile.getColorRGB();
			bg = tile.getBackgroundRGB();
			// Only render background if the color is non-default
			if (bg.length && bg !== view.defaultBackground) {
				this.ctx.fillStyle = bg;
				this.ctx.fillRect(x, y-hth, this.tw, this.th);
			}
			// Do not attempt to render empty char
			if (ch.length) {
				if (!fg.length) fg = view.defaultColor;
				this.ctx.fillStyle = fg;
				this.ctx.fillText(ch, x+hgap, y);
			}
			x += this.tw;
		}
		y += this.th;
	}
	this.ctx2.drawImage(this.offscreen, 0, 0);
};
/*global ut */

/// Class: DOMRenderer
/// Renders the <Viewport> into DOM elements.
///
/// *Note:* This is an internal class used by <Viewport>
ut.DOMRenderer = function(view) {
	"use strict";
	this.view = view;

	// Create a matrix of <span> elements, cache references
	this.spans = new Array(view.h);
	this.colors = new Array(view.h);
	for (var j = 0; j < view.h; ++j) {
		this.spans[j] = new Array(view.w);
		this.colors[j] = new Array(view.w);
		for (var i = 0; i < view.w; ++i) {
			this.spans[j][i] = document.createElement("div");
			view.elem.appendChild(this.spans[j][i]);
		}
		// Line break
		this.spans[j].push(document.createElement("br"));
		view.elem.appendChild(this.spans[j][view.w]);
	}
	ut.viewportStyleUpdaterHack = this;
	setTimeout(function() { ut.viewportStyleUpdaterHack.updateStyle(); }, 0);
};

ut.DOMRenderer.prototype.updateStyle = function(s) {
	"use strict";
	s = window.getComputedStyle(this.spans[0][0], null);
	this.tw = parseInt(s.width, 10);
	if (this.tw === 0 || isNaN(this.tw)) return; // Nothing to do, exit
	this.th = parseInt(s.height, 10);
	if (this.view.squarify) this.tw = this.th;
	var w = this.view.w, h = this.view.h;
	for (var j = 0; j < h; ++j) {
		for (var i = 0; i < w; ++i) {
			this.spans[j][i].style.width = this.tw + "px";
		}
	}
};

ut.DOMRenderer.prototype.clear = function() {
	"use strict";
	for (var j = 0; j < this.view.h; ++j) {
		for (var i = 0; i < this.view.w; ++i) {
			this.colors[j][i] = "";
		}
	}
};

ut.DOMRenderer.prototype.render = function() {
	"use strict";
	var w = this.view.w, h = this.view.h;
	var buffer = this.view.buffer;
	var defaultColor = this.view.defaultColor;
	var defaultBackground = this.view.defaultBackground;
	for (var j = 0; j < h; ++j) {
		for (var i = 0; i < w; ++i) {
			var tile = buffer[j][i];
			var span = this.spans[j][i];
			// Check and update colors
			var fg = tile.r === undefined ? defaultColor : tile.getColorRGB();
			var bg = tile.br === undefined ? defaultBackground : tile.getBackgroundRGB();
			var colorHash = fg + bg;
			if (colorHash !== this.colors[j][i]) {
				this.colors[j][i] = colorHash;
				span.style.color = fg;
				span.style.backgroundColor = bg;
			}
			// Check and update character
			var ch = tile.getChar();
			if (ch !== span.innerHTML)
				span.innerHTML = ch;
		}
	}
};

ut.viewportStyleUpdaterHack = null;










