console.log("testMappa RICERCA 2");



//  DATI MAPBOX DI VINCENZO
// var accessToken = "pk.eyJ1IjoibmFwczg3ODciLCJhIjoiY2pzeDl6amNpMG54cjRhcHZzZ3N1YmNjdSJ9.xnR59NbLRulUpFIoL3JvXg";
// var styleUrl = "mapbox://styles/naps8787/cjvdsrgnj009j1gt5rqs4v4xh?optimize=true";
//
// var layerUrlRoma =    "mapbox://naps8787.2s7284jl";
// var layerSourceRoma = "ZoneRoma2-1y9sto";
//
// var layerUrlComuni =    "mapbox://naps8787.8hc5ih07";
// var layerSourceComuni = "COMUNI-ITALIA-25oe5m";
//
// var layerUrlProvince =    "mapbox://naps8787.af20f49v";
// var layerSourceProvince = "PROVINCE-ITALIA-8i199w";

//DATI MAPBOX DI PP2
var accessToken = "pk.eyJ1IjoicG9ydGFwb3J0ZXNlIiwiYSI6ImNrM3Bvcmg5dTAycXQzYnByY2F6NWhlZ2MifQ.uWcbB067WxTamxteX3e8pw";
var styleUrl = "mapbox://styles/portaportese/ck3q5d2cw140a1cpd87tp5v9r";

var layerUrlRoma =    "mapbox://portaportese.8y3y0els";
var layerSourceRoma = "zoneRomaPP2-8md1l5";

var layerUrlComuni =    "mapbox://portaportese.axolxk4t";
var layerSourceComuni = "COMUNI-ITALIA-6prgmd";

var layerUrlProvince =    "mapbox://portaportese.deedb9nr";
var layerSourceProvince = "PROVINCE-ITALIA-2ml3bg";




function clearHover(zoneRoma, comuni, province) { //deseleziono tutti i bordi e poligoni
    if (zoneRoma == "zone-roma") {
        for (var i = 0; i < 156; i++) {
            mapRicerca.setFeatureState({source: 'zone-roma', sourceLayer: layerSourceRoma, id: i}, {hover: false});
        }
    }
    if (comuni == "comuni") {
        for (var i = 0; i < 8000; i++) {
            mapRicerca.setFeatureState({source: 'comuni-layer', sourceLayer: layerSourceComuni, id: i}, {hover: false});
        }
    }
    if (province == "province") {
        for (var i = 0; i < 111; i++) {
            mapRicerca.setFeatureState({source: 'province-layer', sourceLayer: layerSourceProvince, id: i}, {hover: false});
        }
    }
}


$( document ).ready(function() {







    // modal ricerca mappa
    $('.md-trigger').on('click', function() {
        $('.md-modal').addClass('md-show');
    });

    $('.md-close').on('click', function(e) {
        e.preventDefault();

        $('.md-modal').removeClass('md-show');
        $("body").css("overflow", "auto");
        $("#provinceComuni").val("");
        $("#provinceComuni").trigger("chosen:updated");
        $("#provinceComuni").trigger("change");

        $("#zoneRoma").val([]);
        $("#zoneRoma").trigger("chosen:updated");
        $("#zoneRoma").trigger("change");
    });

    $('.conferma-ricerca').on('click', function() {
        $('.md-modal').removeClass('md-show');
        $("body").css("overflow", "auto");
        //$(".main-search-submit").trigger("click");
    });

    $( window ).resize(function() {
        $("#mapRicerca2").css("height",$(".md-overlay").height() + "px");
        mapRicerca.resize();
    });
    $( window ).trigger("resize");




    //gestione risultati di ricerca dopo x caratteri digitati
    $(".chosen-container-multi .chosen-search-input").on("focusin", function (e) {
        if ($("#zoneRoma").val() == "") {
            $("#provinceComuni").val("6915");
            $("#provinceComuni").trigger("chosen:updated");
            $("#provinceComuni").trigger("change");
        }
    });

    $(".chosen-container-multi .chosen-search-input").on("focusout", function (e) {
        console.log("focus out");

        setTimeout(function() {
                if ($("#zoneRoma").val() == "") {
                    $("#provinceComuni").val("");
                    $("#provinceComuni").trigger("chosen:updated");
                    $("#provinceComuni").trigger("change");

                    mapRicerca.setZoom(10);
                }
        }, 200);


    });

    // $(".chosen-container-multi .chosen-search-input").on("keyup", function (e) {
    //     var charCount = $(this).val().replace(/\s/g, '').length;
    //     //console.log(charCount);
    //     if (charCount >= 2) {
    //         $(this).parent().parent().parent().addClass("chosen-with-drop");
    //         $(this).parent().parent().parent().addClass("chosen-container-active");
    //     } else {
    //         $(this).parent().parent().parent().removeClass("chosen-with-drop");
    //         $(this).parent().parent().parent().removeClass("chosen-container-active");
    //     }
    // });








});


function first(p) {
    for (var i in p) return p[i];
}




mapboxgl.accessToken = accessToken;
var mapRicerca = new mapboxgl.Map({
    container: 'mapRicerca2',
    style: styleUrl, //basic new
    //style: 'mapbox://styles/naps8787/cjvp83oor12ru1clb3f75zkje', //light
    center: [12.506329, 41.897921],
    zoom: 10.0,
    minZoom: 6,
    maxZoom: 15
});


var navigationControl = new mapboxgl.NavigationControl();
mapRicerca.addControl(navigationControl, 'bottom-right');



mapRicerca.on('load', function () {
    //################################# LAYER #################################

    mapRicerca.addLayer({ //########### Province
        'id': 'province-layer',
        'type': 'fill',
        'source': {
            'type': 'vector',
            'url': layerUrlProvince //  Mapbox tileset Map ID
        },
        'source-layer': layerSourceProvince, // name of tilesets
        'paint': {
            'fill-color': ["case", ["boolean", ["feature-state", "hover"], false], "#5898FF",
                ["boolean", ["feature-state", "selezionato"], false], "#5699FF",
                'transparent'],
            //'fill-outline-color': '#000000',
            "fill-opacity": ["case", ["boolean", ["feature-state", "hover"], false], 0.65,
                ["boolean", ["feature-state", "selezionato"], false], 0.35,
                1]
        }
    });
    mapRicerca.addLayer({ //########### Comuni
        'id': 'comuni-layer',
        'type': 'fill',
        'source': {
            'type': 'vector',
            'url': layerUrlComuni //  Mapbox tileset Map ID
        },
        'source-layer': layerSourceComuni, // name of tilesets
        'paint': {
            'fill-color': ["case", ["boolean", ["feature-state", "hover"], false], "#5898FF",
                                   ["boolean", ["feature-state", "selezionato"], false], "#5699FF",
                'transparent'],
            //'fill-outline-color': '#000000',
            "fill-opacity": ["case", ["boolean", ["feature-state", "hover"], false], 0.65,
                                     ["boolean", ["feature-state", "selezionato"], false], 0.35,
                                      1]
        }
    });
    mapRicerca.addLayer({//########### Zone
        'id': 'zone-roma',
        'type': 'fill',
        'source': {
            'type': 'vector',
            'url': layerUrlRoma //  Mapbox tileset Map ID
        },
        'source-layer': layerSourceRoma, // name of tilesets
        'paint': {
            'fill-color': ["case", ["boolean", ["feature-state", "hover"], false], "#5898FF",
                ["boolean", ["feature-state", "selezionato"], false], "#5699FF",
                ["boolean", ["feature-state", "evidenziato"], false], "rgba(228, 237, 255, 0.4)",
                'transparent'],
            //'fill-outline-color': '#000000',
            "fill-opacity": ["case", ["boolean", ["feature-state", "hover"], false], 0.65,
                ["boolean", ["feature-state", "selezionato"], false], 0.35,
                1]
        }
    });


    //################################# LAYER BORDI #################################
    mapRicerca.addLayer({
        'id': 'province-layer-bordi',
        'type': 'line',
        'source': {
            'type': 'vector',
            'url': layerUrlProvince //  Mapbox tileset Map ID
        },
        'source-layer': layerSourceProvince, // name of tilesets
        'paint': {
            'line-width': ["case", ["boolean", ["feature-state", "selezionato"], false], 4, 2],
            'line-color': ["case", ["boolean", ["feature-state", "selezionato"], false], "#95a1b4", "#a1adb3"],
        }
    });
    mapRicerca.addLayer({
        'id': 'comuni-layer-bordi',
        'type': 'line',
        'source': {
            'type': 'vector',
            'url': layerUrlComuni //  Mapbox tileset Map ID
        },
        'source-layer': layerSourceComuni, // name of tilesets
        'paint': {
            'line-width': ["case", ["boolean", ["feature-state", "selezionato"], false], 4, 2],
            'line-color': ["case", ["boolean", ["feature-state", "selezionato"], false], "#95a1b4", "#a1adb3"],
            //'line-color': '#a1adb3',
        }
    });
    mapRicerca.addLayer({
        'id': 'zone-roma-bordi',
        'type': 'line',
        'source': {
            'type': 'vector',
            'url': layerUrlRoma //  Mapbox tileset Map ID
        },
        'source-layer': layerSourceRoma, // name of tilesets
        'paint': {
            'line-width': ["case", ["boolean", ["feature-state", "selezionato"], false], 4,
                ["boolean", ["feature-state", "nascosto"], false], 0, 2],
            'line-color': ["case", ["boolean", ["feature-state", "selezionato"], false], "#95a1b4", "#a1adb3"],
        }
    });




    $("#provinceComuni").on('change', function () {
        var localitaId = $(this).val();

        // if (localitaId == "" && ($("#zoneRoma").val() == "" || $("#zoneRoma").length == 0)) {
        //     $(".conferma-ricerca").addClass("d-none");
        // } else {
        //     $(".conferma-ricerca").removeClass("d-none");
        // }

        arraySelezionati = [];
        arraySelezionatiZone = [];
        arrayZoneSelezionatiLabel = [];

        if (localitaId == "") {
            clearSelezioni("zone-roma", "comuni", "province");
            mapRicerca.easeTo({
                zoom: 8
            });
            $(".divZoneRoma #zoneRoma").val([]);
            $(".divZoneRoma #zoneRoma").trigger("chosen:updated");
            //$(".divZoneRoma").hide();

            $('#doveZone').val("");
            $('#doveComuni').val("");
            $('#doveProvince').val("");


            $("#dove").attr("placeholder", "Dove??");

            return;
        }


        var localita = $("#provinceComuni option[value=" + localitaId + "]");
        var localitaTipo = localita.attr("data-tipo");
        var localitaLat =  localita.attr("data-lat");
        var localitaLng =  localita.attr("data-lng");
        var localitaShape =  localitaId;
        var zoom;

        if (localitaTipo == "provincia") {
            localitaShape = localita.attr("data-shape");
        }


        if (localitaId == 6915) { //se abbiamo selezioanto Roma (comune)
            //$(".divZoneRoma").show();
        } else {
            $(".divZoneRoma #zoneRoma").val([]);
            $(".divZoneRoma #zoneRoma").trigger("chosen:updated");
            //$(".divZoneRoma").hide();

            $('#doveZone').val("");
        }

        console.log(localitaTipo + " " + localitaId);



        clearSelezioni("zone-roma", "comuni", "province");
        if (localitaTipo == "provincia") {
            mapRicerca.setFeatureState({source: 'province-layer', sourceLayer: layerSourceProvince, id: localitaShape}, { selezionato: true});
            zoom = 8;
            //$('#doveZone').val("");
            $('#doveComuni').val("");
            $('#doveProvince').val(localitaId);
        } else {
            mapRicerca.setFeatureState({source: 'comuni-layer', sourceLayer: layerSourceComuni, id: localitaId}, {selezionato: true});
            zoom = 10;
            //$('#doveZone').val("");
            $('#doveComuni').val(localitaId);
            $('#doveProvince').val("");
        }

        console.log("zoom: " + zoom);
        console.log("localitaId: " + localitaId);


        $("#dove").attr("placeholder", localita.html());


        mapRicerca.easeTo({
            center: [localitaLat, localitaLng],
            zoom: zoom
        });
    });


    $(".divZoneRoma #zoneRoma").on('change', function () {
        var zoneVal = $(this).val();

        arraySelezionati = [];
        arraySelezionatiZone = [];
        arrayZoneSelezionatiLabel = [];

        console.log("zoneVall");
        console.log(zoneVal);
        console.log(zoneVal.length);
        if (zoneVal == "" || zoneVal.length == 0) {
            clearSelezioni("zone-roma", "comuni", "province");

            //mapRicerca.setFeatureState({source: 'comuni-layer', sourceLayer: layerSourceComuni, id: 6915}, {selezionato: true});

            $('#provinceComuni').val("");
            $("#provinceComuni").trigger("chosen:updated");
            $('#doveZone').val("");
            $("#doveZone").trigger("chosen:updated");

            $("#dove").attr("placeholder", "Dove??");

            mapRicerca.easeTo({
                zoom: 10
            });

        } else {
            console.log("zoneVal");
            console.log(zoneVal);

            $('#provinceComuni').val(6915);
            $("#provinceComuni").trigger("chosen:updated");

            var localita = $(".divZoneRoma #zoneRoma option[value=" + zoneVal[zoneVal.length - 1] + "]");
            var localitaLat =  localita.attr("data-lat");
            var localitaLng =  localita.attr("data-lng");

            clearSelezioni("zone-roma", "comuni", "province");
            mapRicerca.setFeatureState({source: 'comuni-layer-bordi', sourceLayer: layerSourceComuni, id: 6915}, {selezionato: true});

            for (k in zoneVal) {
                arraySelezionati[zoneVal[k]] = {"id" : parseInt(zoneVal[k]), "source": "zone-roma", "sourceLayer":layerSourceRoma, "state": {"selezionato": false}};
                arraySelezionatiZone.push(parseInt(zoneVal[k]));
                mapRicerca.setFeatureState({source: 'zone-roma', sourceLayer: layerSourceRoma, id: zoneVal[k]}, { selezionato: true});
                mapRicerca.setFeatureState({source: 'zone-roma-bordi', sourceLayer: layerSourceRoma, id: zoneVal[k]}, { selezionato: true});

                var label = $("#zoneRoma option[value=" + zoneVal[k] + "]").html();
                arrayZoneSelezionatiLabel.push(label);
                console.log(arrayZoneSelezionatiLabel);

            }


            if (arrayZoneSelezionatiLabel.length > 0) {
                if (arrayZoneSelezionatiLabel.length == 1) {
                    $("#dove").attr("placeholder",  "Roma: " + arrayZoneSelezionatiLabel[0]);
                } else {
                    $("#dove").attr("placeholder", "Roma: " + arrayZoneSelezionatiLabel.length + " zone selezionate");
                }
            } else {
                $("#dove").attr("placeholder", "Dove??");
            }


            $('#doveZone').val(JSON.stringify(arraySelezionatiZone));

            //$('#doveComuni').val("");
            $('#doveProvince').val("");

            mapRicerca.easeTo({
                center: [localitaLat, localitaLng],
                zoom: 11
            });
        }

    });







    //#### PRE-SELEZIONE RICERCA
    var doveZone = ($("#doveZone").val() != "") ? JSON.parse($("#doveZone").val()) : "";
    var doveComuni = $("#doveComuni").val();
    var doveProvince = $("#doveProvince").val();
    console.log("doveZone"+doveZone);
    console.log("doveComuni"+doveComuni);
    console.log("doveProvince"+doveProvince);


    if (doveZone != "") {
        $("#zoneRoma").val(doveZone);
        $("#zoneRoma").trigger("chosen:updated");
        $("#zoneRoma").trigger("change");
        $(".divZoneRoma").show();
    } else if (doveComuni != "") {
        $("#provinceComuni").val(doveComuni);
        $("#provinceComuni").trigger("chosen:updated");
        $("#provinceComuni").trigger("change");
        console.log("e quindi?");
    } else if (doveProvince != "") {
        $("#provinceComuni").val(doveProvince);
        $("#provinceComuni").trigger("chosen:updated");
        $("#provinceComuni").trigger("change");
    }



    //############################################## GESTIONE CLICK ############################################

    function popolaPoligoni(arraySelezionati) {
        for (pol in arraySelezionati) {
            var statoPoligonoSelezione = arraySelezionati[pol].state.selezionato;

            //console.log("prima"); console.log(statoPoligonoSelezione)
            if (statoPoligonoSelezione != 'undefined' && statoPoligonoSelezione == true) {
                mapRicerca.setFeatureState({source: arraySelezionati[pol].source, sourceLayer: arraySelezionati[pol].sourceLayer, id: arraySelezionati[pol].id}, {selezionato: false});
                mapRicerca.setFeatureState({source: arraySelezionati[pol].source + "-bordi", sourceLayer: arraySelezionati[pol].sourceLayer, id: arraySelezionati[pol].id}, {selezionato: false});
            } else {
                mapRicerca.setFeatureState({source: arraySelezionati[pol].source, sourceLayer: arraySelezionati[pol].sourceLayer, id: arraySelezionati[pol].id}, {selezionato: true});
                mapRicerca.setFeatureState({source: arraySelezionati[pol].source + "-bordi", sourceLayer: arraySelezionati[pol].sourceLayer, id: arraySelezionati[pol].id}, {selezionato: true});
            }
        }
    }
    function clearSelezioni(zoneRoma, comuni, province) { //deseleziono tutti i bordi e poligoni
        if (zoneRoma == "zone-roma") {
            for (var i = 0; i < 156; i++) {
                mapRicerca.setFeatureState({source: 'zone-roma', sourceLayer: layerSourceRoma, id: i}, {selezionato: false});
                mapRicerca.setFeatureState({source: 'zone-roma-bordi', sourceLayer: layerSourceRoma, id: i}, {selezionato: false});
            }
        }
        if (comuni == "comuni") {
            for (var i = 0; i < 8000; i++) {
                mapRicerca.setFeatureState({source: 'comuni-layer', sourceLayer: layerSourceComuni, id: i}, {selezionato: false});
                mapRicerca.setFeatureState({source: 'comuni-layer-bordi', sourceLayer: layerSourceComuni, id: i}, {selezionato: false});
            }
        }
        if (province == "province") {
            for (var i = 0; i < 111; i++) {
                mapRicerca.setFeatureState({source: 'province-layer', sourceLayer: layerSourceProvince, id: i}, {selezionato: false});
                mapRicerca.setFeatureState({source: 'province-layer-bordi', sourceLayer: layerSourceProvince, id: i}, {selezionato: false});
            }
        }
    }



    var arraySelezionati = [];
    var arrayZoneSelezionatiLabel = [];
    var arraySelezionatiZone = [];

    mapRicerca.on('click', function(e) {
        var f = mapRicerca.queryRenderedFeatures(e.point, { layers: ['province-layer','comuni-layer','zone-roma'] });
        var tipo = "";
        var effeID = "";
        arraySelezionatiZone = [];
        if (f.length) {
            console.log(f);
            if (f[0].source == "zone-roma") {
                tipo = "zone-roma";
                effeID = f[0].id;
                //effeID = f[0].properties.id;
                console.log("f[0].properties.id " + f[0].properties.id);
            } else if (f[0].source == "comuni-layer") {
                tipo = "comune";
                effeID = f[0].id;
                //effeID = f[0].properties.id;
            } else {
                tipo = "provincia";
                effeID = f[0].properties.cod_prov;
            }


            if (f[0].source == tipo) { //zone-roma
                clearSelezioni("", "comuni", "province");

                $("#provinceComuni").val("6915");
                $("#provinceComuni").trigger("chosen:updated");
                mapRicerca.setFeatureState({source: 'comuni-layer', sourceLayer: layerSourceComuni, id: 6915}, { selezionato: false});
                mapRicerca.setFeatureState({source: 'comuni-layer-bordi', sourceLayer: layerSourceComuni, id: 6915}, { selezionato: true});

                //$(".divZoneRoma").show();

                delete arraySelezionati[6915];

                if (arraySelezionati[effeID] != undefined) {
                    delete arraySelezionati[effeID];
                    //delete arrayZoneSelezionatiLabel[f[0].properties.name]; //sbagliato

                    arrayZoneSelezionatiLabel.splice($.inArray(f[0].properties.name, arrayZoneSelezionatiLabel), 1);
                    //arrayZoneSelezionatiLabel.splice(arrayZoneSelezionatiLabel.indexOf(f[0].properties.name), 1);

                    mapRicerca.setFeatureState({source: 'zone-roma', sourceLayer: layerSourceRoma, id: effeID}, { selezionato: false});
                    mapRicerca.setFeatureState({source: 'zone-roma-bordi', sourceLayer: layerSourceRoma, id: effeID}, { selezionato: false});

                    //azzeriamo Roma perchè non ci sono zone selezionate
                    console.log("arrayZoneSelezionatiLabel length");
                    console.log(arrayZoneSelezionatiLabel);
                    if (arrayZoneSelezionatiLabel.length == 0) {
                        $("#provinceComuni").val("");
                        $("#provinceComuni").trigger("chosen:updated");
                        $("#provinceComuni").trigger("change");

                        mapRicerca.setZoom(10);
                    }
                } else {
                    arraySelezionati[effeID] = f[0];
                    arrayZoneSelezionatiLabel.push(f[0].properties.name);
                }

                popolaPoligoni(arraySelezionati);

                console.log("arrayZoneSelezionatiLabel");
                console.log(arrayZoneSelezionatiLabel);


                //popola input
                $("#zoneRoma option").prop("selected", false);
                for ( item in  arraySelezionati) {
                    console.log(arraySelezionati[item].id);
                    arraySelezionatiZone.push(arraySelezionati[item].id);
                    $("#zoneRoma option[value=" + arraySelezionati[item].id + "]").prop("selected", true);
                }
                $(".divZoneRoma #zoneRoma").trigger("chosen:updated");




                if (arrayZoneSelezionatiLabel.length > 0) {
                    if (arrayZoneSelezionatiLabel.length == 1) {
                        $("#dove").attr("placeholder", "Roma: " + arrayZoneSelezionatiLabel[0]);
                    } else {
                        $("#dove").attr("placeholder", "Roma: " + arrayZoneSelezionatiLabel.length + " zone selezionate");
                    }
                } else {
                    $("#dove").attr("placeholder", "Dove??");
                }

                if (arraySelezionatiZone.length > 0) {
                    $('#doveZone').val(JSON.stringify(arraySelezionatiZone));
                } else {
                    $('#doveZone').val("");
                }
                $('#doveComuni').val(6915);
                $('#doveProvince').val("");


            } else {
                clearSelezioni("zone-roma", "comuni", "province");
                console.log("comune o provincia");
                $(".divZoneRoma #zoneRoma").val([]);
                $(".divZoneRoma #zoneRoma").trigger("chosen:updated");
                //$(".divZoneRoma").hide();


                // if (effeID == 6915) {
                //     //$(".divZoneRoma").show();
                //     mapRicerca.setFeatureState({source: 'comuni-layer', sourceLayer: 'COMUNI-ITALIA-25oe5m', id: 6915}, { selezionato: true});
                //     mapRicerca.setFeatureState({source: 'comuni-layer-bordi', sourceLayer: 'COMUNI-ITALIA-25oe5m', id: 6915}, { selezionato: true});
                //     $("#provinceComuni").val("6915");
                //     $("#provinceComuni").trigger("chosen:updated");
                //
                //     arraySelezionati = [];
                //     arraySelezionati[effeID] = f[0];
                //
                //     $('#doveZone').val("");
                //     $('#doveComuni').val(6915);
                //     $("#dove").attr("placeholder", $("#provinceComuni option[value=" + 6915 + "]").html()); // ROMA
                //
                // } else {
                    arraySelezionati = [];
                    arraySelezionati[effeID] = f[0];

                    popolaPoligoni(arraySelezionati);
                    arraySelezionati = [];

                    arraySelezionatiZone = [];
                    arrayZoneSelezionatiLabel = [];

                    //popola campi per la ricerca in query
                    if (tipo == "comune") {// comuni
                        $('#doveComuni').val([effeID]);
                        $('#doveProvince').val("");
                    }
                    if (tipo == "provincia") { //province
                        $('#doveComuni').val("");
                        $('#doveProvince').val([effeID]);
                    }

                    console.log($("#provinceComuni").val() + " -- " + effeID);
                    var statiCorrenti = mapRicerca.getFeatureState({source: f[0].source, sourceLayer: f[0].sourceLayer, id: f[0].id});
                    console.log(statiCorrenti.selezionato);


                    //popola input
                    if ($("#provinceComuni").val() != effeID) {
                        console.log("aaa");
                        $("#provinceComuni option[value=" + effeID + "][data-tipo='" + tipo + "']").prop("selected", true);
                        $("#provinceComuni").trigger("chosen:updated");

                        $("#dove").attr("placeholder", $("#provinceComuni option[value=" + effeID + "]").html());
                    } else {
                        console.log("bbb");
                        if (effeID != 6915) {
                            $("#provinceComuni").val("");
                            $("#provinceComuni").trigger("chosen:updated");

                            $('#doveComuni').val("");
                            $('#doveProvince').val("");

                            $("#dove").attr("placeholder", "Dove??");
                        } else {
                            $('#doveZone').val("");
                            $("#dove").attr("placeholder", "Roma");

                            if (statiCorrenti.selezionato == false) {
                                $("#provinceComuni").val("");
                                $("#provinceComuni").trigger("chosen:updated");

                                $('#doveComuni').val("");
                                $('#doveProvince').val("");
                                $("#dove").attr("placeholder", "Dove??");
                            }
                        }

                    }


                //}

                gestisciLayerByZoom("");
            }
        }
    });





    //############################################## GESTIONE HOVER ############################################

    // Create a popup, but don't add it to the map yet.
    var popup = new mapboxgl.Popup({
        closeButton: false,
        anchor: 'top',
        className: 'mapbox-popups'
    });

    var poligoniHover = [];
    mapRicerca.on('mousemove', function(e) {
        var f = mapRicerca.queryRenderedFeatures(e.point, {layers: ['province-layer', 'comuni-layer', 'zone-roma']});


        if (f.length) {
            mapRicerca.setFeatureState({source: f[0].source, sourceLayer: f[0].sourceLayer, id: f[0].id}, {hover: true});

            poligoniHover[f[0].id] = f[0].id;
            for (p in poligoniHover) {
                mapRicerca.setFeatureState({source: 'zone-roma', sourceLayer: layerSourceRoma, id: poligoniHover[p]}, { hover: false});
                mapRicerca.setFeatureState({source: 'comuni-layer', sourceLayer: layerSourceComuni, id: poligoniHover[p]}, { hover: false});
                mapRicerca.setFeatureState({source: 'province-layer', sourceLayer: layerSourceProvince, id: poligoniHover[p]}, { hover: false});
            }

            //var statiCorrenti = mapRicerca.getFeatureState({source: f[0].source, sourceLayer: f[0].sourceLayer, id: f[0].id});

            mapRicerca.setFeatureState({source: f[0].source, sourceLayer: f[0].sourceLayer, id: f[0].id}, {hover: true});
        } else {
            for (p in poligoniHover) {
                mapRicerca.setFeatureState({source: 'zone-roma', sourceLayer: layerSourceRoma, id: poligoniHover[p]}, { hover: false});
                mapRicerca.setFeatureState({source: 'comuni-layer', sourceLayer: layerSourceComuni, id: poligoniHover[p]}, { hover: false});
                mapRicerca.setFeatureState({source: 'province-layer', sourceLayer: layerSourceProvince, id: poligoniHover[p]}, { hover: false});
            }


        }

        //console.log(f[0]);


        var testoPopup = "-";
        var offsetPopup = 0;
        var lowerLat = 0;
        if (f[0] != undefined) {
            if (f[0].properties.name != undefined) {
                testoPopup = f[0].properties.name;
                offsetPopup = 0.003;
                lowerLat = f[0].properties.lowerlat;
            }
            if (f[0].properties.comune != undefined) {
                testoPopup = f[0].properties.comune;
                offsetPopup = 0.01;
                lowerLat = f[0].properties.lowerLat;
            }
            if (f[0].properties.den_uts != undefined) {
                testoPopup = f[0].properties.den_uts;
                offsetPopup = 0.01;
                lowerLat = f[0].properties.lowerLat;
            }
            // Display a popup with the name of the county
            //popup.setLngLat([f[0].properties.lat, (f[0].properties.lng - offsetPopup)])
            popup.setLngLat([f[0].properties.lat, lowerLat])
                .setHTML('<span style="text-transform:uppercase;font-family: Verdana;line-height: normal">' + testoPopup + '</span>')
                .addTo(mapRicerca);
        } else {
            popup.remove();
        }
    });





    //################################# ZOOM #################################

    function gestisciLayerByZoom(arraySelezionati) {
        var currentZoom = mapRicerca.getZoom();
        if (currentZoom > 0 && currentZoom <= 8) {
            //mapRicerca.setLayoutProperty("zone-roma", 'visibility', 'none');
            //mapRicerca.setLayoutProperty("zone-roma-bordi", 'visibility', 'none');
            mapRicerca.setLayoutProperty("comuni-layer", 'visibility', 'none');
            mapRicerca.setLayoutProperty("comuni-layer-bordi", 'visibility', 'none');
            mapRicerca.setLayoutProperty("province-layer", 'visibility', 'visible');
            mapRicerca.setLayoutProperty("province-layer-bordi", 'visibility', 'visible');

            //fix bug selezione appesa in cambio zoom/layer
            for (i = 0; i < 156; i++) {
                mapRicerca.setFeatureState({source: 'zone-roma', sourceLayer: layerSourceRoma, id: i}, { hover: false});
            }
            for (i = 0; i < 8000; i++) {
                mapRicerca.setFeatureState({source: 'comuni-layer', sourceLayer: layerSourceComuni, id: i}, { hover: false});
            }
        }

        if (currentZoom > 8 && currentZoom <= 9) {
            //mapRicerca.setLayoutProperty("zone-roma", 'visibility', 'none');
            //mapRicerca.setLayoutProperty("zone-roma-bordi", 'visibility', 'none');
            mapRicerca.setLayoutProperty("comuni-layer", 'visibility', 'visible');
            mapRicerca.setLayoutProperty("comuni-layer-bordi", 'visibility', 'visible');
            mapRicerca.setLayoutProperty("province-layer", 'visibility', 'none');
            mapRicerca.setLayoutProperty("province-layer-bordi", 'visibility', 'none');

            mapRicerca.moveLayer("zone-roma", "province-layer");
            //console.log(arraySelezionati);
            for (var i = 0; i < 156; i++) {
                if (arraySelezionati == "" || arraySelezionati[i] === undefined) {
                    mapRicerca.setFeatureState({source: 'zone-roma', sourceLayer: layerSourceRoma, id: i}, { nascosto: true});
                    mapRicerca.setFeatureState({source: 'zone-roma-bordi', sourceLayer: layerSourceRoma, id: i}, { nascosto: true});
                }
            }

            //fix bug selezione appesa in cambio zoom/layer
            for (i = 0; i < 111; i++) {
                mapRicerca.setFeatureState({source: 'province-layer', sourceLayer: layerSourceProvince, id: i}, { hover: false});
            }
            for (i = 0; i < 156; i++) {
                mapRicerca.setFeatureState({source: 'zone-roma', sourceLayer: layerSourceRoma, id: i}, { hover: false});
            }
        }

        if (currentZoom > 9 && currentZoom <= 22) {
            var currentCategory = $("#category-filter option:selected").parent().attr("label");
            console.log("categoria: " + currentCategory);

            if (currentCategory == "Immobiliare") {
                mapRicerca.setLayoutProperty("zone-roma", 'visibility', 'visible');
                mapRicerca.setLayoutProperty("zone-roma-bordi", 'visibility', 'visible');
            }
            mapRicerca.setLayoutProperty("comuni-layer", 'visibility', 'visible');
            mapRicerca.setLayoutProperty("comuni-layer-bordi", 'visibility', 'visible');
            mapRicerca.setLayoutProperty("province-layer", 'visibility', 'none');
            mapRicerca.setLayoutProperty("province-layer-bordi", 'visibility', 'none');

            //mapRicerca.moveLayer("zone-roma", "comuni-layer"); //sposta zone-roma prima di comuni-layer
            mapRicerca.moveLayer("zone-roma");
            for (var i = 0; i < 156; i++) {
                if (arraySelezionati[i] === undefined) {
                    mapRicerca.setFeatureState({source: 'zone-roma', sourceLayer: layerSourceRoma, id: i}, { nascosto: false});
                    mapRicerca.setFeatureState({source: 'zone-roma-bordi', sourceLayer: layerSourceRoma, id: i}, { nascosto: false});
                }
            }

            //fix bug selezione appesa in cambio zoom/layer
            for (i = 0; i < 111; i++) {
                mapRicerca.setFeatureState({source: 'province-layer', sourceLayer: layerSourceProvince, id: i}, { hover: false});
            }
            for (i = 0; i < 8000; i++) {
                mapRicerca.setFeatureState({source: 'comuni-layer', sourceLayer: layerSourceComuni, id: i}, { hover: false});
            }
        }
    }


    mapRicerca.on('zoom', function () {
        $(".zoom").html(mapRicerca.getZoom());

        gestisciLayerByZoom(arraySelezionati);
    });






    //####### FIX BUG ZOOM PROGRESSIVO
    mapRicerca.scrollZoom.disable();

    /* The flag that determines whether the wheel event is supported. */
    var supportsWheel = false;
    /* The function that will run when the events are triggered. */
    function DoSomething (e) {
        /* Check whether the wheel event is supported. */
        if (e.type == "wheel") supportsWheel = true;
        else if (supportsWheel) return;

        /* Determine the direction of the scroll (< 0 → up, > 0 → down). */
        var delta = ((e.deltaY || -e.wheelDelta || e.detail) >> 10) || 1;

        if (delta == 1) {
            scrollZoomMap('down')
        } else {
            scrollZoomMap('up')
        }
    }

    /* Add the event listeners for each event. */
    document.getElementById("mapRicerca2").addEventListener('wheel', DoSomething);
    document.getElementById("mapRicerca2").addEventListener('mousewheel', DoSomething);
    document.getElementById("mapRicerca2").addEventListener('DOMMouseScroll', DoSomething);

    function scrollZoomMap(dir){
        //console.log("dir : " + dir);
        var newZoom = null;
        var debounce;
        var el = mapRicerca; //the mapbox instance.
        latLng = el.getCenter();
        var latitude = latLng["lat"];
        var longitude = latLng["lng"];
        var currentZoom = el.getZoom();
        if (debounce) clearTimeout(debounce);
        debounce = setTimeout(function(){
            debounce = null;
            if(dir == "up"){
                newZoom = currentZoom + 1;
            }else{
                newZoom = currentZoom - 1;
            }
            if( newZoom > 0 && newZoom < 22){
                //console.log("newZoom : " + newZoom);
                //el.setView([latitude, longitude], newZoom);
                mapRicerca.setZoom(newZoom);
            }
        }, 300);
    }
    //scrollZoomMap('up');









    $("#mapRicerca2").on("mouseleave", function (e) {
        console.log("mouseleave out");
        clearHover("zone-roma", "comuni", "province");
        popup.remove();
    });



    var currentCategory = $("#category-filter option:selected").parent().attr("label");
    console.log("categoria: " + currentCategory);

    $(".doveClick").on("click", function (e) {
        //$("#openModalFilterMappa").trigger("click");
        $('.md-modal').addClass('md-show');
        $("body").css("overflow", "hidden");
        $( window ).trigger("resize");


        currentCategory = $("#category-filter option:selected").parent().attr("label");

        if (currentCategory != "Immobiliare") {
            $(".md-modal .nascondiZone").hide();
            mapRicerca.setLayoutProperty("zone-roma", 'visibility', 'none');
            mapRicerca.setLayoutProperty("zone-roma-bordi", 'visibility', 'none');
        } else {
            $(".md-modal .nascondiZone").show();
            mapRicerca.setLayoutProperty("zone-roma", 'visibility', 'visible');
            mapRicerca.setLayoutProperty("zone-roma-bordi", 'visibility', 'visible');
        }

        console.log("apri modal");
        console.log("categoria: " + currentCategory);
    });




});