import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const GET = async () => {
  const payload = await getPayload({
    config: configPromise,
  })

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
  });
  return Response.json(users)
}
