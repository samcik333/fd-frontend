import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import "bootstrap/dist/css/bootstrap.min.css"
import { UserProvider } from "./UserContext"
import { ToastProvider } from "./ToastContext"
import BootstrapToast from "./components/Toasts/ShowToast"

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
)
root.render(
  <React.StrictMode>
    <ToastProvider>
      <UserProvider>
        <BootstrapToast />
        <App />
      </UserProvider>
    </ToastProvider>
  </React.StrictMode>,
)
reportWebVitals()
