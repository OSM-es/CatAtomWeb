<template>
  <section class="hero is-primary">
    <div class="hero-body">
      <div class="container is-max-desktop">
        <p class="title">{{ $t('docview title') }}</p>
        <p class="subtitle">{{ $t('docview fixme') }}</p>
      </div>
    </div>
  </section>
  <section class="section">
    <div class="container is-max-desktop">
      <div class="content">
        <p>
          <i18n-t keypath="docfixmeview content1" scope="global">
            <a :href="fixmeurl" class="has-background-light">fixme=*</a>
          </i18n-t>
        </p>
        <p>
          {{ $t('docfixmeview content2') }}
        </p>
        <figure class="image column is-9">
          <img src="@/assets/doc/fixme/panel.png" />
        </figure>
        <p>
          <i18n-t keypath="docfixmeview content3" scope="global">
            <font-awesome-icon icon="download" />
          </i18n-t>
        </p>
        <p>
          <i18n-t keypath="docfixmeview content4" scope="global">
            <font-awesome-icon icon="upload" />
          </i18n-t>
        </p>
        <p>
          {{ $t('docfixmeview content5') }}
        </p>
        <p>
          {{ $t('docfixmeview content6') }}
        </p>
        <h4>{{ $t('docfixmeview content7') }}</h4>
        <p>
          {{ $t('docfixmeview content8') }}
        </p>
        <figure class="image column is-11">
          <img src="@/assets/doc/fixme/Catatom2osm-fixmebigarea.png" />
        </figure>
        <h4>{{ $t('docfixmeview content9') }}</h4>
        <p>
          {{ $t('docfixmeview content10') }}
        </p>
        <figure class="image column is-11">
          <img src="@/assets/doc/fixme/Catatom2osm-fixmesmallarea.png" />
        </figure>
        <h4>{{ $t('docfixmeview content11') }}</h4>
        <p>
          {{ $t('docfixmeview content12') }}
        </p>
        <figure class="image column is-11">
          <img
            src="@/assets/doc/fixme/Catatom2osm-fixmepartbiggerthanbuilding.png"
          />
        </figure>
        <h4>{{ $t('docfixmeview content13') }}</h4>
        <p>
          {{ $t('docfixmeview content14') }}
        </p>
        <figure class="image column is-11">
          <img src="@/assets/doc/fixme/Catatom2osm-fixmegeos.png" />
        </figure>
        <h4>{{ $t('docfixmeview content15') }}</h4>
        <p>
          {{ $t('docfixmeview content16') }}
        </p>
        <h3>{{ $t('docfixmeview content17') }}</h3>
        <p>
          <i18n-t keypath="docfixmeview content18" scope="global">
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
        <h3>{{ $t('docfixmeview content19') }}</h3>
        <p>
          {{ $t('docfixmeview content20') }}
        </p>
        <figure class="image has-text-left ml-6">
          <span class="button is-success is-fake-btn">
            <span>{{ $t('Confirm') }}</span>
            <span class="icon">
              <font-awesome-icon icon="check" />
            </span>
          </span>
        </figure>
        <h3>{{ $t('docfixmeview content21') }}</h3>
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
          <i18n-t keypath="docfixmeview content22" scope="global">
            <a
              href="https://www.catastro.meh.es/documentos/formatos_intercambio/FICCcodigosUnificado07.pdf"
              >FICCcodigosUnificado07.pdf</a
            >
          </i18n-t>
        </p>
      </div>
    </div>
  </section>
  <section class="section">
    <div class="container is-max-desktop">
      <div class="content">
        <doc-nav prev-url="/doc/review" next-url="/doc/publish">
          <template #previous>
            <em>{{ $t('docview title') }}</em>
            <strong>{{ $t('Review street names') }}</strong>
          </template>
          <template #next>
            <em>{{ $t('docview title') }}</em>
            <strong>{{ $t('Publish') }}</strong>
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
</script>
