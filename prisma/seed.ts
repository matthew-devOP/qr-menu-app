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

  // Create Subcategories for MANCARE
  const appetizersSubcategory = await prisma.subcategory.create({
    data: {
      name: 'APERITIVE',
      nameRo: 'APERITIVE',
      nameEn: 'APPETIZERS',
      slug: 'aperitive',
      description: 'Aperitive și gustări',
      image: '/images/subcategories/appetizers.jpg',
      order: 1,
      categoryId: foodCategory.id,
    },
  })

  const mainCoursesSubcategory = await prisma.subcategory.create({
    data: {
      name: 'FELURI PRINCIPALE',
      nameRo: 'FELURI PRINCIPALE',
      nameEn: 'MAIN COURSES',
      slug: 'feluri-principale',
      description: 'Preparate principale',
      image: '/images/subcategories/main-courses.jpg',
      order: 2,
      categoryId: foodCategory.id,
    },
  })

  const sidesDishesSubcategory = await prisma.subcategory.create({
    data: {
      name: 'GARNITURI',
      nameRo: 'GARNITURI',
      nameEn: 'SIDE DISHES',
      slug: 'garnituri',
      description: 'Garnituri și acompaniamente',
      image: '/images/subcategories/sides.jpg',
      order: 3,
      categoryId: foodCategory.id,
    },
  })

  console.log('✅ Subcategories created for MANCARE')

  // Create Subcategories for DESERT
  const cakesSubcategory = await prisma.subcategory.create({
    data: {
      name: 'PRAJITURI',
      nameRo: 'PRĂJITURI',
      nameEn: 'CAKES',
      slug: 'prajituri',
      description: 'Prăjituri și torturi',
      image: '/images/subcategories/cakes.jpg',
      order: 1,
      categoryId: dessertCategory.id,
    },
  })

  const iceCreamSubcategory = await prisma.subcategory.create({
    data: {
      name: 'INGHETATA',
      nameRo: 'ÎNGHEȚATĂ',
      nameEn: 'ICE CREAM',
      slug: 'inghetata',
      description: 'Înghețată și sorbet',
      image: '/images/subcategories/ice-cream.jpg',
      order: 2,
      categoryId: dessertCategory.id,
    },
  })

  console.log('✅ Subcategories created for DESERT')

  // Create Products for BAR (Soft Drinks, Hot Drinks, Cocktails)
  await prisma.product.createMany({
    data: [
      // Soft Drinks
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
      // Hot Drinks
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
      // Cocktails
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

  console.log('✅ BAR products created')

  // Create Products for MANCARE
  await prisma.product.createMany({
    data: [
      // Appetizers
      {
        name: 'BRUSCHETE MEDITERANEENE',
        nameRo: 'BRUSCHETE MEDITERANEENE',
        nameEn: 'MEDITERRANEAN BRUSCHETTA',
        slug: 'bruschete-mediteraneene',
        description: 'Bruschete cu roșii, bazilică și ulei de măsline',
        image: '/images/products/bruschetta.jpg',
        price: 32,
        quantity: '4 buc',
        allergens: ['gluten'],
        isAvailable: true,
        isFeatured: true,
        order: 1,
        categoryId: foodCategory.id,
        subcategoryId: appetizersSubcategory.id,
      },
      {
        name: 'PLATOU BRANZURI',
        nameRo: 'PLATOU BRÂNZURI',
        nameEn: 'CHEESE PLATTER',
        slug: 'platou-branzuri',
        description: 'Selecție de brânzuri fine cu nuci și miere',
        image: '/images/products/cheese-platter.jpg',
        price: 65,
        quantity: '250g',
        allergens: ['lactose', 'nuts'],
        isAvailable: true,
        isFeatured: true,
        order: 2,
        categoryId: foodCategory.id,
        subcategoryId: appetizersSubcategory.id,
      },
      {
        name: 'SUPA CREMA DE CIUPERCI',
        nameRo: 'SUPĂ CREMĂ DE CIUPERCI',
        nameEn: 'CREAM OF MUSHROOM SOUP',
        slug: 'supa-crema-ciuperci',
        description: 'Supă cremă cu ciuperci și trufe',
        image: '/images/products/mushroom-soup.jpg',
        price: 28,
        quantity: '300ml',
        allergens: ['lactose'],
        isAvailable: true,
        isFeatured: false,
        order: 3,
        categoryId: foodCategory.id,
        subcategoryId: appetizersSubcategory.id,
      },
      // Main Courses
      {
        name: 'STEAK DE VITA',
        nameRo: 'STEAK DE VITĂ',
        nameEn: 'BEEF STEAK',
        slug: 'steak-vita',
        description: 'Steak de vită Black Angus la grătar',
        image: '/images/products/beef-steak.jpg',
        price: 125,
        quantity: '300g',
        allergens: [],
        isAvailable: true,
        isFeatured: true,
        order: 1,
        categoryId: foodCategory.id,
        subcategoryId: mainCoursesSubcategory.id,
      },
      {
        name: 'PIEPT DE PUI',
        nameRo: 'PIEPT DE PUI',
        nameEn: 'CHICKEN BREAST',
        slug: 'piept-pui',
        description: 'Piept de pui la grătar cu legume',
        image: '/images/products/chicken-breast.jpg',
        price: 55,
        quantity: '250g',
        allergens: [],
        isAvailable: true,
        isFeatured: false,
        order: 2,
        categoryId: foodCategory.id,
        subcategoryId: mainCoursesSubcategory.id,
      },
      {
        name: 'SOMON LA GRATAR',
        nameRo: 'SOMON LA GRĂTAR',
        nameEn: 'GRILLED SALMON',
        slug: 'somon-gratar',
        description: 'File de somon la grătar cu sos lemon',
        image: '/images/products/grilled-salmon.jpg',
        price: 85,
        quantity: '200g',
        allergens: ['fish'],
        isAvailable: true,
        isFeatured: true,
        order: 3,
        categoryId: foodCategory.id,
        subcategoryId: mainCoursesSubcategory.id,
      },
      {
        name: 'PASTE CARBONARA',
        nameRo: 'PASTE CARBONARA',
        nameEn: 'CARBONARA PASTA',
        slug: 'paste-carbonara',
        description: 'Paste cu pancetta, ou și parmezan',
        image: '/images/products/carbonara.jpg',
        price: 48,
        quantity: '350g',
        allergens: ['gluten', 'lactose', 'eggs'],
        isAvailable: true,
        isFeatured: false,
        order: 4,
        categoryId: foodCategory.id,
        subcategoryId: mainCoursesSubcategory.id,
      },
      // Side Dishes
      {
        name: 'CARTOFI PRAJITI',
        nameRo: 'CARTOFI PRĂJIȚI',
        nameEn: 'FRENCH FRIES',
        slug: 'cartofi-prajiti',
        description: 'Cartofi prăjiți cu mirodenii',
        image: '/images/products/french-fries.jpg',
        price: 18,
        quantity: '200g',
        allergens: [],
        isAvailable: true,
        isFeatured: false,
        order: 1,
        categoryId: foodCategory.id,
        subcategoryId: sidesDishesSubcategory.id,
      },
      {
        name: 'SALATA VERDE',
        nameRo: 'SALATĂ VERDE',
        nameEn: 'GREEN SALAD',
        slug: 'salata-verde',
        description: 'Salată verde proaspătă cu dressing',
        image: '/images/products/green-salad.jpg',
        price: 22,
        quantity: '150g',
        allergens: [],
        isAvailable: true,
        isFeatured: false,
        order: 2,
        categoryId: foodCategory.id,
        subcategoryId: sidesDishesSubcategory.id,
      },
    ],
  })

  console.log('✅ MANCARE products created')

  // Create Products for DESERT
  await prisma.product.createMany({
    data: [
      // Cakes
      {
        name: 'TIRAMISU',
        nameRo: 'TIRAMISU',
        nameEn: 'TIRAMISU',
        slug: 'tiramisu',
        description: 'Desert italian clasic cu mascarpone și cafea',
        image: '/images/products/tiramisu.jpg',
        price: 35,
        quantity: '150g',
        allergens: ['lactose', 'eggs', 'gluten'],
        isAvailable: true,
        isFeatured: true,
        order: 1,
        categoryId: dessertCategory.id,
        subcategoryId: cakesSubcategory.id,
      },
      {
        name: 'CHEESECAKE',
        nameRo: 'CHEESECAKE',
        nameEn: 'CHEESECAKE',
        slug: 'cheesecake',
        description: 'Cheesecake cu fructe de pădure',
        image: '/images/products/cheesecake.jpg',
        price: 38,
        quantity: '150g',
        allergens: ['lactose', 'eggs', 'gluten'],
        isAvailable: true,
        isFeatured: true,
        order: 2,
        categoryId: dessertCategory.id,
        subcategoryId: cakesSubcategory.id,
      },
      {
        name: 'LAVA CAKE',
        nameRo: 'LAVA CAKE',
        nameEn: 'LAVA CAKE',
        slug: 'lava-cake',
        description: 'Tort de ciocolată cu centru lichid',
        image: '/images/products/lava-cake.jpg',
        price: 42,
        quantity: '120g',
        allergens: ['lactose', 'eggs', 'gluten'],
        isAvailable: true,
        isFeatured: false,
        order: 3,
        categoryId: dessertCategory.id,
        subcategoryId: cakesSubcategory.id,
      },
      // Ice Cream
      {
        name: 'INGHETATA VANILIE',
        nameRo: 'ÎNGHEȚATĂ VANILIE',
        nameEn: 'VANILLA ICE CREAM',
        slug: 'inghetata-vanilie',
        description: 'Înghețată artizanală cu vanilie de Madagascar',
        image: '/images/products/vanilla-ice-cream.jpg',
        price: 22,
        quantity: '2 bile',
        allergens: ['lactose'],
        isAvailable: true,
        isFeatured: false,
        order: 1,
        categoryId: dessertCategory.id,
        subcategoryId: iceCreamSubcategory.id,
      },
      {
        name: 'INGHETATA CIOCOLATA',
        nameRo: 'ÎNGHEȚATĂ CIOCOLATĂ',
        nameEn: 'CHOCOLATE ICE CREAM',
        slug: 'inghetata-ciocolata',
        description: 'Înghețată artizanală cu ciocolată belgiană',
        image: '/images/products/chocolate-ice-cream.jpg',
        price: 22,
        quantity: '2 bile',
        allergens: ['lactose'],
        isAvailable: true,
        isFeatured: true,
        order: 2,
        categoryId: dessertCategory.id,
        subcategoryId: iceCreamSubcategory.id,
      },
      {
        name: 'SORBET MANGO',
        nameRo: 'SORBET MANGO',
        nameEn: 'MANGO SORBET',
        slug: 'sorbet-mango',
        description: 'Sorbet proaspăt cu mango 100% natural',
        image: '/images/products/mango-sorbet.jpg',
        price: 25,
        quantity: '2 bile',
        allergens: [],
        isAvailable: true,
        isFeatured: false,
        order: 3,
        categoryId: dessertCategory.id,
        subcategoryId: iceCreamSubcategory.id,
      },
    ],
  })

  console.log('✅ DESERT products created')

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

  // Create QR Codes for multiple tables
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  const qrCodes = await prisma.qRCode.createMany({
    data: [
      {
        name: 'Masa 1',
        location: 'masa-1',
        tableNumber: '1',
        url: `${baseUrl}?qr=masa-1`,
        venueId: venue.id,
        isActive: true,
        scans: 0,
      },
      {
        name: 'Masa 2',
        location: 'masa-2',
        tableNumber: '2',
        url: `${baseUrl}?qr=masa-2`,
        venueId: venue.id,
        isActive: true,
        scans: 0,
      },
      {
        name: 'Masa 3',
        location: 'masa-3',
        tableNumber: '3',
        url: `${baseUrl}?qr=masa-3`,
        venueId: venue.id,
        isActive: true,
        scans: 0,
      },
      {
        name: 'Bar',
        location: 'bar',
        tableNumber: null,
        url: `${baseUrl}?qr=bar`,
        venueId: venue.id,
        isActive: true,
        scans: 0,
      },
      {
        name: 'Terasa',
        location: 'terasa',
        tableNumber: null,
        url: `${baseUrl}?qr=terasa`,
        venueId: venue.id,
        isActive: true,
        scans: 0,
      },
    ],
  })

  console.log('✅ QR Codes created:', qrCodes.count)

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

