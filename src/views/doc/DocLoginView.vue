<template>
  <section class="hero is-primary">
    <div class="hero-body">
      <div class="container is-max-desktop">
        <p class="title">{{ $t('docview title') }}</p>
        <p class="subtitle">{{ $t('docview login') }}</p>
      </div>
    </div>
  </section>
  <section class="section">
    <div class="container is-max-desktop">
      <div class="content">
        <p>{{ $t('docloginview content1') }}</p>
        <p>
          <b>1)</b>&nbsp;
          <i18n-t keypath="docloginview content2" scope="global">
            <i>{{ $t('Log in') }}</i>
          </i18n-t>
        </p>
        <figure class="image has-text-left ml-6">
          <span class="button is-outlined is-info is-fake-btn">
            <span class="icon">
              <font-awesome-icon icon="user" />
            </span>
            <span>{{ $t('Log in') }}</span>
          </span>
        </figure>
        <p><b>2)</b> {{ $t('docloginview content3') }}</p>
        <figure class="image column is-8">
          <img src="@/assets/doc/login/osm-login.png" />
        </figure>
        <p>
          <b>3)</b>&nbsp;
          <i18n-t keypath="docloginview content4" scope="global">
            <i>{{ $t('Grant Access') }}</i>
          </i18n-t>
        </p>
        <figure class="image column is-8">
          <img src="@/assets/doc/login/oauth.png" />
        </figure>
        <p>
          <b>{{ $t('Note') }}</b> {{ $t('docloginview content5') }}
        </p>
      </div>
    </div>
  </section>
  <section class="section">
    <div class="container is-max-desktop">
      <div class="content">
        <doc-nav prev-url="/doc" next-url="/doc/select">
          <template #previous>
            <strong>{{ $t('docview title') }}</strong>
          </template>
          <template #next>
            <em>{{ $t('docview title') }}</em>
            <strong>{{ $t('docview select') }}</strong>
          </template>
        </doc-nav>
      </div>
    </div>
  </section>
</template>

<script setup>
import DocNav from '@/components/DocNav.vue'
</script>
