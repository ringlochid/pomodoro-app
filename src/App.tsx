import "./App.css";
import { ModalContainer } from "./components/modalContainer";
import { HeaderContainer } from "./components/headerContainer";
import { ClockContainer } from "./components/clockContainer";
import { TailContainer } from "./components/tailContainer";
import { SettingProvider } from "./components/settingProvider";
import { useCallback, useState, type JSX } from "react";
import { useSettingEffect } from "./hooks/useSetting";
import { TimeProvider } from "./components/timeProvider";

function MainPage(): JSX.Element {
  const [isMoadalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  useSettingEffect();

  return (
    <div className="grid h-svh w-svw bg-blue-850 place-items-center overflow-hidden">
      {isMoadalOpen ? (
        <ModalContainer handleCloseModal={handleCloseModal} />
      ) : (
        <>
          <HeaderContainer />
          <ClockContainer />
          <TailContainer handleOpenModal={handleOpenModal} />
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <SettingProvider>
      <TimeProvider>
        <MainPage />
      </TimeProvider>
    </SettingProvider>
  );
}

export default App;
