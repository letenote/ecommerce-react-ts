import { Product, ProductSkuSize } from "../../models/Product"

export const products: Array<Product> = [
  {
    id: "01",
    name: "Basic Tee Black",
    description: {
      preview: "The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: 'Black'. Need to add an extra pop of color to your outfit? Our white tee has you covered.",
      highlight: [
        "Hand cut and sewn locally",
        "Dyed with our proprietary colors",
        "Pre-washed & pre-shrunk",
        "Ultra-soft 100% cotton"
      ],
      details: "The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming 'Charcoal Gray' limited release."
    },
    price: 220000,
    category: {
      id: "001",
      name: "tshirt",
      description: "",
      created_at: new Date(),
      update_at: new Date(),
      deleted_at: new Date()
    },
    inventory: {
      id: "0001",
      stock: 60,
      sku: [
        {
          size: ProductSkuSize.s,
          quantity: 20,
          color: "black"
        },
        {
          size: ProductSkuSize.m,
          quantity: 20,
          color: "black"
        },
        {
          size: ProductSkuSize.l,
          quantity: 10,
          color: "black"
        },
        {
          size: ProductSkuSize.xl,
          quantity: 10,
          color: "black"
        }
      ],
      created_at: new Date(),
      update_at: new Date(),
      deleted_at: new Date()
    },
    images: {
      alt: "Front of men's Basic Tee in black.",
      item: "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
      detail: [
        "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
        "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
        "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
        "https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg"
      ]
    }
  },
  {
    id: "02",
    name: "Basic Tee Yellow",
    description: {
      preview: "The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: 'Black'. Need to add an extra pop of color to your outfit? Our white tee has you covered.",
      highlight: [
        "Hand cut and sewn locally",
        "Dyed with our proprietary colors",
        "Pre-washed & pre-shrunk",
        "Ultra-soft 100% cotton"
      ],
      details: "The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming 'Charcoal Gray' limited release."
    },
    price: 192000,
    category: {
      id: "001",
      name: "tshirt",
      description: "",
      created_at: new Date(),
      update_at: new Date(),
      deleted_at: new Date()
    },
    inventory: {
      id: "0002",
      stock: 30,
      sku: [
        {
          size: ProductSkuSize.s,
          quantity: 10,
          color: "yellow"
        },
        {
          size: ProductSkuSize.m,
          quantity: 10,
          color: "yellow"
        },
        {
          size: ProductSkuSize.l,
          quantity: 10,
          color: "yellow"
        }
      ],
      created_at: new Date(),
      update_at: new Date(),
      deleted_at: new Date()
    },
    images: {
      alt: "Front of men's Basic Tee in yellow.",
      item: "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-02.jpg",
      detail: [
        "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
        "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
        "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
        "https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg"
      ]
    }
  },
  {
    id: "03",
    name: "Basic Tee Grey",
    description: {
      preview: "The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: 'Black'. Need to add an extra pop of color to your outfit? Our white tee has you covered.",
      highlight: [
        "Hand cut and sewn locally",
        "Dyed with our proprietary colors",
        "Pre-washed & pre-shrunk",
        "Ultra-soft 100% cotton"
      ],
      details: "The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming 'Charcoal Gray' limited release."
    },
    price: 210000,
    category: {
      id: "001",
      name: "tshirt",
      description: "",
      created_at: new Date(),
      update_at: new Date(),
      deleted_at: new Date()
    },
    inventory: {
      id: "0003",
      stock: 50,
      sku: [
        {
          size: ProductSkuSize.s,
          quantity: 10,
          color: "grey"
        },
        {
          size: ProductSkuSize.m,
          quantity: 30,
          color: "grey"
        },
        {
          size: ProductSkuSize.l,
          quantity: 10,
          color: "grey"
        }
      ],
      created_at: new Date(),
      update_at: new Date(),
      deleted_at: new Date()
    },
    images: {
      alt: "Front of men's Basic Tee in grey.",
      item: "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-03.jpg",
      detail: [
        "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
        "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
        "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
        "https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg"
      ]
    }
  },
  {
    id: "04",
    name: "Basic Tee Orange",
    description: {
      preview: "The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: 'Black'. Need to add an extra pop of color to your outfit? Our white tee has you covered.",
      highlight: [
        "Hand cut and sewn locally",
        "Dyed with our proprietary colors",
        "Pre-washed & pre-shrunk",
        "Ultra-soft 100% cotton"
      ],
      details: "The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming 'Charcoal Gray' limited release."
    },
    price: 250000,
    category: {
      id: "001",
      name: "tshirt",
      description: "",
      created_at: new Date(),
      update_at: new Date(),
      deleted_at: new Date()
    },
    inventory: {
      id: "0004",
      stock: 30,
      sku: [
        {
          size: ProductSkuSize.s,
          quantity: 10,
          color: "range"
        },
        {
          size: ProductSkuSize.m,
          quantity: 10,
          color: "range"
        },
        {
          size: ProductSkuSize.l,
          quantity: 10,
          color: "range"
        }
      ],
      created_at: new Date(),
      update_at: new Date(),
      deleted_at: new Date()
    },
    images: {
      alt: "Front of men's Basic Tee in orange.",
      item: "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-04.jpg",
      detail: [
        "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
        "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
        "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
        "https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg"
      ]
    }
  },
]