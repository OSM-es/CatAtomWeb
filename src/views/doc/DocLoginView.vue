<template>
  <section class="hero is-primary">
    <div class="hero-body">
      <div class="container is-max-desktop">
        <p class="title">Gestión de proyectos</p>
        <p class="subtitle">Registro</p>
      </div>
    </div>
  </section>
  <section class="section">
    <div class="container is-max-desktop">
      <div class="content">
        <p>Sigue estas instrucciones para acceder a CatAtom2Osm online:</p>
        <p>
          <b>1)</b> Haz clic en el botón <i>Iniciar sesión</i> de la barra de
          navegación.
        </p>
        <figure class="image has-text-left ml-6">
          <span class="button is-outlined is-info is-fake-btn">
            <span class="icon">
              <font-awesome-icon icon="user" />
            </span>
            <span>Iniciar sesión</span>
          </span>
        </figure>
        <p>
          <b>2)</b> Inicia sesión en OpenStreetMap usando tu cuenta o uno de los
          métodos alternativos.
        </p>
        <figure class="image column is-8">
          <img src="@/assets/doc/login/osm-login.png" />
        </figure>
        <p>
          <b>3)</b> Autoriza el acceso en CatAtom2Osm haciendo clic en
          <i>Otorgar acceso</i>.
        </p>
        <figure class="image column is-8">
          <img src="@/assets/doc/login/oauth.png" />
        </figure>
        <p>
          <b>Nota:</b> La cuenta dedicada de importación es necesaria para
          contribuir en proyectos publicados. Para crearlos puedes usar tu
          cuenta normal si lo deseas.
        </p>
      </div>
    </div>
  </section>
  <section class="section">
    <div class="container is-max-desktop">
      <div class="content">
        <doc-nav prev-url="/doc" next-url="/doc/select">
          <template #previous>
            <strong>Gestión de proyectos</strong>
          </template>
          <template #next>
            <em>Gestión de proyectos:</em>
            <strong>Seleccionar</strong>
          </template>
        </doc-nav>
      </div>
    </div>
  </section>
</template>

<script setup>
import DocNav from '@/components/DocNav.vue'
</script>
