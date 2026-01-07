// Создает начальные партии для товаров которые были добавлены до системы завозов
// Запуск: node scripts/create-initial-batches.js

const { MongoClient, ObjectId } = require("mongodb");

const MONGODB_URI = "mongodb+srv://aminasakma_db_user:ikuwWpZfi476ieaI@amina-crm.ij2ruyc.mongodb.net/amina-prod";

// Цена закупа по умолчанию для старых товаров (можно изменить)
const DEFAULT_COST_PRICE = 0;

async function createInitialBatches() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db();
    const products = db.collection("products");
    const inventoryBatches = db.collection("inventorybatches");

    // Получаем все товары
    const allProducts = await products.find({}).toArray();
    console.log(`Found ${allProducts.length} products`);

    let createdCount = 0;

    for (const product of allProducts) {
      if (!product.sizes || product.sizes.length === 0) continue;

      for (const size of product.sizes) {
        if (size.quantity <= 0) continue;

        // Проверяем есть ли уже партия для этого товара и размера
        const existingBatch = await inventoryBatches.findOne({
          product: product._id,
          sizeLabel: size.label,
          remainingQuantity: { $gt: 0 }
        });

        if (existingBatch) {
          console.log(`  Batch already exists for ${product.name} (${size.label})`);
          continue;
        }

        // Создаем начальную партию
        const batch = {
          product: product._id,
          productName: product.name,
          sizeLabel: size.label,
          supply: null, // Нет связанного завоза
          costPrice: DEFAULT_COST_PRICE,
          initialQuantity: size.quantity,
          remainingQuantity: size.quantity,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        await inventoryBatches.insertOne(batch);
        console.log(`  Created batch for ${product.name} (${size.label}): ${size.quantity} шт`);
        createdCount++;
      }
    }

    console.log(`\n✅ Created ${createdCount} initial batches`);

  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

createInitialBatches();
