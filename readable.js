/** readable - Way declarations that are readable on the Web
  *
  *   See readable.css for a waycaster’s introduction.  The sections below are for programmers.
  *
  *
  * SUPPORTED BROWSERS
  * ------------------
  *   See README.html#browser_support
  *
  *
  * EXTENSION of HTML DOM
  * ---------------------
  *   This program adds one property to the Element interface, for internal purposes only.
  *
  *   Element
  *   -------
  *       interlinkScene · (boolean) Set on a subjoining waybit, answers whether this subjoining waybit has
  *                        an interlink scene.  That is only its temporary use; later this property will
  *           instead point to the *scene* element that encodes the subjoining waybit’s interlink scene.
  *
  *
  * FORMATION of SESSION HISTORY STATE
  * ----------------------------------
  *   This program alters the value of History.state.  There it maintains a hierarchy
  *   of Object properties which it calls ‘statelets’:
  *
  *       Formal name            Informal name
  *       --------------------   --------------------
  *       History
  *         state                Statelet root
  *           data:,wayic.read   Program statelet
  *             *                Subprogram statelets
  *             *
  *             ⋮                         * Formal names and sub-hierarchies omitted
  *
  *
  * MARKUP INSERTS
  * --------------
  *   This program introduces its own markup to the document as outlined in the subsections below.
  *   Key to these outlines:
  *
  *       *          ∙ Any element in any namespace
  *       foo         ∙ Element ‘foo’ in namespace ‘data:,wayic.read’ *
  *       ns:foo       ∙ Element ‘foo’ in a given namespace †
  *           [attrib]   · Attribute of the element in namespace ‘data:,wayic.read’ *
  *           [:attrib]   · Attribute in no namespace
  *           [ns:attrib] · Attribute in a given namespace †
  *           ns:bar      · Child element ‘bar’ †
  *
  *                                       * The namespace defaults to NS_READ
  *                                       † Where *ns* is declared by an @namespace rule of readable.css
  *
  *   html:html ∙ Document element
  *   ---------
  *     [animatedShow] · Style rules that must animate or re-animate on each load of the document,
  *                      and on each revisit to it, must depend on this attribute.
  *     [lighting]      · Either ‘paper’ for black on white effects, or ‘neon’ for the reverse.
  *     [travelDelta]    · Travel distance in session history to reach the present entry
  *                        from the last entry of ours that was shown: -N, 0 or N
  *                        (backward by N entries, reload, or forward by N entries).  [OUR]
  *     [targetDirection] · (only if an element is window targeted) Direction to the targeted element
  *                         (target) from its hyperlink trigger.
  *         Value  Meaning
  *         ·····  ············································································
  *         self   Target and trigger are identical
  *         up     Target is above the trigger in document order
  *         down   Target is below the trigger
  *         in     Intradocument travel by extradocument trigger (e.g. bookmark or address bar)
  *         out    Extradocument travel (i.e. interdocument or from a non-document location)
  *
  *
  *   html:body
  *   ---------
  *     scene      ∙ Document scene
  *         [:id]   · ‘wayic.read.document_scene’
  *     scene        ∙ Interlink scene(s), if any.  There may be any number of these.
  *         [:class] · ‘interlink’
  *       ⋮
  *
  *     offWayScreen · Overlay screen for off-way styling, q.v. in readable.css
  *
  *
  *   *
  *   -----
  *     [isOnWayBranch] · Whether this element, with all its descendants, is on way  [BA]
  *
  *
  *   * (as a) Wayscript element
  *   --------------------------
  *     [hasLeader]        · Has leading, non-whitespace text?  [BA]
  *     [hasShortName]      · Has a visible name no longer than three characters?
  *     [isProperWayscript] · Is under a namespace whose identifier starts with ‘data:,wayscript.’?
  *     [isWaybit]          · Is a waybit?
  *
  *     eSTag       ∙ Start tag of an element, reproducing content that would otherwise be invisible
  *                   except in the wayscript source.
  *         eQName              ∙ Qualified name [XN] of the element.
  *             [isAnonymous]    · Has a local part that is declared to be anonymous?  [BA]
  *             ePrefix           ∙ Namespace prefix, if any.
  *                 [isAnonymous] · Has a prefix that is declared to be anonymous?
  *             eName             ∙ Local part of the name.
  *
  *     textAligner ∙ (only if element is a step)
  *
  *
  *   html:a, hyperlink trigger
  *   ------
  *     [showsBreadcrumb] · Holds and prominently shows the breadcrumb for this entry of the session
  *                         history?  Set after travelling back in history onto this element,
  *                         it reorients the user by highlighting his original point of departure.
  *                         Appears at most on one element.  [BA, FIB]
  *     [targetDirection] · Direction to the target (‘up’ or ‘down’) if the link is
  *                         an intradocument link and unbroken (its target exists).
  *
  *
  *   hyperform, presenter of a referential jointer or a generic hyperlink trigger (both take this form)
  *   ---------
  *     html:a         ∙ (§ q.v.)
  *         [cog:link] · (only if element *a* is a referential jointer)
  *     triggerMark    ∙ Hyperlink trigger indicator.  It contains ‘*’.
  *
  *
  *   * (as a) Bitform referential jointer
  *   ------------------------------------
  *     [hasPreviewString] · Has a non-empty subjoint preview string?  [BA]
  *     [imaging]          · Indicates a form that might yet change.  Meantime it is either based on
  *                          a cached image of the subjoining waybit (value ‘present’) or not (‘absent’).
  *     [isBroken] · Refers to a non-existent subjoining waybit, forming a broken joint?  [BA]
  *     [cog:link] ·
  *
  *     eSTag                  ∙ (q.v. under § Wayscript element)
  *     textAligner             ∙ (only if element is a step)
  *     bitform                  ∙ Jointing presenter
  *         html:a                ∙ (§ q.v.)
  *             [targetDirection] · (q.v. under § html:a)
  *             preview           ∙ Subjoint preview
  *             html:br           ∙
  *             verticalTruncator ∙ Indicator of the hyperlink trigger, and of the partialness
  *                                 of the subjoint preview.
  *                 html:span     ∙ Containing the visible indicator, exclusive of padding
  *
  *
  *   * (as a) Subjoining waybit
  *   ----------------------------
  *     [hasSubjoiningPotential] · Iff this attribute is absent, then the answer is ‘no’;
  *                                else its value is either ‘window targeted’ or ‘window untargeted’.
  *                                [FT in readable.css]
  *     [:id]            ·
  *     [isOrphan]        · Is potentially subjoining, yet referenced by no referential jointer?
  *     [showsBreadcrumb] · (q.v. under § html:a)
  *
  *     eSTag               ∙ (q.v. under § Wayscript element)
  *         html:div         ∙ Inway  [SH, ODO]
  *             [:class]      · ‘inway’
  *             svg:svg        ∙ Approach
  *                 [:class]    · ‘approach’
  *                 svg:circle   ∙ Edging
  *                     [:class] · ‘edging’
  *                 svg:path     ∙ Path
  *             hall             ∙
  *                 icon          ∙ Subjoining waybit icon
  *                     html:span ∙ Holder of main content
  *                     bullseye  ∙ Dimensionless point centered on icon
  *
  *
  * NOTES  (continued at bottom)
  * -----
  */
'use strict';
console.assert( (eval('var _tmp = null'), typeof _tmp === 'undefined'),
  'Failed assertion: Strict mode is in effect' );
  // http://www.ecma-international.org/ecma-262/6.0/#sec-strict-mode-code
  // Credit Noseratio, https://stackoverflow.com/a/18916788/2402790
window.wayic_read_readable = ( function()
{

    const expo = {}; // The public interface of this program



  /// ==================================================================================================
 ///  P u b l i c   i n t e r f a c e
/// ====================================================================================================


    /** The lighting style (aka ‘theme’) of the display, or null if none is yet set.  By default,
      * this program will set one of two lighting styles: either a black-on-white style called ‘paper’,
      * or a reverse video style called ‘neon’.  The choice it bases on what it can detect
      * of the browser’s settings, which it takes to be the user’s preference.
      *
      *     @return (string)
      *
      *     @see #setLightingStyle
      */
    expo.lightingStyle = function()
    {
        return document.documentElement/*html*/.getAttributeNS( NS_READ, 'lighting' );
    };



    /** Sets whether to enforce program constraints whose violations are expensive to detect.
      *
      *     @param to (boolean)
      *
      *     @see #toEnforceConstraints
      */
    expo.setEnforceConstraints = function( to ) { toEnforceConstraints = to? true: false; };



    /** Whether to enforce program constraints whose violations are expensive to detect.
      * The default is not to enforce them.  When enforced, a violation that is detected will cause
      * an exception to be thrown.
      *
      *     @return (boolean)
      *
      *     @see #setEnforceConstraints
      */
    expo.toEnforceConstraints = function() { return toEnforceConstraints; };


        let toEnforceConstraints = false;



    /** Sets the lighting style of the display, overriding the default.
      *
      *     @param lighting (string)
      *
      *     @see #lightingStyle
      */
    expo.setLightingStyle = function( lighting )
    {
        if( lighting === null ) throw NULL_PARAMETER;

        document.documentElement/*html*/.setAttributeNS( NS_READ, 'lighting', lighting )
    };



    /** Starts this program.
      */
    expo.start = function()
    {
      // Gross form
      // ----------
        transform();

      // Document shown, view stable in the typical case [SIC]
      // --------------
        ensureDocumentWillShow();
        if( LOAD_BREAKS_GROUND ) Viewporting.ensureTargetWillShow();

      // Processes launched, view may deflect in atypical cases
      // ------------------
        DocumentCachePersistor.start();
        AlterdocScanner.start();
        SurjointFinisher.start();
        WayTracer.start();
    };



  /// ==================================================================================================
 ///  P r e l i m i n a r y   d e c l a r a t i o n s
/// ====================================================================================================


    /** Whether the present document was requested from a 'file' scheme URL.
      */
    const wasRequestFileSchemed = document.URL.startsWith( 'file:' );



    /** Whether the user can likely edit the present document.
      */
    const isUserEditor = wasRequestFileSchemed;



    /** The XML namespace of markup specific to this project.
      */
    const NS_READ = 'data:,wayic.read';



    /** A copy of the statelet root for the present load of the document as captured at load time,
      * just prior to any initialization or modification of it.  Its value may be null.
      */
    const loadTimeHistoryState = history./*copy of*/state;



    /** The leading string that is common to all XML namespaces of wayscript.
      * Each namespace begins with this string, and ends by appending to it a unique subnamespace.
      *
      *     @see #SUB_NS_BIT
      *     @see #SUB_NS_COG
      *     @see #SUB_NS_STEP
      */
    const NS_WAYSCRIPT_DOT = 'data:,wayscript.';
    const NS_WAYSCRIPT_DOT_LENGTH = NS_WAYSCRIPT_DOT.length;



    const SHOW_ELEMENT = NodeFilter.SHOW_ELEMENT;



    /** The subnamespace of markup specific to waybits simply, excluding other waybits (such as steps).
      *
      *     @see #NS_WAYSCRIPT_DOT
      *     @see #NS_BIT
      */
    const SUB_NS_BIT = 'bit';



    /** The subnamespace of markup specific to cogs.
      *
      *     @see #NS_WAYSCRIPT_DOT
      *     @see #NS_COG
      */
    const SUB_NS_COG = 'cog';



    const SUB_NS_STEP = 'bit.step';



    /** The XML namespace of HTML.
      */
    const NS_HTML = 'http://www.w3.org/1999/xhtml';



   // ==================================================================================================
   //   U R I s


    /** Dealing with Uniform Resource Identifiers.
      *
      *     @see https://tools.ietf.org/html/rfc3986
      */
    const URIs = ( function()
    {

        const expo = {}; // The public interface of URIs



        /** Returns the same URI, but without a fragment.
          */
        expo.defragmented = function( uri )
        {
            // Changing?  sync'd → http://reluk.ca/project/wayic/lex/_/reader.js
            const c = uri.lastIndexOf( '#' );
            if( c >= 0 ) uri = uri.slice( 0, c );
            return uri;
        };



        /** The pattern of a full URI (as opposed to a URI reference)
          * which means a URI with a scheme component.
          *
          *     @see https://tools.ietf.org/html/rfc3986#section-1.1.1
          *     @see https://tools.ietf.org/html/rfc3986#section-3
          *     @see https://tools.ietf.org/html/rfc3986#section-3.1
          */
        expo.FULL_PATTERN = new RegExp( '^[A-Za-z0-9][A-Za-z0-9+.-]*:' );



        /** Answers whether the given URI is detected to have an abnormal form,
          * where such detection depends on whether *toEnforceConstraints*.
          *
          *     @see #normalized
          */
        expo.isDetectedAbnormal = function( uri )
        {
            return toEnforceConstraints && uri !== expo.normalized(uri)
        };



        /** Returns a message that the given URI is not in normal form.
          */
        expo.message_abnormal = function( uri ) { return 'Not in normal form: ' + uri; };



        /** Puts the given URI reference through the browser's hyperlink *href* parser,
          * thus converting any relative path to an absolute path (by resolving it against
          * the location of the present document) and otherwise normalizing its form.
          * Returns the normalized form.
          *
          *     @see URI-reference, https://tools.ietf.org/html/rfc3986#section-4.1
          */
        expo.normalized = function( ref )
        {
            // Modified from Matt Mastracci.
            // https://grack.com/blog/2009/11/17/absolutizing-url-in-javascript/
            //
            // Apparently this cannot be adapted for use with other documents, to normalize their own,
            // internally encoded references.  At least it fails when an equivalent function is
            // constructed (with parser element, etc.) against another document obtained through the
            // DocumentCache reading facility.  Then the *href* always yields the *undefined* value.
            //
            // FIX by moving to the more robust method of wayics.lex.
            // http://reluk.ca/project/wayic/lex/_/reader.js

            const div = hrefParserDiv;
            div.firstChild.href = ref; // Escaping ref en passant
            div.innerHTML = div.innerHTML; // Reparsing it
            return div.firstChild.href;
        };



       // - P r i v a t e ------------------------------------------------------------------------------


        const hrefParserDiv = document.createElementNS( NS_HTML, 'div' );

          hrefParserDiv.innerHTML = '<a/>';



        return expo;

    }() );



  /// ==================================================================================================
 ///  S i m p l e   d e c l a r a t i o n s   i n   l e x i c a l   o r d e r
/// ====================================================================================================



    /** The default message for console assertions.
      */
    const A = 'Failed assertion';



    /** Transforms an attribute declaration to a string.
      */
    function a2s( name, value ) { return name + "='" + value + "'"; }



    /** The message prefix for console assertions.
      */
    const AA = A + ': ';



    /** Returns the given node if it looks like an element and has the right name,
      * otherwise returns null.
      *
      *     @param name (string) The expected value of the *localName* property.
      *     @param node (Node)
      */
    function asElementNamed( name, node ) { return name === node.localName? node: null; }



    const BREAK_SYMBOL = '\u{1f5d9}';
      // Unicode 1f5d9 (cancellation X).  Changing? sync'd → readable.css.



    /** The location of the waycast (string) in normal URL form, and with a trailing slash '/'.
      *
      *     @see URIs#normalized
      */
    let CAST_BASE_LOCATION; // Init below, thence constant



    /** The nominal location of the waycast (string) in the form of a URI reference without a trailing
      * slash '/'.  Minimally it is formed as either an empty string '' (absolute reference),
      * or a single dot '.' (relative), such that appending a slash always yield a valid reference.
      * Otherwise it is taken directly from the waycast reference in the *src* attribute
      * of the *script* element that loads the waycaster's personal configuration script.
      *
      *     @see Personalized configuration, http://reluk.ca/project/wayic/cast/doc.task
      */
    const CAST_BASE_REF = ( ()=>
    {
        const configFileName = 'way.js';
        const traversal = document.createTreeWalker( document.body, SHOW_ELEMENT );
        for( let t = traversal.lastChild(); t !== null; t = traversal.previousSibling() )
        {
            if( t.localName === 'script' && t.namespaceURI === NS_HTML )
            {
                let r = t.getAttribute( 'src' );
                if( r && r.endsWith(configFileName) )
                {
                    let rN = r.length - configFileName.length;
                    if( rN === 0 ) return '.';

                    --rN;
                    if( r.charAt(rN) === '/' ) return r.slice( 0, rN ); // r without the trailing slash
                }
            }
        }

        tsk( 'Missing ' + configFileName + ' *script* element in document *body*' );
        return '__UNDEFINED_waycast_base__';
    })();



        {
            let loc = URIs.normalized( CAST_BASE_REF );
            if( !loc.endsWith('/') ) loc = loc + '/';
            CAST_BASE_LOCATION = loc;
        }



    const COMMENT_NODE = Node.COMMENT_NODE;



    /** Configures a bitform referential jointer for a given, actual subjoining waybit.
      *
      *     @param jtrNS (string) The namespace of the jointer.
      *     @param jtrN (string) The local part of the jointer's name.
      *     @param linkV (string) The value of the jointer's *link* attribute.
      *     @param sbj (Element | SubjointImage) The subjoining waybit, or its cached image.
      *     @param transform (PartTransformC)
      */
    function configureForSubjoint( jtrNS, jtrN, linkV, sbj, transform )
    {
        const sbjNS = sbj.namespaceURI;
        const sbjN = sbj.localName;
        if( jtrNS !== sbjNS )
        {
            tsk( 'Jointer namespace (' + jtrNS + ') differs from subjoining waybit namespace ('
              + sbjNS + ') for referential jointer: ' + a2s('link',linkV) );
        }
        if( jtrN === ELEMENT_NAME_UNCHANGED ) transform.localPartOverride = sbjN;
          // Transforming to the same name as the subjoining waybit
    }



    /** Configures a bitform referential jointer for a given subjoint *preview* element.
      *
      *     @param jointer (Element) The jointer.
      *     @param preview (Element) Its *preview* element.
      */
    function configureForSubjointPreview( jointer, preview, previewString )
    {
        const pointCount = countCodePoints( previewString );
        if( pointCount === 0 )
        {
            jointer.removeAttributeNS( NS_READ, 'hasPreviewString' );
            preview.classList.remove( 'singleCharacterContent' ); // If present
        }
        else
        {
            jointer.setAttributeNS( NS_READ, 'hasPreviewString', 'hasPreviewString' );
            preview.classList.toggle( 'singleCharacterContent', pointCount === 1 ); // [AEP]
        }
    }



    /** Returns the number of Unicode code points in string *str*.
      *
      *     @see http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-language-types-string-type
      */
    function countCodePoints( str )
    {
        const i = str[Symbol.iterator](); /* Iterates over code points, not just 16-bit 'character' units.
          http://www.ecma-international.org/ecma-262/6.0/#sec-string.prototype-@@iterator */
        let count = 0;
        while( !i.next().done ) ++count;
        return count;
    }



    /** The location of present document (string) in normal URL form.
      *
      *     @see URIs#normalized
      */
    const DOCUMENT_LOCATION = ( ()=>
    {
        // Changing?  sync'd → http://reluk.ca/project/wayic/lex/_/reader.js
        let loc = location.toString(); // [WDL]
        if( location.hash ) loc = URIs.defragmented( loc );
        return URIs.normalized( loc ); // To be certain
    })();



    const DOCUMENT_NODE = Node.DOCUMENT_NODE;



    const DOCUMENT_POSITION_FOLLOWING = Node.DOCUMENT_POSITION_FOLLOWING;
    const DOCUMENT_POSITION_PRECEDING = Node.DOCUMENT_POSITION_PRECEDING;



    const DOCUMENT_SCENE_ID = NS_READ + '.document_scene';



    const ELEMENT_NODE = Node.ELEMENT_NODE;



    /** The string that means *none* when it encodes the local part of a wayscript element's name.
      */
    const ELEMENT_NAME_NONE = '_';



    /** The name that, when it forms the local part of a referential jointer's name,
      * signifies *the same name* as the referent subjoining waybit.
      */
    const ELEMENT_NAME_UNCHANGED = '_same';



    /** Returns the CSS *em* length of the given element, which is defined as its *font-size*.
      *
      *     @see https://www.w3.org/TR/css-values/#em
      */
    function emLength( element )
    {
        return parseFloat( getComputedStyle(element).getPropertyValue( 'font-size' ));
    }



    /** Ensures that the content of the document, which initially is invisible on load,
      * will become visible to the user.
      */
    function ensureDocumentWillShow()
    {
      // Place the off-way screen
      // ------------------------
        const body = document.body;
        body.appendChild( document.createElementNS( NS_READ, 'offWayScreen' ));

      // Ensure a lighting style is set  (cf. expo.setLightingStyle)
      // -----------------------
        const html = document.documentElement;
        if( !html.hasAttributeNS( NS_READ, 'lighting' ))
        {
          // Detect user's lighting preference, or guess it
          // ---------------------------------
            let lighting;
            let defaultTextColour = getComputedStyle(body).getPropertyValue( 'color' );
              // Using 'color' here because somehow 'background-color' fails;
              // it reads as transparent (Firefox) or black (Chrome), when really it is white.
            const cc = defaultTextColour.match( /^\s*rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/ );
            if( cc !== null )
            {
                const red = cc[1], green = cc[2], blue = cc[3]; // Each 0-255
                const luma = red * 299 + green * 587 + blue * 114; // 0-255,000, perceived brightness
                  // formula: https://en.wikipedia.org/wiki/YIQ
                lighting = luma < 127500? 'paper':'neon';
            }
            else lighting = 'paper'; // Defaulting to what is most popular

          // Set lighting switch
          // -------------------
            html.setAttributeNS( NS_READ, 'lighting', lighting );
        }

      // Enable display of the document
      // --------------
        body.style.setProperty( 'display', 'block' ); // Overriding readable.css 'none'

      // Run page-show animations on load
      // ------------------------
        html.setAttributeNS( NS_READ, 'animatedShow', 'animatedShow' );

      // Restart page-show animations on each revisit [PSA]
      // ----------------------------
        addEventListener( 'pageshow', ( /*PageTransitionEvent*/e ) => // Load or revisit
        {
            if( !/*revisit*/e.persisted ) return;

            html.removeAttributeNS( NS_READ, 'animatedShow' );
            requestAnimationFrame( (()=> { requestAnimationFrame( (()=>
            {
                html.setAttributeNS( NS_READ, 'animatedShow', 'animatedShow' );
            })); }));
        });
        addEventListener( 'pagehide', ( /*PageTransitionEvent*/e ) =>
        {
            if( /*might later revisit*/e.persisted ) html.removeAttributeNS( NS_READ, 'pageShowCount' );
        });
    }



    /** The allowance for rounding errors and other imprecisions in graphics rendering.
      */
    const GRAPHICAL_ERROR_MARGIN = 0.01;



    /** Answers whether *ns* is a namespace of waybits.  That means either NS_BIT itself
      * or another namespace that starts with NS_BIT and a dot separator.
      * The only other defined at present is NS_STEP.
      *
      *     @param ns (string)
      */
    function isBitNS( ns )
    {
        const nsBitLen = NS_BIT.length;
        return ns.startsWith(NS_BIT) && (ns.length === nsBitLen || ns.charAt(nsBitLen) === '.');
    }



    /** Answers whether *subNS* is a subnamespace of waybits.  That means either 'bit' itself
      * or another subnamespace that starts with 'bit.'.
      *
      *     @param subNS (string) A wayscript namespace without the leading NS_WAYSCRIPT_DOT.
      */
    function isBitSubNS( subNS )
    {
        return subNS.startsWith(SUB_NS_BIT) && (subNS.length === 3 || subNS.charAt(3) === '.');
    }



    /** Returns the last descendant of the given node, or null if the node is empty.
      *
      *     @see #toLastDescendant
      */
    function lastDescendant( node )
    {
        do { node = node.lastChild } while( node.hasChildNodes() );
        return node;
    }



    /** Whether it appears that the user would be unable to correct faults in this program.
      */
    const isUserNonProgrammer = !wasRequestFileSchemed;



    /** Answers whether the present load of the document has extended the session history,
      * breaking new ground there by adding at least one new entry.  (Multiple entries may be added
      * by a single load owing to intradocument travel.)  A reload never breaks new ground.
      */
    const LOAD_BREAKS_GROUND = ( ()=>
    {
        if( loadTimeHistoryState === null ) return true;

        const sP = loadTimeHistoryState[NS_READ];
        if( sP === undefined ) return true;

        return sP.Breadcrumbs === undefined;
    })();



    /** @param sbj (Element) A subjoining waybit.
      * @param sbjID (string) The subjoining waybit's *id* attribute value.
      * @param sbjDocLoc (string) The location of the subjoint document in normal URL form.
      * @param leaderReader (LeaderReader) The leader reader to use, if necessary.
      *
      * @return (string) The subjoint preview string, or an empty string if there is none.
      */
    function makeSubjointPreviewString( sbj, sbjID, sbjDocLoc, leaderReader )
    {
        if( sbjID === 'resolve' && sbjDocLoc === ROOT_DOCUMENT_LOCATION ) return '';
          // Giving no preview string to commitment jointers.  Their special presentation and easy
          // familiarity to users reduce the need for any description here on the surjoint side.
          // So the subjoining waybit, which is the resolve waybit, may freely describe itself as such,
          // e.g. referring to its particular function or presentation on the *sub*joint side.  Such a
          // description would be inappropriate to replicate in a preview string on the surjoint side.

        leaderReader.read( sbj );
        return leaderReader.leader;
    }



    const MALFORMED_PARAMETER = 'Malformed parameter';



    /** Delay in milliseconds before the first delayed procedure of Inways.
      */
    const MS_DELAY_INWAYS = 49;

    /** Delay in milliseconds before the first delayed procedure of SurjointFinisher.
      */
    const MS_DELAY_SF = MS_DELAY_INWAYS + 142;

    /** Delay in milliseconds before the first delayed procedure of DocumentCachePersistor.
      */
    const MS_DELAY_DCP = MS_DELAY_SF + 1991;



    const NO_BREAK_SPACE = ' '; // Unicode a0



    /** The XML namespace of waybits simply, excluding subspaced waybits such as steps.
      */
    const NS_BIT  = NS_WAYSCRIPT_DOT + SUB_NS_BIT;



    /** The XML namespace of markup specific to cogs.
      */
    const NS_COG  = NS_WAYSCRIPT_DOT + SUB_NS_COG;



    /** The XML namespace of steps.
      */
    const NS_STEP = NS_WAYSCRIPT_DOT + SUB_NS_STEP;



    /** The XML namespace of SVG.
      */
    const NS_SVG = 'http://www.w3.org/2000/svg';



    const NULL_PARAMETER = 'Null parameter';



    /** The CSS *rem* length.
      *
      *     @see https://www.w3.org/TR/css-values/#rem
      */
    const REM = emLength( document.documentElement );



    /** The location of the way root document (string) in normal URL form.
      *
      *     @see http://reluk.ca/project/wayic/cast/way_root_document
      *     @see URIs#normalized
      */
    const ROOT_DOCUMENT_LOCATION = CAST_BASE_LOCATION + 'way.xht';



    /** @see JSON#stringify
      */
    const SESSION_STRINGIFY_SPACING = 1; /* Improving the readability of stored content at little cost,
      given that the session's storage space is practically unbounded. */



    /** Tests whether the given, *id* attributed element obeys certain identification constraints.
      * Returns true if it obeys them, otherwise reports the violation and returns false.
      *
      *     @param e (Element) An element with an *id* attribute.
      *     @param id (string) The value of the *id* attribute.
      *
      *     @see http://w3c.github.io/html/dom.html#element-attrdef-global-id
      */
    function testIdentification( e, id )
    {
        if( id === null ) throw NULL_PARAMETER;

        const doc = e.ownerDocument;
        console.assert( e.hasAttribute('id'), A );
        e.removeAttribute( 'id' );
        const eOther = doc.getElementById( id );
        e.setAttribute( 'id', id );
        if( eOther === null ) return true;

        tsk( 'Duplicate *id* declaration, value not unique: ' + a2s('id',id), doc );
        return false;
    }



    const TEXT_NODE = Node.TEXT_NODE;



    /** Moves the given tree walker to the last visible descendant of the current node.
      *
      *     @see #lastDescendant
      *     @see Document Object Model traversal § Visibility of nodes,
      *       https://www.w3.org/TR/DOM-Level-2-Traversal-Range/traversal.html#Iterator-Visibility-h4
      */
    function toLastDescendant( treeWalker ) { while( treeWalker.lastChild() ) {} }



    /** Tranforms the present document.
      */
    function transform()
    {
        const body = document.body;
        const scene = body.appendChild( document.createElementNS( NS_READ, 'scene' ));
        scene.setAttribute( 'id', DOCUMENT_SCENE_ID );
        for( ;; ) // Wrap *body* content in *scene*
        {
            const c = body.firstChild;
            if( c === scene ) break;

            scene.appendChild( c );
        }
        const traversal = document.createTreeWalker( scene, SHOW_ELEMENT, {
            acceptNode: function( node )
            {
                if( node.namespaceURI === NS_READ ) return NodeFilter.FILTER_REJECT; /* Bypassing this
                  branch which was introduced in an earlier iteration and needs no more transforming. */

                return NodeFilter.FILTER_ACCEPT;
            }
        });
        tt: for( ;; )
        {
            const t = traversal.nextNode(); // Maintaining *t* as the current element of the traversal
            if( t === null ) break;


          // ============
          // General form of element *t*
          // ============
            const tNS = t.namespaceURI;
            const tN = t.localName;
            let isBit, isHTML, isProperWayscript;
            let tSubNS; // Wayscript subnamespace, or null if element *t* is not wayscript
            if( tNS.startsWith( NS_WAYSCRIPT_DOT )) // Then element *t* is wayscript
            {
                isHTML = false;
                isProperWayscript = true;
                t.setAttributeNS( NS_READ, 'isProperWayscript', 'isProperWayscript' );
                tSubNS = tNS.slice( NS_WAYSCRIPT_DOT_LENGTH );
                isBit = isBitSubNS( tSubNS );
            }
            else // Element *t* is non-wayscript
            {
                isHTML = tNS === NS_HTML;
                isBit = isProperWayscript = false;
                tSubNS = null;
            }


          // ============
          // Hyperlinkage by element *t*
          // ============
            hyperlinkage: if( isHTML && tN === 'a' )
            {
                let href = t.getAttribute( 'href' );
                const linkV = t.getAttributeNS( NS_COG, 'link' );
                let targetExtradocLocN; // Or empty string, as per TargetWhereabouts.documentLocationN
                if( href !== null ) // Then *t* is a generic hyperlink
                {
                    if( linkV !== null )
                    {
                        tsk( 'An *a* element with both *href* and *link* attributes: '
                          + a2s('href',href) + ', ' + a2s('link',link) );
                    }
                    if( href.startsWith( '/' )) t.setAttribute( 'href', href = CAST_BASE_REF + href );
                      // Translating waycast space → universal space
                }
                else if( linkV !== null ) // Then *t* is a hyperform referential jointer
                {
                    let link;
                    try { link = new LinkAttribute( linkV ); }
                    catch( unparseable )
                    {
                        tsk( unparseable );
                        break hyperlinkage;
                    }

                    link.hrefTo( t );
                    const sbjWhereabouts = TargetWhereabouts.fromJointer( t, link );
                    const direction = sbjWhereabouts.direction;
                    if( direction !== null ) t.setAttributeNS( NS_READ, 'targetDirection', direction );
                    const sbjDocLocN = sbjWhereabouts.documentLocationN;
                    if( sbjDocLocN.length > 0 ) SurjointFinisher.noteSubjoiningDocument( sbjDocLocN );
                      // Else jointer *t* forms an intradocument joint
                }

              // Hyperform
              // ---------
                const hyperform = document.createElementNS( NS_READ, 'hyperform' );
                t.parentNode.insertBefore( hyperform, t );
                hyperform.appendChild( t );
                const mark = hyperform.appendChild( document.createElementNS( NS_READ, 'triggerMark' ));
                mark.appendChild( document.createTextNode( '*' )); // '*' is Unicode 2a (asterisk).
                  // It needs no superscript styling, the font takes care of it.
            }

            if( !isProperWayscript ) continue tt;


          ////////////////////////////////////////////////////////////////////////////  PROPER WAYSCRIPT

            const isDeclaredEmpty = !t.hasChildNodes(); // Captured now, before inserting any markup
            const partTransform = new PartTransformC( t );
            if( isBit )
            {
                t.setAttributeNS( NS_READ, 'isWaybit', 'isWaybit' );
                if( toEnforceConstraints && tN.startsWith('_')
                 && tN !== ELEMENT_NAME_NONE
                 && tN !== ELEMENT_NAME_UNCHANGED ) tsk( 'A waybit with a reserved name: ' + tN );
                if( tSubNS === SUB_NS_STEP )
                {
                    const textAligner = document.createElementNS( NS_READ, 'textAligner' );
                    t.insertBefore( textAligner, t.firstChild );
                }
            }


          // ================
          // Bitform jointing by element *t*
          // ================
            const lidV = ( ()=> // Element identifier, non-null if *t* is a potential subjoining waybit
            {
                if( !isBit ) return null;

                const v = t.getAttribute( 'id' );
                if( v && testIdentification(t,v) ) return v;

                return null;
            })();
            const linkV = ( ()=> // Subjoining waybit reference, non-null if *t* is a jointer
            {
                let v = t.getAttributeNS( NS_COG, 'link' );
                if( v === null ) return null;

                if( !isBit )
                {
                    tsk( 'A non-waybit element with a *link* attribute: ' + a2s('link',v) );
                    v = null;
                }
                return v;
            })();
            jointer: if( linkV !== null )
            {
                if( lidV !== null )
                {
                    tsk( 'A bitform referential jointer with both *id* and *link* attributes: '
                      + a2s('id',lidV) );
                    break jointer;
                }

                if( !isDeclaredEmpty )
                {
                    tsk( 'A bitform referential jointer with content: ' + a2s('link',linkV) );
                    break jointer;
                }

                let link;
                try { link = new LinkAttribute( linkV ); }
                catch( unparseable )
                {
                    tsk( unparseable );
                    break jointer;
                }

                const bitform = t.appendChild( document.createElementNS( NS_READ, 'bitform' ));
                const a = bitform.appendChild( document.createElementNS( NS_HTML, 'a' ));
                link.hrefTo( a );
                const sbjWhereabouts = TargetWhereabouts.fromJointer( t, link );
                const sbjDocLocN = sbjWhereabouts.documentLocationN;
                let previewString;
                subjoint:
                {
                    if( sbjDocLocN.length > 0 ) // Then *t* refers to a separate document
                    {
                        const registration = SurjointFinisher.registerBitformJointer( t,
                          link.subjointID, sbjDocLocN );
                        const image = registration.subjointImage;
                        if( image === null )
                        {
                            partTransform.imaging = 'absent';
                            previewString = '⌚'; // Unicode 231a (watch) = pending symbol
                        }
                        else
                        {
                            partTransform.imaging = 'present';
                            previewString = image.previewString;
                            configureForSubjoint( tNS, tN, linkV, image, partTransform );
                        }
                        break subjoint;
                    }

                    const direction = sbjWhereabouts.direction;
                    if( direction === null ) // Then the joint is broken
                    {
                        previewString = BREAK_SYMBOL;
                        t.setAttributeNS( NS_READ, 'isBroken', 'isBroken' );
                        break subjoint;
                    }

                    // The subjoining waybit is within the present document
                    a.setAttributeNS( NS_READ, 'targetDirection', direction );
                    const sbj = sbjWhereabouts.target;
                    configureForSubjoint( tNS, tN, linkV, sbj, partTransform );
                    previewString = makeSubjointPreviewString( sbj, link.subjointID, sbjDocLocN,
                      LeaderReader );
                }
                const preview = a.appendChild( document.createElementNS( NS_READ, 'preview' ));
                preview.appendChild( document.createTextNode( previewString ));
                configureForSubjointPreview( t, preview, previewString );
                a.appendChild( document.createElementNS( NS_HTML, 'br' ));
                a.appendChild( document.createElementNS( NS_READ, 'verticalTruncator' ))
                 .appendChild( document.createElementNS( NS_HTML, 'span' ))
                 .appendChild( document.createTextNode( '⋱⋱' ));
                    // '⋱' is Unicode 22f1 (down right diagonal ellipsis)
            }


         // =========
         // Start tag of element *t*
         // =========
            if( tSubNS === SUB_NS_COG && tN === 'group' )
            {
                if( t.getAttribute('rel') !== 'in' )
                {
                    tsk( "A *group* element without the mandatory *rel* attribute, e.g. rel='in'" );
                }
                partTransform.localPartOverride = ''; // Emptied to accomodate text shipment, q.v. below
                partTransform.run();

              // Qualifying text for the group
              // ---------------
                console.assert( LeaderReader.element === t, A );
                if( LeaderReader.hasLeader ) // Then ship it into the start tag, for sake of alignment
                {
                    let n;
                    function isSafeToMove()
                    {
                        const type = n.nodeType;
                        return type === TEXT_NODE || type === COMMENT_NODE
                          || type === ELEMENT_NODE && n.namespaceURI === NS_HTML
                                                   && willDisplayInLine_likely( n );
                    }
                    const eSTag = partTransform.eSTag;
                    const eQName = asElementNamed( 'eQName', eSTag.firstChild );
                    for( n = eSTag.nextSibling; n != null && isSafeToMove(); n = n.nextSibling )
                    {
                        eQName.appendChild( n );
                    }
                }
                continue tt;
            }

            partTransform.run();
            if( lidV !== null ) // Then *t* is potentially subjoining
            {
                t.setAttributeNS( NS_READ, 'hasSubjoiningPotential',
                  lidV === Hyperlinkage.windowTargetedID()? 'window targeted':'window untargeted' );
                t.setAttributeNS( NS_READ, 'isOrphan', 'isOrphan' ); // Till proven otherwise
                const eSTag = partTransform.eSTag;

              // Inway
              // -----
                const inway = eSTag.appendChild( document.createElementNS( NS_HTML, 'div' ));
                inway.setAttribute( 'class', 'inway' );
                inway.appendChild( Approaches.newApproach() );
                const icon = inway.appendChild( document.createElementNS( NS_READ, 'hall' ))
                                  .appendChild( document.createElementNS( NS_READ, 'icon' ));
                icon.appendChild( document.createElementNS( NS_HTML, 'span' ))
                    .appendChild( document.createTextNode( '│' ));
                      // Unicode 2502 (box drawings light vertical)
                icon.appendChild( document.createElementNS( NS_READ, 'bullseye' ));
                Inways.layWhen( inway, eSTag );

              // -----
                SelfLinkingControl.addControls( eSTag );
            }
        }
    }



    /** Reports a rule violation or formal fault, such as malformed wayscript,
      * that a user with write access to the present document might be able to correct.
      *
      *     @param report (string)
      *     @param doc (Document) The document in which the violation or fault occurs.
      *       Typically this parameter is left undefined.  Otherwise a value that is unequal
      *       to the present document will defeat the function call, causing no report to be sent.
      */
    function tsk( report, doc )
    {
        if( report === null ) throw NULL_PARAMETER;

        if( doc !== undefined )
        {
            if( doc.nodeType !== DOCUMENT_NODE ) throw MALFORMED_PARAMETER;

            if( doc !== document ) return;
        }

        console.warn( report );
        if( isUserEditor ) alert( report ); // See readable.css § TROUBLESHOOTING
    }



    /** The empty string as a parameter for CSSStyleDeclaration.setProperty,
      * which instead has the effect of *removeProperty*.
      *
      *     @see https://drafts.csswg.org/cssom/#dom-cssstyledeclaration-setproperty
      */
    const UNSET_STYLE = '';



    /** Answers whether the browser will lay out the given element in line.
      * Thus is likely to be a slow test.
      */
    function willDisplayInLine( element )
    {
        const elementNS = element.namespaceURI;
        if( elementNS.startsWith( NS_WAYSCRIPT_DOT )) return false; // No wayscript element is inlined

        const styleDeclarations = getComputedStyle( element );
        const displayStyle = styleDeclarations.getPropertyValue( 'display' );
        if( displayStyle === 'inline' ) return true;

        if( styleDeclarations.length === 0 ) // Then something is wrong
        {
            // Work around it.  Apparent browser bug (Chrome 59).  "All longhand proper-
            // ties that are supported CSS properties" must be reported, ∴ length should
            // be > 0.  https://drafts.csswg.org/cssom/#dom-window-getcomputedstyle
            if( elementNS === NS_HTML && willDisplayInLine_likely(element) ) return true;
        }

        return false;
    }



    /** Answers whether the browser is very likely to lay out the given HTML element in line.
      * Thus is a fast test.
      */
    function willDisplayInLine_likely( htmlElement )
    {
        switch( htmlElement.localName )
        {
            case 'a':
            case 'abbr':
            case 'b':
            case 'bdi':
            case 'bdo':
            case 'br': // Not displayed at all
            case 'cite':
            case 'code':
            case 'data':
            case 'del':
            case 'dfn':
            case 'em':
            case 'i':
            case 'ins':
            case 'kbd':
            case 'mark':
            case 'q':
            case 's':
            case 'samp':
            case 'small':
            case 'span':
            case 'strong':
            case 'sub':
            case 'sup':
            case 'u':
            case 'var':
            case 'wbr':
                return true;
        }

        return false;
    }



  /// ==================================================================================================
 ///  C o m p o u n d   d e c l a r a t i o n s   i n   l e x i c a l   o r d e r
/// ====================================================================================================


   //   A l t e r d o c   S c a n n e r


    /** A scanner of related documents.  It discovers related documents, scans them for references
      * to the present document, and updates the form of the present document based on the results.
      * It finishes the presentation of referential joints on the subjoint side (figure right).
      *
      *                    surjoint           Surjoint    *
      *                      ancestors          side     *    Subjoint
      *                    ╱                            *       side
      *                   ╱    surjoining              *
      *                  ╱       waybit               *
      *         waybit         ╱                     *
      *                       ╱                     *               subjoining
      *             waybit   ╱                      *                 waybit
      *                                             *               ╱
      *              ┌  waybit                      *              ╱
      *              │      Text content            *             ╱
      *     joint ───┤· · · · · · · · · · · · · · · * · · · · · · · · · · · · · ·
      *              │      waybit                  *     ◉  waybit
      *              └          Text content        *            Text content
      *                     ╱     ⋱⋱                *
      *                    ╱          ╲             *            waybit
      *                   ╱            ╲            *
      *              jointer            ╲           *                waybit
      *            (in bitform)       subjoint      *            ╱
      *                                 preview     *           ╱
      *                                             *          ╱
      *                                            *        subjoint
      *                                           *       descendants
      *                                          *
      *
      *     @see SurjointFinisher, it finishes joints on the surjoint side (figure left).
      */
    const AlterdocScanner = ( function()
    {

        const expo = {}; // The public interface of AlterdocScanner



        /** Starts this scanner.
          */
        expo.start = function()
        {
            DocumentCachePersistor.addOmnireader( new class extends DocumentReader
            {
                read( cacheEntry, doc ) { scan( doc, cacheEntry.location ); }
            });
        };



       // - P r i v a t e ------------------------------------------------------------------------------


        /** Notes the fact of an unbroken intradocument joint.
          *
          *     @param sbj (Element) The joint's subjoining waybit, located within the present document.
          */
        function noteJoint( sbj )
        {
            if( sbj.interlinkScene ) return; // Already noted

            sbj.interlinkScene = true;
            const span = asElementNamed( 'span', sbj.firstChild/*eSTag*/
              .lastChild/*inway*/.lastChild/*hall*/.firstChild/*icon*/.firstChild );
            const iconicText = span.firstChild;
            iconicText.replaceData( 0, iconicText.length, '\u{1f78b}' ); // Unicode 1f78b (round target)
            sbj.removeAttributeNS( NS_READ, 'isOrphan' );
        }



        /** @param doc (Document) The document to scan, which might be the present document.
          * @param docLoc (string) The location of the document in normal form.
          */
        function scan( doc, docLoc )
        {
            const traversal = doc.createNodeIterator( doc, SHOW_ELEMENT );
            for( traversal.nextNode()/*onto the document node itself*/;; )
            {
                const t = traversal.nextNode();
                if( t === null ) break;

                const linkV = t.getAttributeNS( NS_COG, 'link' );
                if( linkV === null ) continue;

                let link;
                try { link = new LinkAttribute( linkV ); }
                catch( unparseable ) { continue; }

                // No need here to fend against other types of malformed link declaration.
                // Rather take it as the wayscribe intended.
                let sbjDocLoc = link.subjointDocumentLocation;
                sbjDocLoc = sbjDocLoc.length > 0? URIs.normalized(sbjDocLoc): docLoc;
                if( sbjDocLoc !== DOCUMENT_LOCATION ) continue;

                const sbj = document.getElementById( link.subjointID );
                if( sbj !== null) noteJoint( sbj );
            }
        }



        return expo;

    }() );



   // ==================================================================================================
   //   A p p r o a c h e s


    /** Dealing with *approaches*.  The *approach* is an inway component that draws vector graphics
      * for a subjoining waybit and controls the scene switching for it.
      *
      *             approach path
      *     ● ━━━━━━━━━━━━━━━━━━━━━━━━━━━
      *      ╲
      *      edging
      *
      * @see Inways
      */
    const Approaches = ( function()
    {

        const expo = {}; // The public interface of Approaches

        // Dimensions and coordinates are here given in pixels, except where marked otherwise.



        /** The smallest width in which an *approach* can correctly draw itself.
          */
        expo.minimumWidth = function() { return MIN_WIDTH; };



        /** Constructs an inway *approach*.
          */
        expo.newApproach = function()
        {
            const approach = document.createElementNS( NS_SVG, 'svg' );
            approach.setAttribute( 'class', 'approach' );
         // approach.addEventListener( 'resize', (_UIEvent)=>{expo.redraw(approach);} );
              // Ensuring it draws when first laid, then redraws as needed.
              //
              // Except it is not called.  Likewise for event name 'SVGResize' and attribute *onresize*.
              // Maybe embedded svg elements such as this are not considered "outermost svg elements"?
              // https://www.w3.org/TR/SVG11/interact.html#SVGEvents
              //
              // As a workaround, Inways calls *redraw* directly.
            const edging = approach.appendChild( document.createElementNS( NS_SVG, 'circle' ));
            edging.setAttribute( 'class', 'edging' );
            approach.appendChild( document.createElementNS( NS_SVG, 'path' )); // Approach path
            return approach;
        };



        /** Draws or redraws the given *approach*.
          *
          *     @param approach (SVGSVGElement)
          */
        expo.redraw = function( approach, width, height )
        {
         // const bounds = approach.getBBox(); /* The actual bounds within the larger document.
         //   These define the coordinate system of the drawing because the *approach* (*svg* element)
         //   declares no *viewBox*.  Therefore the default unit (SVG 'user unit') is pixels. */
         // const width = bounds.width;
         // const height = bounds.height;
         /// That failed, now they're given as parameters instead

          // Draw the approach path
          // ----------------------
            const midY = height / 2; // Vertically centered
            {
                const path = asElementNamed( 'path', approach.lastChild );
                const endX = width - width / 4;
                let display;
                if( endX - GAP >= PATH_MIN_LENGTH )
                {
                    path.setAttribute( 'd',
                      // [PD]     X             Y
                      //        ------         ----
                         'M ' + GAP + ' ' + midY
                      + ' H ' + endX
                      );
                    display = UNSET_STYLE; // To whatever it was
                }
                else display = 'none'; // Too short
                path.style.setProperty( 'display', display );
            }

          // Draw the edging
          // ---------------
            const mark = asElementNamed( 'circle', approach.firstChild );
            mark.setAttribute(  'r', EDGE_MARK_RADIUS + 'px' );
            mark.setAttribute( 'cx', EDGE_MARK_RADIUS + 'px' ); // Abutting the document edge
            mark.setAttribute( 'cy', midY + 'px' );
        };



       // - P r i v a t e ------------------------------------------------------------------------------


        /** The gap between the edging and the path to its right.
          */
        const GAP = 2/*rem*/ * REM;



        const EDGE_MARK_WIDTH = 0.3/*rem*/ * REM;
        const EDGE_MARK_RADIUS = EDGE_MARK_WIDTH / 2;



        const MIN_CLICK_WIDTH_REM = 0.8; // Changing? sync'd → readable.css



        const MIN_WIDTH = MIN_CLICK_WIDTH_REM * REM;

            { console.assert( EDGE_MARK_WIDTH - MIN_WIDTH <= GRAPHICAL_ERROR_MARGIN, A ); }



        const PATH_MIN_LENGTH = GAP;



        return expo;

    }() );



   // ==================================================================================================
   //   B r e a d c r u m b s


    /** Cueing for the purpose of user reorientation after hyperlink back travel.  For this purpose
      * are maintained, in subprogram statelet 'Breadcrumbs', the following properties:
      *
      *     triggerPath · Identifier (string in XPath form) of the nominal hyperlink trigger
      *                   whose activation caused the latest exit from the present entry
      *                   of the session history.  It is null if the present entry was never exited,
      *                   and null if the latest exit had some other cause.
      *                       or its last exit had some other cause.
      *     targetDirection · Q.v. under § MARKUP INSERTS § html:html
      *     travel          · Ordinal (number) of the present entry within the session history,
      *                       a number from zero (inclusive) to the history length (exclusive).
      *
      * @see § FORMATION of SESSION HISTORY STATE
      */
    const Breadcrumbs = ( function()
    {

        const expo = {}; // The public interface of Breadcrumbs



        /** @param t (Element) The nominal hyperlink trigger on which to drop the crumb.
          */
        expo.dropCrumb = function( t )
        {
            travelStop.trigger = t;
            dropCrumb_store( definitePath(t) );
            if( crumbShower === t ) return; // None is showing, or none other than *t*

            hideCrumb(); // Removed above and dropped on *t*, it is no longer where it appears to be
        };


            function dropCrumb_store( p ) // p → statelet property Breadcrumbs.triggerPath
            {
                const state = history./*copy of*/state;
                console.assert( state !== null, A ); // Assured by *reorient*
                const statelet = state[NS_READ].Breadcrumbs;
                console.assert( statelet !== undefined, A ); // Assured by *reorient*
                if( statelet.triggerPath === p ) return; // Already stored

                statelet.triggerPath = p;
                history.replaceState( state, /*no title*/'' );
            }



       // - P r i v a t e ------------------------------------------------------------------------------


        /** The element (Element) on which attribute *showsBreadcrumb* is set, or null if there is none.
          */
        let crumbShower = null;



        /** Constructs an XPath locator of the given element that is unambiguous within the context
          * of the present document.
          *
          *     @param element (Element)
          *     @return (string)
          */
        function definitePath( element )
        {
            // Modified from Mozilla contributors' *XPath snippets*, licence CC-BY-SA 2.5.
            // https://developer.mozilla.org/en-US/docs/Web/XPath/Snippets#getXPathForElement
            const html = document.documentElement;
            let path = '';
            path: for( let e = element;; e = e.parentNode )
            {
                const eLocalName = e.localName;
                let seg = "/*[local-name()='" + eLocalName + "']"; // Segment of path
                if( e === html )
                {
                    path = seg + path;
                    break path;
                }

                let ordinal = 1; // Ordinals count from 1 in XPath
                for( let sibling = e;; )
                {
                    sibling = sibling.previousElementSibling;
                    if( sibling === null ) break;

                    if( sibling.localName === eLocalName ) ++ordinal;
                }
                seg +=  '[' + ordinal + ']';
                path = seg + path;
            }
            return path;
        }



        /** @param click (MouseEvent) A click event from within the document element.
          */
        function hearClick/* event handler */( click )
        {
            for( let t = click.target;; t = t.parentNode )
            {
                if( t.namespaceURI !== NS_HTML ) continue;

                const tN = t.localName;
                if( tN === 'body' || tN === 'html' ) break;

                if( tN !== 'a'/*hyperlink trigger*/ ) continue;

                if( !t.hasAttribute( 'href' )) break; // Dud link

              // Drop a crumb before traversing the hyperlink
              // ------------
                expo.dropCrumb( t );
                return;
            }

            hideCrumb(); /* This click (which is not a hyperlink activation)
              might be an attempt to hide a previously dropped crumb that is showing. */
        }



        function hideCrumb() // If any is showing
        {
            if( crumbShower === null ) return;

            crumbShower.removeAttributeNS( NS_READ, 'showsBreadcrumb' );
            crumbShower = null;
        }



        /** Session storage key (string) for the ordinal (in string form) of the last entry shown.
          */
        const SS_KEY_travelLast = NS_READ + '.Breadcrumbs.travelLast';



        const ORDERED_NODE_ITERATOR_TYPE = XPathResult.ORDERED_NODE_ITERATOR_TYPE;



        /** Reorient after travel.
          *
          *     @param state (Object) The value of History.state subsequent to the change.
          */
        function reorient( state )
        {
            // Copied in part to https://stackoverflow.com/a/49329267/2402790

            const statelet = ( ()=> // state[NS_READ].Breadcrumbs
            {
              // Create this subprogram statelet, if necessary
              // -------------------------------
                if( state === null ) return (( state = {} )[NS_READ] = {} ).Breadcrumbs = {};

                let s;
                s = state[NS_READ];
                if( s === undefined ) return ( state[NS_READ] = {} ).Breadcrumbs = {};

                s = s.Breadcrumbs;
                if( s === undefined ) return s.Breadcrumbs = {};

                return s;
            })();
            travel = statelet.travel;
            if( travel === undefined ) // Then this entry is new to the session history
            {
                const historyLength = history.length;
                travel = historyLength - 1; // Last entry of session history

              // Sync → travelStops
              // ------------------
                travelStops.length = historyLength;
                travelStops[travel] = travelStop = new TravelStop();

              // Initialize the subprogram statelet
              // ----------------------------------
                statelet.triggerPath = null; // Properly formed, as per Breadcrumbs contract
                statelet.travel = travel;
                statelet.targetDirection = ( ()=>
                {
                    Hyperlinkage.refresh();
                    const windowTargetedElement = Hyperlinkage.windowTargetedElement();
                    if( windowTargetedElement === null ) return null;

                    const previousStop = travelStops[travel-1];
                    if( previousStop === undefined ) return 'out';

                    const trigger = previousStop.trigger;
                    if( trigger === null )  return 'in';

                    if( trigger === windowTargetedElement ) return 'self';

                    const dP = trigger.compareDocumentPosition( windowTargetedElement );
                    if( dP & DOCUMENT_POSITION_PRECEDING ) return 'up';

                    console.assert( dP & DOCUMENT_POSITION_FOLLOWING, A );
                    return 'down';
                })();
                history.replaceState( state, /*no title*/'' );
            }
            else // This entry was pre-existing
            {
              // Sync → travelStops
              // ------------------
                travelStop = travelStops[travel];
                if( travelStop === undefined ) travelStops[travel] = travelStop = new TravelStop();
            }

          // Mark the travel delta
          // ---------------------
            const html = document.documentElement;
            const delta = ( ()=>
            {
                const s = sessionStorage.getItem( SS_KEY_travelLast ); // [FSS]
             // console.assert( s !== null, A ); /* This entry in the session history is revisited
             //   ∵ travel !== undefined.  ∴ at least one entry of ours was previously visited.
             //   But each entry (of ours) stores *s*.  How then could *s* be null?  [OUR] */
             /// Yet it is null on return from HTTP document to file-scheme document (Firefox 60)
                const travelLast = Number( s );
                return travel - travelLast;
            })();
            html.setAttributeNS( NS_READ, 'travelDelta', delta );

          // Stamp the session with the ordinal of the last entry shown, which is now this entry
          // -----------------
            sessionStorage.setItem( SS_KEY_travelLast, String(travel) );

          // Mark the target direction
          // -------------------------
            {
                const d = statelet.targetDirection;
                if( d === null ) html.removeAttributeNS( NS_READ, 'targetDirection' );
                else html.setAttributeNS( NS_READ, 'targetDirection', d );
            }

          // Ensure a crumb is showing or not, as appropriate
          // -------------------------
            sC:
            {
                if( delta >= 0 )
                {
                    hideCrumb();
                    break sC;
                }

                const p = statelet.triggerPath;
                if( p === null )
                {
                    hideCrumb();
                    break sC;
                }

                const pR = document.evaluate( p, document, /*namespace resolver*/null,
                  ORDERED_NODE_ITERATOR_TYPE, /* XPathResult to reuse*/null );
                const s = pR.iterateNext(); // Resolved hyperlink trigger
                console.assert( pR.iterateNext() === null, A ); /* At most there is the one
                  if *definitePath* is unambiguous, as claimed and required. */
                if( crumbShower === s ) break sC;

              // Show crumb
              // ----------
                hideCrumb(); // Removing it from present *crumbShower*, if any
                s.setAttributeNS( NS_READ, 'showsBreadcrumb', 'showsBreadcrumb' );
                crumbShower = s;
            }
        }



        /** Ordinal (number) of the present entry within the session history,
          *
          *     @see Statelet property Breadcrumbs.travel
          */
        let travel;



        /** The present stop in session history.
          */
        let travelStop;



        class TravelStop
        {

            constructor() { this._trigger = null; }


            /** The nominal hyperlink trigger (Element) whose activation caused the latest exit
              * from this stop.  It is null if the stop was never exited during the present load
              * of the document, and null if the latest exit had some other cause.
              *
              *     @see Statelet property Breadcrumbs.triggerPath
              */
            get trigger() { return this._trigger; }
            set trigger( _ ) { this._trigger = _; }

        }



        /** Sparse array of stops in session history.  Stored at index *travel* are the present stop
          * and, contiguous with it, all other stops accessible to the present load of the document.
          */
        const travelStops = [];



        document.documentElement.addEventListener( 'click', hearClick );
        addEventListener( 'pageshow', ( _PageTransitionEvent ) => // Document load or revisit
        {
            reorient( history./*copy of*/state ); // Firefox can have the wrong value here [FHS]
        });
        addEventListener( 'popstate', ( /*PopStateEvent*/pop ) => // Intradocument travel
        {
            reorient( pop.state );
        });
        addEventListener( 'pagehide', ( /*PageTransitionEvent*/e ) =>
        {
            if( travelStop.trigger === null )
            {
                dropCrumb_store( null ); /* Clear any *triggerPath* from the statelet
                  because this exit is not caused by a hyperlink activation. */
                if( /*might later revisit*/e.persisted ) hideCrumb();
            }
        });
        return expo;

    }() );



   // ==================================================================================================
   //   D o c u m e n t   C a c h e


        class DocumentCacheEntry
        {


            /** Constructs a DocumentCacheEntry.
              *
              *     @see #document
              *     @see #location
              *     @see #readers
              */
            constructor( document, location, readers )
            {
                this._document = document;
                this._location = location;
                this._readers = readers;
            }



            /** The cached document, or null if document storage is pending or failed.
              *
              *     @return (Document)
              */
            get document() { return this._document; }
            set document( _ ) { this._document = _; }



            /** The location of the document in normal URL form.
              *
              *     @return (string)
              *     @see URIs#normalized
              */
            get location() { return this._location; }



            /** The readers to notify of document storage.
              * This property is nulled when notification commences.
              *
              *     @return (Array of DocumentReader)
              */
            get readers() { return this._readers; }
            set readers( _ ) { this._readers = _; }


        }



    /** Store of way declaration documents, including the present document.
      */
    const DocumentCache = ( function()
    {

        const expo = {}; // The public interface of DocumentCache

        // Changing?  sync'd → http://reluk.ca/project/wayic/lex/_/reader.js



        /** Registers a reader of all cached documents.  Immediately the reader is given all entries
          * whose processing is complete; then later any newly completed entries, each as it completes.
          *
          *     @param r (DocumentReader)
          */
        expo.addOmnireader = function( r )
        {
            for( const entry of entryMap.values() )
            {
                if( entry.readers === null ) notifyReader( r, entry );
            }
            omnireaders.push( r );
        };



        /** @return (Iterator of DocumentCacheEntry)
          */
        expo.entries = function() { return entryMap.values(); };



        /** Gives the indicated document to the reader.  If already the document is stored,
          * then immediately it calls reader.read, followed by reader.close.
          *
          * Otherwise this function starts a storage process and returns.  If the process eventually
          * succeeds, then it calls reader.read.  Regardless it ends by calling reader.close.
          *
          *     @param docLoc (string) The document location in normal URL form.
          *     @param reader (DocumentReader)
          *
          *     @see URIs#normalized
          */
        expo.readNowOrLater = function( docLoc, reader )
        {
            if( URIs.isDetectedAbnormal( docLoc )) throw URIs.message_abnormal( docLoc );

            let entry = entryMap.get( docLoc );
            if( entry !== undefined ) // Then the document was already requested
            {
                const readers = entry.readers;
                if( readers !== null ) readers.push( reader );
                else notifyReader( reader, entry );
                return;
            }

            const readers = [];
            entry = new DocumentCacheEntry( /*document*/null, docLoc, readers );
            readers.push( reader );
            entryMap.set( docLoc, entry );

          // ===================
          // Configure a request for the document
          // ===================
            const req = new XMLHttpRequest();
            req.open( 'GET', docLoc, /*async*/true ); // Misnomer; opens nothing, only sets config
         // req.overrideMimeType( 'application/xhtml+xml' );
         /// Still it parses to an XMLDocument (Firefox 52), unlike the present document
            req.responseType = 'document';
            req.timeout = docLoc.startsWith('file:')? 2000: 8000; // ms

          // ===========
          // Stand ready to catch the response
          // ===========
            req.onabort = ( _event/*ignored*/ ) =>
            {
                console.warn( 'Document request aborted: ' + docLoc );
            };
            req.onerror = ( _event/*ignored*/ ) =>
            {
                // Parameter *_event* is a ProgressEvent, at least on Firefox,
                // which contains no useful information on the specific cause of the error.

                console.warn( 'Document request failed: ' + docLoc );
            };
            req.onload = ( event ) =>
            {
                // If this listener is registered instead by req.addEventListener,
                // then the file scheme workaround fails for Firefox (52),
                // even for intra-directory requests. [SPF in readable.css]

                const doc = event.target.response;
                entry.document = doc;

              // Test *id* declarations
              // ----------------------
                const traversal = doc.createNodeIterator( doc, SHOW_ELEMENT );
                for( traversal.nextNode()/*onto the document node itself*/;; )
                {
                    const t = traversal.nextNode();
                    if( t === null ) break;

                    const id = t.getAttribute( 'id' );
                    if( id !== null ) testIdentification( t, id );
                }
            };
            req.onloadend = ( _event/*ignored*/ ) =>
            {
                // Parameter *_event* is a ProgressEvent, at least on Firefox, which contains
                // no useful information.  If more information is ever needed, then it might
                // be obtained from req.status, or the fact of a call to req.onerror, above.

              // Notify the waiting readers
              // --------------------------
                const readers = entry.readers;
                entry.readers = null;
                for( const r of     readers ) notifyReader( r, entry );
                for( const r of omnireaders ) notifyReader( r, entry );
                noteReadersNotified( entry );
            };
            req.ontimeout = ( e ) =>
            {
                console.warn( 'Document request timed out: ' + docLoc );
            };

          // ================
          // Send the request
          // ================
            req.send();
        };



       // - P r i v a t e ------------------------------------------------------------------------------


        /** Map of document entries (DocumentCacheEntry) keyed by DocumentCacheEntry#location.
          */
        const entryMap = new Map();



        function noteReadersNotified( entry ) { DocumentCachePersistor.noteReadersNotified( entry ); }



        function notifyReader( r, entry )
        {
            const doc = entry.document;
            if( doc !== null ) r.read( entry, doc );
            r.close( entry );
        }


        const omnireaders = [];



        entryMap.set( DOCUMENT_LOCATION, // Storing the present document
          new DocumentCacheEntry( document, DOCUMENT_LOCATION, /*readers*/null ));
        return expo;

    }() );



   // ==================================================================================================
   //   D o c u m e n t   C a c h e   P e r s i s t o r


    /** A device that persists the document cache from load to load throughout the session.
      *
      *     @see DocumentCache
      */
    const DocumentCachePersistor = ( function()
    {

        const expo = {}; // The public interface of DocumentCachePersistor



        /** Registers a reader of all documents that are cached during the session.
          * A call to this function is the same as a call to DocumentCache.addOmnireader,
          * except that it documents the caller's need of a session persistent cache.
          *
          *     @param r (DocumentReader)
          *     @see DocumentCache#addOmnireader
          */
        expo.addOmnireader = function( r ) { DocumentCache.addOmnireader( r ); };



        /** @param cacheEntry (DocumentCacheEntry)
          */
        expo.noteReadersNotified = function( cacheEntry ) { ensureMemorizationPending(); }; // [RPP]



        /** Starts this persistor.
          */
        expo.start = function()
        {
            let isPresentDocumentMemorized = false;

          // Recall any documents from session memory
          // ------
            const s = sessionStorage.getItem( SS_KEY_locations );
            if( s !== null )
            {
                const locations = JSON.parse( s );

              // Re-cache the recalled documents
              // --------
                for( const loc of locations )
                {
                    if( !isPresentDocumentMemorized && loc === DOCUMENT_LOCATION )
                    {
                        isPresentDocumentMemorized = true;
                        continue; // Always the present document is already cached
                    }

                    DocumentCache.readNowOrLater( loc, DOCUMENT_READER_NULL ); // Re-caching it
                }
            }

          // Initiate memorization of the present document, if yet unmemorized
          // --------
            if( !isPresentDocumentMemorized ) ensureMemorizationPending();
              // ∵ No call to *noteReadersNotified* is assured for the present document
        };



       // - P r i v a t e ------------------------------------------------------------------------------


        function ensureMemorizationPending()
        {
            if( isMemorizationPending ) return;

            setTimeout( ()=> // No hurry, go easy here on the machine
            {
                isMemorizationPending = false;

              // Memorize the cached documents
              // --------
                const locations = [];
                for( const cacheEntry of DocumentCache.entries() )
                {
                    if( cacheEntry.document !== null ) locations.push( cacheEntry.location );
                }
                sessionStorage.setItem( SS_KEY_locations,
                  JSON.stringify( locations, /*replacer*/null, SESSION_STRINGIFY_SPACING ));
            }, MS_DELAY_DCP );
            isMemorizationPending = true;
        }



        let isMemorizationPending = false;



        /** Session storage key (string) for memorized document locations
          * (JSON stringified Array of string).
          */
        const SS_KEY_locations = NS_READ + '.DocumentCachePersistor.locations';



        return expo;

    }() );



   // ==================================================================================================
   //   D o c u m e n t   R e a d e r


    /** A reader of documents.
      */
    class DocumentReader
    {

        /** Closes this reader.
          *
          *     @param cacheEntry (DocumentCacheEntry)
          */
        close( cacheEntry ) {}


        /** Reads the document.
          *
          *     @param cacheEntry (DocumentCacheEntry)
          *     @param doc (Document)
          */
        read( cacheEntry, doc ) {}

    }



    /** A document reader that does nothing.
      */
    const DOCUMENT_READER_NULL = new DocumentReader();



   // ==================================================================================================
   //   H y p e r l i n k a g e


    /** Dealing with hyperlinks.
      */
    const Hyperlinkage = ( function()
    {

        const expo = {}; // The public interface of Hyperlinkage



        /** Immediately updates the Hyperlinkage state, rather than wait for an event
          * that might yet be pending.
          */
        expo.refresh = function() { hearHashChange.call( /*this*/window ); };



        /** The window targeted element, or null if there is none.  This is the element indicated
          * by the value of window.location.hash, or null if that value is an empty string
          * or it indicates an element does not exist.
          *
          *     @return (Element)
          *     @see http://reluk.ca/project/wayic/web/target
          */
        expo.windowTargetedElement = function() { return windowTargetedElement; };


            let windowTargetedElement = null;


            function clearWindowTargetedElement()
            {
                if( windowTargetedElement === null ) return;

                if( windowTargetedElement.hasAttributeNS( NS_READ, 'hasSubjoiningPotential' ))
                {
                    windowTargetedElement.setAttributeNS( NS_READ, 'hasSubjoiningPotential',
                      'window untargeted' );
                }
                windowTargetedElement = null;
            }


            function setWindowTargetedElement( e )
            {
                if( windowTargetedElement === e ) return;

                if( windowTargetedElement !== null
                 && windowTargetedElement.hasAttributeNS( NS_READ, 'hasSubjoiningPotential' ))
                {
                    windowTargetedElement.setAttributeNS( NS_READ, 'hasSubjoiningPotential',
                      'window untargeted' );
                }
                if( e.hasAttributeNS( NS_READ, 'hasSubjoiningPotential' ))
                {
                    e.setAttributeNS( NS_READ, 'hasSubjoiningPotential', 'window targeted' );
                }
                windowTargetedElement = e;
            }



        /** The window targeted identifier, or null if there is none.  This is the value
          * of window.location.hash without a preceding delimiter character '#', or null
          * if that value is an empty string.
          *
          *     @return (string)
          *     @see http://reluk.ca/project/wayic/web/target
          */
        expo.windowTargetedID = function() { return windowTargetedID; };


            let windowTargetedID = null;



       // - P r i v a t e ------------------------------------------------------------------------------


        function hearHashChange/* event handler */( _HashChangeEvent )
        {
            // † Use of *refresh* may cause redundant calls, as detected and marked below †

            const hash = location.hash; // [WDL]
            if( hash.length <= 1 )
            {
                if( windowTargetedID !== null ) // Otherwise this call is redundant †
                {
                    windowTargetedID = null;
                    clearWindowTargetedElement();
                }
                return;
            }

            const id = hash.slice( 1 );
            if( windowTargetedID === id ) return; // This call is redundant †

            windowTargetedID = id;
            const e = document.getElementById( id );
            if( e === null ) clearWindowTargetedElement();
            else setWindowTargetedElement( e );
        }



        window.addEventListener( 'hashchange', hearHashChange );
        expo.refresh(); // Initializing
        return expo;

    }() );



   // ==================================================================================================
   //   I n w a y s


    /** Dealing with inways.  Formally the inway is a component the start tag (eSTag) of a subjoining
      * waybit (sbj* in figure below).  Apparently however it lies outside of the tag to the left,
      * where it spans the distance from the page edge to the tag.
      *
      *          ┌·················· eSTag ···················┐
      *                                                       ⋮
      *          ┌————————————— inway ———————————————┐        ⋮
      *                                         hall         tag name
      *          ┌———————— approach ————————┐  ┌—————┐       ╱⋮
      *          ⋮                          ⋮  ⋮     ⋮      ╱ ⋮
      *          ⋮                          ⋮  ⋮  1waybit  ╱  ⋮
      *          ⋮                          ⋮  ⋮     ⋮    ╱   ⋮
      *                                         ·     11sbj
      *                                                   Content of 11sbj
      *                                           2waybit
      *                                               Content of 2waybit, a non-subjoining waybit
      *                                       ·   3sbj
      *                                               Content of 3sbj
      *
      *
      * When the pointer (↖) crosses any part of the eSTag (including the inway approach),
      * the subjoint icon reveals itself in full:
      *
      *          ┌············································┐
      *          ┌———————————————————————————————————┐        ⋮
      *          ┌——————————————————————————┐  ┌—————┐        ⋮
      *          ⋮                          ⋮  ⋮     ⋮        ⋮
      *          ⋮                          ⋮  ⋮  1waybit     ⋮
      *          ⋮                          ⋮  ⋮     ⋮        ⋮
      *                                         ◉     11sbj
      *                        ↖               ╱          Content of 11sbj
      *                                       ╱   2waybit
      *                                      ╱        Content of 2waybit, a non-subjoining waybit
      *                                     ╱ ·   3sbj
      *                                    ╱          Content of 3sbj
      *                              subjoint
      *                                icon
      *
      *
      * If the subjoint icon is clicked, or somehow else the window targets the subjoining waybit,
      * then the inway approach becomes visible:
      *
      *          ┌———————— approach ————————┐  ┌—————┐
      *          ⋮                          ⋮  ⋮     ⋮
      *          ⋮                          ⋮  ⋮  1waybit
      *          ⋮                          ⋮  ⋮     ⋮
      *           ∙ ·  ·   ·    ·     ·         ◉     11sbj
      *          ╱       │                                Content of 11sbj
      *         ╱        │                        2waybit
      *     edging       │                            Content of 2waybit, a non-subjoining waybit
      *                 path                  ·   3sbj
      *                                               Content of 3sbj
      */
    const Inways = ( function()
    {

        const expo = {}; // The public interface of Inways



        /** Ensures the given inway will be laid and shown.
          *
          *     @param inway (HTMLElement)
          *     @param eSTag (Element) The start tag beside which to lay it.
          */
        expo.layWhen = function( inway, eSTag )
        {
            setTimeout( layIf, layWhen_msRest ); // Giving the browser a rest
            layWhen_msRest += 13; // Staggering the overall lay of inways at intervals
            let pollCount = 0;
            function layIf( _msTime/*ignored*/ )
            {
                const tagVpBounds = eSTag.getBoundingClientRect();
                if( tagVpBounds.width ) // Then the tag is laid
                {
                  // Lay the inway and show it
                  // -------------------------
                    lay( inway, tagVpBounds );
                    inway.style.setProperty( 'visibility', 'visible' ); // Overriding readable.css

                  // Ensure it re-lays itself as needed
                  // ------------------------
                    addEventListener( 'resize', (_UIEvent)=>{lay(inway);} );
                }
                else if( pollCount <= 3 )
                {
                    ++pollCount;
                    requestAnimationFrame( layIf ); // Wait for the tag to get laid
                }
                else console.error( "Cannot lay inway, start tag is not being laid" );
            }
        };


            let layWhen_msRest = MS_DELAY_INWAYS; // Delay before 1st lay attempt of next inway



       // - P r i v a t e ------------------------------------------------------------------------------


        /** Lays or re-lays the given inway.
          *
          *     @param inway (Element)
          *     @param tagVpBounds (DOMRectReadOnly) The bounds within the scroller's viewport
          *       of the parent start tag.  If undefined, then this parameter is determined anew.
          */
        function lay( inway, tagVpBounds = inway.parentNode.getBoundingClientRect() )
        {
            let s; // Style

          // Span the left margin from page edge to tag
          // --------------------
            const width = tagVpBounds.left + scrollX;
            s = inway.style;
            s.setProperty( 'left', -width + 'px' );
            s.setProperty( 'width', width + 'px' );

          // Clamp down on the *hall* (child)
          // ------------------------
            const hallVpBounds = inway.lastChild/*hall*/.getBoundingClientRect();
            const height = hallVpBounds.height;
            if( !height/*UZ*/ ) throw 'Inway hall is unlaid';

            s.setProperty( 'height', height + 'px' );

          // Lay the *approach* (child)
          // ------------------
            const approach = inway.firstChild;
            s = approach.style;
            const hallX = width - hallVpBounds.width;
            const availableGap/*approach ↔ hall*/ = hallX - Approaches.minimumWidth();
            if( MIN_GAP - availableGap > GRAPHICAL_ERROR_MARGIN )
            {
                console.error( 'Inway availableGap ' + availableGap + ' < MIN_GAP ' + MIN_GAP );
                s.setProperty( 'display', 'none' );
                return;
            }

            const gap = availableGap > MAX_GAP? MAX_GAP: availableGap;
              // Allowing it to expand up to MAX_GAP, if that much is available
            const lineWidth = hallX - gap;
            s.setProperty( 'width', lineWidth + 'px' ); // [HSP in readable.css]
            s.setProperty( 'height',   height + 'px' );
         // approach.setAttribute( 'width', lineWidth );
         // approach.setAttribute( 'height',   height );
         /// A failed attempt to fix the approach.getBBox failure in Approaches, q.v.
            s.setProperty( 'display', UNSET_STYLE ); // To whatever it was
            Approaches.redraw( approach, lineWidth, height );
        }



        /** The maximum, formal gap between the inway *approach* and the *hall* sibling to its right.
          * The *visual* gap may be wider depending on how the *approach* draws its content.
          */
        const MAX_GAP = 1.5/*rem*/ * REM; // Within which the pointer style defaults, so indicating
                                         // that the two components have distinct control functions.


        /** The minimum, formal gap between the inway *approach* and the *hall* sibling to its right.
          */
        const MIN_GAP_REM = 0.6; // Changing? sync'd → readable.css

        const MIN_GAP = MIN_GAP_REM * REM;



        return expo;

    }() );



   // ==================================================================================================
   //   L e a d e r   R e a d e r


    /** A reader of element leaders.  An element leader is the whitespace collapsed, text content
      * of the element prior to any forced line break or element of non-inline layout.
      *
      * To learn merely whether an element has a leader of non-zero length, give a maxLength
      * of zero to the *read* function then inspect *hasLeader* for the answer.
      */
    const LeaderReader = ( function()
    {

        const expo = {}; // The public interface of LeaderReader



        /** The element whose leader was last read, or null if *read* has yet to be called.
          *
          *     @see #read
          */
        expo.element = null;



        /** Answers whether the element has a leader of non-zero length.
          */
        expo.hasLeader = false;



        /** Answers whether the leader is truncated.
          */
        expo.isTruncated = false;



        /** The leader as read from the element in the form of a string, possibly truncated.  It will be
          * an empty string if either the element has no leader, or the leader was truncated to nothing.
          */
        expo.leader = '';



        /** Reads the leader of the given element and sets the public properties of this reader to
          * reflect the results of the read.
          *
          *     @param maxLength (number) The length limit on the read.  A read that would exceed this
          *       limit will instead be truncated at the preceding word boundary.
          */
        expo.read = function( element, maxLength=Number.MAX_VALUE )
        {
            let leader = '';
            let hasLeader = false;
            expo.isTruncated = false;
            const dive = document.createTreeWalker( element );
              // Node.innerText and textContent would be too inefficient for this purpose, often diving
              // deeply into the element hierarchy where only a shallow dive is needed.
            let headroom = maxLength; // Space remaining for the next word
            let toMarkEllipse = false; // Whether a text omission has yet to be marked
            dive: for( ;; )
            {
                const d = dive.nextNode();
                if( d === null ) break dive;

             // if( d.parentNode === element ) child = d;
                const dType = d.nodeType;
                if( dType === TEXT_NODE )
                {
                    const words = d.data.match( /\S+/g );
                    if( words === null ) continue dive;

                    hasLeader = true;
                    for( const word of words )
                    {
                        const wN = word.length;
                        if( wN > headroom )
                        {
                            expo.isTruncated = true;
                            break dive; // Terminating the leader
                        }

                        if( leader.length > 0 ) // Then first append a word separator
                        {
                            if( toMarkEllipse )
                            {
                                leader += '…'; // Unicode 2026 (horizontal ellipsis)
                                toMarkEllipse = false;
                            }
                            else leader += ' ';
                            --headroom;
                        }
                        leader += word;
                        headroom -= wN;
                     // if( firstContributingChild === null ) firstContributingChild = child;
                     // lastContributingChild = child;
                    }
                }
                else if( dType === ELEMENT_NODE )
                {
                    const dNS = d.namespaceURI;
                    if( dNS === NS_READ )
                    {
                      // Non-HTML insert
                      // ---------------
                        switch( d.localName )
                        {
                            case 'bitform': // For the content of its *preview* element, below
                            case 'hyperform': // For the content of its HTML *a* child
                            case 'preview':
                                continue dive; // Not bypassing *d* content
                        }

                        toLastDescendant( dive ); // Bypassing *d* content
                        continue;
                    }

                    if( dNS === NS_HTML )
                    {
                        switch( d.localName )
                        {
                          // Forced line break
                          // -----------------
                            case 'br':
                                break dive; // Terminating the leader

                          // Significant markup unencodable in plain text
                          // ------------------
                            case 'bdi':
                            case 'bdo':
                            case 'del':
                            case 's':
                            case 'sub':
                            case 'sup':
                                toMarkEllipse = true;
                                toLastDescendant( dive ); // Bypassing *d* content
                                continue dive;
                        }
                    }

                  // Non-inlined element
                  // -------------------
                    if( !willDisplayInLine( d )) break dive; // Terminating the leader
                }
            }

            expo.element = element;
            expo.leader = leader;
            expo.hasLeader = hasLeader;
        };



        return expo;

    }() );



   // ==================================================================================================
   //   L i n k   A t t r i b u t e


    /** The parsed value of a referential jointer's *link* attribute.
      */
    class LinkAttribute
    {


        /** Constructs a LinkAttribute from its declared value.
          *
          *     @see #value
          *     @throws (string) Error message if the value cannot be parsed.
          */
        constructor( value )
        {
            this._value = value;
            let loc = URIs.defragmented( value ); // Document location
            {
                const fragment = value.slice( loc.length + 1 );
                if( fragment === '' )
                {
                    throw "Missing fragment sign '#': " + a2s('link',value);
                }

                this._subjointID = fragment;
            }
            if( loc.length > 0 )
            {
                if( loc.charAt(0) === '/'
                  && /*not a network-path reference*/(loc.length === 1 || loc.charAt(1) !== '/') ) // [NPR]
                {
                    loc = CAST_BASE_REF + loc; // Waycast space → universal space
                }
                else if( !URIs.FULL_PATTERN.test( loc ))
                {
                    throw "Leading component must be either a URI scheme, or the waycast base '/': "
                      + a2s('link',value);
                }

                if( loc.endsWith('/') ) loc += 'way.xht';
            }
            this._subjointDocumentLocation = loc;
        }



        /** Sets on the given element an *href* attribute that refers to the same subjoining waybit
          * as this *link* attribute.
          */
        hrefTo( el ) { el.setAttribute( 'href', this._subjointDocumentLocation + '#' + this._subjointID ); }



        /** The location of the subjoint document as a URL string, or the empty string if the *link*
          * attribute encodes a *same-document reference*.
          *
          *     @see https://tools.ietf.org/html/rfc3986#section-4.4
          */
        get subjointDocumentLocation() { return this._subjointDocumentLocation; }



        /** The identifier of the subjoining waybit.
          */
        get subjointID() { return this._subjointID; }



        /** The unparsed string value of the attribute, as declared.
          */
        get value() { return this._stringValue; }


    }




   // ==================================================================================================
   //   P a r t   T r a n s f o r m   C


    /** The part of a proper wayscript element's transformation that is generally open to being redone.
      * This is a disposable, single-use class.
      */
    class PartTransformC
    {


        /** Constructs a PartTransformC.
          *
          *     @see #element
          */
        constructor( element )
        {

           // - i n p u t - / - c o n f i g u r a t i o n - - - - - - - - - - - - - - - - - - - - - - -

            /** The wayscript element to transform.
              */
            this.element = element;


            /** A non-null value indicates a tranformation that might actually be redone.
              * Meantime the form is either based on a cached image of a subjoining waybit
              * (value ‘present’) or not (‘absent’).
              */
            this.imaging = null;


            /** The altered string to show for the local part of the element's qualified name,
              * or null to leave it unaltered.
              */
            this.localPartOverride = null;


           // - o u t p u t - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

            /** The inserted start tag element, or null if *run* was not called.
              */
            this.eSTag = null;

        }



        /** Does the partial transformation of the element.  Specifically this method:
          * (a) reads this transform's input/configuration properties and sets its output properties;
          * (b) reads the element's leader and leaves the results in the LeaderReader; and
          * (c) sets attributes on the element and inserts an *eSTag* child to form its start tag.
          * Call once only.
          */
        run()
        {
            const e = this.element;
            const imaging = this.imaging;
  /*[C2]*/  if( imaging !== null ) e.setAttributeNS( NS_READ, 'imaging', imaging );

          // Leader
          // ------
            LeaderReader.read( e, /*maxLength*/0 );
  /*[C2]*/  if( LeaderReader.hasLeader ) e.setAttributeNS( NS_READ, 'hasLeader', 'hasLeader' );

          // Start tag
          // ---------
            console.assert( this.eSTag === null, AA + 'Method *run* is called once only' );
            const eSTag = this.eSTag = document.createElementNS( NS_READ, 'eSTag' );
  /*[C2]*/  e.insertBefore( eSTag, e.firstChild );
            const eQName = eSTag.appendChild( document.createElementNS( NS_READ, 'eQName' ));

          // prefix part of name
          // - - - - - - - - - -
            const prefix = e.prefix;
            let isPrefixAnonymousOrAbsent;
            if( prefix !== null )
            {
                const ePrefix = eQName.appendChild( document.createElementNS( NS_READ, 'ePrefix' ));
                ePrefix.appendChild( document.createTextNode( prefix ));
                if( prefix === ELEMENT_NAME_NONE )
                {
                    isPrefixAnonymousOrAbsent = true;
                    ePrefix.setAttributeNS( NS_READ, 'isAnonymous', 'isAnonymous' );
                }
                else isPrefixAnonymousOrAbsent = false;
            }
            else isPrefixAnonymousOrAbsent = true;

          // local part of name
          // - - - - - - - - - -
            const eName = eQName.appendChild( document.createElementNS( NS_READ, 'eName' ));
            let isAnonymous = false;
            let lp = this.localPartOverride;
            localPart:
            {
                if( lp === null )
                {
                    lp = e.localName;
                    if( lp === ELEMENT_NAME_NONE )
                    {
                        isAnonymous = true;
                        lp = '●'; // Unicode 25cf (black circle)
                        eQName.setAttributeNS( NS_READ, 'isAnonymous', 'isAnonymous' );
                    }
                    else if( lp.charAt(0) !== '_' ) lp = lp.replace( /_/g, NO_BREAK_SPACE );
                      // Starts with a non-underscore, hopefully followed by some other visible content?
                      // Then replace any underscores with nonbreaking spaces for sake of readability.
                }
                else if( lp.length === 0 ) break localPart;

                eName.appendChild( document.createTextNode( lp ));
            }

          // formation of name
          // - - - - - - - - -
            const eNS = e.namespaceURI;
            let formedName, maxShort;
            if( eNS === NS_STEP )
            {
                formedName = isAnonymous && !isPrefixAnonymousOrAbsent? prefix: lp;
                maxShort = 1; // Less to allow room for extra padding that readable.css adds
            }
            else
            {
                formedName = lp;
                maxShort = 2;
            }
  /*[C2]*/  if( formedName.length <= maxShort )
            {
                e.setAttributeNS( NS_READ, 'hasShortName', 'hasShortName' );
            }
        }


    }



   // ==================================================================================================
   //   P a r t   T r a n s f o r m   C 2


    /** The redoing of a PartTransformC.
      */
    class PartTransformC2 extends PartTransformC
    {

        /** Constructs a PartTransformC2, first removing the markup of the earlier PartTransformC.
          *
          *     @see PartTransformC#element
          */
        constructor( element )
        {
            super( element );
            const eSTag = asElementNamed( 'eSTag', element.firstChild );
            if( eSTag === null ) throw 'Missing eSTag';

            element.removeChild( eSTag );

            // Remove any attributes that might have been set:
            element.removeAttributeNS( NS_READ, 'hasLeader' );
            element.removeAttributeNS( NS_READ, 'hasShortName' );
            element.removeAttributeNS( NS_READ, 'imaging' );
        }

    }




   // ==================================================================================================
   //   S e l f   L i n k i n g   C o n t r o l


    /** Window targeting and scene switching for self hyperlinked subjoining waybits.
      */
    const SelfLinkingControl = ( function()
    {

        const expo = {}; // The public interface of SelfLinkingControl



        /** Adds controls to a subjoining waybit.
          *
          *     @param eSTag (Element) The start tag of the waybit.
          */
        expo.addControls = function( eSTag ) { eSTag.addEventListener( 'click', hearClick ); };



       // - P r i v a t e ------------------------------------------------------------------------------


        /** @param click (MouseEvent) A click event from within the start tag.
          */
        function hearClick/* event handler */( click )
        {
            const eSTag = click.currentTarget; // Where listening
            const eClicked = click.target;    // What got clicked

          // =====================
          // Empty container space clicked?  No function
          // =====================
            if( eClicked === eSTag ) return; // Start tag element itself, as opposed to a descendant

            const eClickedNS = eClicked.namespaceURI;
            if( eClicked.parentNode === eSTag && eClicked.localName === 'div'
             && eClickedNS === NS_HTML ) return; // Inway element itself, as opposed to a descendant

          // ================
          // Inway *approach* clicked?  Function is scene switching
          // ================
            const bit = eSTag.parentNode; // Subjoining waybit
            const windowTargetedElement = Hyperlinkage.windowTargetedElement();
            if( eClickedNS === NS_SVG ) // inway approach
            {
                if( bit !== windowTargetedElement ) return; // Switch is disabled

                const u = new URL( location.toString() ); // [WDL]
                u.hash = ''; // Remove the fragment
                const pp = u.searchParams;
                pp.set( 'sc', 'inter' );
                pp.set( 'link', bit.getAttribute('id') );
             // history.replaceState( history./*duplicate of*/state, /*no title*/'', u.href ); // TEST
                return;
            }

          // ==============================
          // Inway *hall* or start tag name clicked:  Function is self hyperlinking
          // ==============================
            const view = document.scrollingElement; // Within the viewport
            const scrollTopWas = view.scrollTop;
            const scrollLeftWas = view.scrollLeft;

          // Drop a breadcrumb before changing location
          // -----------------
            Breadcrumbs.dropCrumb( bit );

          // Toggle the browser location, window targeted ⇄ window untargeted
          // ---------------------------
            if( bit === windowTargetedElement ) // Δ: window targeted → window untargeted
            {
                location.hash = ''; // Untargeting
                const loc = location.toString(); // [WDL]
                if( loc.endsWith( '#' )) // Then it left the fragment delimiter hanging there, visible,
                {                 // like the grin of the Cheshire Cat (Firefox, Chrome).  Remove it:
                    history.replaceState( history./*duplicate of*/state, /*no title*/'',
                      loc.slice(0,-1) );
                }
            }
            else location.hash = bit.getAttribute( 'id' ); // Δ: window untargeted → window targeted

          // Stabilize the view within the viewport
          // ------------------
            view.scrollTop = scrollTopWas;
            view.scrollLeft = scrollLeftWas;
        }



        return expo;

    }() );



   // ==================================================================================================
   //   S u b j o i n t   I m a g e


    /** The image of a subjoining waybit for use in subjoint previews.
      */
    class SubjointImage
    {


        /** Constructs a SubjointImage.
          *
          *     @see #localName
          *     @see #namespaceURI
          *     @see #previewString
          */
        constructor( localName, namespaceURI, previewString )
        {
            if( !localName/*[UN]*/ || !namespaceURI/*[UN]*/
             || previewString === undefined || previewString === null ) throw MALFORMED_PARAMETER;

            this._localName = localName;
            this._namespaceURI = namespaceURI;
            this._previewString = previewString;
        }



        /** Answers whether this image equals another.
          *
          *     @param other (SubjointImage) The other image, which may be null.
          */
        equals( other )
        {
            if( other === null ) return false;

            return this._previewString === other.previewString
              && this._localName === other.localName
              && this._namespaceURI === other.namespaceURI;
        }



        /** @see Element#localName
          */
        get localName() { return this._localName; }



        /** @see Element#namespaceURI
          */
        get namespaceURI() { return this._namespaceURI; }



        /** The subjoint preview string, or an empty string if there is none.
          *
          *     @see #makeSubjointPreviewString
          */
        get previewString() { return this._previewString; }


    }



   // ==================================================================================================
   //   S u b j o i n t   I m a g e   C a c h e


    const SubjointImageCache = ( function() // [SIC]
    {

        const expo = {}; // The public interface of SubjointImageCache



        /** Retrieves the image of the indicated subjoining waybit.
          *
          *     @param sbjLoc (string) The location of the subjoining waybit in normal URL form.
          *     @return (SubjointImage) The cached image, or null if none is cached.
          *
          *     @see URIs#normalized
          */
        expo.read = function( sbjLoc )
        {
            const s = sessionStorage.getItem( SS_KEY_PREFIX + sbjLoc );
            if( s !== null )
            {
                const o = JSON.parse( s ); // Yields object form (o) of original image stored
                try { return new SubjointImage( o._localName, o._namespaceURI, o._previewString ); }

                catch( x )
                {
                    if( isUserNonProgrammer || x !== MALFORMED_PARAMETER ) throw x;

                    console.warn( 'Suppressing an exception expected only while programming: ' + x );
                }
            }

            return null;
        };



        /** Stores the image of the indicated subjoining waybit.
          *
          *     @param sbjLoc (string) The location of the subjoining waybit in normal URL form.
          *     @param image (SubjointImage)
          *
          *     @see URIs#normalized
          */
        expo.write = function( sbjLoc, image )
        {
            if( URIs.isDetectedAbnormal( sbjLoc )) throw URIs.message_abnormal( sbjLoc );

            if( image === null ) throw NULL_PARAMETER;

            sessionStorage.setItem( SS_KEY_PREFIX + sbjLoc,
              JSON.stringify( image, /*replacer*/null, SESSION_STRINGIFY_SPACING ));
        };



       // - P r i v a t e ------------------------------------------------------------------------------


        /** Common prefix of any session storage key (string)
          * for a cached subjoint image (JSON stringified SubjointImage).
          */
        const SS_KEY_PREFIX = NS_READ + '.SubjointImageCache.';



        return expo;

    }() );



   // ==================================================================================================
   //   S u r j o i n t   F i n i s h e r


            class SurjointFinisher_Registration
            {

                /** Constructs an SurjointFinisher_Registration.
                  *
                  *     @see #jointer
                  *     @see #subjointID
                  *     @param subjointDocLoc (string) The location of the subjoint document
                  *       in normal URL form.
                  */
                constructor( jointer, subjointID, subjointDocLoc )
                {
                    this._jointer = jointer;
                    this._subjointID = subjointID;
                    this._subjointImage = SubjointImageCache.read( subjointDocLoc + '#' + subjointID );
                }


                /** The referential jointer (Element).
                  */
                get jointer() { return this._jointer; }


                /** The image of the subjoining waybit (SubjointImage) as retrieved from the cache,
                  * or null if none was cached.
                  */
                get subjointImage() { return this._subjointImage; }


                /** The identifier of the subjoining waybit (string) within the subjoint document.
                  */
                get subjointID() { return this._subjointID; }

            }



    /** A combined *presentation finisher* and *image pre-cacher* for interdocument referential joints.
      * It finishes the presentation of bitform joints on the surjoint side (figure left).
      *
      *                    surjoint           Surjoint    *
      *                      ancestors          side     *    Subjoint
      *                    ╱                            *       side
      *                   ╱    surjoining              *
      *                  ╱       waybit               *
      *         waybit         ╱                     *
      *                       ╱                     *               subjoining
      *             waybit   ╱                      *                 waybit
      *                                             *               ╱
      *              ┌  waybit                      *              ╱
      *              │      Text content            *             ╱
      *     joint ───┤· · · · · · · · · · · · · · · * · · · · · · · · · · · · · ·
      *              │      waybit                  *     ◉  waybit
      *              └          Text content        *            Text content
      *                     ╱     ⋱⋱                *
      *                    ╱          ╲             *            waybit
      *                   ╱            ╲            *
      *              jointer            ╲           *                waybit
      *            (in bitform)       subjoint      *            ╱
      *                                 preview     *           ╱
      *                                             *          ╱
      *                                            *        subjoint
      *                                           *       descendants
      *                                          *
      *
      * It pre-caches any images that will be needed by directly subjoint documents (all forms of joint)
      * should the user travel to them. [SIC]
      *
      *     @see AlterdocScanner, it finishes joints on the subjoint side (figure right).
      *     @see SubjointImage
      */
    const SurjointFinisher = ( function()
    {

        const expo = {}; // The public interface of SurjointFinisher



        /** Tells this finisher of a separate document joined directly to the present document
          * by a non-bitform jointer.
          *
          *     @param loc (string) The location of the subjoint document in normal URL form.
          *
          *     @see #registerBitformJointer
          *     @see URIs#normalized
          */
        expo.noteSubjoiningDocument = function( loc ) { registerSubjoiningDocument( loc ); };



        /** Registers an unresolved, interdocument bitform joint and returns the registration.
          *
          *     @param jointer (Element) A bitform jointer that joins across documents.
          *     @param subjointID (string) The identifier of the subjoining waybit
          *       within the subjoint document.
          *     @param subjointDocLoc (string) The location of the subjoint document in normal URL form.
          *
          *     @return (SurjointFinisher_Registration)
          *
          *     @see URIs#normalized
          */
        expo.registerBitformJointer = function( jointer, subjointID, subjointDocLoc )
        {
            const reg = new SurjointFinisher_Registration( jointer, subjointID, subjointDocLoc );
            const regList = registerSubjoiningDocument( subjointDocLoc );
            regList.push( reg );
            return reg;
        };



        /** Starts this finisher.
          */
        expo.start = function()
        {
            start1_presentDocument( jointRegistry );
            setTimeout( start2_subjoiningDocuments, MS_DELAY_SF/*browser rest*/, jointRegistry );
            jointRegistry = null; /* Freeing it for eventual garbage collection,
              and blocking henceforth any further attempt to register */
        };



       // - P r i v a t e ------------------------------------------------------------------------------


        /** Map of interdocument joints.  The key to each entry is the location (string,
          * in normal URL form) of a directly subjoint document.  The value is a registration list
          * (Array of SurjointFinisher_Registration), one for each bitform jointer (if any)
          * of the present document that refers to the keyed document.  The keys cover
          * all referentially subjoining documents regardless of how their joints are formed,
          * while the values' registration lists cover only bitform jointers.
          */
        let jointRegistry = new Map(); // Nulled on *start*



        const MYSTERY_SYMBOL = '?';



        /** @param loc (string) The location of the subjoining (directly subjoint) document
          *   in normal URL form.
          * @return (Array of SurjointFinisher_Registration)
          *
          * @see URIs#normalized
          */
        function registerSubjoiningDocument( loc )
        {
            let regList = jointRegistry.get( loc );
            if( regList === undefined )
            {
                if( loc.length !== URIs.defragmented(loc).length )
                {
                    throw MALFORMED_PARAMETER + ': Fragmented (#) document location: ' + loc;
                }

                if( URIs.isDetectedAbnormal( loc )) throw URIs.message_abnormal( loc );

                if( loc === DOCUMENT_LOCATION ) throw MALFORMED_PARAMETER + ': Not a separate document';

                regList = [];
                jointRegistry.set( loc, regList );
            }
            return regList;
        }



        function setSubjointPreview( jointer, newPreviewString )
        {
            const bitform = jointer.lastChild;
            const preview = asElementNamed( 'preview', bitform.firstChild/*a*/.firstChild );
            const previewText = preview.firstChild;
            previewText.replaceData( 0, previewText.length, newPreviewString );
            configureForSubjointPreview( jointer, preview, newPreviewString );
        }



        /** Finishes the presentation of bitform joints on the surjoint side.
          */
        function start1_presentDocument( jointRegistry )
        {
            for( const entry of jointRegistry )
            {
                const jRegList = entry[1];
                if( jRegList.length === 0 ) continue; // No bitform joints into this document

                const sbjDocLoc = entry[0];
                DocumentCache.readNowOrLater( sbjDocLoc, new class extends DocumentReader
                {
                    close( cacheEntry )
                    {
                        if( cacheEntry.document !== null ) return;

                        for( const r of jRegList ) setSubjointPreview( r.jointer, MYSTERY_SYMBOL );
                    }

                    read( cacheEntry, sbjDoc )
                    {
                        for( const jReg of jRegList )
                        {
                            const id = jReg.subjointID;
                            const sbj = sbjDoc.getElementById( id );
                            const jointer = jReg.jointer;
                            const linkV = jointer.getAttributeNS( NS_COG, 'link' ); /* Nominal form as
                              declared (for reporting only) of normalized form <sbjDocLoc>#<id> */
                            if( sbj === null )
                            {
                              // Flag the joint as broken
                              // ------------------------
                                tsk( 'Broken joint: No such *id* in that document: ' + a2s('link',linkV) );
                                setSubjointPreview( jointer, BREAK_SYMBOL );
                                jointer.setAttributeNS( NS_READ, 'isBroken', 'isBroken' );
                                continue;
                            }

                            const previewString = makeSubjointPreviewString( sbj, id, sbjDocLoc,
                              LeaderReader );
                            const jN = jointer.localName;
                            const jNResolved = jN === ELEMENT_NAME_UNCHANGED? sbj.localName: jN;
                            const jNS = jointer.namespaceURI;
                            const image = new SubjointImage( jNResolved, jNS, previewString );
                            if( image.equals( /*imageWas*/jReg.subjointImage ))
                            {
                              // Affirm the presentation as is
                              // -----------------------
                                jointer.removeAttributeNS( NS_READ, 'imaging' );
                                continue;
                            }

                          // Amend the presentation, as it presents an outdated image
                          // ----------------------
                            const part2 = new PartTransformC2( jointer );
                            configureForSubjoint( jNS, jN, linkV, sbj, part2 );
                            part2.run();
                            setSubjointPreview( jointer, previewString );

                          // Update the image cache
                          // ----------------------
                            SubjointImageCache.write( sbjDocLoc + '#' + id, image );
                        }
                    }
                });
            }
        }



        /** Pre-caches for each subjoining way declaration document the subjoint images *it* would need
          * if it were loaded in turn, e.g. by travel to it across a joint from the present document.
          */
        function start2_subjoiningDocuments( jointRegistry )
        {
            // Now call each subjoining document *surjoint*, and image *its* subjoining waybits:
            for( const srjDocLoc of jointRegistry.keys() )
            {
                DocumentCache.readNowOrLater( srjDocLoc, new class extends DocumentReader
                {
                    read( _cacheEntry/*ignored*/, srjDoc )
                    {
                        const traversal = srjDoc.createNodeIterator( srjDoc, SHOW_ELEMENT );
                        for( traversal.nextNode()/*onto the document node itself*/;; )
                        {
                            const jointer = traversal.nextNode();
                            if( jointer === null ) break;

                            const linkV = jointer.getAttributeNS( NS_COG, 'link' );
                            if( linkV === null ) continue; // Needs no image, is not an actual jointer

                            const jNS = jointer.namespaceURI;
                            if( !isBitNS( jNS )) continue; // Needs no image, is not bitform

                            let link;
                            try { link = new LinkAttribute( linkV ); }
                            catch( unparseable ) { continue; }

                            // No need here to fend against other types of malformed joint declaration;
                            // no harm in caching a superfluous image.
                            let sbjDocLoc = link.subjointDocumentLocation;
                            if( sbjDocLoc.length === 0 ) continue;
                              // Needs no caching, intradocument joint

                            sbjDocLoc = URIs.normalized( sbjDocLoc );
                            if( sbjDocLoc === srjDocLoc ) continue;
                              // Needs no caching, intradocument joint

                            DocumentCache.readNowOrLater( sbjDocLoc, new class extends DocumentReader
                            {
                                read( _cacheEntry/*ignored*/, sbjDoc )
                                {
                                    const id = link.subjointID;
                                    const sbj = sbjDoc.getElementById( id );
                                    if( sbj === null ) return; // Broken joint

                                  // Pre-cache the image, or re-cache it  † [SIC]
                                  // -------------------
                                    const previewString = makeSubjointPreviewString( sbj, id, sbjDocLoc,
                                      LeaderReader );
                                    SubjointImageCache.write( sbjDocLoc + '#' + id,
                                      new SubjointImage( jointer.localName, jNS, previewString ));
                                    // † Any re-caching here is only a side effect, not needed
                                }
                            });
                        }
                    }
                });
            }
        }



        return expo;

    }() );



   // ==================================================================================================
   //   T a r g e t   W h e r e a b o u t s


        const TARGET_UP   = 'up';
        const TARGET_DOWN = 'down';



    /** The apparent direction of travel to a hyperlink target for the purpose of user orientation.
      */
    class TargetWhereabouts
    {


        /** Constructs a TargetWhereabouts.
          *
          *     @see #direction
          *     @see #documentLocationN
          *     @see #target
          */
        constructor( direction, documentLocationN, target )
        {
            this._direction = direction;
            this._documentLocationN = documentLocationN;
            this._target = target;
        }



        /** The relative direction to the target element if it exists in the present document.
          *
          *     @return (string) Either TARGET_UP or TARGET_DOWN,
          *       or null if the target is nominally outside the present document.
          */
        get direction() { return this._direction; }



        /** The nominal location of the target document as a URL string in normal form,
          * or the empty string if the target is nominally in the present document.
          */
        get documentLocationN() { return this._documentLocationN; }




        /** Constructs a TargetWhereabouts from a referential jointer.
          *
          *     @param jointer (Element) The referential jointer.
          *     @param link (LinkAttribute) The parsed *link* attribute of the jointer.
          */
        static fromJointer( jointer, link )
        {
            const docLoc = link.subjointDocumentLocation;
            if( docLoc.length > 0 )
            {
                const docLocN = URIs.normalized( docLoc );
                if( docLocN !== DOCUMENT_LOCATION ) // Then the target is outside the present document
                {
                    return new TargetWhereabouts( /*direction*/null, URIs.normalized(docLoc),
                      /*target*/null );
                }
            }

            // The target is nominally within the present document
            const target = document.getElementById( link.subjointID );
            if( target !== null )
            {
                return fromLink( jointer, target );

                /** Constructs a TargetWhereabouts from a jointer and subjoining waybit,
                  * both located in the present document.
                  *
                  *     @param jointer (Element) The jointer.
                  *     @param sbj (Element) The subjoining waybit.
                  */
                function fromLink( jointer, sbj )
                {
                    const direction = ( ()=>
                    {
                        const targetPosition = jointer.compareDocumentPosition( sbj );
                        if( targetPosition & DOCUMENT_POSITION_PRECEDING ) return TARGET_UP;

                        console.assert( targetPosition & DOCUMENT_POSITION_FOLLOWING, A );
                        return TARGET_DOWN;
                    })();
                    return new TargetWhereabouts( direction, /*documentLocationN*/'', sbj );
                }
            }

            tsk( 'Broken joint: No such *id* in this document: ' + a2s('link',link.value) );
            return new TargetWhereabouts( /*direction*/null, /*documentLocationN*/'', target );
        }



        /** The target element within the present document, or null if there is none.
          * This property is null in the case of an extradocument or broken hyperlink.
          */
        get target() { return this._target; }


    }



   // ==================================================================================================
   //   V i e w p o r t i n g


    /** Dealing with the viewport and its scroller.
      */
    const Viewporting = ( function()
    {

        const expo = {}; // The public interface of Viewporting



        /** Ensures that the window targeted element, if any, will be visible within the viewport.
          *
          *     @see Hyperlinkage#windowTargetedElement
          */
        expo.ensureTargetWillShow = function() // [WTP]
        {
            const e = Hyperlinkage.windowTargetedElement();
            if( e === null ) return;

            const eBounds = e.getBoundingClientRect();
            const eTop = eBounds.top;
            if( eTop >= 0 )
            {
                const vHeight = window.innerHeight; // Approximate height of viewport [SVS]
                const eBottom = eBounds.bottom;
                if( eBottom <= vHeight ) return; // Whole of element is visible

                if( eTop < vHeight / 4 ) return; // Top alone is visible, yet reaches upper quarter
            }

         // console.debug( 'Viewporting.ensureTargetWillShow: Repositioning' ); // TEST
            e.scrollIntoView( targetPositioningOptions );
        };



       // - P r i v a t e ------------------------------------------------------------------------------


        const targetPositioningOptions = { behavior:'instant', block:'start', inline:'nearest' }



        return expo;

    }() );



   // ==================================================================================================
   //   W a y t r a c e r


    /** A device for tracing the way across multiple, referentially joined documents.  It traces into
      * the way root element, through its joints and onward till it traces the way declaration in full.
      * The trace serves two ultimate purposes: (1) reforming the present document to show which parts
      * are *on way*; and (2) discovery of other documents for cache omnireaders.
      *
      *     @see http://reluk.ca/project/wayic/script/way_root_element
      *     @see http://reluk.ca/project/wayic/script/on_way
      *     @see DocumentCache#addOmnireader
      */
    const WayTracer = ( function()
    {

        const expo = {}; // The public interface of WayTracer



        /** Starts this tracer.
          */
        expo.start = function()
        {
         // console.debug( 'Trace run starting' ); // TEST
            const id = ROOT_LEG_ID;
            console.assert( !(toEnforceConstraints && wasOpened(id)), A );
            openLeg( id );
            DocumentCache.readNowOrLater( ROOT_DOCUMENT_LOCATION, new class extends DocumentReader
            {
                close( cacheEntry ) { shutLeg( id ); }
                read( cacheEntry, doc )
                {
                    const root = doc.getElementById( 'root', doc );
                    if( root !== null ) traceLeg( id, root, cacheEntry );
                    else tsk( 'Unable to trace: Missing way root element: ' + id );
                }
            });
        };



       // - P r i v a t e ------------------------------------------------------------------------------


        /** Answers whether the specified leg is already traced.
          *
          *     @see #newLegID
          *     @see #shutLeg
          */
        function isShut( legID ) { return legsShut.includes(legID); }
          // The likely efficiency of this test is asserted by INC FAST, q.v.



        /** Array of leg identifiers (string), one for each leg of the trace in progress.
          */
        const legsOpen = [];



        /** Array of leg identifiers (string), one for each leg that is done tracing.
          */
        const legsShut = [];



        /** Constructs a trace leg identifier (string) for the given subjoining waybit.
          * Each trace leg is scoped to single DOM branch exclusive of subjoints.
          *
          *     @param sbjDocLoc (string) The location of the subjoint document in normal URL form.
          *     @param sbjID (string) The identifier of the subjoining waybit.
          */
        function newLegID( sbjDocLoc, sbjID ) { return sbjDocLoc + '#' + sbjID; }



        /** Adds the given leg identifier to legsOpen.
          *
          *     @see #newLegID
          *     @see #wasOpened
          */
        function openLeg( legID )
        {
            legsOpen.push( legID );
         // console.debug( legsOpen.length + '\t\tleg ' + legID ); // TEST
              // Spacing matters here, cf. shutLeg
        }



        /** The identifier of the root leg of the trace, from which all other legs are traced.
          *
          *     @see http://reluk.ca/project/wayic/script/way_root_element
          */
        const ROOT_LEG_ID = newLegID( ROOT_DOCUMENT_LOCATION, 'root' );



        /** Moves the given leg identifier from legsOpen to legsShut,
          * then starts decorating if all legs are now shut.
          *
          *     @throws (string) Error message if legID is missing from legsOpen.
          *
          *     @see #newLegID
          *     @see #isShut
          */
        function shutLeg( legID )
        {
            const o = legsOpen.indexOf( legID );
            if( o < 0 ) throw 'Leg is not open: ' + legID;

          // Shut the leg
          // ------------
            legsOpen.splice( o, /*removal count*/1 );
         // console.debug( '\t' + legsOpen.length + '\tleg ' + legID + ' ·' ); // TEST
              // Spacing matters here, cf. openLeg
            legsShut.push( legID );
            if( legsOpen.length > 0 ) return;

          // After all are shut
          // ------------------
            console.assert( legsShut.length < 200, AA + 'INC FAST, q.v.' );
              // Asserting the likely efficiency of the tests legsOpen and legsShut.includes
         // console.debug( 'Trace run complete' ); // TEST
        }



        /** Ensures that the specified leg is fully traced before returning.
          * May return with any number of its referentially joined legs yet untraced,
          * each slated for a separate tracing.
          *
          *     @see #newLegID
          *     @param branch (Element) Base element of the branch that comprises the leg.
          *     @param cacheEntry (DocumentCacheEntry)
          */
        function traceLeg( legID, branch, cacheEntry )
        {
            const docLoc = cacheEntry.location;
            const doc = branch.ownerDocument;
            if( doc === document )
            {
                branch.setAttributeNS( NS_READ, 'isOnWayBranch', 'isOnWayBranch' );
             // console.debug( '\t\t\t(in present document)' ); // TEST
            }
            let t = branch;
            const traversal = doc.createTreeWalker( t, SHOW_ELEMENT );
            do
            {
              // Jointer, case of
              // -------
                const linkV = t.getAttributeNS( NS_COG, 'link' );
                jointer: if( linkV !== null )
                {
                    let link;
                    try { link = new LinkAttribute( linkV ); }
                    catch( unparseable ) { break jointer; }

                    // No need here to fend against other types of malformed referential jointer.
                    // Rather take it as the wayscribe intended, so extend the trace.
                    let sbjDocLoc = link.subjointDocumentLocation;
                    sbjDocLoc = sbjDocLoc.length > 0? URIs.normalized(sbjDocLoc): docLoc;
                    const sbjID = link.subjointID;
                    const sbjLegID = newLegID( sbjDocLoc, sbjID );
                    if( wasOpened( sbjLegID )) break jointer;

                    openLeg( sbjLegID );
                    DocumentCache.readNowOrLater( sbjDocLoc, new class extends DocumentReader
                    {
                        close( sbjDocReg )
                        {
                            if( sbjDocReg.document === null ) shutLeg( sbjLegID );
                            // Else readDirectly has (or will) shut it
                        }

                        read( sbjDocReg, sbjDoc ) /* The call to this method might come now or later,
                          but the method itself ensures that any actual reading is done only later,
                          after the present leg is fully traced and marked shut.  Thus it enables
                          optimizations elsewhere in the code that depend on such ordering. */
                        {
                            const wasCalledLate = isShut( legID );
                            const readMethod = wasCalledLate? this.readDirectly: this.readLater;
                            readMethod.call( this, sbjDocReg, sbjDoc );
                        }

                        readDirectly( sbjDocReg, sbjDoc )
                        {
                            const sbj = sbjDoc.getElementById( sbjID );
                            sbjTrace: if( sbj !== null )
                            {
                              // Shield the subjoint trace work with a scan of ancestors
                              // ------------------------------
                                for( let a = sbj;; )
                                {
                                    a = a.parentNode;
                                    const aNS = a.namespaceURI;
                                    if( aNS === null ) // Then *a* is the document node
                                    {
                                        tsk( 'Malformed document: Missing *body* element: ' + sbjDocLoc );
                                        break;
                                    }

                                    if( isBitNS( aNS ))
                                    {
                                        const id = a.getAttribute( 'id' );
                                        if( id === null ) continue;

                                        if( isShut( newLegID( sbjDocLoc, id ))) break sbjTrace;
                                          // If only for sake of efficiency, ∵ this subjoint branch is
                                          // covered already (or will be) as part of a larger branch.
                                    }
                                    else if( a.localName === 'body' && aNS === NS_HTML ) break;
                                }

                              // Trace into the subjoint
                              // -----------------------
                                traceLeg( sbjLegID, sbj, sbjDocReg );
                            }
                            else console.warn( 'Broken joint truncates trace at leg: ' + sbjLegID );
                            shutLeg( sbjLegID );
                        }

                        readLater( sbjDocReg, sbjDoc )
                        {
                         // setTimeout( this.readDirectly, /*delay*/0, sbjDocReg, sbjDoc );
                         /// But more efficiently (as a microtask) and properly bound as a method call:
                            Promise.resolve().then( (()=>
                            {
                                this.readDirectly( sbjDocReg, sbjDoc );
                            }).bind( this ));
                            // This merely postpones execution till (I think) the end of the current
                            // event loop.  A more elegant and useful solution might be to specifically
                            // await the shut state of the present leg.  Maybe that too could be done
                            // using this new Promise/async facility?
                        }
                    });
                }

              // Subjoining waybit, case of
              // -----------------
                const id = t.getAttribute( 'id' );
                if( id && isShut(newLegID(docLoc,id)) ) toLastDescendant( traversal ); /* Bypassing
                  sub-branch t, if only for efficiency, as already it was traced in a separate leg. */
            }
            while( (t = traversal.nextNode()) !== null );
        }



        /** Answers whether the specified leg was ever opened.
          *
          *     @see #newLegID
          *     @see #openLeg
          */
        function wasOpened( legID ) { return legsOpen.includes(legID) || legsShut.includes(legID); }
          // The likely efficiency of these tests is asserted by INC FAST, q.v.



        return expo;

    }() );



   // ==============

    return expo;

}() );


/** NOTES
  * -----
  *  [AEP]  Avoid Element attribute properties *className* and *id*.
  *         They evaluate to an ‘empty string’ in cases where the attribute is absent.
  *         https://dom.spec.whatwg.org/#concept-element-attributes-get-value
  *
  *         Rather use Element.getAttribute.  It returns null in those cases, as one would expect.
  *         https://dom.spec.whatwg.org/#dom-element-getattribute.
  *
  *         See also Element.classList.
  *
  *  [BA] · Boolean attribute.  A boolean attribute such as [read:isFoo] either has the same value
  *         as the local part of its name (‘isFoo’), which makes it true, or it is absent
  *         and thereby false.  cf. http://w3c.github.io/html/infrastructure.html#sec-boolean-attributes
  *
  *  [C2] · The constructor of PartTransformC2 must remove all such markup.
  *
  *  [FHS]  Firefox (52.2) has the wrong History.state after travelling over entries E → E+2 → E+1,
  *         at least if E and E+1 differ only in fragment: it has state E, but should have E+1.
  *
  *  [FIB]  Focus for inlined breadcrumbs.  Here avoiding use of the HTML focus facility as a base
  *         for inlined breadcrumb trails.  It seems unreliable.  The browsers are doing their own
  *         peculiar things with focus which are hard to work around.
  *         http://w3c.github.io/html/editing.html#focus
  *
  *  [FSS]  Session storage for a document requested from a ‘file’ scheme URL.  On moving from document
  *         D1 to new document D2 by typing in the address bar (not activating a link), an item stored
  *         by D2 may, after travelling back, be unreadable by D1, as though it had not been stored.
  *         Affects Firefox 52.6.  Does not affect Chrome under option ‘--allow-file-access-from-files’.
  *
  *  [NPR]  Network-path reference.  https://tools.ietf.org/html/rfc3986#section-4.2
  *
  *  [ODO]  Out of display order.  This sometime present element is declared out of
  *         display order so not to interfere with the ordering of its ever present siblings.
  *         Normally it would be declared earlier, but that would complicate the lookup of its siblings,
  *         making them harder to find.
  *
  *  [OUR]  Here the entry reference is restricted to *our* entries in the session history.
  *         An entry's document might not run this program, or its session store might be inaccessible
  *         to this program.  Such an entry would not be *ours* in the present sense of the term.
  *
  *  [PD] · Path data.  It could instead be defined using the new SVGPathData interface, but this
  *         (array-form instead of string-form definition) wouldn’t help enough to outweigh the bother
  *         of using a polyfill.  https://github.com/jarek-foksa/path-data-polyfill.js
  *
  *  [PSA]  Page-show animation.  On revisiting a loaded page in session history (forward or backward),
  *         sometimes Firefox (60) fails to start or restart an animation commanded by a style rule.
  *
  *  [RPP]  Restricted public property.  Despite its exposure in the public interface,
  *         this property is not intended for general use.
  *
  *  [SH] · Standard HTML.  Here deliberately using standard HTML for sake of its proper DOM features,
  *         such as the *style* attribute.
  *
  *  [SIC]  SubjointImageCache.  The purpose of caching the subjoint images is to stablize the view
  *         within the viewport, especially on the vertical axis.  The vertical layout of the view
  *         depends on subjoint imaging.  If an image for an extradocument joint loads asynchronously,
  *         then it may deflect the view vertically.  Image caching and pre-caching will prevent this,
  *         stabilizing the view in all but a few edge cases.
  *
  *  [SVS]  Surrogate of viewport size.  Here using the size of the viewport including its scrollbar
  *         (if any) as a rough surrogate for the viewport size alone, which is harder to obtain.
  *
  *  [UN] · Either *undefined* or null in value.
  *
  *  [UZ] · Either *undefined* or zero in value.
  *
  *  [WDL]  ‘window.location’ or ‘document.location’?  One may use either, they are identical.
  *         https://www.w3.org/TR/html5/browsers.html#the-location-interface
  *
  *  [WTP]  Window target positioning.  Normally the browser itself does this, vertically scrolling
  *         the view to ensure the target appears in the viewport.  Firefox 60 was seen to fail however.
  *         It failed when this program was loaded by a *script* element injected at runtime.
  *         Probably because then the program ran late and was therefore late in styling the elements
  *         - especially the crucial display style of ‘block’ for the proper wayscript elements,
  *         which are XML and therefore ‘inline’ by default - which confused the browser.
  *
  *         A remedy might be to make this program load immediately.  The only reliable way, however,
  *         is to have the wayscribe write the *script* element into every way declaration document,
  *         which would be too awkward.  To instead write the *script* element programatically
  *         is disallowed for XML documents, and ‘strongly discouraged’ as unreliable for non-XML.
  *         http://w3c.github.io/html/webappapis.html#documentwrite
  *
  *         That leaves only *eval* or *Function*.  https://stackoverflow.com/a/21730944/2402790
  *         Neither seems reliable, especially in the case of debugging.
  *
  *  [XN] · XML names.  https://www.w3.org/TR/xml-names/
  */


// Copyright © 2017-2018 Michael Allan and contributors.  Licence MIT.
