import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { api, endpoints } from '../api/client';

export default function HistoryScreen({ route }) {
  const { variable } = route.params || {};
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get(`${endpoints.history}?variable=${variable}`);
        setData(Array.isArray(res.data) ? res.data : []);
        setError(null);
      } catch (e) {
        setError('Falha ao carregar histórico');
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [variable]);

  if (loading) return <View style={styles.center}><ActivityIndicator /></View>;
  if (error) return <View style={styles.center}><Text style={{ color: 'red' }}>{error}</Text></View>;

  return (
    <View style={styles.container}>
      {data.length === 0 ? (
        <Text>Nenhum dado histórico encontrado.</Text>
      ) : (
        data.map((item, idx) => (
          <View key={idx} style={styles.row}>
            <Text style={styles.label}>{item.label}</Text>
            <Text style={styles.value}>{item.value}</Text>
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderColor: '#eee' },
  label: { color: '#666' },
  value: { fontWeight: 'bold' },
});



