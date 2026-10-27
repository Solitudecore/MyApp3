import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export type FoodItem = {
  id: number;
  name: string;
  price: number;
  category: string;
};

type FoodCardProps = {
  item: FoodItem;
  onAdd: (item: FoodItem) => void;
  onRemove: (id: number) => void;
};

export default function FoodCard({ item, onAdd, onRemove }: FoodCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.name}>{item.name}</Text>
        <TouchableOpacity onPress={() => onRemove(item.id)}>
          <MaterialCommunityIcons name="trash-can-outline" size={22} color="red" />
        </TouchableOpacity>
      </View>
      <Text style={styles.price}>{item.price} AZN</Text>
      
      <TouchableOpacity style={styles.btn} onPress={() => onAdd(item)}>
        <Text style={styles.btnText}>+ Add</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  card: {
    width: "48%", 
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginVertical: 8,
 
    elevation: 3, 
    shadowColor: '#000', 
    shadowOpacity: 0.1, 
    shadowRadius: 4,
  },
  headerRow: {
    flexDirection: 'row',  
    justifyContent: 'space-between', 
    alignItems: 'center',
  },
  name: { 
    fontSize: 18, 
    fontWeight: "bold", 
    flex: 1  
  },
  price: { fontSize: 16, color: '#555', marginVertical: 5 },
  btn: { marginTop: 10, backgroundColor: "#0267ff", padding: 8, borderRadius: 6 },
  btnText: { color: "#fff", textAlign: "center", fontWeight: 'bold' },
});