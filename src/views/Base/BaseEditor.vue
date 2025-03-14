<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  name: "BaseEditor",
  props: {
    value: undefined,
  },
  data() {
    return {
      editorConfig: {
        editor: ClassicEditor,
        height: 800,
        language: {
          ui: 'fa',
          content: 'fa'
        },
      },
      model: {
        content: null,
      }
    }
  },
  watch: {
    'model.content': {
      handler(value) {
        this.$emit('input', value);
      }
    }
  }
}
</script>

<template>
  <ckeditor
      v-model="model.content"
      :editor="editorConfig.editor"
      :config="editorConfig">
  </ckeditor>
</template>

<style scoped>

</style>
