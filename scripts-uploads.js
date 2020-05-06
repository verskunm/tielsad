//var liveSite = "http://51.255.95.200:9080/";

function avanzamentoImmagini(box, classe) {
    if ($('#'+box+' #previews').children().length == 0) {
        $('.'+classe+ ' .fa-check-circle').remove();
        $('.'+classe+ ' .fa-exclamation-circle').remove();
        $('.'+classe+ ' h3').prepend('<i class="fas fa-exclamation-circle step-nook float-right"></i>');
        $('.'+classe+ ' .loaded').css("width", "0");
    }
    if ($('#'+box+' #previews').children().length == 1) {
        $('.'+classe+ ' .fa-check-circle').remove();
        $('.'+classe+ ' .fa-exclamation-circle').remove();
        $('.'+classe+ ' h3').prepend('<i class="fas fa-exclamation-circle step-nook float-right"></i>');
        $('.'+classe+ ' .loaded').css("width", "50%");
    }
    if ($('#'+box+' #previews').children().length >= 2) {
        $('.'+classe+ ' .fa-check-circle').remove();
        $('.'+classe+ ' .fa-exclamation-circle').remove();
        $('.'+classe+ ' h3').prepend('<i class="fas fa-check-circle step-ok float-right"></i>');
        $('.'+classe+ ' .loaded').css("width", "100%");
    }
}

function scriptUpload(id, entity, allegati, tipo) {
    Dropzone.autoDiscover = false;
    var previewNode = document.querySelector("#boxUpload #template");
    previewNode.id = "";
    var previewTemplate = previewNode.parentNode.innerHTML;
    previewNode.parentNode.removeChild(previewNode);

    var uploadMultiple = true;
    if (tipo == "Img" || tipo == "ImgPro" || tipo == "Copertina") { // se siamo nel caso di Singolo File
        var uploadMultiple = false;
    }

    var myDropzone = new Dropzone("#boxUpload", { // Make the whole body a dropzone
        url: liveSite + "api/"+entity+"/"+id+"/uploads/"+tipo, // Set the url
        previewTemplate: previewTemplate,
        previewsContainer: "#boxUpload #previews", // Define the container to display the previews
        uploadMultiple: uploadMultiple,

        paramName: "file", // The name that will be used to transfer the file
        maxFilesize: 6, // MB#}
        maxFiles: 20,
        addRemoveLinks: false,
        //acceptedFiles: ".png,.jpg,.jpeg",
        acceptedFiles:"image/jpeg,image/png,image/jpg",
        dictMaxFilesExceeded: "Limite massimo immagini raggiuntoo",
        dictInvalidFileType: "Stai caricando un file non supportato. Puoi caricare solo .jpeg, .jpg, .png. Riprova.",
        init: function() {

            //caso del logo della pagina
            // if (entity == "pro_profiles") {
            //     this.on("thumbnail", function (file) {
            //         if (file.height != 90 && file.width != 300) {
            //             alert("Attenzione, l'immagine del logo deve avere la seguente dimensione: 300 x 90 px");
            //             file.rejectDimensions()
            //         } else {
            //             file.acceptDimensions();
            //         }
            //     });
            // }


            if (tipo == "Img" || tipo == "ImgPro") { // se siamo nel caso di Singolo File
                this.on('addedfile', function (file) {
                    $("#boxUpload #previews .dz-success ").remove();
                    if (this.files.length > 1) {
                        //this.removeFile(this.files[0]);
                    }
                });
            }
        },
    });









    var numImmagini = 0;


    allegati.sort(function (vote1, vote2) {

        // Sort by votes
        // If the first item has a higher number, move it down
        // If the first item has a lower number, move it up
        if (vote1.ord < vote2.ord) return -1;
        if (vote1.ord > vote2.ord) return 1;

        // If the votes number is the same between both items, sort alphabetically
        // If the first item comes first in the alphabet, move it up
        // Otherwise move it down
        if (vote1.key > vote2.key) return 1;
        if (vote1.key < vote2.key) return -1;

    });





    for (item in allegati) {
        if (allegati[item] != null && (allegati[item].stato == 1 || allegati[item].stato == 0)) {
            numImmagini++;
            console.log(allegati[item]);
            myDropzone.emit("addedfile", allegati[item]);
            //myDropzone.createThumbnailFromUrl(allegati[item], "/uploads/"+entity+"/" + allegati[item].name);
            myDropzone.createThumbnailFromUrl(allegati[item], allegati[item].base64);
            myDropzone.emit("success", allegati[item]);
            myDropzone.emit("complete", allegati[item]);
            $(allegati[item].previewTemplate).find('.preview').parent().parent().attr('id', allegati[item].key);
            $(allegati[item].previewTemplate).find('.preview').parent().parent().attr('ord', allegati[item].ord);
            $(allegati[item].previewTemplate).find('.preview').parent().parent().attr('oid', allegati[item].keyId);
            $(allegati[item].previewTemplate).find('.preview').parent().parent().attr('base64', allegati[item].base64);
        }
    }

    myDropzone.options.maxFiles = 20 - numImmagini;





    myDropzone.on("success", function(file, response) {
        console.log("success");
        console.log(response);
        console.log(file);



        if (response == "noDimensioneLogo") {
            myDropzone.removeFile(file);
            $(".dimensioni-error").show();
        } else {
            $(".dimensioni-error").hide();
            response = jQuery.parseJSON(response);
            $("#boxUpload #previews").children(":first").addClass("active");

            avanzamentoImmagini("boxUpload", "immagini-loader");

            $(file.previewTemplate).find('.preview').attr('data-id', response.keyId);
            //$(file.previewTemplate).find('.preview').html(response.name);
            $(file.previewTemplate).find('.preview').parent().parent().attr('id', response.keyId);
        }

    });
    myDropzone.on("error", function(file, errorMessage) {
        console.log("ERROR UPLOAD");
        console.log(errorMessage);
        console.log(file);
        myDropzone.removeFile(file);

        if (!$(".upload-error").length) {
            $("#boxUpload").prepend('<div class="alert alert-danger upload-error" role="alert">'+errorMessage+'</div>');
        } else {
            $(".upload-error").show()
        }

        setTimeout(function () {
            $(".upload-error").hide('blind', {}, 500);
            $(".upload-error").remove();
        }, 3000);

    });
    myDropzone.on('removedfile', function (file, error) {
        console.log(file);
        console.log(file.id);
        //se esiste l'attributo data-id (che abbiamo aggiunto dopo l'upload) esiste
        if (file.id != undefined && file.id != "undefined") {
            file.key = file.id;
        }
        if ($(file.previewTemplate).find('.preview').attr('data-id')) {
            file.key = $(file.previewTemplate).find('.preview').attr('data-id');
        }

        avanzamentoImmagini("boxUpload", "immagini-loader");

        var typeDelete = "Gallery";
        if (tipo == "ImgPro") {
            typeDelete = "Logo";
        }
        if (tipo == "Copertina") {
            typeDelete = "Copertina";
        }

        $.ajax({
            url: liveSite + "api/"+entity+"/"+id+"/uploads/delete/" + typeDelete + "/" + file.key,
            type: 'DELETE',
            data: {id:file.key}, //<-----this should have to be an object.
            contentType:'application/json',  // <---add this
            dataType: 'text',                // <---update this
            success: function(result) { myDropzone.options.maxFiles = myDropzone.options.maxFiles + 1; },
            error: function(result){ }
        });
    });
    myDropzone.on('addedfile', function (file) {
        console.log("added");
        console.log(liveSite + "api/"+entity+"/"+id+"/uploads");
        console.log(file);
    });


    // ##### ORDINAMENTO
    $("#previews").sortable({
        items:'.file-row',
        update : function () {
            var order = $(this).sortable('toArray');
            console.log(order);

            $.ajax({
                url: liveSite + "api/files/sort/" + JSON.stringify(order),
                type: 'GET',
                //data: { "lista": "on" },
                contentType:'application/json',  // <---add this
                dataType: 'json',                // <---update this
                success: function(result) { },
                error: function(result){ }
            });

            $('#previews .file-row').each(function () {
                $(this).removeClass("active");
            });
            //$( "#previews .file-row" ).css( "background-color", "#ffffff" );
            //$( "#previews .file-row:first" ).css( "background-color", "#cccccc" );
            $( "#previews .file-row:first" ).addClass("active");
        }
    });

    $( "#previews .file-row:first" ).css( "background", "#ccc" );

    $("#previews").children(":first").addClass("active");






    // ##### CROP
    var dataURItoBlob = function (dataURI) {
        var byteString = atob(dataURI.split(',')[1]);
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], {type: 'image/jpeg'});
    };
    var c = 0;

    $('#boxUpload').on('click', '.js-open-cropper-modal', function (e) {
        e.preventDefault();
        var fileName = $(this).parent().find(".name").html();
        var fileId = $(this).parent().attr("id");
        var fileOrd = $(this).parent().attr("ord");
        var dataUpload = $(this).next().find("img").attr("src");
        var oid = $(this).parent().attr("oid");
        var base64 = $(this).parent().attr("base64");




        var modalTemplate =
            '<div class="modal fade" tabindex="-1" role="dialog">' +
            '<div class="modal-dialog modal-lg" role="document">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
            '<h4 class="modal-title">Crop</h4>' +
            '</div>' +
            '<div class="modal-body">' +
            '<div class="image-container">' +
            '<img id="img-' + ++c + '" src="'+ base64 +'">' +
            '</div>' +
            '</div>' +
            '<div class="modal-footer">' +
            '<button type="button" class="btn btn-warning rotate-left"><span class="fa fa-rotate-left"></span></button>' +
            '<button type="button" class="btn btn-warning rotate-right"><span class="fa fa-rotate-right"></span></button>' +
            '<button type="button" class="btn btn-warning scale-x" data-value="-1"><span class="fa fa-arrows-h"></span></button>' +
            '<button type="button" class="btn btn-warning scale-y" data-value="-1"><span class="fa fa-arrows-v"></span></button>' +
            '<button type="button" class="btn btn-warning reset"><span class="fa fa-refresh"></span></button>' +
            '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>' +
            '<button type="button" class="btn btn-primary crop-upload" data-id="'+fileId+'" data-ord="'+fileOrd+'">Crop & upload</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';

        var cropperModal = $(modalTemplate);

        var minAspectRatio = 1;
        var maxAspectRatio = 1;

        cropperModal.modal('show').on("shown.bs.modal", function () {
            var cropper = new Cropper(document.getElementById('img-' + c), {
                autoCropArea: 1,
                movable: false,
                cropBoxResizable: true,
                rotatable: true,
                viewMode: 2,

                ready: function () {
                    var containerData = cropper.getContainerData();
                    var cropBoxData = cropper.getCropBoxData();
                    var aspectRatio = cropBoxData.width / cropBoxData.height;
                    var newCropBoxWidth;
                    if (aspectRatio < minAspectRatio || aspectRatio > maxAspectRatio) {
                        newCropBoxWidth = cropBoxData.height * ((minAspectRatio + maxAspectRatio) / 2);
                        cropper.setCropBoxData({
                            left: (containerData.width - newCropBoxWidth) / 2,
                            width: newCropBoxWidth
                        });
                    }
                },
                cropmove: function () {
                    var cropBoxData = cropper.getCropBoxData();
                    var aspectRatio = cropBoxData.width / cropBoxData.height;
                    if (aspectRatio < minAspectRatio) {
                        cropper.setCropBoxData({
                            width: cropBoxData.height * minAspectRatio
                        });
                    } else if (aspectRatio > maxAspectRatio) {
                        cropper.setCropBoxData({
                            width: cropBoxData.height * maxAspectRatio
                        });
                    }
                }
            });


            var $this = $(this);

            $this
                .on('click', '.crop-upload', function () {
                    // get cropped image data
                    var blob = cropper.getCroppedCanvas().toDataURL();
                    // transform it to Blob object
                    var croppedFile = dataURItoBlob(blob);
                    croppedFile.name = fileName.substring(15);

                    var files = myDropzone.getAcceptedFiles();
                    for (var i = 0; i < files.length; i++) {
                        var file = files[i];
                        console.log(file.name + " === " + fileName);
                        //if (file.name === fileName) {
                            myDropzone.removeFile(file);
                        //}
                    }
                    myDropzone.addFile(croppedFile);
                    $this.modal('hide');
                })
                .on('click', '.rotate-right', function () {
                    cropper.rotate(90);
                })
                .on('click', '.rotate-left', function () {
                    cropper.rotate(-90);
                })
                .on('click', '.reset', function () {
                    cropper.reset();
                })
                .on('click', '.scale-x', function () {
                    var $this = $(this);
                    cropper.scaleX($this.data('value'));
                    $this.data('value', -$this.data('value'));
                })
                .on('click', '.scale-y', function () {
                    var $this = $(this);
                    cropper.scaleY($this.data('value'));
                    $this.data('value', -$this.data('value'));
                });
        });
    });






}


function scriptUploadCopertina(id, entity, allegati, tipo) {
    Dropzone.autoDiscover = false;
    var previewNode = document.querySelector("#boxUploadCopertina #template");
    previewNode.id = "";
    var previewTemplate = previewNode.parentNode.innerHTML;
    previewNode.parentNode.removeChild(previewNode);

    var uploadMultiple = true;
    if (tipo == "Img" || tipo == "ImgPro" || tipo == "Copertina") { // se siamo nel caso di Singolo File
        var uploadMultiple = false;
    }

    var myDropzone = new Dropzone("#boxUploadCopertina", { // Make the whole body a dropzone
        url: liveSite + "api/"+entity+"/"+id+"/uploads/"+tipo, // Set the url
        previewTemplate: previewTemplate,
        previewsContainer: "#boxUploadCopertina #previews", // Define the container to display the previews
        uploadMultiple: uploadMultiple,
        init: function() {

            if (tipo == "Img" || tipo == "ImgPro" || tipo == "Copertina") { // se siamo nel caso di Singolo File
                this.on('addedfile', function (file) {
                    $("#boxUploadCopertina #previews .dz-success ").remove();
                    if (this.files.length > 1) {
                        //this.removeFile(this.files[0]);
                    }
                });
            }
        },
    });


    myDropzone.options.boxUploadCopertina = {
        paramName: "file", // The name that will be used to transfer the file
        maxFilesize: 6, // MB#}
        addRemoveLinks: true,
        acceptedFiles: ".png,.jpg,.jpeg"
    };

    for (item in allegati) {
        if (allegati[item] != null && allegati[item].stato == 1) {
            console.log(allegati[item]);
            myDropzone.emit("addedfile", allegati[item]);
            //myDropzone.createThumbnailFromUrl(allegati[item], "/uploads/"+entity+"/" + allegati[item].name);
            myDropzone.createThumbnailFromUrl(allegati[item], allegati[item].oid);
            myDropzone.emit("success", allegati[item]);
            myDropzone.emit("complete", allegati[item]);
            $(allegati[item].previewTemplate).find('.preview').parent().parent().attr('id', allegati[item].keyId);
            $(allegati[item].previewTemplate).find('.preview').parent().parent().attr('ord', allegati[item].ord);
            $(allegati[item].previewTemplate).find('.preview').parent().parent().attr('oid', allegati[item].keyId);
            $(allegati[item].previewTemplate).find('.preview').parent().parent().attr('base64', allegati[item].oid);
        }
    }


    myDropzone.on("success", function(file, response) {
        console.log("success");
        console.log(response);
        console.log(file);
        response = jQuery.parseJSON(response);
        $("#boxUploadCopertina #previews").children(":first").addClass("active");

        avanzamentoImmagini("boxUploadCopertina", "immagini-loader");

        $(file.previewTemplate).find('.preview').attr('data-id', response.keyId);
        //$(file.previewTemplate).find('.preview').html(response.name);
        $(file.previewTemplate).find('.preview').parent().parent().attr('id', response.keyId);
    });
    myDropzone.on('removedfile', function (file) {
        console.log(file);
        //se esiste l'attributo data-id (che abbiamo aggiunto dopo l'upload) esiste
        if ($(file.previewTemplate).find('.preview').attr('data-id')) {
            file.key = $(file.previewTemplate).find('.preview').attr('data-id');
        }

        avanzamentoImmagini("boxUploadCopertina", "immagini-loader");

        $.ajax({
            url: liveSite + "api/"+entity+"/"+id+"/uploads/delete/Gallery/" + file.key,
            type: 'DELETE',
            data: {id:file.key}, //<-----this should have to be an object.
            contentType:'application/json',  // <---add this
            dataType: 'text',                // <---update this
            success: function(result) { },
            error: function(result){ }
        });
    });
    myDropzone.on('addedfile', function (file) {
        console.log("added");
        console.log(liveSite + "api/"+entity+"/"+id+"/uploads");
        console.log(file);
    });


    // ##### ORDINAMENTO
    $("#boxUploadCopertina #previews").sortable({
        items:'.file-row',
        update : function () {
            var order = $(this).sortable('toArray');
            console.log(order);

            $.ajax({
                url: liveSite + "api/files/sort/" + JSON.stringify(order),
                type: 'GET',
                //data: { "lista": "on" },
                contentType:'application/json',  // <---add this
                dataType: 'json',                // <---update this
                success: function(result) { },
                error: function(result){ }
            });

            $('#boxUploadCopertina #previews .file-row').each(function () {
                $(this).removeClass("active");
            });
            //$( "#previews .file-row" ).css( "background-color", "#ffffff" );
            //$( "#previews .file-row:first" ).css( "background-color", "#cccccc" );
            $( "#boxUploadCopertina #previews .file-row:first" ).addClass("active");
        }
    });

    $( "#boxUploadCopertina #previews .file-row:first" ).css( "background", "#ccc" );

    $("#boxUploadCopertina #previews").children(":first").addClass("active");






    // ##### CROP
    var dataURItoBlob = function (dataURI) {
        var byteString = atob(dataURI.split(',')[1]);
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], {type: 'image/jpeg'});
    };
    var c = 0;

    $('#boxUploadCopertina').on('click', '.js-open-cropper-modal', function (e) {
        e.preventDefault();
        var fileName = $(this).parent().find(".name").html();
        var fileId = $(this).parent().attr("id");
        var fileOrd = $(this).parent().attr("ord");
        var dataUpload = $(this).next().find("img").attr("src");
        var oid = $(this).parent().attr("oid");
        var base64 = $(this).parent().attr("base64");




        var modalTemplate =
            '<div class="modal fade" tabindex="-1" role="dialog">' +
            '<div class="modal-dialog modal-lg" role="document">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
            '<h4 class="modal-title">Crop</h4>' +
            '</div>' +
            '<div class="modal-body">' +
            '<div class="image-container">' +
            '<img id="img-' + ++c + '" src="'+ base64 +'">' +
            '</div>' +
            '</div>' +
            '<div class="modal-footer">' +
            '<button type="button" class="btn btn-warning rotate-left"><span class="fa fa-rotate-left"></span></button>' +
            '<button type="button" class="btn btn-warning rotate-right"><span class="fa fa-rotate-right"></span></button>' +
            '<button type="button" class="btn btn-warning scale-x" data-value="-1"><span class="fa fa-arrows-h"></span></button>' +
            '<button type="button" class="btn btn-warning scale-y" data-value="-1"><span class="fa fa-arrows-v"></span></button>' +
            '<button type="button" class="btn btn-warning reset"><span class="fa fa-refresh"></span></button>' +
            '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>' +
            '<button type="button" class="btn btn-primary crop-upload" data-id="'+fileId+'" data-ord="'+fileOrd+'">Crop & upload</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';

        var cropperModal = $(modalTemplate);

        var minAspectRatio = 1;
        var maxAspectRatio = 1;

        cropperModal.modal('show').on("shown.bs.modal", function () {
            var cropper = new Cropper(document.getElementById('img-' + c), {
                autoCropArea: 1,
                movable: false,
                cropBoxResizable: true,
                rotatable: true,
                viewMode: 2,

                ready: function () {
                    var containerData = cropper.getContainerData();
                    var cropBoxData = cropper.getCropBoxData();
                    var aspectRatio = cropBoxData.width / cropBoxData.height;
                    var newCropBoxWidth;
                    if (aspectRatio < minAspectRatio || aspectRatio > maxAspectRatio) {
                        newCropBoxWidth = cropBoxData.height * ((minAspectRatio + maxAspectRatio) / 2);
                        cropper.setCropBoxData({
                            left: (containerData.width - newCropBoxWidth) / 2,
                            width: newCropBoxWidth
                        });
                    }
                },
                cropmove: function () {
                    var cropBoxData = cropper.getCropBoxData();
                    var aspectRatio = cropBoxData.width / cropBoxData.height;
                    if (aspectRatio < minAspectRatio) {
                        cropper.setCropBoxData({
                            width: cropBoxData.height * minAspectRatio
                        });
                    } else if (aspectRatio > maxAspectRatio) {
                        cropper.setCropBoxData({
                            width: cropBoxData.height * maxAspectRatio
                        });
                    }
                }
            });


            var $this = $(this);

            $this
                .on('click', '.crop-upload', function () {
                    // get cropped image data
                    var blob = cropper.getCroppedCanvas().toDataURL();
                    // transform it to Blob object
                    var croppedFile = dataURItoBlob(blob);
                    croppedFile.name = fileName.substring(15);

                    var files = myDropzone.getAcceptedFiles();
                    for (var i = 0; i < files.length; i++) {
                        var file = files[i];
                        console.log(file.name + " === " + fileName);
                        //if (file.name === fileName) {
                        myDropzone.removeFile(file);
                        //}
                    }
                    myDropzone.addFile(croppedFile);
                    $this.modal('hide');
                })
                .on('click', '.rotate-right', function () {
                    cropper.rotate(90);
                })
                .on('click', '.rotate-left', function () {
                    cropper.rotate(-90);
                })
                .on('click', '.reset', function () {
                    cropper.reset();
                })
                .on('click', '.scale-x', function () {
                    var $this = $(this);
                    cropper.scaleX($this.data('value'));
                    $this.data('value', -$this.data('value'));
                })
                .on('click', '.scale-y', function () {
                    var $this = $(this);
                    cropper.scaleY($this.data('value'));
                    $this.data('value', -$this.data('value'));
                });
        });
    });
}



function scriptUploadPdf(id, entity, allegati, tipo) {
    Dropzone.autoDiscover = false;
    var previewNode = document.querySelector("#boxUploadPdf #template");
    previewNode.id = "";
    var previewTemplate = previewNode.parentNode.innerHTML;
    previewNode.parentNode.removeChild(previewNode);

    var uploadMultiple = true;
    if (tipo == "Img" || tipo == "Copertina") { // se siamo nel caso di Singolo File
        var uploadMultiple = false;
    }

    var myDropzonePdf = new Dropzone("#boxUploadPdf", { // Make the whole body a dropzone
        url: liveSite + "api/"+entity+"/"+id+"/uploads/"+tipo, // Set the url
        previewTemplate: previewTemplate,
        previewsContainer: "#boxUploadPdf #previews", // Define the container to display the previews
        uploadMultiple: uploadMultiple,
        init: function() {

            if (tipo == "Img" || tipo == "Copertina") { // se siamo nel caso di Singolo File
                this.on('addedfile', function (file) {
                    $("#boxUploadPdf #previews .dz-success ").remove();
                    if (this.files.length > 1) {
                        //this.removeFile(this.files[0]);
                    }
                });
            }
        },
    });


    myDropzonePdf.options.boxUpload = {
        paramName: "file", // The name that will be used to transfer the file
        maxFilesize: 6, // MB#}
        addRemoveLinks: true,
        acceptedFiles: ".pdf"
    };

    for (item in allegati) {
        console.log(allegati[item]);
        myDropzonePdf.emit("addedfile", allegati[item]);
        //myDropzonePdf.createThumbnailFromUrl(allegati[item], "/uploads/"+entity+"/" + allegati[item].name);
        myDropzonePdf.createThumbnailFromUrl(allegati[item], allegati[item].oid);
        myDropzonePdf.emit("success", allegati[item]);
        myDropzonePdf.emit("complete", allegati[item]);
        $(allegati[item].previewTemplate).find('.name').parent().parent().attr('id', allegati[item].imgoid);
        $(allegati[item].previewTemplate).find('.name').parent().parent().attr('ord', allegati[item].ord);
        $(allegati[item].previewTemplate).find('.name').parent().parent().attr('oid', allegati[item].imgoid);
        $(allegati[item].previewTemplate).find('.name').parent().parent().attr('base64', allegati[item].oid);

        $(allegati[item].previewTemplate).find('.id').val(allegati[item].name);
        $(allegati[item].previewTemplate).find('.id').attr("data-id", allegati[item].id);
    }


    myDropzonePdf.on("success", function(file, response) {
        console.log("success");
        console.log(response);
        console.log(file);

        response = jQuery.parseJSON(response);
        $("#previews").children(":first").addClass("active");
        //avanzamentoImmagini();

        $(file.previewTemplate).find('.name').attr('data-id', response.imgoid);
        $(file.previewTemplate).find('.name').html(response.name);
        $(file.previewTemplate).find('.name').parent().parent().attr('id', response.imgoid);

        $(file.previewTemplate).find('.id').val(response.name);
        $(file.previewTemplate).find('.id').attr("data-id", response.id);

    });
    myDropzonePdf.on('removedfile', function (file) {
        console.log("removedfile");
        console.log(file);
        console.log($(file.previewTemplate));
        //se esiste l'attributo data-id (che abbiamo aggiunto dopo l'upload) esiste
        //if ($(file.previewTemplate).find('.name').attr('data-id')) {
        //    file.imgoid = $(file.previewTemplate).find('.name').attr('data-id');
        //}

        //avanzamentoImmagini();

        console.log("qui dovrebbe eseguire ajax " + file.id);
        console.log(liveSite + "api/"+entity+"/"+id+"/uploads/delete/documentiPro/" + file.id);

        $.ajax({
            url: liveSite + "api/"+entity+"/"+id+"/uploads/delete/documentiPro/" + file.id,
            type: 'DELETE',
            data: {id:file.imgoid}, //<-----this should have to be an object.
            contentType:'application/json',  // <---add this
            dataType: 'text',                // <---update this
            success: function(result) { console.log("eliminato con successo"); },
            error: function(result){ console.log("errore delete ajax"); }
        });
    });
    myDropzonePdf.on('addedfile', function (file) {
        console.log("added");
        console.log(liveSite + "api/"+entity+"/"+id+"/uploads");
        console.log(file);
    });


    // ##### ORDINAMENTO
    $("#previews").sortable({
        items:'.file-row',
        update : function () {
            var order = $(this).sortable('toArray');
            console.log(order);

            $.ajax({
                url: liveSite + "api/files/sort/" + JSON.stringify(order),
                type: 'GET',
                //data: { "lista": "on" },
                contentType:'application/json',  // <---add this
                dataType: 'json',                // <---update this
                success: function(result) { },
                error: function(result){ }
            });

            $( "#previews .file-row" ).css( "background", "none" );
            $( "#previews .file-row:first" ).css( "background", "#ccc" );

        }
    });

    $( "#previews .file-row:first" ).css( "background", "#ccc" );

    $("#previews").children(":first").addClass("active");






    // ##### CROP
    var dataURItoBlob = function (dataURI) {
        var byteString = atob(dataURI.split(',')[1]);
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], {type: 'image/jpeg'});
    };
    var c = 0;

    $('#boxUploadPdf').on('click', '.js-open-cropper-modal', function (e) {
        e.preventDefault();
        var fileName = $(this).parent().find(".name").html();
        var fileId = $(this).parent().attr("id");
        var fileOrd = $(this).parent().attr("ord");
        var dataUpload = $(this).next().find("img").attr("src");
        var oid = $(this).parent().attr("oid");
        var base64 = $(this).parent().attr("base64");




        var modalTemplate =
            '<div class="modal fade" tabindex="-1" role="dialog">' +
            '<div class="modal-dialog modal-lg" role="document">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
            '<h4 class="modal-title">Crop</h4>' +
            '</div>' +
            '<div class="modal-body">' +
            '<div class="image-container">' +
            '<img id="img-' + ++c + '" src="'+ base64 +'">' +
            '</div>' +
            '</div>' +
            '<div class="modal-footer">' +
            '<button type="button" class="btn btn-warning rotate-left"><span class="fa fa-rotate-left"></span></button>' +
            '<button type="button" class="btn btn-warning rotate-right"><span class="fa fa-rotate-right"></span></button>' +
            '<button type="button" class="btn btn-warning scale-x" data-value="-1"><span class="fa fa-arrows-h"></span></button>' +
            '<button type="button" class="btn btn-warning scale-y" data-value="-1"><span class="fa fa-arrows-v"></span></button>' +
            '<button type="button" class="btn btn-warning reset"><span class="fa fa-refresh"></span></button>' +
            '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>' +
            '<button type="button" class="btn btn-primary crop-upload" data-id="'+fileId+'" data-ord="'+fileOrd+'">Crop & upload</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';

        var cropperModal = $(modalTemplate);

        var minAspectRatio = 1;
        var maxAspectRatio = 1;

        cropperModal.modal('show').on("shown.bs.modal", function () {
            var cropper = new Cropper(document.getElementById('img-' + c), {
                autoCropArea: 1,
                movable: false,
                cropBoxResizable: true,
                rotatable: true,
                viewMode: 2,

                ready: function () {
                    var containerData = cropper.getContainerData();
                    var cropBoxData = cropper.getCropBoxData();
                    var aspectRatio = cropBoxData.width / cropBoxData.height;
                    var newCropBoxWidth;
                    if (aspectRatio < minAspectRatio || aspectRatio > maxAspectRatio) {
                        newCropBoxWidth = cropBoxData.height * ((minAspectRatio + maxAspectRatio) / 2);
                        cropper.setCropBoxData({
                            left: (containerData.width - newCropBoxWidth) / 2,
                            width: newCropBoxWidth
                        });
                    }
                },
                cropmove: function () {
                    var cropBoxData = cropper.getCropBoxData();
                    var aspectRatio = cropBoxData.width / cropBoxData.height;
                    if (aspectRatio < minAspectRatio) {
                        cropper.setCropBoxData({
                            width: cropBoxData.height * minAspectRatio
                        });
                    } else if (aspectRatio > maxAspectRatio) {
                        cropper.setCropBoxData({
                            width: cropBoxData.height * maxAspectRatio
                        });
                    }
                }
            });


            var $this = $(this);

            $this
                .on('click', '.crop-upload', function () {
                    // get cropped image data
                    var blob = cropper.getCroppedCanvas().toDataURL();
                    // transform it to Blob object
                    var croppedFile = dataURItoBlob(blob);
                    croppedFile.name = fileName.substring(15);

                    var files = myDropzonePdf.getAcceptedFiles();
                    for (var i = 0; i < files.length; i++) {
                        var file = files[i];
                        console.log(file.name + " === " + fileName);
                        //if (file.name === fileName) {
                        myDropzonePdf.removeFile(file);
                        //}
                    }
                    myDropzonePdf.addFile(croppedFile);
                    $this.modal('hide');
                })
                .on('click', '.rotate-right', function () {
                    cropper.rotate(90);
                })
                .on('click', '.rotate-left', function () {
                    cropper.rotate(-90);
                })
                .on('click', '.reset', function () {
                    cropper.reset();
                })
                .on('click', '.scale-x', function () {
                    var $this = $(this);
                    cropper.scaleX($this.data('value'));
                    $this.data('value', -$this.data('value'));
                })
                .on('click', '.scale-y', function () {
                    var $this = $(this);
                    cropper.scaleY($this.data('value'));
                    $this.data('value', -$this.data('value'));
                });
        });
    });


    //####### RINONIMA FILE
    $(".renameFile").on("focusout", function () {
        if ($(this).val() != "") {
            console.log("Rinonimai il file con id: " + $(this).attr("data-id") + " e chiamalo: " + $(this).val());

            jsonData = JSON.stringify({
                'name': $(this).val()
            });


            $.ajax({
                url: liveSite + "api/files/" + $(this).attr("data-id"),
                data: jsonData,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                type: "PUT",
                success: function (data) {
                    console.log("file rinominato con successo");
                    console.log(data);
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    console.log("Errore ajax rinonima file");
                }
            });
        } else {
            console.log("Attenzione, bisogna rinominare il file, non può essere vuoto");
        }


    });

}



