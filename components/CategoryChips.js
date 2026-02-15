import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CATEGORIES, THEME } from '../constants';

export default function CategoryChips({ activeCategory, onCategoryChange }) {
    return (
        <View style={styles.wrapper}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.container}
            >
                {CATEGORIES.map(cat => {
                    const isActive = activeCategory === cat.id;
                    return (
                        <TouchableOpacity
                            key={cat.id}
                            activeOpacity={0.7}
                            onPress={() => onCategoryChange(cat.id)}
                            style={[
                                styles.chip,
                                isActive && styles.activeChip
                            ]}
                        >
                            <View style={[styles.iconContainer, isActive && styles.activeIconContainer]}>
                                <Text style={styles.icon}>{cat.icon}</Text>
                            </View>
                            <Text style={[
                                styles.text,
                                isActive && styles.activeText
                            ]}>
                                {cat.name}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: { backgroundColor: THEME.background },
    container: { paddingHorizontal: 20, paddingVertical: 18, gap: 12 },
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        backgroundColor: 'white',
        paddingRight: 18,
        paddingLeft: 8,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#f1f5f9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2
    },
    activeChip: {
        backgroundColor: THEME.primary,
        borderColor: THEME.primary,
        shadowColor: THEME.primary,
        shadowOpacity: 0.2
    },
    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: 14,
        backgroundColor: '#f8fafc',
        justifyContent: 'center',
        alignItems: 'center'
    },
    activeIconContainer: {
        backgroundColor: 'rgba(255,255,255,0.2)'
    },
    icon: { fontSize: 18 },
    text: { fontWeight: '800', color: THEME.text, fontSize: 15 },
    activeText: { color: 'white' }
});
