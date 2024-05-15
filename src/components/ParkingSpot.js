import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Text, Box, useMantineTheme } from '@mantine/core';
import Mercedes from '../assets/mercedes.svg';
import { motion, AnimatePresence } from 'framer-motion';
import { getDatabase, ref, onValue } from '../firebase';
import ResponsiveStyle from './ResponsiveStyle';
import CarRegistration from './CarRegistration';
import { Badge, Offcanvas, Button } from 'react-bootstrap';
import './Font.css';

const fetchParkingData = async (path) => {
  const db = getDatabase();
  const snapshot = await ref(db, path).get();
  return snapshot.val();
};

const useFirebaseRealtime = (path) => {
  const [value, setValue] = useState(false);
  useEffect(() => {
    const db = getDatabase();
    const reference = ref(db, path);
    const unsubscribe = onValue(reference, (snapshot) => {
      setValue(snapshot.val());
    });
    return () => unsubscribe();
  }, [path]);

  return value;
};

function ParkingSpot() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const queryClient = useQueryClient();
  const theme = useMantineTheme();
  const styles = ResponsiveStyle();

  // 네 개의 주차 구역 상태 가져오기
  const reg1 = useFirebaseRealtime('parking_spot_registered/A1');
  const reg2 = useFirebaseRealtime('parking_spot_registered/A2');
  const reg3 = useFirebaseRealtime('parking_spot_registered/A3');
  const reg4 = useFirebaseRealtime('parking_spot_registered/A4');

  // 전체 주차 상태 가져오기
  const { data: parkingData, isLoading } = useQuery({
    queryKey: '[parkingData]',
    queryFn: () => fetchParkingData('parking_spot_state'),
  });

  // Firebase 상태 업데이트
  useEffect(() => {
    const db = getDatabase();
    const docRef = ref(db, 'parking_spot_state');
    const unsubscribe = onValue(docRef, (snapshot) => {
      queryClient.setQueryData('[parkingData]', snapshot.val());
    });

    return () => unsubscribe();
  }, [queryClient]);

  // 사용 가능한 주차 공간 수 계산
  const availableSpots = parkingData ? Object.values(parkingData).filter(state => !state).length : 0;
  const totalSpots = parkingData ? Object.keys(parkingData).length : 4; // 데이터가 로드되지 않았다면 4개로 가정

  if (isLoading) return <p>Loading...</p>;

  return (
    <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* <Text style={{ fontFamily: "Black Han Sans", fontSize: styles.titleFontSize }}>
        주차장 차량 관리
      </Text> */}
      <h2 style={{ fontFamily: "Black Han Sans", fontSize: styles.titleFontSize }}>주차장 차량 관리</h2>
      <Badge pill bg="success" style={{ fontSize: '1rem', marginBottom: '10px' }}>
        이용 가능 대수: {availableSpots}/{totalSpots}
      </Badge>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gridTemplateRows: 'repeat(2, 1fr)',
          gridTemplateAreas: `
            "A1 A3"
            "A2 A4"
          `,
          gap: styles.gridGap,
          justifyItems: 'center'
        }}
      >
        {/* 주차 구역 박스에 각각 위치 지정 */}
        <ParkingSpotBox spotName="A1" state={parkingData?.A1} registered={reg1} styles={styles} theme={theme} />
        <ParkingSpotBox spotName="A3" state={parkingData?.A3} registered={reg3} styles={styles} theme={theme} />
        <ParkingSpotBox spotName="A2" state={parkingData?.A2} registered={reg2} styles={styles} theme={theme} />
        <ParkingSpotBox spotName="A4" state={parkingData?.A4} registered={reg4} styles={styles} theme={theme} />
      </div>
      <Button variant="primary" onClick={handleShow} style={{
        position: 'absolute',
        right: '20px',
        bottom: '20px'
      }}>
        +
      </Button>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          {/* <Offcanvas.Title>차량 등록</Offcanvas.Title> */}
        </Offcanvas.Header>
        <Offcanvas.Body>
          <CarRegistration />
        </Offcanvas.Body>
      </Offcanvas>
    </Box>
  );
}

const ParkingSpotBox = ({ spotName, state, registered, styles, theme }) => (
  <div
    style={{
      gridArea: spotName,
      margin: '10px', // 개별 박스마다 여백을 위해 10px 마진 추가
      width: styles.spotWidth,
      display: 'flex',
      flexDirection: 'column',
      alignItems: ['A1', 'A2'].includes(spotName) ? 'flex-start' : 'flex-end',
    }}
  >
    <Box
      style={{
        borderBottom: '1px solid',
        borderColor: theme.colors.gray[1],
        height: styles.spotHeight,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        backgroundColor: state ? (registered ? 'green' : 'red') : 'white',
        ...styles.centerBox
      }}
    >
      <AnimatePresence>
        {state && (
          <ParkingCarImage spotName={spotName} styles={styles} />
        )}
      </AnimatePresence>
      {!state && (
        <Text style={{ ...styles.centerAbsolute, fontSize: styles.fontSize }}>
          Available
        </Text>
      )}
      <Text style={{
        position: 'absolute',
        bottom: -5,
        [spotName === 'A1' || spotName === 'A2' ? 'left' : 'right']: 5,
        color: theme.colors.gray[6],
        fontSize: styles.fontSize,
      }}>
        {spotName}
      </Text>
    </Box>
    <ParkingStatusBox state={state} registered={registered} styles={styles} />
  </div>
);

const ParkingCarImage = ({ spotName, styles }) => (
  <motion.div
    initial={{ x: 0, opacity: 0 }}
    animate={{ x: ['A3', 'A4'].includes(spotName) ? -20 : 20, opacity: 1 }}
    exit={{ x: 0, opacity: 0 }}
    transition={{ duration: 1, type: 'spring', damping: 10 }}
    style={{
      position: 'relative',
      left: ['A1', 'A2'].includes(spotName) ? -styles.motionPos : undefined,
      right: ['A3', 'A4'].includes(spotName) ? -styles.motionPos : undefined,
    }}
  >
    <img
      src={Mercedes}
      height={styles.spotHeight * 0.6}
      alt="mercedes car top view"
      style={{
        transform: ['A1', 'A2'].includes(spotName) ? 'none' : 'rotate(180deg)',
        filter: 'drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.4))',
      }}
    />
  </motion.div>
);

const ParkingStatusBox = ({ state, registered, styles }) => (
  <div style={{
    marginTop: '5px',
    backgroundColor: state ? (registered ? 'green' : 'red') : 'white',
    color: 'white',
    padding: styles.padding,
    borderRadius: '5px',
    fontSize: styles.fontSize,
    textAlign: 'center',
  }}>
    {state ? (registered ? '등록차량' : '비등록차량') : ''}
  </div>
);

export default ParkingSpot;
