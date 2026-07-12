import { CITIES_DATA, MOCK_EMERGENCY_UNIT } from '../Frontend/src/data.js';
import { db } from './database.js';

export function seedDatabase() {
  const { count } = db.prepare('SELECT COUNT(*) AS count FROM cities').get();
  if (count > 0) return;

  const insertCity = db.prepare('INSERT INTO cities (id, name, payload) VALUES (?, ?, ?)');
  db.exec('BEGIN');
  for (const city of CITIES_DATA) {
    insertCity.run(city.id, city.name, JSON.stringify(city));
  }
  db.exec('COMMIT');
  db.prepare('INSERT INTO emergency_units (id, payload) VALUES (?, ?)')
    .run(MOCK_EMERGENCY_UNIT.id, JSON.stringify(MOCK_EMERGENCY_UNIT));
}
