<template>
  <div class="">
    <a-upload
      id="file"
      name="image"
      list-type="picture-card"
      class="avatar-uploader flex-container"
      :custom-request="uploadFile"
      :show-upload-list="false"
      accept="image/x-png,image/jpeg,image/gif"
      @change="handleChange"
    >
      <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
      <div v-else>
        <a-icon :type="loading ? 'loading' : 'plus'" />
        <div class="ant-upload-text">
          Take Picture
        </div>
      </div>
    </a-upload>
    <div class="steps">
      <a-steps :current="currentStep">
        <a-step title="Capture">
          <a-icon slot="icon" type="camera" />
        </a-step>
        <a-step title="Process">
          <a-icon slot="icon" type="sync" :spin="currentStep === 1" />
        </a-step>
        <a-step title="Result">
          <a-icon slot="icon" type="smile-o" />
        </a-step>
      </a-steps>
    </div>
  </div>
</template>
<script>
function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default {
  data() {
    return {
      loading: false,
      imageUrl: '',
      currentStep: 0,
    }
  },
  methods: {
    handleChange(info) {
      if (info.file.status === 'uploading') {
        this.currentStep = 1
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        console.log('Uploaded')
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (imageUrl) => {
          this.imageUrl = imageUrl
          this.loading = false
        })
        this.currentStep = 2
      }
    },
    uploadFile(options) {
      const { onSuccess, onError, file, onProgress } = options
      onProgress(50)
      return new Promise((resolve, reject) => {
        const uploadUrl = 'http://192.168.31.98:5000/image'
        const formData = new FormData()
        formData.append('image', file)
        this.$axios
          .post(uploadUrl, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((r) => {
            if (r.data && r.data.result) {
              this.showResult(r.data.result)
            }
            onSuccess()
          })
          .catch((e) => {
            console.log(e)
            this.$warning({
              title: 'Error',
              // JSX support
              content: (
                <div>
                  <p>Some error occured during POST</p>
                  <p>{e.message}</p>
                </div>
              ),
            })
            onError(e)
          })
      })
    },
    showResult(res) {
      if (res.length > 0) {
        this.$success({
          title: 'Results',
          // JSX support
          content: (
            <div>
              <p>{res.join('')}</p>
            </div>
          ),
        })
      } else {
        this.$warning({
          title: 'Results',
          // JSX support
          content: (
            <div>
              <p>No results found</p>
            </div>
          ),
        })
      }
    },
  },
}
</script>
<style>
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.avatar-uploader img {
  width: auto;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}

.flex-container {
  min-height: 300px !important;
  display: flex;
  justify-content: center;
  align-items: center;
}
.steps {
  padding: 10px 20px 10px 20px;
  max-width: 600px;
  margin: 0 auto;
}
</style>
