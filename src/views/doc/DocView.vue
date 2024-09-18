<template>
  <section class="hero is-primary">
    <div class="hero-body">
      <div class="container is-max-desktop">
        <p class="title">{{ $t('docview title') }}</p>
      </div>
    </div>
  </section>
  <section class="section">
    <div class="container is-max-desktop">
      <div class="content">
        <p>
          {{ $t('docview content1') }}
        </p>
        <p>
          <i18n-t keypath="docview content2" scope="global">
            <a :href="docUrl">{{ $t('import guide') }}</a>
          </i18n-t>
        </p>
        <p>
          {{ $t('docview content3') }}
        </p>
        <ol>
          <li>
            <a href="/doc/login">{{ $t('docview login') }}</a>
          </li>
          <li>
            <a href="/doc/select">{{ $t('docview select') }}</a>
          </li>
          <li>
            <a href="/doc/process">{{ $t('docview process') }}</a>
          </li>
          <li>
            <a href="/doc/review">{{ $t('docview review') }}</a>
          </li>
          <li>
            <a href="/doc/fixme">{{ $t('docview fixme') }}</a>
          </li>
          <li>
            <a href="/doc/publish">{{ $t('docview publish') }}</a>
          </li>
        </ol>
        <h2>{{ $t('docview need help') }}</h2>
        <p>{{ $t('docview need help explanation') }}</p>
        <ul>
          <li>
            <a href="https://lists.openstreetmap.org/pipermail/talk-es/">
              {{ $t('docview mail list') }}
            </a>
          </li>
          <li>
            <i18n-t keypath="docview telegram matrix" scope="global">
              <a href="https://telegram.me/OSMes_Catastro">Telegram</a>
              <a href="https://matrix.to/#/#OSMes_Catastro:matrix.org">
                Matrix
              </a>
            </i18n-t>
          </li>
          <li>
            <i18n-t keypath="docview forum" scope="global">
              <a href="https://forum.openstreetmap.org/viewforum.php?id=83">
                users: Spain
              </a>
            </i18n-t>
          </li>
        </ul>
        <p>
          {{ $t('docview need help end') }}
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
