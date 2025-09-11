import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { api, endpoints } from '../api/client';

export default function DashboardScreen({ navigation }) {
  const [latest, setLatest] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const res = await api.get(endpoints.data);
      const data = res.data;
      if (!data || !data.leituras_esp32) throw new Error('Formato inválido');
      const devices = Object.keys(data.leituras_esp32);
      if (devices.length === 0) return setLatest(null);
      let most = null, mostTs = 0;
      devices.forEach((id) => {
        const entry = data.leituras_esp32[id];
        const ts = new Date(entry.timestamp).getTime();
        if (ts > mostTs) { mostTs = ts; most = entry; }
      });
      if (most && Array.isArray(most.leituras) && most.leituras.length) {
        const last = most.leituras[most.leituras.length - 1];
        const parsed = {};
        last.split(';').forEach(p => {
          const [k, v] = p.split(':');
          if (k && v) parsed[k.trim()] = isNaN(parseFloat(v)) ? v.trim() : parseFloat(v);
        });
        setLatest(parsed);
      }
      setError(null);
    } catch (e) {
      setError('Falha ao buscar dados');
    }
  };

  useEffect(() => {
    fetchData();
    const id = setInterval(fetchData, 5000);
    return () => clearInterval(id);
  }, []);

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync('auth_token');
    navigation.replace('Login');
  };

  const items = latest ? Object.keys(latest).map((k) => ({ key: k, value: latest[k] })) : [];

  const openHistory = (key) => {
    navigation.navigate('History', { variable: key });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard da Colmeia</Text>
        <Button title="Sair" onPress={handleLogout} />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
      <FlatList
        data={items}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => openHistory(item.key)}>
            <Text style={styles.cardTitle}>{item.key}</Text>
            <Text style={styles.cardValue}>
              {item.value}
              {item.key === 'Temp' ? ' °C' : item.key === 'Hum' ? ' %' : item.key === 'Peso' ? ' kg' : item.key === 'Freq' ? ' Hz' : item.key === 'Mag' ? ' dB' : ''}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  title: { fontSize: 20, fontWeight: 'bold' },
  error: { color: 'red', marginBottom: 8 },
  card: { padding: 16, backgroundColor: '#fff', borderRadius: 8, marginBottom: 8, elevation: 1 },
  cardTitle: { fontSize: 14, color: '#666' },
  cardValue: { fontSize: 18, fontWeight: 'bold' },
});


