// src/App.js
import React from 'react';
import { Toaster } from 'react-hot-toast';
import useRouteElements from './useRouteElements';
import '../src/styles/Toast.css'
function App() {
  const routes = useRouteElements();

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          // Thời gian toast hiển thị (ms)
          duration: 3000,
          // Mặc định style chung
          style: {
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: '#fff',
            padding: '12px 16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            fontWeight: 500,
          },
          // Tùy chỉnh riêng cho từng loại
          success: {
            // icon mặc định
            icon: '✅',
            style: {
              background: 'linear-gradient(135deg, #48bb78 0%, #2f855a 100%)',
            },
          },
          error: {
            icon: '❌',
            style: {
              background: 'linear-gradient(135deg, #f56565 0%, #c53030 100%)',
            },
          },
          // Nếu cần, bạn có thể thêm warning, info...
        }}
      />
      {routes}
    </>
  );
}

export default App;
