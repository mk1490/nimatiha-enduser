<template>
  <v-container>
    <div class="v-row">
      <div
          v-for="(item, index) in items"
          @click="fileClick(item, index)"
          class="v-col-12">
        <div class="upload-item px-3">
          <div class="v-row">
            <div class="v-col-7 align-content-center">
              <div class="d-inline-flex">
                <h3>
                  {{ item.title }}
                </h3>
                <small v-if="item.isRequired"
                       class="mx-1 required"
                >
                  *
                </small>
              </div>
              <div class="file-size">
                <h5>
                  {{ item.maximumSizeInMb }} مگابایت
                </h5>
              </div>
            </div>
            <div class="v-col">
              <v-img
                  :aspect-ratio="16/9"
                  cover
                  :src="item.image"/>
            </div>
          </div>
        </div>
        <input
            hidden="hidden"
            type="file"
            :id="`fp_${index}`"
            :ref="`fp_${index}`"
            @change="fileChange($event, index)"/>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "UploadDocuments",
  mounted() {
    this.httpGet(`/member-request/initialize/uploaded-document`, result => {
      this.items = result.map(f => {
        if (f.image) {
          f.image = this.serverAddress + f.image;
        }
        return f;
      });
    })
  },
  data() {
    return {
      items: [],
    }
  },
  methods: {
    fileClick(item, index) {
      document.getElementById(`fp_${index}`).click()
    },
    fileChange(event, index) {
      const file = event.target.files[0];

      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onloadend = () => {


        const formData = new FormData();
        formData.append('file', file)
        this.httpPost(`/member-request/upload-file/${this.items[index].id}`, formData, result => {
          let item = {...this.items[index]};
          item.image = fileReader.result;
          this.items.splice(index, 1, item);
        })
      }
    },
    validate() {
      const hasRequiredButNotUploadedFiles = [];
      this.items.map(f => {
        if (f.isRequired === true && !f.image) {
          hasRequiredButNotUploadedFiles.push(true)
        }
      })
      if (hasRequiredButNotUploadedFiles.length > 0) {
        return false;
      }
      return true
    }
  }
}
</script>

<style scoped>

.upload-item {
  border: 2px dashed #9E9E9E;
  border-radius: 8px;
  padding-block: 1rem;
  font-size: 1rem;
  cursor: pointer;

  .v-img {
    border-radius: 8px;
  }

  .required {
    color: red;
    font-size: 0.75rem;
  }

  .file-size {
  }
}

</style>