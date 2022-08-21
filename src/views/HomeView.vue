<template>
  <div>
    <section class="hero">
      <div class="container">
        <div class="hero-body">
          <p class="title">Importación del Catastro Español a OpenStreetMap</p>
          <p class="subtitle">
            Herramienta en línea para convertir edificios y direcciones de los
            <a href="http://www.catastro.minhap.gob.es/webinspire/index.html">
              Servicios ATOM
            </a>
            del Catastro a archivos
            <a :href="docUrl">OSM</a>.
          </p>
        </div>
        <div class="block">
          <figure class="image column is-8 is-offset-2">
            <img src="@/assets/banner.png" />
          </figure>
        </div>
      </div>
    </section>
    <div class="section">
      <div class="container">
        <div class="notification is-warning">
          <article class="level">
            <figure class="media-left">
              <span class="icon is-large has-text-danger">
                <font-awesome-icon icon="exclamation-triangle" size="2x" />
              </span>
            </figure>
            <div class="media-content">
              <div class="content">
                <p>
                  Las importaciones y ediciones automatizadas deben ser llevadas
                  a cabo por personas con experiencia y suficiente conocimiento
                  de la forma en que la comunidad OpenStreetMap crea mapas y con
                  una cuidada planificación y consulta con la comunidad local
                  correspondiente.
                </p>
                <p>
                  Consulta la
                  <strong><a :href="docUrl">guía de importación.</a></strong>
                  Las importaciones o ediciones automatizadas que no sigan estas
                  directrices ¡se pueden revertir!
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { wikiUrl } from '@/utils'

const docUrl = wikiUrl(
  'ES:Catastro español/Importación de edificios/Guía de importación'
)
</script>
