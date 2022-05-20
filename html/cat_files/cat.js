// prod
var base_url = "https://cat.cartobase.es/";
var api_url = base_url + "api/";
// dev
//var api_url = "http://127.0.0.1:5001/";
//var base_url = api_url + "static/";


function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('osm_id');
    localStorage.removeItem('username');
    window.location.href = window.location.href.split('?')[0];
}

function updateLinks() {
    let cod_municipio = $("#municipio").val();
    $("#lnk-descarga").text(base_url + "results/" + cod_municipio + "/");
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
    $("#bloques").addClass("hidden");
    $("#division").parent().addClass("hidden");
    if (['03', '07', '08', '12', '17', '25', '43', '46'].includes(cod_provincia)) {
        $("#idioma").val("ca_ES");
    } else if (['15', '27', '32', '36'].includes(cod_provincia)) {
        $("#idioma").val("gl_ES");
    } else {
        $("#idioma").val("es_ES");
    }
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

function get_split(data) {
    if (
        data.hasOwnProperty('report') && data.report.hasOwnProperty('split_id')
        && data.report != 'AVAILABLE' && data.report != 'DONE'
    ) {
        return data.report.split_id
    }
    return null
}

function mostrarSelectDivision(data) {
    let cod_municipio = data.cod_municipio;
    let split = get_split(data);
    $("#division").empty();
    if (cod_municipio == "") {
        $("#division").parent().addClass("hidden");
        return;
    }
    if (split != null) {
        $("#division").append(new Option(data.report.split_name, split));
        $("#division").val(split);
    } else {
        $("#division").append(new Option("Actualizando divisiones...", ""));
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
        if (split != null) {
            $("#division").attr("disabled", true);
            $("#division").val(split);
        }
    }).fail(function(resp) {
        console.log(resp);
        $("#division").parent().removeClass("blink");
        $("#division").empty();
        $("#division").append(new Option("Error", ""));
    });
}

function mostrarBloques() {
    let cod_municipio = $('#municipio').val();
    if (cod_municipio == "") {
        $("#bloques").addClass("hidden");
        return;
    }
    $("#bloques").removeClass("hidden");
    $('#cod_mun').val(cod_municipio);
    updateLinks();
    $.get(
        job_url(),
    ).done(function(data) {
        $("#msgestado").addClass("hidden");
        mostrarSelectDivision(data);
        $("#registro").addClass("hidden");
        $("#registro .terminal").text("");
        if (data.estado != "AVAILABLE") {
            new Registro(data.cod_municipio);
        }
        actualizarProceso(data);
    });
}

function mostrarDivision() {
    $.get(
        job_url(),
    ).done(function(data) {
        actualizarProceso(data);
    });
}

function es_propietario(data) {
    if (data.hasOwnProperty('propietario')) {
        if (data.propietario != null && data.propietario.hasOwnProperty('osm_id')) {
            return localStorage.getItem('osm_id') == data.propietario.osm_id
        }
    }
    return false
}

function abreJosm(url) {
    $.get(
        url
    ).fail(function() {
        alert("Debe abrir la aplicación JOSM con el complemento Control Remoto activo");
    });
}

function actualizarProceso(data) {
    let cod_municipio = $('#municipio').val();
    console.log(data.estado);
    $("#mensaje").text(data.mensaje);
    $(".superuser").toggleClass("hidden", !es_propietario(data) || data.estado == 'AVAILABLE' || data.estado == 'RUNNING');
    $("#info-revisar").toggleClass("hidden", data.estado != "REVIEW");
    $("#info-fixme").toggleClass("hidden", data.estado != "FIXME");
    $("#opciones :checkbox").attr("disabled", data.estado == "REVIEW");
    $("#revisar").toggleClass("hidden", data.revisar.length == 0);
    $("#revisar .terminal").text("");
    data.revisar.forEach(function(row) {
        let url = `${base_url}results/${cod_municipio}/tasks/${row}`;
        let url_josm = `http://localhost:8111/import?new_layer=true&url=${url}`;
        let elem = `<li><a href='${url}'>${row}</a> (<a href="javascript:abreJosm('${url_josm}');">abrir en JOSM</a>)</li>`;
        $("#revisar .terminal").append(elem);
    });
    $("#informe").toggleClass("hidden", data.informe.length == 0);
    $("#informe .terminal").text("");
    data.informe.forEach(function(row) {
        $("#informe .terminal").append(`<pre>${row || ' '}</pre>`);
    });
    actualizarPlantilla(data);
    actualizarBloques(data);
}

function actualizarPlantilla(data) {
    let cod_municipio = $("#municipio").val();
    let nom_municipio = $("#municipio :selected").text();
    let edificios = "building_date" in data.report;
    let direcciones = "address_date" in data.report;
    $(".cod-municipio").text(cod_municipio);
    $(".nom-municipio").text(nom_municipio);
    if (edificios && !direcciones) {
        $(".tipo-import").text("edificios");
        $(".tipo-import-en").text("buildings");
    } else if (!edificios && direcciones) {
        $(".tipo-import").text("direcciones");
        $(".tipo-import-en").text("addresses");
    } else {
        $(".tipo-import").text("edificios y direcciones");
        $(".tipo-import-en").text("buildings and addresses");
    }
    $(".base-url").text(base_url);
    $("#plantilla").toggleClass("hidden", data.estado != "DONE");
}

function actualizarBloques(data) {
    // Estado / disabled:
    //           blq-procesar  blq-revisar  blq-descargar
    // AVAILABLE   false         true         true
    // RUNNING     true          true         true
    // DONE        true          true         !es_propietario
    // REVIEW      !es_propietario         false        true
    // FIXME       true          false        true
    // ERROR       false         true         true
    let estado = data.estado;
    if (estado == "AVAILABLE" || estado == "ERROR" || estado == "REVIEW" && es_propietario(data)) {
        $("#blq-procesar").removeClass("disabled");
    } else {
        $("#blq-procesar").addClass("disabled");
    }
    if (estado == "REVIEW" || estado == "FIXME") {
        $("#blq-revisar").removeClass("disabled");
    } else {
        $("#blq-revisar").addClass("disabled");
    }
    $("#blq-descargar").toggleClass("disabled", estado != "DONE" || !es_propietario(data));
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
        $.get(
            job_url(),
            {"linea": self.linea},
        ).done(function(data) {
            if (data.linea > self.linea) {
                self.mensaje.text(data.mensaje);
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

function auth_ajax(method, url, data=null) {
    const token = localStorage.getItem('token');

    console.log(method, url);
    let req = {
        url: url,
        method: method,
        contentType: 'application/json',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', `Token ${token}`);
        },
    }
    if (data != null) {
        req['data'] = JSON.stringify(data);
    }
    return $.ajax(req);
}

function job_fail(resp) {
    console.log(resp);
    if (resp.hasOwnProperty('responseJSON')) {
        $("#mensaje").text(resp.responseJSON.message);
    } else {
        $("#mensaje").text(resp.responseText);
    }
}

function job_url() {
    let cod_municipio = $('#municipio').val();
    let split = $('#division').val() || '';
    return `${api_url}job/${cod_municipio}/${split}`
}

function procesar() {
    let data = {
        building: $('#edificios').prop('checked'),
        address: $('#direcciones').prop('checked'),
        idioma: $('#idioma').val(),
    };

    auth_ajax(
        'POST', job_url(), data
    ).done(function(data) {
        $("#mensaje").text(data.mensaje);
        $("#informe").addClass("hidden");
        $(".superuser").addClass("hidden");
        new Registro(data.cod_municipio);
    }).fail(job_fail);
}

function eliminar() {
    auth_ajax(
        'DELETE', job_url()
    ).done(function(data) {
        console.log(data);
        $("#registro").addClass("hidden");
        $("#registro .terminal").text("");
        actualizarProceso(data);
    }).fail(job_fail);
}


// login
const params = new URLSearchParams(window.location.search);
if (params.has('oauth_token') && params.has('oauth_verifier')) {
    $.get(`${api_url}authorize`, params.toString()).done(function(data) {
        localStorage.setItem('token', data.session_token);
        localStorage.setItem('osm_id', data.osm_id);
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
        auth_ajax(  // comprueba si ha expirado
            'PUT', `${api_url}login`
        ).done(function() {
            let username = localStorage.getItem('username');
            $('#username').text(username + ': ');
            $('.login-required').toggleClass('hidden');
        }).fail(logout);
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

