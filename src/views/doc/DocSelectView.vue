<template>
  <section class="hero is-primary">
    <div class="hero-body">
      <div class="container is-max-desktop">
        <p class="title">Gestión de proyectos</p>
        <p class="subtitle">Seleccionar zona</p>
      </div>
    </div>
  </section>
  <section class="section">
    <div class="container is-max-desktop">
      <div class="content">
        <p>Sigue estas instrucciones para seleccionar la zona a procesar:</p>
        <p><b>1)</b> Selecciona una provincia.</p>
        <p>
          <img src="@/assets/doc/select/prov.png" class="ml-6" />
        </p>
        <p><b>2)</b> Selecciona un municipio.</p>
        <p>
          <img src="@/assets/doc/select/mun.png" class="ml-6" />
        </p>
        <p><b>3)</b> Comprueba el tamaño que tendrá el proyecto.</p>
        <figure class="image column is-8">
          <img src="@/assets/doc/select/info.png" />
        </figure>
        <p>
          Después de seleccionar un municipio, en el panel de información
          tendrás datos que te permiten hacerte una idea del tamaño que tendrá
          el proyecto. Mientras más edificios o direcciones mayor será el
          trabajo. Interesa que un proyecto no sea muy grande, especialmente si
          es la primera vez que creas uno. Mientras más grande sea, más tiempo
          será necesario para la revisión prévia a su publicación y para
          completar la importación una vez publicado.
        </p>
        <figure class="image column is-8">
          <img src="@/assets/doc/select/ko.png" />
        </figure>
        <p>
          Como regla general, podemos decir que un proyecto es demasiado grande
          si el número de partes de edificio es superior a 10000. El programa te
          alertará en caso de superar esta cifra. Si el proyecto es grande y no
          quieres empezar por otro municipio menor, intenta seleccionar una
          división administrativa.
        </p>
        <p><b>3)</b> Opcionalmente, selecciona una división administrativa.</p>
        <p>
          <img src="@/assets/doc/select/div.png" class="ml-6" />
        </p>
        <p>
          Los municipio se suelen dividir en entidades administrativas menores.
          En OSM, los municipios tienen la etiqueta <em>admin_level=8</em>. Por
          debajo, con <em>admin_level=9</em>, están los distritos (el nombre
          puede cambiar según las peculiaridades de cada territorio). Dentro de
          de cada distrito existirán barrios (o el equivalente en tu zona), con
          <em>admin_level=10</em>.
        </p>
        <p>
          Si estos límites administrativos están definidos en OSM, aparecerán en
          el selector de división administrativa debajo del selector de
          municipio. Selecciona un barrio que tenga el tamaño adecuado para
          procesar.
        </p>
        <p>
          Si los <a :href="adminUrl">límites administrativos</a> no están
          definidos en OSM, es recomendable crear los que necesites. Si vas a
          utilizar datos de terceros para dibujar estos límites y no están
          publicados con una licencia compatible será necesario solicitar una
          licencia expresa de uso. Consulta en tu Ayuntamiento y pide ayuda para
          dar los pasos necesarios.
        </p>
      </div>
    </div>
  </section>
  <section class="section">
    <div class="container is-max-desktop">
      <div class="content">
        <doc-nav prev-url="/doc/login" next-url="/doc/process">
          <template #previous>
            <em>Gestión de proyectos</em>
            <strong>Registro</strong>
          </template>
          <template #next>
            <em>Gestión de proyectos:</em>
            <strong>Procesar</strong>
          </template>
        </doc-nav>
      </div>
    </div>
  </section>
</template>

<script setup>
import DocNav from '@/components/DocNav.vue'
import { wikiUrl } from '@/utils'

const adminUrl = wikiUrl('ES:Tag:boundary=administrative')
</script>
