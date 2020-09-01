import React from 'react';
import { View,Button } from 'react-native';

import { useAuth } from '../../hooks/AuthContext';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();
  return (
      <View>
        <Button title="sair" onPress={signOut} />
      </View>

  )
}

export default Dashboard;
