<template>
  <section class="hero is-primary">
    <div class="hero-body">
      <div class="container is-max-desktop">
        <p class="title">Gestión de proyectos</p>
        <p class="subtitle">Publicar</p>
      </div>
    </div>
  </section>
  <section class="section">
    <div class="container is-max-desktop">
      <div class="content">
        <p>
          Finalmente, el proyecto está listo para su publicación en el
          <a href="https://tareas.openstreetmap.es/">Gestor de Tareas</a>.
        </p>
        <p>
          Para ello necesitas que te den permiso para crear proyectos. Manda un
          mensaje solicitándolo al Canal de
          <a href="https://telegram.me/OSMes_Catastro>">Telegram</a>/<a
            href="https://matrix.to/#/#OSMes_Catastro:matrix.org"
            >Matrix</a
          >
          indicando tu nombre de usuario.
        </p>
        <p>
          Cuando tengas el permiso asignado, usa el botón
          <em>{{ $t('add_project') }}</em>
        </p>
        <figure class="image has-text-left ml-6">
          <span class="button is-success is-fake-btn">
            <span>{{ $t('add_project') }}</span>
            <span class="icon">
              <font-awesome-icon icon="plus" />
            </span>
          </span>
        </figure>
        <p>
          Descarga el archivo <b>zoning.zip</b>
          <font-awesome-icon icon="download" /> a tu ordenador.
        </p>
        <p>
          En la ventana 'CREAR NUEVO PROYECTO, DEFINIR ÁREA' del Gestor de
          Tareas haz clic en <em>Seleccionar archivo</em> y selecciona el
          archivo zoning.zip descargado.
        </p>
        <figure class="image column is-11">
          <img src="@/assets/doc/publish/new-project.png" />
        </figure>
        <p>
          <b>Importante</b>: Activa la opción para
          <em>Definir tareas mediante los polígonos cargados</em>.
        </p>
        <p>Haz clic en <em>Siguente</em> para continuar.</p>
        <p>
          En la ventana 'REVISAR', comprueba que el número de tareas mostrado
          coincide con el que se muestra en CatAtom2OSM.
        </p>
        <figure class="image column is-5">
          <img src="@/assets/doc/publish/review.png" />
        </figure>
        <p>Selecciona la organización OSM-es.</p>
        <p>
          Introduce el nombre del proyecto en inglés. A partir de ahora,
          completa los campos necesarios copiándolos de la plantilla mostrada en
          el panel mediante los botones <em>Copiar al portapapeles</em>
        </p>
        <figure class="image has-text-left ml-6">
          <span class="button is-fake-btn">
            <span class="icon">
              <font-awesome-icon icon="copy" />
            </span>
          </span>
        </figure>
        <p>Haz clic en <em>Crear</em> para crear el proyecto.</p>
        <p>
          En la página 'EDITAR PROYECTO', 'DESCRIPCIÓN', selecciona el estado
          'Publicado'. Completa en inglés y español los campos 'Nombre del
          proyecto', 'Descripción corta' y 'Descripción'.
        </p>
        <figure class="image column is-9">
          <img src="@/assets/doc/publish/description.png" />
        </figure>
        <p>
          En 'INSTRUCCIONES', completa en inglés y español los campos
          'Comentario al conjunto de cambios', 'Instrucciones detalladas' y
          'Instrucciones adicionales para esta tarea'.
        </p>
        <p>En 'METADATOS', 'Tipos de mapeo', selecciona 'Edificios'.</p>
        <p>Haz clic en el botón 'Guardar' para finalizar.</p>
      </div>
    </div>
  </section>
  <section class="section">
    <div class="container is-max-desktop">
      <div class="content">
        <doc-nav prev-url="/doc/fixme" next-url="/doc">
          <template #previous>
            <em>Gestión de proyectos</em>
            <strong>Corregir errores</strong>
          </template>
          <template #next>
            <strong>Gestión de proyectos</strong>
          </template>
        </doc-nav>
      </div>
    </div>
  </section>
</template>

<script setup>
import DocNav from '@/components/DocNav.vue'
</script>
