#include <DHT.h>

#define DHTPIN 2          // D4
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(115200);
  dht.begin();
}

void loop() {
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();

  Serial.print("Umidade: ");
  Serial.print(humidity);
  Serial.print("% - ");
  Serial.print("Temperatura: ");
  Serial.print(temperature);
  Serial.println("°C");

  delay(2000);
}
