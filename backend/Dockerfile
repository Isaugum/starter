FROM eclipse-temurin:17-jdk-focal

RUN apt-get update && apt-get install -y maven && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN mvn clean package -DskipTests

EXPOSE 8080

ENTRYPOINT ["java","-jar","target/backend-0.0.1-SNAPSHOT.jar"]