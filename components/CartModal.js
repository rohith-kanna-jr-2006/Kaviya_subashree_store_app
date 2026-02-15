import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react-native';
import { Dimensions, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { THEME } from '../constants';

const { height } = Dimensions.get('window');

export default function CartModal({ visible, onClose, cart, updateQuantity, onCheckout }) {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={styles.overlay}>
                <TouchableOpacity style={styles.dismissArea} onPress={onClose} activeOpacity={1} />
                <View style={styles.sheet}>
                    <View style={styles.knob} />
                    <View style={styles.header}>
                        <View>
                            <Text style={styles.title}>Your Basket</Text>
                            <Text style={styles.subtitle}>{cart.length} items to checkout</Text>
                        </View>
                        <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                            <X color={THEME.text} size={20} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={styles.itemList} showsVerticalScrollIndicator={false}>
                        {cart.length === 0 ? (
                            <View style={styles.empty}>
                                <View style={styles.emptyIconContainer}>
                                    <ShoppingBag size={60} color={THEME.border} />
                                </View>
                                <Text style={styles.emptyTitle}>Basket is empty</Text>
                                <Text style={styles.emptyText}>Looks like you haven't added anything yet.</Text>
                                <TouchableOpacity style={styles.startShopBtn} onPress={onClose}>
                                    <Text style={styles.startShopText}>Start Shopping</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            cart.map(item => (
                                <View key={item.id} style={styles.item}>
                                    <View style={[styles.itemImg, { backgroundColor: item.color || '#f3f4f6' }]}>
                                        <Text style={styles.itemEmoji}>{item.image}</Text>
                                    </View>
                                    <View style={styles.itemInfo}>
                                        <View style={styles.itemNameRow}>
                                            <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                                            <TouchableOpacity onPress={() => updateQuantity(item.id, -item.quantity)}>
                                                <Trash2 size={16} color={THEME.danger} />
                                            </TouchableOpacity>
                                        </View>
                                        <Text style={styles.itemPriceSingle}>₹{item.price.toFixed(2)} / {item.unit}</Text>

                                        <View style={styles.itemBottomRow}>
                                            <View style={styles.qtyRow}>
                                                <TouchableOpacity
                                                    onPress={() => updateQuantity(item.id, -1)}
                                                    style={styles.qtyBtn}
                                                >
                                                    <Minus size={14} color={THEME.text} />
                                                </TouchableOpacity>
                                                <Text style={styles.qtyText}>{item.quantity}</Text>
                                                <TouchableOpacity
                                                    onPress={() => updateQuantity(item.id, 1)}
                                                    style={styles.qtyBtn}
                                                >
                                                    <Plus size={14} color={THEME.text} />
                                                </TouchableOpacity>
                                            </View>
                                            <Text style={styles.itemTotalPrice}>₹{(item.price * item.quantity).toFixed(2)}</Text>
                                        </View>
                                    </View>
                                </View>
                            ))
                        )}
                    </ScrollView>

                    {cart.length > 0 && (
                        <View style={styles.footer}>
                            <View style={styles.summaryBox}>
                                <View style={styles.summaryRow}>
                                    <Text style={styles.summaryLabel}>Subtotal</Text>
                                    <Text style={styles.summaryVal}>₹{total.toFixed(2)}</Text>
                                </View>
                                <View style={styles.summaryRow}>
                                    <Text style={styles.summaryLabel}>Delivery</Text>
                                    <Text style={[styles.summaryVal, { color: THEME.primary }]}>FREE</Text>
                                </View>
                                <View style={[styles.summaryRow, styles.totalRow]}>
                                    <Text style={styles.totalLabel}>Total</Text>
                                    <Text style={styles.totalVal}>₹{total.toFixed(2)}</Text>
                                </View>
                            </View>

                            <TouchableOpacity style={styles.checkoutBtn} onPress={onCheckout}>
                                <Text style={styles.checkoutBtnText}>Proceed to Checkout</Text>
                                <View style={styles.checkoutIcon}>
                                    <ShoppingBag color={THEME.primary} size={18} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
    dismissArea: { flex: 1 },
    sheet: {
        backgroundColor: 'white',
        height: height * 0.85,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 25,
        paddingTop: 15
    },
    knob: {
        width: 40,
        height: 5,
        backgroundColor: '#e2e8f0',
        borderRadius: 10,
        alignSelf: 'center',
        marginBottom: 20
    },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
    title: { fontSize: 28, fontWeight: '900', color: THEME.text },
    subtitle: { fontSize: 14, color: THEME.textMuted, fontWeight: '600', marginTop: 2 },
    closeBtn: { backgroundColor: '#f3f4f6', width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
    itemList: { flex: 1 },
    empty: { flex: 1, padding: 40, alignItems: 'center', justifyContent: 'center' },
    emptyIconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#f8fafc',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    emptyTitle: { fontSize: 20, fontWeight: '900', color: THEME.text, marginBottom: 10 },
    emptyText: { textAlign: 'center', color: THEME.textMuted, lineHeight: 22, fontSize: 15 },
    startShopBtn: { marginTop: 25, backgroundColor: THEME.primary, paddingHorizontal: 30, paddingVertical: 12, borderRadius: 15 },
    startShopText: { color: 'white', fontWeight: '800' },

    item: {
        flexDirection: 'row',
        gap: 15,
        marginBottom: 20,
        padding: 12,
        backgroundColor: '#fff',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#f1f5f9'
    },
    itemImg: { width: 85, height: 85, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
    itemEmoji: { fontSize: 40 },
    itemInfo: { flex: 1, justifyContent: 'space-between' },
    itemNameRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    itemName: { fontWeight: '900', fontSize: 17, color: THEME.text, flex: 1, marginRight: 10 },
    itemPriceSingle: { color: THEME.textMuted, fontSize: 13, fontWeight: '600' },
    itemBottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
    qtyRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        backgroundColor: '#f8fafc',
        padding: 6,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#f1f5f9'
    },
    qtyBtn: { backgroundColor: 'white', width: 28, height: 28, borderRadius: 10, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#f1f5f9' },
    qtyText: { fontWeight: '900', fontSize: 15, minWidth: 20, textAlign: 'center' },
    itemTotalPrice: { fontSize: 18, fontWeight: '900', color: THEME.text },

    footer: { paddingTop: 20, paddingBottom: 10 },
    summaryBox: {
        backgroundColor: '#f8fafc',
        padding: 20,
        borderRadius: 25,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#f1f5f9'
    },
    summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
    summaryLabel: { fontSize: 15, color: THEME.textMuted, fontWeight: '700' },
    summaryVal: { fontSize: 15, color: THEME.text, fontWeight: '800' },
    totalRow: { borderTopWidth: 1, borderTopColor: '#e2e8f0', paddingTop: 12, marginTop: 5 },
    totalLabel: { fontSize: 19, color: THEME.text, fontWeight: '900' },
    totalVal: { fontSize: 24, fontWeight: '999', color: THEME.primary },

    checkoutBtn: {
        backgroundColor: THEME.primary,
        padding: 20,
        borderRadius: 24,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
        shadowColor: THEME.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 8
    },
    checkoutBtnText: { color: 'white', fontWeight: '900', fontSize: 18 },
    checkoutIcon: { backgroundColor: 'white', padding: 8, borderRadius: 12 }
});
