<template>
  <section class="hero is-primary">
    <div class="hero-body">
      <div class="container is-max-desktop">
        <p class="title">{{ $t('docview title') }}</p>
        <p class="subtitle">{{ $t('docview process') }}</p>
      </div>
    </div>
  </section>
  <section class="section">
    <div class="container is-max-desktop">
      <div class="content">
        <p><b>1)</b> {{ $t('docprocessview content1') }}</p>
        <p>
          {{ $t('docprocessview content2') }}
        </p>
        <figure class="image column is-3">
          <img src="@/assets/doc/process/options.png" />
        </figure>
        <p>
          {{ $t('docprocessview content3') }}
        </p>
        <a id="options"></a>
        <p><b>2)</b> {{ $t('docprocessview content4') }}</p>
        <figure class="image column is-3">
          <img src="@/assets/doc/process/advanced.png" />
        </figure>
        <p>
          {{ $t('docprocessview content5') }}
        </p>
        <dl>
          <dt>
            <b><em>parcel_parts</em></b>
          </dt>
          <dd>
            {{ $t('docprocessview content6') }}
          </dd>
          <dt>
            <b><em>parcel_dist</em></b>
          </dt>
          <dd>
            {{ $t('docprocessview content7') }}
          </dd>
        </dl>
        <p><b>3)</b> {{ $t('docprocessview content8') }}</p>
        <p>
          {{ $t('docprocessview content9') }} <em>{{ $t('Process') }}</em
          >.
        </p>
        <figure class="image has-text-left ml-6">
          <span class="button is-primary is-fake-btn">
            <span>{{ $t('Process') }}</span>
            <span class="icon">
              <font-awesome-icon icon="running" />
            </span>
          </span>
        </figure>
        <p><b>4)</b> {{ $t('docprocessview content10') }}</p>
        <p>
          {{ $t('docprocessview content11') }}
        </p>
        <figure class="image column is-8">
          <img src="@/assets/doc/process/log.png" />
        </figure>
        <p>
          {{ $t('docprocessview content12') }}
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
            <em>{{ $t('docview title') }}</em>
            <strong>{{ $t('docview select') }}</strong>
          </template>
          <template #next>
            <em>{{ $t('docview title') }}</em>
            <strong>{{ $t('Review street names') }}</strong>
          </template>
        </doc-nav>
      </div>
    </div>
  </section>
</template>

<script setup>
import DocNav from '@/components/DocNav.vue'
</script>
