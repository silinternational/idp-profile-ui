<template>
  <ProfileWizard ref="wizard">
    <BasePage>
      <template slot="header">
        {{ $vuetify.t('$vuetify.2sv.codes.new.header') }}
      </template>

      <p v-if="printing" class="printable header">
        {{ $root.idpConfig.idpName }} 
        <span class="caption">
          ({{ $vuetify.t('$vuetify.2sv.codes.new.generated') }} {{ Date.now() | formatLong }})
        </span>
      </p>
      <v-layout column wrap align-center justify-center id="codes">
        <p v-if="! codes.length" class="body-2">
          {{ $vuetify.t('$vuetify.2sv.codes.new.loading') }}
        </p>
        
        <div v-for="code in codes" :key="code" class="layout row align-center pr-5">
          <v-icon class="pr-2">check_box_outline_blank</v-icon> <span class="code">{{ code }}</span>
        </div>
      </v-layout>
    </BasePage>

    <ButtonBar>
      <v-btn @click="print('#codes')" color="secondary" flat outline>
        {{ $vuetify.t('$vuetify.2sv.codes.new.button.print') }}
        <v-icon right>print</v-icon>
      </v-btn>
      <v-btn :href="`data:text/plain,${encodedData}`" :download="`${$root.idpConfig.idpName}--printable-codes.txt`" color="secondary" flat outline>
        {{ $vuetify.t('$vuetify.2sv.codes.new.button.download') }}
        <v-icon right>cloud_download</v-icon>
      </v-btn>
      <v-btn v-if="copied" @click="copy()" color="success" flat outline>
        {{ $vuetify.t('$vuetify.2sv.codes.new.button.copied') }}
        <v-icon right>checked</v-icon>
      </v-btn>
      <v-btn v-else @click="copy()" color="secondary" flat outline>
        {{ $vuetify.t('$vuetify.2sv.codes.new.button.copy') }}
        <v-icon right>assignment</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      
      <v-btn @click="finish" color="primary" flat outline> 
        {{ $vuetify.t('$vuetify.2sv.codes.new.button.ok') }}
      </v-btn>
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
    copied: false
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
      this.printing = true
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

      this.copied = true
    },
  },
}
</script>

<style scoped>
span.code {
  font-size: 1.5em;
  font-family: monospace;
}

.layout.column.wrap {
  max-height: 12em; /* this height, in combination with the font-size, will limit the number of codes per column to 5. */
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
}
</style>

