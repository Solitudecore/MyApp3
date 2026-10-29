import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, TextInput, SectionList, Platform, KeyboardAvoidingView,useWindowDimensions} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Header from '../components/Header'; 
import FoodCard, { FoodItem } from '../components/FoodCard';

export default function RootLayout() {
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
 
  const categories = ["All", "Fruits", "Meats", "Sweets", "Drinks"];
  const [selectedCategory, setSelectedCategory] = useState("All"); 
 
  const [products, setProducts] = useState<FoodItem[]>([
    { id: 1, name: 'Apple', price: 2, category: 'Fruits' },
    { id: 2, name: 'Grape', price: 3, category: 'Fruits' },
    { id: 3, name: 'Beef', price: 15, category: 'Meats' },
    { id: 4, name: 'Cola', price: 2, category: 'Drinks' },
  ]);

  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
 
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const handleAddProduct = () => {
    if (newName.trim() === '' || newPrice.trim() === '') {
      Platform.OS === 'web' ? window.alert("Please enter name and price") : Alert.alert("Error", "Please enter name and price");
      return;
    }
    if (selectedCategory === "All") {
      Platform.OS === 'web' ? window.alert("Please select a specific category first!") : Alert.alert("Warning", "Please select a category first!");
      return;
    }
    const newProd: FoodItem = {
      id: Date.now(),
      name: newName,
      price: parseFloat(newPrice) || 0,
      category: selectedCategory,
    };
    setProducts([...products, newProd]);
    setNewName('');
    setNewPrice('');
  };

  const handleRemoveProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleAddToCart = (item: FoodItem) => {
    setCartCount(prev => prev + 1);
    setCartTotal(prev => prev + item.price);
    Platform.OS === 'web' ? window.alert(`${item.name} added to cart!`) : Alert.alert('Success', `${item.name} added to cart!`);
  };

  const sectionsData = categories
    .filter(cat => cat !== "All") 
    .filter(cat => selectedCategory === "All" || selectedCategory === cat) 
    .map(cat => ({
      title: cat,
      data: [products.filter(p => p.category === cat)] 
    }))
    .filter(section => section.data[0].length > 0); 

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.container}>
        <Header cartCount={cartCount} cartTotal={cartTotal} />
        <View style={[
          styles.mainContent, 
          { 
            flexDirection: isLandscape ? 'row' : 'column',
            paddingHorizontal: isLandscape ? 40 : 0  
          }
        ]}>
          <View style={{ flex: isLandscape ? 1 : undefined, marginRight: isLandscape ? 15 : 0 }}>
            <View>
              <FlatList 
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoriesContainer}
                data={categories}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity 
                    style={[styles.categoryBtn, selectedCategory === item && styles.categoryBtnActive]}
                    onPress={() => setSelectedCategory(item)}
                  >
                    <Text style={[styles.categoryText, selectedCategory === item && styles.categoryTextActive]}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>

            <View style={styles.addForm}>
              <TextInput
                style={styles.input}
                placeholder="Product name"
                value={newName}
                onChangeText={setNewName}
              />
              <TextInput
                style={styles.input}
                placeholder="Price"
                value={newPrice}
                onChangeText={setNewPrice}
                keyboardType="numeric"
                onSubmitEditing={handleAddProduct}
              />
              <TouchableOpacity style={styles.submitBtn} onPress={handleAddProduct}>
                <MaterialCommunityIcons name="plus" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={{ flex: isLandscape ? 1.5 : 1 }}>
            <SectionList
              sections={sectionsData} 
              keyExtractor={(item, index) => item.length > 0 ? item[0].id.toString() + index : index.toString()}
              contentContainerStyle={styles.listContent}
              renderSectionHeader={({ section: { title } }) => (
                <Text style={styles.sectionTitle}>{title}</Text>
              )}
              renderItem={({ item }) => (
                <View style={styles.gridContainer}>
                  {item.map((prod: FoodItem) => (
                    <FoodCard 
                      key={prod.id} 
                      item={prod} 
                      onAdd={handleAddToCart} 
                      onRemove={handleRemoveProduct} 
                    />
                  ))}
                </View>
              )}
            />
          </View>

        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#e6e6e6' 
  },
  mainContent: {
    flex: 1,
  },
  categoriesContainer: { 
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  categoryBtn: { 
    paddingHorizontal: 20, 
    paddingVertical: 10, 
    marginRight: 12, 
    borderRadius: 25, 
    backgroundColor: '#e0e0e0',
  },
  categoryBtnActive: { 
    backgroundColor: '#08acf3', 
    elevation: 4,
    shadowOpacity: 0.4,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  categoryText: { 
    fontSize: 15, 
    fontWeight: '600', 
    color: '#555' 
  },
  categoryTextActive: { 
    color: '#fff',
    fontWeight: 'bold'
  }, 
  addForm: { 
    flexDirection: 'row', 
    padding: 15, 
    backgroundColor: '#fff', 
    alignItems: 'center', 
    gap: 10, 
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 15,
    elevation: 3, 
    shadowColor: '#000', 
    shadowOpacity: 0.1, 
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  input: { 
    flex: 1, 
    borderWidth: 1, 
    borderColor: '#eee', 
    borderRadius: 8, 
    paddingHorizontal: 15, 
    height: 45, 
    backgroundColor: '#fafafa' 
  },
  submitBtn: { 
    backgroundColor: '#016bff', 
    borderRadius: 10, 
    height: 45, 
    width: 45, 
    justifyContent: 'center', 
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#4CAF50',
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  listContent: { 
    paddingHorizontal: 10, 
    paddingBottom: 50 
  },
  sectionTitle: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#3b3e41', 
    marginTop: 25, 
    marginBottom: 15, 
    borderBottomWidth: 3, 
    borderBottomColor: '#4CAF50', 
    alignSelf: 'flex-start',
    paddingBottom: 5,
  },
  gridContainer: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between', 
    paddingBottom: 15,
  },
});