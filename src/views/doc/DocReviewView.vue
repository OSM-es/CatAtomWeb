<template>
  <section class="hero is-primary">
    <div class="hero-body">
      <div class="container is-max-desktop">
        <p class="title">Gestión de proyectos</p>
        <p class="subtitle">Revisar el callejero</p>
      </div>
    </div>
  </section>
  <section class="section">
    <div class="container is-max-desktop">
      <div class="content">
        <p>
          Antes de poder publicar un proyecto de importación existen dos
          revisiones que hay que realizar manualmente. La primera, es la del
          callejero. Si no has seleccionado <em>direcciones</em>, puedes pasar a
          <a href="/doc/fixmes">Corregir errores</a>.
        </p>
        <h3>Conversión de viales</h3>
        <p>
          No se deben importar los nombres de calles tal como vienen de
          Catastro. Incumplen las reglas de OSM (están en mayúsculas, sin tildes
          y con otros problemas). CatAtom2Osm ayuda a corregirlos intentando
          emparejar automáticamente el nombre de cada vía en Catastro con el
          nombre en OSM más parecido y cercano. Si no encuentra una coincidencia
          realiza una transformación preliminar como sugerencia de cuál debería
          ser el nombre correcto. En cualquier caso, hace falta revisar el
          proceso manualmente.
        </p>
        <p>
          La revisión se hace mediante esta tabla. En la columna de la izquierda
          se muestra el <em>Nombre en Catastro</em> del vial, en la de la
          derecha la <em>Conversión</em> propuesta.
        </p>
        <figure class="image column is-11">
          <img src="@/assets/doc/review/panel.png" />
        </figure>
        <p>
          Al hacer clic en una fila aparece un mapa que muestra los portales de
          Catastro existentes en esa calle y los viales existentes en OSM. Haz
          clic en los portales para acceder a las foto de fachada de Catastro.
          Al colocar el ratón sobre un vial se muestra el nombre en OSM.
        </p>
        <figure class="image column is-8">
          <img src="@/assets/doc/review/map.png" />
          <span class="is-pulled-right is-size-7">© OpenStreetMap</span>
        </figure>
        <p>
          Puedes usar el selector de capas para alternar entre el mapa de OSM y
          el de IGN-Base que muestra el callejero de Cartociudad, o para
          desactivar las capas de Portales o Viales si no te dejan ver bien el
          mapa.
        </p>
        <h4>Validación</h4>
        <p>
          Siguiendo los portales de Catastro, busca con que vial de OSM se
          corresponden.
        </p>
        <p>
          Si la calle tiene nombre en OSM, está correctamente escrito, es igual
          a la conversión propuesta y se corresponde con el nombre que figura en
          Catastro, puedes validar la conversión usando el botón
          <em>Validar</em>
        </p>
        <figure class="image has-text-left ml-6">
          <span class="button is-fake-btn">
            <span class="icon">
              <font-awesome-icon icon="check" />
            </span>
          </span>
        </figure>
        <p>
          Las filas de las calles revisadas se muestran con un color
          diferenciado para cada usuario que ha hecho la revisión. También
          puedes consultarlo al poner el ratón encima del recuadro de edición
          del nombre de la calle. Distintos usuarios pueden colaborar para
          completar la revisión.
        </p>
        <h4>Corrección</h4>
        <p>
          Si la calle no tiene nombre en OSM, o si lo tiene pero no es igual a
          la conversión propuesta, busca el nombre correcto usando revisión
          sobre el terreno o las distintas fuentes disponibles (Cartociudad, las
          fotos de fachada, Mapillary, KartaView).
        </p>
        <figure class="image column is-9">
          <img src="@/assets/doc/review/photo.png" />
          <span class="is-pulled-right is-size-7"
            >© Dirección General de Catastro</span
          >
        </figure>
        <p>
          Si la calle está formada por distintas vías en OSM, usa los colores de
          la capa de viales para comprobar que todas tengan exactamente el mismo
          nombre.
        </p>
        <p>
          Cuando el programa no encuentra una vía en OSM con la que emparejar
          los nombres, aplicará correcciones al nombre en Catastro para
          sugerirlo como conversión. Vigila la conversión de las abreviaturas
          del tipo de vía. Existen algunas que tienen varios valores posibles
          que se muestran separados por una barra. Son los casos de AL
          (Aldea/Alameda), CJ (Calleja/Callejón) o CR (Carretera/Carrera), por
          ejemplo. En caso de usarlos, revisa que sólo quede el tipo de vía
          correcto o ningúno, según el caso.
        </p>
        <p>
          Algunas direcciones de Catastro pueden referirse a lugares en vez de a
          vías, por ejemplo a barrios, urbanizaciones, caseríos. Comprueba si el
          nombre está mapeado en OSM o se puede añadir. Ten en cuenta que el
          programa asigna las direcciones a la etiqueta
          <a :href="addrplc" class="has-background-light">addr:place=*</a> en
          lugar de
          <a :href="addrstr" class="has-background-light">addr:street=*</a>
          cuando el nombre comienza por referencias de lugar. Para una lista
          completa consulta el anexo.
        </p>
        <p>
          Cuando tengas el nombre correcto edita la conversión en la tabla y/o
          el nombre de la vía en OSM según sea necesario. Para acceder a editar
          el mapa, en el encabezado del mapa hay un enlace a la web de OSM.
        </p>
        <p>
          Las ediciones en el mapa resultado de esta fase deben hacerse con la
          cuenta de usuario habitual de OSM, no con cuentas dedicadas de
          importación. Conviene etiquetarlas con
          <a :href="c1n">#1calle1nombre</a> y el nombre del municipio en el
          comentario del conjunto de cambios.
        </p>
        <h4>Eliminar</h4>
        <p>
          Algunos nombres de vía de Catastro pueden no ser adecuados para
          importar en OSM. Por ejemplo podemos encontrar referencias
          administrativa tales como 'MANZANA A SECTOR 4' que no se corresponde
          con nombres de vía reales. Si decides que no se importen las
          direcciones para un nombre de vía, deja la conversión en blanco
          mediante el botón <em>Eliminar</em>
        </p>
        <figure class="image has-text-left ml-6">
          <span class="button is-fake-btn">
            <span class="icon">
              <font-awesome-icon icon="times" />
            </span>
          </span>
        </figure>
        <h4>Deshacer</h4>
        <p>
          Para restaurar la conversión a su valor original usa el botón
          <em>Deshacer</em>
        </p>
        <figure class="image has-text-left ml-6">
          <span class="button is-fake-btn">
            <span class="icon">
              <font-awesome-icon icon="undo" />
            </span>
          </span>
        </figure>
        <h4>Reprocesar</h4>
        <p>
          Cuando esté completa la revisión del callejero, el usuario que inició
          el proceso puede continuar al siguente paso mediante el botón
        </p>
        <figure class="image has-text-left ml-6">
          <span class="button is-success is-fake-btn">
            <span>Reprocesar</span>
            <span class="icon">
              <font-awesome-icon icon="repeat" />
            </span>
          </span>
        </figure>
        <h3>Anexo: Siglas de tipo de vía</h3>
        <pre>
ABREV.           ESPAÑOL                    CATALÁ                   GALEGO
AG               Agregado*                  Agregat*                 Engadido*
AL               Aldea*/Alameda             Llogaret*                Aldea*/Alameda
AR               Área*/Arrabal              Àrea*/Raval              Área*/Arrabalde
AU               Autopista                  Autopista                Autoestrada
AV               Avenida                    Avinguda                 Avenida
AY               Arroyo                     Rierol                   Regato
BJ               Bajada                     Baixada                  Baixada
BO               Barrio*                    Barri*                   Barrio*
BR               Barranco*                  Barranc*                 Cavorco*
CA               Cañada*                    Camí ramader*            Canella*
CG               Colegio*/Cigarral*         Col·legi*/Cigarral*      Colexio*/Cigarreiro*
CH               Chalet*                    Xalet*                   Chalet*
CI               Cinturón                   Cinturó/Ronda            Cinto
CJ               Calleja/Callejón           Carreró                  Calexa/Quella/Ruela
CL               Calle                      Carrer                   Rúa
CM               Camino/Carmen              Camí                     Camiño/Carme
CN               Colonia                    Colònia                  Colonia
CO               Concejo*/Colegio           Ajuntament*/Col·legi     Concello*/Colexio
CP               Campa*/Campo*              Camp*                    Campeira*/Campo*
CR               Carretera/Carrera          Carretera                Estrada/Carreiro
CS               Caserío*                   Mas*                     Caserío*
CT               Cuesta/Costanilla          Costa/Rost               Costa/Pendente
CU               Conjunto*                  Conjunt*                 Conxunto*
CY               Caleya                     Carreró                  Caleya
DE               Detrás                     Darrere                  Detrás
DP               Diputación*                Diputació*               Deputación*
DS               Diseminados*               Disseminats*             Espallado*
ED               Edificios*                 Edificis*                Edificios*
EM               Extramuros*                Extramurs*/Raval         Extramuros*
EN               Entrada*/Ensanche*         Entrada*/Eixample*       Entrada*/Ensanche*
ER               Extrarradio*               Extraradi*/Raval         Arrabalde*
ES               Escalinata                 Escalinata               Escalinata
EX               Explanada                  Pla                      Chaira
FC               Ferrocarril/Finca*         Ferrocarril              Ferrocarril/Finca*
FN               Finca*                     Finca*                   Finca*
GL               Glorieta                   Rotonda/Plaça            Glorieta
GR               Grupo*                     Grup*                    Grupo*
GV               Gran Vía                   Gran Via                 Gran Vía
HT               Huerta*/Huerto*            Hort*                    Horta*/Horto*
JR               Jardines*                  Jardins*                 Xardíns*
LD               Lado/Ladera                Marge/Vessant            Costado/Ladeira
LG               Lugar                      Lloc                     Lugar
MC               Mercado*                   Mercat*                  Mercado*
ML               Muelle*                    Moll*                    Peirao*
MN               Município*                 Municipi*                Concello*
MS               Masías*                    Masies*                  Masías*
MT               Monte*                     Muntanya*                Monte*
MZ               Manzana*                   Illa*                    Mazá*
PB               Poblado*                   Poblat*                  Poboado*
PD               Partida*                   Partida*                 Partida*
PJ               Pasaje/Pasadizo            Passatge                 Pasaxe/Pasadizo
PL               Polígono*                  Polígon*                 Polígono*
PM               Páramo*                    Erm*                     Páramo*
PQ               Parroquia*/Parque          Parròquia*/Parc          Parroquia*/Parque
PR               Prolongación/Continuación  Prolongació/Continuació  Prolonga/Continuación
PS               Paseo                      Passeig                  Paseo
PT               Puente                     Pont                     Ponte
PZ               Plaza                      Plaça                    Praza
QT               Quinta                     Quinta                   Quinta
RB               Rambla                     Rambla                   Rambla
RC               Rincón/Rincona             Racó                     Recuncho/Cornecho
RD               Ronda                      Ronda                    Rolda
RM               Ramal                      Branc                    Ramal
RP               Rampa                      Rampa                    Rampla
RR               Riera                      Riera                    Riera
RU               Rúa                        Rua                      Rúa
SA               Salida                     Sortida                  Saída
SD               Senda                      Sender                   Sendeiro
SL               Solar*                     Solar*                   Soar*
SN               Salón                      Saló                     Salón
SU               Subida                     Pujada                   Costa
TN               Terrenos*                  Terrenys*                Terreos*
TO               Torrente                   Torrent                  Torrente
TR               Travesía/Transversal       Travessera               Travesía/Transversal
UR               Urbanización*              Urbanització*            Urbanización*
VR               Vereda                     Sendera                  Carreiro/Verea
AC               Acceso                     Accès                    Acceso
AD               Aldea                      Llogaret                 Aldea
BV               Bulevar*                   Bulevard*                Bulevar*
CZ               Calzada                    Calçada                  Calzada
PA               Paralela                   Paral·lel                Paralela
PC               Placeta/Plaça              Placeta/plaça            Prazola
PG               Polígono                   Polígon                  Polígono
PO               Polígono                   Polígon                  Polígono
SB               Subida                     Pujada                   Costa
SC               Sector*                    Sector*                  Sector*
CALLEJON         Callejón                   Carreró                  Quella/Ruela
CANTON           Cantón                     Cantó                    Cantón
CIRCUNVALACION   Circunvalación             Circumval·lació          Circunvalación
GENERICA         Genérica                   Genérica                 Xenérica
JARDIN           Jardín*                    Jardí*                   Xardín*
MALECON          Malecón                    Malecón                  Dique
RINCON           Rincón                     Racó                     Recuncho
PROLONGACION     Prolongación               Prolongació              Prolonga
TRANSITO         Tránsito                   Trànsit                  Tránsito
TRAVESIA         Travesía                   Travessera               Travesía
VIA              Vía                        Via                      Vía
        </pre>
        <p>*) Se aplica a addr:place en lugar de addr:street</p>
      </div>
    </div>
  </section>
  <section class="section">
    <div class="container is-max-desktop">
      <div class="content">
        <doc-nav prev-url="/doc/process" next-url="/doc/fixme">
          <template #previous>
            <em>Gestión de proyectos</em>
            <strong>Procesar</strong>
          </template>
          <template #next>
            <em>Gestión de proyectos:</em>
            <strong>Corregir errores</strong>
          </template>
        </doc-nav>
      </div>
    </div>
  </section>
</template>

<script setup>
import DocNav from '@/components/DocNav.vue'
import { wikiUrl } from '@/utils'

const c1n = wikiUrl('ES:España/1Calle1Nombre')
const addrplc = wikiUrl('ES:Key:addr:place')
const addrstr = wikiUrl('ES:Key:addr:street')
</script>
