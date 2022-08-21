<template>
  <section class="hero is-primary">
    <div class="hero-body">
      <div class="container is-max-desktop">
        <p class="title">Gestión de proyectos</p>
        <p class="subtitle">Corregir errores</p>
      </div>
    </div>
  </section>
  <section class="section">
    <div class="container is-max-desktop">
      <div class="content">
        <p>
          En esta fase, ya está completada la conversión de datos. Se han creado
          cada unidad de importación (o tareas). Sin embargo, antes de poder
          publicar el proyecto de importación hay que revisar los problemas que
          el programa ha detectado y marcado en los edificios mediante etiquetas
          <a :href="fixmeurl" class="has-background-light">fixme=*</a>.
        </p>
        <p>
          La revisión se hace mediante esta lista. Cada fila contiene el enlace
          al archivo de una tarea con problemas y el número de fixmes que
          contiene.
        </p>
        <figure class="image column is-9">
          <img src="@/assets/doc/fixme/panel.png" />
        </figure>
        <p>
          Descarga <font-awesome-icon icon="download" /> el archivo a tu
          ordenador y ábrelo con JOSM. Haz una búsqueda del texto 'fixme' para
          localizar los elementos que tengan esa etiqueta. Lee el mensage del
          problema detectado y busca su descripción en esta página. Elimina la
          etiqueta fixme y si es necesario corrige el problema indicado. Para
          resolver el problema consulta la imagen aérea de fondo, las fotos de
          fachada y otras fuentes aprobadas de imágenes como Mapillary o
          KartaView.
        </p>
        <p>
          No subas los archivos de tareas a OSM. Cuando estén corregidos los
          problemas y no queden etiquetas fixme guardalo en tu ordenador y
          súbelo a CatAtom2OSM. Puedes arrastrar los archivos al panel o usar
          los botones <font-awesome-icon icon="upload" />.
        </p>
        <p>
          Las filas de los archivos revisados se muestran con un color
          diferenciado para cada usuario que ha hecho la revisión. También
          puedes consultarlo al poner el ratón encima del enlace de descarga.
          Distintos usuarios pueden colaborar para completar la revisión.
        </p>
        <p>
          Los 'fixmes' están pensados para corregirlos antes publicar el
          proyecto. Se debe reducir su número a 0 para poder hacerlo. Esta es la
          lista de posibles problemas a solucionar:
        </p>
        <h4>Área demasiado grande</h4>
        <p>
          Edificio con área demasiado grande. Si no se corresponde a un edificio
          real, elimínalo.
        </p>
        <figure class="image column is-11">
          <img src="@/assets/doc/fixme/Catatom2osm-fixmebigarea.png" />
        </figure>
        <h4>Área demasiado pequeña</h4>
        <p>
          Edificio con área demasiado pequeña. Si no se corresponde a un
          edificio real, elimínalo.
        </p>
        <figure class="image column is-11">
          <img src="@/assets/doc/fixme/Catatom2osm-fixmesmallarea.png" />
        </figure>
        <h4>Esta parte es mayor que su edificio</h4>
        <p>
          Significa que una parte de un edificio está fuera del contorno del
          mismo. Resuélvelo ampliando el contorno del edificio o recortando la
          parte según sea oportuno.
        </p>
        <figure class="image column is-11">
          <img
            src="@/assets/doc/fixme/Catatom2osm-fixmepartbiggerthanbuilding.png"
          />
        </figure>
        <h4>Validación GEOS</h4>
        <p>
          La geometría no ha superado las pruebas de validación de la librería
          GEOS. En este ejemplo, una parte interior de un multipolígono está
          tocando el borde exterior del mismo. Se puede resolver eliminando la
          relación multipolígono y colocando las etiquetas de altura en cada
          parte por separado.
        </p>
        <figure class="image column is-11">
          <img src="@/assets/doc/fixme/Catatom2osm-fixmegeos.png" />
        </figure>
        <h4>El edificio de OSM con id %s no es válido</h4>
        <p>
          Se ha encontrado un edificio con geometría no válida en OSM. En este
          caso el problema no está en los datos de Catastro sino en los de OSM.
          Comprueba que el edificio de Catastro se superpone al de OSM y que
          será reemplazado (combinación) cuando se haga la importación. En ese
          caso no es necesaria ninguna acción aparte de eliminar la etiqueta
          'fixme'. Si el edificio no va a ser reemplazado con los datos de
          Catastro al importar, hay que corregirlo en OSM.
        </p>
        <h4>Las partes de edificio no cubren todo el contorno</h4>
        <p>
          El esquema <a :href="s3durl">Edificios 3D sencillos</a> requiere que
          todo el contorno del edificio esté cubierto por geometrías con la
          etiqueta
          <a :href="bpurl" class="has-background-light">building:part=*</a>. En
          ocasiones, las partes de edificio presentes en los datos de Catastro
          no cumplen este requisito. Esto sucede principalmente cuando hay
          balcones o terrazas, pero también cuando la información simplemente no
          está disponible. Las partes del contorno que faltan por cubrir se
          detectan por que el fondo es más transparente que el resto y en
          algunos de los segmentos de vía que lo forma no está presente el
          márgen semitransparente que JOSM muestra en el interior del resto de
          vías cerradas (marcados con flechas en la imagen).
        </p>
        <figure class="image column is-11">
          <img src="@/assets/doc/fixme/Faltan_partes_edificio.jpg" />
        </figure>
        <p>
          La imagen de fondo de Catastro también da información a través de las
          etiquetas rojas en el interior de cada parte. Siempre está ausente la
          parte cuando aparece una interrogación '?' en lugar del número de
          alturas en numeración romana. También puede estar ausente cuando
          aparecen siglas como 'POR' (ver anexo).
        </p>
        <p>
          Utiliza toda las fuentes disponibles para recoger información del
          edificio. Si lo tienes claro, crea las partes que faltan y asígnale
          etiquetas de altura. Si hay alguna adyacente con los mismos valores
          fusionalas. En caso de duda, reduce el contorno del edificio para que
          se ajuste a las partes.
        </p>
        <h3>Deshacer</h3>
        <p>
          Si te equivocas, siempre puedes restaurar el archivo de tarea original
          usando el botón
          <em>Deshacer</em>
        </p>
        <figure class="image has-text-left ml-6">
          <span class="button is-fake-btn">
            <span class="icon">
              <font-awesome-icon icon="undo" />
            </span>
          </span>
        </figure>
        <h3>Reprocesar</h3>
        <p>
          Cuando esté completa la revisión de todos los archivos, el usuario que
          inició el proceso puede continuar al siguente paso mediante el botón
        </p>
        <figure class="image has-text-left ml-6">
          <span class="button is-success is-fake-btn">
            <span>{{ $t('Confirm') }}</span>
            <span class="icon">
              <font-awesome-icon icon="check" />
            </span>
          </span>
        </figure>
        <h3>Anexo: nomenclatura de subparcelas</h3>
        <pre>
          -I,-II ...... Volúmenes bajo rasante (1, 2 alturas)
          I, II ....... Volúmenes sobre rasante (1, 2 alturas)
          B ........... Balcón
          T ........... Tribuna (balcón techado)
          TZA ......... Terraza
          POR ......... Porche
          SOP ......... Soportal
          PJE ......... Pasaje
          MAR ......... Marquesina
          P ........... Patio
          CO .......... Cobertizo
          EPT ......... Entreplanta
          SS .......... Semisótano
          ALT ......... Altillo
          PI .......... Piscina
          TEN ......... Pista de tenis
          ETQ ......... Estanque
          ZBE ......... Estanque o balsa que se valora
          SILO ........ Silo
          SUELO ....... Solares o parcelas con suelo vacante
          PRG ......... Pérgola
          DEP ......... Depósito
          ESC ......... Escalera
          TRF ......... Transformador
          JD .......... Jardín
          YJD ......... Jardín que se valora
          FUT ......... Campo de fútbol
          VOL ......... Voladizo
          ZD .......... Zona Deportiva
          RUINA ....... Ruinas
          CONS ........ En construcción
          ZPAV ........ Obras de urbanización interior
        </pre>
        <p>
          Según
          <a
            href="https://www.catastro.meh.es/documentos/formatos_intercambio/FICCcodigosUnificado07.pdf"
            >FICCcodigosUnificado07.pdf</a
          >
        </p>
      </div>
    </div>
  </section>
  <section class="section">
    <div class="container is-max-desktop">
      <div class="content">
        <doc-nav prev-url="/doc/review" next-url="/doc/publish">
          <template #previous>
            <em>Gestión de proyectos</em>
            <strong>Revisar callejero</strong>
          </template>
          <template #next>
            <em>Gestión de proyectos:</em>
            <strong>Publicar</strong>
          </template>
        </doc-nav>
      </div>
    </div>
  </section>
</template>

<script setup>
import DocNav from '@/components/DocNav.vue'
import { wikiUrl } from '@/utils'

const fixmeurl = wikiUrl('ES:Key:fixme')
const s3durl = wikiUrl('ES:Edificios 3D sencillos')
const bpurl = wikiUrl('ES:Key:building:part')
</script>
