import { track_steps } from '@/payload-generated-schema'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { eq, sql, and } from '@payloadcms/db-sqlite/drizzle'

export const GET = async () => {
  const payload = await getPayload({
    config: configPromise,
  })
  // payload.db.drizzle.query.track_steps.findFirst({where:eq(track_steps.id,1)})

  const users = await payload.find({
    collection: 'users',
    where: {
      and: [
        {
          email: {
            contains: '@example.com',
          },
        },
        {
          loginAttempts: {
            greater_than: 2,
          },
        },
      ],
    },
  })
  return Response.json(users)
}
