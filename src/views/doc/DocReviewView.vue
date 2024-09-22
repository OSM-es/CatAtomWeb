<template>
  <section class="hero is-primary">
    <div class="hero-body">
      <div class="container is-max-desktop">
        <p class="title">{{ $t('docview title') }}</p>
        <p class="subtitle">{{ $t('docview review') }}</p>
      </div>
    </div>
  </section>
  <section class="section">
    <div class="container is-max-desktop">
      <div class="content">
        <p>
          <i18n-t keypath="docreviewview content1" scope="global">
            <em>{{ $t('Addresses') }}</em>
            <a href="/doc/fixmes">{{ $t('docview fixme') }}</a>
          </i18n-t>
        </p>
        <h3>{{ $t('docreviewview content2') }}</h3>
        <p>
          {{ $t('docreviewview content3') }}
        </p>
        <p>
          <i18n-t keypath="docreviewview content4" scope="global">
            <em>{{ $t('Name in Cadastre') }}</em>
            <em>{{ $t('Conversion') }}</em>
          </i18n-t>
        </p>
        <figure class="image column is-11">
          <img src="@/assets/doc/review/panel.png" />
        </figure>
        <p>
          {{ $t('docreviewview content5') }}
        </p>
        <figure class="image column is-8">
          <img src="@/assets/doc/review/map.png" />
          <span class="is-pulled-right is-size-7">© OpenStreetMap</span>
        </figure>
        <p>
          {{ $t('docreviewview content6') }}
        </p>
        <h4>{{ $t('docreviewview content7') }}</h4>
        <p>
          {{ $t('docreviewview content8') }}
        </p>
        <p>
          <i18n-t keypath="docreviewview content9" scope="global">
            <em>{{ $t('Validate') }}</em>
          </i18n-t>
        </p>
        <figure class="image has-text-left ml-6">
          <span class="button is-fake-btn">
            <span class="icon">
              <font-awesome-icon icon="check" />
            </span>
          </span>
        </figure>
        <p>
          {{ $t('docreviewview content10') }}
        </p>
        <h4>{{ $t('docreviewview content11') }}</h4>
        <p>
          {{ $t('docreviewview content12') }}
        </p>
        <figure class="image column is-9">
          <img src="@/assets/doc/review/photo.png" />
          <span class="is-pulled-right is-size-7"
            >© Dirección General de Catastro</span
          >
        </figure>
        <p>
          {{ $t('docreviewview content13') }}
        </p>
        <p>
          <i18n-t keypath="docreviewview content14" scope="global">
            <a :href="c1n">#1calle1nombre</a>
          </i18n-t>
        </p>
        <p>
          {{ $t('docreviewview content15') }}
        </p>
        <figure class="image column is-9">
          <img src="@/assets/doc/review/name.png" />
          <span class="is-pulled-right is-size-7">© OpenStreetMap</span>
        </figure>
        <p>
          {{ $t('docreviewview content16') }}
        </p>
        <p>
          <i18n-t keypath="docreviewview content17" scope="global">
            <code>
              <a :href="addrplc" class="has-background-light">addr:place=*</a>
            </code>
            <code>
              <a :href="addrstr" class="has-background-light">addr:street=*</a>
            </code>
          </i18n-t>
        </p>
        <h4>{{ $t('docreviewview content18') }}</h4>
        <p>
          <i18n-t keypath="docreviewview content19" scope="global">
            <em>{{ $t('Delete') }}</em>
          </i18n-t>
        </p>
        <figure class="image has-text-left ml-6">
          <span class="button is-fake-btn">
            <span class="icon">
              <font-awesome-icon icon="times" />
            </span>
          </span>
        </figure>
        <h4>{{ $t('docreviewview content20') }}</h4>
        <p>
          <i18n-t keypath="docreviewview content21" scope="global">
            <em>{{ $t('Undo') }}</em>
          </i18n-t>
        </p>
        <figure class="image has-text-left ml-6">
          <span class="button is-fake-btn">
            <span class="icon">
              <font-awesome-icon icon="undo" />
            </span>
          </span>
        </figure>
        <h4>{{ $t('docreviewview content22') }}</h4>
        <p>
          {{ $t('docreviewview content23') }}
        </p>
        <figure class="image has-text-left ml-6">
          <span class="button is-success is-fake-btn">
            <span>{{ $t('Reprocess') }}</span>
            <span class="icon">
              <font-awesome-icon icon="repeat" />
            </span>
          </span>
        </figure>
        <h3>{{ $t('docreviewview content24') }}</h3>
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
DS***            Diseminados                Disseminats              Espallado
ED               Edificios*                 Edificis*                Edificios*
EM***            Extramuros                 Extramurs/Raval          Extramuros
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
LG               Lugar**                    Lloc**                   Lugar**
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
        <p>
          <i18n-t keypath="docreviewview content25" scope="global">
            <code>addr:place</code>
            <code>addr:street</code>
          </i18n-t>
        </p>
        <p>
          <i18n-t keypath="docreviewview content26" scope="global">
            <code>addr:place</code>
          </i18n-t>
        </p>
        <p>{{ $t('docreviewview content27') }}</p>
      </div>
    </div>
  </section>
  <section class="section">
    <div class="container is-max-desktop">
      <div class="content">
        <doc-nav prev-url="/doc/process" next-url="/doc/fixme">
          <template #previous>
            <em>{{ $t('docview title') }}</em>
            <strong>{{ $t('docview process') }}</strong>
          </template>
          <template #next>
            <em>{{ $t('docview title') }}</em>
            <strong>{{ $t('docview fixme') }}</strong>
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
