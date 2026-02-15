export const THEME = {
    primary: '#059669',
    primaryLight: '#34d399',
    primaryDark: '#065f46',
    secondary: '#10b981',
    background: '#f9fafb',
    card: '#ffffff',
    white: '#ffffff',
    text: '#111827',
    textMuted: '#6b7280',
    muted: '#f3f4f6',
    accent: '#fde68a',
    danger: '#ef4444',
    success: '#10b981',
    warning: '#f59e0b',
    border: '#f1f5f9',
    shadow: 'rgba(0, 0, 0, 0.05)',
    radius: {
        sm: 8,
        md: 12,
        lg: 20,
        xl: 30,
        full: 9999
    }
};

export const CATEGORIES = [
    { id: 'all', name: 'All', icon: '🏪' },
    { id: 'fruits', name: 'Fruits & Veg', icon: '🍎' },
    { id: 'dairy', name: 'Dairy & Eggs', icon: '🥛' },
    { id: 'bakery', name: 'Bakery', icon: '🍞' },
    { id: 'snacks', name: 'Snacks', icon: '🍿' },
    { id: 'drinks', name: 'Beverages', icon: '🥤' },
];

export const DELIVERY_SLOTS = [
    { id: 'slot1', label: 'Morning', time: '08:00 AM - 11:00 AM' },
    { id: 'slot2', label: 'Noon', time: '11:00 AM - 02:00 PM' },
    { id: 'slot3', label: 'Afternoon', time: '02:00 PM - 05:00 PM' },
    { id: 'slot4', label: 'Evening', time: '05:00 PM - 08:00 PM' },
];

export const PRODUCTS = [
    { id: 1, name: 'Organic Bananas', price: 0.99, unit: 'lb', category: 'fruits', rating: 4.8, image: '🍌', color: '#fefce8' },
    { id: 2, name: 'Red Strawberries', price: 3.49, unit: 'box', category: 'fruits', rating: 4.9, image: '🍓', color: '#fef2f2' },
    { id: 3, name: 'Whole Milk', price: 4.20, unit: 'gallon', category: 'dairy', rating: 4.7, image: '🥛', color: '#eff6ff' },
    { id: 4, name: 'Sourdough Bread', price: 5.50, unit: 'loaf', category: 'bakery', rating: 4.6, image: '🍞', color: '#fff7ed' },
    { id: 5, name: 'Avocado', price: 1.50, unit: 'piece', category: 'fruits', rating: 4.9, image: '🥑', color: '#f0fdf4' },
    { id: 6, name: 'Greek Yogurt', price: 1.25, unit: 'cup', category: 'dairy', rating: 4.5, image: '🍦', color: '#f5f3ff' },
    { id: 7, name: 'Potato Chips', price: 3.99, unit: 'bag', category: 'snacks', rating: 4.2, image: '🥔', color: '#fefce8' },
    { id: 8, name: 'Orange Juice', price: 4.99, unit: 'bottle', category: 'drinks', rating: 4.8, image: '🍊', color: '#fff7ed' },
    { id: 9, name: 'Green Grapes', price: 2.99, unit: 'lb', category: 'fruits', rating: 4.7, image: '🍇', color: '#f0fdf4' },
    { id: 10, name: 'Fresh Eggs', price: 2.50, unit: 'dozen', category: 'dairy', rating: 4.8, image: '🥚', color: '#f9fafb' },
    { id: 11, name: 'Almond Milk', price: 3.80, unit: 'carton', category: 'dairy', rating: 4.6, image: '🥥', color: '#eff6ff' },
    { id: 12, name: 'Croissants', price: 4.50, unit: '4-pack', category: 'bakery', rating: 4.9, image: '🥐', color: '#fff7ed' },
];
