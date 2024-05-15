import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // react-router를 사용하는 경우

const HomePage = () => {
  const navigate = useNavigate(); // 네비게이션을 위한 훅

  return (
    <Container className="d-flex flex-column align-items-center mt-5">
      <Button
        className="my-2"
        variant="primary"
        size="lg"
        onClick={() => navigate('/parkingspot')}
      >
        주차 구역 관리
      </Button>
      <Button
        className="my-2"
        variant="primary"
        size="lg"
        onClick={() => navigate('/carregistration')}
      >
        차량 등록
      </Button>
    </Container>
  );
};

export default HomePage;
