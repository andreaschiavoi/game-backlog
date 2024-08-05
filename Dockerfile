# Usa un'immagine base di Maven per costruire l'applicazione
FROM maven:3.8.5-openjdk-17 AS build

# Imposta la directory di lavoro
WORKDIR /app

# Copia il file pom.xml e scarica le dipendenze
COPY pom.xml ./
RUN mvn dependency:go-offline

# Copia il codice sorgente e costruisci l'applicazione
COPY src ./src
RUN mvn clean package -DskipTests

# Usa un'immagine base di OpenJDK per eseguire l'applicazione
FROM openjdk:17-jdk-slim

# Imposta la directory di lavoro
WORKDIR /app

# Copia il file JAR costruito dall'immagine di build
COPY --from=build /app/target/*.jar app.jar

# Espone la porta 8080
EXPOSE 8080

# Comando di avvio
CMD ["java", "-jar", "app.jar"]
