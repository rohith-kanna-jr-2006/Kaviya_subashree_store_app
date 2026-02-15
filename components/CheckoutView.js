import { ArrowLeft, CheckCircle2, ChevronRight, Clock, MapPin, ShieldCheck } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DELIVERY_SLOTS, THEME } from '../constants';

export default function CheckoutView({ cart, onSuccess, onBack }) {
    const [selectedSlot, setSelectedSlot] = useState(DELIVERY_SLOTS[0].id);
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <TouchableOpacity onPress={onBack} style={styles.backBtn} activeOpacity={0.7}>
                <View style={styles.backIcon}>
                    <ArrowLeft color={THEME.text} size={20} />
                </View>
                <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Checkout</Text>
            <Text style={styles.subtitle}>Complete your order details</Text>

            {/* Delivery Address Section */}
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <View style={styles.cardIconBox}>
                        <MapPin color={THEME.primary} size={20} />
                    </View>
                    <Text style={styles.cardTitle}>Delivery Address</Text>
                    <TouchableOpacity style={styles.editBtn}>
                        <Text style={styles.editBtnText}>Change</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.addressBox} activeOpacity={0.8}>
                    <View style={styles.addressInfo}>
                        <View style={styles.addressBadge}>
                            <Text style={styles.addressBadgeText}>HOME</Text>
                        </View>
                        <Text style={styles.addressText}>123 Green Lane, Near Temple</Text>
                        <Text style={styles.addressSubText}>Salem, Tamil Nadu - 636003</Text>
                    </View>
                    <ChevronRight size={20} color={THEME.textMuted} />
                </TouchableOpacity>
            </View>

            {/* Delivery Time Slot Section */}
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <View style={styles.cardIconBox}>
                        <Clock color={THEME.primary} size={20} />
                    </View>
                    <Text style={styles.cardTitle}>Delivery Slot</Text>
                </View>
                <View style={styles.slotsGrid}>
                    {DELIVERY_SLOTS.map((slot) => {
                        const isActive = selectedSlot === slot.id;
                        return (
                            <TouchableOpacity
                                key={slot.id}
                                activeOpacity={0.8}
                                style={[styles.slotItem, isActive && styles.slotItemActive]}
                                onPress={() => setSelectedSlot(slot.id)}
                            >
                                <View style={[styles.slotRadio, isActive && styles.slotRadioActive]}>
                                    {isActive && <View style={styles.slotRadioInner} />}
                                </View>
                                <View style={styles.slotTextContent}>
                                    <Text style={[styles.slotLabel, isActive && styles.slotLabelActive]}>{slot.label}</Text>
                                    <Text style={[styles.slotTime, isActive && styles.slotTimeActive]}>{slot.time}</Text>
                                </View>
                                {isActive && <CheckCircle2 size={18} color={THEME.primary} />}
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>

            {/* Order Summary Section */}
            <View style={styles.summaryBox}>
                <Text style={styles.summaryTitle}>Order Summary</Text>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Items Total</Text>
                    <Text style={styles.summaryVal}>₹{total.toFixed(2)}</Text>
                </View>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Delivery Fee</Text>
                    <Text style={[styles.summaryVal, { color: THEME.primary }]}>FREE</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Total Payable</Text>
                    <Text style={styles.totalVal}>₹{total.toFixed(2)}</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.payBtn} activeOpacity={0.9} onPress={onSuccess}>
                <Text style={styles.payBtnText}>Confirm Order</Text>
                <View style={styles.payIconBox}>
                    <ShieldCheck color={THEME.primary} size={20} />
                </View>
            </TouchableOpacity>

            <View style={styles.footerSpacer} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: THEME.background },
    backBtn: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 25 },
    backIcon: { backgroundColor: 'white', padding: 10, borderRadius: 12, borderWidth: 1, borderColor: '#f1f5f9' },
    backText: { fontWeight: '800', fontSize: 16, color: THEME.text },
    title: { fontSize: 34, fontWeight: '999', color: THEME.text },
    subtitle: { fontSize: 15, color: THEME.textMuted, fontWeight: '600', marginTop: 4, marginBottom: 25 },

    card: { backgroundColor: 'white', borderRadius: 30, padding: 20, marginBottom: 20, borderWidth: 1, borderColor: '#f1f5f9', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05, shadowRadius: 20, elevation: 4 },
    cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 15 },
    cardIconBox: { backgroundColor: '#f0fdf4', padding: 8, borderRadius: 10 },
    cardTitle: { fontSize: 18, fontWeight: '900', color: THEME.text, flex: 1 },
    editBtnText: { color: THEME.primary, fontWeight: '800', fontSize: 13 },

    addressBox: { backgroundColor: '#f8fafc', padding: 18, borderRadius: 22, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#f1f5f9' },
    addressInfo: { flex: 1 },
    addressBadge: { backgroundColor: THEME.primary, alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, marginBottom: 8 },
    addressBadgeText: { color: 'white', fontSize: 10, fontWeight: '900', letterSpacing: 1 },
    addressText: { color: THEME.text, fontWeight: '900', fontSize: 16 },
    addressSubText: { color: THEME.textMuted, fontSize: 13, marginTop: 4, fontWeight: '600' },

    slotsGrid: { gap: 12 },
    slotItem: {
        padding: 18,
        borderRadius: 22,
        borderWidth: 1.5,
        borderColor: '#f1f5f9',
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15
    },
    slotItemActive: {
        borderColor: THEME.primary,
        backgroundColor: '#f0fdf4'
    },
    slotRadio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: '#e2e8f0', justifyContent: 'center', alignItems: 'center' },
    slotRadioActive: { borderColor: THEME.primary },
    slotRadioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: THEME.primary },
    slotTextContent: { flex: 1 },
    slotLabel: { fontWeight: '900', fontSize: 16, color: THEME.textMuted },
    slotLabelActive: { color: THEME.text },
    slotTime: { fontSize: 13, color: THEME.textMuted, fontWeight: '600', marginTop: 2 },
    slotTimeActive: { color: THEME.primary },

    summaryBox: { backgroundColor: 'white', borderRadius: 30, padding: 25, marginBottom: 25, borderWidth: 1, borderColor: '#f1f5f9' },
    summaryTitle: { fontSize: 22, fontWeight: '900', marginBottom: 20, color: THEME.text },
    summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
    summaryLabel: { color: THEME.textMuted, fontWeight: '700', fontSize: 15 },
    summaryVal: { color: THEME.text, fontWeight: '800', fontSize: 15 },
    divider: { height: 1, backgroundColor: '#f1f5f9', marginVertical: 15 },
    totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    totalLabel: { fontSize: 20, color: THEME.text, fontWeight: '999' },
    totalVal: { fontSize: 28, fontWeight: '999', color: THEME.primary },

    payBtn: {
        backgroundColor: THEME.primary,
        padding: 22, borderRadius: 25,
        flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 15,
        shadowColor: THEME.primary,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.35,
        shadowRadius: 20,
        elevation: 8
    },
    payBtnText: { color: 'white', fontWeight: '900', fontSize: 20 },
    payIconBox: { backgroundColor: 'white', padding: 8, borderRadius: 12 },
    footerSpacer: { height: 100 }
});
