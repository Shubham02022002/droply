import { pgTable, text, uuid, boolean, integer, timestamp } from 'drizzle-orm/pg-core';
import { relations } from "drizzle-orm";

export const files = pgTable("files", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    path: text("path").notNull(),
    size: integer("size").notNull(),
    type: text("type").notNull(),

    // storage info
    fileUrl: text("file_url").notNull(),
    thumbnailUrl: text("thumbnail_url"),

    // ownweship
    userId: text("user_id").notNull(),
    parentId: uuid("parent_id"),

    // file/folder info

    isFolder: boolean("is_folder").default(false).notNull(),
    isStarred: boolean("is_starred").default(false).notNull(),
    isTrash: boolean("is_trash").default(false).notNull(),

    // timestamps
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const fileRelations = relations(files, ({ one, many }) => (
    {
        parent: one(files, {
            fields: [files.parentId],
            references: [files.id]
        }),
        children: many(files)
    }
));

export const File = typeof files.$inferSelect;
export const newFile = typeof files.$inferInsert;