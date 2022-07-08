import { ref } from 'vue'

export default class UploadableFileList {
  constructor() {
    this.files = ref({})
  }

  getFiles() {
    return Object.keys(this.files.value).map((id) => this.getFile(id))
  }

  getFile(id) {
    return this.files.value[id]
  }

  addFiles(newFiles) {
    ;[...newFiles].forEach((file) => {
      this.files.value[file.name] = new UploadableFile(file)
    })
  }

  fileExists(id) {
    return id in this.files.value
  }

  removeFile(id) {
    delete this.files.value[id]
  }

  static filterByNames(newFiles, filenames) {
    return [...newFiles].filter((file) => {
      return filenames.some((name) => name == file.name)
    })
  }
}

class UploadableFile {
  constructor(file) {
    this.file = file
    this.status = null
    this.percentCompleted = 0
  }

  onUploadProgress() {
    let that = this

    return (event) => {
      that.percentCompleted = Math.round((event.loaded * 100) / event.total)
    }
  }
}
