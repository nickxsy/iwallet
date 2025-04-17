import { ComposeChildren, store } from "@/shared/lib";
import { Provider } from "react-redux";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <ComposeChildren>
      <Provider store={store} children={null} />
      {/* <Confirmation /> */}
      {/* <AbilityProvider /> */}
      {children}
    </ComposeChildren>
  );
}
