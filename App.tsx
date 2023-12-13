import { DatabaseProvider } from "@nozbe/watermelondb/DatabaseProvider";
import { database } from './src/lib/watermelon';
import { Button, View } from "react-native";
import { sync } from "./src/lib/sync";

export default function App() {
  return (
    <DatabaseProvider database={database}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
        <Button title="sync" onPress={sync} />
      </View>    
    </DatabaseProvider>
  );
}
