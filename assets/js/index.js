$(document).ready(function(){
    $("#pokeImagen").attr('src', './assets/img/pokebola.png')
});

$("#bigbluebutton").click(function(){
  let pokemon = $("#pokemon").val();
  searchPokemon(pokemon);
});

function searchPokemon(nombrePokemon){
    $.ajax({
        type:"GET",
        url: `https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`,
        success: function(data) {
            let speed = data.stats[5].base_stat;
            let special_defense = data.stats[4].base_stat;
            let special_attack = data.stats[3].base_stat;
            let defense = data.stats[2].base_stat;
            let attack = data.stats[1].base_stat;
            let hp = data.stats[0].base_stat;

            $("#stats").html(`
                <p>Name: <strong>${data.name}</strong></p>
                ${data.types[1] == null ? `<p>Type: <strong>${data.types[0].type.name}</strong></p>` : `<p>Type (Principal): <strong>${data.types[0].type.name}</strong></p>`}
                ${data.types[1] == null ? " " : `<p>Type (Secondary): <strong>${data.types[1].type.name}</strong></p>`}
                <p>Weight: <strong>${data.weight}</strong> lbs.</p>
                <p>Height: <strong>${data.height}</strong></p>
                ${data.abilities[1]==null ? `<p>Ability: <strong>${data.abilities[0].ability.name}</strong></p>` : `<p>Ability(1): <strong>${data.abilities[0].ability.name}</strong></p>`} 
                ${data.abilities[1]==null ? "" : `<p>Ability(2): <strong>${data.abilities[1].ability.name}</strong></p>`} 
            `);
            
            $("#pokeImagen").attr('src', data.sprites.other["official-artwork"].front_default);
            graphics(speed, special_defense, special_attack, defense, attack, hp);
        }
    })
}

function graphics(speed, special_defense, special_attack, defense, attack, hp){
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        exportEnabled: true,
        theme: "dark2", // "light1", "light2", "dark1", "dark2"
        title:{
            text: "Pokémon Stats"
        },
          axisY: {
          includeZero: true
        },
        data: [{
            type: "column", //change type to bar, line, area, pie, etc
            //indexLabel: "{y}", //Shows y value on all Data Points
            indexLabelFontColor: "#5A5757",
            indexLabelFontSize: 16,
            indexLabelPlacement: "outside",
            dataPoints: [
                {y: speed, label: "speed" },
                {y: special_defense, label: "sp-defense" },
                {y: special_attack, label: "sp-attack" },
                {y: defense, label: "defense" },
                {y: attack, label: "attack" },
                {y: hp, label: "hp" },
            ]
        }]
    });
    chart.render();
    
}