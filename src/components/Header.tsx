import React from 'react';
import { StyleSheet, View ,Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type HeaderProps = {
    cartCount: number;
    cartTotal: number;
}

export default function Header({ cartCount, cartTotal }: HeaderProps) {
    return (
        <View style={styles.header}>
            <View style={styles.cartInfo}> 
             <MaterialCommunityIcons name="cart-outline" size={26} color="white" />

                <Text style={styles.cartCount}>Items: {cartCount}</Text>
                <Text style={styles.cartTotal}>Total: {cartTotal.toFixed(2)}  AZN  </Text>
           
           
            </View>



        </View>
    );
}


const styles=StyleSheet.create({
    header: {
    backgroundColor: '#08acf3',  
    padding: 15,
    paddingTop: 40,
 },
  cartInfo: {
    alignItems: 'center',
  },
  cartCount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  cartTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
})