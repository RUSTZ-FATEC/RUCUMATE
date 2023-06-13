#include <DHT.h>

#define DHTPIN 2          // Define o pino ao qual o sensor DHT11 está conectado (Pino D4)
#define DHTTYPE DHT11     // Define o tipo de sensor DHT11
DHT dht(DHTPIN, DHTTYPE); // Cria um objeto DHT

void setup() {
  Serial.begin(115200);   // Inicializa a comunicação serial com a velocidade de 9600 baud
  dht.begin();            // Inicializa o sensor DHT11
}

void loop() {
  float h = dht.readHumidity();      // Lê a umidade relativa do ar em porcentagem
  float t = dht.readTemperature();  // Lê a temperatura em graus Celsius

  Serial.print("Umidade: ");
  Serial.print(h);
  Serial.print("% - ");
  Serial.print("Temperatura: ");
  Serial.print(t);
  Serial.println("°C");
  
  delay(2000);  // Espera 2 segundos antes de fazer a próxima leitura
}
