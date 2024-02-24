import { Authenticated, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  notificationProvider,
  ThemedLayoutV2,
  ThemedSiderV2,
  ThemedTitleV2,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { DataProvider } from "@refinedev/strapi-v4";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { authProvider, axiosInstance } from "./authProvider";
import { API_ORIGIN } from "./constants";
import { ColorModeContextProvider } from "./contexts/color-mode";

import {
  CoffeeOutlined,
  BgColorsOutlined
} from "@ant-design/icons";

import {
  AuthPage,
  HomePage,
  InkyPage,
  CoffeePage,
  PlantsPage,
} from "./pages";

function App() {
  const { t, i18n } = useTranslation();

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <BrowserRouter>
    <ColorModeContextProvider>
    <RefineKbarProvider>
          <Refine
            authProvider={authProvider}
            dataProvider={DataProvider(API_ORIGIN + `/api`, axiosInstance)}
            notificationProvider={notificationProvider}
            i18nProvider={i18nProvider}
            routerProvider={routerBindings}
            resources={[
              {
                name: "inky",
                identifier: "inky",
                list: "/inky",
                meta: {
                  icon: <BgColorsOutlined />,
                  label: "Inky",
                  canDelete: false,
                },
              },
              {
                name: "coffee",
                identifier: "coffee",
                list: "/coffee",
                meta: {
                  icon: <CoffeeOutlined />,
                  label: "Coffee",
                  canDelete: false,
                },
              },
              {
                name: "plants",
                list: "/plants",
                show: "/plants/:id",
                meta: {
                  canDelete: false,
                },
              },
            ]}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
              projectId: "FTCQQf-QXr6zm-ozJ09F",
            }}
          >
            <Routes>
              <Route
                element={
                  <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                    <ThemedLayoutV2
                      Sider={(props) => <ThemedSiderV2 {...props} fixed />}
                      Title={({ collapsed }) => (
                        <ThemedTitleV2
                          collapsed={collapsed}
                          text="Osiris"
                        />
                      )}
                    >
                      <Outlet />
                    </ThemedLayoutV2>
                  </Authenticated>
                }
              >
                <Route
                  index
                  element={<HomePage /> }
                />
                <Route path="/inky">
                  <Route index element={ <InkyPage />} />
                </Route>
                <Route path="/coffee">
                  <Route index element={ <CoffeePage />} />
                </Route> 
                <Route path="/plants">
                  <Route index element={<PlantsPage />} />
                </Route>
                <Route path="*" element={<ErrorComponent />} />
              </Route>
              <Route
                element={
                  <Authenticated fallback={<Outlet />}>
                    <NavigateToResource />
                  </Authenticated>
                }
              >
                <Route
                  path="/login"
                  element={
                    <AuthPage
                      type="login"
                      title={
                        <ThemedTitleV2
                          collapsed={false}
                          text="Osiris"
                        />
                      }
                    />
                  }
                />
                <Route
                  path="/guestlogin"
                // @ts-ignore
                  element={<AuthPage type="guestlogin" />}
                />
                <Route
                  path="/forgot-password"
                  element={<AuthPage type="forgotPassword" />}
                />
               </Route>
            </Routes>

            <RefineKbar />
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
    </RefineKbarProvider>
    </ColorModeContextProvider>
    </BrowserRouter>
  );
}

export default App;
