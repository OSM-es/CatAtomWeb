<template>
  <section class="hero is-primary">
    <div class="hero-body">
      <div class="container is-max-desktop">
        <p class="title">Gestión de proyectos</p>
        <p class="subtitle">Procesar</p>
      </div>
    </div>
  </section>
  <section class="section">
    <div class="container is-max-desktop">
      <div class="content">
        <p><b>1)</b> Opciones de proceso.</p>
        <p>
          Una vez seleccionada la zona a procesar debes decidir si quieres
          importar al mismo tiempo edificios y direcciones postales o procesar
          independientemente edificios o direcciones. La opción más completa es
          la primera, aunque algunos usuarios deciden procesar sólo direcciones
          si el mapa ya contiene muchos edificios, o procesar sólamente los
          edificios para reducir la carga de trabajo.
        </p>
        <figure class="image column is-3">
          <img src="@/assets/doc/process/options.png" />
        </figure>
        <p>
          El selector de idioma se refiere al idioma empleado al convertir las
          abreviaturas de tipo de vía empleadas en Catastro (por ejemplo, CL =
          Calle/Carrer/Rúa). Se ajusta en función de la provincia, por lo que en
          principio no es necesario cambiarlo.
        </p>
        <a id="options"></a>
        <p><b>2)</b> Opciones avanzadas.</p>
        <figure class="image column is-3">
          <img src="@/assets/doc/process/advanced.png" />
        </figure>
        <p>
          Dentro del apartado opciones avanzadas se encuentran parámetros para
          modificar la forma en que el programa agrupa las parcelas con
          edificios o direcciones en archivos de tareas para importar. Se
          recomienda utilizar los valores por defecto.
        </p>
        <dl>
          <dt>
            <b><em>parcel_parts</em></b>
          </dt>
          <dd>
            El programa intentará que los ficheros de tareas tengan como máximo
            este número de partes de edificio.
          </dd>
          <dt>
            <b><em>parcel_dist</em></b>
          </dt>
          <dd>
            Se fusionarán las parcelas más cercanas que esta distancia si no se
            supera el número de partes.
          </dd>
        </dl>
        <p><b>3)</b> Inicia el proceso.</p>
        <p>Cuando estés listo haz clic en el botón <em>Procesar</em>.</p>
        <figure class="image has-text-left ml-6">
          <span class="button is-primary is-fake-btn">
            <span>Procesar</span>
            <span class="icon">
              <font-awesome-icon icon="running" />
            </span>
          </span>
        </figure>
        <p><b>4)</b> Información.</p>
        <p>
          Durante la ejecución del proceso de conversión se actualiza el panel
          de registro con información de la ejecución del programa.
        </p>
        <figure class="image column is-8">
          <img src="@/assets/doc/process/log.png" />
        </figure>
        <p>
          Al terminar se muestra un informe con datos sobre el resultado de la
          ejecución.
        </p>
        <figure class="image column is-8">
          <img src="@/assets/doc/process/report.png" />
        </figure>
      </div>
    </div>
  </section>
  <section class="section">
    <div class="container is-max-desktop">
      <div class="content">
        <doc-nav prev-url="/doc/select" next-url="/doc/review">
          <template #previous>
            <em>Gestión de proyectos</em>
            <strong>Seleccionar zona</strong>
          </template>
          <template #next>
            <em>Gestión de proyectos:</em>
            <strong>Revisar callejero</strong>
          </template>
        </doc-nav>
      </div>
    </div>
  </section>
</template>

<script setup>
import DocNav from '@/components/DocNav.vue'
</script>
