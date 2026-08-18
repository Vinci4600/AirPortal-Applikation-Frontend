# AirPortal

## Beschreibung
AirPortal ist eine Webanwendung zur Verwaltung und Organisation von Flugzeugen, Flügen und Flughäfen. Die Anwendung ermöglicht das Erstellen, Bearbeiten und Löschen von Flugzeugen sowie das Anlegen und Zuordnen von Flügen.
Die Kommunikation zwischen Frontend und Backend erfolgt über eine REST-API, über die die Daten verarbeitet und gespeichert werden. Das Frontend stellt die vorhandenen Daten übersichtlich dar und ermöglicht die Interaktion mit der Anwendung.

AirPortal entstand als modulübergreifendes Projekt der Module 295, 294 und 223.

## Voraussetzungen 
- Sowohl Frontend wie Backend Datei herunterladen
- Eigenes .env File generieren
- Docker Desktop auf Windows
## Ausführung Airportal
### 1. Projekt Herunterladen
Das Repository klonen oder die ZIP-Datei herunterladen.
<img width="1136" height="558" alt="image" src="https://github.com/user-attachments/assets/cee12ccf-f20a-4f8e-a2f4-250675612a5f" />

### 2. ZIP-Datei extrahieren oder Klonen
Falls das Projekt als ZIP-Datei heruntergeladen wurde, beide Projektordner extrahieren.
<img width="836" height="200" alt="image" src="https://github.com/user-attachments/assets/e52d6fe7-02ca-4353-b6cd-665d4243fb41" />
#### Klonen 
<img width="819" height="33" alt="image" src="https://github.com/user-attachments/assets/e456d4c0-91c8-47a8-aea5-b058c0c86a8f" />

### 3. Backend öffnen
Das Backend in einer geeigneten Java-IDE öffnen.
<img width="1907" height="730" alt="image" src="https://github.com/user-attachments/assets/a62e6072-af5f-4119-9466-a0581da6de60" />

### 4. MySQL-Datenbank starten
Im Terminal in den Ordner mySQLdb wechseln:
<img width="1115" height="282" alt="image" src="https://github.com/user-attachments/assets/a3034727-f7ca-409f-85dc-3676d82ad669" />

cd .\mySQLdb\

Anschließend die Docker-Container starten:
<img width="957" height="76" alt="image" src="https://github.com/user-attachments/assets/8f74d4b3-4aed-4fc9-b728-afbf4959a9bd" />

docker compose up -d
### 5. Backend starten
Die Main-Klasse des Spring-Boot-Projekts starten mit:
#### mvn spring-boot:run
<img width="1137" height="827" alt="image" src="https://github.com/user-attachments/assets/68c1e1e0-f4e0-44ca-9eb4-2ad7f45abad2" />

### 6. Frontend starten
Das Frontend öffnen und im Terminal den Entwicklungsserver starten:

npm run dev

<img width="904" height="260" alt="image" src="https://github.com/user-attachments/assets/be00b7c0-9afe-4dd5-90d3-583492dba384" />


Anschließend kann der AirPortal über die im Terminal angezeigte Adresse im Browser aufgerufen werden.

## Bilder


<img width="1883" height="1032" alt="image" src="https://github.com/user-attachments/assets/a9d0a0d3-2231-465c-a75f-1c501e625014" />
