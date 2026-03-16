import { connectToDatabase } from '../db.js'; // <- fix path

async function fetchCustomers() {
  try {
    const { db } = await connectToDatabase();
    const customers = await db.collection('customers').find({}).toArray();

    console.log('✅ Customers fetched successfully:');
    console.log(customers);
  } catch (err) {
    console.error('❌ Failed to fetch customers:', err);
  }
}

fetchCustomers();