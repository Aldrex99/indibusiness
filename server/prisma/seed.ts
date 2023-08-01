import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

const endDates = {
  monthly: new Date(new Date().setMonth(new Date().getMonth() + 1)),
};

async function main() {
  try {
    // Create admin user
    await prisma.user.upsert({
      where: { email: 'admin@indibusiness.com' },
      update: {},
      create: {
        email: 'admin@indibusiness.com',
        password: await hash('admin', 10),
        role: 'admin',
        emailVerified: true,
      },
    });

    // Create individual user
    await prisma.user.upsert({
      where: { email: 'freeuser@indibusiness.com' },
      update: {},
      create: {
        email: 'freeuser@indibusiness.com',
        password: await hash('freeuser', 10),
        role: 'freeUser',
        emailVerified: true,
        individual: {
          create: {
            firstName: 'Free',
            lastName: 'User',
          }
        }
      },
    });

    // Create freeCompany user with associated company
    await prisma.user.upsert({
      where: { email: 'freecompany@indibusiness.com' },
      update: {},
      create: {
        email: 'freecompany@indibusiness.com',
        password: await hash('freecompany', 10),
        role: 'freeCompany',
        emailVerified: true,
        company: {
          create: {
            legalForm: 'SAS',
            name: 'Free Company',
            address: 'Free Company Address',
            zipCode: '06000',
            city: 'Free Company City',
            siret: '89354569900014',
            siren: '893545699',
            tva: 'FR76893545699',
          },
        },
      },
    });

    // Create premiumCompany user with associated company, subscription
    const premiumCompany = await prisma.user.upsert({
      where: { email: 'premiumcompany@indibusiness.com' },
      update: {},
      create: {
        email: 'premiumcompany@indibusiness.com',
        password: await hash('premiumcompany', 10),
        role: 'premiumCompany',
        emailVerified: true,
        company: {
          create: {
            legalForm: 'SAS',
            name: 'Premium Company',
            address: 'Premium Company Address',
            zipCode: '06000',
            city: 'Premium Company City',
            siret: '89354569800014',
            siren: '893545698',
            tva: 'FR76893545698',
            subscriber: true,
            pastSubscriber: false,
          },
        },
        subscription: {
          create: {
            plan: 'monthly',
            startDate: new Date(),
            endDate: endDates.monthly,
          },
        },
      },
    });

    // Create sample clients related to the premiumCompany user
    await prisma.client.createMany({
      data: [
        {
          user_id: premiumCompany.id,
          legalForm: 'SAS',
          name: 'Ferrari',
          email: 'ferrari@client.com',
        },
        {
          user_id: premiumCompany.id,
          legalForm: 'SARL',
          name: 'Porsche',
          email: 'porsche@client.com',
        },
      ],
    });

    // Create sample debts related to the premiumCompany user
    await prisma.receivable.createMany({
      data: [
        {
          user_id: premiumCompany.id,
          client_id: 1,
          client_name: 'Ferrari',
          name: 'Ferrari Receivable',
          amount: 800,
          dueDate: new Date(),
          status: 'paid',
        },
        {
          user_id: premiumCompany.id,
          client_id: 2,
          client_name: 'Porsche',
          name: 'Porsche Receivable',
          amount: 1200,
          dueDate: new Date(),
          status: 'paid',
        },
      ],
    });

    await prisma.supplier.createMany({
      data: [
        {
          user_id: premiumCompany.id,
          legalForm: 'SAS',
          name: 'Apple',
          email: 'apple@supplier.com',
        },
        {
          user_id: premiumCompany.id,
          legalForm: 'SARL',
          name: 'Samsung',
          email: 'samsung@supplier.com',
        },
      ],
    });

    // Create sample debts related to the premiumCompany user
    await prisma.debt.createMany({
      data: [
        {
          user_id: premiumCompany.id,
          supplier_id: 1,
          supplier_name: 'Apple',
          name: 'Apple Debt',
          amount: 800,
          dueDate: new Date(),
          status: 'paid',
        },
        {
          user_id: premiumCompany.id,
          supplier_id: 2,
          supplier_name: 'Samsung',
          name: 'Samsung Debt',
          amount: 1200,
          dueDate: new Date(),
          status: 'paid',
        },
      ],
    });

    // Create sample documents related to the premiumCompany user
    await prisma.document.createMany({
      data: [
        {
          user_id: premiumCompany.id,
          client_id: 1,
          type: 'invoice',
          number: 'INV001',
          date: new Date(),
          dueDate: new Date(),
          legalForm: 'SAS',
          name: 'PremiumCompany',
          address: 'PremiumCompany Address',
          addressComplement: 'Premium Address Complement',
          zipCode: '06000',
          city: 'PremiumCompany City',
          clientLegalForm: 'SAS',
          clientName: 'Ferrari',
          clientAddress: 'Ferrari Address',
          clientAddressComplement: 'Ferrari Complement',
          clientZipCode: '06000',
          clientCity: 'Ferrari City',
          totalHT: 1200,
          totalTTC: 1440,
          totalTVA: 240,
          status: 'paid',
        },
        {
          user_id: premiumCompany.id,
          client_id: 2,
          type: 'invoice',
          number: 'INV002',
          date: new Date(),
          dueDate: new Date(),
          legalForm: 'SAS',
          name: 'PremiumCompany',
          address: 'PremiumCompany Address',
          addressComplement: 'Premium Address Complement',
          zipCode: '06000',
          city: 'PremiumCompany City',
          clientLegalForm: 'SAS',
          clientName: 'Porsche',
          clientAddress: 'Porsche Address',
          clientAddressComplement: 'Porsche Complement',
          clientZipCode: '06000',
          clientCity: 'Porsche City',
          totalHT: 1500,
          totalTTC: 1800,
          totalTVA: 300,
          status: 'paid',
        },
      ],
    });

    await prisma.product.createMany({
      data: [
        {
          user_id: premiumCompany.id,
          shortId: '1',
          name: 'Product 1',
          description: 'Product 1 description',
          unit : 'unit',
          unitPrice: 100,
          tvaRate: 20,
        },
        {
          user_id: premiumCompany.id,
          shortId: '2',
          name: 'Product 2',
          description: 'Product 2 description',
          unit : 'unit',
          unitPrice: 500,
          tvaRate: 20,
        }
      ],
    });

    await prisma.documentProduct.createMany({
      data: [
        {
          document_id: 1,
          shortId: '1',
          name: 'Product 1',
          description: 'Product 1 description',
          unitPrice: 100,
          unit : 'unit',
          quantity: 12,
          tvaRate: 20,
        },
        {
          document_id: 2,
          shortId: '2',
          name: 'Product 2',
          description: 'Product 2 description',
          unitPrice: 500,
          unit : 'unit',
          quantity: 3,
          tvaRate: 20,
        },
      ],
    });

    console.log('Seed data created successfully.');
  } catch (error) {
    console.error('Error creating seed data:', error);
  } finally {
    // Disconnect the PrismaClient
    await prisma.$disconnect();
  }
}

// Call the main function to seed the data
main();