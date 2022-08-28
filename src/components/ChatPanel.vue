/* eslint-disable prettier/prettier */
<script setup>
import { ref } from 'vue'
import { useChatService } from '@/services/chat'
import { useJobStore } from '@/stores/job'
import { useUserStore } from '@/stores/user'

const job = useJobStore()
const user = useUserStore()
const chat = useChatService()
const message = ref('')

function chatClasses(msg) {
  if (Object.prototype.hasOwnProperty.call(msg, 'username')) {
    const userClass = msg.username == user.username ? 'right' : 'left'
    return `message-${userClass} chat-color-${msg.osmId % 32}`
  } else {
    return 'notify'
  }
}

function getRows(msg) {
  const rows = Object.prototype.hasOwnProperty.call(msg, 'message')
    ? msg.message
    : msg
  return rows.split(/\r?\n/)
}

function send(event) {
  if (event.shiftKey) {
    message.value += '\n'
  } else {
    chat.sendMessage(message.value)
    message.value = ''
  }
}
</script>

<template>
  <nav class="panel is-info">
    <div class="panel-heading">{{ $t('Chat') }}</div>
    <div class="panel-block chat">
      <div class="container" data-test="chat">
        <div v-for="(msg, i) in job.charla" :key="i" :class="chatClasses(msg)">
          <p v-if="msg.hasOwnProperty('username')" class="has-text-weight-bold">
            {{ msg.username }}
          </p>
          <p v-for="(row, j) in getRows(msg)" :key="j">{{ row }}</p>
        </div>
      </div>
    </div>
    <div class="panel-block chat">
      <div class="container">
        <div class="field has-addons">
          <div class="control is-expanded">
            <textarea
              v-model="message"
              class="textarea"
              @keydown.enter.prevent="send"
            ></textarea>
          </div>
          <div class="control">
            <button class="button" @click="send">
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

<style lang="scss" scoped>
.textarea {
  border-radius: 4px 0 4px 4px;
}
</style>
