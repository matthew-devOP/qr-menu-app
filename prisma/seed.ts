import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Create Venue (INFINITY LOUNGE)
  const venue = await prisma.venue.upsert({
    where: { slug: 'infinity-lounge' },
    update: {},
    create: {
      name: 'INFINITY LOUNGE',
      slug: 'infinity-lounge',
      address: 'Str. Exemplu 123, București, România',
      phone: '+40 123 456 789',
      email: 'contact@infinitylounge.ro',
      description: 'Premium lounge & restaurant în inima orașului',
      theme: {
        primaryColor: '#1a1a1a',
        secondaryColor: '#fbbf24',
        font: 'Inter',
      },
      isActive: true,
    },
  })

  console.log('✅ Venue created:', venue.name)

  // Create Categories
  const barCategory = await prisma.category.create({
    data: {
      name: 'BAR',
      nameRo: 'BAR',
      nameEn: 'BAR',
      slug: 'bar',
      description: 'Băuturi și cocktailuri premium',
      image: '/images/categories/bar.jpg',
      order: 1,
      venueId: venue.id,
    },
  })

  const foodCategory = await prisma.category.create({
    data: {
      name: 'MANCARE',
      nameRo: 'MÂNCARE',
      nameEn: 'FOOD',
      slug: 'mancare',
      description: 'Preparate culinare delicioase',
      image: '/images/categories/food.jpg',
      order: 2,
      venueId: venue.id,
    },
  })

  const dessertCategory = await prisma.category.create({
    data: {
      name: 'DESERT',
      nameRo: 'DESERT',
      nameEn: 'DESSERT',
      slug: 'desert',
      description: 'Dulciuri și deserturi',
      image: '/images/categories/dessert.jpg',
      order: 3,
      venueId: venue.id,
    },
  })

  console.log('✅ Categories created: BAR, MANCARE, DESERT')

  // Create Subcategories for BAR
  const softDrinksSubcategory = await prisma.subcategory.create({
    data: {
      name: 'BAUTURI RACORITOARE',
      nameRo: 'BĂUTURI RĂCORITOARE',
      nameEn: 'SOFT DRINKS',
      slug: 'bauturi-racoritoare',
      description: 'Băuturi răcoritoare și sucuri',
      image: '/images/subcategories/soft-drinks.jpg',
      order: 1,
      categoryId: barCategory.id,
    },
  })

  const hotDrinksSubcategory = await prisma.subcategory.create({
    data: {
      name: 'BAUTURI CALDE',
      nameRo: 'BĂUTURI CALDE',
      nameEn: 'HOT DRINKS',
      slug: 'bauturi-calde',
      description: 'Cafea, ceai și alte băuturi calde',
      image: '/images/subcategories/hot-drinks.jpg',
      order: 2,
      categoryId: barCategory.id,
    },
  })

  const cocktailsSubcategory = await prisma.subcategory.create({
    data: {
      name: 'COCKTAILURI',
      nameRo: 'COCKTAILURI',
      nameEn: 'COCKTAILS',
      slug: 'cocktailuri',
      description: 'Cocktailuri clasice și signature',
      image: '/images/subcategories/cocktails.jpg',
      order: 3,
      categoryId: barCategory.id,
    },
  })

  console.log('✅ Subcategories created for BAR')

  // Create Products for Soft Drinks
  const products = await prisma.product.createMany({
    data: [
      {
        name: 'PEPSI REGULAR',
        nameRo: 'PEPSI REGULAR',
        nameEn: 'PEPSI REGULAR',
        slug: 'pepsi-regular',
        description: 'Băutură răcoritoare carbogazoasă cu gust de cola',
        descriptionRo: 'Băutură răcoritoare carbogazoasă cu gust de cola',
        descriptionEn: 'Carbonated soft drink with cola flavor',
        image: '/images/products/pepsi-regular.jpg',
        price: 18,
        quantity: '250ML',
        allergens: [],
        isAvailable: true,
        isFeatured: false,
        order: 1,
        categoryId: barCategory.id,
        subcategoryId: softDrinksSubcategory.id,
      },
      {
        name: 'COCA-COLA',
        nameRo: 'COCA-COLA',
        nameEn: 'COCA-COLA',
        slug: 'coca-cola',
        description: 'Băutură răcoritoare clasică',
        image: '/images/products/coca-cola.jpg',
        price: 18,
        quantity: '250ML',
        allergens: [],
        isAvailable: true,
        isFeatured: true,
        order: 2,
        categoryId: barCategory.id,
        subcategoryId: softDrinksSubcategory.id,
      },
      {
        name: 'FANTA PORTOCALE',
        nameRo: 'FANTA PORTOCALE',
        nameEn: 'FANTA ORANGE',
        slug: 'fanta-portocale',
        description: 'Băutură răcoritoare cu aromă de portocale',
        image: '/images/products/fanta-orange.jpg',
        price: 18,
        quantity: '250ML',
        allergens: [],
        isAvailable: true,
        isFeatured: false,
        order: 3,
        categoryId: barCategory.id,
        subcategoryId: softDrinksSubcategory.id,
      },
      {
        name: 'APA PLATA',
        nameRo: 'APĂ PLATĂ',
        nameEn: 'STILL WATER',
        slug: 'apa-plata',
        description: 'Apă minerală naturală plată',
        image: '/images/products/water-still.jpg',
        price: 10,
        quantity: '500ML',
        allergens: [],
        isAvailable: true,
        isFeatured: false,
        order: 4,
        categoryId: barCategory.id,
        subcategoryId: softDrinksSubcategory.id,
      },
      {
        name: 'ESPRESSO',
        nameRo: 'ESPRESSO',
        nameEn: 'ESPRESSO',
        slug: 'espresso',
        description: 'Cafea espresso italiana',
        image: '/images/products/espresso.jpg',
        price: 12,
        quantity: '30ML',
        allergens: [],
        isAvailable: true,
        isFeatured: true,
        order: 1,
        categoryId: barCategory.id,
        subcategoryId: hotDrinksSubcategory.id,
      },
      {
        name: 'CAPPUCCINO',
        nameRo: 'CAPPUCCINO',
        nameEn: 'CAPPUCCINO',
        slug: 'cappuccino',
        description: 'Cafea cu lapte spumat',
        image: '/images/products/cappuccino.jpg',
        price: 18,
        quantity: '200ML',
        allergens: ['lactose'],
        isAvailable: true,
        isFeatured: false,
        order: 2,
        categoryId: barCategory.id,
        subcategoryId: hotDrinksSubcategory.id,
      },
      {
        name: 'MOJITO',
        nameRo: 'MOJITO',
        nameEn: 'MOJITO',
        slug: 'mojito',
        description: 'Cocktail cuban cu rom, mentă și lime',
        image: '/images/products/mojito.jpg',
        price: 45,
        quantity: '350ML',
        allergens: [],
        isAvailable: true,
        isFeatured: true,
        order: 1,
        categoryId: barCategory.id,
        subcategoryId: cocktailsSubcategory.id,
      },
      {
        name: 'COSMOPOLITAN',
        nameRo: 'COSMOPOLITAN',
        nameEn: 'COSMOPOLITAN',
        slug: 'cosmopolitan',
        description: 'Cocktail clasic cu vodka și cranberry',
        image: '/images/products/cosmopolitan.jpg',
        price: 48,
        quantity: '200ML',
        allergens: [],
        isAvailable: true,
        isFeatured: false,
        order: 2,
        categoryId: barCategory.id,
        subcategoryId: cocktailsSubcategory.id,
      },
    ],
  })

  console.log('✅ Products created:', products.count, 'items')

  // Create Admin User (password: admin123)
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.admin.upsert({
    where: { email: 'admin@infinitylounge.ro' },
    update: {},
    create: {
      email: 'admin@infinitylounge.ro',
      password: hashedPassword,
      name: 'Admin INFINITY LOUNGE',
      role: 'admin',
      venueId: venue.id,
    },
  })

  console.log('✅ Admin user created:', admin.email)

  // Create QR Code for Table 1
  const qrCode = await prisma.qRCode.create({
    data: {
      name: 'Table 1',
      tableNumber: '1',
      url: 'http://localhost:3000/infinity-lounge?table=1',
      venueId: venue.id,
      isActive: true,
    },
  })

  console.log('✅ QR Code created for:', qrCode.name)

  console.log('🎉 Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
