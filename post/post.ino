#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

// Wi-Fi Credentials
const char* ssid = "--";
const char* password = "--";

int port_number = 443; // Definindo o tipo de dado e valor para port_number
BearSSL::WiFiClientSecure client;
client.setInsecure();
HTTPClient https;

void setup() {
  Serial.begin(115200);
  delay(1000);
  setup_wifi();
}

void loop() {
  // Check WiFi connection status
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\n\nPerforming HTTP POST Request\n");

    // HTTP Details
    String serverUrl = "http://jiyepakistanlearning.herokuapp.com/api/v1/test";
    https.begin(client, serverUrl);
    //    https.setAuthorization("Basic token");
    //    https.setAuthorization("Bearer token");

    String body = "{\"name\":\"POST JP Learning\"}";
    Serial.println("POST body: " + body);

    // Send HTTP POST request
    int httpResponseCode = https.POST(body);
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);

    if (httpResponseCode == HTTP_CODE_CREATED) {
      String payload = https.getString();
      Serial.println("Response payload: " + payload);

      DynamicJsonDocument doc(1024);
      deserializeJson(doc, payload);
      JsonObject obj = doc.as<JsonObject>();

      String response = obj[String("response")];
      Serial.println("\nresponse is : " + response);
    } else {
      Serial.print("Error code: ");
      Serial.println(httpResponseCode);
    }
    // Free resources
    https.end();
  } else {
    Serial.println("WiFi Disconnected");
  }
  delay(10000);
}

void setup_wifi() {
  delay(10);
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}
