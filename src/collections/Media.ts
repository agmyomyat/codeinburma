import type { CollectionConfig } from 'payload'
import { CollectionBeforeChangeHook } from 'payload'
import path from 'path'
const renameFile: CollectionBeforeChangeHook = async ({ req, data }) => {
  if (req.file && req.file.name) {
    const { name, ext } = path.parse(req.file.name)
    const newFileName = `cib-${name}-${Date.now()}${ext}`
    req.file.name = newFileName
    data.filename = newFileName
  }
  return data
}

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  hooks: {
    beforeChange: [renameFile],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {},
}
