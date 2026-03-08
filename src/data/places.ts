import type { Place } from "@/components/PlaceCard";

export const mockPlaces: Record<string, Place[]> = {
  work: [
    { name: "The Grind Co.", category: "Coffee Shop", rating: 4.6, address: "12 Oak St, Downtown", priceRange: "$$", tags: ["WiFi", "Quiet", "Coffee"] },
    { name: "WorkBench Café", category: "Co-working Café", rating: 4.8, address: "88 Elm Ave", priceRange: "$", tags: ["Outlets", "Fast WiFi"] },
    { name: "Press & Brew", category: "Coffee House", rating: 4.3, address: "5 Maple Rd", priceRange: "$", tags: ["Espresso", "Pastries"] },
  ],
  date: [
    { name: "Café Luna", category: "Italian", rating: 4.9, address: "34 Rose Ln", priceRange: "$$$", tags: ["Romantic", "Italian", "Wine"] },
    { name: "The Velvet Room", category: "Cocktail Bar", rating: 4.7, address: "77 Sunset Blvd", priceRange: "$$$", tags: ["Cocktails", "Ambiance"] },
    { name: "Garden Terrace", category: "French Bistro", rating: 4.5, address: "21 Park Ave", priceRange: "$$", tags: ["Outdoor", "French"] },
  ],
  relax: [
    { name: "Zen Garden Spa", category: "Spa & Lounge", rating: 4.8, address: "9 Willow Way", priceRange: "$$", tags: ["Tea", "Quiet", "Spa"] },
    { name: "The Nook", category: "Bookshop Café", rating: 4.6, address: "15 Library St", priceRange: "$", tags: ["Books", "Cozy"] },
    { name: "Cloud Nine Lounge", category: "Lounge", rating: 4.4, address: "62 Sky Rd", priceRange: "$$", tags: ["Music", "Chill"] },
  ],
  "quick-bite": [
    { name: "Quick Eats", category: "Fast Casual", rating: 4.2, address: "101 Main St", priceRange: "$", tags: ["Burgers", "Quick"] },
    { name: "Wrap It Up", category: "Street Food", rating: 4.5, address: "45 Market Sq", priceRange: "$", tags: ["Wraps", "Healthy"] },
    { name: "Noodle Express", category: "Asian", rating: 4.3, address: "28 East Ave", priceRange: "$", tags: ["Noodles", "Fast"] },
  ],
  budget: [
    { name: "Dollar Bites", category: "Diner", rating: 4.0, address: "200 Value Rd", priceRange: "$", tags: ["Cheap", "Filling"] },
    { name: "The Student Hub", category: "Café", rating: 4.1, address: "3 Campus Dr", priceRange: "$", tags: ["Deals", "Coffee"] },
    { name: "Bistro 45", category: "Mediterranean", rating: 4.4, address: "45 Olive St", priceRange: "$", tags: ["Falafel", "Fresh"] },
  ],
};
