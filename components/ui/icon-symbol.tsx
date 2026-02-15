import { Ionicons } from '@expo/vector-icons';

export function IconSymbol({ name, size, color }: any) {
    // Map some names if needed, or just use as is
    return <Ionicons name={name.includes('.') ? 'help' : name} size={size} color={color} />;
}
