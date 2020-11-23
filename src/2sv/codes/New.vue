<template>
  <ProfileWizard ref="wizard">
    <BasePage>
      <template v-slot:header>
        {{ $vuetify.lang.t('$vuetify.2sv.codes.new.header') }}
      </template>

      <p v-if="printing" class="printable header">
        {{ $root.idpConfig.idpName }} 
        <span class="caption">
          ({{ $vuetify.lang.t('$vuetify.2sv.codes.new.generated') }} {{ Date.now() | formatLong }})
        </span>
      </p>
        
      <v-row id="codes">
        <v-col v-for="(code, i) in codes" :key="code" cols="6" :class="{'text-right': i % 2 === 0}">
          <v-icon class="pr-2">mdi-checkbox-blank-outline</v-icon> <span class="code">{{ code }}</span>
        </v-col>
      </v-row>
    </BasePage>

    <ButtonBar>
      <v-btn @click="print('#codes')" color="secondary" outlined class="mr-3">
        {{ $vuetify.lang.t('$vuetify.2sv.codes.new.button.print') }}
        <v-icon right>mdi-printer</v-icon>
      </v-btn>
      <v-btn :href="`data:text/plain,${encodedData}`" :download="`${$root.idpConfig.idpName}--printable-codes.txt`" @click="gotEm = true" color="secondary" outlined class="mr-3">
        {{ $vuetify.lang.t('$vuetify.2sv.codes.new.button.download') }}
        <v-icon right>mdi-cloud-download</v-icon>
      </v-btn>
      <v-btn v-if="copied" @click="copy()" color="success" outlined>
        {{ $vuetify.lang.t('$vuetify.2sv.codes.new.button.copied') }}
        <v-icon right>mdi-check</v-icon>
      </v-btn>
      <v-btn v-else @click="copy()" color="secondary" outlined>
        {{ $vuetify.lang.t('$vuetify.2sv.codes.new.button.copy') }}
        <v-icon right>mdi-file-table-box-outline</v-icon>
      </v-btn>
      <v-spacer></v-spacer>

      <v-tooltip :disabled="gotEm" :value="gotEm" top>
        <template v-slot:activator="{ on }">
          <div v-on="on">
            <v-btn @click="finish" :disabled="!gotEm" color="primary" outlined>
              {{ $vuetify.lang.t('$vuetify.2sv.codes.new.button.ok') }}
            </v-btn>
          </div>
        </template>

        {{ $vuetify.lang.t('$vuetify.2sv.codes.new.personalCopy') }}
      </v-tooltip>
    </ButtonBar>
  </ProfileWizard>
</template>

<script>
import ProfileWizard from '@/profile/ProfileWizard'
import { add } from '@/global/mfa';

export default {
  components: {
    ProfileWizard,
  },
  data: () => ({
    codes: [],
    printing: false,
    copied: false,
    gotEm: false,
  }),
  async created() {
    const newCodes = await add('backupcode')

    this.codes = newCodes.data
    
    this.$refs.wizard.completed()
  },
  computed: {
    encodedData() {
      return encodeURIComponent(
        `${this.$root.idpConfig.idpName}\r\n${this.codes.join('\r\n')}`
      )
    },
  },
  methods: {
    finish: function() {
      this.$refs.wizard.next()
    },
    print: async function(id) {
      this.gotEm = this.printing = true
      const el = document.querySelector(id)

      el.classList.add('printable')

      // don't print until the renderer has run again with the newly added 'printable' class.
      await this.$nextTick()
      window.print()
      this.printing = false
    },
    copy: async function() {
      await navigator.clipboard.writeText(
        `${this.$root.idpConfig.idpName}\r\n${this.codes.join('\r\n')}`
      )

      this.gotEm = this.copied = true
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

