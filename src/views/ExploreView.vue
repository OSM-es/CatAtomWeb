<script setup>
import { onMounted, ref } from 'vue'
import { api } from '@/services/api'
import FilterInput from '@/components/FilterInput.vue'

const totalPages = ref(1)
const currentPage = ref(1)
const filters = ref({
  name: { value: '', keys: ['mun_code', 'name', 'split_name', 'user'] },
})

const jobs = ref([])

onMounted(async () => {
  const response = await api.getJobs()
  jobs.value = response.data
})

const link = (row) => ({
  name: 'process',
  params: { munCode: row.mun_code, divCode: row.split_id },
})
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="content">
        <filter-input v-model="filters.name.value"></filter-input>
        <VTable
          v-model:currentPage="currentPage"
          class="table"
          :data="jobs"
          :page-size="16"
          :filters="filters"
          @total-pages-changed="totalPages = $event"
        >
          <template #head>
            <tr>
              <VTh sort-key="mun_code">{{ $t('Project') }}</VTh>
              <VTh sort-key="status">{{ $t('Status') }}</VTh>
              <VTh sort-key="user">{{ $t('User') }}</VTh>
              <VTh sort-key="tasks">{{ $t('Tasks') }}</VTh>
              <VTh sort-key="parts"
                >{{ $t('Buildings') }} ({{ $t('parts') }})</VTh
              >
              <VTh sort-key="address">{{ $t('Addresses') }}</VTh>
            </tr>
          </template>
          <template #body="{ rows }">
            <tr v-for="(row, i) in rows" :key="i">
              <td>
                <router-link :to="link(row)">
                  {{ row.mun_code }} {{ row.name }}
                  <span v-if="row.split_id">/ {{ row.split_name }}</span>
                </router-link>
              </td>
              <td>{{ $t(row.status) }}</td>
              <td>
                <a
                  :href="`https://www.openstreetmap.org/user/${row.user}`"
                  target="_blank"
                >
                  {{ row.user }}
                </a>
              </td>
              <td>{{ row.tasks }}</td>
              <td>{{ row.parts }}</td>
              <td>{{ row.address }}</td>
            </tr>
          </template>
        </VTable>
      </div>
      <div class="is-pulled-left">
        <VTPagination
          v-model:currentPage="currentPage"
          :total-pages="totalPages"
          :boundary-links="true"
        />
      </div>
    </div>
  </section>
</template>
