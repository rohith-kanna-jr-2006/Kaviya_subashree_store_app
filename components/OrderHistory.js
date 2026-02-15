import { Box, ChevronRight, Clock, Package } from 'lucide-react-native';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { THEME } from '../constants';

export default function OrderHistory({ orders, onBack }) {
    if (!orders || orders.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <View style={styles.emptyIcon}>
                    <Box color={THEME.textMuted} size={60} />
                </View>
                <Text style={styles.emptyTitle}>No Orders Yet</Text>
                <Text style={styles.emptySub}>Looks like you haven't placed any orders yet.</Text>
                <TouchableOpacity style={styles.shopBtn} onPress={onBack}>
                    <Text style={styles.shopBtnText}>Start Shopping</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <Text style={styles.title}>My Orders</Text>
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{orders.length} ORDERS</Text>
                </View>
            </View>

            <View style={styles.list}>
                {orders.map((order) => (
                    <View key={order.id} style={styles.card}>
                        <View style={styles.cardHeader}>
                            <View>
                                <Text style={styles.orderId}>Order #{order.id}</Text>
                                <Text style={styles.date}>{order.date}</Text>
                            </View>
                            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status).bg }]}>
                                <Text style={[styles.statusText, { color: getStatusColor(order.status).text }]}>
                                    {order.status}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.detailsRow}>
                            <View style={styles.detailItem}>
                                <Package size={16} color={THEME.textMuted} />
                                <Text style={styles.detailText}>{order.items.length} Items</Text>
                            </View>
                            <View style={styles.detailItem}>
                                <Clock size={16} color={THEME.textMuted} />
                                <Text style={styles.detailText}>{order.deliverySlot}</Text>
                            </View>
                        </View>

                        <View style={styles.itemsPreview}>
                            {order.items.map((item, index) => (
                                <Text key={index} style={styles.itemText} numberOfLines={1}>
                                    {item.quantity}x {item.name}
                                </Text>
                            ))}
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.footer}>
                            <View>
                                <Text style={styles.totalLabel}>Total Amount</Text>
                                <Text style={styles.totalValue}>₹{order.total.toFixed(2)}</Text>
                            </View>
                            <TouchableOpacity style={styles.trackBtn}>
                                <Text style={styles.trackBtnText}>Track Order</Text>
                                <ChevronRight size={16} color={THEME.primary} />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </View>
            <View style={{ height: 100 }} />
        </ScrollView>
    );
}

const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
        case 'confirmed': return { bg: '#ecfdf5', text: '#059669' }; // emerald
        case 'processing': return { bg: '#eff6ff', text: '#2563eb' }; // blue
        case 'shipped': return { bg: '#fef3c7', text: '#d97706' }; // amber
        case 'delivered': return { bg: '#f3f4f6', text: '#374151' }; // gray
        default: return { bg: '#f3f4f6', text: '#374151' };
    }
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: THEME.background, padding: 20 },
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40, backgroundColor: THEME.background },
    emptyIcon: { backgroundColor: '#f1f5f9', padding: 20, borderRadius: 30, marginBottom: 20 },
    emptyTitle: { fontSize: 24, fontWeight: '900', color: THEME.text, marginBottom: 10 },
    emptySub: { fontSize: 16, color: THEME.textMuted, textAlign: 'center', marginBottom: 30, lineHeight: 24 },
    shopBtn: { backgroundColor: THEME.primary, paddingHorizontal: 30, paddingVertical: 15, borderRadius: 15, shadowColor: THEME.primary, shadowOpacity: 0.3, shadowRadius: 10, elevation: 5 },
    shopBtnText: { color: 'white', fontWeight: '800', fontSize: 16 },

    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 25, marginTop: 10 },
    title: { fontSize: 32, fontWeight: '999', color: THEME.text },
    badge: { backgroundColor: THEME.primary, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
    badgeText: { color: 'white', fontSize: 11, fontWeight: '900', letterSpacing: 1 },

    list: { gap: 20 },
    card: { backgroundColor: 'white', borderRadius: 24, padding: 20, borderWidth: 1, borderColor: '#f1f5f9', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },

    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
    orderId: { fontSize: 18, fontWeight: '900', color: THEME.text, marginBottom: 4 },
    date: { fontSize: 13, color: THEME.textMuted, fontWeight: '600' },
    statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
    statusText: { fontSize: 11, fontWeight: '900', letterSpacing: 0.5, textTransform: 'uppercase' },

    divider: { height: 1, backgroundColor: '#f1f5f9', marginVertical: 15 },

    detailsRow: { flexDirection: 'row', gap: 20, marginBottom: 15 },
    detailItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    detailText: { color: THEME.textMuted, fontSize: 14, fontWeight: '600' },

    itemsPreview: { gap: 4 },
    itemText: { fontSize: 14, color: THEME.text, fontWeight: '500' },

    footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 },
    totalLabel: { fontSize: 12, color: THEME.textMuted, fontWeight: '700', marginBottom: 2 },
    totalValue: { fontSize: 20, fontWeight: '900', color: THEME.primary },
    trackBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, padding: 8 },
    trackBtnText: { color: THEME.primary, fontWeight: '800', fontSize: 14 }
});
