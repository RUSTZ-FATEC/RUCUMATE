#include <DHT.h>

DHT dht(26, DHT11);

void setup() {
  pinMode(D4, OUTPUT);
  dht.begin();
  delay(2000);

  Serial.begin(115200);
}

void loop() {
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();

  Serial.print("Temperature: ");
  Serial.print(temperature);
  Serial.print("C :");
  Serial.print(humidity);
  delay(2000);
}
