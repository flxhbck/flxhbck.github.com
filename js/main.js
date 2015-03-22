var $container = $('#container');
// init
$container.isotope({
	// options
	layoutMode: 'packery',
	itemSelector: '.item',
	packery: {
		columnWidth: '.grid-sizer',
		gutter: '.gutter-sizer'
	}
});



var filterFns = {
	all: function() {
    	return $(this).hasClass('project') || $(this).hasClass('experiment');
    },
	projects: function() {
    	return $(this).hasClass('project');
    },
    experiments: function() {
    	return $(this).hasClass('experiment');
    },
    about: function() {
    	return $(this).hasClass('about');
    },
};



// bind filter button click
$('#filters').on( 'click', 'button', function() {
	var filterValue = $( this ).attr('data-filter');
    // use filterFn if matches value
    filterValue = filterFns[ filterValue ] || filterValue;
    $container.isotope({ filter: filterValue });
});

// change is-checked class on buttons
$('.button-group').each( function( i, buttonGroup ) {
	var $buttonGroup = $( buttonGroup );
    $buttonGroup.on( 'click', 'button', function() {
    	$buttonGroup.find('.is-checked').removeClass('is-checked');
    	$( this ).addClass('is-checked');
    });
});

// bind filter button click
$('#item').on( 'click', 'button', function() {
	var filterValue = $( this ).attr('data-filter');
    // use filterFn if matches value
    filterValue = filterFns[ filterValue ] || filterValue;
    $container.isotope({ filter: filterValue });
});


function getHashFilter() {
  var hash = location.hash;
  // get filter=filterName
  var matches = location.hash.match( /show.([^&]+)/i );
  var hashFilter = matches && matches[1];
  return hashFilter && decodeURIComponent( hashFilter );
}


$( function() {

  var $container = $('#container');

  // bind filter button click
  var $filters = $('#filters').on( 'click', 'button', function() {
    var filterAttr = $( this ).attr('data-filter');
    // set filter in hash
   location.hash = 'show.' + encodeURIComponent( filterAttr );
   location.pathname = '';
    
  });

  var isIsotopeInit = false;

  function onHashchange() {
    var hashFilter = getHashFilter();
    if ( !hashFilter && isIsotopeInit ) {
      return;
    }

    isIsotopeInit = true;
    // filter isotope
    $container.isotope({
      // use filterFns
      filter: filterFns[ hashFilter ] || hashFilter || '.project, .experiment'
    });
    // set selected class on button
    if ( hashFilter ) {
      $filters.find('.is-checked').removeClass('is-checked');
      $filters.find('[data-filter="' + hashFilter + '"]').addClass('is-checked');
    } else {
      $filters.find('.is-checked').removeClass('is-checked');
    }
  }

  $(window).on( 'hashchange', onHashchange );

  // trigger event handler to init Isotope
  onHashchange();

});