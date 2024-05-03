import ReactDOM from 'react-dom/client'
import { ConfigProvider } from "antd";
import Notification from "./components/Notification.tsx"
import App from './App.tsx'
import './index.css'
import StoreProvider from './StoreProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StoreProvider>
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: '#388087',
          colorBorderBg: '#388087',
          colorIcon: '#388087',
          colorBgTextHover: '#6FB3B8',
          colorTextBase: '#388087',
          colorError: '#FF6961',
          colorTextPlaceholder: '#E5E1DA',
          // Alias Token
          colorBgContainer: '#FBF9F1',
        },
      }}
    >
      <Notification>
        <App />
      </Notification>
    </ConfigProvider>
  </StoreProvider>,
)
