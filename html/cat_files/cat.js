// prod
var base_url = "https://cat.cartobase.es/";
var api_url = base_url + "api/";
// dev
//var api_url = "http://127.0.0.1:5001/";
//var base_url = api_url + "static/";


function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = window.location.href.split('?')[0];
}

function updateLinks() {
    let cod_municipio = $("#municipio").val();
    $("#lnk-descarga").html(base_url + "results/" + cod_municipio + "/");
    $("#lnk-descarga").attr("href", base_url + "results/" + cod_municipio + "/");
    $("#lnk-revisar").attr("href", `results/${cod_municipio}/highway_names.csv`);
}

function mostrarSelectProvincia() {
    $.get(
        api_url + 'prov'
    ).done(function(data) {
        for (const prov of data.provincias) {
            $("#provincia").append(
                new Option(
                    prov.cod_provincia + ' ' + prov.nombre, prov.cod_provincia,
                )
            );
        }
    });
}

function mostrarSelectMunicipios(selectObject) {
    let cod_provincia = selectObject.value;
    $("#municipio").empty();
    $("#municipio").append(new Option("Selecciona el municipio...", ""));
    if (cod_provincia == "") {
        $("#municipio").parent().addClass("hidden");
        $("#bloques").addClass("hidden");
        return;
    }
    $.get(
        api_url + 'prov/' + cod_provincia
    ).done(function(data) {
        for (const municipio of data.municipios) {
            $("#municipio").append(
                new Option(
                    municipio.cod_municipio + ' ' + municipio.nombre,
                    municipio.cod_municipio,
                )
            );
        }
    });
    $("#municipio").parent().removeClass("hidden");
}

function mostrarSelectDivision(cod_municipio) {
    $("#division").empty();
    $("#division").append(new Option("Actualizando divisiones...", ""));
    if (cod_municipio == "") {
        $("#division").parent().addClass("hidden");
        return;
    }
    $("#division").parent().addClass("blink");
    $("#division").parent().removeClass("hidden");
    $("#division").attr("disabled", true);
    $.get(
        api_url + 'mun/' + cod_municipio
    ).done(function(data) {
        $("#division").attr("disabled", false);
        $("#division").empty();
        if (data.divisiones.length == 0) {
            $("#division").parent().addClass("hidden");
            return;
        }
        $("#division").parent().removeClass("blink");
        $("#division").append(new Option("Selecciona la división...", ""));
        for (const division of data.divisiones) {
            $("#division").append(
                new Option(
                    division.nombre.replace(/\s/gy, '-'),
                    division.osm_id,
                )
            );
        }
    });
}

function mostrarBloques() {
    let cod_municipio = $('#municipio').val();
    mostrarSelectDivision(cod_municipio);
    if (cod_municipio == "") {
        $("#bloques").addClass("hidden");
        return;
    }
    $("#bloques").removeClass("hidden");
    $('#cod_mun').val(cod_municipio);
    updateLinks();
    $.get(
        `${api_url}job/${cod_municipio}`,
    ).done(function(data) {
        $("#registro").addClass("hidden");
        $("#registro .terminal").html("");
        if (data.estado != "AVAILABLE") {
            new Registro(cod_municipio);
        }
        actualizarProceso(data);
    });
}

function actualizarProceso(data) {
    let cod_municipio = $('#municipio').val();
    $("#mensaje").html(data.mensaje);
    $("#info-revisar").toggleClass("hidden", data.estado != "REVIEW");
    $("#info-fixme").toggleClass("hidden", data.estado != "FIXME");
    $("#opciones :checkbox").attr("disabled", data.estado == "REVIEW");
    $("#revisar").toggleClass("hidden", data.revisar.length == 0);
    $("#revisar .terminal").html("");
    data.revisar.forEach(function(row) {
        let url = `${base_url}results/${cod_municipio}/tasks/${row}`;
        let url_josm = `http://localhost:8111/import?new_layer=true&url=${url}`;
        let elem = `<li><a href='${url}'>${row}</a> (<a href="url_josm">abrir en JOSM</a>)</li>`;
        $("#revisar .terminal").append(elem);
    });
    $("#informe").toggleClass("hidden", data.informe.length == 0);
    $("#informe .terminal").html("");
    data.informe.forEach(function(row) {
        $("#informe .terminal").append(`<pre>${row || ' '}</pre>`);
    });
    actualizarPlantilla(data);
    actualizarBloques(data.estado);
}

function actualizarPlantilla(data) {
    let cod_municipio = $("#municipio").val();
    let nom_municipio = $("#municipio :selected").text();
    let edificios = "building_date" in data.report;
    let direcciones = "address_date" in data.report;
    $(".cod-municipio").html(cod_municipio);
    $(".nom-municipio").html(nom_municipio);
    if (edificios && !direcciones) {
        $(".tipo-import").html("edificios");
        $(".tipo-import-en").html("buildings");
    } else if (!edificios && direcciones) {
        $(".tipo-import").html("direcciones");
        $(".tipo-import-en").html("addresses");
    } else {
        $(".tipo-import").html("edificios y direcciones");
        $(".tipo-import-en").html("buildings and addresses");
    }
    $(".base-url").html(base_url);
    $("#plantilla").toggleClass("hidden", data.estado != "DONE");
}

function actualizarBloques(estado) {
    // Estado / disabled:
    //           blq-procesar  blq-revisar  blq-descargar
    // AVAILABLE   false         true         true
    // RUNNING     true          true         true
    // DONE        true          true         false
    // REVIEW      false         false        true
    // FIXME       true          false        true
    // ERROR       false         true         true
    if (estado == "AVAILABLE" || estado == "ERROR" || estado == "REVIEW") {
        $("#blq-procesar").removeClass("disabled");
    } else {
        $("#blq-procesar").addClass("disabled");
    }
    if (estado == "REVIEW" || estado == "FIXME") {
        $("#blq-revisar").removeClass("disabled");
    } else {
        $("#blq-revisar").addClass("disabled");
    }
    $("#blq-descargar").toggleClass("disabled", estado != "DONE");
}

function descargar() {
    document.location.href = 'results/' + $('#municipio').val();
}

async function subirDirecciones() {
    const select = document.getElementById('municipio');
    var cod_municipio = select.value
    let formData = new FormData();           
    formData.append("fileToUpload", fileToUpload.files[0]);
    await fetch('/upload.php?cod_mun='+cod_municipio, {
      method: "POST", 
      body: formData
    });    
//    alert('Has subido el archivo.');
}

class Registro {
    constructor(cod_municipio) {
        this.cod_municipio = cod_municipio;
        this.linea = 0;
        this.log = $('#registro');
        this.log.removeClass("hidden");
        this.loading = $("#loading");
        this.loading.removeClass("hidden");
        this.bloque = $("#blq-procesar");
        this.bloque.addClass("disabled");
        this.mensaje = $("#mensaje");
        this.#actualizar();
    }
    
    #actualizar() {
        console.log("log", this.cod_municipio);
        let self = this
        $.ajax({
            url: `${api_url}job/${this.cod_municipio}`,
            data: {"linea": self.linea},
        }).done(function(data) {
            if (data.linea > self.linea) {
                self.mensaje.html(data.mensaje);
                data.log.forEach(function(row) {
                    console.log(row);
                    self.log.find('.terminal').prepend(`<pre>${row}</pre>`);
                });
                self.linea = data.linea;
            }
            if (data.estado == "RUNNING" || data.estado == "AVAILABLE") {
                setTimeout(function() {
                    self.#actualizar();
                }, 500);
            } else {
                self.log.toggleClass("hidden", self.linea == 0);
                self.loading.addClass("hidden");
                actualizarProceso(data);
            }
        })
    }
}

function procesar() {
    const select = document.getElementById('municipio');
    var cod_municipio = select.value;
    var edificiosCheck =  document.getElementById('edificios');
    var direccionesCheck = document.getElementById('direcciones');
    if (edificiosCheck.checked) {
        var edificios = true;
    } else {
        var edificios = false;
    }
    if (direccionesCheck.checked) {
        var direcciones = true;
    } else {
        var direcciones = false;
    }

    async function postData(url = '', data = {}) {
        // Default options are marked with *
        const token = localStorage.getItem('token');
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }

    var post_job_url = api_url+'job/'+cod_municipio

    console.log(post_job_url, 'building='+edificios+'&direcciones='+direcciones);

    postData(
        post_job_url, {building: edificios, address: direcciones}
    ).then(data => {
        console.log(data); // JSON data parsed by `data.json()` call
        document.getElementById("mensaje").innerHTML = data.mensaje;
        var registro = new Registro(cod_municipio);
    });
}


// login
const params = new URLSearchParams(window.location.search);
if (params.has('oauth_token') && params.has('oauth_verifier')) {
    $.get(`${api_url}authorize`, params.toString()).done(function(data) {
        localStorage.setItem('token', data.session_token);
        localStorage.setItem('username', data.username);
        window.location.href = window.location.href.split('?')[0];
    });
}


$(document).ready(function() {
    let token = localStorage.getItem('token');
    if (token == null) {  // no registrado
        let login_url = `${api_url}login?callback=${base_url}index.html`;
        $('#login').attr('href', login_url);
    } else {  // registrado
        let username = localStorage.getItem('username');
        $('#username').html(username + ': ');
        $('.login-required').toggleClass('hidden');
    }
    mostrarSelectProvincia();
    $('.selector').select2();
    $('#plantilla_tbl').DataTable({
        "paging": false,
        "ordering": false,
        "info": false,
        "searching": false,
    });
});

