<template>
  <section class="hero is-primary">
    <div class="hero-body">
      <div class="container is-max-desktop">
        <p class="title">Gestión de proyectos</p>
      </div>
    </div>
  </section>
  <section class="section">
    <div class="container is-max-desktop">
      <div class="content">
        <p>
          Esta herramienta en linea sirve para convertir datos de edificios y
          direcciones de Catastro al formato de OSM. La conversión se realiza
          por zonas, generalmente un municipio y el resultado es un proyecto de
          importación disponible para que distintos usuarios puedan llevar a
          cabo la importación de forma colaborativa.
        </p>
        <p>
          Es interesante que antes de crear tu primer proyecto conozcas cómo es
          el proceso de participación en los que ya están publicados. Anímate a
          colaborar en ellos siguiendo la
          <a :href="docUrl">guía de importación</a>.
        </p>
        <p>
          Para crear un proyecto de una zona no publicada es necesario dar estos
          pasos:
        </p>
        <ol>
          <li><a href="/doc/login">Registro</a></li>
          <li><a href="/doc/select">Seleccionar zona</a></li>
          <li><a href="/doc/process">Procesar</a></li>
          <li><a href="/doc/review">Revisar el callejero</a></li>
          <li><a href="/doc/fixme">Corregir errores</a></li>
          <li><a href="/doc/publish">Publicación</a></li>
        </ol>
        <h2>¿Necesitas ayuda?</h2>
        <p>No dudes en contactar a través de cualquiera de estos medios:</p>
        <ul>
          <li>
            <a href="https://lists.openstreetmap.org/pipermail/talk-es/"
              >Lista de correo Talk-es</a
            >
          </li>
          <li>
            Canal de
            <a href="https://telegram.me/OSMes_Catastro">Telegram</a>/<a
              href="https://matrix.to/#/#OSMes_Catastro:matrix.org"
              >Matrix</a
            >
          </li>
          <li>
            Foro
            <a href="https://forum.openstreetmap.org/viewforum.php?id=83"
              >users: Spain</a
            >.
          </li>
        </ul>
        <p>
          Allí encontrarás otros usuarios dispuestos a resolver tus dudas o
          colaborar en lo necesario.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { wikiUrl } from '@/utils'

const docUrl = wikiUrl(
  'ES:Catastro español/Importación de edificios/Guía de importación'
)
</script>
