var directionsService = new google.maps.DirectionsService();		
var directionsDisplay = new google.maps.DirectionsRenderer();
//var Reference01 = encodeURIComponent(document.getElementById("ref01").value);
//var Reference02 = encodeURIComponent(document.getElementById("ref02").value);	  
var Reference03;
var Reference04;
var map ;
var geocoder = new google.maps.Geocoder();

function showGoogleMap(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        navigator.geolocation.watchPosition(showPosition);
    } else {
        console.log("no geolocation support");
    }

    function showPosition(position) {
	
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        var options = {
            zoom: 15, 
            center: new google.maps.LatLng(lat, lng), 
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById("map_canvas"), options);
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, lng)
        });
        marker.setMap(map);
		
        var infoWindow = new google.maps.InfoWindow({
            content: "Vous êtes ici"
        });
        infoWindow.open(map, marker);
    }
}


function searchAddress() {
    var adresse = document.getElementById("map_canvas").value;
    geocoder.geocode({
        address: adresse
    }, function(results, status){
        if (status == google.maps.GeocoderStatus.OK){
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                position: results[0].geometry.location,
                map: map
            });
        } else {
            alert("Le géocodage a échoué.");
        }
    });
}

/*
function initial() {
    delete map;
    Reference01 = encodeURIComponent(document.getElementById("ref01").value);
    //alert(Reference01);
    Reference02 = encodeURIComponent(document.getElementById("ref02").value);	  
    map = new google.maps.Map(document.getElementById("contentMap"), {
        zoom: 12,
        center: new google.maps.LatLng(Reference01,Reference02),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(Reference01, Reference02)
    });
    marker.setMap(map);

    Reference03=Reference01;
    Reference04=Reference02;
    var objet1=new google.maps.LatLng(Reference01, Reference02);
    var objet2=new google.maps.LatLng(Reference03, Reference04);
    var i=1;
    while(i==1)
    {
        var distance=google.maps.geometry.spherical.computeDistanceBetween (objet1, objet2);
        if (distance<10000)
        {
            Reference03=Reference03-0.00001;
            objet2=new google.maps.LatLng(Reference03, Reference04);
        }
        else
        {
            i=0;
        }
    }
	
    var marker1 = new google.maps.Marker({
        position: new google.maps.LatLng(Reference03, Reference04)
    });
    marker1.setMap(map);
    var infoWindow = new google.maps.InfoWindow({
        content: "La position saisie <br/>Longitude " + Reference01 + "<br/>Latitude " + Reference02
    });
    infoWindow.open(map, marker);
		  
    var infoWindow = new google.maps.InfoWindow({
        content: "La nouvelle position 10km plus au Sud <br/>Longitude " + Reference03 + "<br/>Latitude " + Reference04
    });
    infoWindow.open(map, marker1);		
    var newLineCoordinates = [
    new google.maps.LatLng(Reference01,Reference02),
    new google.maps.LatLng(Reference03, Reference04)];
         
    var newLine = new google.maps.Polyline({
        path: newLineCoordinates,        
        strokeColor: "#046380",
        strokeOpacity: 1.0,
        strokeWeight: 2
    });
    newLine.setMap(map);		
    /////////////////////::it��ration


    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById("contentMap"));

	  
}
*/	
	/*

        function load() {
    if (GBrowserIsCompatible()) {
        var map = new GMap2(document.getElementById("map"));
        map.addControl(new GSmallMapControl());
        map.addControl(new GMapTypeControl());
        var center = new GLatLng(	34.02590,-6.83640);
        map.setCenter(center, 15);
        geocoder = new GClientGeocoder();
        var marker = new GMarker(center, {draggable: true});  
        map.addOverlay(marker);
        document.getElementById("lat").innerHTML = center.lat().toFixed(5);
        document.getElementById("lng").innerHTML = center.lng().toFixed(5);

	  GEvent.addListener(marker, "dragend", function() {
       var point = marker.getPoint();
	      map.panTo(point);
       document.getElementById("lat").innerHTML = point.lat().toFixed(5);
       document.getElementById("lng").innerHTML = point.lng().toFixed(5);

        });


	 GEvent.addListener(map, "moveend", function() {
		  map.clearOverlays();
    var center = map.getCenter();
		  var marker = new GMarker(center, {draggable: true});
		  map.addOverlay(marker);
		  document.getElementById("lat").innerHTML = center.lat().toFixed(5);
	   document.getElementById("lng").innerHTML = center.lng().toFixed(5);


	 GEvent.addListener(marker, "dragend", function() {
      var point =marker.getPoint();
	     map.panTo(point);
      document.getElementById("lat").innerHTML = point.lat().toFixed(5);
	     document.getElementById("lng").innerHTML = point.lng().toFixed(5);

        });
 
        });

    }
    }

	   function showAddress(address) {
	   var map = new GMap2(document.getElementById("map"));
       map.addControl(new GSmallMapControl());
       map.addControl(new GMapTypeControl());
       if (geocoder) {
        geocoder.getLatLng(
          address,
          function(point) {
            if (!point) {
              alert(address + " not found");
            } else {
		  document.getElementById("lat").innerHTML = point.lat().toFixed(5);
	   document.getElementById("lng").innerHTML = point.lng().toFixed(5);
		 map.clearOverlays()
			map.setCenter(point, 14);
   var marker = new GMarker(point, {draggable: true});  
		 map.addOverlay(marker);

		GEvent.addListener(marker, "dragend", function() {
      var pt = marker.getPoint();
	     map.panTo(pt);
      document.getElementById("lat").innerHTML = pt.lat().toFixed(5);
	     document.getElementById("lng").innerHTML = pt.lng().toFixed(5);
        });


	 GEvent.addListener(map, "moveend", function() {
		  map.clearOverlays();
    var center = map.getCenter();
		  var marker = new GMarker(center, {draggable: true});
		  map.addOverlay(marker);
		  document.getElementById("lat").innerHTML = center.lat().toFixed(5);
	   document.getElementById("lng").innerHTML = center.lng().toFixed(5);

	 GEvent.addListener(marker, "dragend", function() {
     var pt = marker.getPoint();
	    map.panTo(pt);
    document.getElementById("lat").innerHTML = pt.lat().toFixed(5);
	   document.getElementById("lng").innerHTML = pt.lng().toFixed(5);
        });
 
        });

            }
          }
        );
      }
    }
    */