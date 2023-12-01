import React from 'react';
import ParkingSpot from './components/ParkingSpot.js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MantineProvider } from '@mantine/core';
import { useMediaQuery } from 'react-responsive'; // 추가

// QueryClient의 새 인스턴스 생성
const queryClient = new QueryClient();

function App() {
  // 추가: 화면 크기 감지
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  return (
    // react-query 기능을 활성화하기 위해 전체 앱을 QueryClientProvider로 래핑
    <QueryClientProvider client={queryClient}>
      {/* Mantine 스타일링을 활성화하기 위해 전체 앱을 MantineProvider로 래핑 */}
      <MantineProvider>
        <div className="App">
          {/* 추가: isMobile을 ParkingSpot 컴포넌트로 전달 */}
          <header className="App-header">
            <ParkingSpot isMobile={isMobile} />
          </header>
        </div>
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
