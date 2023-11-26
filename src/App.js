// App.js
import React from 'react';
import ParkingSpot from './components/ParkingSpot';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MantineProvider } from '@mantine/core';

// QueryClient의 새 인스턴스 생성
const queryClient = new QueryClient();

function App() {
  return (
    // react-query 기능을 활성화하기 위해 전체 앱을 QueryClientProvider로 래핑
    <QueryClientProvider client={queryClient}>
      {/* Mantine 스타일링을 활성화하기 위해 전체 앱을 MantineProvider로 래핑 */}
      <MantineProvider>
        <div className="App">
          {/* ParkingSpot 컴포넌트를 렌더링 */}
          <header className="App-header">
            <ParkingSpot />
          </header>
        </div>
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
