
(function(){

	var init = function(){

		var domItems = [];
		var btn = document.getElementById("arrowDown");
		btn.onclick = openNav;
		jQuery('#anchor').hide();

	}();


	//  Starting view --------------------------------------------
	mapboxgl.accessToken = 'pk.eyJ1IjoiYXllcnNhbnRoIiwiYSI6ImNqYW43cmN0azM4cWYycXBsY3p2ZzN5bmIifQ.QMwrJfUgUurCbUJ0XezFPg';
	var map = new mapboxgl.Map({

		container: 'map',
		style: 'mapbox://styles/ayersanth/cjan7fb2hdf5l2rnymzb5iw5b',
		center: [174.7762, -41.2865],
		zoom: 4

	});
	// End --------------------------------------------


	// Token Details --------------------------------------------
	var spaHotel = {
	  	type: 'FeatureCollection',
		features: [{
			type: 'Feature', 
			properties: { 
				Name: 'Spa Hotel',
				Address: '281 Spa Rd, Taupo',
				image: 'spa2.jpg',
				price: 157, 
				id: 'spaBtn', 
				address:"http://spahotel.nz/"
			},
			geometry: { 
				type: 'Point', 
				coordinates: [176.0923, -38.6739] 
			} 
		},]
	};
	var tongariroHotel = {
		type: 'FeatureCollection',
		features: [{
	 		type: 'Feature', 
	 		properties: { 
	 			Name: 'Chateau Tongariro Hotel', 
	 			Address: 'State Highway 48, Mt Ruapehu', 
	 			image: 'tongariro2.jpg', 
	 			price: 30, 
	 			id: 'tongariroBtn', 
	 			address:"http://www.chateau.co.nz/" 
	 		}, 
 			geometry: { 
 				type: 'Point', 
 				coordinates: [175.5392, -39.1998] 
 			} 
 		},]
	};
	var vulcanHotel = {
		type: 'FeatureCollection',
		features: [{ 
			type: 'Feature', 
			properties: { 
				Name: 'Vulcan Hotel', 
				Address: '1670 Loop Rd, St Bathans', 
				image: 'vulcan2.jpg', 
				price: 90, 
				id: 'vulcanBtn', 
				address:"http://www.otagorailtrail.co.nz/places/near-the-trail/st-bathans/accommodation/vulcan-hotel" 
			}, 
			geometry: { 
				type: 'Point', 
				coordinates: [169.8110, -44.8710] 
			} 
		},]
	};
	var larnachCastle = {
		type: 'FeatureCollection',
		features: [{ 
			type: 'Feature', 
			properties: { 
				Name: 'Larnach Castle', 
				Address: '145 Camp Rd, Dunedin', 
				image: 'larnach2.jpg', 
				price: 240, 
				id: 'larnachBtn', 
				address:"http://www.larnachcastle.co.nz/" 
			}, 
			geometry: { 
				type: 'Point', 
				coordinates: [170.6272, -45.8616] 
			} 
		},]
	};
	var tombstoneBackpackers = {
		type: 'FeatureCollection',
		features: [{ 
			type: 'Feature', 
			properties: { 
				Name: 'Tombstone Backpackers', 
				Address: '16 Gravesend Pl, Picton', 
				image: 'tombstone2.jpg',
				price: 20, 
				id: 'tombstoneBtn', 
				address:"http://www.tombstonebp.co.nz/" 
			}, 
			geometry: { 
				type: 'Point', 
				coordinates: [173.9997, -41.2906] 
			} 
		},]
	};
	// End --------------------------------------------


	// Show and hide map --------------------------------------------
	function openNav(){

		var scrollDown = document.getElementById("anchor");
	    if (document.getElementById("arrowDown").classList.contains("closed")){
	    	document.getElementById("mapBox").style.height = "500px";
	    	document.getElementById("anchor").style.height = "200px";
	    	document.getElementById("myForm").style.display = "";
	    	document.getElementById("arrowDown").classList.add("open");
			document.getElementById("arrowDown").classList.remove("closed");
			jQuery('#anchor').show();
	        $("html").animate({
	            'scrollTop': $(this).offset().top
	        });
		} else {
	    	document.getElementById("mapBox").style.height = "0";
			document.getElementById("anchor").style.height = "0";
			document.getElementById("myForm").style.display = "none";
	    	document.getElementById("arrowDown").classList.add("closed");
			document.getElementById("arrowDown").classList.remove("open");
	    }

	}
	// End --------------------------------------------


	// Submit Button --------------------------------------------
	var oForm = document.forms[0];
	var els = oForm.elements;
	// cloud variable
	var vals;

	document.getElementById('subBtn').onclick = function(e){
		
		e.preventDefault();
		// loops through the elements inside forms[] and passes the values of the chosen options 
		// to the vals variable for global use
		function loopForm(elements) {

			var passValues = [];
			for (var i = 0; i < elements.length; i++){
				passValues.push(elements[i].value);
			}
			vals = passValues;
			return passValues;

		}
		loopForm(els);

		// resets arrays
		finalP.length = 0;
		finalN.length = 0;
		final.length = 0;

		// selects corresponding array elements
		peopleRange = vals[0];
		nightRange = vals[1];

		// compares min & max ranges to the input
		minMaxP(peopleRange);
		minMaxN(nightRange);

		// matches said ranges to accomodation options
		match();

		// reveals relevant markers
		reveal();

	};
	// End --------------------------------------------


	// Form Calculations --------------------------------------------
	// variables holding original values for comparison
	var accomodation = [spaHotel, tongariroHotel, vulcanHotel, larnachCastle, tombstoneBackpackers];
	var control =  ["spa", "tongariro", "vulcan", "larnach", "tombstone"];

	// A variable representing dateRange
	var peopleRange;
	var nightRange;

	// An object representing minimum occupancy values
	var minObjP = {
		spa: 1,
		tongariro: 1,
		vulcan: 2,
		larnach: 1,
		tombstone: 2
	};

	// An object representing maximum occupancy values
	var maxObjP = {
		spa: 2,
		tongariro: 6,
		vulcan: 4,
		larnach: 4,
		tombstone: 9
	};

	// An object representing minimum stay values
	var minObjN = {
		spa: 1,
		tongariro: 1,
		vulcan: 3,
		larnach: 2,
		tombstone: 1
	};

	// An object representing maximum stay values
	var maxObjN = {
		spa: 5,
		tongariro: 10,
		vulcan: 10,
		larnach: 15,
		tombstone: 4
	};

	// Arrays to hold final groups a applicable accommodation options
	var finalP = [];
	var finalN = [];
	var final = [];
	var key;

	function minMaxP(people){

		//empty arrays to store, loop and check data
		var selectionA = [];
		var selectionB = [];
		//This is a loop for the min value object
		for (key in minObjP) {
		    if (people >= minObjP[key]) {
		    	selectionA.push(key);
		    } else {
		    	selectionA.push(false);
		    }
		}
		//This is a loop for the max value object
		for (key in maxObjP) {
		    if (people <= maxObjP[key]) {
		    	selectionB.push(key);
		    } else {
		    	selectionB.push(false);
		    }
		}
		// A final for loop that tests our selectionA & 
		// selectionB variables for double matches === test passed, within range
		for (var i = 0; i < 5; i++) {
			if (selectionA[i] === selectionB[i]) {
				console.log(selectionA[i] + ' s');
				finalP.push(selectionA[i]);
			} else {
				finalP.push(false);
			}
		}
		return finalP;

	}

	function minMaxN(nights){

		var selectionA = [];
		var selectionB = [];
		//This is a loop for the min value object
		for (key in minObjN) {
		    if (nights >= minObjN[key]) {
		    	selectionA.push(key);
		    } else {
		    	selectionA.push(false);
		    }
		}
		//This is a loop for the max value object
		for (key in maxObjN) {
		    if (nights <= maxObjN[key]) {
		    	selectionB.push(key);
		    } else {
		    	selectionB.push(false);
		    }
		}
		// A final for loop that tests our selectionA & 
		// selectionB variables for double matches === test passed, within range
		for (var i = 0; i < 5; i++) {
			if (selectionB[i] === selectionA[i]) {
				console.log(selectionA[i] + ' s');
				finalN.push(selectionA[i]);
			} else {
				finalN.push(false);
			}
		}
		return finalN;

	}

	function match(){

		for (var i = 0; i < 5; i++) {
			if (finalP[i] === finalN[i]) {
				console.log(finalN[i] + ' s');
				final.push(finalN[i]);
			} else {
				final.push(false);
			}
		}
		return final;

	}
	// End --------------------------------------------


	// Add or remove Markers from Map --------------------------------------------
	function reveal(){
		
		for (var i = 0; i < 5; i++) {
			var el = document.createElement('div');
			if (final[i] === control[i]) {
				accomodation[i].features.forEach(function(marker) {
					
					el.className = 'marker';
					// make a marker for each feature and add to the map
					new mapboxgl.Marker(el)
						.setLngLat(marker.geometry.coordinates)
						.setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
	  					.setHTML('<h3>' + marker.properties.Name + '</h3><image src="imgs/' + marker.properties.image + '"></image><h4>Total $' + (peopleRange*nightRange*marker.properties.price) + '</h4><a href=' + marker.properties.address +' target="_blank"><button id=' + marker.properties.id + ' class=infoBtn>info</button></a><style>'))
						.addTo(map);

				});
			}
		}

	}
	// End --------------------------------------------

})();

