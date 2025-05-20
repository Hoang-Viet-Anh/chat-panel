'use client'

import { Provider } from "react-redux";
import { store } from "@/lib/redux/store";
import MainLayout from "./MainLayout";

export default function ProviderLayout({ children }: { children: React.ReactNode }) {

  return (
    <Provider store={store}>
      <MainLayout>
        {children}
      </MainLayout>
    </Provider>
  );
}