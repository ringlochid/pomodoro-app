import "./App.css";
import { ModalContainer } from "./components/modalContainer";
import { HeaderContainer } from "./components/headerContainer";
import { ClockContainer } from "./components/clockContainer";
import { TailContainer } from "./components/tailContainer";
import { SettingProvider } from "./components/settingProvider";

function App() {
  return (
    <SettingProvider>
      <div className="grid h-svh w-svw bg-blue-850 place-items-center overflow-hidden">
        <HeaderContainer />
        <ClockContainer />
        <TailContainer />
      </div>
    </SettingProvider>
  );
}

export default App;
