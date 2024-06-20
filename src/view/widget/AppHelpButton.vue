<template>
  <a :href="serverAddress + '/api/public/arvand_monitoring_help.pdf'" target="_blank">
    <v-btn
        icon>
      <v-icon>mdi-help</v-icon>
    </v-btn>
  </a>
</template>

<script>

export default {
  name: 'AppHelpButton',
};
</script>
