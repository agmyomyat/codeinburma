/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:db-schema` to regenerate this file.
 */

import {
  sqliteTable,
  index,
  uniqueIndex,
  foreignKey,
  integer,
  text,
  numeric,
} from '@payloadcms/db-sqlite/drizzle/sqlite-core'
import { sql, relations } from '@payloadcms/db-sqlite/drizzle'

export const users = sqliteTable(
  'users',
  {
    id: integer('id').primaryKey(),
    updatedAt: text('updated_at')
      .notNull()
      .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
    createdAt: text('created_at')
      .notNull()
      .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
    email: text('email').notNull(),
    resetPasswordToken: text('reset_password_token'),
    resetPasswordExpiration: text('reset_password_expiration').default(
      sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`,
    ),
    salt: text('salt'),
    hash: text('hash'),
    loginAttempts: numeric('login_attempts').default('0'),
    lockUntil: text('lock_until').default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
  },
  (columns) => ({
    users_updated_at_idx: index('users_updated_at_idx').on(columns.updatedAt),
    users_created_at_idx: index('users_created_at_idx').on(columns.createdAt),
    users_email_idx: uniqueIndex('users_email_idx').on(columns.email),
  }),
)

export const media = sqliteTable(
  'media',
  {
    id: integer('id').primaryKey(),
    alt: text('alt').notNull(),
    updatedAt: text('updated_at')
      .notNull()
      .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
    createdAt: text('created_at')
      .notNull()
      .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
    url: text('url'),
    thumbnailURL: text('thumbnail_u_r_l'),
    filename: text('filename'),
    mimeType: text('mime_type'),
    filesize: numeric('filesize'),
    width: numeric('width'),
    height: numeric('height'),
    focalX: numeric('focal_x'),
    focalY: numeric('focal_y'),
  },
  (columns) => ({
    media_updated_at_idx: index('media_updated_at_idx').on(columns.updatedAt),
    media_created_at_idx: index('media_created_at_idx').on(columns.createdAt),
    media_filename_idx: uniqueIndex('media_filename_idx').on(columns.filename),
  }),
)

export const tracks = sqliteTable(
  'tracks',
  {
    id: integer('id').primaryKey(),
    title: text('title').notNull(),
    priority: numeric('priority'),
    isFree: integer('is_free', { mode: 'boolean' }),
    courseRevisionId: numeric('course_revision_id'),
    position: numeric('position'),
    isPublic: integer('is_public', { mode: 'boolean' }),
    isOptional: integer('is_optional', { mode: 'boolean' }),
    trackWarningId: numeric('track_warning_id'),
    warning: text('warning'),
    updatedAt: text('updated_at')
      .notNull()
      .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
    createdAt: text('created_at')
      .notNull()
      .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
  },
  (columns) => ({
    tracks_updated_at_idx: index('tracks_updated_at_idx').on(columns.updatedAt),
    tracks_created_at_idx: index('tracks_created_at_idx').on(columns.createdAt),
  }),
)

export const tracks_rels = sqliteTable(
  'tracks_rels',
  {
    id: integer('id').primaryKey(),
    order: integer('order'),
    parent: integer('parent_id').notNull(),
    path: text('path').notNull(),
    'track-stepsID': integer('track_steps_id'),
  },
  (columns) => ({
    order: index('tracks_rels_order_idx').on(columns.order),
    parentIdx: index('tracks_rels_parent_idx').on(columns.parent),
    pathIdx: index('tracks_rels_path_idx').on(columns.path),
    tracks_rels_track_steps_id_idx: index('tracks_rels_track_steps_id_idx').on(
      columns['track-stepsID'],
    ),
    parentFk: foreignKey({
      columns: [columns['parent']],
      foreignColumns: [tracks.id],
      name: 'tracks_rels_parent_fk',
    }).onDelete('cascade'),
    'track-stepsIdFk': foreignKey({
      columns: [columns['track-stepsID']],
      foreignColumns: [track_steps.id],
      name: 'tracks_rels_track_steps_fk',
    }).onDelete('cascade'),
  }),
)

export const challenges = sqliteTable(
  'challenges',
  {
    id: integer('id').primaryKey(),
    title: text('title').notNull(),
    description: text('description'),
    tests: text('tests'),
    previousLessonStepId: integer('previous_lesson_step_id_id').references(() => track_steps.id, {
      onDelete: 'set null',
    }),
    updatedAt: text('updated_at')
      .notNull()
      .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
    createdAt: text('created_at')
      .notNull()
      .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
  },
  (columns) => ({
    challenges_previous_lesson_step_id_idx: index('challenges_previous_lesson_step_id_idx').on(
      columns.previousLessonStepId,
    ),
    challenges_updated_at_idx: index('challenges_updated_at_idx').on(columns.updatedAt),
    challenges_created_at_idx: index('challenges_created_at_idx').on(columns.createdAt),
  }),
)

export const track_steps = sqliteTable(
  'track_steps',
  {
    id: integer('id').primaryKey(),
    track: integer('track_id')
      .notNull()
      .references(() => tracks.id, {
        onDelete: 'set null',
      }),
    stepType: text('step_type'),
    priority: numeric('priority'),
    globalPriority: numeric('global_priority'),
    updatedAt: text('updated_at')
      .notNull()
      .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
    createdAt: text('created_at')
      .notNull()
      .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
  },
  (columns) => ({
    track_steps_track_idx: index('track_steps_track_idx').on(columns.track),
    track_steps_updated_at_idx: index('track_steps_updated_at_idx').on(columns.updatedAt),
    track_steps_created_at_idx: index('track_steps_created_at_idx').on(columns.createdAt),
  }),
)

export const track_steps_rels = sqliteTable(
  'track_steps_rels',
  {
    id: integer('id').primaryKey(),
    order: integer('order'),
    parent: integer('parent_id').notNull(),
    path: text('path').notNull(),
    challengesID: integer('challenges_id'),
  },
  (columns) => ({
    order: index('track_steps_rels_order_idx').on(columns.order),
    parentIdx: index('track_steps_rels_parent_idx').on(columns.parent),
    pathIdx: index('track_steps_rels_path_idx').on(columns.path),
    track_steps_rels_challenges_id_idx: index('track_steps_rels_challenges_id_idx').on(
      columns.challengesID,
    ),
    parentFk: foreignKey({
      columns: [columns['parent']],
      foreignColumns: [track_steps.id],
      name: 'track_steps_rels_parent_fk',
    }).onDelete('cascade'),
    challengesIdFk: foreignKey({
      columns: [columns['challengesID']],
      foreignColumns: [challenges.id],
      name: 'track_steps_rels_challenges_fk',
    }).onDelete('cascade'),
  }),
)

export const files = sqliteTable(
  'files',
  {
    id: integer('id').primaryKey(),
    challenge: integer('challenge_id')
      .notNull()
      .references(() => challenges.id, {
        onDelete: 'set null',
      }),
    name: text('name'),
    code: text('code'),
    isOpen: integer('is_open', { mode: 'boolean' }),
    isLocked: integer('is_locked', { mode: 'boolean' }),
    hideFromSolution: integer('hide_from_solution', { mode: 'boolean' }),
    updatedAt: text('updated_at')
      .notNull()
      .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
    createdAt: text('created_at')
      .notNull()
      .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
  },
  (columns) => ({
    files_challenge_idx: index('files_challenge_idx').on(columns.challenge),
    files_updated_at_idx: index('files_updated_at_idx').on(columns.updatedAt),
    files_created_at_idx: index('files_created_at_idx').on(columns.createdAt),
  }),
)

export const hints = sqliteTable(
  'hints',
  {
    id: integer('id').primaryKey(),
    challenge: integer('challenge_id')
      .notNull()
      .references(() => challenges.id, {
        onDelete: 'set null',
      }),
    hint: text('hint'),
    priority: numeric('priority'),
    updatedAt: text('updated_at')
      .notNull()
      .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
    createdAt: text('created_at')
      .notNull()
      .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
  },
  (columns) => ({
    hints_challenge_idx: index('hints_challenge_idx').on(columns.challenge),
    hints_updated_at_idx: index('hints_updated_at_idx').on(columns.updatedAt),
    hints_created_at_idx: index('hints_created_at_idx').on(columns.createdAt),
  }),
)

export const track_step_sequence = sqliteTable(
  'track_step_sequence',
  {
    id: integer('id').primaryKey(),
    trackStep: integer('track_step_id')
      .notNull()
      .references(() => track_steps.id, {
        onDelete: 'set null',
      }),
    previous: integer('previous_id').references(() => track_steps.id, {
      onDelete: 'set null',
    }),
    next: integer('next_id').references(() => track_steps.id, {
      onDelete: 'set null',
    }),
    endOfPublic: integer('end_of_public', { mode: 'boolean' }),
    updatedAt: text('updated_at')
      .notNull()
      .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
    createdAt: text('created_at')
      .notNull()
      .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
  },
  (columns) => ({
    track_step_sequence_track_step_idx: uniqueIndex('track_step_sequence_track_step_idx').on(
      columns.trackStep,
    ),
    track_step_sequence_previous_idx: index('track_step_sequence_previous_idx').on(
      columns.previous,
    ),
    track_step_sequence_next_idx: index('track_step_sequence_next_idx').on(columns.next),
    track_step_sequence_updated_at_idx: index('track_step_sequence_updated_at_idx').on(
      columns.updatedAt,
    ),
    track_step_sequence_created_at_idx: index('track_step_sequence_created_at_idx').on(
      columns.createdAt,
    ),
  }),
)

export const payload_locked_documents = sqliteTable(
  'payload_locked_documents',
  {
    id: integer('id').primaryKey(),
    globalSlug: text('global_slug'),
    updatedAt: text('updated_at')
      .notNull()
      .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
    createdAt: text('created_at')
      .notNull()
      .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
  },
  (columns) => ({
    payload_locked_documents_global_slug_idx: index('payload_locked_documents_global_slug_idx').on(
      columns.globalSlug,
    ),
    payload_locked_documents_updated_at_idx: index('payload_locked_documents_updated_at_idx').on(
      columns.updatedAt,
    ),
    payload_locked_documents_created_at_idx: index('payload_locked_documents_created_at_idx').on(
      columns.createdAt,
    ),
  }),
)

export const payload_locked_documents_rels = sqliteTable(
  'payload_locked_documents_rels',
  {
    id: integer('id').primaryKey(),
    order: integer('order'),
    parent: integer('parent_id').notNull(),
    path: text('path').notNull(),
    usersID: integer('users_id'),
    mediaID: integer('media_id'),
    tracksID: integer('tracks_id'),
    challengesID: integer('challenges_id'),
    'track-stepsID': integer('track_steps_id'),
    filesID: integer('files_id'),
    hintsID: integer('hints_id'),
    'track-step-sequenceID': integer('track_step_sequence_id'),
  },
  (columns) => ({
    order: index('payload_locked_documents_rels_order_idx').on(columns.order),
    parentIdx: index('payload_locked_documents_rels_parent_idx').on(columns.parent),
    pathIdx: index('payload_locked_documents_rels_path_idx').on(columns.path),
    payload_locked_documents_rels_users_id_idx: index(
      'payload_locked_documents_rels_users_id_idx',
    ).on(columns.usersID),
    payload_locked_documents_rels_media_id_idx: index(
      'payload_locked_documents_rels_media_id_idx',
    ).on(columns.mediaID),
    payload_locked_documents_rels_tracks_id_idx: index(
      'payload_locked_documents_rels_tracks_id_idx',
    ).on(columns.tracksID),
    payload_locked_documents_rels_challenges_id_idx: index(
      'payload_locked_documents_rels_challenges_id_idx',
    ).on(columns.challengesID),
    payload_locked_documents_rels_track_steps_id_idx: index(
      'payload_locked_documents_rels_track_steps_id_idx',
    ).on(columns['track-stepsID']),
    payload_locked_documents_rels_files_id_idx: index(
      'payload_locked_documents_rels_files_id_idx',
    ).on(columns.filesID),
    payload_locked_documents_rels_hints_id_idx: index(
      'payload_locked_documents_rels_hints_id_idx',
    ).on(columns.hintsID),
    payload_locked_documents_rels_track_step_sequence_id_idx: index(
      'payload_locked_documents_rels_track_step_sequence_id_idx',
    ).on(columns['track-step-sequenceID']),
    parentFk: foreignKey({
      columns: [columns['parent']],
      foreignColumns: [payload_locked_documents.id],
      name: 'payload_locked_documents_rels_parent_fk',
    }).onDelete('cascade'),
    usersIdFk: foreignKey({
      columns: [columns['usersID']],
      foreignColumns: [users.id],
      name: 'payload_locked_documents_rels_users_fk',
    }).onDelete('cascade'),
    mediaIdFk: foreignKey({
      columns: [columns['mediaID']],
      foreignColumns: [media.id],
      name: 'payload_locked_documents_rels_media_fk',
    }).onDelete('cascade'),
    tracksIdFk: foreignKey({
      columns: [columns['tracksID']],
      foreignColumns: [tracks.id],
      name: 'payload_locked_documents_rels_tracks_fk',
    }).onDelete('cascade'),
    challengesIdFk: foreignKey({
      columns: [columns['challengesID']],
      foreignColumns: [challenges.id],
      name: 'payload_locked_documents_rels_challenges_fk',
    }).onDelete('cascade'),
    'track-stepsIdFk': foreignKey({
      columns: [columns['track-stepsID']],
      foreignColumns: [track_steps.id],
      name: 'payload_locked_documents_rels_track_steps_fk',
    }).onDelete('cascade'),
    filesIdFk: foreignKey({
      columns: [columns['filesID']],
      foreignColumns: [files.id],
      name: 'payload_locked_documents_rels_files_fk',
    }).onDelete('cascade'),
    hintsIdFk: foreignKey({
      columns: [columns['hintsID']],
      foreignColumns: [hints.id],
      name: 'payload_locked_documents_rels_hints_fk',
    }).onDelete('cascade'),
    'track-step-sequenceIdFk': foreignKey({
      columns: [columns['track-step-sequenceID']],
      foreignColumns: [track_step_sequence.id],
      name: 'payload_locked_documents_rels_track_step_sequence_fk',
    }).onDelete('cascade'),
  }),
)

export const payload_preferences = sqliteTable(
  'payload_preferences',
  {
    id: integer('id').primaryKey(),
    key: text('key'),
    value: text('value', { mode: 'json' }),
    updatedAt: text('updated_at')
      .notNull()
      .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
    createdAt: text('created_at')
      .notNull()
      .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
  },
  (columns) => ({
    payload_preferences_key_idx: index('payload_preferences_key_idx').on(columns.key),
    payload_preferences_updated_at_idx: index('payload_preferences_updated_at_idx').on(
      columns.updatedAt,
    ),
    payload_preferences_created_at_idx: index('payload_preferences_created_at_idx').on(
      columns.createdAt,
    ),
  }),
)

export const payload_preferences_rels = sqliteTable(
  'payload_preferences_rels',
  {
    id: integer('id').primaryKey(),
    order: integer('order'),
    parent: integer('parent_id').notNull(),
    path: text('path').notNull(),
    usersID: integer('users_id'),
  },
  (columns) => ({
    order: index('payload_preferences_rels_order_idx').on(columns.order),
    parentIdx: index('payload_preferences_rels_parent_idx').on(columns.parent),
    pathIdx: index('payload_preferences_rels_path_idx').on(columns.path),
    payload_preferences_rels_users_id_idx: index('payload_preferences_rels_users_id_idx').on(
      columns.usersID,
    ),
    parentFk: foreignKey({
      columns: [columns['parent']],
      foreignColumns: [payload_preferences.id],
      name: 'payload_preferences_rels_parent_fk',
    }).onDelete('cascade'),
    usersIdFk: foreignKey({
      columns: [columns['usersID']],
      foreignColumns: [users.id],
      name: 'payload_preferences_rels_users_fk',
    }).onDelete('cascade'),
  }),
)

export const payload_migrations = sqliteTable(
  'payload_migrations',
  {
    id: integer('id').primaryKey(),
    name: text('name'),
    batch: numeric('batch'),
    updatedAt: text('updated_at')
      .notNull()
      .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
    createdAt: text('created_at')
      .notNull()
      .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
  },
  (columns) => ({
    payload_migrations_updated_at_idx: index('payload_migrations_updated_at_idx').on(
      columns.updatedAt,
    ),
    payload_migrations_created_at_idx: index('payload_migrations_created_at_idx').on(
      columns.createdAt,
    ),
  }),
)

export const relations_users = relations(users, () => ({}))
export const relations_media = relations(media, () => ({}))
export const relations_tracks_rels = relations(tracks_rels, ({ one }) => ({
  parent: one(tracks, {
    fields: [tracks_rels.parent],
    references: [tracks.id],
    relationName: '_rels',
  }),
  'track-stepsID': one(track_steps, {
    fields: [tracks_rels['track-stepsID']],
    references: [track_steps.id],
    relationName: 'track-steps',
  }),
}))
export const relations_tracks = relations(tracks, ({ many }) => ({
  _rels: many(tracks_rels, {
    relationName: '_rels',
  }),
}))
export const relations_challenges = relations(challenges, ({ one }) => ({
  previousLessonStepId: one(track_steps, {
    fields: [challenges.previousLessonStepId],
    references: [track_steps.id],
    relationName: 'previousLessonStepId',
  }),
}))
export const relations_track_steps_rels = relations(track_steps_rels, ({ one }) => ({
  parent: one(track_steps, {
    fields: [track_steps_rels.parent],
    references: [track_steps.id],
    relationName: '_rels',
  }),
  challengesID: one(challenges, {
    fields: [track_steps_rels.challengesID],
    references: [challenges.id],
    relationName: 'challenges',
  }),
}))
export const relations_track_steps = relations(track_steps, ({ one, many }) => ({
  track: one(tracks, {
    fields: [track_steps.track],
    references: [tracks.id],
    relationName: 'track',
  }),
  _rels: many(track_steps_rels, {
    relationName: '_rels',
  }),
}))
export const relations_files = relations(files, ({ one }) => ({
  challenge: one(challenges, {
    fields: [files.challenge],
    references: [challenges.id],
    relationName: 'challenge',
  }),
}))
export const relations_hints = relations(hints, ({ one }) => ({
  challenge: one(challenges, {
    fields: [hints.challenge],
    references: [challenges.id],
    relationName: 'challenge',
  }),
}))
export const relations_track_step_sequence = relations(track_step_sequence, ({ one }) => ({
  trackStep: one(track_steps, {
    fields: [track_step_sequence.trackStep],
    references: [track_steps.id],
    relationName: 'trackStep',
  }),
  previous: one(track_steps, {
    fields: [track_step_sequence.previous],
    references: [track_steps.id],
    relationName: 'previous',
  }),
  next: one(track_steps, {
    fields: [track_step_sequence.next],
    references: [track_steps.id],
    relationName: 'next',
  }),
}))
export const relations_payload_locked_documents_rels = relations(
  payload_locked_documents_rels,
  ({ one }) => ({
    parent: one(payload_locked_documents, {
      fields: [payload_locked_documents_rels.parent],
      references: [payload_locked_documents.id],
      relationName: '_rels',
    }),
    usersID: one(users, {
      fields: [payload_locked_documents_rels.usersID],
      references: [users.id],
      relationName: 'users',
    }),
    mediaID: one(media, {
      fields: [payload_locked_documents_rels.mediaID],
      references: [media.id],
      relationName: 'media',
    }),
    tracksID: one(tracks, {
      fields: [payload_locked_documents_rels.tracksID],
      references: [tracks.id],
      relationName: 'tracks',
    }),
    challengesID: one(challenges, {
      fields: [payload_locked_documents_rels.challengesID],
      references: [challenges.id],
      relationName: 'challenges',
    }),
    'track-stepsID': one(track_steps, {
      fields: [payload_locked_documents_rels['track-stepsID']],
      references: [track_steps.id],
      relationName: 'track-steps',
    }),
    filesID: one(files, {
      fields: [payload_locked_documents_rels.filesID],
      references: [files.id],
      relationName: 'files',
    }),
    hintsID: one(hints, {
      fields: [payload_locked_documents_rels.hintsID],
      references: [hints.id],
      relationName: 'hints',
    }),
    'track-step-sequenceID': one(track_step_sequence, {
      fields: [payload_locked_documents_rels['track-step-sequenceID']],
      references: [track_step_sequence.id],
      relationName: 'track-step-sequence',
    }),
  }),
)
export const relations_payload_locked_documents = relations(
  payload_locked_documents,
  ({ many }) => ({
    _rels: many(payload_locked_documents_rels, {
      relationName: '_rels',
    }),
  }),
)
export const relations_payload_preferences_rels = relations(
  payload_preferences_rels,
  ({ one }) => ({
    parent: one(payload_preferences, {
      fields: [payload_preferences_rels.parent],
      references: [payload_preferences.id],
      relationName: '_rels',
    }),
    usersID: one(users, {
      fields: [payload_preferences_rels.usersID],
      references: [users.id],
      relationName: 'users',
    }),
  }),
)
export const relations_payload_preferences = relations(payload_preferences, ({ many }) => ({
  _rels: many(payload_preferences_rels, {
    relationName: '_rels',
  }),
}))
export const relations_payload_migrations = relations(payload_migrations, () => ({}))

type DatabaseSchema = {
  users: typeof users
  media: typeof media
  tracks: typeof tracks
  tracks_rels: typeof tracks_rels
  challenges: typeof challenges
  track_steps: typeof track_steps
  track_steps_rels: typeof track_steps_rels
  files: typeof files
  hints: typeof hints
  track_step_sequence: typeof track_step_sequence
  payload_locked_documents: typeof payload_locked_documents
  payload_locked_documents_rels: typeof payload_locked_documents_rels
  payload_preferences: typeof payload_preferences
  payload_preferences_rels: typeof payload_preferences_rels
  payload_migrations: typeof payload_migrations
  relations_users: typeof relations_users
  relations_media: typeof relations_media
  relations_tracks_rels: typeof relations_tracks_rels
  relations_tracks: typeof relations_tracks
  relations_challenges: typeof relations_challenges
  relations_track_steps_rels: typeof relations_track_steps_rels
  relations_track_steps: typeof relations_track_steps
  relations_files: typeof relations_files
  relations_hints: typeof relations_hints
  relations_track_step_sequence: typeof relations_track_step_sequence
  relations_payload_locked_documents_rels: typeof relations_payload_locked_documents_rels
  relations_payload_locked_documents: typeof relations_payload_locked_documents
  relations_payload_preferences_rels: typeof relations_payload_preferences_rels
  relations_payload_preferences: typeof relations_payload_preferences
  relations_payload_migrations: typeof relations_payload_migrations
}

declare module '@payloadcms/db-sqlite/types' {
  export interface GeneratedDatabaseSchema {
    schema: DatabaseSchema
  }
}
