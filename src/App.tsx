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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  useSettingEffect();

  return (
    <div className="flex h-dvh flex-col bg-blue-850 px-6 py-8 md:px-10 md:py-10 lg:px-12 lg:py-12 overflow-y-scroll [scrollbar-width:none]">
      <div
        className={`mx-auto flex min-h-0 w-full flex-1 ${
          isModalOpen ? "items-center justify-center" : ""
        } md:items-center md:justify-center`}
      >
        {isModalOpen ? (
          <ModalContainer handleCloseModal={handleCloseModal} />
        ) : (
          <main className="mx-auto flex min-h-0 w-full max-w-144 flex-1 flex-col items-center justify-between md:flex-none md:justify-center md:gap-16 lg:gap-20">
            <HeaderContainer />
            <ClockContainer />
            <TailContainer handleOpenModal={handleOpenModal} />
          </main>
        )}
      </div>
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
