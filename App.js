import { ArrowRight, Clock, Home, MapPin, Search, ShoppingBag } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import CartModal from './components/CartModal';
import CategoryChips from './components/CategoryChips';
import CheckoutView from './components/CheckoutView';
import OrderHistory from './components/OrderHistory';
import ProductCard from './components/ProductCard';
import { DELIVERY_SLOTS, PRODUCTS, THEME } from './constants';

const { width } = Dimensions.get('window');

export default function App() {
    const [isStarted, setIsStarted] = useState(false);
    const [activeTab, setActiveTab] = useState('home');
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [wishlist, setWishlist] = useState([]);
    const [orders, setOrders] = useState([]);

    const filteredProducts = useMemo(() => {
        return PRODUCTS.filter(p => {
            const matchesCat = activeCategory === 'all' || p.category === activeCategory;
            const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCat && matchesSearch;
        });
    }, [activeCategory, searchQuery]);

    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const updateQuantity = (id, delta) => {
        setCart(prev => prev.map(item => {
            if (item.id === id) {
                const newQty = Math.max(0, item.quantity + delta);
                return newQty === 0 ? null : { ...item, quantity: newQty };
            }
            return item;
        }).filter(Boolean));
    };

    const toggleWishlist = (id) => {
        setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const handleOrderSuccess = (details) => {
        const newOrder = {
            id: Math.floor(100000 + Math.random() * 900000).toString(),
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            status: 'Confirmed',
            items: [...cart], // Copy cart items
            total: details.total,
            deliverySlot: DELIVERY_SLOTS.find(s => s.id === details.slot)?.time || 'Standard',
            paymentMethod: details.payment
        };
        setOrders(prev => [newOrder, ...prev]);
        setCart([]);
        setActiveTab('orders');
    };

    const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

    if (!isStarted) {
        return (
            <View style={styles.welcomeContainer}>
                <StatusBar barStyle="light-content" />
                <View style={styles.welcomeImageContainer}>
                    <View style={styles.welcomeCircle} />
                    <Text style={styles.welcomeEmoji}>🥗</Text>
                </View>
                <View style={styles.welcomeTextContent}>
                    <View style={styles.welcomeLine} />
                    <Text style={styles.welcomeTagline}>KAVIYA SUBASHREE STORE</Text>
                    <Text style={styles.welcomeTitle}>Freshness{"\n"}At Your Home</Text>
                    <Text style={styles.welcomeSub}>Premium quality organic groceries sourced directly from local farmers in Salem.</Text>

                    <TouchableOpacity
                        style={styles.welcomeBtn}
                        activeOpacity={0.8}
                        onPress={() => setIsStarted(true)}
                    >
                        <Text style={styles.welcomeBtnText}>Get Started</Text>
                        <View style={styles.welcomeBtnIcon}>
                            <ArrowRight color={THEME.primary} size={20} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    const renderHome = () => (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
            <View style={styles.hero}>
                <View style={styles.heroContent}>
                    <View style={styles.promoBadge}>
                        <Text style={styles.promoText}>FRESH DEALS</Text>
                    </View>
                    <Text style={styles.heroTitle}>Premium{"\n"}Groceries</Text>
                    <Text style={styles.heroSubText}>Healthy organic products</Text>
                    <TouchableOpacity
                        style={styles.heroBtn}
                        activeOpacity={0.9}
                        onPress={() => setActiveTab('shop')}
                    >
                        <Text style={styles.heroBtnText}>Shop Now</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.heroImageWrap}>
                    <Text style={styles.heroEmojiLarge}>🥦</Text>
                </View>
            </View>

            <View style={styles.sectionHeader}>
                <View>
                    <Text style={styles.sectionTitle}>Categories</Text>
                    <Text style={styles.sectionSubtitle}>Find by category</Text>
                </View>
                <TouchableOpacity onPress={() => setActiveTab('shop')}>
                    <Text style={styles.seeAll}>See All</Text>
                </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.catScroll}>
                {[
                    { icon: '🥦', name: 'Veg' },
                    { icon: '🐄', name: 'Dairy' },
                    { icon: '🥖', name: 'Bakery' },
                    { icon: '🥤', name: 'Drinks' },
                    { icon: '🥩', name: 'Meat' }
                ].map((item, i) => (
                    <TouchableOpacity
                        key={i}
                        style={styles.catCardBox}
                        onPress={() => setActiveTab('shop')}
                    >
                        <View style={styles.catCardIcon}>
                            <Text style={{ fontSize: 24 }}>{item.icon}</Text>
                        </View>
                        <Text style={styles.catCardText}>{item.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <View style={styles.sectionHeader}>
                <View>
                    <Text style={styles.sectionTitle}>Featured Items</Text>
                    <Text style={styles.sectionSubtitle}>Best of the week</Text>
                </View>
            </View>
            <View style={styles.productGrid}>
                {PRODUCTS.slice(0, 4).map(p => (
                    <ProductCard
                        key={p.id}
                        product={p}
                        onAdd={addToCart}
                        onToggleWishlist={toggleWishlist}
                        isWishlisted={wishlist.includes(p.id)}
                    />
                ))}
            </View>
            <View style={{ height: 100 }} />
        </ScrollView>
    );

    const renderShop = () => (
        <View style={styles.content}>
            <View style={styles.searchHeaderArea}>
                <View style={styles.searchContainer}>
                    <Search color={THEME.muted} size={20} style={styles.searchIcon} />
                    <TextInput
                        placeholder="Search items..."
                        placeholderTextColor={THEME.muted}
                        style={styles.searchInput}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </View>
            <CategoryChips activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={[styles.productGrid, { paddingBottom: 100 }]}>
                    {filteredProducts.map(p => (
                        <ProductCard
                            key={p.id}
                            product={p}
                            onAdd={addToCart}
                            onToggleWishlist={toggleWishlist}
                            isWishlisted={wishlist.includes(p.id)}
                        />
                    ))}
                </View>
            </ScrollView>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {activeTab !== 'checkout' && (
                <View style={styles.header}>
                    <View style={styles.logoGroup}>
                        <View style={styles.logoIcon}>
                            <ShoppingBag color="white" size={18} />
                        </View>
                        <View>
                            <Text style={styles.logoTitle}>Kaviya Subashree</Text>
                            <View style={styles.locationRow}>
                                <MapPin size={10} color={THEME.primary} />
                                <Text style={styles.locationText}>Salem, TN</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.cartBtn}
                        onPress={() => setIsCartOpen(true)}
                        activeOpacity={0.7}
                    >
                        <ShoppingBag color={THEME.primary} size={24} />
                        {cartCount > 0 && (
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>{cartCount}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
            )}

            <View style={{ flex: 1 }}>
                {activeTab === 'home' && renderHome()}
                {activeTab === 'shop' && renderShop()}
                {activeTab === 'checkout' && (
                    <CheckoutView
                        cart={cart}
                        onSuccess={handleOrderSuccess}
                        onBack={() => setActiveTab('shop')}
                    />
                )}
                {activeTab === 'orders' && (
                    <OrderHistory
                        orders={orders}
                        onBack={() => setActiveTab('shop')}
                    />
                )}
            </View>

            {activeTab !== 'checkout' && (
                <View style={styles.tabBar}>
                    <TouchableOpacity
                        style={styles.tabItem}
                        onPress={() => setActiveTab('home')}
                        activeOpacity={0.7}
                    >
                        <Home color={activeTab === 'home' ? THEME.primary : THEME.textMuted} size={24} />
                        <Text style={[styles.tabText, activeTab === 'home' && styles.tabTextActive]}>Home</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.tabItem}
                        onPress={() => setActiveTab('shop')}
                        activeOpacity={0.7}
                    >
                        <Search color={activeTab === 'shop' ? THEME.primary : THEME.textMuted} size={24} />
                        <Text style={[styles.tabText, activeTab === 'shop' && styles.tabTextActive]}>Shop</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.tabItem}
                        onPress={() => setIsCartOpen(true)}
                        activeOpacity={0.7}
                    >
                        <ShoppingBag color={THEME.textMuted} size={24} />
                        <Text style={styles.tabText}>Cart</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.tabItem}
                        activeOpacity={0.7}
                        onPress={() => setActiveTab('orders')}
                    >
                        <Clock color={activeTab === 'orders' ? THEME.primary : THEME.textMuted} size={24} />
                        <Text style={[styles.tabText, activeTab === 'orders' && styles.tabTextActive]}>Orders</Text>
                    </TouchableOpacity>
                </View>
            )}

            <CartModal
                visible={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cart={cart}
                updateQuantity={updateQuantity}
                onCheckout={() => { setIsCartOpen(false); setActiveTab('checkout'); }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: THEME.background },
    welcomeContainer: { flex: 1, backgroundColor: THEME.primary, justifyContent: 'flex-end' },
    welcomeImageContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', position: 'relative' },
    welcomeCircle: {
        position: 'absolute',
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: 'rgba(255,255,255,0.1)',
        zIndex: -1
    },
    welcomeEmoji: { fontSize: 180 },
    welcomeTextContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 35,
        paddingBottom: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 0.1,
        shadowRadius: 20
    },
    welcomeLine: { width: 40, height: 5, backgroundColor: '#f1f5f9', borderRadius: 10, alignSelf: 'center', marginBottom: 25 },
    welcomeTagline: { color: THEME.primary, fontWeight: '900', fontSize: 13, letterSpacing: 3, marginBottom: 15, textAlign: 'center' },
    welcomeTitle: { fontSize: 42, fontWeight: '999', color: THEME.text, lineHeight: 48, marginBottom: 20, textAlign: 'center' },
    welcomeSub: { fontSize: 16, color: THEME.textMuted, lineHeight: 26, marginBottom: 35, textAlign: 'center', paddingHorizontal: 10 },
    welcomeBtn: {
        backgroundColor: THEME.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 25,
        paddingVertical: 18,
        borderRadius: 24,
        shadowColor: THEME.primary,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 8
    },
    welcomeBtnText: { color: 'white', fontSize: 20, fontWeight: '900' },
    welcomeBtnIcon: { backgroundColor: 'white', padding: 8, borderRadius: 15 },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9'
    },
    logoGroup: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    logoIcon: { backgroundColor: THEME.primary, padding: 8, borderRadius: 14 },
    logoTitle: { fontWeight: '999', fontSize: 18, color: THEME.text, lineHeight: 22 },
    locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
    locationText: { fontSize: 12, color: THEME.textMuted, fontWeight: '700' },
    cartBtn: { backgroundColor: '#f0fdf4', padding: 12, borderRadius: 16, position: 'relative' },
    badge: {
        position: 'absolute',
        top: -6,
        right: -6,
        backgroundColor: THEME.danger,
        minWidth: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'white',
        paddingHorizontal: 4
    },
    badgeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: '999',
        lineHeight: 12,
        textAlign: 'center'
    },

    content: { flex: 1 },
    hero: {
        margin: 20,
        backgroundColor: THEME.primaryDark,
        borderRadius: 35,
        padding: 30,
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: 200,
        overflow: 'hidden',
        position: 'relative'
    },
    heroContent: { flex: 1, zIndex: 2 },
    promoBadge: { backgroundColor: 'rgba(255,255,255,0.25)', alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10, marginBottom: 12 },
    promoText: { color: 'white', fontSize: 11, fontWeight: '900', letterSpacing: 1 },
    heroTitle: { color: 'white', fontSize: 34, fontWeight: '900', lineHeight: 38 },
    heroSubText: { color: 'rgba(255,255,255,0.7)', fontSize: 14, marginTop: 5, fontWeight: '600' },
    heroBtn: {
        backgroundColor: THEME.accent,
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 15,
        marginTop: 20,
        alignSelf: 'flex-start',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10
    },
    heroBtnText: { color: '#92400e', fontWeight: '900', fontSize: 15 },
    heroImageWrap: { position: 'absolute', right: -30, bottom: -30, zIndex: 1 },
    heroEmojiLarge: { fontSize: 160, opacity: 0.2 },

    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingHorizontal: 20,
        marginTop: 25,
        marginBottom: 15
    },
    sectionTitle: { fontSize: 24, fontWeight: '900', color: THEME.text },
    sectionSubtitle: { fontSize: 13, color: THEME.textMuted, fontWeight: '600' },
    seeAll: { color: THEME.primary, fontWeight: '800', fontSize: 15 },

    catScroll: { paddingHorizontal: 20, gap: 15, paddingBottom: 10 },
    catCardBox: {
        alignItems: 'center',
        gap: 8,
        width: 80
    },
    catCardIcon: {
        backgroundColor: 'white',
        width: 70,
        height: 70,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#f1f5f9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2
    },
    catCardText: { fontWeight: '800', color: THEME.text, fontSize: 13 },

    searchHeaderArea: { paddingHorizontal: 20, paddingTop: 15 },
    searchContainer: {
        backgroundColor: 'white',
        borderRadius: 22,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 18,
        borderWidth: 1,
        borderColor: '#f1f5f9',
        height: 60,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2
    },
    searchIcon: { marginRight: 12 },
    searchInput: { flex: 1, fontWeight: '700', fontSize: 16, color: THEME.text },

    productGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 15, justifyContent: 'space-between' },

    tabBar: {
        flexDirection: 'row',
        backgroundColor: 'white',
        height: 75,
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 0.05,
        shadowRadius: 15,
        elevation: 20,
        paddingBottom: 5 // Minor adjustment for visual center
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabText: { fontSize: 11, fontWeight: '800', color: THEME.textMuted, marginTop: 4 },
    tabTextActive: { color: THEME.primary }
});