<script setup>
import { ref } from "vue"
import debounce from "lodash.debounce"
import { useJobStore } from "@/stores/job"
import { useI18n } from "vue-i18n"
import { useChatService } from "@/services/chat"

const { t } = useI18n()
const chat = useChatService()
const job = useJobStore()
const filters = ref({ name: { value: "", keys: ["cat", "conv"] } })
const totalPages = ref(1)
const currentPage = ref(1)

chat.on("highway", (data) => {
  job.updateHighway(data)
})

const editHandler = debounce((key, value) => {
  const cat = job.callejero[key][0]
  job.putHighway(cat, value)
}, 500)

function deleteHandler(key) {
  editHandler(key, "")
}

function chatColor(row) {
  return row.length < 3 || !row[2] ? "" : "chat-color-" + (row[2] % 32)
}

function highwayNames() {
  return job.callejero.map((row, i) => ({
    key: i,
    cat: row[0],
    conv: row[1],
    color: chatColor(row),
    username: row.length > 3 ? row[3] : "",
  }))
}

function isActive() {
  return job.estado == "REVIEW" ? "is-info" : ""
}

function isExpanded() {
  return job.estado == "REVIEW"
}

function deleteFilter() {
  filters.value.name.value = ""
}

function getOwner(row) {
  if (row.username) {
    return t("Edited by") + " " + row.username
  }
  return null
}
</script>

<template>
  <vue-collapsible-panel
    class="panel"
    :class="isActive()"
    :expanded="isExpanded()"
  >
    <template #title>
      <p class="panel-heading">{{ $t("Review street names") }}</p>
    </template>
    <template #content>
      <div class="panel-block">
        <div class="field has-addons">
          <div class="control has-icons-right">
            <input
              ref="filterInput"
              v-model="filters.name.value"
              class="input"
              :placeholder="$t('Filter')"
            />
            <span class="icon is-right">
              <font-awesome-icon icon="search" />
            </span>
          </div>
          <div class="control">
            <a
              class="button has-tooltip-arrow has-tooltip-right"
              :data-tooltip="$t('Delete filter')"
              @click="deleteFilter"
            >
              <font-awesome-icon icon="times" />
            </a>
          </div>
        </div>
      </div>
      <div class="panel-block">
        <VTable
          v-model:currentPage="currentPage"
          class="table is-narrow"
          :data="highwayNames()"
          :filters="filters"
          :page-size="12"
          @total-pages-changed="totalPages = $event"
        >
          <template #head>
            <tr>
              <VTh sort-key="cat" default-sort="asc">{{
                $t("Name in Cadastre")
              }}</VTh>
              <VTh sort-key="conv">{{ $t("Conversion") }}</VTh>
            </tr>
          </template>
          <template #body="{ rows }">
            <tr v-for="row in rows" :key="row.key" :class="row.color">
              <td class="is-valign-middle">{{ row.cat }}</td>
              <td>
                <div class="field has-addons">
                  <div
                    class="control is-expanded has-tooltip-arrow"
                    :data-tooltip="getOwner(row)"
                  >
                    <input
                      class="input"
                      :value="row.conv"
                      :readonly="job.estado != 'REVIEW'"
                      @input="(e) => editHandler(row.key, e.target.value)"
                    />
                  </div>
                  <div class="control">
                    <button
                      v-if="job.estado == 'REVIEW'"
                      class="button has-tooltip-arrow"
                      :data-tooltip="$t('Delete')"
                      @click="deleteHandler(row.key)"
                    >
                      <font-awesome-icon icon="times" :data-key="row.key" />
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </template>
        </VTable>
      </div>
      <div class="panel-block">
        <VTPagination
          v-model:currentPage="currentPage"
          :total-pages="totalPages"
          :boundary-links="true"
        />
      </div>
    </template>
  </vue-collapsible-panel>
</template>

<style lang="scss">
.is-valign-middle {
  vertical-align: middle !important;
}
</style>
