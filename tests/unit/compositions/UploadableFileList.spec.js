/* eslint-disable no-undef */
import UploadableFileList from '@/compositions/UploadableFileList'
import { faker } from '@faker-js/faker'

const newFiles = [...Array(6).keys()].map((id) => {
  return { id, name: faker.system.commonFileName() }
})

test('filterByNames', () => {
  const expected = newFiles.slice(2, 4)
  const selection = [newFiles[2].name, newFiles[3].name]
  const result = UploadableFileList.filterByNames(newFiles, selection)

  expect(result).toEqual(expected)
})

test('removeFile', () => {
  const files = new UploadableFileList()

  files.addFiles(newFiles)
  files.removeFile(newFiles[3].name)
  expect(files.files.value[newFiles[3].name]).toBeUndefined()
})

describe('With files', () => {
  const files = new UploadableFileList()

  files.addFiles(newFiles)

  test('getFiles', () => {
    expect(files.getFiles()[5].file.id).toBe(5)
  })

  test('getFile', () => {
    expect(files.getFile(newFiles[3].name).file.id).toBe(3)
  })

  test('fileExists', () => {
    expect(files.fileExists(newFiles[3].name)).toBeTruthy()
  })

  test('onUploadProgress', () => {
    const file = files.files.value[newFiles[3].name]
    file.onUploadProgress()({ loaded: 57, total: 100 })
    expect(file.percentCompleted).toBe(57)
  })
})
