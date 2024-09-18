<template>
  <section class="hero is-primary">
    <div class="hero-body">
      <div class="container is-max-desktop">
        <p class="title">{{ $t('docview title') }}</p>
        <p class="subtitle">{{ $t('docview select') }}</p>
      </div>
    </div>
  </section>
  <section class="section">
    <div class="container is-max-desktop">
      <div class="content">
        <p>{{ $t('docselectview content1') }}</p>
        <p><b>1)</b> {{ $t('docselectview province') }}</p>
        <p>
          <img src="@/assets/doc/select/prov.png" class="ml-6" />
        </p>
        <p><b>2)</b> {{ $t('docselectview municipality') }}</p>
        <p>
          <img src="@/assets/doc/select/mun.png" class="ml-6" />
        </p>
        <p><b>3)</b> {{ $t('docselectview check size') }}</p>
        <figure class="image column is-8">
          <img src="@/assets/doc/select/info.png" />
        </figure>
        <p>
          {{ $t('docselectview content2') }}
        </p>
        <figure class="image column is-8">
          <img src="@/assets/doc/select/ko.png" />
        </figure>
        <p>
          {{ $t('docselectview content3') }}
        </p>
        <p><b>4)</b> {{ $t('docselectview admin level') }}</p>
        <p>
          <img src="@/assets/doc/select/div.png" class="ml-6" />
        </p>
        <p>
          <i18n-t keypath="docselectview content4" scope="global">
            <em>admin_level=8</em>
            <em>admin_level=9</em>
            <em>admin_level=10</em>
          </i18n-t>
        </p>
        <p>
          {{ $t('docselectview content5') }}
        </p>
        <p>
          <i18n-t keypath="docselectview content6" scope="global">
            <a :href="adminUrl">{{ $t('admin-boundaries') }}</a>
          </i18n-t>
        </p>
      </div>
    </div>
  </section>
  <section class="section">
    <div class="container is-max-desktop">
      <div class="content">
        <doc-nav prev-url="/doc/login" next-url="/doc/process">
          <template #previous>
            <em>{{ $t('docview title') }}</em>
            <strong>{{ $t('docview login') }}</strong>
          </template>
          <template #next>
            <em>{{ $t('docview title') }}</em>
            <strong>{{ $t('docview process') }}</strong>
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
