#include <Wire.h>
#include <Firebase_Arduino_WiFiNINA.h>
#include <NewPing.h>

// Firebase 설정
#define FIREBASE_HOST "parkingslot-b0c6a-default-rtdb.asia-southeast1.firebasedatabase.app"
#define FIREBASE_AUTH "RDTVLTqA5o1kZPR6bmku1SscztF4hr9jDsIGjwYb"

// WiFi 설정
#define SSID "iptime0"
#define SSID_PASSWORD "dndud516"

// 주차장 및 주차 공간 식별자 설정
#define PARKING_LOT_ID "1"

// Firebase 키 설정
#define PARKING_SPOT_STATE_KEY "parking_spot_state"
#define PARKING_LOT_KEY "parking_lot"
#define OCCUPIED "OCCUPIED"
#define FREE "FREE"
#define A1 "A1"
#define A2 "A2"

// 핀 번호 설정
#define A1_TRIG_PIN 2
#define A1_ECHO_PIN 3
#define A2_TRIG_PIN 4
#define A2_ECHO_PIN 5

NewPing a1Sensor(A1_TRIG_PIN, A1_ECHO_PIN);
NewPing a2Sensor(A2_TRIG_PIN, A2_ECHO_PIN);

// 센서 구조체 정의
struct Sensor {
  const int trigPin;
  const int echoPin;
  bool state;
};

// A1, A2 센서 설정
Sensor a1SensorStruct = { A1_TRIG_PIN, A1_ECHO_PIN, false };
Sensor a2SensorStruct = { A2_TRIG_PIN, A2_ECHO_PIN, false };

FirebaseData firebaseData;

// 시간 변수 추가
unsigned long last = 0;

// 초기 설정 함수
void setup() {
  Serial.begin(9600);  // 보정된 통신 속도

  // WiFi 연결
  WiFi.begin(SSID, SSID_PASSWORD);
  Serial.print("Wi-Fi connecting");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }
  Serial.print("\nWi-Fi connected - IP address: ");
  Serial.println(WiFi.localIP());
  delay(500);

  // Firebase 초기화
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH, SSID, SSID_PASSWORD);  // 수정된 부분
  
}

// 주차장 이벤트 Firebase 업데이트 함수
void publish_parking_lot_event(char* event) {
  String path = String(PARKING_LOT_KEY) + "/" + String(PARKING_LOT_ID);
  Firebase.setBool(firebaseData, path.c_str(), true);
  path += "/" + String(event);
  Firebase.setBool(firebaseData, path.c_str(), true);
}

// 주차 공간 상태 Firebase 업데이트 함수
void publish_parking_spot_state(char* parking_spot_name, char* state) {
  String path = String(PARKING_SPOT_STATE_KEY) + "/" + String(PARKING_LOT_ID) + "/" + String(parking_spot_name);
  Firebase.setString(firebaseData, path.c_str(), state);
}

// 루프 함수
void loop() {

  // 일정 주기로 센서 상태 업데이트
  if (millis() > last + 3000) {
    last = millis();

    int distanceA1 = a1Sensor.ping_cm();  // 거리 측정
    int distanceA2 = a2Sensor.ping_cm();

    // A1 주차 공간 상태 업데이트
    if (distanceA1 < 10 && !a1SensorStruct.state) {
      a1SensorStruct.state = true;
      publish_parking_spot_state(A1, OCCUPIED);
    }
    if (distanceA1 >= 10 && a1SensorStruct.state) {
      a1SensorStruct.state = false;
      publish_parking_spot_state(A1, FREE);
    }

    Serial.print("Firebase Path: ");
    Serial.println("parking_spot_state/1/A1");

    Serial.print("Setting state for A1 to ");
    Serial.println(a1SensorStruct.state ? "OCCUPIED" : "FREE");

    Serial.print("Distance: ");
    Serial.println(distanceA1);

    // A2 주차 공간 상태 업데이트
    if (distanceA2 < 10 && !a2SensorStruct.state) {
      a2SensorStruct.state = true;
      publish_parking_spot_state(A2, OCCUPIED);  // 수정된 부분
    }
    if (distanceA2 >= 10 && a2SensorStruct.state) {
      a2SensorStruct.state = false;
      publish_parking_spot_state(A2, FREE);  // 수정된 부분
    }


    Serial.print("Firebase Path: ");
    Serial.println("parking_spot_state/1/A2");

    Serial.print("Setting state for A2 to ");
    Serial.println(a2SensorStruct.state ? "OCCUPIED" : "FREE");

    Serial.print("Distance: ");
    Serial.println(distanceA2);
  }
}
