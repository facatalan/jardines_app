/**
 * jQuery gMap
 *
 * @url		http://gmap.nurtext.de/
 * @author	Cedric Kastner <cedric@nur-text.de>
 * @version	1.1.0
 */
(function($)
{
	// Main plugin function
	$.fn.gMap = function(options)
	{
		// Check if the browser is compatible
		if (!window.GBrowserIsCompatible || !GBrowserIsCompatible()) return this;
		
		// Build main options before element iteration
		var opts = $.extend({}, $.fn.gMap.defaults, options);
    	
		// Iterate through each element
		return this.each(function()
		{
			// Create map and set initial options
			$gmap = new GMap2(this);
			$.gmap2=$gmap;
			
			// Create new object to geocode addresses
			$geocoder = new GClientGeocoder();
			
			// Check for address to center on
			if (opts.address)
			{ 
				// Get coordinates for given address and center the map
				$geocoder.getLatLng(opts.address, function(gpoint){ $gmap.setCenter(gpoint, opts.zoom); });
				
			}
			else
			{
				// Check for coordinates to center on
				if (opts.latitude && opts.longitude)
				{
					// Center map to coordinates given by option
					$gmap.setCenter(new GLatLng(opts.latitude, opts.longitude), opts.zoom);
					
				}
				else
				{
					// Check for a marker to center on (if no coordinates given)
					if ($.isArray(opts.markers) && opts.markers.length > 0)
					{
						// Check if the marker has an address
						if (opts.markers[0].address)
						{
							// Get the coordinates for given marker address and center
							$geocoder.getLatLng(opts.markers[0].address, function(gpoint){ $gmap.setCenter(gpoint, opts.zoom); });
							
						}
						else
						{
							// Center the map to coordinates given by marker
							$gmap.setCenter(new GLatLng(opts.markers[0].latitude, opts.markers[0].longitude), opts.zoom);
							
						}
						
						
					}
					else
					{
						// Revert back to world view
						$gmap.setCenter(new GLatLng(34.885931, 9.84375), opts.zoom);
						
					}
					
				}
				
			}
						
			// Set the preferred map type
			$gmap.setMapType(opts.maptype);
			
			// Check for map controls
			if (opts.controls.length == 0)
			{
				// Default map controls
				$gmap.setUIToDefault();
				
			}
			else
			{
				// Add custom map controls
				for (var i = 0; i < opts.controls.length; i++)
				{
					// Eval is evil
					eval('$gmap.addControl(new ' + opts.controls[i] + '());');
					
				}
				
			}
						
			// Check if scrollwheel should be enabled
			if (opts.scrollwheel == true && opts.controls.length != 0) { $gmap.enableScrollWheelZoom(); }
									
			// Loop through marker array
			for (var j = 0; j < opts.markers.length; j++)
			{
				// Get the options from current marker
				marker = opts.markers[j];
								
				// Create new icon
				gicon = new GIcon();
				
				// Set icon properties from global options
				gicon.image = opts.icon.image;
				gicon.shadow = opts.icon.shadow;
				gicon.iconSize = ($.isArray(opts.icon.iconsize)) ? new GSize(opts.icon.iconsize[0], opts.icon.iconsize[1]) : opts.icon.iconsize;
				gicon.shadowSize = ($.isArray(opts.icon.shadowsize)) ? new GSize(opts.icon.shadowsize[0], opts.icon.shadowsize[1]) : opts.icon.shadowsize;
				gicon.iconAnchor = ($.isArray(opts.icon.iconanchor)) ? new GPoint(opts.icon.iconanchor[0], opts.icon.iconanchor[1]) : opts.icon.iconanchor;
				gicon.infoWindowAnchor = ($.isArray(opts.icon.infowindowanchor)) ? new GPoint(opts.icon.infowindowanchor[0], opts.icon.infowindowanchor[1]) : opts.icon.infowindowanchor;
				
				if (marker.icon)
				{
					// Overwrite global options
					gicon.image = marker.icon.image;
					gicon.shadow = marker.icon.shadow;
					gicon.iconSize = ($.isArray(marker.icon.iconsize)) ? new GSize(marker.icon.iconsize[0], marker.icon.iconsize[1]) : marker.icon.iconsize;
					gicon.shadowSize = ($.isArray(marker.icon.shadowsize)) ? new GSize(marker.icon.shadowsize[0], marker.icon.shadowsize[1]) : marker.icon.shadowsize;
					gicon.iconAnchor = ($.isArray(marker.icon.iconanchor)) ? new GPoint(marker.icon.iconanchor[0], marker.icon.iconanchor[1]) : marker.icon.iconanchor;
					gicon.infoWindowAnchor = ($.isArray(marker.icon.infowindowanchor)) ? new GPoint(marker.icon.infowindowanchor[0], marker.icon.infowindowanchor[1]) : marker.icon.infowindowanchor;
					
				}
				
				// Check if address is available
				if (marker.address)
				{
					// Check for reference to the marker's address
					if (marker.html == '_address') { marker.html = marker.address; }
					
					// Get the point for given address
					$geocoder.getLatLng(marker.address, function(gicon, marker)
					{
						// Since we're in a loop, we need a closure when dealing with event handlers, return functions, etc.
						// See <http://www.mennovanslooten.nl/blog/post/62> for more information about closures
						return function(gpoint)
						{
							// Create marker
							gmarker = new GMarker(gpoint, gicon);
							
							// Set HTML and check if info window should be opened
							if (marker.html) { gmarker.bindInfoWindowHtml(opts.html_prepend + marker.html + opts.html_append); }
							if (marker.html && marker.popup) { gmarker.openInfoWindowHtml(opts.html_prepend + marker.html + opts.html_append); }
							
							// Add marker to map
							if (gmarker) { $gmap.addOverlay(gmarker); }
						}
						
					}(gicon, marker));
					
				}
				else
				{
					// Check for reference to the marker's latitude/longitude
					if (marker.html == '_latlng') { marker.html = marker.latitude + ', ' + marker.longitude; }
					
					// Create marker
					gmarker = new GMarker(new GPoint(marker.longitude, marker.latitude), gicon);
					
					// Set HTML and check if info window should be opened
					if (marker.html) { gmarker.bindInfoWindowHtml(opts.html_prepend + marker.html + opts.html_append); }
					if (marker.html && marker.popup) { gmarker.openInfoWindowHtml(opts.html_prepend + marker.html + opts.html_append); }
						
					// Add marker to map
					if (gmarker) { $gmap.addOverlay(gmarker); }
					
				}
				
			}
		});
		
	}

	$.deleteComparar=function(jardinId){
		var tr=$("#"+jardinId);
		$.each(tr,function(key,val){
			val.parentNode.removeChild(val);			
		});
	}
		
	$.comparar=function(id){
		$.getJSON('/jardins/'+id+'.json', function(data) {
			$.each(data, function(key,val) {
				var jardinAux="<tr id=\"jardin"+id+"\" >"+
					"<td>"+val.nombre+"</td>"+
                    "<td><a href=\"/jardins/"+id+"\" target=\"_blank\">detalle</a><br/><a href=\"#\" onClick=\"$.deleteComparar('jardin"+id+"');return true\">X</a></td>"+
                    "<td >"+val.direccion+"</td>"+
                    "<td nowrap=\"nowrap\">"+val.telefono+"</td>"+
                    "<td>"+val.web+"</td>"+
                    "<td>"+val.email+"</td>"+
                    "<td>"+val.capacidad+"</td>"+
                    "<td>"+val.webcams+"</td>"+
                    "<td>"+val.niños_x_parvularias+"</td>"+
                    "<td>"+val.parvularias+"</td>"+
                    "<td>"+val.auxiliares+"</td>"+
                    "<td>"+val.matricula+"</td>"+
                    "<td>"+val.mensualidad+"</td>"+
                    "<td>"+val.sistema_educativo+"</td>"+
                    "<td>"+val.edad_entrada+"</td>"+
                    "<td>"+val.edad_salida+"</td>"+
                    "<td>"+val.horario_inicio+"</td>"+
                    "<td>"+val.horario_termino+"</td>"+
                    "<td>"+val.vacantes+"</td>"+
					"</tr>";
				$("#tablaComparacion").append(jardinAux);
				$("#no_hay_jardines_para_comparar").hide();
			});
		});
	
	}

	$.fn.actualizarMapa=function() {
		//alert("actual");
		$.jardines = [];
		var mapBounds=$.gmap2.getBounds();
		var SW=mapBounds.getSouthWest();
		var NE=mapBounds.getNorthEast();
		$.getJSON('/jardins/mapSearch?SWLat='+SW.lat()+'&NELat='+NE.lat()+'&SWLng='+SW.lng()+'&NELng='+NE.lng(), function(data) {
			$.each(data, function(key,val) {
			    $.jardines.push({ latitude: val.jardin.latitud , longitude: val.jardin.longitud, html: "<b>Nombre: </b>"+val.jardin.nombre+"<br/><b>Dirección: </b>"+val.jardin.direccion+"<br/><br/><a href=\"#mapa\" onClick=\"$.comparar('"+val.jardin.id+"');return true\">comparar</a>", 
				icon:
				    {
				        image:              "images/puntoJardin.png",
				        shadow:             false,
				        iconsize:           [9, 9],
				        shadowsize:         false,
				        iconanchor:         [4, 5],
				        infowindowanchor:   [4, 5]
				    }
				});
			});
			//alert("borrando y actualizando: "+$.jardines.length);
			$.gmap2.clearOverlays();
			$("#map_canvas").actualizarMarkers({markers: $.jardines})
		});
  	}
	
	$.cambiarComuna=function(){
		//Leer posición del formulario
		//Santiago
		var comunas= new Array();
		var comunaAux= new Array();
		comunaAux["centro"]=new GLatLng(-33.451782,-70.656509);
		comunaAux["zoom"]=13;
		comunas["Santiago"]=comunaAux;
		//Providencia
		var comunaAux= new Array();
		comunaAux["centro"]=new GLatLng(-33.43445,-70.612221);
		comunaAux["zoom"]=14;
		comunas["Providencia"]=comunaAux;
		//Ñuñoa
		var comunaAux= new Array();
		comunaAux["centro"]=new GLatLng(-33.45973,-70.600204);
		comunaAux["zoom"]=14;
		comunas["Ñuñoa"]=comunaAux;
		//Las Condes
		var comunaAux= new Array();
		comunaAux["centro"]=new GLatLng(-33.412099,-70.56);
		comunaAux["zoom"]=13;
		comunas["Las Condes"]=comunaAux;

		//Setear nueva posición y zoom del mapa
		$.gmap2.setCenter(comunas[$("#comuna")[0].value]["centro"],comunas[$("#comuna")[0].value]["zoom"]);
		//Actualizar mapa
		
		//$("#map_canvas").actualizarMapa();
		
	}
	
	
	$.fn.actualizarMarkers= function(options){
		var opts = $.extend({}, $.fn.gMap.defaults, options);
		//alert("actualizando, largo:"+opts.markers.length);
		
		// Loop through marker array
		for (var j = 0; j < opts.markers.length; j++)
		{
			// Get the options from current marker
			//alert("marcador "+ j);
			marker = opts.markers[j];
							
			// Create new icon
			gicon = new GIcon();
			
			// Set icon properties from global options
			gicon.image = opts.icon.image;
			gicon.shadow = opts.icon.shadow;
			gicon.iconSize = ($.isArray(opts.icon.iconsize)) ? new GSize(opts.icon.iconsize[0], opts.icon.iconsize[1]) : opts.icon.iconsize;
			gicon.shadowSize = ($.isArray(opts.icon.shadowsize)) ? new GSize(opts.icon.shadowsize[0], opts.icon.shadowsize[1]) : opts.icon.shadowsize;
			gicon.iconAnchor = ($.isArray(opts.icon.iconanchor)) ? new GPoint(opts.icon.iconanchor[0], opts.icon.iconanchor[1]) : opts.icon.iconanchor;
			gicon.infoWindowAnchor = ($.isArray(opts.icon.infowindowanchor)) ? new GPoint(opts.icon.infowindowanchor[0], opts.icon.infowindowanchor[1]) : opts.icon.infowindowanchor;
			
			if (marker.icon)
			{
				// Overwrite global options
				gicon.image = marker.icon.image;
				gicon.shadow = marker.icon.shadow;
				gicon.iconSize = ($.isArray(marker.icon.iconsize)) ? new GSize(marker.icon.iconsize[0], marker.icon.iconsize[1]) : marker.icon.iconsize;
				gicon.shadowSize = ($.isArray(marker.icon.shadowsize)) ? new GSize(marker.icon.shadowsize[0], marker.icon.shadowsize[1]) : marker.icon.shadowsize;
				gicon.iconAnchor = ($.isArray(marker.icon.iconanchor)) ? new GPoint(marker.icon.iconanchor[0], marker.icon.iconanchor[1]) : marker.icon.iconanchor;
				gicon.infoWindowAnchor = ($.isArray(marker.icon.infowindowanchor)) ? new GPoint(marker.icon.infowindowanchor[0], marker.icon.infowindowanchor[1]) : marker.icon.infowindowanchor;
				
			}
			
			// Check if address is available
			if (marker.address)
			{
				// Check for reference to the marker's address
				if (marker.html == '_address') { marker.html = marker.address; }
				
				// Get the point for given address
				$geocoder.getLatLng(marker.address, function(gicon, marker)
				{
					// Since we're in a loop, we need a closure when dealing with event handlers, return functions, etc.
					// See <http://www.mennovanslooten.nl/blog/post/62> for more information about closures
					return function(gpoint)
					{
						// Create marker
						gmarker = new GMarker(gpoint, gicon);
						
						// Set HTML and check if info window should be opened
						if (marker.html) { gmarker.bindInfoWindowHtml(opts.html_prepend + marker.html + opts.html_append); }
						if (marker.html && marker.popup) { gmarker.openInfoWindowHtml(opts.html_prepend + marker.html + opts.html_append); }
						
						// Add marker to map
						if (gmarker) { $.gmap2.addOverlay(gmarker); }
					}
					
				}(gicon, marker));
				
			}
			else
			{
				// Check for reference to the marker's latitude/longitude
				if (marker.html == '_latlng') { marker.html = marker.latitude + ', ' + marker.longitude; }
				
				// Create marker
				gmarker = new GMarker(new GPoint(marker.longitude, marker.latitude), gicon);
				
				// Set HTML and check if info window should be opened
				if (marker.html) { gmarker.bindInfoWindowHtml(opts.html_prepend + marker.html + opts.html_append); }
				if (marker.html && marker.popup) { gmarker.openInfoWindowHtml(opts.html_prepend + marker.html + opts.html_append); }
					
				// Add marker to map
				if (gmarker) { $.gmap2.addOverlay(gmarker); }
				
			}
			
		}
		
	}
		
	// Default settings
	$.fn.gMap.defaults =
	{
		address:				'',
		latitude:				0,
		longitude:				0,
		zoom:					1,
		markers:				[],
		controls:				[],
		scrollwheel:			true,
		maptype:				G_NORMAL_MAP,
		html_prepend:			'<div class="gmap_marker">',
		html_append:			'</div>',
		icon:
		{
			image:				"http://www.google.com/mapfiles/marker.png",
			shadow:				"http://www.google.com/mapfiles/shadow50.png",
			iconsize:			[20, 34],
			shadowsize:			[37, 34],
			iconanchor:			[9, 34],
			infowindowanchor:	[9, 2]
			
		}
		
	}
	
})(jQuery);