// storage-adapter-import-placeholder
// import { postgresAdapter } from '@payloadcms/db-postgres'
import { s3Storage } from '@payloadcms/storage-s3'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import {} from './collections/schema-demo'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { TypeEnv } from './lib/env'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: { url: 'file:./db.sqlite' },
  }),
  sharp,
  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: TypeEnv.S3_BUCKET,
      config: {
        credentials: {
          accessKeyId: TypeEnv.S3_ACCESS_KEY_ID,
          secretAccessKey: TypeEnv.S3_SECRET_ACCESS_KEY,
        },
        region: TypeEnv.S3_REGION,
        endpoint: TypeEnv.S3_ENDPOINT,
        // ... Other S3 configuration
      },
    }),
  ],
})
