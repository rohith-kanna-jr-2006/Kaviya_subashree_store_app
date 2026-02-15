import { Heart, Plus, Star } from 'lucide-react-native';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { THEME } from '../constants';

const { width } = Dimensions.get('window');
const cardWidth = (width / 2) - 22;

export default function ProductCard({ product, onAdd, onToggleWishlist, isWishlisted }) {
    return (
        <View style={styles.card}>
            <View style={[styles.imageContainer, { backgroundColor: product.color || '#f3f4f6' }]}>
                <Text style={styles.emoji}>{product.image}</Text>
                <TouchableOpacity
                    style={styles.wishBtn}
                    activeOpacity={0.7}
                    onPress={() => onToggleWishlist(product.id)}
                >
                    <Heart
                        size={16}
                        color={isWishlisted ? THEME.danger : THEME.textMuted}
                        fill={isWishlisted ? THEME.danger : 'none'}
                    />
                </TouchableOpacity>

                <View style={styles.ratingBadge}>
                    <Star size={10} color="#fbbf24" fill="#fbbf24" />
                    <Text style={styles.ratingText}>{product.rating}</Text>
                </View>
            </View>

            <View style={styles.info}>
                <Text style={styles.categoryText}>{product.category}</Text>
                <Text style={styles.name} numberOfLines={1}>{product.name}</Text>
                <Text style={styles.unit}>{product.unit}</Text>

                <View style={styles.priceRow}>
                    <View style={styles.priceContainer}>
                        <Text style={styles.currency}>₹</Text>
                        <Text style={styles.price}>{product.price.toFixed(2)}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.addBtn}
                        activeOpacity={0.8}
                        onPress={() => onAdd(product)}
                    >
                        <Plus color="white" size={20} strokeWidth={3} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: cardWidth,
        backgroundColor: 'white',
        borderRadius: 28,
        marginBottom: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: '#f1f5f9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.05,
        shadowRadius: 15,
        elevation: 3
    },
    imageContainer: {
        height: 140,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
    },
    emoji: { fontSize: 60 },
    wishBtn: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'white',
        width: 32,
        height: 32,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 2
    },
    ratingBadge: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        backgroundColor: 'rgba(255,255,255,0.9)',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        gap: 4
    },
    ratingText: { fontSize: 11, fontWeight: '800', color: THEME.text },
    info: { marginTop: 12, paddingHorizontal: 4 },
    categoryText: {
        fontSize: 10,
        fontWeight: '800',
        color: THEME.primary,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 4
    },
    name: { fontSize: 16, fontWeight: '900', color: THEME.text },
    unit: { fontSize: 12, color: THEME.textMuted, fontWeight: '600', marginTop: 2 },
    priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
    priceContainer: { flexDirection: 'row', alignItems: 'flex-start' },
    currency: { fontSize: 12, fontWeight: '900', color: THEME.text, marginTop: 4, marginRight: 1 },
    price: { fontSize: 22, fontWeight: '999', color: THEME.text },
    addBtn: {
        backgroundColor: THEME.primary,
        width: 38,
        height: 38,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: THEME.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4
    }
});
