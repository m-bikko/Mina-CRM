// Скрипт миграции данных из test в amina-prod
// Запуск: node scripts/migrate-db.js

const { MongoClient } = require("mongodb");

// Замени на свой connection string (без имени БД в конце)
const MONGODB_URI = process.env.MONGODB_URI_BASE || "mongodb+srv://aminasakma_db_user:ikuwWpZfi476ieaI@amina-crm.ij2ruyc.mongodb.net";

const SOURCE_DB = "test";
const TARGET_DB = "amina-prod";

async function migrateData() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const sourceDb = client.db(SOURCE_DB);
    const targetDb = client.db(TARGET_DB);

    // Получаем список всех коллекций
    const collections = await sourceDb.listCollections().toArray();
    console.log(`Found ${collections.length} collections in "${SOURCE_DB}"`);

    for (const collectionInfo of collections) {
      const collectionName = collectionInfo.name;

      // Пропускаем системные коллекции
      if (collectionName.startsWith("system.")) {
        continue;
      }

      console.log(`\nMigrating collection: ${collectionName}`);

      const sourceCollection = sourceDb.collection(collectionName);
      const targetCollection = targetDb.collection(collectionName);

      // Получаем все документы
      const documents = await sourceCollection.find({}).toArray();
      console.log(`  Found ${documents.length} documents`);

      if (documents.length > 0) {
        // Вставляем документы в целевую БД
        // Используем insertMany с ordered: false чтобы продолжить при дубликатах
        try {
          const result = await targetCollection.insertMany(documents, { ordered: false });
          console.log(`  Inserted ${result.insertedCount} documents`);
        } catch (error) {
          if (error.code === 11000) {
            // Дубликаты ключей - некоторые документы уже существуют
            console.log(`  Some documents already exist (duplicates skipped)`);
            if (error.insertedCount) {
              console.log(`  Inserted ${error.insertedCount} new documents`);
            }
          } else {
            throw error;
          }
        }
      }
    }

    console.log("\n✅ Migration completed successfully!");

  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

migrateData();
