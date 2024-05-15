import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { dbFirestore } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import './Font.css';
import ResponsiveStyle from './ResponsiveStyle';

const addCarToFirestore = async (apartmentNumber, carLicense) => {
  try {
    const carLicenseDocRef = doc(dbFirestore, 'registered', 'car_license');
    await updateDoc(carLicenseDocRef, { [apartmentNumber]: carLicense });
    console.log('차량 정보가 성공적으로 등록되었습니다!');
  } catch (error) {
    console.error('차량 정보 등록 중 오류가 발생했습니다:', error);
  }
};

const CarRegistration = () => {
  const [apartmentNumber, setApartmentNumber] = useState('');
  const [carLicense, setCarLicense] = useState('');
  const styles = ResponsiveStyle(); // 반응형 스타일 가져오기

  const handleAddCar = () => {
    if (apartmentNumber.trim() && carLicense.trim()) {
      addCarToFirestore(apartmentNumber, carLicense);
      setApartmentNumber('');
      setCarLicense('');
    }
  };

  return (
    <Container className="p-3">
      <h2 className="mb-3" style={{ fontFamily: "Black Han Sans", fontSize: styles.titleFontSize }}>차량 등록</h2>
      <Form>
        <Form.Group className="mb-3" controlId="formApartmentNumber">
          <Form.Label style={{ fontSize: styles.fontSize }}>호수</Form.Label>
          <Form.Control
            type="text"
            placeholder="예: 101호"
            value={apartmentNumber}
            onChange={(e) => setApartmentNumber(e.target.value)}
            style={{ fontSize: styles.fontSize }}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formCarLicense">
          <Form.Label style={{ fontSize: styles.fontSize }}>차량 번호</Form.Label>
          <Form.Control
            type="text"
            placeholder="예: 66오 3333"
            value={carLicense}
            onChange={(e) => setCarLicense(e.target.value)}
            style={{ fontSize: styles.fontSize }}
            required
          />
        </Form.Group>
        <Button variant="primary" style={{ fontSize: styles.fontSize }} onClick={handleAddCar}>
          등록
        </Button>
      </Form>
    </Container>
  );
};

export default CarRegistration;
