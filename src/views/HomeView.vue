<template>
  <div>
    <section class="hero">
      <div class="container">
        <div class="hero-body">
          <p class="title">{{ $t('hero title') }}</p>
          <p class="subtitle">
            <i18n-t keypath="hero subtitle" scope="global">
              <a href="http://www.catastro.minhap.gob.es/webinspire/index.html">
                {{ $t('Servicios ATOM') }}
              </a>
              <a :href="docUrl">OSM</a>
            </i18n-t>
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
                  {{ $t('hero content1') }}
                </p>
                <p>
                  <i18n-t keypath="hero content2" scope="global">
                    <strong>
                      <a :href="docUrl">{{ $t('import guide') }}</a>
                    </strong>
                  </i18n-t>
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
