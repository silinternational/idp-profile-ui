<template>
  <ProfileWizard ref="wizard">
    <BasePage>
      <template #header>
        {{ $t('2sv.codes.new.header') }}
      </template>

      <p v-if="printing" class="printable header">
        {{ $idpConfig.idpName }}
        <span class="text-caption"> ({{ $t('2sv.codes.new.generated') }} {{ formatLongDate(Date.now()) }}) </span>
      </p>

      <v-row id="codes">
        <v-col
          v-for="(code, i) in codes"
          :key="code"
          cols="6"
          :class="{ 'text-right': i % 2 === 0 }"
          class="text-no-wrap"
        >
          <v-icon class="pr-2">mdi-checkbox-blank-outline</v-icon>
          <span class="code xsCode">{{ code }}</span>
        </v-col>
      </v-row>
    </BasePage>

    <ButtonBar>
      <v-btn
        color="secondary"
        :variant="!mobile ? 'outlined' : undefined"
        :icon="mobile"
        class="mr-0 mr-sm-4 mx-4 mx-sm-0"
        @click="print('#codes')"
      >
        <span v-if="!mobile">{{ $t('2sv.codes.new.button.print') }}</span>

        <v-tooltip location="top">
          <template #activator="{ props }">
            <v-icon v-bind="props" :end="!mobile" :size="mobile ? 'large' : undefined" title="print">
              mdi-printer
            </v-icon>
          </template>
          <span>Print</span>
        </v-tooltip>
      </v-btn>

      <v-btn
        :href="`data:text/plain,${encodedData}`"
        :download="`${$idpConfig.idpName}--printable-codes.txt`"
        color="secondary"
        :variant="!mobile ? 'outlined' : undefined"
        :icon="mobile"
        class="mr-0 mr-sm-4 mx-4 mx-sm-0"
        @click="gotEm = true"
      >
        <span v-if="!mobile">{{ $t('2sv.codes.new.button.download') }}</span>

        <v-tooltip location="top">
          <template #activator="{ props }">
            <v-icon v-bind="props" :end="!mobile" :size="mobile ? 'large' : undefined">mdi-cloud-download</v-icon>
          </template>
          <span>Download</span>
        </v-tooltip>
      </v-btn>

      <v-btn
        v-if="copied"
        color="success"
        :variant="!mobile ? 'outlined' : undefined"
        :icon="mobile"
        class="mr-0 mr-sm-4 mx-4 mx-sm-0"
        @click="copy()"
      >
        <span v-if="!mobile">{{ $t('2sv.codes.new.button.copied') }}</span>

        <v-tooltip location="top">
          <template #activator="{ props }">
            <v-icon v-bind="props" :end="!mobile" :size="mobile ? 'large' : undefined">
              mdi-clipboard-check-multiple-outline
            </v-icon>
          </template>
          <span>Copy</span>
        </v-tooltip>
      </v-btn>

      <v-btn
        v-else
        color="secondary"
        :variant="!mobile ? 'outlined' : undefined"
        :icon="mobile"
        class="mr-0 mr-sm-4 mx-4 mx-sm-0"
        @click="copy()"
      >
        <span v-if="!mobile">{{ $t('2sv.codes.new.button.copy') }}</span>

        <v-tooltip location="top">
          <template #activator="{ props }">
            <v-icon v-bind="props" :end="!mobile" :size="mobile ? 'large' : undefined">
              mdi-clipboard-multiple-outline
            </v-icon>
          </template>
          <span>Copy</span>
        </v-tooltip>
      </v-btn>

      <v-spacer></v-spacer>

      <v-tooltip :disabled="gotEm" :model-value="gotEm" location="top">
        <template #activator="{ props }">
          <v-btn v-bind="props" :disabled="!gotEm" color="primary" variant="outlined" @click.once="finish">
            {{ $t('2sv.codes.new.button.ok') }}
          </v-btn>
        </template>

        {{ $t('2sv.codes.new.personalCopy') }}
      </v-tooltip>
    </ButtonBar>
  </ProfileWizard>
</template>

<script>
import ProfileWizard from '@/profile/ProfileWizard.vue'
import { add } from '@/global/mfa'
import { formatLongDate } from '@/global/filters'
import { useDisplay } from 'vuetify'

export default {
  name: 'NewCodes',
  components: {
    ProfileWizard,
  },
  data() {
    return {
      codes: [],
      printing: false,
      copied: false,
      gotEm: false,
    }
  },
  computed: {
    idpConfig() {
      return this.idpConfig
    },
    encodedData() {
      return encodeURIComponent(`${this.$idpConfig.idpName}\r\n${this.codes.join('\r\n')}`)
    },
    mobile() {
      const { xs } = useDisplay()
      return xs.value
    },
  },
  async created() {
    const newCodes = await add('backupcode')
    this.codes = newCodes.data
    this.$refs.wizard.completed()
  },
  methods: {
    formatLongDate,
    finish() {
      this.$refs.wizard.next()
    },
    async print(id) {
      this.printing = true
      this.gotEm = this.printing === true
      const el = document.querySelector(id)

      el.classList.add('printable')

      // Wait for DOM updates
      await this.$nextTick()

      window.print()

      this.printing = false
    },
    async copy() {
      await navigator.clipboard.writeText(`${this.$idpConfig.idpName}\r\n${this.codes.join('\r\n')}`)
      this.copied = true
      this.gotEm = this.copied === true
    },
  },
}
</script>

<style scoped>
span.code {
  font-size: 1.5em;
  font-family: monospace;
}

i.v-icon {
  vertical-align: text-bottom; /* vertically centers the checkbox and the code */
}

@media only screen and (max-width: 480px) {
  span.xsCode {
    font-size: 1.2em;
  }
}
</style>

<style>
@media print {
  body * {
    visibility: hidden;
    overflow: visible !important;
    padding: initial !important;
    margin: initial !important;
    height: initial !important;
  }

  .printable {
    position: absolute;
    top: 30%;
    left: 0;
  }

  .printable.header {
    position: absolute;
    top: 0;
    left: 0;
  }

  .printable,
  .printable * {
    visibility: visible;
  }

  .printable .col {
    padding: 12px !important;
  }
}
</style>
