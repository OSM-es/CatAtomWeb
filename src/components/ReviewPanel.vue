<script setup>
import { ref } from "vue";
import debounce from "lodash.debounce";
import { useJobStore } from "@/stores/job";
import { useErrorStore } from "@/stores/error";
import { useChatService } from "@/services/chat";

const job = useJobStore();
const errorStore = useErrorStore();
const chat = useChatService();
const filters = ref({ name: { value: "", keys: ["cat", "conv"] } });
const totalPages = ref(1);
const currentPage = ref(1);

const editHandler = debounce((event) => {
  const key = event.target.attributes["data-key"].value;
  const cat = job.callejero[key][0];
  job
    .updateHighway(cat, event.target.value)
    .then(() => {
      const msg = "hgw " + cat;
      chat.socket.emit("updateJob", msg, job.cod_municipio);
    })
    .catch((err) => errorStore.set(err));
}, 500);

function chatColor(row) {
  return row.length < 3 || !row[2] ? "" : "chat-color-" + (row[2] % 32);
}

function highwayNames() {
  return job.callejero.map((row, i) => ({
    key: i,
    cat: row[0],
    conv: row[1],
    color: chatColor(row),
  }));
}

function deleteHandler(event) {
  event.target.value = "";
  editHandler(event);
}

function deleteFilter() {
  filters.value.name.value = "";
}
</script>

<template>
  <vue-collapsible-panel class="panel is-info">
    <template #title>
      <p class="panel-heading">{{ $t("Review street names") }}</p>
    </template>
    <template #content>
      <div class="panel-block">
        <div class="field has-addons">
          <div class="control has-icons-right">
            <input
              ref="filterInput"
              class="input"
              v-model="filters.name.value"
              :placeholder="$t('Filter')"
            />
            <span class="icon is-right">
              <font-awesome-icon icon="search" />
            </span>
          </div>
          <div class="control">
            <a
              class="button has-tooltip-arrow has-tooltip-right"
              @click="deleteFilter"
              :data-tooltip="$t('Delete filter')"
            >
              <font-awesome-icon icon="times" />
            </a>
          </div>
        </div>
      </div>
      <div class="panel-block">
        <VTable
          class="table is-narrow"
          :data="highwayNames()"
          :filters="filters"
          :pageSize="12"
          v-model:currentPage="currentPage"
          @totalPagesChanged="totalPages = $event"
        >
          <template #head>
            <tr>
              <VTh sortKey="cat" defaultSort="asc">{{
                $t("Name in Cadastre")
              }}</VTh>
              <VTh sortKey="conv">{{ $t("Conversion") }}</VTh>
            </tr>
          </template>
          <template #body="{ rows }">
            <tr v-for="row in rows" :key="row.key" :class="row.color">
              <td class="is-valign-middle">{{ row.cat }}</td>
              <td>
                <div class="field has-addons">
                  <div class="control is-expanded">
                    <input
                      class="input"
                      :value="row.conv"
                      :data-key="row.key"
                      @input="editHandler"
                    />
                  </div>
                  <div class="control">
                    <button
                      class="button has-tooltip-arrow"
                      :data-key="row.key"
                      :data-tooltip="$t('Delete')"
                      @click="deleteHandler"
                    >
                      <font-awesome-icon icon="times" />
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
          :boundaryLinks="false"
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
