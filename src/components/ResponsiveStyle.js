import { useMediaQuery } from 'react-responsive';

const ResponsiveStyle = () => {
  // 화면 크기에 따라 주차 공간의 너비와 높이를 결정하는 변수를 선언
  const isSmallScreen = useMediaQuery({ maxWidth: 768 }); // 화면 너비가 768px 이하인 경우
  const isMediumScreen = useMediaQuery({ minWidth: 769, maxWidth: 1024 }); // 화면 너비가 769px 이상 1024px 이하인 경우
  const isLargeScreen = useMediaQuery({ minWidth: 1025 }); // 화면 너비가 1025px 이상인 경우

  let spotWidth, spotHeight, fontSize, titleFontSize, padding, margin, motionPos, gridGap;
  
  if (isSmallScreen) {
    spotWidth = 80; 
    spotHeight = 60; 
    fontSize = 'x-small';
    titleFontSize = '25px';
    padding = '5px';
    margin = '20px';
    motionPos = 20;
    gridGap = '20px';
  } else if (isMediumScreen) {
    spotWidth = 100; 
    spotHeight = 80; 
    fontSize = 'small';
    titleFontSize = '35px';
    padding = '7px';
    margin = '40px';
    motionPos = 25;
    gridGap = '40px';
  } else if (isLargeScreen) {
    spotWidth = 120; 
    spotHeight = 100; 
    fontSize = 'medium';
    titleFontSize = '50px';
    padding = '9px';
    margin = '80px';
    motionPos = 30;
    gridGap = '80px';
  }

  return {
    spotWidth,
    spotHeight,
    fontSize,
    titleFontSize,
    padding,
    margin,
    motionPos,
    gridGap,
  };
};

export default ResponsiveStyle;
