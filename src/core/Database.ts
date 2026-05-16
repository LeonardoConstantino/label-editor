import { IndexedDBStorage } from './IndexedDBStorage';

export const DATABASE_NAME = 'label_editor_db';
export const DATABASE_VERSION = 2;

export const db = new IndexedDBStorage(DATABASE_NAME, DATABASE_VERSION, [
  {
    name: 'templates',
    keyPath: 'id',
    indices: [
      { name: 'name', keyPath: 'name' },
      { name: 'updatedAt', keyPath: 'updatedAt' }
    ]
  },
  {
    name: 'preferences',
    keyPath: 'id' // Usaremos uma chave fixa 'global' para as preferências
  },
  {
    name: 'sessions',
    keyPath: 'id' // Usaremos uma chave fixa 'current_session' para o auto-save
  }
]);
