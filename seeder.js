// seeder.js

import { system, SettingGateway, SettingRecord } from "daytona-mvc";

async function seedSettings() {
  const db = system.db;

  // Ensure the database connection is ready
  if (!db.connected) {
    console.log("Database is not connected. Connecting...");
    await db.connect();
  }

  // Create gateway instance using your database driver
  const gateway = new SettingGateway(db);

  // Optional: log current count
  const count = await gateway.count();
  console.log("Existing settings count:", count);

  // Example seeding logic
  const defaultSettings = [
    { name: "site_name", value: "My App" },
    { name: "admin_email", value: "admin@example.com" },
  ];

  for (const setting of defaultSettings) {
    const exists = await gateway.exists({ name: setting.name });
    if (!exists) {
      await gateway.insertOne(setting);
      console.log(`Inserted setting: ${setting.name}`);
    } else {
      console.log(`Setting already exists: ${setting.name}`);
    }
  }

  console.log("Seeding complete.");
}

// Execute seeding
seedSettings()
  .then(() => {
    console.log("Seeder finished successfully.");
    process.exit(0);
  })
  .catch(err => {
    console.error("Seeder failed:", err);
    process.exit(1);
  });
