import { createContext, useCallback, useContext, useState } from "react";
import type { FlowData, ModuleId, Screen } from "shared";
import { INITIAL_FLOW_DATA } from "shared";
import { Flow } from "./pages/flow";
import { Generating } from "./pages/generating";
import { Landing } from "./pages/landing";
import { Output } from "./pages/output";

interface AppContextValue {
  screen: Screen;
  goTo: (screen: Screen) => void;
  flowData: FlowData;
  updateFlow: (data: Partial<FlowData>) => void;
  activeModule: ModuleId;
  setActiveModule: (id: ModuleId) => void;
}

const AppContext = createContext<AppContextValue>(null!);

export function useApp() {
  return useContext(AppContext);
}

export function App() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [activeModule, setActiveModule] = useState<ModuleId>("tese");
  const [flowData, setFlowData] = useState<FlowData>(INITIAL_FLOW_DATA);

  const goTo = useCallback((s: Screen) => {
    setScreen(s);
    window.scrollTo(0, 0);
  }, []);

  const updateFlow = useCallback((data: Partial<FlowData>) => {
    setFlowData((prev) => ({ ...prev, ...data }));
  }, []);

  return (
    <AppContext
      value={{
        screen,
        goTo,
        flowData,
        updateFlow,
        activeModule,
        setActiveModule,
      }}
    >
      {screen === "landing" && <Landing />}
      {screen === "flow" && <Flow />}
      {screen === "generating" && <Generating />}
      {screen === "output" && <Output />}
    </AppContext>
  );
}
