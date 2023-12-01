## 실행방법(PowerShell)
1. npm install
2. npm run start

## 앱 구조
project-root/
|-- assets/
|-- nuo_rev2/
|   |-- main/
|       |-- main.ino
|-- src/
|   |-- assets/
|       |-- mercedes.svg
|       |-- react.svg
|   |-- components/
|       |-- ParkingSpot.js
|   |-- App.js
|   |-- index.js
|   |-- firebase.js
|-- package.json

## 앱 구조 설명
- **src/assets/:** 리액트 앱에서 사용될 정적 파일들을 저장하는 디렉토리입니다. 예를 들어, SVG 이미지 파일들이 여기에 위치할 수 있습니다.
- **src/components/:** 리액트 컴포넌트들을 저장하는 디렉토리입니다. 예를 들어, **`ParkingSpot.js`** 같은 파일이 여기에 위치할 수 있습니다.
- **src/App.js:** 메인 앱 컴포넌트입니다. 다른 컴포넌트들을 이곳에서 조합하고, 라우팅을 설정하고, 상태를 관리할 수 있습니다.
- **src/index.js:** 앱을 렌더링하는 엔트리 포인트입니다. 주로 **`ReactDOM.render`** 함수가 이 파일에서 호출됩니다.
- **src/firebase.js:** Firebase와 관련된 설정 및 함수들을 포함할 수 있는 파일입니다.
- **package.json:** 프로젝트의 의존성 및 스크립트 등을 관리하는 파일입니다.
