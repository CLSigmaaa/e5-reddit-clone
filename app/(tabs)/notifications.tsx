import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NotificationsScreen() {
  return (
    <SafeAreaView>
      <ThemedText type="title">
        Notifications
      </ThemedText>
    </SafeAreaView>
  )
}
