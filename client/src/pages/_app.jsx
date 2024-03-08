import Header from "../components/Layout/Header/Header";
import "./styles/globals.css";
import { store, persistor } from "../lib/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";


export default function App({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Header />
          <Component {...pageProps} />;
        </PersistGate>
      </Provider>
    </>
  );
}
