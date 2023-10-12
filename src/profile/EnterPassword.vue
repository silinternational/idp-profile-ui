<template>
  <v-dialog v-model="dialogIsOpen" hide-overlay persistent width="initial">
    <v-card>
      <v-form @submit.prevent="revalidate" ref="form" class="pa-4">
        <p>{{ $vuetify.lang.t('$vuetify.password.revalidate.explanation') }}</p>

        <div class="password">
          <BaseTextField
            :type="passwordIsHidden ? 'password' : 'text'"
            :label="$vuetify.lang.t('$vuetify.password.revalidate.pwInput')"
            v-model="password"
            autofocus
            name="password"
            id="password"
          />

          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-on="on"
                v-bind="attrs"
                class="eye"
                icon
                @click="passwordIsHidden = !passwordIsHidden"
                tabindex="-1"
              >
                <v-icon>{{ passwordIsHidden ? 'mdi-eye' : 'mdi-eye-off' }}</v-icon>
              </v-btn>
            </template>

            <span>{{ passwordIsHidden ? 'Show' : 'Hide' }} password</span>
          </v-tooltip>
        </div>

        <ButtonBar>
          <v-btn @click="onClose" tabindex="-1" outlined>
            {{ $vuetify.lang.t('$vuetify.global.button.back') }}
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn @click="revalidate" color="primary" outlined>
            {{ $vuetify.lang.t('$vuetify.global.button.revalidate') }}
          </v-btn>
        </ButtonBar>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  dialogIsOpen: {
    type: Boolean,
    default: false,
  },
})

const password = ref('')

const passwordIsHidden = ref(true)

const emit = defineEmits(['revalidate', 'close'])

function revalidate() {
  emit('revalidate', password.value)
  onClose()
}

function onClose() {
  emit('close')
  password.value = ''
}
</script>
