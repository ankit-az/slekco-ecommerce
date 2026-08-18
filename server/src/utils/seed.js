const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const Category = require('../models/Category');
const Product = require('../models/Product');
const User = require('../models/User');

dotenv.config();

const categoriesData = [
  {
    name: 'Electronics',
    slug: 'electronics',
    description: 'Latest gadgets, smart devices, premium audio, and home tech.',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&auto=format&fit=crop&q=80'
  },
  {
    name: 'Fashion',
    slug: 'fashion',
    description: 'Trending apparel, streetwear, luxury footwear, and seasonal styles.',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&auto=format&fit=crop&q=80'
  },
  {
    name: 'Home & Living',
    slug: 'home-living',
    description: 'Modern furniture, minimalist lamps, decor, and smart home appliances.',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&auto=format&fit=crop&q=80'
  },
  {
    name: 'Beauty',
    slug: 'beauty',
    description: 'Premium skincare, designer fragrances, organic cosmetics, and care.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80'
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    description: 'Luxury timepieces, polarized sunglasses, leather bags, and jewelry.',
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&auto=format&fit=crop&q=80'
  }
];

const seedData = async () => {
  try {
    await connectDB();

    console.log('Clearing existing database collections...');
    await Category.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Inserting seed categories...');
    const insertedCategories = await Category.insertMany(categoriesData);

    const categoryMap = {};
    insertedCategories.forEach(cat => {
      categoryMap[cat.slug] = cat._id;
    });

    const productsData = [
      // Electronics
      {
        name: 'AuraSound Wireless Noise-Canceling Headphones',
        slug: 'aurasound-wireless-headphones',
        description: 'Immerse yourself in pure studio-grade audio with active noise cancellation, 40-hour battery life, and ultra-soft memory foam earcups.',
        shortDescription: 'Active noise cancellation with 40-hour battery life.',
        price: 14999,
        originalPrice: 17999,
        discount: 17,
        brand: 'Sony',
        category: categoryMap['electronics'],
        images: [
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80'
        ],
        rating: 4.8,
        reviewCount: 142,
        stock: 25,
        isFeatured: true
      },
      {
        name: 'Pulse 5 Portable Bluetooth Speaker',
        slug: 'pulse-5-portable-speaker',
        description: '360-degree ambient light show with deep punchy bass. IP67 waterproof design built for poolside parties and outdoor adventures.',
        shortDescription: '360-degree light show & IP67 waterproof sound.',
        price: 8999,
        originalPrice: 10999,
        discount: 18,
        brand: 'Bose',
        category: categoryMap['electronics'],
        images: [
          'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&auto=format&fit=crop&q=80'
        ],
        rating: 4.6,
        reviewCount: 89,
        stock: 18,
        isFeatured: false
      },
      {
        name: 'Chronos Pro Ultra Smartwatch',
        slug: 'chronos-pro-ultra-smartwatch',
        description: 'Sleek titanium body with AMOLED display, ECG monitoring, GPS tracking, and 7-day extended battery endurance.',
        shortDescription: 'Titanium frame with AMOLED display & ECG tracking.',
        price: 24999,
        originalPrice: 28999,
        discount: 14,
        brand: 'Apple',
        category: categoryMap['electronics'],
        images: [
          'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80'
        ],
        rating: 4.9,
        reviewCount: 210,
        stock: 30,
        isFeatured: true
      },
      {
        name: 'Vortex Mechanical Gaming Keyboard',
        slug: 'vortex-mechanical-keyboard',
        description: 'Tactile mechanical switches, customizable per-key RGB backlighting, and aerospace-grade aluminum top plate.',
        shortDescription: 'Custom RGB backlighting & tactile mechanical switches.',
        price: 6999,
        originalPrice: 8999,
        discount: 22,
        brand: 'Philips',
        category: categoryMap['electronics'],
        images: [
          'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80'
        ],
        rating: 4.5,
        reviewCount: 64,
        stock: 15,
        isFeatured: false
      },

      // Fashion
      {
        name: 'Urban Glide Retro Sneakers',
        slug: 'urban-glide-retro-sneakers',
        description: 'Crafted with premium Italian leather and lightweight cushioned soles for effortless day-to-night comfort and timeless style.',
        shortDescription: 'Premium Italian leather with cushioned ergonomic soles.',
        price: 7999,
        originalPrice: 9999,
        discount: 20,
        brand: 'Nike',
        category: categoryMap['fashion'],
        images: [
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80'
        ],
        rating: 4.7,
        reviewCount: 118,
        stock: 40,
        isFeatured: true
      },
      {
        name: 'AeroShield Technical Waterproof Parka',
        slug: 'aeroshield-waterproof-parka',
        description: 'Triple-layer breathable GORE-TEX fabric, sealed zippers, and adjustable storm hood designed for harsh urban elements.',
        shortDescription: 'Triple-layer GORE-TEX waterproof winter jacket.',
        price: 12999,
        originalPrice: 15999,
        discount: 19,
        brand: 'Adidas',
        category: categoryMap['fashion'],
        images: [
          'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80'
        ],
        rating: 4.6,
        reviewCount: 52,
        stock: 12,
        isFeatured: true
      },
      {
        name: 'Minimalist Organic Cotton Hoodie',
        slug: 'minimalist-organic-cotton-hoodie',
        description: 'Heavyweight 450GSM organic French terry cotton with relaxed shoulder drop and brushed fleece interior.',
        shortDescription: 'Heavyweight organic French terry cotton hoodie.',
        price: 3499,
        originalPrice: 4299,
        discount: 18,
        brand: 'Adidas',
        category: categoryMap['fashion'],
        images: [
          'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80'
        ],
        rating: 4.8,
        reviewCount: 77,
        stock: 50,
        isFeatured: false
      },
      {
        name: 'Structured Canvas Commuter Backpack',
        slug: 'structured-canvas-backpack',
        description: 'Water-resistant waxed canvas with padded 16-inch laptop sleeve, magnetic brass clasps, and ergonomic straps.',
        shortDescription: 'Waxed canvas with padded 16" laptop compartment.',
        price: 4999,
        originalPrice: 5999,
        discount: 16,
        brand: 'Nike',
        category: categoryMap['fashion'],
        images: [
          'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80'
        ],
        rating: 4.4,
        reviewCount: 41,
        stock: 22,
        isFeatured: false
      },

      // Home & Living
      {
        name: 'Lumina Minimalist Brass Desk Lamp',
        slug: 'lumina-brass-desk-lamp',
        description: 'Hand-brushed solid brass with warm dimmable LED glow, touch capacitive switch, and integrated wireless smartphone charger base.',
        shortDescription: 'Brushed brass LED lamp with wireless charging pad.',
        price: 8499,
        originalPrice: 9999,
        discount: 15,
        brand: 'IKEA',
        category: categoryMap['home-living'],
        images: [
          'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80'
        ],
        rating: 4.9,
        reviewCount: 95,
        stock: 14,
        isFeatured: true
      },
      {
        name: 'ErgoForm Molded Wooden Lounge Chair',
        slug: 'ergoform-wooden-lounge-chair',
        description: 'Mid-century molded walnut veneer contoured for anatomical comfort with soft full-grain leather cushions.',
        shortDescription: 'Mid-century walnut veneer with full-grain leather.',
        price: 28999,
        originalPrice: 34999,
        discount: 17,
        brand: 'IKEA',
        category: categoryMap['home-living'],
        images: [
          'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&auto=format&fit=crop&q=80'
        ],
        rating: 4.8,
        reviewCount: 38,
        stock: 8,
        isFeatured: true
      },
      {
        name: 'AromaPure Ceramic Ultrasonic Diffuser',
        slug: 'aromapure-ultrasonic-diffuser',
        description: 'Handcrafted ceramic shell emitting fine essential oil mist with subtle warm nightlight and auto shutdown timer.',
        shortDescription: 'Handcrafted ceramic essential oil aromatherapy diffuser.',
        price: 3299,
        originalPrice: 3999,
        discount: 17,
        brand: 'Philips',
        category: categoryMap['home-living'],
        images: [
          'https://images.unsplash.com/photo-1602928321679-560bb453f190?w=800&auto=format&fit=crop&q=80'
        ],
        rating: 4.5,
        reviewCount: 63,
        stock: 35,
        isFeatured: false
      },
      {
        name: 'Artisan Terracotta Ceramic Planter Set',
        slug: 'artisan-terracotta-planter-set',
        description: 'Trio of hand-glazed terracotta plant pots with drainage trays, suitable for indoor succulents and tropical houseplants.',
        shortDescription: 'Hand-glazed terracotta planter set of 3.',
        price: 2199,
        originalPrice: 2699,
        discount: 18,
        brand: 'IKEA',
        category: categoryMap['home-living'],
        images: [
          'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&auto=format&fit=crop&q=80'
        ],
        rating: 4.7,
        reviewCount: 29,
        stock: 45,
        isFeatured: false
      },

      // Beauty
      {
        name: 'Botanical Glow Radiance Serum',
        slug: 'botanical-glow-radiance-serum',
        description: 'Infused with cold-pressed rosehip seed oil, hyaluronic acid, and vitamin C to restore youthful elasticity and luminous complexion.',
        shortDescription: 'Hydrating serum with rosehip oil and Vitamin C.',
        price: 3499,
        originalPrice: 4299,
        discount: 18,
        brand: 'Sephora',
        category: categoryMap['beauty'],
        images: [
          'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80'
        ],
        rating: 4.9,
        reviewCount: 164,
        stock: 60,
        isFeatured: true
      },
      {
        name: 'Velvet Noir Luxury Eau De Parfum',
        slug: 'velvet-noir-eau-de-parfum',
        description: 'Sensual oriental woody fragrance featuring notes of smoked vanilla, black amber, cardamom, and wild bergamot.',
        shortDescription: 'Oriental woody fragrance with smoked vanilla and amber.',
        price: 8999,
        originalPrice: 10999,
        discount: 18,
        brand: 'Sephora',
        category: categoryMap['beauty'],
        images: [
          'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&auto=format&fit=crop&q=80'
        ],
        rating: 4.7,
        reviewCount: 88,
        stock: 20,
        isFeatured: false
      },
      {
        name: 'Supersonic Hair Styling Dryer',
        slug: 'supersonic-hair-styling-dryer',
        description: 'Intelligent heat control technology prevents extreme heat damage while delivering ultra-fast precision drying and styling.',
        shortDescription: 'High-speed ionic hair dryer with magnetic attachments.',
        price: 32999,
        originalPrice: 36999,
        discount: 11,
        brand: 'Dyson',
        category: categoryMap['beauty'],
        images: [
          'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80'
        ],
        rating: 4.9,
        reviewCount: 312,
        stock: 15,
        isFeatured: true
      },

      // Accessories
      {
        name: 'Heritage Automatic Chronograph Watch',
        slug: 'heritage-automatic-chronograph-watch',
        description: 'Swiss-movement self-winding chronograph encased in 316L stainless steel with sapphire crystal glass and genuine alligator strap.',
        shortDescription: 'Swiss self-winding chronograph with sapphire glass.',
        price: 34999,
        originalPrice: 41999,
        discount: 16,
        brand: 'Fossil',
        category: categoryMap['accessories'],
        images: [
          'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80'
        ],
        rating: 4.8,
        reviewCount: 73,
        stock: 10,
        isFeatured: true
      },
      {
        name: 'Aviator Classic Polarized Sunglasses',
        slug: 'aviator-classic-polarized-sunglasses',
        description: 'Iconic teardrop metal frame featuring crystal green polarized lenses offering 100% UV protection and glare elimination.',
        shortDescription: 'Classic gold metal frame with polarized G-15 lenses.',
        price: 9999,
        originalPrice: 11999,
        discount: 16,
        brand: 'Ray-Ban',
        category: categoryMap['accessories'],
        images: [
          'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80'
        ],
        rating: 4.7,
        reviewCount: 150,
        stock: 28,
        isFeatured: false
      },
      {
        name: 'Saffiano Leather Executive Slim Briefcase',
        slug: 'saffiano-leather-slim-briefcase',
        description: 'Hand-stitched scratch-resistant Italian leather with dual handles, detachable shoulder strap, and padded tablet divider.',
        shortDescription: 'Scratch-resistant Saffiano leather briefcase.',
        price: 12999,
        originalPrice: 15999,
        discount: 18,
        brand: 'Fossil',
        category: categoryMap['accessories'],
        images: [
          'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80'
        ],
        rating: 4.6,
        reviewCount: 45,
        stock: 14,
        isFeatured: false
      }
    ];

    console.log('Inserting seed products...');
    await Product.insertMany(productsData);

    console.log('Creating sample demo user...');
    await User.create({
      name: 'Demo User',
      email: 'demo@slekco.com',
      password: 'password123',
      role: 'user'
    });

    console.log('Database Seeding Completed Successfully! 🌱');
    process.exit(0);
  } catch (error) {
    console.error(`Error during database seeding: ${error.message}`);
    process.exit(1);
  }
};

seedData();
