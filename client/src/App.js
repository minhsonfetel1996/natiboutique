import React, { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SpinnerLoading from "./components/SpinnerLoading";
import { configI18n } from "./resources/i18N_config";
import CheckOutRoute from "./routes/CheckoutRoute";
import { getIsCartClicked, setCartClicked } from "./store/CartReducer";
import { getLangIdFromState } from "./store/ShopReducer";

const HomePage = React.lazy(() => import("./pages/Home"));
const CheckoutPage = React.lazy(() => import("./pages/Checkout"));
const InternalErrorPage = React.lazy(() => import("./pages/InternalError"));
const NotFoundPage = React.lazy(() => import("./pages/NotFound"));

const App = () => {
  const langId = useSelector(getLangIdFromState);
  if (langId) {
    configI18n(langId);
  }

  const dispatch = useDispatch();
  const isCartOpen = useSelector(getIsCartClicked);

  useEffect(() => {
    let listener = document.addEventListener("click", function (event) {
      if (event) {
        event.preventDefault();
      }
      if (isCartOpen) {
        setTimeout(() => {
          dispatch(setCartClicked(false));
        }, 2000);
      }
    });
    return () => {
      if (listener) {
        listener();
      }
    };
  });

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
