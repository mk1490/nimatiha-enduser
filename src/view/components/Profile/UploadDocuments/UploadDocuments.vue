<template>
  <v-container>
    <v-card>
      <v-card-title>
        بارگذاری مدارک هویتی
      </v-card-title>
      <v-card-text>
        <template v-for="(item,index) in uploadItemsArray">
          <div
              @click="openFilePicker(index)"
              @dragenter="dragEnter"
              @drop="handleDrop"
              @dragover="onDragOver($event)"
              @drag="drag"
              style="height: 150px"
              class="upload--area mb-4"
              :class="{'disabled-upload': item.isAlreadyUploaded} "
          >
            <div class="mt-3 mr-2">
              <div class="d-flex justify-start">
                <h5 class="text-right mt-2">{{ item.title }}</h5>
                <small
                    v-if="item.isRequired"
                    class="mr-2">*</small>
              </div>
            </div>


            <div class="text-center">
              <div class="d-block">
                <span
                    class="file-picker-message">جهت انتخاب فایل، اینجا را کلیک کنید یا فایل را در اینجا رها نمایید.</span>
              </div>
              <div
                  v-if="item.isAlreadyUploaded"
                  class="d-block">
                <div
                    class="uploading already-upload d-inline-flex">
                  <v-icon
                      size="16"
                      class="white--text">
                    mdi-check
                  </v-icon>
                  <span class="mr-1 uploading already-upload">
                                        فایل قبلا بارگذاری شده است.
                                    </span>
                </div>
              </div>
              <div class="d-block">
                <strong class="file--name">{{
                    uploadItemsArray[index].file ? uploadItemsArray[index].file.name : ''
                  }}</strong>
              </div>
              <div class="d-block">
                <strong class="file--size">
                  {{
                    uploadItemsArray[index].file ? getBytesMbFromFile(uploadItemsArray[index].file) : ''
                  }}
                </strong>
              </div>
              <div
                  v-if="uploadItemsArray[index].progress != -1"
                  class="d-block pb-5">
                <div
                    v-if="uploadItemsArray[index].progress < 100"
                    class="d-inline-flex">
                  <v-progress-circular
                      indeterminate
                      size="16"
                  />
                  <span
                      class="uploading uploading-progress">
                                        درحال بارگذاری
                                        {{ uploadItemsArray[index].progress }}
                                    </span>
                </div>

                <div
                    v-if="uploadItemsArray[index].progress == 100"
                    class="uploading uploading-success d-inline-flex">
                  <v-icon
                      size="16"
                      class="white--text">
                    mdi-check
                  </v-icon>
                  <span class="mr-1 uploading uploading-success">
                                        بارگذاری کامل شد.
                                    </span>
                </div>
              </div>
            </div>
          </div>
          <input
              ref="filePicker"
              hidden="hidden" @change="onFileSelected($event, index)" type="file"/>
        </template>
      </v-card-text>
      <v-card-actions>
        <v-btn
            @click="startUploadDocuments"
            block color="primary">
          بارگذاری فایل‌ها
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "UploadDocuments",
  computed: {
    ...mapGetters(['uploadedDocuments'])
  },
  created() {
    this.prepareUploadTemplates()
  },
  data() {
    return {
      x: null,
      y: null,
      target: null,
      uploadItemsArray: [],
      finalUploadedObjects: []
    }
  },
  methods: {
    prepareUploadTemplates() {
      this.uploadItemsArray = [...this.uploadedDocuments]
    },
    dragEnter(event) {
    },
    handleDrop(event) {
      event.stopPropagation();
      event.preventDefault();
      console.log(event.dataTransfer.files)
    },
    onDragOver(event) {
      event.preventDefault();
    },
    drag(event) {
      console.log(event)
    },
    openFilePicker(index) {
      if (this.uploadItemsArray[index].isAlreadyUploaded == true)
        return;
      this.$refs.filePicker[index].click()
    },
    getBytesMbFromFile(file) {
      let _size = file.size;
      const fSExt = new Array('بایت', 'کیلوبایت', 'مگابایت', 'گیگابایت');
      let i = 0;
      while (_size > 900) {
        _size /= 1024;
        i++;
      }
      const exactSize = (Math.round(_size * 100) / 100) + ' ' + fSExt[i];
      return exactSize
    },
    onFileSelected(event, index) {
      const file = event.target.files[0]
      this.$set(this.uploadItemsArray[index], 'file', file)
      const tusUpload = new tus.Upload(file, {
        endpoint: process.env.VUE_APP_UPLOAD_SERVER_ADDRESS + '/files/',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('Authorization'),
        },
        metadata: {
          filename: file.name,
          filetype: file.type,
          fileId: this.uploadItemsArray[index].id
        },
      });

      const payload = {
        tusObject: tusUpload,
        progress: -1,
        id: this.uploadItemsArray[index].id,
      }

      if (!this.finalUploadedObjects[index]) {
        this.finalUploadedObjects.push(payload)
      } else {
        this.finalUploadedObjects.splice(index, 1, payload)
        this.uploadItemsArray[this.uploadItemsArray.findIndex(x => x.id == this.finalUploadedObjects[index].id)].progress = -1;
      }
    },
    startUploadDocuments() {
      const unUploadedRequiredFiles = []
      this.uploadItemsArray.map(f => {
        if (f.isRequired) {
          if (!this.finalUploadedObjects.find(x => x.id == f.id)) {
            if (!f.isAlreadyUploaded) {
              unUploadedRequiredFiles.push(f.id)
            }
          }
        }
      })
      if (unUploadedRequiredFiles.length > 0) {
        this.$toast.error('فایل‌های ضروری جهت بارگذاری انتخاب نشده‌اند!')
        return;
      }

      if (this.finalUploadedObjects.length == 0) {
        this.$toast.error('هیچ فایلی جهت بارگذاری انتخاب نشده است.')
        return;
      }

      for (let i = 0; i < this.finalUploadedObjects.length; i++) {
        const f = this.finalUploadedObjects[i];

        f.tusObject.options.onProgress = (bytesSent, bytesTotal) => {
          const percent = (bytesSent * 100) / bytesTotal;
          const index = this.uploadItemsArray.findIndex(x => x.id === f.id)
          if (index !== -1) {
            this.$set(this.uploadItemsArray[index], 'progress', percent)
            this.uploadItemsArray[index].progress = percent;
          }
        }
        f.tusObject.start();
      }
    }
  },
  watch: {
    'uploadedDocuments': {
      handler() {
        this.prepareUploadTemplates()
      }
    }
  }
}
</script>

<style scoped>
h5 {
  font-family: IranVazirmatnUIFD !important;
}

small {
  color: red;
}

.upload--area {
  border-radius: 15px;
  border-style: dashed;
  border-width: 1px;
  direction: rtl;
  cursor: pointer;
}

.file-picker-message {
  font-family: IranVazirmatnUIFD !important;
  font-size: 16px;
}

.file--name {
  font-family: IranVazirmatnUIFD;
  font-size: 18px;
}

.file--size {
  font-family: IranVazirmatnUIFD;
  font-size: 16px;
}

.uploading {
  font-family: IranVazirmatnUIFD !important;
  padding-left: 3px;
  padding-right: 3px;
  border-radius: 12px;
}

.uploading-success {
  color: white !important;
  background-color: #1a5e20 !important;
}

.already-upload {
  color: white !important;
  background-color: #FB8C00 !important;
}

.uploading-progress {

}

.disabled-upload {
  cursor: not-allowed;
}
</style>