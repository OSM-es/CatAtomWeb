/* eslint-disable prettier/prettier */
<script setup>
import { computed, ref } from "vue";
import { useChatService } from "@/services/chat";
import { useJobStore } from "@/stores/job";
import { useUserStore } from "@/stores/user";

const job = useJobStore();
const user = useUserStore();
const chat = useChatService();
const message = ref("");
const chatActive = computed(() => job.participantes > 1);

function chatClasses(msg) {
  if (Object.prototype.hasOwnProperty.call(msg, "username")) {
    const userClass = msg.username == user.username ? "right" : "left";
    return `message-${userClass} chat-color-${msg.osmId % 32}`;
  } else {
    return "notify";
  }
}

function getMessage(msg) {
  const message = Object.prototype.hasOwnProperty.call(msg, "message")
    ? msg.message
    : msg;
  return message.split(/\r?\n/);
}

function send(event) {
  if (event.shiftKey) {
    message.value += "\n";
  } else {
    chat.sendMessage(message.value);
    message.value = "";
  }
}
</script>

<template>
  <nav class="panel" :class="chatActive ? 'is-info' : ''">
    <div class="panel-heading">{{ $t("Chat") }}</div>
    <div class="panel-block chat">
      <div class="container">
        <div v-for="(msg, i) in job.charla" :key="i" :class="chatClasses(msg)">
          <p v-if="msg.hasOwnProperty('username')" class="has-text-weight-bold">
            {{ msg.username }}
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
              @keydown.enter.prevent="send"
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
