
function initMap() {
      const contMapa = document.getElementById("map");
      const directionsService = new google.maps.DirectionsService();
      const directionsDisplay = new google.maps.DirectionsRenderer();
      const geocoder = new google.maps.Geocoder();
      const lima = {lat:-12.1191427, lng:-77.0349046};
      
    //Caracterisricas del mapa 
      const mapOptions = {
   			  zoom:18, // 1, 5, 10,15,20
          center:lima,
          disableDefaultUI:true,
        }
        
    /*  const mapUbication = {
        zoom:15,
        maptypeId:google.maps.MaptypeId.ROADMAP
      };*/

    //Creamos el mapa     
      const mapa = new google.maps.Map(contMapa,mapOptions);
    //Adjuntamos al mapa las siguientes caracteriristicas
      directionsDisplay.setMap(mapa);
    //Aqui indicamos el efecto que tendra el marcador  
      const marcador = new google.maps.Marker({
        position: {lat:lima.lat, lng:lima.lng},
        animation: google.maps.Animation.DROP,
        map: mapa
     });   

     //LLamamos al evento del window para que el mapa nos pueda ubicar
    window.addEventListener("load", function(){
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getCoords, errorFound);} 
        else {
            alert("Tu navegador no soporta Geolocation");
          }
      });
  
    function errorFound(error) {
        alert("Un error ocurrió: " + error.code);
      };
    
      function getCoords(position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
    
       var miUbicacion = new google.maps.Marker({
              position : {lat:lat, lng:lon},
              animation: google.maps.Animation.DROP,
              map:mapa
         });
        //Al mapa creado le agrego mi ubicación
        mapa.setCenter({lat:lat, lng:lon})  
      }  

  /* CODIGO PARA GEOLOCALIZACION ACTUAL */
  /* var btn_ubication = document.getElementById('encuentrame');
   btn_ubicacion.addEventListener('click', ubicacionActual);
   
   function ubicacionActual(){
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

   var miUbicacion = new google.maps.Marker({
          position : {lat:lat, lng:lon},
          animation: google.maps.Animation.DROP,
          map:mapa
     });
     mapa.setCenter({lat:lat, lng:lon})  
   }*/

   
  //Autocompletados de direcciones inicio
    var puntos = document.querySelectorAll("input[id*='punto-']");
    var lista = [...puntos];
      for (i in lista){
         new google.maps.places.Autocomplete(lista[i]);
       }

//Evento que traza la ruta y obtiene información de lo ruta,
       var btn_ruta = document.getElementById("trazarRuta");
           btn_ruta.addEventListener("click", trazarRuta);   

         function trazarRuta(e){
            e.preventDefault();
            var request = {
              origin:lista[0].value,
              destination:lista[1].value,
              travelMode:"DRIVING",
            } 

          function callback(result,status){
            
            if(status=="OK"){
                directionsDisplay.setDirections(result);
                      var distancia = (result.routes[0].legs[0].distance.value)/1000;
                      var costo = Math.round(distancia*1.75);
                      var nodoTextControl = document.createTextNode("El costo por el servicio es : S/." + costo);           
                        document.getElementById("calcTarifa").appendChild(nodoTextControl);
                    }else {
                        window.alert("No encontramos la ruta");   
                      }
              }
              
            directionsService.route(request, callback);
          }
  }     
    



