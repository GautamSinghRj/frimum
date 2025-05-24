# music-backend/Dockerfile
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

# Copy Maven wrapper and project
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Copy source code
COPY src src

# Build the app (skip tests to speed up)
RUN chmod +x mvnw && ./mvnw clean package -DskipTests

# Expose default Spring Boot port
EXPOSE 8080

# Launch the JAR (match your pom artifactId/version)
CMD ["java", "-jar", "target/music-backend-0.0.1-SNAPSHOT.jar"]
