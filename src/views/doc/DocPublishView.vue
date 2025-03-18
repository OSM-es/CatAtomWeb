<template>
  <section class="hero is-primary">
    <div class="hero-body">
      <div class="container is-max-desktop">
        <p class="title">{{ $t('docview title') }}</p>
        <p class="subtitle">{{ $t('Publish') }}</p>
      </div>
    </div>
  </section>
  <section class="section">
    <div class="container is-max-desktop">
      <div class="content">
        <p>
          <i18n-t keypath="docpublishview content1" scope="global">
            <a href="https://tareas.openstreetmap.es/">{{
              $t('Task Manager')
            }}</a>
          </i18n-t>
        </p>
        <p>
          <i18n-t keypath="docpublishview content2" scope="global">
            <router-link to="/doc">{{ $t('Docs') }}</router-link>
          </i18n-t>
        </p>
        <p>
          <i18n-t keypath="docpublishview content3" scope="global">
            <em>{{ $t('add_project') }}</em>
          </i18n-t>
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
          <i18n-t keypath="docpublishview content4" scope="global">
            <b>zoning.zip</b>
            <font-awesome-icon icon="download" />
          </i18n-t>
        </p>
        <p>
          <i18n-t keypath="docpublishview content5" scope="global">
            <em>{{ $t('Select file') }}</em>
          </i18n-t>
        </p>
        <figure class="image column is-11">
          <img src="@/assets/doc/publish/new-project.png" />
        </figure>
        <p>
          <i18n-t keypath="docpublishview content6" scope="global">
            <b>{{ $t('important') }}</b>
            <em>{{ $t('docpublishview content7') }}</em>
          </i18n-t>
        </p>
        <p>
          <i18n-t keypath="docpublishview content8" scope="global">
            <em>{{ $t('next') }}</em>
          </i18n-t>
        </p>
        <p>
          {{ $t('docpublishview content9') }}
        </p>
        <figure class="image column is-5">
          <img src="@/assets/doc/publish/review.png" />
        </figure>
        <p>{{ $t('docpublishview content10') }}</p>
        <p>
          <i18n-t keypath="docpublishview content11" scope="global">
            <em>{{ $t('Copy to clipboard') }}</em>
          </i18n-t>
        </p>
        <figure class="image has-text-left ml-6">
          <span class="button is-fake-btn">
            <span class="icon">
              <font-awesome-icon icon="copy" />
            </span>
          </span>
        </figure>
        <p>
          <i18n-t keypath="docpublishview content12" scope="global">
            <em>{{ $t('create') }}</em>
          </i18n-t>
        </p>
        <p>
          {{ $t('docpublishview content13') }}
        </p>
        <figure class="image column is-9">
          <img src="@/assets/doc/publish/description.png" />
        </figure>
        <p>
          {{ $t('docpublishview content14') }}
        </p>
        <p>{{ $t('docpublishview content15') }}</p>
        <p>{{ $t('docpublishview content16') }}</p>
      </div>
    </div>
  </section>
  <section class="section">
    <div class="container is-max-desktop">
      <div class="content">
        <doc-nav prev-url="/doc/fixme" next-url="/doc">
          <template #previous>
            <em>{{ $t('docview title') }}</em>
            <strong>{{ $t('docview fixme') }}</strong>
          </template>
          <template #next>
            <strong>{{ $t('docview title') }}</strong>
          </template>
        </doc-nav>
      </div>
    </div>
  </section>
</template>

<script setup>
import DocNav from '@/components/DocNav.vue'
</script>
