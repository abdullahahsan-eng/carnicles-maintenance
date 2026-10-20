export type LaunchStatus = 'Confirmed' | 'Expected' | 'Watchlist'

export type Launch = {
  id: string
  brand: string
  name: string
  month: 'October' | 'November' | 'December'
  date: string
  status: LaunchStatus
  type: string
  powertrain: string
  price: string
  highlights: string[]
  image: string
  note: string
}

/**
 * EDIT THIS FILE to keep the calendar current.
 * These are media-reported estimates, not guaranteed launch dates.
 * Confirm every date, price, feature and model's India availability before publishing.
 */
export const launches: Launch[] = [
  {
    id: 'oct-01',
    brand: 'HYUNDAI',
    name: 'Hyundai Bayon',
    month: 'October',
    date: 'Expected 26 October',
    status: 'Expected',
    type: 'Compact SUV',
    powertrain: 'Petrol · Details to verify',
    price: '₹10 lakh* estimated',
    highlights: ['Compact crossover body style', 'India launch timing reported for late October', 'Specifications and price need official confirmation'],
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1400&q=85',
    note: 'Launch timing and estimated price are media-reported and may change. Verify with Hyundai India before publishing.',
  },
  {
    id: 'oct-02',
    brand: 'LAND ROVER',
    name: 'Range Rover Sport Electric',
    month: 'October',
    date: 'October 2026 · Tentative',
    status: 'Watchlist',
    type: 'Luxury electric SUV',
    powertrain: 'Electric · Final India details TBA',
    price: 'Price TBA',
    highlights: ['Premium all-electric SUV watchlist', 'India timing is tentative', 'Wait for official launch confirmation'],
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1400&q=85',
    note: 'This is a tentative media-listed window, not a confirmed launch date. Remove or update if the schedule changes.',
  },
  {
    id: 'nov-01',
    brand: 'MERCEDES-BENZ',
    name: 'GLC Electric',
    month: 'November',
    date: 'Expected 4 November',
    status: 'Expected',
    type: 'Luxury electric SUV',
    powertrain: 'Electric · AWD details to verify',
    price: '₹80–85 lakh* estimated',
    highlights: ['All-electric GLC family member', 'Premium SUV positioning', 'Confirm final variants and specifications'],
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=85',
    note: 'Expected launch date and price range are based on automotive-media listings; confirm with Mercedes-Benz India.',
  },
  {
    id: 'nov-02',
    brand: 'MAHINDRA',
    name: 'Thar.e',
    month: 'November',
    date: 'Expected mid-November',
    status: 'Watchlist',
    type: 'Electric off-road SUV concept / future model',
    powertrain: 'Electric · Production details TBA',
    price: '₹25 lakh* estimated',
    highlights: ['Electric Thar-family watchlist', 'Production launch timing is not officially confirmed here', 'Treat price and specifications as speculative'],
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1400&q=85',
    note: 'Do not describe this as a confirmed retail launch unless Mahindra announces production timing. Media listings may be speculative.',
  },
  {
    id: 'nov-03',
    brand: 'MARUTI SUZUKI',
    name: 'Fronx Facelift',
    month: 'November',
    date: 'November 2026 · Tentative',
    status: 'Watchlist',
    type: 'Compact crossover · Facelift',
    powertrain: 'Petrol / possible updates TBA',
    price: '₹7–12 lakh* estimated',
    highlights: ['Potential styling and feature updates', 'Tentative month only', 'Wait for official announcement'],
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1400&q=85',
    note: 'Facelift timing and price are unconfirmed estimates. Verify model details and India availability before publishing.',
  },
  {
    id: 'dec-01',
    brand: 'JSW MOTORS',
    name: 'Combat',
    month: 'December',
    date: 'Reported 4 December',
    status: 'Expected',
    type: 'SUV · Hybrid reported',
    powertrain: 'Petrol-electric hybrid reported',
    price: '₹38 lakh* estimated',
    highlights: ['Reported as a new SUV entry', 'Hybrid powertrain reported by listings', 'Confirm brand, model name and launch plan'],
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1400&q=85',
    note: 'This model and date appear in current automotive launch listings; verify directly with the company before presenting as confirmed.',
  },
  {
    id: 'dec-02',
    brand: 'JSW / JETOUR',
    name: 'Jetour T2',
    month: 'December',
    date: 'December 2026 · Tentative',
    status: 'Watchlist',
    type: 'Rugged SUV',
    powertrain: 'Market-specific details TBA',
    price: '₹30–45 lakh* estimated',
    highlights: ['Rugged, boxy SUV design direction', 'India timing is tentative', 'Price and specifications require confirmation'],
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1400&q=85',
    note: 'Expected timing and price are estimates from automotive listings. Confirm any India launch or local partnership announcement.',
  },
  {
    id: 'dec-03',
    brand: 'VOLKSWAGEN',
    name: 'Virtus Facelift',
    month: 'December',
    date: 'December 2026 · Tentative',
    status: 'Watchlist',
    type: 'Mid-size sedan · Facelift',
    powertrain: 'Petrol · Final details TBA',
    price: '₹12 lakh* estimated',
    highlights: ['Potential design and feature updates', 'Launch month is tentative', 'Final specifications not confirmed'],
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1400&q=85',
    note: 'Tentative media-reported timing only. Update this entry when Volkswagen India confirms its plans.',
  },
]