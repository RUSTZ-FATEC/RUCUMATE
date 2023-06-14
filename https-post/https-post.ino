#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h> 
#include <ESP8266WebServer.h>
#include <ESP8266HTTPClient.h>

const char *ssid = "--";
const char *password = "--";

const char *host = "rucumate.herokuapp.com";
const int httpsPort = 443;

const char fingerprint[] PROGMEM = "4C 55 4D FA EF B6 8F 4B A4 20 50 54 EA 57 18 36 89 66 F0 08";

void setup() {
  delay(1000);
  Serial.begin(115200);
  WiFi.mode(WIFI_OFF);
  delay(1000);
  WiFi.mode(WIFI_STA);
  
  WiFi.begin(ssid, password);
  Serial.println("");
  
  Serial.print("Connecting");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  WiFiClientSecure httpsClient;
  
  Serial.println(host);
  
  Serial.printf("Using fingerprint '%s'\n", fingerprint);
  httpsClient.setFingerprint(fingerprint);
  httpsClient.setTimeout(15000);
  delay(1000);
  
  Serial.print("HTTPS Connecting");
  int r = 0;
  while ((!httpsClient.connect(host, httpsPort)) && (r < 30)) {
    delay(100);
    Serial.print(".");
    r++;
  }
  
  if (r == 30) {
    Serial.println("Connection failed");
  } else {
    Serial.println("Connected to web");
  }
  
  String jsonData = "{\"sensor_id\": 5, \"sensor_date\": \"05-11-2023\", \"temperature\": 21.49, \"humidity\": 76.9, \"user_id\": 1}";
  
  String Link = "/esp/sensor";
  String httpRequest = String("POST ") + Link + " HTTP/1.1\r\n" +
                       String("Host: ") + host + "\r\n" +
                       "Content-Type: application/json" + "\r\n" +
                       "Content-Length: " + String(jsonData.length()) + "\r\n" +
                       "Connection: close\r\n\r\n" +
                       jsonData + "\r\n";
  
  Serial.println("requesting URL: " + String(host) + Link);
  
  httpsClient.print(httpRequest);
  
  Serial.println("request sent");
  
  while (httpsClient.connected()) {
    String line = httpsClient.readStringUntil('\n');
    if (line == "\r") {
      Serial.println("headers received");
      break;
    }
  }
  
  Serial.println("reply was:");
  Serial.println("==========");
  String line;
  while (httpsClient.available()) {
    line = httpsClient.readStringUntil('\n');
    Serial.println(line);
  }
  Serial.println("==========");
  Serial.println("closing connection");
  
  delay(10000);
}
