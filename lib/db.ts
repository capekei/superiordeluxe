import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./store.db');

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, category TEXT NOT NULL, modelo TEXT NOT NULL UNIQUE, descripcion TEXT NOT NULL)");
  db.get("SELECT COUNT(*) as count FROM products", (err, row: any) => {
    if (row.count === 0) {
      const stmt = db.prepare("INSERT INTO products (category, modelo, descripcion) VALUES (?, ?, ?)");
      const inventory = [
        ["Neveras", "PM2205S", "Auto Frost, 08 Pie"],
        ["Neveras", "PM2262S", "Auto Frost, 11 Pie"],
        ["Neveras", "PM2262DS", "Auto Frost, 11 Pie, Disp"],
        ["Neveras", "PMFF2197S", "No Frost, 8 pie"],
        ["Neveras", "PMFF2245DS", "No Frost, 9 pie"],
        ["Neveras", "PMFF2333SNF", "No Frost, 13 pie"],
        ["Neveras", "PM2371S", "No Frost, 15 pie"],
        ["Neveras", "PM2371DS", "No Frost, 15 pie, Disp"],
        ["Neveras", "PMFF2415S", "No Frost, 15 pie"],
        ["Neveras", "PMFF2415DS", "No Frost, 15 pie, Disp"],
        ["Congeladores", "PM145", "5.1 Pie"],
        ["Congeladores", "PM200", "7.1 Pie"],
        ["Congeladores", "PM290", "10.2 Pie"],
        ["Congeladores", "PM380", "13.4 Pie"],
        ["Congeladores", "PM508", "18 Pie"],
        ["Congeladores", "PM708", "25 Pie"],
        ["Exhibidores", "PMEF211", "8 Pie, Frost"],
        ["Exhibidores", "PMEF309", "11 Pie, Frost"],
        ["Exhibidores", "PMEFF416", "15 Pie, No Frost"],
        ["Heladeros", "PMMHEL2254", "9 Pie"],
        ["Estufas", "PMH741HFN", "20\", NEGRA"],
        ["Estufas", "PMH741HFS", "20\", SILVER"],
        ["Estufas", "PM2165N/B", "21\", NEGRA, BLANCA"],
        ["Estufas", "PM2165G", "21\", GRIS"],
        ["Estufas", "PM740HFS", "20\", SILVER"],
        ["Estufas", "PM840HFS", "24\", SILVER"],
        ["Estufas", "PM950HFS", "30\", SILVER"],
        ["Estufas", "PM1060HFS", "30\", SILVER"],
        ["Lavadoras", "PM0615", "15 Libs"],
        ["Lavadoras", "PM0820", "20 Libs"],
        ["Lavadoras", "PM1025", "25 Libs"],
        ["Lavadoras", "PM1229", "29 Lbs"],
      ];
      inventory.forEach(([category, modelo, descripcion]) => stmt.run(category, modelo, descripcion));
      stmt.finalize();
    }
  });
});

export default db;
