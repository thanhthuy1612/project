import ReactDOM from 'react-dom/client'
import { ConfigProvider } from "antd";
import Notification from "./components/notification/Notification.tsx"
import App from './App.tsx'
import './index.css'
import StoreProvider from './StoreProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StoreProvider>
    <ConfigProvider
      theme={{
        components: {
          Segmented: {
            itemSelectedBg: '#FBF9F1'
          },
          Modal: {
            contentBg: '#FBF9F1',
            headerBg: '#FBF9F1'
          },
          Menu: {
            itemSelectedBg: '#E5E1DA'
          }
        },
        token: {
          // Seed Token
          colorPrimary: '#388087',
          colorBorderBg: '#388087',
          colorIcon: '#388087',
          colorTextBase: '#388087',
          colorError: '#FF6961',
          colorTextPlaceholder: '#E5E1DA',
          // Alias Token
          colorBgContainer: '#FBF9F1',
          colorBgElevated: '#FBF9F1',
        },
      }}
    >
      <Notification>
        <App />
      </Notification>
    </ConfigProvider>
  </StoreProvider>,
)
