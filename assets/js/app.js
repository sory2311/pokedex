
document.getElementById("info").style.display="none";
$('#pokesearch').click(function () {
  // Rescatando el valor ingresado
  const pokemonName = $('#pokemon-name').val();
  const pokemonNameLower = pokemonName.toLowerCase();
  $('.info-modal').empty();
  $('#pokemon-img').empty();
  $('#pokemon-nombre').empty();
  $('#pokemon-peso').empty();
  $('#pokemon-numero').empty();
  $('#pokemon-habilidades').empty();
  $('#pokemon-tipo').empty();

  $.ajax({
    url: `https://pokeapi.co/api/v2/pokemon/${pokemonNameLower}`,
    type: 'GET',
    datatype: 'json',
    success: function (results) {
      console.log(results);
    }
  }).done(response).fail(error);
  function response(data) {
    $('#pokemon-container').empty();
    var pokemonImg = data.sprites.front_default;
    var pokemonName = data.name;
    var pokemonNumber = data.order;
    var pokemonWeight = data.weight;
    var pokemonAbbilities = data.abilities[0].ability.name;
    var pokemonAbbilities1 = data.abilities[1].ability.name;
    var pokemonType = '';
    var pokemonType1 = '';
    if (data.types.length <= 1) {
      pokemonType = data.types[0].type.name
      $('#pokemon-tipo').append(`<p>${pokemonType}</p>`);
    } else {
      pokemonType = data.types[0].type.name
      pokemonType1 = data.types[1].type.name
      $('#pokemon-tipo').append(`<p>${pokemonType}, ${pokemonType1}</p>`);

    }

    $('.info-modal').empty();
    $('#pokemon-img').append(`<img class="pokemon-imagen pokemon-img-modal" src="${pokemonImg}">`);
    $('#pokemon-nombre').append(`<p><strong>${data.name}</strong></p>`);
    $('#pokemon-peso').append(`<p> ${pokemonWeight}</p>`);
    $('#pokemon-numero').append(`<p> ${pokemonNumber}</p>`);
    $('#pokemon-habilidades').append(`<p> ${pokemonAbbilities}, ${pokemonAbbilities1}</p>`);
    document.getElementById("info").style.display="block";
  

    var estad__pokemon = data.stats;

    for(var i = 0; i < estad__pokemon.length; i++) {
      estad__pokemon[i].label = estad__pokemon[i]['stat'].name;
      estad__pokemon[i].y     = estad__pokemon[i]['base_stat'];
     
    }

    var datos = {	
    	
    theme:'light1',	
    
    width:420,
    height:350,
     animationEnabled: true,
    
     backgroundColor: "transparent",
     title: {
       text: "STATS BASE",
       
     },
     
     axisY: {
       title: "Value",
       includeZero: false
     },
   
     axisX: {
       title: "Stats"
     },
    
     data: [{
       type: "pie",
       dataPoints: estad__pokemon
     }]	};
     
     
     $(".graficos").CanvasJSChart(datos);

  }
 

  function error() {
    alert('Lo sentimos, ha ocurrido un error :(');
  }
});

function mostrarGrafico(){
  document.getElementById("graficos").style.display="block"; 
}
function cerrarGrafico(){
  document.getElementById("graficos").style.display="none"; 
  // document.getElementById("info").style.display="none";
}