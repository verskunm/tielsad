/* Formatting function for row details - modify as you need */
//var liveSite = "http://pp2.mister-wolf.it/";
var liveSite = "https://" + window.location.hostname + "/";
//console.log("liveSite = " + liveSite);


function myFunction() {
    //console.log("myFunction");
    return false;
}


function convertToSlug(Text) {
    return Text
        .toLowerCase()
        .replace(/e\/o/g,'eo')
        .replace(/\//g,'-')
        .replace(/ \/ /g,'-')
        //.replace(/[^\w ]+/g,'')
        .replace(/ - +/g,'-')
        .replace(/[^(a-zA-Z0-9_àèìòù éüö\-')]+/g,'')
        .replace(/ +/g,'-')
        .replace(/à+/g,'a')
        .replace(/é+/g,'e')
        .replace(/ü+/g,'u')
        .replace(/ö+/g,'o')
        .replace(/'+/g,'')
        ;
}
function urlencode(str) {
    str = (str + '')
        .toString();
    // Tilde should be allowed unescaped in future versions of PHP (as reflected below), but if you want to reflect current
    // PHP behavior, you would need to add ".replace(/~/g, '%7E');" to the following.
    return encodeURIComponent(str)
        .replace(/!/g, '%21')
        .replace(/'/g, '%27')
        .replace(/\(/g, '%28')
        .
        replace(/\)/g, '%29')
        .replace(/\*/g, '%2A')
        .replace(/%20/g, '+');
}



function affixStep() {
    //blocca gli step dell'annuncio
    var toggleAffix = function(affixElement, scrollElement, wrapper) {
        var height = affixElement.outerHeight(),
            top = wrapper.offset().top;
        if (scrollElement.scrollTop() >= top -15) {
            wrapper.height(height);
            affixElement.addClass("affix");
        }
        else {
            affixElement.removeClass("affix");
            wrapper.height('auto');
        }
    }
    $('[data-toggle="affix"]').each(function() {
        var ele = $(this),
            wrapper = $('<div></div>');
        ele.before(wrapper);
        $(window).on('scroll resize', function() {
            toggleAffix(ele, $(this), wrapper);
        });
        // init
        toggleAffix(ele, $(window), wrapper);
    });

}
function affixEdit() {
    var toggleAffix1 = function (affixElement, scrollElement, wrapper) {

        var height = affixElement.outerHeight(),
            top = wrapper.offset().top;

        if (scrollElement.scrollTop() >= top) {
            wrapper.height(height);
            affixElement.addClass("affix1");
        }
        else {
            affixElement.removeClass("affix1");
            wrapper.height('auto');
        }
    }

    $('[data-toggle="affix1"]').each(function () {
        var ele = $(this),
            wrapper = $('<div></div>');

        ele.before(wrapper);
        $(window).on('scroll resize', function () {
            toggleAffix1(ele, $(this), wrapper);
        });

        // init
        toggleAffix1(ele, $(window), wrapper);
    });
}


function checkMainSearchButton() {
    ////console.log($("#keyword").val());
    ////console.log($("#category-filter").val());
    ////console.log($("#where-filter").val());
    if ($("#keyword").val() == "" && $("#category-filter").val() == "" && $("#where-filter").val() == "") {
        $("#form-main-search").find("button").prop("disabled",true);
    } else {
        $("#form-main-search").find("button").prop("disabled",false);
        $("#form-main-search").addClass('pending');
    }
}

function openWindow( url ){
    window.open(url, '_blank');
    window.focus();
}




$( document ).ready(function() {

    //$.removeCookie('cookiesMessage'); // => true

    $('#accettocockies').on('click', function (event) {
        $("#cookiesMessage").hide();
        $.cookie('cookiesMessage', 'OK', { expires: 30 }); //30 giorni
        console.log("cookie NON DEFINITO, quindi creato.");
    });


    if ($.cookie('cookiesMessage') != undefined) {
        console.log("cookie GIA DEFINITO: " + $.cookie('cookiesMessage'));
        $("#cookiesMessage").hide();
    } else {
        $("#cookiesMessage").show();
        console.log("cookie NON DEFINITO");
    }




    $('#_password, #password').on('focusout', function (event) {
        var term = $(this).val();
        var re = new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$");
        if (re.test(term)) {
            $(".invalidPassword").removeClass("d-block");
            ////console.log("OKKK");
        } else {
            ////console.log("NO OKKK");
            $(".invalidPassword").addClass("d-block");
        }
    });
    $('#_password, #password').on('keyup', function (event) {
        var term = $(this).val();
        if (term.length >= 6) {
            var re = new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$");
            if (re.test(term)) {
                $(".invalidPassword").removeClass("d-block");
                //console.log("OKKK");
            } else {
                //console.log("NO OKKK");
                $(".invalidPassword").addClass("d-block");
            }
        }
    });
    $('#recuperaPassword').on('focusout', function (event) {
        var term = $(this).val();
        var re = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");
        if (re.test(term)) {
            $(".invalidRecuperaPassword").removeClass("d-block");
        } else {
            $(".invalidRecuperaPassword").addClass("d-block");
        }
    });
    $('#recuperaPassword').on('keyup', function (event) {
        var term = $(this).val();
        if (term.length >= 6) {
            var re = new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$");
            if (re.test(term)) {
                $(".invalidRecuperaPassword").removeClass("d-block");
            } else {
                $(".invalidRecuperaPassword").addClass("d-block");
            }
        }
    });
    $('#username').on('focusout', function (event) {
        ////console.log("aaa");
        var term = $(this).val();
        var re = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");
        if (re.test(term)) {
            $(".invalidEmail").removeClass("d-block");
        } else {
            $(".invalidEmail").addClass("d-block");
        }
    });
    $('#username').on('keyup', function (event) {
        var term = $(this).val();
        if (term.length >= 10) {
            var re = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");
            if (re.test(term)) {
                $(".invalidEmail").removeClass("d-block");
            } else {
                $(".invalidEmail").addClass("d-block");
            }
        }
    });


    $('.invia-abb-personalizzato').on('click', function (event) {
        event.preventDefault();

        var id = $("#abbPersonalizzato #id").val();
        var messaggio = $("#abbPersonalizzato #message").val();
        var tipoUtente = $("#abbPersonalizzato #tipoUtente").val();

        var ragioneSociale = $("this").attr("data-ragioneSociale");
        var emailContatto = $("this").attr("data-emailContatto");
        var telefono = $("this").attr("data-telefono");
        var cellulare = $("this").attr("data-cellulare");

        //EMAIL

        if (tipoUtente == "profile") {
            jsonData = JSON.stringify({
                'profile': parseInt(id),
                'profilePro': "",
                'annuncio': "",
                'messaggio': messaggio,
                'tipo': 'abbonamento PaginaPro'
            });
        } else {
            jsonData = JSON.stringify({
                'profile': "",
                'profilePro': parseInt(id),
                'annuncio': "",
                'messaggio': messaggio,
                'tipo': 'abbonamento PaginaPro'
            });
        }

        ////console.log(id);
        ////console.log(jsonData);
        $.ajax({
            url: liveSite + "api/sendEmail",
            data: jsonData,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            type: "POST",
            success: function (data) {
                ////console.log("email messaggio inviata");
                ////console.log(data);

                $("#abbPersonalizzato .modal-body .form-group").hide();
                $("#abbPersonalizzato .modal-body .alert-success").show();
                $("#abbPersonalizzato .invia-abb-personalizzato").hide();

            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                //console.log("Errore ajax invio email messaggio");
                //console.log(errorThrown);
            }
        });
    });

    $('.btn-contattaci').click(function(event) {
        $("#modalPaginaPro").modal("toggle");
    });

    //permette solo caratteri numerici nel prezzo
    $('#prezzo').on('keypress', function (evt) {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false;
        return true;
    });



    $('.clickCreaPagina').click(function(event) {
        //console.log("clickCreaPagina");

        var idUtente = $(this).attr("data-idUtente");

        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;

        //console.log("idUtente: " + idUtente);
        jsonData = JSON.stringify({
            'clickCreaPagina': 1,
            'clickCreaPaginaData': dateTime
        });

        $.ajax({
            url: liveSite + "api/profiles/" + idUtente,
            data: jsonData,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            type: "PUT",
            success: function (data) {
                //console.log("salvato click creazione pagina");
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //console.log("Errore ajax click crea pagina");
            }
        });

    });


    // GESTIONE MODAL PRIMO LOGIN UTENTI
    $('.letto-modalLogin').click(function(event) {
        event.preventDefault();

        var idProfile = $(this).attr("data-idProfile");
        jsonData = JSON.stringify({
            'modalLogin': 1
        });

        //console.log(idProfile);
        //console.log(jsonData);


        //devo crearmi una api mia che modifica la variabile dell'utente, perchè devo modificare anche la sessione!
        $.ajax({
            url: liveSite + "manageModalLoginRemove/" + idProfile,
            data: jsonData,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            type: "POST",
            success: function (data) {
                //console.log("primo login disabilitato");

                $("#modalLogin").modal('hide');


            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //console.log("Errore ajax modalLogin");
            }
        });
    });



    //##### GESTIONE NOTIFICHE
/*
    if ($(".sono-loggato").length) {
        //console.log("SONO LOGGATO!");
        var idProfile = $(".sono-loggato").attr("data-id");
        var notificheProfile = [];
        var notificheProfilePro = [];
        var idProfile = $("body").attr("data-id-profile");
        $.ajax({
            url: liveSite + "api/profiles/"+idProfile+".json",
            type: 'GET',
            //data: { "lista": "on" },
            contentType:'application/json',
            dataType: 'json',
            success: function(result) {
                //console.log(result);
                //console.log(result.announcement);
                for (var i=0; i<result.announcement.length; i++) {
                    ////console.log(result.announcement[i]);
                    for (var z = 0; z < result.announcement[i].notification.length; z++) {
                        ////console.log(result.announcement[i].notification[z]);
                        if (result.announcement[i].notification[z].stato == 0 && result.announcement[i].notification[z].idProfile != idProfile) {
                            notificheProfile.push(result.announcement[i].notification[z]);
                        }
                    }
                }

                //console.log("commenti profiloo");
                //console.log(result.comment);
                var arrayIdAnnunci = [];
                for (var x=0; x<result.comment.length; x++) {
                    if (jQuery.inArray( result.comment[x].announcement.id, arrayIdAnnunci ) == -1) {
                        arrayIdAnnunci.push(result.comment[x].announcement.id);

                        for (var t=0; t<result.comment[x].announcement.notification.length; t++) {
                            if (result.comment[x].announcement.notification[t].stato == 0 && result.comment[x].announcement.notification[t].tipo == "comment" && result.id != idProfile) {
                                notificheProfile.push(result.comment[x].announcement.notification[t]);
                            }
                        }
                    }
                }

                //console.log("result.profilePro:");//console.log(result.profilePro);

                if (result.profilePro != null) {
                    $.ajax({
                        url: liveSite + "api/pro_profiles/"+result.profilePro.id +".json",
                        type: 'GET',
                        //data: { "lista": "on" },
                        contentType:'application/json',
                        dataType: 'json',
                        success: function(result) {
                            for (var i=0; i<result.announcement.length; i++) {
                                ////console.log(result.announcement[i]);
                                for (var z = 0; z < result.announcement[i].notification.length; z++) {
                                    ////console.log(result.announcement[i].notification[z]);
                                    if (result.announcement[i].notification[z].stato == 0) {
                                        notificheProfilePro.push(result.announcement[i].notification[z]);
                                    }
                                }
                            }
                            //console.log("notificheProfilePro:");//console.log(notificheProfilePro);
                            if (notificheProfilePro.length > 0) {
                                var numNotifiche = 0;
                                var numMessaggi = 0;
                                var numCommenti = 0;
                                notificheProfilePro.forEach(function(element) {
                                    numNotifiche++;
                                    if (element.tipo == "message") {
                                        numMessaggi++;
                                    } else if (element.tipo == "comment") {
                                        numCommenti++;
                                    }
                                });
                                if (numNotifiche > 0) {
                                    $(".new-notifiche-profilePro").append('<span class="badge badge-red">' + numNotifiche +'</span>');
                                }
                                if (numMessaggi > 0) {
                                    $(".new-messaggi-profilePro").append('<span class="badge badge-red">' + numMessaggi +'</span>');
                                }
                                if (numCommenti > 0) {
                                    $(".new-commenti-profilePro").append('<span class="badge badge-red">' + numCommenti +'</span>');
                                }
                            }
                                            },
                        error: function(result){ }
                    });
                }

                //console.log("notificheProfile:");//console.log(notificheProfile);
                if (notificheProfile.length > 0) {
                    var numNotificheProfile = 0;
                    var numMessaggi = 0;
                    var numCommenti = 0;
                    notificheProfile.forEach(function(element) {
                        if (element.idProfile != idProfile) {
                            numNotificheProfile++;
                            //console.log("element.idProfile " + element.id);
                            if (element.tipo == "message") {
                                numMessaggi++;
                            } else if (element.tipo == "comment") {
                                numCommenti++;
                            }
                        }
                    });

                    if (numNotificheProfile > 0) {
                        //console.log("numNotificheProfile:");//console.log('<span class="badge badge-red">' + numNotificheProfile +'</span>');

                        $(".new-notifiche-profile").append('<span class="badge badge-red">' + numNotificheProfile +'</span>');
                    }
                    if (numMessaggi > 0) {
                        $(".new-messaggi-profile").append('<span class="badge badge-red">' + numMessaggi +'</span>');
                    }
                    if (numCommenti > 0) {
                        $(".new-commenti-profile").append('<span class="badge badge-red">' + numCommenti +'</span>');
                    }



                    // notifications
                    $('.toread').on('click', function (e) {
                        var row = $(this);
                        if (row.hasClass("toread")) {
                            var idNotifica = row.attr("data-id");
                            //console.log("click");
                            row.removeClass("toread").addClass("read");//rimuove l'evidenza della riga e non riesegue l'ajax

                            if ($(this).attr("data-utente") == "profile") {
                                var count = parseInt($(".new-notifiche-profile .badge").html());
                                if ((count - 1) == 0) {
                                    $(".new-notifiche-profile .badge").remove();
                                } else {
                                    $(".new-notifiche-profile .badge").html(count - 1);
                                }
                            } else {
                                var count = parseInt($(".new-notifiche-profilePro .badge").html());
                                if ((count - 1) == 0) {
                                    $(".new-notifiche-profilePro .badge").remove();
                                } else {
                                    $(".new-notifiche-profilePro .badge").html(count - 1);
                                }
                            }


                            $.ajax({
                                url: liveSite + "unsetNotificationByIdAndRiferimento/" + idNotifica,
                                data: JSON.stringify({'id': idNotifica}),
                                dataType: "json",
                                contentType: "application/json; charset=utf-8",
                                type: "PUT",
                                success: function (data) {
                                    //console.log("notifica letta");
                                    //console.log(data);
                                    row.attr("data-original-title","Letto");
                                    row.tooltip('update');
                                    row.tooltip('hide');
                                },
                                error: function (XMLHttpRequest, textStatus, errorThrown) {
                                    //console.log("Errore ajax");
                                }
                            });
                        }
                    });

                    // messages
                    $('.toreadMessages').on('click', function (e) {
                        var row = $(this);
                        if (row.hasClass("toreadMessages")) {
                            var idAnnuncio = row.attr("data-id-ann");

                            if (row.find(".badge").length) {
                                var daSottrarre = parseInt(row.find(".badge").html());
                            } else {
                                var daSottrarre = 0;
                            }


                            //row.removeClass("toreadMessages");//rimuove l'evidenza della riga e non riesegue l'ajax

                            if ($(this).attr("data-utente") == "profile") {
                                var countNotifiche = parseInt($(".new-notifiche-profile .badge").html());
                                var countMessaggi = parseInt($(".new-messaggi-profile .badge").html());
                                if ((countNotifiche - daSottrarre) <= 0) {
                                    $(".new-notifiche-profile .badge").remove();
                                } else {
                                    $(".new-notifiche-profile .badge").html(countNotifiche - daSottrarre);
                                }
                                if ((countMessaggi - daSottrarre) <= 0) {
                                    $(".new-messaggi-profile .badge").remove();
                                } else {
                                    $(".new-messaggi-profile .badge").html(countMessaggi - daSottrarre);
                                }

                                row.find(".badge").remove();
                            } else {
                                var countNotifiche = parseInt($(".new-notifiche-profilePro .badge").html());
                                var countMessaggi = parseInt($(".new-messaggi-profilePro .badge").html());
                                if ((countNotifiche - daSottrarre) <= 0) {
                                    $(".new-notifiche-profilePro .badge").remove();
                                } else {
                                    $(".new-notifiche-profilePro .badge").html(countNotifiche - daSottrarre);
                                }
                                if ((countMessaggi - daSottrarre) <= 0) {
                                    $(".new-messaggi-profilePro .badge").remove();
                                } else {
                                    $(".new-messaggi-profilePro .badge").html(countMessaggi - daSottrarre);
                                }

                                row.find(".badge").remove();
                            }

                            //console.log(row.attr("data-id-messaggi"));


                            var jsonData = JSON.stringify({'array': row.attr("data-id-messaggi")});
                            //console.log(jsonData);

                            $.ajax({
                                url: liveSite + "unsetNotificationByIdRiferimento/" + row.attr("data-id-messaggi"),
                                data: jsonData,
                                dataType: "json",
                                contentType: "application/json; charset=utf-8",
                                type: "PUT",
                                success: function (data) {
                                    //console.log(data);
                                },
                                error: function (XMLHttpRequest, textStatus, errorThrown) {
                                    //console.log("Errore ajax unsetNotificationByIdAndRiferimento");
                                    //console.log(errorThrown);
                                }
                            });


                        }
                    });

                    // comments
                    $('.toreadComments').on('click', function (e) {
                        var row = $(this);
                        if (row.hasClass("toreadComments")) {
                            var idAnnuncio = row.attr("aria-controls");

                            if (row.find(".badge").length) {
                                var daSottrarre = parseInt(row.find(".badge").html());
                            } else {
                                var daSottrarre = 0;
                            }

                            //console.log("daSottrarre " + daSottrarre);

                            //row.removeClass("toreadComments");//rimuove l'evidenza della riga e non riesegue l'ajax

                            if ($(this).attr("data-utente") == "profile") {
                                var countNotifiche = parseInt($(".new-notifiche-profile .badge").html());
                                var countMessaggi = parseInt($(".new-commenti-profile .badge").html());
                                if ((countNotifiche - daSottrarre) <= 0) {
                                    $(".new-notifiche-profile .badge").remove();
                                } else {
                                    $(".new-notifiche-profile .badge").html(countNotifiche - daSottrarre);
                                }
                                if ((countMessaggi - daSottrarre) <= 0) {
                                    $(".new-commenti-profile .badge").remove();
                                } else {
                                    $(".new-commenti-profile .badge").html(countMessaggi - daSottrarre);
                                }

                                row.find(".badge").remove();
                            } else {
                                var countNotifiche = parseInt($(".new-notifiche-profilePro .badge").html());
                                var countMessaggi = parseInt($(".new-commenti-profilePro .badge").html());
                                if ((countNotifiche - daSottrarre) <= 0) {
                                    $(".new-notifiche-profilePro .badge").remove();
                                } else {
                                    $(".new-notifiche-profilePro .badge").html(countNotifiche - daSottrarre);
                                }
                                if ((countMessaggi - daSottrarre) <= 0) {
                                    $(".new-commenti-profilePro .badge").remove();
                                } else {
                                    $(".new-commenti-profilePro .badge").html(countMessaggi - daSottrarre);
                                }

                                row.find(".badge").remove();
                            }


                            var jsonData = JSON.stringify({'array': row.attr("data-id-commenti")});
                            //console.log(jsonData);

                            $.ajax({
                                url: liveSite + "unsetNotificationByIdRiferimento/" + row.attr("data-id-commenti"),
                                data: jsonData,
                                dataType: "json",
                                contentType: "application/json; charset=utf-8",
                                type: "PUT",
                                success: function (data) {
                                    //console.log(data);
                                },
                                error: function (XMLHttpRequest, textStatus, errorThrown) {
                                    //console.log("Errore ajax unsetNotificationByIdAndRiferimento");
                                    //console.log(errorThrown);
                                }
                            });


                        }
                    });



                    function getUrlParameter(name) {
                        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
                        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
                        var results = regex.exec(location.search);
                        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
                    };

                    var comment = getUrlParameter('comment'); // "edit"
                    //console.log("comment: " + comment);

                    if (comment != "") { //se ho il parametro message (e quindi provengo dalla sezione notifiche)
                        $( "#list-tab.list-group a" ).each(function( index ) {
                            var row = $(this);
                            var idCommenti = JSON.parse($(this).attr("data-id-commenti"));


                            for (var key in idCommenti) {
                                if (idCommenti[key] == comment) {
                                    //console.log("commentcomment: ");//console.log(comment);
                                    row.trigger("click");
                                    break;
                                }
                            }

                        });

                    } else {
                        $(".scrolling #list-tab.list-group a").first().trigger("click");
                    }

                } else {
                    $(".scrolling #list-tab.list-group a").first().trigger("click");
                }
            },
            error: function(result){ //console.log("erroree") }
        });


    }
*/


    //##### GESTIONE NOTIFICHE 2.0 (NEW version)
    if ($(".sono-loggato").length) {
        var idProfile = $("body").attr("data-id-profile");



        function inserisciNotifiche(oggettoNotifiche) {
            //console.log("result");

            if (oggettoNotifiche != null) {
                var notificheProfile = oggettoNotifiche.notificheProfilo;

                ////console.log("notifiche Pofilo:");
                ////console.log(notificheProfile);
                ////console.log("notifiche Pagina:");
                ////console.log(notifichePagina);
                //console.log("notificheProfile.message");
                ////console.log(Object.keys(notificheProfile.message).length);

                var messaggi = 0;
                var commenti = 0;
                var notifcheAltre = 0;
                if (notificheProfile.message != undefined && (Object.keys(notificheProfile.message).length)) {
                    //messaggi = notificheProfile.message.length;
                    messaggi = Object.keys(notificheProfile.message).length;
                    $(".new-messaggi-profile").html('Messaggi <span class="badge badge-red">' + Object.keys(notificheProfile.message).length + '</span>');
                } else {
                    $(".new-messaggi-profile").html('Messaggi');
                }

                if (notificheProfile.comment != undefined && notificheProfile.comment.length > 0) {
                    commenti = notificheProfile.comment.length;
                    $(".new-commenti-profile").html('Commenti <span class="badge badge-red">' + notificheProfile.comment.length + '</span>');
                } else {
                    $(".new-commenti-profile").html('Commenti');
                }



                if (notificheProfile.pubblicato != undefined || notificheProfile.rifiutato != undefined) {
                    notifcheAltre = notifcheAltre + 1;
                }



                if ((messaggi + commenti + notifcheAltre) > 0) {
                    $(".new-notifiche-profile").html('Notifiche <span class="badge badge-red">' + (messaggi + commenti + notifcheAltre) + '</span>');
                } else {
                    $(".new-notifiche-profile").html('Notifiche');
                }

            }


            if (oggettoNotifiche != null) {

                var notifichePagina = oggettoNotifiche.notifichePagina;


                var messaggiPagina = 0;
                var commentiPagina = 0;
                if (notifichePagina.message != undefined && (Object.keys(notifichePagina.message).length)) {
                    messaggiPagina = (Object.keys(notifichePagina.message).length);
                    $(".new-messaggi-profilePro").html('Messaggi <span class="badge badge-red">' + (Object.keys(notifichePagina.message).length) + '</span>');
                } else {
                    $(".new-messaggi-profilePro").html('Messaggi');
                }
                if (notifichePagina.comment != undefined && notifichePagina.comment.length > 0) {

                    commentiPagina = notifichePagina.comment.length;
                    $(".new-commenti-profilePro").html('Commenti <span class="badge badge-red">' + notifichePagina.comment.length + '</span>');
                } else {
                    $(".new-commenti-profilePro").html('Commenti');
                }
                if ((messaggiPagina + commentiPagina) > 0) {
                    $(".new-notifiche-profilePro").html('Notifiche <span class="badge badge-red">' + (messaggiPagina + commentiPagina) + '</span>');
                } else {
                    $(".new-notifiche-profilePro").html('Notifiche');
                }

                console.log(notificheProfile.pubblicato);

            }





        }


        function aggiornaNotifiche(param) {
            $.ajax({
                url: liveSite + "getNotification/"+idProfile,
                type: 'GET',
                //data: { "lista": "on" },
                contentType:'application/json',
                dataType: 'json',
                success: function(risultato) {
                    ////console.log("notifiche prese..");
                    //console.log(JSON.stringify(risultato));

                    localStorage.setItem('notifiche', JSON.stringify(risultato));

                    ////console.log(localStorage.getItem('notifiche'));

                    inserisciNotifiche(risultato);
                }
            });
        }

        aggiornaNotifiche();

        //permetto la chiamata alla funzione aggiornaNotifiche solo una volta al minuto.
        (function () {
            var lastclear = localStorage.getItem('lastclearNotification'),
                time_now  = (new Date()).getTime();

            localStorage.clear();

            // .getTime() returns milliseconds so 1000 * 60 * 60 * 24 = 24 days
            if ((time_now - lastclear) > 1000 * 60) {

                localStorage.clear();

                //console.log("Aggiorna notifiche (da api)");
                aggiornaNotifiche();

                localStorage.setItem('lastclearNotification', time_now);
            } else {
                var noti = localStorage.getItem('notifiche');

                //console.log("Aggiorna notifiche (da localstorage:")
                ////console.log(JSON.parse(noti));
                inserisciNotifiche(JSON.parse(noti));

            }
        })();


        // notifications
        $('.toread').on('click', function (e) {
            var row = $(this);
            if (row.hasClass("toread")) {
                var idNotifica = row.attr("data-id");
                row.removeClass("toread").addClass("read");//rimuove l'evidenza della riga e non riesegue l'ajax

                $.ajax({
                    url: liveSite + "unsetNotificationByIdAndRiferimento/" + idNotifica,
                    data: JSON.stringify({'id': idNotifica}),
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    type: "PUT",
                    success: function (data) {
                        //console.log("notifica letta");
                        //console.log(data);
                        row.attr("data-original-title","Letto");
                        row.tooltip('update');
                        row.tooltip('hide');

                        aggiornaNotifiche();
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        //console.log("Errore ajax unsetNotificationByIdAndRiferimento");
                    }
                });
            }
        });


        $('.toreadComments').on('click', function (e) {
            var row = $(this);
            if (row.hasClass("toreadComments")) {
                var idAnnuncio = row.attr("aria-controls");
                row.removeClass("toreadComments");//rimuove l'evidenza della riga e non riesegue l'ajax

                var jsonData = JSON.stringify({'array': row.attr("data-id-commenti")});
                //console.log(jsonData);

                $.ajax({
                    url: liveSite + "unsetNotificationByIdRiferimento/" + row.attr("data-id-commenti"),
                    data: jsonData,
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    type: "PUT",
                    success: function (data) {
                        //console.log(data);
                        row.find(".media-body span").remove();

                        aggiornaNotifiche();
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        //console.log("Errore ajax unsetNotificationByIdAndRiferimento");
                        //console.log(errorThrown);
                    }
                });
            }
        });


        $('.toreadMessages').on('click', function (e) {
            var row = $(this);
            if (row.hasClass("toreadMessages")) {
                var idAnnuncio = row.attr("data-id-ann");
                //row.removeClass("toreadMessages");//rimuove l'evidenza della riga e non riesegue l'ajax

                var jsonData = JSON.stringify({'array': row.attr("data-id-messaggi")});
                //console.log(jsonData);

                $.ajax({
                    url: liveSite + "unsetNotificationByIdRiferimento/" + row.attr("data-id-messaggi"),
                    data: jsonData,
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    type: "PUT",
                    success: function (data) {
                        //console.log(data);

                        row.find(".media-body span").remove();
                        aggiornaNotifiche();
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        //console.log("Errore ajax unsetNotificationByIdAndRiferimento");
                    }
                });
            }
        });


    }


    //########## GESTIONE INVIO URL IN FORMATO CORRETTO
    $("#form-main-search.ricercaWeb").submit(function(e){
        e.preventDefault;
        //console.log("stop submit, ricavo prima l'url");

        var newUrlForm = "";
        var queryParameter = "";
        var checkDoveZone = "";
        var checkDoveComuni = "";
        var checkDoveProvince = "";
        var checkCategoria = "";
        var checkTipologia = "";
        var checkKeyword = "";
        var checkMarca = "";
        var marca = "";
        var marcaUndescore = "";
        var tipologiaUndescore = "";

        $("form#form-main-search :input").each(function(){
            var input = $(this); // This is the jquery object of the input, do what you will

            if (input.val() != "" && input.val() != "CERCA" && input.attr("disabled") != "disabled") {

                switch (input.attr("id")) {
                    case "category-filter":
                        //newUrlForm = newUrlForm + "/" + input.find('option:selected').attr("data-slug");

                        var slugCat = input.find('option:selected').attr("data-slug");
                        if (slugCat == "residenziale") {
                            slugCat = "immobili";
                            var tipologia = input.find('option:selected').attr("data-contratto").toLowerCase();
                            checkCategoria = tipologia + "-" + slugCat;
                        } else {

                            if (input.find('option:selected').attr("data-contratto") != undefined && input.find('option:selected').parent().attr("label") == "Immobiliare" && slugCat != "affitto-stanze-posti-letto" && slugCat != "aste" && slugCat != "affitto-case-vacanza"  ) {
                                var tipologia = input.find('option:selected').attr("data-contratto").toLowerCase();
                                checkCategoria = tipologia + "-" + slugCat;
                            } else {
                                checkCategoria =  slugCat;
                            }
                        }

                        break;
                    case "hiddenContratto":
                    case "contratto":
                            var slugCat = $("#category-filter").find('option:selected').attr("data-slug");
                            if (slugCat == "residenziale") {
                                slugCat = "immobili";
                            }
                            var fixBugCessione = "";
                            if (input.val() != null) {
                                fixBugCessione = input.val();
                            } else {
                                fixBugCessione = "Cessione";
                            }

                            var tipologia = fixBugCessione.toLowerCase();
                            //newUrlForm = "/"+tipologia+"-" + slugCat;
                            checkCategoria = tipologia + "-" + slugCat;

                            if (queryParameter == "") {
                                queryParameter = "?";
                            } else {
                                queryParameter = queryParameter + "&"
                            }
                            queryParameter = queryParameter + "crt[contratto]=" + fixBugCessione;

                        break;
                    case "doveZone":

                        var arrayZone = JSON.parse(input.val());
                        //console.log(arrayZone.length);


                        checkDoveZone = "/roma";

                        if (arrayZone.length == 1) {
                            var nomeZona = $("#zoneRoma option[data-tipo='zoneRoma'][value='"+arrayZone[0]+"']").attr("data-slug");
                            //newUrlForm = newUrlForm + "/roma/" + nomeZona;
                            checkDoveZone = checkDoveZone + "/" + nomeZona;
                        } else {
                            if (queryParameter == "") { queryParameter = "?"; } else { queryParameter = queryParameter + "&"}
                            queryParameter = queryParameter + "doveZone=" + input.val();

                        }

                        break;
                    case "doveComuni":
                        if (checkDoveZone == "") {
                            var nomeComune = $("#provinceComuni option[data-tipo='comune'][value='" + input.val() + "']").attr("data-slug");
                            //newUrlForm = newUrlForm + "/" + nomeComune;
                            checkDoveComuni = "/" + nomeComune;
                        }
                        break;
                    case "doveProvince":
                        if (checkDoveZone == "") {
                            var nomeProvincia = $("#provinceComuni option[data-tipo='provincia'][value='" + input.val() + "']").attr("data-slug");
                            //newUrlForm = newUrlForm + "/" + nomeProvincia + "-e-provincia";
                            checkDoveProvince = "/" + nomeProvincia + "-e-provincia";
                        }
                        break;
                    case "tipologia":
                        //newUrlForm = newUrlForm + "/" + convertToSlug(input.val());

                        var checkArray = (input.val()).split("|");
                        if (checkArray.length > 1) {
                            checkTipologia = "/" + convertToSlug(checkArray[1]);
                        }     else {
                            checkTipologia = "/" + convertToSlug(input.val());
                        }

                        console.log(input.val());
                        var temp = convertToSlug(input.val());
                        console.log(temp);

                        switch (temp) {
                            case "audio-tv-e-video":
                                tipologiaUndescore = "audio_tv";
                                break;
                            case "computer-e-software":
                                tipologiaUndescore = "computer_software";
                                break;
                            case "cellulari-telefoni-accessori":
                                tipologiaUndescore = "cellulari_accessori";
                                break;
                            case "abbigliamento-sportivo":
                                tipologiaUndescore = "abbigliamento_sportivo";
                                break;
                            case "attrezzature-sportive":
                                tipologiaUndescore = "attrezzature_sportive";
                                break;
                            case "casa-famiglia-e-persona":
                                tipologiaUndescore = "casa_famiglia_persona";
                                break;
                            default:
                                tipologiaUndescore = temp.replace(/-/g,"_");
                        }



                        if (tipologiaUndescore != "") {
                            $("#" + tipologiaUndescore).each(function () {
                                if ($(this).attr("disabled") != "disabled" && $(this).parent().css("display") == "block") {
                                    var tipologia2 = ($(this).val().toLowerCase()).replace(/ - /g, " ");
                                    tipologia2 = tipologia2.replace(/ /g, "-");
                                    //console.log("tipologia2 =====" + tipologia2);
                                    checkTipologia = "/" + temp + "/" + tipologia2;
                                }
                            });
                        }


                        break;
                    case "marca":

                        //console.log(input.val());
                        var idCat = $("#category-filter").find('option:selected').val();

                        marca = convertToSlug(input.val());
                        checkMarca = "/" + marca;



                        marcaUndescore = marca.replace(/-/g,"_");
                        console.log(idCat);
                        console.log("#main-filters-"+idCat + " #"+marcaUndescore);

                        $("#main-filters-"+idCat + " #"+marcaUndescore).each(function() {
                            console.log("aa");
                            if ( $(this).attr("disabled") != "disabled" && $(this).parent().css("display") == "block" ) {
                                var modello  = ($(this).val().toLowerCase()).replace(/ /g,"-");
                                modello  = modello.replace(/\//g,"-");
                                checkMarca = "/" + marca + "/" + modello;
                            }
                        });

                        break;

                    // case "keyword":
                    //     var keyword = input.val();
                    //
                    //     if (keyword != "") {
                    //         checkKeyword = "/" + urlencode(keyword);
                    //     }
                    //
                    //
                    //     break;

                    case "ordinamento":
                        if (input.val() != 1) {
                            if (queryParameter == "") { queryParameter = "?"; } else { queryParameter = queryParameter + "&"}
                            queryParameter = queryParameter + input.attr("name") + "=" + input.val();
                        }

                        break;
                    case "offro_cerco":
                        if (input.val() != "Offro") {
                            if (queryParameter == "") { queryParameter = "?"; } else { queryParameter = queryParameter + "&"}
                            queryParameter = queryParameter + input.attr("name") + "=" + input.val();
                        }

                        break;
                    default:

                        if (input.attr("id") != marcaUndescore && input.attr("id") != tipologiaUndescore) {
                            if (queryParameter == "") { queryParameter = "?"; } else { queryParameter = queryParameter + "&"}
                            queryParameter = queryParameter + input.attr("name") + "=" + input.val();
                        }
                }


                //convertToSlug <--- è una funzione per convertire in slug (se ci serve)
                //console.log(input.attr("id") + " --> " + input.attr("name") + " --> " + input.val() + " NEW URL: " + newUrlForm + queryParameter);
            }

            if (input.attr("type") == "checkbox" && input.prop("disabled") == false && input.is(':checked')) {
                if (queryParameter == "") { queryParameter = "?"; } else { queryParameter = queryParameter + "&"}
                queryParameter = queryParameter + input.attr("name") + "=" + input.val();
                //console.log(input.attr("name") + " --> " + input.val() + " NEW URL: " + newUrlForm + queryParameter);
            }

        });


        if (checkDoveZone == "" && checkDoveComuni == "" && checkDoveProvince == "") {
            //if (checkCategoria == "") {
            //    newUrlForm = newUrlForm + "/italia";
            //} else {
            //    newUrlForm = liveSite + checkCategoria + "/italia/" + checkTipologia;
            //}

            checkDoveProvince = "/italia";

        }
        if (checkCategoria == "") {
            //newUrlForm = "/tutto" + newUrlForm;
            checkCategoria = "tutto";
        }


        newUrlForm = liveSite + checkCategoria + checkDoveProvince + checkDoveComuni + checkDoveZone + checkTipologia + checkMarca + checkKeyword;

        if ($("#ordinamento").val() == 1) {
            $("#ordinamento").remove();
        }



        console.log("NEW URL: " + newUrlForm + queryParameter);
        $(this).attr("action", newUrlForm + queryParameter);

        window.location.href = newUrlForm + queryParameter;

        return false; //do not submit form the normal way
    });



    $('.offroCerco .btn').on('click', function (event) {
        $('.offroCerco .btn').removeClass("focus");

        var offroCercaReadonly =     $( "#category-filter option:selected" ).attr("data-offro-cerco-readonly");
        var offroCercaDefault =     $( "#category-filter option:selected" ).attr("data-offro-cerco-default");
        //console.log("offroCercaReadonly " + offroCercaReadonly);

        $('#offro_cerco').val($(this).find("input").val());
        $(".main-search-submit").trigger("click");
    });


    var offroCercaReadonly =     $( "#category-filter option:selected" ).attr("data-offro-cerco-readonly");
    var offroCercaDefault =     $( "#category-filter option:selected" ).attr("data-offro-cerco-default");

    if ($('#offro_cerco').val() == "Cerco") {
        $('.offroCerco .btn').removeClass("active").removeClass("focus");
        $("#cerco").parent().addClass("active").addClass("focus");
    } else {
        $('.offroCerco .btn').removeClass("active").removeClass("focus");
        $("#offro").parent().addClass("active").addClass("focus");
    }


    $('.offroCerco .btn').removeClass("disabled");
    if (offroCercaReadonly == 1) {
        $('.offroCerco .btn').addClass("disabled");
        $('.offroCerco .btn.active').removeClass("disabled");
    }












    $(".segnala-profile").prop("disabled",true); $(".segnala-profile").css("cursor","no-drop");
    $(".segnala-annuncio").prop("disabled",true); $(".segnala-annuncio").css("cursor","no-drop");
    $(".segnala-azienda").prop("disabled",true); $(".segnala-azienda").css("cursor","no-drop");
    $(".segnala-commento").prop("disabled",true); $(".segnala-commento").css("cursor","no-drop");
    $(".invia-messaggio").prop("disabled",true); $(".invia-messaggio").css("cursor","no-drop");
    $(".rifiuta-annuncio").prop("disabled",true); $(".rifiuta-annuncio").css("cursor","no-drop");
    $(".invia-abb-personalizzato").prop("disabled",true); $(".invia-abb-personalizzato").css("cursor","no-drop");
    if ($("#modalAnnuncioGiornale #message").length && $("#modalAnnuncioGiornale #message").val().length >= 1) {
        $("#modalAnnuncioGiornale .btnGiornale").prop("disabled",false); $("#modalAnnuncioGiornale .btnGiornale").css("cursor","default");
        $(".promuovi").removeAttr("disabled");
        $(".promuovi").css("cursor","pointer");
    }
    $('.modal-body #message').keyup(function(e) {
        var lunghezzaTesto = $(this).val().length;
        if (lunghezzaTesto > 1) {
            $(this).parent().parent().parent().find(".segnala-profile").prop("disabled",false); $(".segnala-profile").css("cursor","default");
            $(this).parent().parent().parent().find(".segnala-annuncio").prop("disabled",false); $(".segnala-annuncio").css("cursor","default");
            $(this).parent().parent().parent().find(".segnala-azienda").prop("disabled",false); $(".segnala-azienda").css("cursor","default");
            $(this).parent().parent().parent().find(".segnala-commento").prop("disabled",false); $(".segnala-commento").css("cursor","default");
            $(this).parent().parent().parent().find(".invia-messaggio").prop("disabled",false); $(".invia-messaggio").css("cursor","default");
            $(this).parent().parent().parent().find(".rifiuta-annuncio").prop("disabled",false); $(".rifiuta-annuncio").css("cursor","default");
            $(this).parent().parent().parent().find(".invia-abb-personalizzato").prop("disabled",false); $(".invia-abb-personalizzato").css("cursor","default");
        } else {
            $(this).parent().parent().parent().find(".segnala-profile").prop("disabled",true); $(".segnala-profile").css("cursor","no-drop");
            $(this).parent().parent().parent().find(".segnala-annuncio").prop("disabled",true); $(".segnala-annuncio").css("cursor","no-drop");
            $(this).parent().parent().parent().find(".segnala-azienda").prop("disabled",true); $(".segnala-azienda").css("cursor","no-drop");
            $(this).parent().parent().parent().find(".segnala-commento").prop("disabled",true); $(".segnala-commento").css("cursor","no-drop");
            $(this).parent().parent().parent().find(".invia-messaggio").prop("disabled",true); $(".invia-messaggio").css("cursor","no-drop");
            $(this).parent().parent().parent().find(".rifiuta-annuncio").prop("disabled",true); $(".rifiuta-annuncio").css("cursor","no-drop");
            $(this).parent().parent().parent().find(".invia-abb-personalizzato").prop("disabled",true); $(".invia-abb-personalizzato").css("cursor","no-drop");
        }
        //console.log($(this).val().length);
    });



    $('#modalPaginaPro .card-group .card').click(function(e) {
        $('#modalPaginaPro .card-group .card').removeClass("active");
        $(this).addClass("active");
    });



    $(document).on("wheel", "input[type=number]", function (e) {
        $(this).blur();
    });


    // toglie il footer
    if ($("#route").attr("data-route") == "profile-edit" ||
        $("#route").attr("data-route") == "profile" ||
        $("#route").attr("data-route") == "profile-comments" ||
        $("#route").attr("data-route") == "profile-messages"  ||
        $("#route").attr("data-route") == "profile-announcements" ||
        $("#route").attr("data-route") == "announcement-edit" ||
        $("#route").attr("data-route") == "announcement-list-products" ||
        $("#route").attr("data-route") == "announcement-certificate")  {
            $("footer").remove();
    }






    $('#modalPaginaPro .cat').click(function(e) {
        e.preventDefault();
        var selezione = $(this).attr("data-selezione");

        $('#modalPaginaPro .cat').each(function () {
            $(this).removeClass("active");
        });

        $('#modalPaginaPro .selezione').removeClass("d-none");
        $('#modalPaginaPro .selezione strong').html($(this).attr("data-selezione"));

        $("#modalPaginaPro #pacchetti" + selezione).trigger("click");
        $(this).addClass("active");
        $("#modalPaginaPro .avanti-paginaPro").removeAttr("disabled");
        $("#modalPaginaPro .avanti-paginaPro").css("cursor","default");
    });





    $('.showpwd').click(function(event) {
        event.preventDefault();

        var inputType = $('.pwd').attr('type');

        if (inputType === "password") {
            $('.pwd').attr('type', 'text');
            $('.showpwd').find('i').removeClass('fa-eye').addClass('fa-eye-slash');
            $('.showpwd').attr('title', 'Nascondi password');
            $('.showpwd').attr('data-original-title', 'Nascondi password');
        } else {
            $('.pwd').attr('type', 'password');
            $('.showpwd').find('i').removeClass('fa-eye-slash').addClass('fa-eye');
            $('.showpwd').attr('title', 'Mostra password');
            $('.showpwd').attr('data-original-title', 'Mostra password');
        }
    });


    function onScroll(event){
        var scrollPos = $(document).scrollTop() - 100;
        $('nav .box a').each(function () {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            var heightBox = refElement.next().height() +  refElement.next().next().height();

            if (refElement.position() != undefined && refElement.position().top <= scrollPos && refElement.position().top + heightBox > scrollPos) {
                $('nav .box a h3').removeClass("active");
                currLink.find("h3").addClass("active");
            }
            else{
                currLink.find("h3").removeClass("active");
            }
        });
    }
    $(document).on("scroll", onScroll);


    var route = $("#route").attr("data-route");
    //console.log( "ready! - " + window.location.href + " - route: " + route);

    $('[data-toggle="tooltip"]').tooltip({
        trigger : 'hover'
    });

    //select con autocompletamento(statico)
    $(".chosen").chosen({
            no_results_text: "No result found. Press enter to add ",
            //enable_split_word_search: false,
            search_contains: true,
            allow_single_deselect: true
    });



    //calendario
    $('.datepicker').datetimepicker({
        format: 'DD/MM/YYYY',
        useCurrent: false,
        icons: {
            up: "fa fa-chevron-circle-up",
            down: "fa fa-chevron-circle-down",
            next: 'fa fa-chevron-circle-right',
            previous: 'fa fa-chevron-circle-left'
        }
    });

    // $('.orderBy').on('change', function (e) {
    //     $('#orderBy').submit();
    // });

    jQuery('.orderBy').on('change', function (e) {
        $("#main-search #ordinamento").val($(this).val());
        $("#form-main-search").submit();
        //this.form.submit();
    });


    //autocompletamento annunci
    //  $('input.typeahead').typeahead({
    //      displayText: function(item) {
    //          ////console.log(item);
    //          var htmlItem = item.titolo;
    //          return htmlItem;
    //      },
    //      source: function (query, result) {
    //          $.ajax({
    //              url: liveSite + "api/announcements.json?stato=true",
    //              data: 'titolo=' + query,
    //              dataType: "json",
    //              type: "GET",
    //              success: function (data) {
    //                  result($.map(data, function (item) {
    //                      return item;
    //                  }));
    //              }
    //          });
    //      }
    //  })


    // Smooth Scroll with jQuery (https://css-tricks.com/snippets/jquery/smooth-scrolling/)
    // (scroll/ancora animata)
    $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').not('#list-tab a').not('[href="#list"]').not('[href="#mapAnnunci"]').not('#formCategoria a').click(function(event) {
        console.log("click");
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
            &&
            location.hostname == this.hostname
        ) {

            // Figure out element to scroll to
            var target = $(this.hash);
            var topHeight = "";
            if ($('#titles').length){
                topHeight = $('#titles').outerHeight();
            } else {
                topHeight = 0;
            }



            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            // Does a scroll target exist?
            if (target.length) {


                // Only prevent default if animation is actually gonna happen
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top - topHeight
                }, 1000, function() {
                    // Callback after animation
                    // Must change focus!
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) { // Checking if the target was focused
                        return false;
                    } else {
                        $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                        $target.focus(); // Set focus again
                    };
                    return true;
                });
            }
        }
    });

    //mostra telefono e cellulare (in profilo e annunci)
    $('.contacts .cellulare, .contacts .telefono').on('click', function (e) {
        e.preventDefault();
        $(this).html($(this).attr("data-mostra"));
    });



    $('#category-filter, #where-filter').on('change', function (e) {

        if ($(this).find('option:selected').attr("data-contratto") == "Affitto") {
            $("#hiddenContratto").removeAttr("disabled");
            $("#hiddenContratto").val("Affitto")
        } else if ($(this).find('option:selected').attr("data-contratto") == "Vendita") {
            $("#hiddenContratto").removeAttr("disabled");
            $("#hiddenContratto").val("Vendita")
        } else if ($(this).find('option:selected').attr("data-contratto") == "Cessione") {
            $("#hiddenTipo").removeAttr("disabled");
            $("#hiddenTipo").val("Cessione")
        } else {
            $("#hiddenContratto").attr("disabled","disabled");
            $("#hiddenContratto").val("")
        }

        checkMainSearchButton();
    });
    $('#keyword').on('keyup', function (e) {
        //$("#form-main-search").find("button").prop("disabled",false);
        checkMainSearchButton();
    });


    //caricamento file Certificate dell'annuncio
    $(".fileinput").each(function( index ) {
        var fileinput = $(this);
        var id = $(this).attr("data-id");
        var entita = $(this).attr("data-entita");
        var tipo = $(this).attr("data-tipo");
        var certificate = $(this).attr("data-certificate");

        //console.log("/api/" + entita + "/" + id  + "/uploads/" + tipo);

        $(this).fileinput({
            uploadUrl: "/api/" + entita + "/" + id  + "/uploads/" + tipo,
            uploadAsync: false,
            showUpload: false, // hide upload button
            showRemove: false, // hide remove button
            minFileCount: 1,
            maxFileCount: 1,
            initialPreviewAsData: true
        }).on("filebatchselected", function (event, files) {
            $(this).fileinput("upload");
        }).on('filebatchuploadsuccess', function(event, data, previewId, index) {
            //console.log('file uploaded');
            //console.log(data.files[0].name);
            //console.log(data.response);
            var linkFile = '<a class="file-pdf" target="_blank" href="' + data.response.base64 + '">'+ data.files[0].name +'</a>';
            var deleteButton = '<button type="button" class="btn btn-danger delete-certificate"  data-entita="'+entita+'" data-id="'+id+'" data-tipo="'+ certificate +'" data-oid="'+ data.response.oid +'">Elimina</button>';

            if ($(this).parent().parent().parent().parent().parent().find(".visualizza-file").length) {
                if ($(this).attr("id") != "camera_commercio") {
                    $(this).parent().parent().parent().parent().parent().find(".visualizza-file").append(linkFile).append(deleteButton);
                } else {
                    $(this).parent().parent().parent().parent().parent().find(".visualizza-file").append(linkFile);
                }
            } else {

            }
            defineDeleteCertificate();
        });
    });

    function defineDeleteCertificate() {
        $('.delete-certificate').on('click', function (e) {
            var deleteCertificate = $(this);
            var id = $(this).attr("data-id");
            var entita = $(this).attr("data-entita");
            var tipo = $(this).attr("data-tipo");
            var oid = $(this).attr("data-oid");

            $.ajax({
                url: liveSite + "api/"+entita+"/"+id+"/uploads/delete/"+ tipo +"/" + oid,
                type: 'DELETE',
                data: {id: oid}, //<-----this should have to be an object.
                contentType:'application/json',  // <---add this
                dataType: 'text',                // <---update this
                success: function(result) {
                    deleteCertificate.parent().html("");
                    $(".alert-success").hide();
                },
                error: function(result){ }
            });

        });
    }
    defineDeleteCertificate();





    //identifichiamo la pagina caricata tramite il l'attributo data-route definito in ogni pagina
    switch (route) {


        case "admin":

            /* activate the carousel */
            $("#modal-carousel").carousel({interval:false});
            /* change modal title when slide changes */
            $("#modal-carousel").on("slid.bs.carousel",       function () {
                $(".modal-title")
                    .html($(this)
                        .find(".active img")
                        .attr("title"));
            });
            /* when clicking a thumbnail */
            $(".row .thumbnail").click(function(){
                var content = $(".carousel-inner");
                var title = $(".modal-title");

                content.empty();
                title.empty();

                var id = this.id;
                var repo = $("#img-repo .item");
                var repoCopy = repo.filter("#" + id).clone();
                var active = repoCopy.first();

                active.addClass("active");
                title.html(active.find("img").attr("title"));
                content.append(repoCopy);

                // show the modal
                $("#modal-gallery").modal("show");
            });


            $('.deleteImage i').on('click', function (event) {
                event.preventDefault();
                var deleteImage  = $(this).parent();
                var id = deleteImage.attr("data-id");

                $.ajax({
                    url: liveSite + "api/images/" + id,
                    data: '',
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    type: "DELETE",
                    success: function (data) {
                        //console.log("Immagine eliminata con successo. id: " + id);
                        $(".immagine-"+id).hide("slow");
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        //console.log("Errore ajax delete immagine");
                    }
                });
            });




            $('.BloccaAttivaPagina').on('click', function (event) {
                var id = $(this).attr("data-id");
                var isActive = $(this).attr("data-isActive");
                var proprietario = $(this).attr("data-proprietario");
                var email = $(this).attr("data-email");

                //console.log(id);
                $("#modalSegnalatoPagina .id").val(id);
                $("#modalSegnalatoPagina .isActive").val(isActive);
                $("#modalSegnalatoPagina .proprietario").html(proprietario);
                $("#modalSegnalatoPagina .email").val(email);
                if (isActive == "1") {
                    $("#modalSegnalatoPaginaLabel").html("Blocca la pagina");
                    $("#modalSegnalatoPagina .azione").html("Blocca");
                    $("#modalSegnalatoPagina .blocca-attiva-pagina").html("Blocca Pagina");
                } else {
                    $("#modalSegnalatoPaginaLabel").html("Attiva la pagina");
                    $("#modalSegnalatoPagina .azione").html("Attiva");
                    $("#modalSegnalatoPagina .blocca-attiva-pagina").html("Attiva Pagina");
                }
            });

            $('.blocca-attiva-pagina').on('click', function (event) {
                event.preventDefault();

                var id = $("#modalSegnalatoPagina .id").val();
                var isActive = $("#modalSegnalatoPagina .isActive").val();
                var message = $("#modalSegnalatoPagina .message").val();
                var email = $("#modalSegnalatoPagina .email").val();
                if (isActive == "1") {
                    isActive = false;
                } else {
                    isActive = true;
                }

                $.ajax({
                    url: liveSite + "api/pro_profiles/" + id,
                    data: JSON.stringify({'isActive': isActive}),
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    type: "PUT",
                    success: function (data) {
                        //console.log("pagina bloccata/attivata con successo");
                        //console.log(data);
                        var tipo = "";
                        if (isActive == true) {
                            $("#modalSegnalatoPagina .AlertpaginaAttivata").show();
                            $(".BloccaAttivaPagina").html("BLOCCA");
                            $(".labelBloccoAttivo").html('<strong class="badge badge-success">ATTIVO</strong>');
                            tipo = "pagina-attivata";
                        } else {
                            $("#modalSegnalatoPagina .AlertpaginaBloccata").show();
                            $(".BloccaAttivaPagina").html("ATTIVA");
                            $(".labelBloccoAttivo").html('<strong class="badge badge-danger">BLOCCATO/SOSPESO</strong>');
                            tipo = "pagina-bloccata";
                        }
                        $("#modalSegnalatoPagina .modal-body .form-group").hide();
                        $("#modalSegnalatoPagina .blocca-attiva-pagina").hide();


                        //EMAIL notifica
                        jsonData = JSON.stringify({
                            'profile': "",
                            'profilePro': id,
                            'annuncio': "",
                            'tipo': tipo,
                            'messaggio': message
                        });
                        //console.log(jsonData);
                        $.ajax({
                            url: liveSite + "api/sendEmail",
                            data: jsonData,
                            dataType: "json",
                            contentType: "application/json; charset=utf-8",
                            type: "POST",
                            success: function (data) {
                                //console.log(tipo + ", notifica inviata");
                            },
                            error: function(XMLHttpRequest, textStatus, errorThrown) {
                                //console.log("Errore ajax");
                            }
                        });
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        //console.log("Errore ajax");
                    }
                });
            });





            $('.BloccaAttivaProfilo').on('click', function (event) {
                var id = $(this).attr("data-id");
                var isActive = $(this).attr("data-isActive");
                var proprietario = $(this).attr("data-proprietario");
                var email = $(this).attr("data-email");

                //console.log(id);
                $("#modalSegnalatoProfilo .id").val(id);
                $("#modalSegnalatoProfilo .isActive").val(isActive);
                $("#modalSegnalatoProfilo .proprietario").html(proprietario);
                $("#modalSegnalatoProfilo .email").val(email);
                if (isActive == "1") {
                    $("#modalSegnalatoProfiloLabel").html("Blocca il profilo");
                    $("#modalSegnalatoProfilo .azione").html("Blocca");
                    $("#modalSegnalatoProfilo .blocca-attiva-profilo").html("Blocca Profilo");
                } else {
                    $("#modalSegnalatoProfiloLabel").html("Attiva il profilo");
                    $("#modalSegnalatoProfilo .azione").html("Attiva");
                    $("#modalSegnalatoProfilo .blocca-attiva-profilo").html("Attiva Profilo");
                }
            });

            $('.blocca-attiva-profilo').on('click', function (event) {
                event.preventDefault();

                var id = $("#modalSegnalatoProfilo .id").val();
                var isActive = $("#modalSegnalatoProfilo .isActive").val();
                var message = $("#modalSegnalatoProfilo .message").val();
                var email = $("#modalSegnalatoProfilo .email").val();
                if (isActive == "1") {
                    isActive = false;
                } else {
                    isActive = true;
                }

                $.ajax({
                    url: liveSite + "api/profiles/" + id,
                    data: JSON.stringify({'isActive': isActive}),
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    type: "PUT",
                    success: function (data) {
                        //console.log("profilo bloccato/attivato con successo");
                        //console.log(data);
                        var tipo = "";
                        if (isActive == true) {
                            $("#modalSegnalatoProfilo .AlertpaginaAttivata").show();
                            $(".BloccaAttivaProfilo").html("BLOCCA");
                            $(".labelBloccoAttivo").html('<strong class="badge badge-success">ATTIVO</strong>');
                            tipo = "profilo-attivato";
                        } else {
                            $("#modalSegnalatoProfilo .AlertpaginaBloccata").show();
                            $(".BloccaAttivaProfilo").html("ATTIVA");
                            $(".labelBloccoAttivo").html('<strong class="badge badge-danger">BLOCCATO/SOSPESO</strong>');
                            tipo = "profilo-bloccato";
                        }
                        $("#modalSegnalatoProfilo .modal-body .form-group").hide();
                        $("#modalSegnalatoProfilo .blocca-attiva-profilo").hide();



                        //EMAIL notifica
                        jsonData = JSON.stringify({
                            'profile': id,
                            'profilePro': "",
                            'annuncio': "",
                            'tipo': tipo,
                            'messaggio': message
                        });
                        //console.log(jsonData);
                        $.ajax({
                            url: liveSite + "api/sendEmail",
                            data: jsonData,
                            dataType: "json",
                            contentType: "application/json; charset=utf-8",
                            type: "POST",
                            success: function (data) {
                                //console.log(tipo + ", notifica inviata");
                            },
                            error: function(XMLHttpRequest, textStatus, errorThrown) {
                                //console.log("Errore ajax");
                            }
                        });
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        //console.log("Errore ajax");
                    }
                });
            });


            $('#modalSospendiAnnuncio').on('show.bs.modal', function (event) {
                var button = $(event.relatedTarget); // Button that triggered the modal
                var titolo = $("#form #titolo").val();
                var descrizioneLunga = $("#form #descrizioneLunga").val();
                var descrizioneBreve = $("#form #descrizioneBreve").val();
                var descrizioneSecondaria = "";
                var prezzo = $("#form #prezzo").val();
                var telefono = $("#form #telefono").val();
                var cellulare = $("#form #cellulare").val();

                var modal = $(this);
                modal.find('#titolo').val(titolo);
                modal.find('#descrizione_lunga').val(descrizioneLunga);
                modal.find('#descrizione_secondaria').val(descrizioneSecondaria);
                modal.find('#descrizione_breve').val(descrizioneBreve);
                modal.find('#prezzo').val(prezzo);
                modal.find('#telefono').val(telefono);
                modal.find('#cellulare').val(cellulare);
            })

            $('#modalRifiutaAnnuncio').on('show.bs.modal', function (event) {
                var button = $(event.relatedTarget); // Button that triggered the modal
                var idAnnouncement = button.data('announcement'); // Extract info from data-* attributes
                var idProfile = button.data('profile'); // Extract info from data-* attributes
                var tipo = button.data('tipo'); // Extract info from data-* attributes

                var modal = $(this);
                modal.find('#announcement').val(idAnnouncement);
                modal.find('#profile').val(idProfile);
                modal.find('#tipo').val(tipo);
            })

            $('.rifiuta-annuncio').on('click', function (event) {
                event.preventDefault();
                event.stopPropagation();

                var annuncio = $("#modalRifiutaAnnuncio #announcement").val();
                var utenteId = $("#modalRifiutaAnnuncio #profile").val();
                var utenteTipo = $("#modalRifiutaAnnuncio #tipo").val();
                var message = $("#modalRifiutaAnnuncio #message").val();

                if (utenteTipo == "profile") {
                    jsonData = JSON.stringify({
                        'profile': parseInt(utenteId),
                        'profilePro': "",
                        'annuncio': parseInt(annuncio),
                        'tipo': 'rifiuta-annuncio',
                        'messaggio': message
                    });
                }   else {
                    jsonData = JSON.stringify({
                        'profile': "",
                        'profilePro': parseInt(utenteId),
                        'annuncio': parseInt(annuncio),
                        'tipo': 'rifiuta-annuncio',
                        'messaggio': message
                    });
                }

                //console.log(jsonData);
                $.ajax({
                    url: liveSite + "api/sendEmail",
                    data: jsonData,
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    type: "POST",
                    success: function (data) {
                        //console.log(tipo + ", invio mail");


                        $("#modalRifiutaAnnuncio .modal-body .form-group").hide();
                        $("#modalRifiutaAnnuncio .modal-body .alert-success").show();
                        $("#modalRifiutaAnnuncio .rifiuta-annuncio").hide();

                        $("#formmodalRifiutaAnnuncio").submit();
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        //console.log("Errore ajax invio mail");
                        //console.log(errorThrown);
                    }
                });
            });



            $(".caratteristicheList, .filtriList").sortable({
                stop: function (event, ui) { //dopo che ordina..
                    var countCat = 1;
                    var countFiltri = 1;
                    $( ".caratteristicheList .item" ).each(function( i ) {
                        $(this).attr("data-ord", countCat);
                        $(this).find(".order").html(countCat);
                        countCat++;
                    });
                    $( ".filtriList .item" ).each(function( i ) {
                        $(this).attr("data-ord", countFiltri);
                        $(this).find(".order").html(countFiltri);
                        countFiltri++;
                    });
                }
            });



            function creaJsonCaratteristiche() {
                var dataJson = {};
                $( ".caratteristicheList .item" ).each(function( i ) {

                    var nomeCampo = $(this).find(".nomeCampo").val();
                    var label = $(this).find(".label").val();
                    var field = $(this).find(".field").val();
                    var type = $(this).find(".type").val();
                    var parent = ($(this).find(".parent").val() == "") ? "childNotRequired" : (($(this).find(".parent").val() == "indipendente") ? "" : $(this).find(".parent").val());
                    var defaultt = $(this).find(".defaultt").val();
                    var main = ($(this).find(".mainSi").prop('checked') == true) ? 1 : 0;
                    var required = ($(this).find(".requiredSi").prop('checked') == true) ? 1 : 0;
                    var readonly = ($(this).find(".readonlySi").prop('checked') == true) ? 1 : 0;
                    var ord = $(this).attr("data-ord");
                    var values = $(this).find(".valori").val();
                    var preCompilazione = 0;
                    if ($(this).find(".posNessuno").prop('checked') == true) {
                        preCompilazione = 0;
                    }
                    if ($(this).find(".posTitolo").prop('checked') == true) {
                        preCompilazione = 1;
                    }
                    if ($(this).find(".posTesto").prop('checked') == true) {
                        preCompilazione = 2;
                    }
                    var prima = $(this).find(".etichettaPrima").val();
                    var dopo = $(this).find(".etichettaDopo").val();

                    //if (field != "select") {
                    //    parent = "";
                    //}
                    ////console.log(parent);

                    dataJson[nomeCampo] = {
                        "label": label,
                        "field": field,
                        "type": type,
                        "default": defaultt,
                        "main": main,
                        "required": required,
                        "readonly": readonly,
                        "ord": ord,
                        "parent": parent,
                        "preComp": preCompilazione,
                        "prima": prima,
                        "dopo": dopo,
                        "values": values.split("; ")
                    };

                    //dataJson.push(campoJson.nomeCampo);
                });

                $("#modalJson .modal-body").html("<pre>"+ JSON.stringify(dataJson,null,'\t') +"</pre>");

                $("#jsonCaratteristiche").val(JSON.stringify(dataJson));

                //console.log(JSON.stringify(dataJson)); //converte in json
            }
            function creaJsonFiltri() {
                var dataJson = {};
                $( ".filtriList .item" ).each(function( i ) {
                    var nomeCampo = $(this).find(".nomeCampo").val();
                    var label = $(this).find(".label").val();
                    var field = $(this).find(".field").val();
                    var type = $(this).find(".type").val();
                    var mod = $(this).find(".mod").val();
                    var parent = ($(this).find(".parent").val() == "") ? "childNotRequired" : (($(this).find(".parent").val() == "indipendente") ? "" : $(this).find(".parent").val());
                    var defaultt = $(this).find(".defaultt").val();
                    var main = ($(this).find(".mainSi").prop('checked') == true) ? 1 : 0;
                    var required = ($(this).find(".requiredSi").prop('checked') == true) ? 1 : 0;
                    var ord = $(this).attr("data-ord");
                    var values = $(this).find(".valori").val();


                    var valori = {}
                    $(this).find(".valoriList .item-valori").each(function( i ) {
                        var temp = $(this).find(".valore").val();
                        var temp1 = $(this).find(".cat").val();
                        var temp2 = $(this).find(".valoriConfronto").val();
                        valori[temp] = {
                                "caratteristica" : temp1,
                                "valoriConfronto" : temp2.split("; ")
                            };
                        //console.log(valori);
                    });



                    //if (field != "select") {
                    //    parent = "";
                    //}
                    if (mod != "multi-value") {
                        valori = values.split("; ");
                    }

                    dataJson[nomeCampo] = {
                        "label": label,
                        "feature": nomeCampo,
                        "field": field,
                        "type": type,
                        "mod": mod,
                        "default": defaultt,
                        "main": main,
                        "required": required,
                        "ord": ord,
                        "parent": parent,
                        "values": valori
                    };

                    //dataJson.push(campoJson.nomeCampo);
                });

                $("#modalJson .modal-body").html("<pre>"+ JSON.stringify(dataJson,null,'\t') +"</pre>");

                $("#jsonFiltri").val(JSON.stringify(dataJson));

                //console.log(JSON.stringify(dataJson)); //converte in json
            }


            $('.json-caratteristiche').on('click', function (event) {
                creaJsonCaratteristiche();
            });
            $('.json-filtri').on('click', function (event) {
                creaJsonFiltri();
            });


            $('.eliminaCampo').on('click', function (e) {
                e.preventDefault();
                $(this).parent().parent().parent().fadeOut( 500, function() {
                    $( this ).remove();
                });
            });


            $('.aggiungi-caratteristica').on('click', function (event) {
                var newOrd = parseInt($( ".caratteristicheList .item:nth-last-child(1)" ).attr("data-ord")) + 1;
                $(this).parent().parent().parent().attr("data-ord", newOrd);
                $(this).parent().parent().parent().find(".order").html(newOrd);
                $(this).parent().parent().parent().find(".catLabel").html($(".nuova-caratteristica").find(".nomeCampo").val());
                $(this).parent().parent().parent().find(".labelField").html($(".nuova-caratteristica").find(".field").val());

                var nuovaCaratteristica = $(this).parent().parent().parent().clone();
                nuovaCaratteristica.find(".row").css("display","flex");
                nuovaCaratteristica.find(".catLabel").attr("href", nuovaCaratteristica.find(".catLabel").attr("href") + "-" + newOrd);
                nuovaCaratteristica.find("#collapseAddCar").attr("id", nuovaCaratteristica.find("#collapseAddCar").attr("id") + "-" + newOrd);
                nuovaCaratteristica.find(".aggiungi-caratteristica").remove();

                nuovaCaratteristica.find(".label").attr("required","required");
                nuovaCaratteristica.find(".nomeCampo").attr("required","required");
                nuovaCaratteristica.find(".field").attr("required","required");
                nuovaCaratteristica.find(".type").attr("required","required");
                nuovaCaratteristica.find(".requiredSi").attr("required","required");
                nuovaCaratteristica.find(".requiredNo").attr("required","required");

                nuovaCaratteristica.find(".mainNo").attr("name",nuovaCaratteristica.find(".nomeCampo").val() + "_mainCat" );
                nuovaCaratteristica.find(".mainNo").attr("id",nuovaCaratteristica.find(".nomeCampo").val() + "_catMainNo" );
                nuovaCaratteristica.find(".mainSi").attr("name",nuovaCaratteristica.find(".nomeCampo").val() + "_mainCat" );
                nuovaCaratteristica.find(".mainSi").attr("id",nuovaCaratteristica.find(".nomeCampo").val() + "_catMainSi" );
                nuovaCaratteristica.find(".requiredNo").attr("name",nuovaCaratteristica.find(".nomeCampo").val() + "_requiredCat" );
                nuovaCaratteristica.find(".requiredNo").attr("id",nuovaCaratteristica.find(".nomeCampo").val() + "_mainRequiredNo" );
                nuovaCaratteristica.find(".requiredSi").attr("name",nuovaCaratteristica.find(".nomeCampo").val() + "_requiredCat" );
                nuovaCaratteristica.find(".requiredSi").attr("id",nuovaCaratteristica.find(".nomeCampo").val() + "_mainRequiredSi" );
                nuovaCaratteristica.find(".readonlySi").attr("name",nuovaCaratteristica.find(".nomeCampo").val() + "_readonlyCat" );
                nuovaCaratteristica.find(".readonlySi").attr("id",nuovaCaratteristica.find(".nomeCampo").val() + "_mainReadonlySi" );
                nuovaCaratteristica.find(".readonlyNo").attr("name",nuovaCaratteristica.find(".nomeCampo").val() + "_readonlyCat" );
                nuovaCaratteristica.find(".readonlyNo").attr("id",nuovaCaratteristica.find(".nomeCampo").val() + "_mainReadonlyNo" );


                nuovaCaratteristica.find(".nuova-caratteristica .collapse").removeClass("show");
                nuovaCaratteristica.find(".row").removeClass("nuova-caratteristica");

                $(this).parent().parent().parent().find(".nuova-caratteristica .collapse").removeClass("show");
                $(this).parent().parent().parent().find(".label").val("");
                $(this).parent().parent().parent().find(".nomeCampo").val("");
                $(this).parent().parent().parent().find(".field").val("");
                $(this).parent().parent().parent().find(".type").val("");
                $(this).parent().parent().parent().find(".requiredSi").val("");
                $(this).parent().parent().parent().find(".requiredNo").val("");
                $(this).parent().parent().parent().find(".parent").val("");
                $(this).parent().parent().parent().find(".defaultt").val("");
                $(this).parent().parent().parent().find(".valori").val("");

                $(this).parent().parent().parent().find(".mainSi").prop('checked', false);
                $(this).parent().parent().parent().find(".mainNo").prop('checked', false);
                $(this).parent().parent().parent().find(".requiredSi").prop('checked', false);
                $(this).parent().parent().parent().find(".requiredNo").prop('checked', false);
                $(this).parent().parent().parent().find(".readonlySi").prop('checked', false);
                $(this).parent().parent().parent().find(".readonlyNo").prop('checked', false);


                $(".caratteristicheList").append(nuovaCaratteristica);

                delete nuovaCaratteristica;
                $('.eliminaCampo').on('click', function (e) {
                    e.preventDefault();

                    $(this).parent().parent().parent().fadeOut( 500, function() {
                        $( this ).remove();
                    });
                });
            });

            $('.aggiungi-filtro').on('click', function (event) {
                var newOrd = parseInt($( ".filtriList .item:nth-last-child(1)" ).attr("data-ord")) + 1;
                $(this).parent().parent().parent().attr("data-ord", newOrd);
                $(this).parent().parent().parent().find(".order").html(newOrd);
                $(this).parent().parent().parent().find(".catLabel").html($(".nuovo-filtro").find(".label").val());
                $(this).parent().parent().parent().find(".labelField").html($(".nuovo-filtro").find(".field").val());

                var nuovoFiltro = $(this).parent().parent().parent().clone();
                nuovoFiltro.find(".row").css("display","flex");
                nuovoFiltro.find(".catLabel").attr("href", nuovoFiltro.find(".catLabel").attr("href") + "-" + newOrd);
                nuovoFiltro.find("#collapseAddFiltro").attr("id", nuovoFiltro.find("#collapseAddFiltro").attr("id") + "-" + newOrd);
                nuovoFiltro.find(".aggiungi-filtro").remove();

                nuovoFiltro.find(".label").attr("required","required");
                nuovoFiltro.find(".nomeCampo").attr("required","required");
                nuovoFiltro.find(".field").attr("required","required");
                nuovoFiltro.find(".type").attr("required","required");
                nuovoFiltro.find(".requiredSi").attr("required","required");
                nuovoFiltro.find(".requiredNo").attr("required","required");


                nuovoFiltro.find(".mainNo").attr("name",nuovoFiltro.find(".nomeCampo").val() + "_mainFiltri" );
                nuovoFiltro.find(".mainNo").attr("id",nuovoFiltro.find(".nomeCampo").val() + "_filtriMainNo" );
                nuovoFiltro.find(".mainSi").attr("name",nuovoFiltro.find(".nomeCampo").val() + "_mainFiltri" );
                nuovoFiltro.find(".mainSi").attr("id",nuovoFiltro.find(".nomeCampo").val() + "_filtriMainSi" );
                nuovoFiltro.find(".requiredNo").attr("name",nuovoFiltro.find(".nomeCampo").val() + "_requiredFiltri" );
                nuovoFiltro.find(".requiredNo").attr("id",nuovoFiltro.find(".nomeCampo").val() + "_filtriRequiredNo" );
                nuovoFiltro.find(".requiredSi").attr("name",nuovoFiltro.find(".nomeCampo").val() + "_requiredFiltri" );
                nuovoFiltro.find(".requiredSi").attr("id",nuovoFiltro.find(".nomeCampo").val() + "_filtriRequiredSi" );


                nuovoFiltro.find(".nuovo-filtro .collapse").removeClass("show");
                nuovoFiltro.find(".row").removeClass("nuovo-filtro");


                nuovoFiltro.find(".valoreLabelnew").each(function( index ) {
                    $(this).attr("href", $(this).attr("href") + "_" + newOrd);
                });
                nuovoFiltro.find(".collapseAddnew").each(function( index ) {
                    $(this).attr("id", $(this).attr("id") + "_" + newOrd);
                });


                nuovoFiltro.find(".valoriList_new").addClass("valoriList_" + nuovoFiltro.find(".nomeCampo").val()).removeClass("valoriList_new");
                nuovoFiltro.find(".valori_new").attr("href", nuovoFiltro.find(".valori_new").attr("href") + "_" + newOrd);
                nuovoFiltro.find(".valori-new .valoreLabelnew").attr("href", "#valori_new_" + newOrd);
                nuovoFiltro.find(".valori-new .collapseAddnew").attr("id", "valori_new_" + newOrd);
                nuovoFiltro.find(".valori-new .item-valori > .row:first-child").css("display","none");
                nuovoFiltro.find(".valori-new .aggiungi-valore").attr("data-key", nuovoFiltro.find(".nomeCampo").val());

                nuovoFiltro.find(".valori-new .valoreLabelnew").addClass("valoreLabel" + nuovoFiltro.find(".nomeCampo").val()).removeClass("valoreLabelnew");
                nuovoFiltro.find(".valori-new .collapseAddnew").addClass("collapseAdd" + nuovoFiltro.find(".nomeCampo").val()).removeClass("collapseAddnew");


                $(this).parent().parent().parent().find(".nuovo-filtro .collapse").removeClass("show");
                $(this).parent().parent().parent().find(".label").val("");
                $(this).parent().parent().parent().find(".nomeCampo").val("");
                $(this).parent().parent().parent().find(".field").val("");
                $(this).parent().parent().parent().find(".type").val("");
                $(this).parent().parent().parent().find(".requiredSi").val("");
                $(this).parent().parent().parent().find(".requiredNo").val("");
                $(this).parent().parent().parent().find(".parent").val("");
                $(this).parent().parent().parent().find(".defaultt").val("");
                $(this).parent().parent().parent().find(".valori").val("");

                $(this).parent().parent().parent().find(".mainSi").prop('checked', false);
                $(this).parent().parent().parent().find(".mainNo").prop('checked', false);
                $(this).parent().parent().parent().find(".requiredSi").prop('checked', false);
                $(this).parent().parent().parent().find(".requiredNo").prop('checked', false);


                nuovoFiltro.find(".valori-new .aggiungi-valore").on('click', function (event) {
                    //console.log("nuovo aggiungiValoreFiltro");
                    aggiungiValoreFiltro($(this));
                });



                $(".filtriList").append(nuovoFiltro);

                delete nuovoFiltro;
                $(".valoriList_new").html("");

                $('.eliminaCampo').on('click', function (e) {
                    e.preventDefault();

                    $(this).parent().parent().parent().fadeOut( 500, function() {
                        $( this ).remove();
                    });
                });


                 //$('#filtri .collapse .mod').on('change', function (event) {
                 //    gestioneModFiltri($(this));
                 //});
                 //$('#filtri .collapse .mod').trigger("change");

            });



            function aggiungiValoreFiltro(element) {
                var tag = element.attr("data-key");
                var nuovoVal = element.parent().find(".valore").val();
                element.parent().parent().parent().find(".valoreLabel"+tag).html(nuovoVal);

                var nuovoValore = element.parent().parent().parent().clone();
                nuovoValore.find(".row").css("display","flex");
                nuovoValore.find(".valoreLabel"+tag).attr("href", nuovoValore.find(".valoreLabel"+tag).attr("href") + "_" + nuovoVal);
                nuovoValore.find(".collapseAdd"+tag).attr("id", nuovoValore.find(".collapseAdd"+tag).attr("id") + "_" + nuovoVal);
                nuovoValore.find(".aggiungi-valore").remove();

                nuovoValore.find(".collapse").removeClass("show");

                $(".valoriList_" + tag).append(nuovoValore);

                element.parent().parent().parent().find(".valore").val("");
                element.parent().parent().parent().find(".cat").val("");
                element.parent().parent().parent().find(".valoriConfronto").val("");

                element.parent().parent().find(".collapse").removeClass("show");
                delete nuovoValore;

                $('.eliminaCampo').on('click', function (e) {
                    e.preventDefault();

                    $(this).parent().parent().parent().fadeOut( 500, function() {
                        $( this ).remove();
                    });
                });
            }


            $('.aggiungi-valore').on('click', function (event) {
                aggiungiValoreFiltro($(this));
            });



            $('.salva-categoria').on('click', function (e) {
                e.preventDefault();

                creaJsonCaratteristiche();
                creaJsonFiltri();

                $("#formCategoria").submit();
            });

            $("#formCategoria").on('submit', function (e) {
                if ($("#jsonCaratteristiche").val() == "") {
                    e.preventDefault();
                    //{"offro_cerco":{"label":"Tipo di annuncio","field":"input","type":"checkbox","default":"Offro","main":1,"required":1,"readonly":0,"ord":"1","parent":"","values":["Offro","Cerco"]},"tipologia":{"label":"Tipologia","field":"select","type":"text","default":"","main":1,"required":1,"readonly":0,"ord":"2","parent":"childNotRequired","values":["Seleziona","Negozio","Laboratorio","Studio","Studio condiviso","Ufficio","Ufficio condiviso","Magazzino o deposito","Capannone","Autorimessa","Casa di cura","Azienda agricola","Impianti sportivi","Showroom o open space","Stabile o palazzo","Albergo","Centro commerciale","Altro",""]},"contratto":{"label":"Contratto","field":"input","type":"text","default":"","main":1,"required":1,"readonly":0,"ord":"3","parent":"","values":["Seleziona","Vendita","Affitto","Asta"]},"contratto_affitto":{"label":"Contratto Affitto","field":"input","type":"text","default":"","main":1,"required":1,"readonly":0,"ord":"4","parent":"","values":["Seleziona","6+6","9+9"]},"data_vendita":{"label":"Data vendita","field":"input","type":"text","default":"","main":1,"required":1,"readonly":0,"ord":"5","parent":"","values":[""]},"disponibilita":{"label":"Disponibilit\u00e0","field":"select","type":"text","default":"","main":1,"required":1,"readonly":0,"ord":"6","parent":"childNotRequired","values":["Seleziona","Libero","Occupato"]},"superficie":{"label":"Superficie","field":"input","type":"number","default":"","main":0,"required":0,"readonly":0,"ord":"7","parent":"","values":[""]},"superficie_esterna":{"label":"Superfice esterna","field":"input","type":"number","default":"","main":0,"required":0,"readonly":0,"ord":"8","parent":"","values":[""]},"piano":{"label":"Piano","field":"select","type":"text","default":"","main":0,"required":0,"readonly":0,"ord":"9","parent":"childNotRequired","values":["Seleziona","Interrato","Seminterrato","Piano strada","Piano terra","Piano ammezzato","Piano rialzato","1","2","3","4","5","6","7","8","9","10",">11","su pi\u00f9 livelli"]},"bagni":{"label":"Bagni","field":"input","type":"number","default":"","main":0,"required":0,"readonly":0,"ord":"10","parent":"","values":[""]},"parcheggi":{"label":"Parchieggi","field":"select","type":"text","default":"","main":0,"required":0,"readonly":0,"ord":"11","parent":"childNotRequired","values":["Seleziona","Posto auto","Parcheggio clienti","Ampio parcheggio"]},"spazio_esterno":{"label":"Spazio esterno","field":"input","type":"checkbox","default":"","main":0,"required":0,"readonly":0,"ord":"12","parent":"","values":["S\u00ec"]},"arredamento":{"label":"Arredamento","field":"select","type":"text","default":"","main":0,"required":0,"readonly":0,"ord":"13","parent":"childNotRequired","values":["Seleziona","Arredato","Stigliato","Vuoto"]},"caratteristiche":{"label":"Caratteristiche","field":"input","type":"checkbox","default":"","main":0,"required":0,"readonly":0,"ord":"14","parent":"","values":["Ascensore","Condizionatore","Allarme","Cablato","Con reception","Canna fumaria","Sottonegozio","Magazzino"]}}
                    //11 - Messaggi
                    //{"offro_cerco":{"label":"Tipo di annuncio","field":"input","type":"radio","default":"Offro","main":1,"required":1,"readonly":0,"ord":"1","parent":"","values":["Offro","Cerco"]},"tipologia":{"label":"Tipologia","field":"input","type":"text","default":"","main":1,"required":1,"readonly":0,"ord":"2","parent":"","values":["Seleziona","Messaggi","Smarrimenti"]}}
                }
            });


            function gestioneModFiltri(element) {
                    //console.log("aa" + $(this).find("option:selected").val());
                    if (element.find("option:selected").val() == "multi-value") {
                        element.parent().parent().parent().find(".valori").css("display","none");
                        element.parent().parent().parent().find(".valori_new").parent().removeClass("hidden");
                        element.parent().parent().next().find(".valoriList").next().css("display","flex");
                        element.parent().parent().next().find(".valoriList").removeClass("hidden");
                    } else {
                        element.parent().parent().parent().find(".valori").css("display","block");
                        element.parent().parent().parent().find(".valori_new").parent().removeClass("hidden").addClass("hidden");
                        element.parent().parent().next().find(".valoriList").next().css("display","none");
                        element.parent().parent().next().find(".valoriList").removeClass("hidden").addClass("hidden");
                    }
            }

            $('#filtri .collapse .mod').on('change', function (event) {
                gestioneModFiltri($(this));
            });
            $('#filtri .collapse .mod').trigger("change");


            $('#filtri select').on('change', function (event) {
                $(this).find("option").removeAttr("selected");
                $(this).find("option:selected").attr("selected","selected");
            });
            $('#caratteristiche select').on('change', function (event) {
                $(this).find("option").removeAttr("selected");
                $(this).find("option:selected").attr("selected","selected");
            });



            $(".categorieList").sortable({
                items: "> div",
                stop: function (event, ui) { //dopo che ordina..
                    var countCat = 1;
                    var arraySorted = [];
                    $( ".categoryParent" ).each(function( i ) {
                        $(this).attr("data-ord", countCat);
                        arraySorted.push({"id": $(this).attr("data-id"), "ord": countCat });
                        countCat++;
                    });

                    var jsonData = JSON.stringify(arraySorted);

                    $.ajax({
                        url: liveSite + "api/sortCategory",
                        data: { myArray : jsonData },
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        type: "GET",
                        success: function (data) {
                            //console.log("Categorie ordinate");
                            //console.log(data);
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            //console.log("Errore ajax ordinamento");
                        }
                    });
                }
            });
            $(".children").sortable({
                items: "> div",
                tolerance: "pointer",
                containment: "parent",
                stop: function (event, ui) { //dopo che ordina..
                    var countCat = 1;
                    var arraySorted = [];
                    $(this).find(".categoryChild" ).each(function( i ) {
                        $(this).attr("data-ord", countCat);
                        arraySorted.push({"id": $(this).attr("data-id"), "ord": countCat });
                        countCat++;
                    });

                    var jsonData = JSON.stringify(arraySorted);

                    $.ajax({
                        url: liveSite + "api/sortCategory",
                        data: { myArray : jsonData },
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        type: "GET",
                        success: function (data) {
                            //console.log("Categorie ordinate");
                            //console.log(data);
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            //console.log("Errore ajax ordinamento");
                        }
                    });

                }

                //  containment: "document",
            //  connectWith: '.group-items'
            // Uncomment the two above lines if you want it to go outside its own parent
            });








            break; //fine admin
        case "admin-certificate":

            $(".certificaPagina").change(function() {
                var questo = $(this);

                var certificateStato = $(this).val();
                var idPagina = $(this).attr("data-id");

                jsonData = JSON.stringify({
                    'certificate': parseInt(certificateStato)
                });

                $.ajax({
                    url: liveSite + "api/pro_profiles/" + idPagina,
                    data: jsonData,
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    type: "PUT",
                    success: function (data) {
                        //console.log("certificazione aggiornata con successo");



                        questo.parent().prev().find(".badge").removeClass("badge-warning");
                        questo.parent().prev().find(".badge").removeClass("badge-success");
                        questo.parent().prev().find(".badge").removeClass("badge-danger");
                        if (certificateStato == 1) {
                            questo.parent().prev().find(".badge").addClass("badge-warning");
                            questo.parent().prev().find(".badge").html("In attesa");
                        }
                        if (certificateStato == 2) {
                            questo.parent().prev().find(".badge").addClass("badge-success");
                            questo.parent().prev().find(".badge").html("CERTIFICATO");
                        }
                        if (certificateStato == 0) {
                            questo.parent().prev().find(".badge.badge-danger").show();
                            questo.parent().prev().find(".badge").addClass("badge-danger");
                            questo.parent().prev().find(".badge").html("Non certificato");
                        }
                        if (certificateStato == 10) {
                            questo.parent().prev().find(".badge.badge-danger").show();
                            questo.parent().prev().find(".badge").addClass("badge-danger");
                            questo.parent().prev().find(".badge").html("Rifiutato");
                        }

                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        //console.log("Errore ajax certificazione pagina");
                    }
                });

            });
            break;

        case "admin-gallery":

                function rimuoviImmagineHtml(elemento) {
                    var idImmagine = elemento.attr("data-id-immagine");

                    if (elemento.parent().parent().parent().next().length == 0) {
                        $(".carousel-inner .carousel-item:first-child").addClass("active");
                    } else {
                        elemento.parent().parent().parent().next().addClass("active");
                    }

                    elemento.parent().parent().parent().remove();
                    $(".id-immagine[data-id-immagine=" + idImmagine + "]").parent().remove();
                }

                $(".elimina-immagine-gallery").click(function() {
                    var idImmagine = $(this).attr("data-id-immagine");
                    var elemento = $(this);

                    $.ajax({
                        url: liveSite + "api/images/" + idImmagine,
                        data: JSON.stringify({}),
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        type: "DELETE",
                        success: function (data) {
                            //console.log("immagine eliminata con successo");
                            //console.log(data);

                            rimuoviImmagineHtml(elemento);
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            //console.log("Errore ajax delete immagine");
                        }
                    });

                });



                $(".pubblica-immagine-gallery").click(function() {
                    var jsonData = JSON.stringify({
                        'stato': 1
                    });

                    var idImmagine = $(this).attr("data-id-immagine");
                    var elemento = $(this);
                    $.ajax({
                        url: liveSite + "api/images/" + idImmagine,
                        data: jsonData,
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        type: "PUT",
                        success: function (data) {
                            //console.log("stato aggiornato con successo");
                            //console.log(data);

                            rimuoviImmagineHtml(elemento);
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            //console.log("Errore ajax stato immagine");
                        }
                    });

                });



            break;

        case "admin-uscita":

            $("#uscitaGiornale").focusout(function() {
                $("#btn-aggiungi-uscita").removeClass("disabled")
                if ($(this).val() != "") {
                    $("#btn-aggiungi-uscita").removeClass("disabled")

                    var uscita = $("#uscitaGiornale").val();
                    //console.log(uscita);
                    $("#uscita").val(uscita);


                } else {
                    $("#btn-aggiungi-uscita").addClass("disabled")
                }
            });

            $('.datepicker').datetimepicker('destroy');
            $('.datepicker').datetimepicker({
                format: 'DD/MM/YYYY',
                useCurrent: false,
                minDate: new Date(),
                icons: {
                    up: "fa fa-chevron-circle-up",
                    down: "fa fa-chevron-circle-down",
                    next: 'fa fa-chevron-circle-right',
                    previous: 'fa fa-chevron-circle-left'
                }
            });

            break;

        case "login":
            $( ".recuperaToggle" ).click(function() {
                if ($(this).hasClass("recupera")) {
                    $(this).removeClass("recupera")
                    $("#username").attr("required","required");
                    $("#password").attr("required","required");
                    $("#recuperaPassword").attr("required",false);
                } else {
                    $(this).addClass("recupera")
                    $("#username").attr("required",false);
                    $("#password").attr("required",false);
                    $("#recuperaPassword").attr("required","required");
                }

            });


            break;


        case "homepage": // ################################### ANNUNCI

            function verificaPossibilitaCerca() {
                if ($('#category-filter').val() == "" && $("#keyword").val() == "" && ($("#doveZone").val() == "" && $("#doveComuni").val() == "" && $("#doveProvince").val() == "")) {
                    $(".main-search-submit").prop("disabled", true);
                    $(".main-search-submit").css("cursor", "no-drop");
                } else {
                    $(".main-search-submit").prop("disabled", false);
                    $(".main-search-submit").css("cursor", "default");
                }
            }
            $('#category-filter').on('change', function (e) {
                verificaPossibilitaCerca();
            });
            $('#keyword').on('keyup', function (e) {
                verificaPossibilitaCerca();
            });
            $('.conferma-ricerca').on('click', function (e) {
                verificaPossibilitaCerca();
            });


            $('.main-search-submit').on('click', function (e) {
                var form = $("#form-main-search");

                if (!form.hasClass('pending')) {
                    e.preventDefault();


                    var jsonData = JSON.stringify({
                        'titolo': $("#keyword").val()
                    });

                    $.ajax({
                        url: liveSite + "api/ricerche_popolaris.json",
                        data: 'titolo=' + $("#keyword").val(),
                        dataType: "json",
                        type: "GET",
                        success: function (data) {
                            //console.log(data.length);

                            if (data.length > 0) {
                                //update
                                $.ajax({
                                    url: liveSite + "api/ricerche_popolaris/" + data[0].id,
                                    data: JSON.stringify({'count': data[0].count + 1}),
                                    dataType: "json",
                                    contentType: "application/json; charset=utf-8",
                                    type: "PUT",
                                    success: function (data) {
                                        //console.log("aggiornato count ricerca esistente");
                                        //console.log(data);

                                        form.submit();
                                    },
                                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                                        //console.log("Errore ajax");
                                    }
                                });
                            } else {
                                //insert
                                $.ajax({
                                    url: liveSite + "api/ricerche_popolaris",
                                    data: jsonData,
                                    dataType: "json",
                                    contentType: "application/json; charset=utf-8",
                                    type: "POST",
                                    success: function (data) {
                                        //console.log("ricerca inserita per la prima volta");
                                        //console.log(data);

                                        form.submit();
                                    },
                                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                                        //console.log("Errore ajax");
                                    }
                                });
                            }
                        }
                    });
                }

            });


            $.each($("#all-categories-home .noChild h3"), function (key, val) {
                var h3 = $(this).clone().css("font-size","14px");
                h3.appendTo(".listaNoFigli");
                $(this).parent().remove();
            });






            var scriptTestMappaRicerca = document.createElement('script'); scriptTestMappaRicerca.type = 'text/javascript';
            scriptTestMappaRicerca.src = liveSite + 'js/scriptsMappaRicerca2.js'; $('head').append(scriptTestMappaRicerca);


            break;



        case "shoppingPro":
            //console.log("route shopping");
            $(".clickAnnullaAbb").on("click", function (e) {
                //e.preventDefault();
                var idOrder = $(this).attr("data-order");
                var scadenzaAbb = $(this).attr("data-scadenzaabb");
                //console.log("Ordine: " + idOrder);
                $(".annulla-abb-pagina").attr("data-ordine", idOrder);

                $(".scadenza-abb").html("(" + scadenzaAbb + ")");

            });


            $(".annulla-abb-pagina").on("click", function (e) {
                e.preventDefault();

                var idOrder = $(this).attr("data-ordine");

                var today = new Date();
                var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                var dateTime = date+' '+time;

                jsonData = JSON.stringify({
                    'annullato': 1,
                    'statoOrdine': 0,
                    'annullatoData': dateTime
                });

                $.ajax({
                    url: liveSite + "api/orders/" + idOrder,
                    data: jsonData,
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    type: "PUT",
                    success: function (data) {
                        //console.log("ordine annullato con successo");

                        $("#annullaAbbPagina .modal-body .form-group").hide();
                        $("#annullaAbbPagina .modal-body .alert-success").show();
                        $("#annullaAbbPagina .annulla-abb-pagina").hide();

                        window.location.href = location.href + "?annullato=true";

                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        //console.log("Errore ajax annullamento ordine");
                    }
                });
            });









        break;


        case "announcement": // ################################### ANNUNCI
        case "announcement-list":
        case "profilePro":
        case "profile":

            if (route == "announcement-list") {
                var scriptTestMappaRicerca = document.createElement('script'); scriptTestMappaRicerca.type = 'text/javascript';
                scriptTestMappaRicerca.src = liveSite.replace("index.php/","") + 'js/scriptsMappaRicerca2.js'; $('head').append(scriptTestMappaRicerca);
            }


            //carico scripts-announcements.js
            var scriptMaps = document.createElement('script'); scriptMaps.type = 'text/javascript';
            scriptMaps.src = liveSite.replace("index.php/","") + 'js/scripts-announcements.js'; $('head').append(scriptMaps);

            //carico scripts-comments.js
            var scriptComments = document.createElement('script'); scriptComments.type = 'text/javascript';
            scriptComments.src = liveSite.replace("index.php/","") + 'js/scripts-comments.js'; $('head').append(scriptComments);
            //console.log(scriptComments.src);


            //carico scriptsMappaAnnunci.js
            var scriptMaps = document.createElement('script'); scriptMaps.type = 'text/javascript';
            scriptMaps.src = liveSite.replace("index.php/","") + 'js/scriptsMappaAnnunci.js'; $('head').append(scriptMaps);

            if (route == "announcement") {
                var scriptCount = document.createElement('script'); scriptCount.type = 'text/javascript';
                scriptCount.src = liveSite.replace("index.php/","") + 'js/scripts-count-announcement.js'; $('head').append(scriptCount);
            }



            //// Gestione Follow / Segui
            $(".follow").on("click", function (e) {
                e.preventDefault();

                if (!$(this).hasClass("segui-gia")) {
                    var idSegue = $(this).attr("data-id-segue");
                    var idSeguito = $(this).attr("data-id-seguito");
                    var utente = $(this).attr("data-utente");

                    var jsonData = JSON.stringify({'profile': {'id': parseInt(idSegue)}, 'followProfile': parseInt(idSeguito), 'followProfilePro': 0});

                    //console.log(jsonData);

                    $.ajax({
                        url: liveSite + "api/follower_profiles",
                        data: jsonData,
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        type: "POST",
                        success: function (data) {
                            //console.log("Follow aggiunto con successo");
                            //console.log(data);

                            $(".follow").html("segui già");
                            $(".follow").addClass("segui-gia");
                            $(".follow").css("pointer-events", "auto");
                            $(".follow").css("cursor", "pointer");
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            //console.log("Errore ajax");
                        }
                    });
                }
            });

            //// Gestione Salva Ricerca (annunci)
            $(".salvaRicerca").on("click", function (e) {
                e.preventDefault();

                var salvaRicerca = $(this);

                var profile = salvaRicerca.attr("data-profile");
                var search = $("#keyword").val();
                var category = $("#category-filter").val();
                var dove = $("#dove").attr("placeholder");
                var queryString = window.location.href;

                var jsonData = "";

                if (category != "") {
                     jsonData = JSON.stringify({
                        'profile': {'id': parseInt(profile)},
                        'category': {'id': parseInt(category)},
                        'search': search,
                        'dove': dove,
                        'altro': queryString
                     });
                } else {
                    jsonData = JSON.stringify({
                        'profile': {'id': parseInt(profile)},
                        'category': null,
                        'search': search,
                        'dove': dove,
                        'altro': queryString
                    });
                }

                //console.log(jsonData);

                //console.log(jsonData);
                $(".alert-saveSearch").css("display", "block");
                setTimeout(function(){
                    $(".alert-saveSearch").css("display", "none");
                }, 5000);

                $.ajax({
                    url: liveSite + "api/search_saves",
                    data: jsonData,
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    type: "POST",
                    success: function (data) {
                        //console.log("Ricerca salvata con successo");
                        //console.log(data);


                        salvaRicerca.find("i").removeClass("far").addClass("fas");
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        $(".alert-saveSearch").css("display", "none");
                        //console.log("Errore ajax");
                    }
                });

            });


            $('.deleteSaveSearch').on('click', function (event) {
                event.preventDefault();
                var deleteLink  = $(this);
                var id = $(this).attr("data-id");

                $.ajax({
                    url: liveSite + "api/search_saves/" + id,
                    data: '',
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    type: "DELETE",
                    success: function (data) {
                        //console.log("Ricerca eliminata con successo. id: " + id);

                        deleteLink.parent().parent().hide("slow");
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        //console.log("Errore ajax delete ricerca");
                    }
                });
            });

            $('.deletePreferred').on('click', function (event) {
                event.preventDefault();
                var deleteLink  = $(this);
                var id = $(this).attr("data-id");

                $.ajax({
                    url: liveSite + "api/notifications/" + id,
                    data: '',
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    type: "DELETE",
                    success: function (data) {
                        //console.log("Notifica eliminata con successo. id: " + id);

                        deleteLink.parent().parent().parent().parent().parent().parent().hide("slow");
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        //console.log("Errore ajax delete ricerca");
                    }
                });
            });


            var primoTriggerFiltri = 0;
            var primoChangeOffroCerco = 0;
            $('#category-filter').on('change', function (e) {
                var id = $(this).val();
                var elemento = $(this);

                $(".filters").hide();
                $(".filters").find("input").prop("disabled", true);
                $(".filters").find("select").prop("disabled", true);

                $("#main-filters-"+id).find("input").prop("disabled", false);
                $("#main-filters-"+id).find("select").prop("disabled", false);

                //visto che cè un trigger change al primo caricamento (per selezionare i filtri giusti) non eseguiamo questo codice la prima volta
                if (primoTriggerFiltri == 1) {
                    $("#main-filters-" + id + " select").each(function () {
                        $(this).val("");
                        $(this).trigger("change");
                    });
                    $("#main-filters-" + id + " input").each(function () {
                        $(this).val("");
                    });
                }

                $("#main-filters-"+id).find(".hidden select").prop("disabled", true);
                $("#main-filters-"+id).show();



                $("#main-filters-"+id).find("#contratto").removeAttr("readonly");

                if (id == 16) {
                    console.log($("#main-filters-16").find("#contratto").val());
                    if ($("#main-filters-16").find("#contratto").val() == null) {
                        $("#main-filters-16").find("#contratto option[value='Cessione']").prop("selected",true);
                    }
                }


                //console.log("ASSSSSS" + $("#main-filters-"+id).find("#contratto").val());


                if ($(this).find(":selected").attr("data-contratto") == "Affitto") {
                    $("#main-filters-"+id).find("#contratto option[value='Affitto']").prop("selected",true);
                    $("#main-filters-"+id).find("#contratto").attr("readonly","readonly");
                    $("#main-filters-"+id).find("#contratto option[value='Affitto']").trigger("change");
                }
                if ($(this).find(":selected").attr("data-contratto") == "Vendita") {
                    if ($("#main-filters-"+id).find("#contratto").val() == null && primoTriggerFiltri == 1) {
                        $("#main-filters-"+id).find("#contratto option[value='Vendita']").prop("selected",true);
                        $("#main-filters-"+id).find("#contratto").attr("readonly","readonly");
                    }
                    $("#main-filters-"+id).find("#contratto option[value='Vendita']").trigger("change");

                }
                if ($(this).find(":selected").attr("data-contratto") == "Asta") {
                    $("#main-filters-"+id).find("#contratto option[value='Asta']").prop("selected",true);
                    $("#main-filters-"+id).find("#contratto").attr("readonly","readonly");
                    $("#main-filters-"+id).find("#contratto option[value='Asta']").trigger("change");
                }
                if ($("#main-filters-"+id).find("#contratto") == "Cessione" ) {
                    $("#main-filters-"+id).find("#contratto option[value='Cessione']").prop("selected",true);
                    $("#main-filters-"+id).find("#contratto").attr("readonly","readonly");
                    $("#main-filters-"+id).find("#contratto option[value='Cessione']").trigger("change");
                }
                if ($("#main-filters-"+id).find("#contratto") == "Gestione" ) {
                    $("#main-filters-"+id).find("#contratto option[value='Gestione']").prop("selected",true);
                    $("#main-filters-"+id).find("#contratto").attr("readonly","readonly");
                    $("#main-filters-"+id).find("#contratto option[value='Gestione']").trigger("change");
                }
                if ($("#main-filters-"+id).find("#contratto") == "Franchising" ) {
                    $("#main-filters-"+id).find("#contratto option[value='Franchising']").prop("selected",true);
                    $("#main-filters-"+id).find("#contratto").attr("readonly","readonly");
                    $("#main-filters-"+id).find("#contratto option[value='Franchising']").trigger("change");
                }

                primoTriggerFiltri = 1;


                if (primoChangeOffroCerco == 1) {
                    var offroCercaReadonly = $('#category-filter option[value=' + id + ']').attr("data-offro-cerco-readonly");
                    var offroCercaDefault = $('#category-filter option[value=' + id + ']').attr("data-offro-cerco-default");

                    if (offroCercaDefault == "Cerco") {
                        $('.offroCerco .btn').removeClass("active").removeClass("focus");
                        $("#cerco").parent().addClass("active").addClass("focus");
                        $('#offro_cerco').val($('.offroCerco .btn.active').find("input").val());
                    } else {
                        $('.offroCerco .btn').removeClass("active").removeClass("focus");
                        $("#offro").parent().addClass("active").addClass("focus");
                        $('#offro_cerco').val($('.offroCerco .btn.active').find("input").val());
                    }

                    $('.offroCerco .btn').removeClass("disabled");
                    if (offroCercaReadonly == 1) {
                        $('.offroCerco .btn').addClass("disabled");
                        $('.offroCerco .btn.active').removeClass("disabled");
                    }

                }
                primoChangeOffroCerco = 1;


                //console.log(elemento.attr("data-parent"));

                if ($(this).find(":selected").attr("data-parent") != "Immobiliare") { //se sono su residenziale (vendite o affitto indifferente)
                    if ($("#doveZone").val() != "") {
                        $("#doveZone").val("");
                        $("#doveComuni").val(6915); //siccome non sono più su residenziale e provengo da zone, metto solo roma
                        $("#dove").attr("placeholder","Roma");
                    }
                }



            });



            break;


        case "announcement-edit":

            affixStep();
            affixEdit();

            function isUpperCase(str) {
                return str === str.toUpperCase();
            }

            $('input, textarea').on('focusout', function (e) {
                var stringa = $(this).val();
                //elimino eventuali spazi iniziali
                for (var i=0; i<stringa.length; i++) {
                    if (stringa[0] == " ") {
                        stringa = stringa.substr(1);
                        i--;
                    }
                }
                //se è tutta maiuscola
                // if (isUpperCase(stringa)) {
                //     stringa = stringa.toLowerCase();
                //     stringa = stringa.substr(0,1).toUpperCase() + stringa.substr(1);
                //     //console.info("MAIUSCOLA");
                // } else {
                //     //console.info("ALTRO");
                //     stringa = stringa.substr(0,1).toUpperCase() + stringa.substr(1);
                // }

                $(this).val(stringa);

            });


            $("#regalo").change(function(event) {
                if ($(this).is(":checked")) {
                    $("#prezzo").val(0);
                    $("#prezzo").prop("readonly",true);
                } else {
                    $("#prezzo").val("");
                    $("#prezzo").prop("readonly",false);
                }
            });

            $("#category-filter-mobile").change(function(event) {
                $("#Cosa").remove();

                var idCat = $(this).val();
                var nomeParent = $(this).find(":selected").attr("data-parent");
                var contratto = $(this).find(":selected").attr("data-contratto"); //non è detto che esista


                //console.log("nomeParent");
                //console.log(nomeParent);
                $("#list-tab.list-group").find("a[data-titolo='"+nomeParent+"']").trigger("click");

                if ($(".child-cat-" + idCat).length) {
                    $(".child-cat-" + idCat).trigger("click");
                }


            });



            function avanzamentoCategoriaInserzione1 (dataId) {
                if (dataId == "") {
                    $('input#category').val("");
                    //$('.cat-breadcrumbs').removeClass("alert-success").addClass("alert-warning");
                    $('.category-loader .loaded').css("width","50%");
                    $('.category-loader .fa-check-circle').remove();
                    $('.category-loader .fa-exclamation-circle').remove();
                    //$('.category-loader h3').prepend('<i class="fas fa-exclamation-circle step-nook float-right"></i>');


                } else {
                    $('input#category').val(dataId);
                    //$('.cat-breadcrumbs').removeClass("alert-warning").addClass("alert-success");
                    $('.category-loader .loaded').css("width","100%");
                    $('.category-loader .fa-check-circle').remove();
                    $('.category-loader .fa-exclamation-circle').remove();
                    //$('.category-loader h3').prepend('<i class="fas fa-check-circle step-ok float-right"></i>');

                    $("#requiredCategory").hide();
                }
            }
            function avanzamentoCategoriaInserzione2 () {
                    $('.category-loader .loaded').css("width","100%");
                    $('.category-loader .fa-check-circle').remove();
                    $('.category-loader .fa-exclamation-circle').remove();
                //$('.category-loader h3').prepend('<i class="fas fa-check-circle step-ok float-right"></i>');

            }
            function avanzamentoCategoriaInserzione3 () {
                //se abbiamo già una categoria, rendiamo attiva la selezione (simulando il suo click)
                var idCategoria = $("#category").val();
                var idCategoriaPadre = $("#category").attr("data-parent");


                console.log("qui entro?" + idCategoria);
                if (idCategoria != "") {
                    if (idCategoriaPadre != "") { //allora ha un padre
                        $("#list-cat-" + idCategoriaPadre).trigger("click");
                        $(".child-cat-" + idCategoria).trigger("click");
                    } else {
                        $("#list-cat-" + idCategoria).trigger("click");
                    }
                }
            }




        titoloFocus = 0;
        testoFocus = 0;

        function prendiValoriCaratt(caratteristiche) {

            if ($("#stato").val() == 0) {


                var carattObj = jQuery.parseJSON(caratteristiche);
                var testoPrecompilato = "";
                var titoloPrecompilato = "";
                var prezzoInserito = 0;
                $.each(carattObj, function (key, valore) {
                    var valoreCampo = "";
                    if (valore.type == "checkbox" || valore.type == "radio") {
                        var valoriCheckbox = "";
                        for (k in valore.values) {
                            var fixValore = valore.values[k].replace(/ /g, '').replace(/\//g, '').replace(/'/g, '');
                            if (fixValore != "" && $("#" + fixValore).is(":checked")) {
                                if ($("#" + fixValore).val() != "Offro") {
                                    valoriCheckbox = valoriCheckbox + " " + $("#" + fixValore).val();
                                }
                            }
                        }
                        valoreCampo = (valoriCheckbox.toLowerCase()).substring(1);
                    } else {
                        valoreCampo = $("#" + key).val();
                    }


                    //per inserire il prezzo
                    if (valore.main == 0 && prezzoInserito == 0) { //il primo NON main che trova
                        var prezzo = "";

                        if ($('#riservata').is(':checked')) {
                            prezzo = $('#riservata').next().html().toLowerCase() + " ";
                        } else if ($('#regalo').is(':checked')) {
                            prezzo = $('#regalo').next().html().toLowerCase() + " ";
                        } else {
                            if ($('#prezzo').val() != "" && $('#prezzo').val() > 0) {
                                prezzo = $('#prezzo').val() + " € ";
                            }
                        }

                        testoPrecompilato = testoPrecompilato + prezzo;
                        prezzoInserito = 1;
                    }

                    if (valoreCampo != undefined && valoreCampo != "") {
                        if (valoreCampo != " Cerco") {
                            var etichettaPrima = "";
                            var etichettaDopo = " ";

                            if (valore.prima != undefined && valore.prima != "") {
                                etichettaPrima = valore.prima + " ";
                            }
                            if (valore.dopo != undefined && valore.dopo != "") {
                                etichettaDopo = " " + valore.dopo + " ";
                            }

                            if (valore.preComp == 1) { // nel titolo
                                if (valore.label == "Tipologia" || valore.label == "Marca" || valore.label == "Modello") {
                                    titoloPrecompilato = titoloPrecompilato + etichettaPrima + valoreCampo + etichettaDopo;
                                } else {
                                    titoloPrecompilato = titoloPrecompilato + etichettaPrima + valoreCampo.toLowerCase() + etichettaDopo;
                                }
                            }
                            if (valore.preComp == 2) { // nel testo
                                testoPrecompilato = testoPrecompilato + etichettaPrima + valoreCampo.toLowerCase() + etichettaDopo;
                            }

                        } else {
                            testoPrecompilato = testoPrecompilato + valoreCampo.toLowerCase();
                        }
                    }

                });

                //console.log("testoPrecompilato:" + testoPrecompilato);

                if ($("#list-tab a[aria-selected=true]").html() == "Immobiliare" || $("#list-tab a[aria-selected=true]").html() == "Motori") {

                    //if ( titoloFocus == 0) {
                        $("#titoloPreComp").val(titoloPrecompilato);
                    //}
                    //if ( testoFocus == 0) {
                        $("#descrizionePreComp").val(testoPrecompilato);
                    //}
                }
                if ($("#list-tab a[aria-selected=true]").html() == "Immobiliare") {
                    if ($("#indirizzo").val() != "") {
                        if ( titoloFocus == 0) {
                            $("#titoloPreComp").val($("#titoloPreComp").val() + "" + $("#indirizzo").val());
                        }
                    }

                    if ($("#comune").val() != "") {
                        //$("#titolo").val($("#titolo").val() + " - " + $("#comune option:selected").html());
                        //$("#titolo").val($("#titolo").val() + " - " + $("#comune").val());
                        if ( titoloFocus == 0) {
                            $("#titoloPreComp").val($("#titoloPreComp").val() + " " + $("#comuneTesto").val());
                        }
                    }
                }
            }
        }

        function preCompilaTitoloAnnuncio() { //gestione pre-compilazione titolo annuncio
        }

        function preCompilaTestoAnnuncio(caratteristiche) { //gestione pre-compilazione TESTO annuncio
            var carattObj = jQuery.parseJSON(caratteristiche);
            //console.log("carattObj:");
            //console.log(carattObj);
            $.each(carattObj, function (key, valore) {
                switch (valore.field) {
                    case "input":
                        if (valore.type == "text" || valore.type == "number") {
                            $("#"+ key ).focusout(function(event) {
                                prendiValoriCaratt(caratteristiche);
                            });
                        }
                        if (valore.type == "checkbox" || valore.type == "radio") {
                            for (k in valore.values) {
                                var fixValore = valore.values[k].replace(/ /g, '').replace(/\//g, '').replace(/'/g, '');
                                if (fixValore != "") {
                                    $("#" + fixValore).change(function (event) {
                                        prendiValoriCaratt(caratteristiche);
                                    });
                                }
                            }
                        }
                        break;
                    case "select":
                        $("#"+ key ).change(function(event) {
                            prendiValoriCaratt(caratteristiche);
                        });
                        break;
                }

            });

            $("#comune").change(function(event) {
                //console.log("Comune selezionato: " + this.options[this.selectedIndex].getAttribute("data-nome"));
                //console.log("Comune provincia: " + this.options[this.selectedIndex].getAttribute("data-provincia"));

                $("#comuneTesto").val(this.options[this.selectedIndex].getAttribute("data-nome"));
                $("#provincia").val(this.options[this.selectedIndex].getAttribute("data-provincia"));
                $("#regione").val(this.options[this.selectedIndex].getAttribute("data-regione"));
                prendiValoriCaratt(caratteristiche);
            });
            $("#indirizzo").focusout(function(event) {
                prendiValoriCaratt(caratteristiche);
            });
            $("#prezzo").focusout(function(event) {
                prendiValoriCaratt(caratteristiche);
            });
            $("#riservata").change(function(event) {
                prendiValoriCaratt(caratteristiche);
            });
            $("#regalo").change(function(event) {
                prendiValoriCaratt(caratteristiche);
            });

        }

        $("#descrizioneLunga").focusout(function(event) {
            testoFocus = 1;
        });
        $("#titolo").focusout(function(event) {
            titoloFocus = 1;
        });



            var titolo = $("#titolo").val();
            //gestione categorie inserzione (Primo livello)
            $('#list-tab a').click(function(event) {
                //console.log("#list-tab a CLICK");
                $('#nav-tabContent .list-group a.list-group-item').removeClass("active");
                $('#nav-tabContent .list-group .list-group-item').removeClass("active");

                var dataId = $(this).attr("data-id");
                //$('.cat-breadcrumbs').show();
                $('.label-cat-1').html($(this).html());
                $('.label-cat-2').html("");

                avanzamentoCategoriaInserzione1(dataId);

                var caratteristiche = $(this).attr("data-caratteristiche");

                var etichettaPrezzo = $(this).attr("data-etichetta-prezzo");
                $(".trattativaRiservata").html(etichettaPrezzo);


                var opzioniPrezzo = $(this).attr("data-opzioni-prezzo");
                $(".box-prezzo .trattativa").hide();
                $(".box-prezzo .regalo").hide();

                if (opzioniPrezzo.indexOf("trattativa") != -1) {
                    $(".box-prezzo .trattativa").show();
                }
                if (opzioniPrezzo.indexOf("regalo") != -1) {
                    $(".box-prezzo .regalo").show();
                }
                if (opzioniPrezzo.indexOf("nessuna") != -1 || opzioniPrezzo.indexOf("null") != -1) {
                    $(".box-prezzo .trattativa").hide();
                    $(".box-prezzo .regalo").hide();
                }

                $('input[type="checkbox"]').on('change', function () {
                    $('input[name="riservata"]').not(this).prop('checked', false);
                });
                // if ($("#stato").val() != 2 && $("#stato").val() != 4 && $("#stato").val() != 1) {
                //     $("#titolo").val("");
                //     $("#descrizioneLunga").val("");
                //     $("#titoloPreComp").val("");
                //     $("#descrizionePreComp").val("");
                // }

                if (titolo == "") {
                    popolaCaratteristiche(caratteristiche);
                }


                $(".caratteristiche-dinamiche select:required").change(function (event) {
                    avanzamentoCaratteristiche();
                });
                $('.caratteristiche-dinamiche input:required').keyup(function (event) {
                    avanzamentoCaratteristiche();
                });
                avanzamentoCaratteristiche();



                if (titolo == "") {
                    var categoria = $(this).html();
                    //gestione Estero - Case Vacanza
                    $(".comune-box").show();
                    $(".estero").parent().hide();
                    if ($(".estero").is(':checked')) {
                        if (categoria != "Immobiliare") {
                            if ($(".estero").is(':checked') == false) {
                                $(".estero").trigger("click");
                            }
                        } else {
                            if ($(".estero").is(':checked') == true) {
                                $(".estero").trigger("click");
                            }
                        }
                    } else {
                        //console.log("Categoria cliccata: " + categoria);
                        if (categoria != "Immobiliare") {
                            if ($(".check-mappa").is(':checked') == true) {
                                $(".check-mappa").trigger("click");
                            }
                        } else {
                            if ($(".check-mappa").is(':checked') == false) {
                                $(".check-mappa").trigger("click");
                            }
                        }
                    }

                    $(".box-prezzo .label-prezzo").html("Prezzo:");
                    $("#prezzo").prop("required", false);
                }






            });
            //gestione categorie inserzione (Secondo livello)
            $('#nav-tabContent .list-group .list-group-item a').click(function(event) {

                $('#nav-tabContent .list-group .list-group-item').removeClass("active");
                $(this).parent().addClass("active")
                $('input#category').val($(this).attr("data-id"));

                avanzamentoCategoriaInserzione2();

                var caratteristiche = $(this).attr("data-caratteristiche");

                var etichettaPrezzo = $(this).attr("data-etichetta-prezzo");
                $(".trattativaRiservata").html(etichettaPrezzo);


                var opzioniPrezzo = $(this).attr("data-opzioni-prezzo");
                $(".box-prezzo .trattativa").hide();
                $(".box-prezzo .regalo").hide();

                if (opzioniPrezzo.indexOf("trattativa") != -1) {
                    $(".box-prezzo .trattativa").show();
                }
                if (opzioniPrezzo.indexOf("regalo") != -1) {
                    $(".box-prezzo .regalo").show();
                }
                if (opzioniPrezzo.indexOf("nessuna") != -1 || opzioniPrezzo.indexOf("null") != -1) {
                    $(".box-prezzo .trattativa").hide();
                    $(".box-prezzo .regalo").hide();
                }

                $('input[type="checkbox"]').on('change', function () {
                    $('input[name="riservata"]').not(this).prop('checked', false);
                });


                if (titolo == "") {
                    $("#titolo").val("");
                    $("#descrizioneLunga").val("");
                    $("#titoloPreComp").val("");
                    $("#descrizionePreComp").val("");
                    popolaCaratteristiche(caratteristiche);
                }

                //$('.cat-breadcrumbs').removeClass("alert-warning").addClass("alert-success");
                $('.label-cat-2').html(" / " + $(this).html());

                $(".caratteristiche-dinamiche select:required").change(function (event) {
                    avanzamentoCaratteristiche();
                });
                $('.caratteristiche-dinamiche input:required').keyup(function (event) {
                    avanzamentoCaratteristiche();
                });

                $("#requiredCategory").hide();


                if (titolo == "") {
                    //gestione Estero - Case Vacanza
                    $(".comune-box").show();
                    $(".estero").parent().hide();
                    if ($(".estero").is(':checked')) {
                        $(".estero").trigger("click");
                    }

                    if ($(this).attr("data-id") == 21) {
                        $(".estero").parent().show();
                    } else {
                        $(".estero").parent().hide();
                    }
                }


                //gestione prezzo obbligatorio
                if ($("#contratto").val() != "Asta" && ($(this).attr("data-id") == 24 || $(this).attr("data-id") == 25 || $(this).attr("data-id") == 15 || $(this).attr("data-id") == 16 || $(this).attr("data-id") == 17 || $(this).attr("data-id") == 19 || $(this).attr("data-id") == 20 || $(this).attr("data-id") == 21)) {
                    $(".box-prezzo .label-prezzo").html("Prezzo: *");
                    $("#prezzo").prop("required", true);
                } else {
                    $(".box-prezzo .label-prezzo").html("Prezzo:");
                    $("#prezzo").prop("required", false);
                }





                avanzamentoCaratteristiche();

            });

            avanzamentoCategoriaInserzione3();


            $("input[name='caratteristiche[offro_cerco]']").change(function(event) {
                console.log($(this).val());
                if ($(this).val() == "Cerco") {
                    $(".box-prezzo .label-prezzo").html("Prezzo:");
                    $("#prezzo").prop("required", false);
                } else {
                    if ($("#category").val() == 24 || $("#category").val() == 25 || $("#category").val() == 15 || $("#category").val() == 16 || $("#category").val() == 17 || $("#category").val() == 19 || $("#category").val() == 20 || $("#category").val() == 21) {
                        $(".box-prezzo .label-prezzo").html("Prezzo: *");
                        $("#prezzo").prop("required", true);
                    } else {
                        $(".box-prezzo .label-prezzo").html("Prezzo:");
                        $("#prezzo").prop("required", false);
                    }
                }
            });

            $("#contratto").change(function(event) {
                if ($(this).val() == "Asta") {
                    $(".box-prezzo .label-prezzo").html("Prezzo:");
                    $("#prezzo").prop("required", false);
                } else {
                    if ($('#Cerco').prop('checked') == false && ($("#category").val() == 24 || $("#category").val() == 25 || $("#category").val() == 15 || $("#category").val() == 16 || $("#category").val() == 17 || $("#category").val() == 19 || $("#category").val() == 20 || $("#category").val() == 21)) {
                        $(".box-prezzo .label-prezzo").html("Prezzo: *");
                        $("#prezzo").prop("required", true);
                    } else {
                        $(".box-prezzo .label-prezzo").html("Prezzo:");
                        $("#prezzo").prop("required", false);
                    }
                }
            });








            //gestione validazione selezione categoria
            // $('#form').submit(function(e) {
            //     //console.log("2222");
            //     if ($('input#category').val() == "") {
            //         $('#requiredCategory').show();
            //         $("html, body").animate({ scrollTop: $('#requiredCategory').offset().top - 220 }, 1000);
            //         return false;
            //     }
            //
            //     if ($('#previews').children().length < 0) {
            //         $('#requiredGallery').show();
            //         $("html, body").animate({ scrollTop: $('#requiredGallery').offset().top - 220 }, 1000);
            //         return false;
            //     }
            //
            //     return true;
            // })

            //gestione offset input required (per colpa dell'header)
            var delay = 0;
            var offset = 220;
            document.addEventListener('invalid', function(e){
                //console.log("1111");

                //gestione validazione categoria
                if ($('input#category').val() == "") {
                    $('#requiredCategory').show();
                    $("html, body").animate({ scrollTop: $('#requiredCategory').offset().top - 220 }, 1000);
                    return false;
                }

                $(e.target).addClass("invalid");
                $('html, body').animate({scrollTop: $($(".invalid")[0]).offset().top - offset }, delay);
                $("#comune").hide();
            }, true);
            document.addEventListener('change', function(e){
                $(e.target).removeClass("invalid")
            }, true);


            //console.log("script chosen bug required")
            $('.pubblica').on('click', function (e) {
                $("#comuneBlocco").val($("#comune").val());
                if ($("#comuneBlocco").val() == "") {
                    $("#comune_chosen a").css("border", "1px solid #ff0000");
                } else {
                    $("#comune_chosen a").css("border", "1px solid #cccccc");
                }

            });
            $('.chosen').on('change', function (e) {
                $("#comuneBlocco").val($("#comune").val());
                if ($("#comuneBlocco").val() == "") {
                    $("#comune_chosen a").css("border", "1px solid #ff0000");
                } else {
                    $("#comune_chosen a").css("border", "1px solid #cccccc");
                }
            });



            //gestione telefoni obbligatori
            var $inputs = $('#telefono,#cellulare');
            $inputs.on('keyup', function () {
                // Set the required property of the other input to false if this input is not empty.
                $inputs.not(this).prop('required', !$(this).val().length);
            });




        function changeCaratteristicheDinamiche() {
                $(".caratteristiche-dinamiche select").on("change", function () {
                    if ($(".caratteristiche-dinamiche select[data-parent='" + $(this).val() + "']").length == 1) {
                        $(".caratteristiche-dinamiche select").parent().parent().addClass("hidden");
                        $(".caratteristiche-dinamiche select").removeAttr("required");
                        $(".caratteristiche-dinamiche select[data-parent='']").parent().parent().removeClass("hidden");
                        //$(".caratteristiche-dinamiche select[data-parent='']").attr("required","required");
                        $(".caratteristiche-dinamiche select[data-parent='childNotRequired']").parent().parent().removeClass("hidden");
                        $(".caratteristiche-dinamiche select[data-parent='childNotRequired']").not('.noRequired').attr("required","required");
                        $(".caratteristiche-dinamiche select[data-parent='" + $(this).val() + "']").parent().parent().removeClass("hidden");
                        //$(".caratteristiche-dinamiche select[data-parent='" + $(this).val() + "']").attr("required","required");
                        //console.log($(this).val()  + " esiste!");
                    } else {
                        if($(this).hasClass("childNotRequired")) {
                            $(".caratteristiche-dinamiche select").parent().parent().addClass("hidden");
                            $(".caratteristiche-dinamiche select").removeAttr("required");
                            $(".caratteristiche-dinamiche select[data-parent='']").parent().parent().removeClass("hidden");
                            //$(".caratteristiche-dinamiche select[data-parent='']").attr("required","required");
                            $(".caratteristiche-dinamiche select[data-parent='childNotRequired']").parent().parent().removeClass("hidden");
                            $(".caratteristiche-dinamiche select[data-parent='childNotRequired']").not('.noRequired').attr("required","required");

                        }
                    }
                });
            }
            function changeCaratteristicheDinamicheMain() {
                $(".caratteristicheMain-dinamiche select").on("change", function () {
                    if ($(".caratteristicheMain-dinamiche select[data-parent='" + $(this).val() + "']").length == 1) {
                        $(".caratteristicheMain-dinamiche select").parent().parent().addClass("hidden");
                        $(".caratteristicheMain-dinamiche select").removeAttr("required");
                        $(".caratteristicheMain-dinamiche select[data-parent='']").parent().parent().removeClass("hidden");
                        //$(".caratteristiche-dinamiche select[data-parent='']").attr("required","required");
                        $(".caratteristicheMain-dinamiche select[data-parent='childNotRequired']").parent().parent().removeClass("hidden");
                        $(".caratteristicheMain-dinamiche select[data-parent='childNotRequired']").not('.noRequired').attr("required","required");
                        $(".caratteristicheMain-dinamiche select").not('.childNotRequired').val("");
                        $(".caratteristicheMain-dinamiche select[data-parent='" + $(this).val() + "']").parent().parent().removeClass("hidden");
                        //$(".caratteristiche-dinamiche select[data-parent='" + $(this).val() + "']").attr("required","required");
                        //console.log($(this).val()  + " esiste!");
                    } else {
                        if($(this).hasClass("childNotRequired")) {
                            $(".caratteristicheMain-dinamiche select").parent().parent().addClass("hidden");
                            $(".caratteristicheMain-dinamiche select").removeAttr("required");
                            $(".caratteristicheMain-dinamiche select[data-parent='']").parent().parent().removeClass("hidden");
                            //$(".caratteristiche-dinamiche select[data-parent='']").attr("required","required");
                            $(".caratteristicheMain-dinamiche select[data-parent='childNotRequired']").parent().parent().removeClass("hidden");
                            $(".caratteristicheMain-dinamiche select[data-parent='childNotRequired']").not('.noRequired').attr("required","required");
                            $(".caratteristicheMain-dinamiche select").not('.childNotRequired').val("");
                        }
                        //console.log($(this).val()  + " NON esiste!");
                    }

                    if ($(".caratteristicheMain-dinamiche input[data-parent='" + $(this).val() + "']").length == 1) {
                        $(".caratteristicheMain-dinamiche input").parent().parent().addClass("hidden");
                        $(".caratteristicheMain-dinamiche input").removeAttr("required");
                        $(".caratteristicheMain-dinamiche input[data-parent='']").parent().parent().removeClass("hidden");
                        //$(".caratteristiche-dinamiche select[data-parent='']").attr("required","required");
                        $(".caratteristicheMain-dinamiche input[data-parent='childNotRequired']").parent().parent().removeClass("hidden");
                        $(".caratteristicheMain-dinamiche input[data-parent='childNotRequired']").not('.noRequired').attr("required","required");
                        $(".caratteristicheMain-dinamiche input[data-parent='" + $(this).val() + "']").parent().parent().removeClass("hidden");
                    } else {
                        $(".caratteristicheMain-dinamiche input").parent().parent().addClass("hidden");
                        $(".caratteristicheMain-dinamiche input").removeAttr("required");
                        $(".caratteristicheMain-dinamiche input[data-parent='']").parent().parent().removeClass("hidden");
                        //$(".caratteristiche-dinamiche select[data-parent='']").attr("required","required");
                        $(".caratteristicheMain-dinamiche input[data-parent='childNotRequired']").parent().parent().removeClass("hidden");
                        $(".caratteristicheMain-dinamiche input[data-parent='childNotRequired']").not('.noRequired').attr("required","required");
                    }


                    //serviva a qualcosa? (se decommmento, in modifica dà tutte le caratteristiche obbligatorie..

                    // if ($(".caratteristiche-dinamiche select[data-parent='" + $(this).val() + "']").length == 1) {
                    //     $(".caratteristiche-dinamiche select").parent().parent().addClass("hidden");
                    //     $(".caratteristiche-dinamiche select").removeAttr("required");
                    //     $(".caratteristiche-dinamiche select[data-parent='']").parent().parent().removeClass("hidden");
                    //     //$(".caratteristiche-dinamiche select[data-parent='']").attr("required","required");
                    //     $(".caratteristiche-dinamiche select[data-parent='childNotRequired']").parent().parent().removeClass("hidden");
                    //     $(".caratteristiche-dinamiche select[data-parent='childNotRequired']").not('.noRequired').attr("required","required");
                    //     $(".caratteristiche-dinamiche select[data-parent='" + $(this).val() + "']").parent().parent().removeClass("hidden");
                    //     //$(".caratteristiche-dinamiche select[data-parent='" + $(this).val() + "']").attr("required","required");
                    //     //console.log($(this).val()  + " esiste!");
                    // } else {
                    //     if($(this).hasClass("childNotRequired")) {
                    //         $(".caratteristiche-dinamiche select").parent().parent().addClass("hidden");
                    //         $(".caratteristiche-dinamiche select").removeAttr("required");
                    //         $(".caratteristiche-dinamiche select[data-parent='']").parent().parent().removeClass("hidden");
                    //         //$(".caratteristiche-dinamiche select[data-parent='']").attr("required","required");
                    //         $(".caratteristiche-dinamiche select[data-parent='childNotRequired']").parent().parent().removeClass("hidden");
                    //         $(".caratteristiche-dinamiche select[data-parent='childNotRequired']").not('.noRequired').attr("required","required");
                    //     }
                    //     //console.log($(this).val()  + " NON esiste!");
                    // }


                });

            }

            //gestione caratteristiche dinamiche a selezione della categoria
            function popolaCaratteristiche(caratteristiche) {
                var caratteristicheObj = jQuery.parseJSON(caratteristiche);
                //console.log("caratteristicheObj");
                //console.log(caratteristiche);


                if ($("#titolo").val() == "") { //if (!$("#box-caratteristiche").hasClass("exist")) {


                    $(".caratteristiche-dinamiche").html("");
                    $(".caratteristicheMain-dinamiche").html("");

                    if (caratteristiche != 'null' && caratteristiche != null) {

                        $.each(caratteristicheObj, function (key, val) {
                            var showHide = "";
                            var req = "";
                            var classNoRequired = "";
                            var ast = "";

                            if (val.required == 1) {
                                req = " required";
                                ast = " *";
                            } else {
                                classNoRequired = "noRequired";
                            }

                            if (val.parent != "" && val.parent != "childNotRequired") {
                                showHide = "hidden";
                                req = "";
                            }

                            //if (!$("#box-caratteristiche").hasClass("exist")) { // if (1 == 1) { //

                                var htmlCaratteristiche = '<div class="row pt-2 pb-2 ' + showHide + '">';
                                htmlCaratteristiche += '<div class="col-md-3 pb-2 no-gutters text-right">';
                                htmlCaratteristiche += '<label for="' + val.label + '">' + val.label + ast + '</label>';
                                htmlCaratteristiche += '</div>';
                                htmlCaratteristiche += '<div class="col-md-9 pb-2 no-gutters">';
                                if (val.field == "input") {
                                    if (val.type == "checkbox") {
                                        $.each(val.values, function (key2, val2) {
                                            htmlCaratteristiche += '<div class="form-check">';

                                            htmlCaratteristiche += '<input id="' + val2.replace(/ /g, '').replace(/\//g, '') + '" name="crt[' + key + '][]" data-parent="' + val.parent + '" class="form-check-input" value="'+ val2 +'" type="' + val.type + '" ' + req + '>';
                                            if ((val.values).length > 1){
                                                htmlCaratteristiche += '<label for="' + val2 + '" class="form-check-label">' + val2 + '</label> ';
                                            }
                                            htmlCaratteristiche += '</div>';
                                        });
                                    }


                                    if (val.type == "radio") {
                                        $.each(val.values, function (key2, val2) {
                                            var checked = '';
                                            var disabled = '';
                                            if (val.readonly == 1) {
                                                disabled = ' disabled';
                                                //htmlCaratteristiche += '<div class="form-check form-check-inline">';
                                                //htmlCaratteristiche += '<input id="' + val2 + '" name="crt[' + key + ']" data-parent="' + val.parent + '" class="form-check-input" value="'+ val2 +'" type="hidden" ' + req + checked + '>';
                                                //htmlCaratteristiche += '</div">';
                                            }
                                            if (val2 == val.default) {
                                                checked = ' checked';
                                                disabled = '';
                                            }
                                            htmlCaratteristiche += '<div class="form-check form-check-inline">';
                                            htmlCaratteristiche += '<input id="' + val2 + '" name="crt[' + key + ']" data-parent="' + val.parent + '" class="form-check-input" value="'+ val2 +'" type="' + val.type + '" ' + req + checked + disabled +'>';
                                            htmlCaratteristiche += ' <label for="' + val2 + '" class="form-check-label">' + val2 + '</label>';
                                            htmlCaratteristiche += '</div>';
                                        });
                                    }
                                    if (val.type == "text" || val.type == "number" || val.type == "date" || val.type == "calendar") {
                                        htmlCaratteristiche += '<input id="' + key + '" name="crt[' + key + ']" data-parent="' + val.parent + '" class="form-control '+classNoRequired+'" value="" type="' + val.type + '" ' + req + '>';
                                    }
                                }
                                if (val.field == "select") {
                                    htmlCaratteristiche += '<select class="form-control ' + classNoRequired + " " + val.parent + '" id="' + key + '" data-parent="' + val.parent + '" name="crt[' + key + ']" ' + req + '>';
                                    //htmlCaratteristiche += '<option value="">< seleziona ' + key + ' ></option>';
                                    var countFirst = 0;
                                    $.each(val.values, function (key2, val2) {
                                        if (countFirst == 0) {
                                            htmlCaratteristiche += '<option value="">' + val2 + '</option>';
                                        } else {

                                            //if (val2.includes("Anni ")) {
                                            if (val2.indexOf("Anni ") > -1) {
                                                htmlCaratteristiche += '<option value="' + val2.replace('Anni ', '19') + '">' + val2 + '</option>';
                                            } else {
                                                htmlCaratteristiche += '<option value="' + val2 + '">' + val2 + '</option>';
                                            }

                                        }
                                        countFirst++;
                                    });
                                    htmlCaratteristiche += '</select>';
                                }
                                htmlCaratteristiche += '</div>';
                                htmlCaratteristiche += '</div>';


                                if (val.main == 1) {
                                    $(".caratteristicheMain-dinamiche").append(htmlCaratteristiche);
                                } else {
                                    $(".caratteristiche-dinamiche").append(htmlCaratteristiche);
                                }
                            //}

                        });




                        $('#Sì').click(function(event) {
                            if ($(this).is(':checked')) {
                                $(this).parent().parent().parent().parent().find("label[for='Km']").html("Km");
                                $(this).parent().parent().parent().parent().find("#km").prop("required", false);
                            } else {
                                $(this).parent().parent().parent().parent().find("label[for='Km']").html("Km *");
                                $(this).parent().parent().parent().parent().find("#km").prop("required", true);
                            }
                        });






                        changeCaratteristicheDinamiche();
                        changeCaratteristicheDinamicheMain();

                        if ($(".caratteristiche-dinamiche").html() != "") {
                            $(".caratteristiche-loader").show();
                            $("#box-caratteristiche").show();
                        } else {
                            $(".caratteristiche-loader").hide();
                            $("#box-caratteristiche").hide();
                            //console.log("nascondo #box-caratteristiche");
                        }

                        if ($(".caratteristicheMain-dinamiche").html() != "") {
                            $("#box-caratteristicheMain").show();
                        } else {
                            $("#box-caratteristicheMain").hide();
                        }

                    } else {
                        //console.log("box-caratteristiche hide");
                        $(".caratteristiche-loader").hide();
                        $("#box-caratteristiche").hide();
                        $("#box-caratteristicheMain").hide();

                        //console.log("nascondo #box-caratteristiche2");

                    }



                    $("input[name='crt[offro_cerco]']").change(function(event) {
                        //console.log($(this).val());
                        if ($(this).val() == "Cerco") {
                            $(".box-prezzo .label-prezzo").html("Prezzo:");
                            $("#prezzo").prop("required", false);
                        } else {
                            if ($("#category").val() == 24 || $("#category").val() == 25 || $("#category").val() == 15 || $("#category").val() == 16 || $("#category").val() == 17 || $("#category").val() == 19 || $("#category").val() == 20 || $("#category").val() == 21) {
                                $(".box-prezzo .label-prezzo").html("Prezzo: *");
                                $("#prezzo").prop("required", true);
                            } else {
                                $(".box-prezzo .label-prezzo").html("Prezzo:");
                                $("#prezzo").prop("required", false);
                            }
                        }
                    });

                    $("#contratto").change(function(event) {
                        if ($(this).val() == "Asta") {
                            $(".box-prezzo .label-prezzo").html("Prezzo:");
                            $("#prezzo").prop("required", false);
                        } else {
                            if ($('#Cerco').prop('checked') == false && ($("#category").val() == 24 || $("#category").val() == 25 || $("#category").val() == 15 || $("#category").val() == 16 || $("#category").val() == 17 || $("#category").val() == 19 || $("#category").val() == 20 || $("#category").val() == 21)) {
                                $(".box-prezzo .label-prezzo").html("Prezzo: *");
                                $("#prezzo").prop("required", true);
                            } else {
                                $(".box-prezzo .label-prezzo").html("Prezzo:");
                                $("#prezzo").prop("required", false);
                            }
                        }
                    });




                    preCompilaTestoAnnuncio(caratteristiche);
                    preCompilaTitoloAnnuncio();


                } else {

                    changeCaratteristicheDinamiche();
                    changeCaratteristicheDinamicheMain();

                    $(".caratteristiche-loader").show();
                    $("#box-caratteristiche").show();
                }
            }

            if ($(".selectCategories .list-group-item.active a").length) {
                //popolaCaratteristiche($(".selectCategories .list-group-item.active a").attr("data-caratteristiche"));
                //$(".caratteristiche-dinamiche select").trigger("change");

                changeCaratteristicheDinamiche();
                changeCaratteristicheDinamicheMain();

                $("#marca").trigger("change");
            } else if ($("#list-tab .list-group-item-action.active").length) {
                //popolaCaratteristiche($("#list-tab .list-group-item-action.active").attr("data-caratteristiche"));
                //$(".caratteristiche-dinamiche select").trigger("change");

                changeCaratteristicheDinamiche();
                changeCaratteristicheDinamicheMain();

                $("#marca").trigger("change");
            }

            $('#Sì').click(function(event) {
                if ($(this).is(':checked')) {
                    $(this).parent().parent().parent().parent().find("label[for='Km']").html("Km");
                    $(this).parent().parent().parent().parent().find("#km").prop("required", false);
                } else {
                    $(this).parent().parent().parent().parent().find("label[for='Km']").html("Km *");
                    $(this).parent().parent().parent().parent().find("#km").prop("required", true);
                }
            });






            function avanzamentoTitoloDescrizione () {
                var avanzamento = 0;
                if ($("#titolo").val() != "") {
                    avanzamento = avanzamento + 50;
                }
                //if ($("#descrizioneBreve").val() != "") {
                //    avanzamento = avanzamento + 25;
                //}
                if ($("#descrizioneLunga").val() != "") {
                    avanzamento = avanzamento + 50;
                }
                //if ($("#tag").val() != "") {
                //    avanzamento = avanzamento + 25;
                //}
                ////console.log(avanzamento);
                $('.titoloDescrizione-loader .loaded').css("width",avanzamento+"%");
                if (avanzamento == 100) {
                    $('.titoloDescrizione-loader .fa-check-circle').remove();
                    $('.titoloDescrizione-loader .fa-exclamation-circle').remove();
                    //$('.titoloDescrizione-loader h3').prepend('<i class="fas fa-check-circle step-ok float-right"></i>');
                } else {
                    $('.titoloDescrizione-loader .fa-check-circle').remove();
                    $('.titoloDescrizione-loader .fa-exclamation-circle').remove();
                    //$('.titoloDescrizione-loader h3').prepend('<i class="fas fa-exclamation-circle step-nook float-right"></i>');
                }
            }

            $('#titolo, #descrizioneBreve, #descrizioneLunga').keyup(function(event) {
                avanzamentoTitoloDescrizione();
            });
            $('#tag').change(function(event) {
                avanzamentoTitoloDescrizione();
            });
            avanzamentoTitoloDescrizione();


            function avanzamentoIndirizzo () {
                var avanzamento = 0;
                //console.log(avanzamento + 'a');


                if ($('.check-mappa').is(':checked')) {
                    if ($("#comune").val() != "" && $("#indirizzo").val() != "") {
                        avanzamento = 100;
                    } else if ($("#comune").val() != "" || $("#indirizzo").val() != "") {
                        avanzamento = 50;
                    } else {
                        avanzamento = 0;
                    }
                } else {
                    if ($("#comune").val() != "") {
                        avanzamento = 100;
                    } else {
                        avanzamento = 0;
                    }
                }

                //console.log($("#indirizzo").val());
                //console.log(avanzamento + 'b');
                $('.indirizzo-loader .loaded').css("width",avanzamento+"%");
                if (avanzamento == 100) {
                    $('.indirizzo-loader .fa-check-circle').remove();
                    $('.indirizzo-loader .fa-exclamation-circle').remove();
                    //$('.indirizzo-loader h3').prepend('<i class="fas fa-check-circle step-ok float-right"></i>');
                } else {
                    $('.indirizzo-loader .fa-check-circle').remove();
                    $('.indirizzo-loader .fa-exclamation-circle').remove();
                    //$('.indirizzo-loader h3').prepend('<i class="fas fa-exclamation-circle step-nook float-right"></i>');
                }
            }

            $('#indirizzo').focusout(function(event) {
                avanzamentoIndirizzo();
            });
            $('#comune').change(function(event) {
                avanzamentoIndirizzo();
            });
            $('.check-mappa').change(function(event) {
                map.resize();
                avanzamentoIndirizzo();
            });
            //avanzamentoIndirizzo(); //lo si fà già per la mappa



            function avanzamentoPrezzo () {
                var avanzamento = 0;
                if ($(".box-prezzo #prezzo").val() != "") {
                    avanzamento = 100;
                }
                // if ($("#cerco").val() != "" || $("#offro").val() != "") {
                //     avanzamento = 100;
                // }
                if ($("#riservata").is(':checked')) {
                    avanzamento = 100;
                }

                ////console.log(avanzamento);
                $('.prezzo-loader .loaded').css("width",avanzamento+"%");
                if (avanzamento == 100) {
                    $('.prezzo-loader .fa-check-circle').remove();
                    $('.prezzo-loader .fa-exclamation-circle').remove();
                    //$('.prezzo-loader h3').prepend('<i class="fas fa-check-circle step-ok float-right"></i>');
                } else {
                    $('.prezzo-loader .fa-check-circle').remove();
                    $('.prezzo-loader .fa-exclamation-circle').remove();
                    //$('.prezzo-loader h3').prepend('<i class="fas fa-exclamation-circle step-nook float-right"></i>');
                }
            }

            $('.box-prezzo #prezzo').keyup(function(event) {
                avanzamentoPrezzo();
            });
            $('#riservata').change(function(event) {
                if ($(this).is(':checked')) {
                    $('.box-prezzo #prezzo').val("");
                    $('.box-prezzo #prezzo').prop("disabled",true);
                } else {
                    $('.box-prezzo #prezzo').val("");
                    $('.box-prezzo #prezzo').prop("disabled",false);
                }
                avanzamentoPrezzo();
            });
            avanzamentoPrezzo();





            function avanzamentoCaratteristiche () {
                var selectTotali = 0;
                var selectSelezionate = 0;
                var avanzamento = 0;

                $(".caratteristiche-dinamiche input").each(function (index) {
                    if (!$(this).parent().parent().hasClass("hidden")) {
                        if ($(this).val() != "") {
                            selectSelezionate = selectSelezionate + 1;
                        }
                        selectTotali = selectTotali + 1;
                    }
                });
                $(".caratteristiche-dinamiche select").each(function (index) {
                    if (!$(this).parent().parent().hasClass("hidden")) {
                        if ($(this).val() != "") {
                            selectSelezionate = selectSelezionate + 1;
                        }
                        selectTotali = selectTotali + 1;
                    }
                });

                avanzamento = ((selectSelezionate * 100) / selectTotali);
                $('.caratteristiche-loader .loaded').css("width",avanzamento + "%");

                if (avanzamento == 100) {
                    $('.caratteristiche-loader .fa-check-circle').remove();
                    $('.caratteristiche-loader .fa-exclamation-circle').remove();
                    //$('.caratteristiche-loader h3').prepend('<i class="fas fa-check-circle step-ok float-right"></i>');
                } else {
                    $('.caratteristiche-loader .fa-check-circle').remove();
                    $('.caratteristiche-loader .fa-exclamation-circle').remove();
                    //$('.caratteristiche-loader h3').prepend('<i class="fas fa-exclamation-circle step-nook float-right"></i>');
                }

            }

            $(".caratteristiche-dinamiche select:required").change(function(event) {
                avanzamentoCaratteristiche();
            });
            $('.caratteristiche-dinamiche input:required').keyup(function(event) {
                avanzamentoCaratteristiche();
            });


            function avanzamentoImmagini() {
                if ($('#previews').children().length == 0) {
                    $('.immagini-loader .fa-check-circle').remove();
                    $('.immagini-loader .fa-exclamation-circle').remove();
                    //$('.immagini-loader h3').prepend('<i class="fas fa-exclamation-circle step-nook float-right"></i>');
                    $('.immagini-loader .loaded').css("width", "0");
                }
                if ($('#previews').children().length == 1) {
                    $('.immagini-loader .fa-check-circle').remove();
                    $('.immagini-loader .fa-exclamation-circle').remove();
                    //$('.immagini-loader h3').prepend('<i class="fas fa-exclamation-circle step-nook float-right"></i>');
                    $('.immagini-loader .loaded').css("width", "50%");
                }
                if ($('#previews').children().length >= 2) {
                    $('.immagini-loader .fa-check-circle').remove();
                    $('.immagini-loader .fa-exclamation-circle').remove();
                    //$('.immagini-loader h3').prepend('<i class="fas fa-check-circle step-ok float-right"></i>');
                    $('.immagini-loader .loaded').css("width", "100%");
                }
            }

            avanzamentoImmagini();




            //gestione Mappa
            $('#indirizzo').focusout(function(event) {
                var nomeComune = $( "#comune option[value='"+ $('#comune').val()+"']").attr("data-comune");
                if (nomeComune != undefined) { nomeComune = " , " + nomeComune } else {nomeComune = "";}
                //$('.gllpSearchField').val($('#indirizzo').val() + " " + $('#civico').val() + " , " + nomeComune);
                $('.gllpSearchField').val($('#indirizzo').val() + " , " + nomeComune);
            });
            $('#comune').change(function(event) {
                var nomeComune = $( "#comune option[value='"+ $('#comune').val()+"']").attr("data-comune");
                if (nomeComune != undefined) { nomeComune = " , " + nomeComune } else {nomeComune = "";}
                //$('.gllpSearchField').val($('#indirizzo').val() + " " + $('#civico').val() + " , " + nomeComune);
                $('.gllpSearchField').val($('#indirizzo').val() + " , " + nomeComune);
            });
            //$('#indirizzo').trigger("keyup");


            //####### gestione province/comuni/zone
            $('#provincia').change(function(event) {
                var idProvincia = $(this).val();

                $("#comune").attr('disabled', true).trigger("chosen:updated")
                $("#comune option").each(function( index ) {
                    $(this).remove();
                });

                var comune = "";
                if ($("#provincia option[data-comune]").length) {
                    comune = $("#provincia option[data-comune]").attr("data-comune");
                }

                //console.log("comune: ");
                //console.log(comune);

                $.ajax({
                    url: liveSite + "api/comunis.json?provinciaId="+idProvincia,
                    type: 'GET',
                    //data: { "lista": "on" },
                    contentType:'application/json',  // <---add this
                    dataType: 'json',                // <---update this
                    success: function(result) {

                        for (var i=0; i<result.length; i++) {
                            ////console.log(result[i]);
                            var selezionaComune = "";
                            if (result[i].nome == comune) {
                                selezionaComune = "selected";
                            }

                            //per la select originale
                            var option = '<option data-comune="'+result[i].nome+'" value="'+ result[i].id +'" '+selezionaComune+'>'+ result[i].nome +'</option>';
                            $("#comune").append(option);
                            //per il chosen
                            $('#comune').trigger("chosen:updated");
                            $('#comune').removeAttr("disabled");
                            $('#indirizzo').removeAttr("disabled");
                            $('#indirizzo').trigger("keyup");

                        }
                    },
                    error: function(result){ }
                });
            });





            // $('#prezzo').on('focusout', function (e) {
            //     //console.log($(this).val());
            //     //console.log(parseFloat($(this).val()).toFixed(2));
            //     //console.log((parseFloat($(this).val()).toFixed(2)).replace('.', ','));
            //     //$('#prezzo').val((parseFloat($(this).val()).toFixed(2)).replace(',', '.'));
            // });


            $('.modalDeleteAnnouncement').on('click', function (event) {
                var id = $(this).attr("data-id");
                var profile = $(this).attr("data-profile");
                //console.log(id);
                $("#modalDeleteAnnouncement .annuncio-id").val(id);
                $("#modalDeleteAnnouncement .profile-id").val(profile);
            });

            $('.elimina-annuncio').on('click', function (event) {
                event.preventDefault();

                var annuncioId = $("#modalDeleteAnnouncement .annuncio-id").val();
                var profileId = $("#modalDeleteAnnouncement .profile-id").val();


                var jsonData = JSON.stringify({
                    'stato': 10 //eliminato
                });

                $.ajax({
                    url: liveSite + "api/announcements/" + annuncioId,
                    data: jsonData,
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    type: "PUT",
                    success: function (data) {



                        //invalidazione annuncio
                        $.ajax({
                            url: liveSite + "api/clearAnnuncio/" + annuncioId,
                            data: "",
                            dataType: "json",
                            contentType: "application/json; charset=utf-8",
                            type: "GET",
                            success: function (data) {
                                console.log("cache annuncio svuotata");
                            },
                            error: function(XMLHttpRequest, textStatus, errorThrown) {
                                console.log("Errore ajax clear annuncio");
                            }
                        });



                        //console.log("Annuncio eliminato con successo. id: " + annuncioId);
                        $(".chiudi-modal").trigger("click");
                        //$("#announcement-"+annuncioId).hide("slow", function(){ $(this).remove(); })
                        window.location.href = '/profile/'+ profileId +'/announcements';

                        //redirect ai Miei annunci
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        //console.log("Errore ajax delete annuncio");
                    }
                });
            });


            // $('.check-mappa').on('change', function (event) {
            //      if ( $(this).is(':checked') ) {
            //          //$(".gllpSearchButton").trigger("click");
            //          $(".gllpLocationName").val("");
            //      } else {
            //          $(".gllpLocationName").val("");
            //          $(".gllpSearchField").val(", " + $("#comune option:selected").attr("data-nome"));
            //          $(".gllpMap").hide();
            //      }
            // });
            //
            // $('.gllpLocationName').keypress(function (e) {
            //     if (e.which == 13){
            //         $(".gllpSearchButton").trigger("click");
            //         // Avoid form submit
            //         return false;
            //     }
            // });


            //gestione selezione di chi crea l'annuncio
            $(".utenteCrea").click(function(event) {
                //console.log("utenteCrea");
                var id = $(this).attr("data-id");
                $("#utente").val(id);

                var tipo = $(this).attr("data-tipo");
                if (tipo == "pagina") {
                    $("#utenteTipo").val(tipo);
                } else {
                    $("#utenteTipo").val("profile");
                }

                $(".utenteCrea").removeClass("active");
                $(".paginaCrea").removeClass("active");
                $(".utenteCrea").addClass("active");

                $("#list-tab a").show();

                // $("#list-tab a[data-page-pro=1]").show();
                // $(".selectCategories a[data-page-pro=1]").parent().show();

            });
            $(".paginaCrea").click(function(event) {
                //console.log("paginaCrea");
                var id = $(this).attr("data-id");
                $("#utente").val(id);

                var tipo = $(this).attr("data-tipo");
                if (tipo == "pagina") {
                    $("#utenteTipo").val(tipo);
                } else {
                    $("#utenteTipo").val("profile");
                }

                $(".utenteCrea").removeClass("active");
                $(".paginaCrea").removeClass("active");
                $(".paginaCrea").addClass("active");

                var pacchetti = $(this).attr("data-pacchetti");

                $(".caratteristiche-loader").show();

                if ($("#titolo").val() == "") {
                    $("#category").val("");
                    $("#box-caratteristicheMain").hide();
                    $("#box-caratteristiche").hide();
                    $(".selectCategories .list-group-item").removeClass("active");
                }

                switch (pacchetti) {
                    case "immobiliare":
                        $("#list-tab a").not("#list-cat-1").hide();
                        if ($("#titolo").val() == "") {
                            $("#list-cat-1").trigger("click"); //default su immobiliare
                        }
                        //$(".child-cat-15").trigger("click"); //default su residenziale
                        if ($(".check-mappa").is(':checked') == true) {
                            //$(".check-mappa").trigger("click");
                        }

                        break;
                    case "motori":
                        $("#list-tab a").not("#list-cat-2").hide();
                        if ($("#titolo").val() == "") {
                            $("#list-cat-2").trigger("click"); //default su motori
                        }
                        //$(".child-cat-24").trigger("click"); //default su auto
                        if ($(".check-mappa").is(':checked') == true) {
                            $(".check-mappa").trigger("click");
                        }
                        break;
                    case "lavoro":
                        $("#list-tab a").not("#list-cat-3").hide();
                        if ($("#titolo").val() == "") {
                            $("#list-cat-3").trigger("click"); //default su lavoro
                        }
                        //$(".child-cat-31").trigger("click"); //default su offerte di lavoro
                        if ($(".check-mappa").is(':checked') == true) {
                            $(".check-mappa").trigger("click");
                        }
                        break;
                    case "altro":
                        $("#list-tab #list-cat-1").hide();
                        $("#list-tab #list-cat-2").hide();
                        $("#list-tab #list-cat-3").hide();
                        if ($(".check-mappa").is(':checked') == true) {
                            $(".check-mappa").trigger("click");
                        }
                        break;
                }

                if ($(".paginaCrea[data-category]").length != 0) {
                   // $(".child-cat-" + $(".paginaCrea").attr("data-category")).trigger("click");
                }
                    // $("#list-tab a[data-page-pro=1]").hide();
                // $(".selectCategories a[data-page-pro=1]").parent().hide();

            });


            if ($(".paginaCrea[data-category]").length != 0) {
                var pacchetti = $(".paginaCrea[data-category]").attr("data-pacchetti");
                switch (pacchetti) {
                    case "immobiliare":
                        $("#list-tab a").not("#list-cat-1").hide();
                        break;
                    case "motori":
                        $("#list-tab a").not("#list-cat-2").hide();
                        break;
                    case "lavoro":
                        $("#list-tab a").not("#list-cat-3").hide();
                        break;
                    case "altro":
                        $("#list-tab #list-cat-1").hide();
                        $("#list-tab #list-cat-2").hide();
                        $("#list-tab #list-cat-3").hide();
                        break;
                }
            }



            //data-tipoUtente verrà tramite sessioni, a seconda da dove proveniamo. Se da pagina preselezioniamo la pagina
            var tipoUtente = $("#route").attr("data-tipoUtente");
            if (tipoUtente == "profilePro") {
                $(".paginaCrea").trigger("click");
            }



            //carico scripts-mappa-inserimento.js
            var scriptTestMappa = document.createElement('script'); scriptTestMappa.type = 'text/javascript';
            scriptTestMappa.src = liveSite.replace("index.php/","") + 'js/scriptsMappaInserimento.js'; $('head').append(scriptTestMappa);


        break;


        case "profilePro-edit":
        case "profile-edit":
        case "modalLogin":


            //carico scripts-mappa-inserimento.js
            var scriptTestMappa = document.createElement('script'); scriptTestMappa.type = 'text/javascript';
            scriptTestMappa.src = liveSite.replace("index.php/","") + 'js/scriptsMappaInserimento.js'; $('head').append(scriptTestMappa);


            //gestione telefoni obbligatori
            var $inputs = $('#pi,#cf');
            $inputs.on('keyup', function () {
                // Set the required property of the other input to false if this input is not empty.
                $inputs.not(this).prop('required', !$(this).val().length);
            });





            $('.check-mappa').change(function(event) {
                map.resize();
            });

            if (route == "profilePro-edit" || route == "modalLogin") {
                tinymce.init({
                    selector: 'textarea.tinymce',
                    menubar: false,
                    toolbar: 'undo redo | bold italic',
                });
            }



            //gestione Mappa
            $('#indirizzo, #civico').keyup(function(event) {
                var nomeComune = $( "#comune option[value='"+ $('#comune').val()+"']").attr("data-comune");
                if (nomeComune != undefined) { nomeComune = " , " + nomeComune } else {nomeComune = "";}
                $('.gllpSearchField').val($('#indirizzo').val() + " " + $('#civico').val() +  nomeComune);
            });
            $('#comune').change(function(event) {
                var nomeComune = $( "#comune option[value='"+ $('#comune').val()+"']").attr("data-comune");
                if (nomeComune != undefined) { nomeComune = " , " + nomeComune } else {nomeComune = "";}
                $('.gllpSearchField').val($('#indirizzo').val() + " " + $('#civico').val() + " , " + nomeComune);
            });
            $('#indirizzo').trigger("keyup");


            //####### gestione province/comuni/zone
            $('#provincia').change(function(event) {
                var idProvincia = $(this).val();

                $("#comune").attr('disabled', true).trigger("chosen:updated")
                $("#comune option").each(function( index ) {
                    $(this).remove();
                });


                $.ajax({
                    url: liveSite + "api/comunis.json?provinciaId="+idProvincia,
                    type: 'GET',
                    //data: { "lista": "on" },
                    contentType:'application/json',  // <---add this
                    dataType: 'json',                // <---update this
                    success: function(result) {


                        for (var i=0; i<result.length; i++) {
                            ////console.log(result[i]);

                            //per la select originale
                            var option = '<option data-comune="'+result[i].nome+'" value="'+ result[i].id +'">'+ result[i].nome +'</option>';
                            $("#comune").append(option);
                            //per il chosen
                            $('#comune').trigger("chosen:updated");
                            $('#comune').removeAttr("disabled");

                        }
                    },
                    error: function(result){ }
                });
            });



            function avanzamentoDatiAzienda () {
                var avanzamento = 0;
                if ($("#ragioneSociale").val() != "") {avanzamento = avanzamento + 10; }
                if ($("#pi").val() != "") {avanzamento = avanzamento + 10; }
                if ($("#cf").val() != "") {avanzamento = avanzamento + 10; }
                if ($("#legaleNome").val() != "") {avanzamento = avanzamento + 10; }
                if ($("#legaleCognome").val() != "") {avanzamento = avanzamento + 10; }
                if ($("#pec").val() != "") {avanzamento = avanzamento + 10; }
                if ($("#emailContatto").val() != "") {avanzamento = avanzamento + 10; }
                if ($("#telefono").val() != "") {avanzamento = avanzamento + 10; }
                if ($("#cellulare").val() != "") {avanzamento = avanzamento + 10; }
                if ($("#web").val() != "") {avanzamento = avanzamento + 10; }

                ////console.log(avanzamento);
                $('.datiAzienda-loader .loaded').css("width",avanzamento+"%");
                if (avanzamento == 100) {
                    $('.datiAzienda-loader .fa-check-circle').remove();
                    $('.datiAzienda-loader .fa-exclamation-circle').remove();
                    $('.datiAzienda-loader h3').prepend('<i class="fas fa-check-circle step-ok float-right"></i>');
                } else {
                    $('.datiAzienda-loader .fa-check-circle').remove();
                    $('.datiAzienda-loader .fa-exclamation-circle').remove();
                    $('.datiAzienda-loader h3').prepend('<i class="fas fa-exclamation-circle step-nook float-right"></i>');
                }
            }

            // $('#ragioneSociale, #pi, #cf, #legaleNome, #legaleCognome, #pec, #emailContatto, #telefono, #cellulare, #web').keyup(function(event) {
            //     //console.log("keyup");
            //     avanzamentoDatiAzienda();
            // });
            //
            // avanzamentoDatiAzienda();


            function avanzamentoLogo() {
                if ($('#boxUpload #previews').children().length > 0) {
                    $('.logo-loader .fa-check-circle').remove();
                    $('.logo-loader .fa-exclamation-circle').remove();
                    $('.logo-loader h3').prepend('<i class="fas fa-check-circle step-ok float-right"></i>');
                    $('.logo-loader .loaded').css("width", "100%");
                } else {
                    $('.logo-loader .fa-check-circle').remove();
                    $('.logo-loader .fa-exclamation-circle').remove();
                    $('.logo-loader h3').prepend('<i class="fas fa-exclamation-circle step-nook float-right"></i>');
                    $('.logo-loader .loaded').css("width", "0");
                }
            }

            avanzamentoLogo();

            function avanzamentoImmagini2() {
                if ($('#boxUpload2 #previews').children().length > 0) {
                    $('.immagini-loader .fa-check-circle').remove();
                    $('.immagini-loader .fa-exclamation-circle').remove();
                    $('.immagini-loader h3').prepend('<i class="fas fa-check-circle step-ok float-right"></i>');
                    $('.immagini-loader .loaded').css("width", "100%");
                } else {
                    $('.immagini-loader .fa-check-circle').remove();
                    $('.immagini-loader .fa-exclamation-circle').remove();
                    $('.immagini-loader h3').prepend('<i class="fas fa-exclamation-circle step-nook float-right"></i>');
                    $('.immagini-loader .loaded').css("width", "0");
                }
            }

            avanzamentoImmagini2();


            function avanzamentoIndirizzo2 () {
                var avanzamento = 0;
                if ($("#provincia").val() != "") { avanzamento = avanzamento + 20; }
                if ($("#comune").val() != "") { avanzamento = avanzamento + 20; }
                if ($("#cap").val() != "") { avanzamento = avanzamento + 20; }
                if ($("#indirizzo").val() != "") { avanzamento = avanzamento + 20; }
                if ($("#civico").val() != "") { avanzamento = avanzamento + 20; }
                ////console.log(avanzamento);
                $('.indirizzo-loader .loaded').css("width",avanzamento+"%");
                if (avanzamento == 100) {
                    $('.indirizzo-loader .fa-check-circle').remove();
                    $('.indirizzo-loader .fa-exclamation-circle').remove();
                    //$('.indirizzo-loader h3').prepend('<i class="fas fa-check-circle step-ok float-right"></i>');
                } else {
                    $('.indirizzo-loader .fa-check-circle').remove();
                    $('.indirizzo-loader .fa-exclamation-circle').remove();
                    //$('.indirizzo-loader h3').prepend('<i class="fas fa-exclamation-circle step-nook float-right"></i>');
                }
            }

            $('#cap, #indirizzo, #civico').keyup(function(event) {
                avanzamentoIndirizzo2();
            });
            $('#comune').change(function(event) {
                avanzamentoIndirizzo2();
            });
            //avanzamentoIndirizzo2(); //lo si fà già per la mappa




            ///// GESTIONE SOCIAL
            var counter = 0;
            //console.log("add SOCIAL");
            $("#addrow").on("click", function (event) {
                event.preventDefault();
                var newRow = $('<div class="row align-items-center mt-2">');
                var cols = "";


                cols += '<div class="col-md-8">'+
                            '<label><i class="fal fa-share-alt"></i> Altro</label>'+
                            '<input type="text" class="form-control" id="altri" name="socialDescrizione[]" value="" placeholder="https://...">'+
                            '<input type="hidden" class="form-control" id="altri2" name="socialTipo[]" value="Altri" placeholder="https://...">'+
                        '</div>'+
                        '<div class="col-md">'+
                            '<a href="#" class="ibtnDel" title="Rimuovi questo social"><i class="fal fa-times red"></i></a>'+
                        '</div>';

                /*cols += '<td class="col-md-3">'+
                            '<select name="socialTipo[]" class="form-control">'+
                                '<option selected="selected">Facebook</option>'+
                                '<option>Twitter</option>'+
                                '<option>Instagram</option>'+
                                '<option>Google+</option>'+
                                '<option>Linkedin</option>'+
                                '<option>Altro</option>'+
                            '</select>'+
                        '</td>';
                cols += '<td class="col-md-6">'+
                            '<input type="text" class="form-control" name="socialDescrizione[]" placeholder="" value="">'+
                        '</td>';

                cols += '<td><input type="button" class="ibtnDel btn btn-md btn-danger "  value="Delete"></td>';*/
                newRow.append(cols);
                $("#addSocialRow").append(newRow);
                counter++;
            });


            $("#addSocialRow").on("click", ".ibtnDel", function (event) {
                event.preventDefault();
                $(this).parent().parent().remove();
                counter -= 1
            });


            // function calculateRow(row) {
            //     var price = +row.find('input[name^="price"]').val();
            //
            // }
            //
            // function calculateGrandTotal() {
            //     var grandTotal = 0;
            //     $("table.order-list").find('input[name^="price"]').each(function () {
            //         grandTotal += +$(this).val();
            //     });
            //     $("#grandtotal").text(grandTotal.toFixed(2));
            // }

            //console.log("script chosen bug required")
            $('.pubblica').on('click', function (e) {
                $("#comuneBlocco").val($("#comune").val());
                if ($("#comuneBlocco").val() == "") {
                    $("#comune_chosen a").css("border", "1px solid #ff0000");
                } else {
                    $("#comune_chosen a").css("border", "1px solid #cccccc");
                }

            });
            $('.chosen').on('change', function (e) {
                //console.log("cambio comune");
                $("#comuneBlocco").val($("#comune").val());
                if ($("#comuneBlocco").val() == "") {
                    $("#comune_chosen a").css("border", "1px solid #ff0000");
                } else {
                    $("#comune_chosen a").css("border", "1px solid #cccccc");
                }
            });



            break;



        case "announcement-list-products":
        case "profile-crediti":
        case "package":

            affixStep();
            affixEdit();

            var actionForm = $('#form-step2').attr("action");


            $('.products-list').change(function(event) {
                if ($(this).attr("name") == "pacchetto") {
                    $(".products-list").parent().parent().parent().removeClass("active");
                    $("#order-summary").removeClass("d-none");
                    var importo = $(this).parent().parent().next().find(".giorni:first").val();
                    var tax =  (importo - ((importo * 100) / 122));
                                var crediti = parseFloat($("#totaleCrediti").val());
                    var periodo = parseInt($(this).parent().parent().next().find(".giorni:first").attr("data-periodo")) * 30;
                    var annunci = parseInt($(this).parent().parent().next().find(".giorni:first").attr("data-annunci"));
                                $("#order-summary .total .price").html("€ " + importo);
                    $("#order-summary .num-annunci").html(annunci);
                    $("#order-summary .tax").html("€ " + tax.toFixed(2));
                                if (parseInt($(this).attr("data-periodo")) == 31) {
                        $("#order-summary .num-giorni").html("1 mese");
                    } else {
                        $("#order-summary .num-giorni").html("1 anno");
                    }
                    $("#payPackagePrezzo").val(importo);
                    $("#payPackagePeriodo").val(periodo);
                    $("#payPackageProduct").val(JSON.stringify([{"pacchettoAnnunci" : annunci}]));
                    $("#route").attr('data-periodo', periodo);
                    $("#route").attr('data-product', JSON.stringify([{"pacchettoAnnunci" : annunci}]));
                    $(".differenzaCrediti").html(importo - crediti);
                    $("#item_name").val("Pacchetto " + annunci + " annunci - " + parseInt($(this).parent().parent().next().find(".giorni:first").attr("data-periodo")) + " mesi");
                                //console.log(importo);
                    //console.log(crediti);
                                if (crediti >= importo) { //paga con crediticaratteristicheMain-dinamiche
                        $(".acquista-paypal").removeClass("d-none");
                        $(".paga-crediti").removeClass("d-none");
                        $(".acquista-paypal").addClass("d-none");
                    } else { //paga con paypal
                        $(".acquista-paypal").removeClass("d-none");
                        $(".paga-crediti").removeClass("d-none");
                        $(".paga-crediti").addClass("d-none");
                        $("#amount").val(importo - crediti);
                    }
                }
                 if ( $(this).is(':checked') ) {
                    //$(this).parent().parent().next().find(".giorni").removeAttr("disabled");
                    $(this).parent().parent().next().next().find(".giorni").prop( "checked", false );
                    $(this).parent().parent().next().next().find(".giorni:first").trigger( "click" );
                    $(this).parent().parent().next().next().find(".giorni").prop( "required", true );
                    $(this).parent().parent().parent().parent().parent().addClass("bg-success text-white");
                    //console.log($(this).val());
                } else {
                    //$(this).parent().parent().next().find(".giorni").prop( "disabled", true);
                    $(this).parent().parent().next().next().find(".giorni").prop( "checked", false );
                    $(this).parent().parent().next().next().find(".giorni").prop( "required", false );
                    $(this).parent().parent().parent().parent().parent().removeClass("bg-success text-white");
                }
                                        $('#form-step2').attr("action",actionForm);
                $( ".products-list" ).each(function( index ) {
                    if ( $(this).is(':checked') ) {
                        $('#form-step2').attr("action",actionForm + "/buy");
                    }
                });
            });


            $('.giorni').on('change', function (e) {
                $(this).parent().parent().parent().find(".products-list").prop( "checked", true );
                $(this).parent().parent().parent().addClass("active").removeClass("active-warning");


                if ($(this).attr("name") == "prezzo") {
                    $(".products-list").parent().parent().parent().removeClass("active");
                    $(this).parent().parent().parent().addClass("active");

                    $("#order-summary").removeClass("d-none");
                    var importo = parseFloat($(this).val());
                    var tax =  (importo - ((importo * 100) / 122));
                    var crediti = parseFloat($("#totaleCrediti").val());
                    var periodo = parseInt($(this).attr("data-periodo"));
                    var mesi = parseInt($(this).attr("data-mesi"));
                    var annunci = parseInt($(this).attr("data-annunci"));

                    $("#order-summary .total .price").html("€ " + importo);
                    $("#order-summary .num-annunci").html(annunci);
                    $("#order-summary .tax").html("€ " + tax.toFixed(2));
                    if (parseInt($(this).attr("data-periodo")) == 30) {
                        $("#order-summary .num-giorni").html("1 mese");
                    } else {
                        $("#order-summary .num-giorni").html("1 anno");
                    }

                    $("#payPackagePrezzo").val(importo);
                    $("#payPackagePeriodo").val(periodo);
                    $("#payPackageProduct").val(JSON.stringify([{"Abbonamento PaginaPro" : periodo, "prezzo": importo, "giorni": periodo, "mesi": mesi, "tipoOrdine": "abbonamento"}]));
                    $("#route").attr('data-periodo', periodo);
                    $("#route").attr('data-product', JSON.stringify([{"Abbonamento PaginaPro" : periodo, "prezzo": importo, "giorni": periodo, "mesi": mesi, "tipoOrdine": "abbonamento"}]));

                    $(".differenzaCrediti").html(importo - crediti);
                    if (parseInt($(this).attr("data-periodo")) == 31) {
                        $("#item_name").val("Abbonamento PaginaPro - 1 mese");
                    } else {
                        $("#item_name").val("Abbonamento PaginaPro - 1 anno");
                    }


                    if (crediti >= importo) {
                        $(".acquista-paypal").removeClass("d-none");
                        $(".paga-crediti").removeClass("d-none");
                        $(".acquista-paypal").addClass("d-none");
                    } else {
                        $(".acquista-paypal").removeClass("d-none");
                        $(".paga-crediti").removeClass("d-none");
                        $(".paga-crediti").addClass("d-none");
                        $("#amount").val(importo - crediti);
                    }
                }


                $( ".products-list" ).each(function( index ) {
                    if ( $(this).is(':checked') ) {
                        $('#form-step2').attr("action",actionForm + "/buy");
                    }
                });

            })


            $('#products-list .giornale').on('click', function (e) {

                var id = $(this).attr("data-id");
                var name = $(this).attr("data-name");
                var lettera = $(this).attr("data-lettera");

                //$('#modalAnnuncioGiornale #message').val("");

                $("#modalAnnuncioGiornaleLabel").html(name);
                $('#modalAnnuncioGiornale #message').attr("data-id",id);


                $('#products-list .prodottiGiornale').removeClass("bg-success");
                $('#products-list .prodottiGiornale').removeClass("text-white");

                
                if ($(this).prop("checked") == true) {
                    $("#modalAnnuncioGiornale").modal("show");

                    $('#products-list .giornale').prop("checked",false);
                    $('#products-list .giornale').parent().parent().parent().removeClass("active");
                    $('#products-list .completaGiornale').hide();
                    $('#products-list .prodItem').removeClass("active-secondary");



                    $(this).prop("checked",true);
                    $(this).parent().parent().parent().addClass("active-secondary");


                    if ( $('#modalAnnuncioGiornale #message').val().length == 0) {
                        $(".promuovi").attr("disabled", "disabled");
                        $(".promuovi").css("cursor", "no-drop");
                    }

                    $(this).parent().parent().find(".completaGiornale").show();


                    if ($('#modalAnnuncioGiornale #message').val() != "") {
                        $(this).parent().parent().find(".completaGiornale").hide();
                    } else {
                        $(this).parent().parent().find(".completaGiornale").show();
                    }

                } else {
                    //$('#modalAnnuncioGiornale #message').val("");

                    $('#products-list .giornale').prop("checked",false);
                    $('#products-list .giornale').parent().parent().parent().removeClass("active");
                    $('#products-list .completaGiornale').hide();
                    $('#products-list .prodItem').removeClass("active-secondary");

                    $(".promuovi").removeAttr("disabled");
                    $(".promuovi").css("cursor","pointer");
                }




                if (lettera != "CF") {
                    $("#modalAnnuncioGiornale .immagineAnnuncio").hide();
                } else {
                    $("#modalAnnuncioGiornale .immagineAnnuncio").show();
                }

                //console.log(id + " - " + name + " - " + lettera);

            });

            $('#modalAnnuncioGiornale #message').on('keyup', function (e) {
                var lunghezzaTesto = $(this).val().length;
                var id = $(this).attr("data-id");
                if (lunghezzaTesto > 1) {
                    $('#products-list .completaGiornale').hide();
                    $(".promuovi").removeAttr("disabled");
                    $(".promuovi").css("cursor","pointer");

                    $('#products-list .prodItem-' + id).removeClass("active-secondary");
                } else {
                    $('#products-list .prodItem-' + id + ' .completaGiornale').show();
                    $(".promuovi").attr("disabled","disabled");
                    $(".promuovi").css("cursor","no-drop");
                    $('#products-list .prodItem-' + id).addClass("active-secondary");
                }
            });
            $('#products-list .completaGiornale a').on('click', function (e) {
                e.preventDefault();
                //console.log("click")

                $("#modalAnnuncioGiornale").modal("show");
            });



var idProdottoDaUrl = $("#products-list").attr("data-productDirect");
            $("#" + idProdottoDaUrl).trigger("click");





                //salvataggio dell'ordine
            $('#submitButtonPaypal').on('click', function (e) {
                var form = "";

                if ($(this).hasClass("pagamento-axerve")) {
                    form = $('#submitButtonBanca');
                } else {
                    form = $('#form-step3');
                }

                e.preventDefault();

                if (!form.hasClass('pending')) {
                    form.addClass('pending');

                    var descrizioneGiornale = $("#route").attr('data-descrizioneGiornale');
                    if (descrizioneGiornale != "") {
                        var jsonData = JSON.stringify({
                            'descrizioneGiornale': descrizioneGiornale
                        });

                        $.ajax({
                            url: liveSite + "api/announcements/" + parseInt($("#route").attr('data-announcements')),
                            data: jsonData,
                            dataType: "json",
                            contentType: "application/json; charset=utf-8",
                            type: "PUT",
                            success: function (data) {
                                //console.log("aggiornamento descrizioneGiornale");
                            },
                            error: function(XMLHttpRequest, textStatus, errorThrown) {
                                //console.log("Errore ajax descrizioneGiornale");
                            }
                        });
                    }



                    var jsonData;
                    if ($("#route").attr('data-announcements') != "null") {
                        if ($("#route").attr('data-utente') == "profile") {
                            jsonData = JSON.stringify({
                                'announcement': {'id': parseInt($("#route").attr('data-announcements'))},
                                'profile': {'id': parseInt($("#route").attr('data-profile'))} ,
                                'giorni': parseInt($("#route").attr('data-periodo')),
                                'importo': parseFloat($("#amount").val()),
                                'products': JSON.parse($("#route").attr('data-product'))
                            });

                        } else { //altrimenti sono un profilePro
                            jsonData = JSON.stringify({
                                'announcement': {'id': parseInt($("#route").attr('data-announcements'))},
                                'profilePro': {'id': parseInt($("#route").attr('data-profile'))} ,
                                'giorni': parseInt($("#route").attr('data-periodo')),
                                'importo': parseFloat($("#amount").val()),
                                'products': JSON.parse($("#route").attr('data-product'))
                            });
                        }
                    } else {
                        if ($("#route").attr('data-utente') == "profile") {
                            jsonData = JSON.stringify({ //acquisto solo crediti?
                                'profile': {'id': parseInt($("#route").attr('data-profile'))} ,
                                'giorni': parseInt($("#route").attr('data-periodo')),
                                'importo': parseFloat($("#amount").val()),
                                'products': JSON.parse($("#route").attr('data-product')),
                            });
                        } else {
                            jsonData = JSON.stringify({ //acquisto solo crediti?
                                'profilePro': {'id': parseInt($("#route").attr('data-profile'))} ,
                                'giorni': parseInt($("#route").attr('data-periodo')),
                                'importo': parseFloat($("#amount").val()),
                                'products': JSON.parse($("#route").attr('data-product'))
                            });
                        }
                    }

                    //console.log( parseFloat($("#amount").val()));


                    $.ajax({
                        url: liveSite + "api/orders",
                        data: jsonData,
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        type: "POST",
                        success: function (data) {
                            //console.log("form was submitted");
                            //console.log(data);
                            $('#custom').val(data.id);


                            if (form.hasClass("pagamento-axerve")) {
                                //console.log("amount : " + parseInt($("#amount").val()));

                                //pagamentoAxerve(parseInt($("#route").attr('data-announcements')), parseInt($("#amount").val()));
                            } else {
                                $('#form-step3').submit();
                            }
                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown) {
                            //console.log("Errore ajax order");
                        }
                    });


                }
            });

            $('#crediti').on('keyup', function (e) {
                $("#amount").val($(this).val());
            });


            // pagamento con banga axerve getspay

        //     $('#submitButtonBanca').on('click', function (e) {
        //         var shopTransactionID = 0;
        //         if ($("#route").attr('data-announcements') != "null") {
        //             shopTransactionID = parseInt($("#route").attr('data-announcements'));
        //         }
        //
        //         jsonData = JSON.stringify({
        //             //'shopLogin': "GESPAY75931", //test
        //             'shopLogin': "9010182",
        //             'amount': $("#amount").val(),
        //             'currency': "EUR",
        //             'shopTransactionID': shopTransactionID
        //         });
        //
        //         //console.log(jsonData);
        //
        //         $.ajax({
        //             url: "https://ecomms2s.sella.it/api/v1/payment/create/",
        //             //url: "https://sandbox.gestpay.net/api/v1/payment/create/", //test
        //             data: jsonData,
        //             dataType: "json",
        //             contentType: "application/json",
        //             type: "POST",
        //             headers: {"Authorization": "apikey OTAxMDE4MiMjVFJFIFBJIFBVQkJMSUNJVEEgU1JMIyMxNy8xMi8yMDE5IDE3OjQxOjA4"},
        //             //headers: {"Authorization": "apikey R0VTUEFZNzU5MzEjI0VzZXJjZW50ZSBUZXN0IGRpIEdpYW5naXVsaW8jIzA4LzEwLzIwMTkgMDk6MzE6MTc="}, //test
        //             success: function (data) {
        //                 var dataPayment = data;
        //                 //console.log("pagamento carta di credito inviato");
        //                 console.log("amount");
        //                 console.log(parseFloat($("#amount").val()));
        //
        //
        //                 var jsonData;
        //                 if ($("#route").attr('data-announcements') != "null") {
        //                     if ($("#route").attr('data-utente') == "profile") {
        //                         jsonData = JSON.stringify({
        //                             'announcement': {'id': parseInt($("#route").attr('data-announcements'))},
        //                             'profile': {'id': parseInt($("#route").attr('data-profile'))} ,
        //                             'giorni': parseInt($("#route").attr('data-periodo')),
        //                             'importo': parseFloat($("#amount").val()),
        //                             'products': JSON.parse($("#route").attr('data-product')),
        //                             'riferimentoOrdine': dataPayment.payload.paymentID
        //                         });
        //
        //                     } else { //altrimenti sono un profilePro
        //                         jsonData = JSON.stringify({
        //                             'announcement': {'id': parseInt($("#route").attr('data-announcements'))},
        //                             'profilePro': {'id': parseInt($("#route").attr('data-profile'))} ,
        //                             'giorni': parseInt($("#route").attr('data-periodo')),
        //                             'importo': parseFloat($("#amount").val()),
        //                             'products': JSON.parse($("#route").attr('data-product')),
        //                             'riferimentoOrdine': dataPayment.payload.paymentID
        //                         });
        //                     }
        //                 } else {
        //                     if ($("#route").attr('data-utente') == "profile") {
        //                         jsonData = JSON.stringify({ //acquisto solo crediti?
        //                             'profile': {'id': parseInt($("#route").attr('data-profile'))} ,
        //                             'giorni': parseInt($("#route").attr('data-periodo')),
        //                             'importo': parseFloat($("#amount").val()),
        //                             'products': JSON.parse($("#route").attr('data-product')),
        //                             'riferimentoOrdine': dataPayment.payload.paymentID
        //                         });
        //                     } else {
        //                         jsonData = JSON.stringify({ //acquisto solo crediti?
        //                             'profilePro': {'id': parseInt($("#route").attr('data-profile'))} ,
        //                             'giorni': parseInt($("#route").attr('data-periodo')),
        //                             'importo': parseFloat($("#amount").val()),
        //                             'products': JSON.parse($("#route").attr('data-product')),
        //                             'riferimentoOrdine': dataPayment.payload.paymentID
        //                         });
        //                     }
        //                 }
        //                 //creo l'ordine di default vuoto
        //                 $.ajax({
        //                     url: liveSite + "api/orders",
        //                     data: jsonData,
        //                     dataType: "json",
        //                     contentType: "application/json; charset=utf-8",
        //                     type: "POST",
        //                     success: function (data) {
        //                         //console.log("form was submitted");
        //                         //console.log(data);
        //                         $('#custom').val(dataPayment.payload.paymentID);
        //
        //                         axerve.lightBox.shop = "9010182";
        //                         //axerve.lightBox.shop = "GESPAY75931";
        //                         axerve.lightBox.open(dataPayment.payload.paymentID, dataPayment.payload.paymentToken, callbackAxerve);
        //                     },
        //                     error: function(XMLHttpRequest, textStatus, errorThrown) {
        //                         //console.log("Errore ajax order");
        //                     }
        //                 });
        //
        //             },
        //             error: function (XMLHttpRequest, textStatus, errorThrown) {
        //                 //console.log("Errore ajax pagamento carta di credito");
        //                 //console.log(errorThrown);
        //             }
        //         });
        // });

            var stopclick = 0;
            $('#submitButtonBanca').on('click', function (e) {

                if (stopclick > 0) {
                    return;
                } else {
                    stopclick = 1;
                    $(".pagamento-axerve").addClass("disabled");
                    setTimeout(function(){
                        stopclick = 0;
                        $(".pagamento-axerve").removeClass("disabled");
                    },15000);

                }


                var shopTransactionID = 0;

                var jsonData;
                if ($("#route").attr('data-announcements') != "null") {
                    if ($("#route").attr('data-utente') == "profile") {
                        jsonData = JSON.stringify({
                            'announcement': {'id': parseInt($("#route").attr('data-announcements'))},
                            'profile': {'id': parseInt($("#route").attr('data-profile'))} ,
                            'giorni': parseInt($("#route").attr('data-periodo')),
                            'importo': parseFloat($("#amount").val()),
                            'products': JSON.parse($("#route").attr('data-product')),
                            //'riferimentoOrdine': dataPayment.payload.paymentID
                        });

                    } else { //altrimenti sono un profilePro
                        jsonData = JSON.stringify({
                            'announcement': {'id': parseInt($("#route").attr('data-announcements'))},
                            'profilePro': {'id': parseInt($("#route").attr('data-profile'))} ,
                            'giorni': parseInt($("#route").attr('data-periodo')),
                            'importo': parseFloat($("#amount").val()),
                            'products': JSON.parse($("#route").attr('data-product')),
                            //'riferimentoOrdine': dataPayment.payload.paymentID
                        });
                    }
                } else {
                    if ($("#route").attr('data-utente') == "profile") {
                        jsonData = JSON.stringify({ //acquisto solo crediti?
                            'profile': {'id': parseInt($("#route").attr('data-profile'))} ,
                            'giorni': parseInt($("#route").attr('data-periodo')),
                            'importo': parseFloat($("#amount").val()),
                            'products': JSON.parse($("#route").attr('data-product')),
                            //'riferimentoOrdine': dataPayment.payload.paymentID
                        });
                    } else {
                        jsonData = JSON.stringify({ //acquisto solo crediti?
                            'profilePro': {'id': parseInt($("#route").attr('data-profile'))} ,
                            'giorni': parseInt($("#route").attr('data-periodo')),
                            'importo': parseFloat($("#amount").val()),
                            'products': JSON.parse($("#route").attr('data-product')),
                            //'riferimentoOrdine': dataPayment.payload.paymentID
                        });
                    }
                }
                //creo l'ordine di default vuoto
                $.ajax({
                    url: liveSite + "api/orders",
                    data: jsonData,
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    type: "POST",
                    success: function (data) {
                        console.log("Ordine creato: " + data.id );
                        shopTransactionID = data.id;

                        jsonData = JSON.stringify({
                            //'shopLogin': "GESPAY75931", //test
                            'shopLogin': "9010182",
                            'amount': $("#amount").val(),
                            'currency': "EUR",
                            'shopTransactionID': shopTransactionID
                        });

                        //console.log(jsonData);

                        $.ajax({
                            url: "https://ecomms2s.sella.it/api/v1/payment/create/",
                            //url: "https://sandbox.gestpay.net/api/v1/payment/create/", //test
                            data: jsonData,
                            dataType: "json",
                            contentType: "application/json",
                            type: "POST",
                            headers: {"Authorization": "apikey OTAxMDE4MiMjVFJFIFBJIFBVQkJMSUNJVEEgU1JMIyMxNy8xMi8yMDE5IDE3OjQxOjA4"},
                            //headers: {"Authorization": "apikey R0VTUEFZNzU5MzEjI0VzZXJjZW50ZSBUZXN0IGRpIEdpYW5naXVsaW8jIzA4LzEwLzIwMTkgMDk6MzE6MTc="}, //test
                            success: function (data) {
                                var dataPayment = data;
                                //console.log("pagamento carta di credito inviato");
                                console.log("amount");
                                console.log(parseFloat($("#amount").val()));


                                jsonDataPut = JSON.stringify({
                                    'riferimentoOrdine': dataPayment.payload.paymentID
                                });

                                $.ajax({
                                    url: liveSite + "api/orders/" + shopTransactionID,
                                    data: jsonDataPut,
                                    dataType: "json",
                                    contentType: "application/json",
                                    type: "PUT",
                                    success: function (data) {
                                        $('#custom').val(dataPayment.payload.paymentID);

                                        axerve.lightBox.shop = "9010182";
                                        //axerve.lightBox.shop = "GESPAY75931";
                                        axerve.lightBox.open(dataPayment.payload.paymentID, dataPayment.payload.paymentToken, callbackAxerve);


                                    },
                                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                                        //console.log("Errore ajax pagamento2 carta di credito");
                                    }
                                });

                            },
                            error: function (XMLHttpRequest, textStatus, errorThrown) {
                                //console.log("Errore ajax pagamento carta di credito");
                                //console.log(errorThrown);
                            }
                        });




                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        console.log("Errore ajax creazione order");
                    }
                });




            });




        function callbackAxerve(response) {
            //console.log(response);


            jsonData = {
                'status': response.status,
                'paymentId': response.paymentId,
                'code': response.error.code,
                'description': response.error.description,
                'responseUrl': response.error.responseUrl,
            };

            //console.log(liveSite + "axerve");
            //email di log
            $.ajax({
                url: liveSite + "sendEmailLogSella",
                data: jsonData,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                type: "GET",
                success: function (data) {
                    //console.log("email notifica inviata");
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    //console.log("Errore ajax");
                }
            });


            $.ajax({
                url: liveSite + "axerve",
                data: jsonData,
                dataType: "json",
                contentType: "application/json",
                type: "GET",
                success: function (data) {
                    //console.log("pagamento2 carta di credito inviato");
                    //console.log(data);

                    console.log("redirect a : " + data);

                    if (data != "nulll") { //se è null vuol dire che il pagamento non è andato a buon fine, non facciamo redirect così rimaniamo nella stessa pagina
                        window.location.href = data;
                    }


                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    //console.log("Errore ajax pagamento2 carta di credito");
                }
            });

        }



            break;


        case "announcement-certificate":
            //cambio stato certificazione
            $('.garantisci-annuncio').on('click', function (e) {
                e.preventDefault();

                var idAnnuncio = $(this).attr("data-id");

                campiObblicatori = 0;
                if ($(".visualizza-file.a").children().length == 0 ||
                    $(".visualizza-file.b").children().length == 0 ||
                    $(".visualizza-file.c").children().length == 0 ||
                    $(".visualizza-file.d").children().length == 0
                ) {
                    campiObblicatori = 1;
                }

                var jsonData = JSON.stringify({
                    'certificate': 1
                });

                //console.log("required: " + campiObblicatori);
                //console.log(jsonData);

                if (campiObblicatori == 1) {
                    $(".controlla-campi").show();
                } else {
                    $(".controlla-campi").hide();

                    $.ajax({
                        url: liveSite + "api/announcements/"+ idAnnuncio,
                        data: jsonData,
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        type: "PUT",
                        success: function (data) {
                            //console.log("form was updated");
                            //console.log(data);

                            //invalidazione annuncio
                            $.ajax({
                                url: liveSite + "api/clearAnnuncio/" + idAnnuncio,
                                data: "",
                                dataType: "json",
                                contentType: "application/json; charset=utf-8",
                                type: "GET",
                                success: function (data) {
                                    console.log("cache annuncio svuotata");


                                    if ($('.garantisci-annuncio').attr("data-tipoUtente") == "profile") {
                                        window.location.href = '/profile/'+$('.garantisci-annuncio').attr("data-profile")+'/announcements';
                                    } else {
                                        window.location.href = '/pro_profiles/'+$('.garantisci-annuncio').attr("data-profile")+'/announcements';
                                    }


                                },
                                error: function(XMLHttpRequest, textStatus, errorThrown) {
                                    console.log("Errore ajax clear annuncio");
                                }
                            });


                            },
                        error: function(XMLHttpRequest, textStatus, errorThrown) {
                            console.log("Errore ajax certificazione annuncio");
                        }
                    });
                }

            });

            break;

        case "profilePro-certificate":
            //cambio stato certificazione
            $('.garantisci-pagina').on('click', function (e) {
                e.preventDefault();

                campiObblicatori = 0;
                if ($(".visualizza-file.a").children().length == 0 //||
                    //$(".visualizza-file.b").children().length == 0 ||
                    //$(".visualizza-file.c").children().length == 0 ||
                   // $(".visualizza-file.d").children().length == 0
                ) {
                    campiObblicatori = 1;
                }

                var jsonData = JSON.stringify({
                    'certificate': 1
                });

                //console.log("required: " + campiObblicatori);
                //console.log(jsonData);

                if (campiObblicatori == 1) {
                    $(".controlla-campi").show();
                } else {
                    $(".controlla-campi").hide();

                    $.ajax({
                        url: liveSite + "api/pro_profiles/"+ $('.garantisci-pagina').attr("data-id"),
                        data: jsonData,
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        type: "PUT",
                        success: function (data) {
                            //console.log("pagina in attesa di approvazione");
                            //console.log(data);
                            //$('#form-certificate').submit();
                            window.location.href = '/pro_profiles/'+$('.garantisci-pagina').attr("data-profile")+'/announcements';
                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown) {
                            //console.log("Errore ajax garantisci");
                        }
                    });
                }

            });

            break;


        case "profile-announcements":

            var scriptProfileAnnouncements = document.createElement('script'); scriptProfileAnnouncements.type = 'text/javascript';
            scriptProfileAnnouncements.src = liveSite.replace("index.php/","") + 'js/scripts-profile-announcements.js'; $('head').append(scriptProfileAnnouncements);

            //gestione contatori totali pagina annunci
            //console.log("gestione contatori totali pagina annunci");
            var countVisite = 0;
            var countLike = 0;
            var countCommenti = 0;
            var countMessaggi = 0;
            $( ".lista-annunci .annunci" ).each(function( index ) {

                countVisite = countVisite + parseInt($(this).find(".count-visite strong").html());
                countLike = countLike + parseInt($(this).find(".count-like strong").html());
                countCommenti = countCommenti + parseInt($(this).find(".count-commenti strong").html());
                countMessaggi = countMessaggi + parseInt($(this).find(".count-messaggi strong").html());

            });

            $(".tot-visite strong").html(countVisite);
            $(".tot-like strong").html(countLike);
            $(".tot-commenti strong").html(countCommenti);
            $(".tot-messaggi strong").html(countMessaggi);


            //gestione Pubblica / Spubblica annuncio
            $(".spubblica-ann").click(function (e) {
                e.preventDefault;
                var idDiv = $(this).attr("data-idDiv");
                var thiss = $(this);

                //console.log("idAnnuncio: " + idDiv);
                jsonData = JSON.stringify({
                    'stato': 5,
                });

                $.ajax({
                    url: liveSite + "api/announcements/" + idDiv,
                    data: jsonData,
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    type: "PUT",
                    success: function (data) {
                        //console.log("stato cambiato con successo (spubblicato)");

                        $("#announcement-" + idDiv).find(".stato.badge").html("Sospeso");
                        $("#announcement-" + idDiv).find(".stato.badge").removeClass("badge-success");
                        $("#announcement-" + idDiv).find(".stato.badge").addClass("badge-danger");
                        $("#announcement-" + idDiv).attr("data-stato", 5);

                        thiss.hide();
                        $(".pubblica-ann").show();
                        //thiss.find("small").html("Pubblica");
                        //thiss.removeClass("spubblica-ann");
                        //thiss.addClass("pubblica-ann");


                        //invalidazione annuncio
                        $.ajax({
                            url: liveSite + "api/clearAnnuncio/" + idDiv,
                            data: "",
                            dataType: "json",
                            contentType: "application/json; charset=utf-8",
                            type: "GET",
                            success: function (data) {
                                console.log("cache annuncio svuotata");
                            },
                            error: function(XMLHttpRequest, textStatus, errorThrown) {
                                console.log("Errore ajax clear annuncio");
                            }
                        });





                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        //console.log("Errore ajax cambio stato");
                    }
                });
            })

            //gestione Pubblica / Spubblica annuncio
            // $(".pubblica-ann").click(function (e) {
            //     e.preventDefault;
            //     var idDiv = $(this).attr("data-idDiv");
            //     var thiss = $(this);
            //
            //     //console.log("idAnnuncio: " + idDiv);
            //     jsonData = JSON.stringify({
            //         'stato': 1,
            //     });
            //
            //     $.ajax({
            //         url: liveSite + "api/announcements/" + idDiv,
            //         data: jsonData,
            //         dataType: "json",
            //         contentType: "application/json; charset=utf-8",
            //         type: "PUT",
            //         success: function (data) {
            //             //console.log("stato cambiato con successo (in approvazione)");
            //
            //             $("#announcement-" + idDiv).find(".stato.badge").html("In attesa di approvazione");
            //             $("#announcement-" + idDiv).find(".stato.badge").removeClass("badge-danger");
            //             $("#announcement-" + idDiv).find(".stato.badge").addClass("badge-warning");
            //             $("#announcement-" + idDiv).attr("data-stato", 1);
            //
            //             thiss.hide();
            //             $(".spubblica-ann").show();
            //
            //             //thiss.find("small").html("Spubblica");
            //             //thiss.removeClass("pubblica-ann");
            //             //thiss.addClass("spubblica-ann");
            //
            //         },
            //         error: function (XMLHttpRequest, textStatus, errorThrown) {
            //             //console.log("Errore ajax cambio stato");
            //         }
            //     });
            // })

            //gestione Pubblica / Spubblica annuncio
            $(".pubblica-ann").click(function (e) {
                e.preventDefault;
                var idDiv = $(this).attr("data-idDiv");
                var thiss = $(this);

                //console.log("idAnnuncio: " + idDiv);


                $.ajax({
                    url: liveSite + "api/pubblicaAnnuncio/" + idDiv,
                    data: "",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    type: "GET",
                    success: function (data) {
                        //console.log("risultato tentativo di pubblicazione");
                        //console.log(data);


                        if (data != "KO") {
                            if (data == 2) {
                                $("#announcement-" + idDiv).find(".stato.badge").html("Pubblicato");
                                $("#announcement-" + idDiv).find(".stato.badge").removeClass("badge-danger");
                                $("#announcement-" + idDiv).find(".stato.badge").removeClass("badge-warning");
                                $("#announcement-" + idDiv).find(".stato.badge").addClass("badge-success");
                                $("#announcement-" + idDiv).attr("data-stato", 2);
                            }
                            if (data == 1) {
                                $("#announcement-" + idDiv).find(".stato.badge").html("In attesa di approvazione");
                                $("#announcement-" + idDiv).find(".stato.badge").removeClass("badge-danger");
                                $("#announcement-" + idDiv).find(".stato.badge").addClass("badge-warning");
                                $("#announcement-" + idDiv).attr("data-stato", 1);
                            }

                            thiss.hide();
                            $(".spubblica-ann").show();
                        } else {
                            $("#modalBlockPublication").modal("toggle");
                        }


                        //invalidazione annuncio
                        $.ajax({
                            url: liveSite + "api/clearAnnuncio/" + idDiv,
                            data: "",
                            dataType: "json",
                            contentType: "application/json; charset=utf-8",
                            type: "GET",
                            success: function (data) {
                                console.log("cache annuncio svuotata");
                            },
                            error: function(XMLHttpRequest, textStatus, errorThrown) {
                                console.log("Errore ajax clear annuncio");
                            }
                        });


                        //thiss.find("small").html("Spubblica");
                        //thiss.removeClass("pubblica-ann");
                        //thiss.addClass("spubblica-ann");

                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        //console.log("Errore ajax cambio stato");
                    }
                });

                return false;
            })






            //spubblicaAnnuncio();
            //pubblicaAnnuncio();



            break;

        case "profile-comments":
        case "profilePro-comments":

            //carico scripts-comments.js
            var scriptComments = document.createElement('script'); scriptComments.type = 'text/javascript';
            scriptComments.src = liveSite.replace("index.php/","") + 'js/scripts-comments.js'; $('head').append(scriptComments);

            break;

        case "profile-messages":
        case "profilePro-messages":

            function getUrlParameter(name) {
                name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
                var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
                var results = regex.exec(location.search);
                return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
            };

            $(".rispondiMessaggio").keydown(function(e) {
                var mess = $(this);

                var key = e.which;
                if (key == 13 && mess.val() != "") { //enter

                    var profile = mess.attr("data-profile");
                    var profilePro = mess.attr("data-profilePro");

                    var profileEmail = mess.attr("data-profileEmail");
                    var profileProEmail = mess.attr("data-profileProEmail");

                    var announcement = mess.attr("data-announcement");
                    var fromTo = mess.attr("data-fromTo");
                    var message = mess.val();
                    var nome = mess.attr("data-nome");
                    var img = mess.attr("data-img");
                    var tipoUtente = mess.attr("data-tipo");

                    var jsonData = "";

                    if (profilePro == "") {
                         jsonData = JSON.stringify({
                            'profile': {'id': profile},
                            'fromTo': fromTo,
                            'announcement': {'id': announcement},
                            'descrizione': message
                        });
                    } else {
                        jsonData = JSON.stringify({
                            'profile': {'id': profile},
                            'proProfile': {'id': profilePro},
                            'fromTo': fromTo,
                            'announcement': {'id': announcement},
                            'descrizione': message
                        });
                    }

                    //var nuovoMessaggioHtml = mess.parent().prev().clone();
                    var nuovoMessaggioHtml = '<div class="d-block text-center p-2 mt-2">'+
                        '<small class="p-1">Adesso</small>'+
                        '</div>'+
                        '<div class="media p-2 border  text-right bg-white">'+
                        '<div class="media-body">'+
                        '<a href="#" class="user" data-toggle="tooltip" data-placement="top" title="" data-original-title="ADESSO">'+ nome +'</a>'+
                        '<p class="descrizione">'+ message +'</p>'+
                        '</div>'+
                        '<img class="d-flex ml-3 border img-messaggio" src="'+ img +'" alt="G">'+
                        '</div>';                    //nuovoMessaggioHtml.find(".fromtime").html("adesso");
                    //nuovoMessaggioHtml.find(".user").html(nome);
                    //nuovoMessaggioHtml.find(".img-messaggio").attr("src", img);
                    //nuovoMessaggioHtml.find(".descrizione").html(message);

                    //console.log(nuovoMessaggioHtml);

                    mess.parent().before(nuovoMessaggioHtml);

                    $.ajax({
                        url: liveSite + "api/messages",
                        data: jsonData,
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        type: "POST",
                        success: function (data) {
                            //console.log("Messaggio inviato con successo");
                            ////console.log(data);
                            var idRiferimento = data.id;

                            //EMAIL notifica
                            jsonData = JSON.stringify({
                                'profile': profile,
                                'profileEmail': profileEmail,
                                'profilePro': profile,
                                'profileProEmail': profileProEmail,
                                'annuncio': announcement,
                                'tipo': 'risposta-messaggio',
                                'fromTo': fromTo,
                                'tipoUtente': tipoUtente
                            });


                            console.log(jsonData);
                            $.ajax({
                                url: liveSite + "api/sendEmail",
                                data: jsonData,
                                dataType: "json",
                                contentType: "application/json; charset=utf-8",
                                type: "POST",
                                success: function (data) {
                                    //console.log("email notifica inviata");
                                },
                                error: function(XMLHttpRequest, textStatus, errorThrown) {
                                    //console.log("Errore ajax");
                                }
                            });


                            if (profilePro == "") {
                                var jsonDataNotification = JSON.stringify({
                                    'idProfile': profile,
                                    'announcement': {'id': announcement},
                                    'tipo': 'message',
                                    'idRiferimento': idRiferimento,
                                });
                            } else {
                                var jsonDataNotification = JSON.stringify({
                                    'idProfile': profile,
                                    'idProfilePro': profilePro,
                                    'announcement': {'id': announcement},
                                    'tipo': 'message',
                                    'idRiferimento': idRiferimento,
                                });
                            }
                            //console.log(jsonDataNotification);

                            $.ajax({
                                url: liveSite + "api/notifications",
                                data: jsonDataNotification,
                                dataType: "json",
                                contentType: "application/json; charset=utf-8",
                                type: "POST",
                                success: function (data2) {
                                    //console.log("Notifica aggiunta con successo");
                                    //console.log(data2);
                                },
                                error: function(XMLHttpRequest, textStatus, errorThrown) {
                                    //console.log("Errore ajax notifiche");
                                }
                            });



                            //invalidazione annuncio
                            $.ajax({
                                url: liveSite + "api/clearAnnuncio/" + announcement,
                                data: "",
                                dataType: "json",
                                contentType: "application/json; charset=utf-8",
                                type: "GET",
                                success: function (data) {
                                    console.log("cache annuncio svuotata");
                                },
                                error: function(XMLHttpRequest, textStatus, errorThrown) {
                                    console.log("Errore ajax clear annuncio");
                                }
                            });


                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            //console.log("Errore ajax invio messaggio");
                        }
                    });

                    $(this).val("");


                }
            });




            function sortByData(a, b) {
                return ($(b).attr("data-ord")) > ($(a).attr("data-ord")) ? 1 : -1;
            }
            $("#list-tab.list-group a").sort(sortByData).appendTo('#list-tab.list-group');




            var message = getUrlParameter('message'); // "edit"
            //console.log("message: " + message);

            if (message != "") { //se ho il parametro message (e quindi provengo dalla sezione notifiche)
                $( "#list-tab.list-group a" ).each(function( index ) {
                    var idMessaggi = JSON.parse($(this).attr("data-id-messaggi"));


                    for (var key in idMessaggi) {
                        if (idMessaggi[key] == message) {
                            $(this).trigger("click");
                            break;
                        }
                    }

                });
                //console.log("trigger NO click");

            } else {
                //console.log("trigger click");
                $("#list-tab.list-group a").first().trigger("click");
            }


            break;

        case "testMappaRicerca":


            //carico scripts-comments.js
            //var scriptTestMappaRicerca = document.createElement('script'); scriptTestMappaRicerca.type = 'text/javascript';
            //scriptTestMappaRicerca.src = liveSite.replace("index.php/","") + 'js/scriptsTestMappaRicerca.js'; $('head').append(scriptTestMappaRicerca);
            break;

        case "testMappa":

            //carico scripts-comments.js
            var scriptTestMappa = document.createElement('script'); scriptTestMappa.type = 'text/javascript';
            scriptTestMappa.src = liveSite.replace("index.php/","") + 'js/scriptsMappaRicerca2.js'; $('head').append(scriptTestMappa);
            break;

    }

    //chiude i debug (dump) di symfony (twig)
    $( "pre samp" ).each(function( index ) {
        $(this).removeClass("sf-dump-expanded").addClass('sf-dump-compact');
    });





    $("#keyword").trigger("keyup");
    $("#category-filter").trigger("change");
    $("#where-filter").trigger("change");


    //fix
    $("section[data-cat='"+$("#category-filter").val()+"'] #marca").trigger("change");
    $("section[data-cat='"+$("#category-filter").val()+"'] #tipologia").trigger("change");











    // $( ".testBack" ).on( "click", function(e) {
    //     e.preventDefault();
    //
    //     //console.log("onpopstate start");
    //     var stateObj = { foo: "111" };
    //     history.pushState(stateObj, "111", "");
    //
    //     window.onpopstate = function(event) {
    //         window.close();
    //     };
    //     //console.log("onpopstate end");
    //
    // });

    if ($("#route").attr("data-route") == "announcement") {
        //console.log("route=announcement");
        var stateObj = { foo: "111" };
        history.pushState(stateObj, "111", "");
        window.onpopstate = function(event) {
            window.close();
        };
    }


    $('a.js-blank').click(function(e) {
        e.preventDefault();
        openWindow($(this).prop("href"));
    });



});



window.addEventListener("load", function(){
    $( ".testBack" ).trigger("click");
});



