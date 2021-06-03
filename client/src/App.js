import React, { Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SpinnerLoading from "./components/SpinnerLoading";
import { configI18n } from "./resources/i18N_config";
import CheckOutRoute from "./routes/CheckoutRoute";
import { getLangIdFromState } from "./store/ShopReducer";

const HomePage = React.lazy(() => import("./pages/Home"));
const CheckoutPage = React.lazy(() => import("./pages/Checkout"));
const InternalErrorPage = React.lazy(() => import("./pages/InternalError"));
const NotFoundPage = React.lazy(() => import("./pages/NotFound"));

const App = () => {
  const langId = useSelector(getLangIdFromState);
  useEffect(() => {
    if (langId) {
      configI18n(langId);
    }
  }, [langId]);
  return (
    <div className="App">
      <Suspense fallback={<SpinnerLoading />}>
        <Switch>
          <CheckOutRoute exact path="/checkout" component={CheckoutPage} />
          <Route path="/" component={HomePage} />
          <Route exact path="/internal-error" component={InternalErrorPage} />
          <Route exact path="*" component={NotFoundPage} />
        </Switch>
      </Suspense>
    </div>
  );
};
export default App;
