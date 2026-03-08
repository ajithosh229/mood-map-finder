import type { Place } from "@/components/PlaceCard";

export const mockPlaces: Record<string, Place[]> = {
  work: [
    { name: "The Grind Co.", category: "Coffee Shop", rating: 4.6, address: "12 Oak St, Downtown", priceRange: "$$", tags: ["WiFi", "Quiet", "Coffee"], lat: 40.7484, lng: -73.9856 },
    { name: "WorkBench Café", category: "Co-working Café", rating: 4.8, address: "88 Elm Ave", priceRange: "$", tags: ["Outlets", "Fast WiFi"], lat: 40.7528, lng: -73.9772 },
    { name: "Press & Brew", category: "Coffee House", rating: 4.3, address: "5 Maple Rd", priceRange: "$", tags: ["Espresso", "Pastries"], lat: 40.7448, lng: -73.9916 },
  ],
  date: [
    { name: "Café Luna", category: "Italian", rating: 4.9, address: "34 Rose Ln", priceRange: "$$$", tags: ["Romantic", "Italian", "Wine"], lat: 40.7580, lng: -73.9855 },
    { name: "The Velvet Room", category: "Cocktail Bar", rating: 4.7, address: "77 Sunset Blvd", priceRange: "$$$", tags: ["Cocktails", "Ambiance"], lat: 40.7614, lng: -73.9776 },
    { name: "Garden Terrace", category: "French Bistro", rating: 4.5, address: "21 Park Ave", priceRange: "$$", tags: ["Outdoor", "French"], lat: 40.7549, lng: -73.9840 },
  ],
  relax: [
    { name: "Zen Garden Spa", category: "Spa & Lounge", rating: 4.8, address: "9 Willow Way", priceRange: "$$", tags: ["Tea", "Quiet", "Spa"], lat: 40.7695, lng: -73.9718 },
    { name: "The Nook", category: "Bookshop Café", rating: 4.6, address: "15 Library St", priceRange: "$", tags: ["Books", "Cozy"], lat: 40.7527, lng: -73.9934 },
    { name: "Cloud Nine Lounge", category: "Lounge", rating: 4.4, address: "62 Sky Rd", priceRange: "$$", tags: ["Music", "Chill"], lat: 40.7425, lng: -73.9890 },
  ],
  "quick-bite": [
    { name: "Quick Eats", category: "Fast Casual", rating: 4.2, address: "101 Main St", priceRange: "$", tags: ["Burgers", "Quick"], lat: 40.7560, lng: -73.9900 },
    { name: "Wrap It Up", category: "Street Food", rating: 4.5, address: "45 Market Sq", priceRange: "$", tags: ["Wraps", "Healthy"], lat: 40.7490, lng: -73.9960 },
    { name: "Noodle Express", category: "Asian", rating: 4.3, address: "28 East Ave", priceRange: "$", tags: ["Noodles", "Fast"], lat: 40.7465, lng: -73.9830 },
  ],
  budget: [
    { name: "Dollar Bites", category: "Diner", rating: 4.0, address: "200 Value Rd", priceRange: "$", tags: ["Cheap", "Filling"], lat: 40.7400, lng: -73.9950 },
    { name: "The Student Hub", category: "Café", rating: 4.1, address: "3 Campus Dr", priceRange: "$", tags: ["Deals", "Coffee"], lat: 40.7295, lng: -73.9965 },
    { name: "Bistro 45", category: "Mediterranean", rating: 4.4, address: "45 Olive St", priceRange: "$", tags: ["Falafel", "Fresh"], lat: 40.7350, lng: -73.9880 },
  ],
  games: [
    { name: "Strike Zone", category: "Bowling Alley", rating: 4.3, address: "55 Lane Ave", priceRange: "$$", tags: ["Bowling", "Fun"], lat: 40.7510, lng: -73.9820 },
    { name: "Pixel Arcade", category: "Arcade", rating: 4.6, address: "12 Game St", priceRange: "$", tags: ["Arcade", "Retro"], lat: 40.7540, lng: -73.9870 },
    { name: "Arena Sports Club", category: "Sports Centre", rating: 4.5, address: "89 Victory Blvd", priceRange: "$$", tags: ["Sports", "Indoor"], lat: 40.7480, lng: -73.9790 },
  ],
};
