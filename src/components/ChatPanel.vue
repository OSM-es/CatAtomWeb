/* eslint-disable prettier/prettier */
<script setup>
import { computed, ref } from "vue";
import { useChatService } from "@/services/chat";
import { useJobStore } from "@/stores/job";

const job = useJobStore();
const chat = useChatService();
const message = ref("");
const chatActive = computed(() => job.participantes > 0);

function getMessage(msg) {
  const message = Object.prototype.hasOwnProperty.call(msg, "message")
    ? msg.message
    : msg;
  return message.split(/\r?\n/);
}

function send() {
  chat.sendMessage(message.value);
  message.value = "";
}
</script>

<template>
  <nav class="panel" :class="chatActive ? 'is-info' : ''">
    <div class="panel-heading">Charla</div>
    <div class="panel-block chat">
      <div class="container">
        <div
          v-for="(msg, i) in job.charla"
          :key="i"
          :class="msg.hasOwnProperty('username') ? 'message' : 'notify'"
        >
          <p v-if="msg.hasOwnProperty('username')">
            <strong>{{ msg.username }}</strong>
          </p>
          <p v-for="(row, i) in getMessage(msg)" :key="i">{{ row }}</p>
        </div>
      </div>
    </div>
    <div class="panel-block chat">
      <div class="container">
        <div class="field has-addons">
          <div class="control is-expanded">
            <textarea
              class="textarea"
              v-model="message"
              :disabled="!chatActive"
            ></textarea>
          </div>
          <div class="control">
            <button class="button" :disabled="!chatActive" @click="send">
              <span class="icon">
                <font-awesome-icon icon="paper-plane" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
