import {
    mysqlTable,
    varchar,
    text,
    int,
    boolean,
    timestamp,
  } from 'drizzle-orm/mysql-core';
  
  // Master Items table
  export const items = mysqlTable('items', {
    id: varchar('id', { length: 36 }).primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    type: varchar('type', { length: 50 }).notNull(), // weapon, armor, potion, etc.
    description: text('description'),
    rarity: varchar('rarity', { length: 50 }), // common, rare, epic, etc.
    baseValue: int('base_value').default(0),
    createdAt: timestamp('created_at').defaultNow(),
  });
  
  // Weapon Details table
  export const weaponDetails = mysqlTable('weapon_details', {
    id: varchar('id', { length: 36 }).primaryKey(),
    itemId: varchar('item_id', { length: 36 }).notNull(),
    attackPower: int('attack_power').default(0),
    attackSpeed: int('attack_speed').default(0),
    specialEffect: text('special_effect'),
  });
  
  // Armor Details table
  export const armorDetails = mysqlTable('armor_details', {
    id: varchar('id', { length: 36 }).primaryKey(),
    itemId: varchar('item_id', { length: 36 }).notNull(),
    defensePower: int('defense_power').default(0),
    weight: int('weight').default(0),
    resistances: text('resistances'), // optional JSON or structured text
  });
  
  // Potion Details table
  export const potionDetails = mysqlTable('potion_details', {
    id: varchar('id', { length: 36 }).primaryKey(),
    itemId: varchar('item_id', { length: 36 }).notNull(),
    effect: text('effect'),
    durationSeconds: int('duration_seconds'),
  });
  
  // Character Inventory table
  export const characterInventory = mysqlTable('character_inventory', {
    id: varchar('id', { length: 36 }).primaryKey(),
    characterId: varchar('character_id', { length: 36 }).notNull(),
    itemId: varchar('item_id', { length: 36 }).notNull(),
    quantity: int('quantity').default(1),
    acquiredAt: timestamp('acquired_at').defaultNow(),
  });
  
  // Equipment Slots table
  export const equipmentSlots = mysqlTable('equipment_slots', {
    id: varchar('id', { length: 36 }).primaryKey(),
    name: varchar('name', { length: 50 }).notNull(), // head, chest, legs, weapon, etc.
    description: text('description'),
  });
  
  // Character Equipment table
  export const characterEquipment = mysqlTable('character_equipment', {
    id: varchar('id', { length: 36 }).primaryKey(),
    characterId: varchar('character_id', { length: 36 }).notNull(),
    slotId: varchar('slot_id', { length: 36 }).notNull(),
    itemId: varchar('item_id', { length: 36 }).notNull(),
    equippedAt: timestamp('equipped_at').defaultNow(),
  });
  
  // Item Modifiers table
  export const itemModifiers = mysqlTable('item_modifiers', {
    id: varchar('id', { length: 36 }).primaryKey(),
    itemId: varchar('item_id', { length: 36 }).notNull(),
    modifierId: varchar('modifier_id', { length: 36 }).notNull(),
    effectDescription: text('effect_description'),
  });
  