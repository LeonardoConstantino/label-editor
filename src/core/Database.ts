import { IndexedDBStorage } from './IndexedDBStorage';

const DATABASE_NAME = 'label_editor_db';
const DATABASE_VERSION = 4;

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
  },
  {
    name: 'fonts',
    keyPath: 'url' // Chave primária será a URL da fonte para cache eficiente
  },
  {
    name: 'assets',
    keyPath: 'id',
    indices: [
      { name: 'category', keyPath: 'category' },
      { name: 'createdAt', keyPath: 'createdAt' }
    ]
  }
]);
