import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CreateScreen() {
  return (
    <SafeAreaView>
      <ThemedText type="title">
        Create
      </ThemedText>
    </SafeAreaView>
  )
}
