# Use a Java 17 base image
FROM eclipse-temurin:17-jdk-alpine

# Set working directory
WORKDIR /app

# Copy the Maven wrapper and project files
COPY . .

# Build the project
RUN ./mvnw clean install

# Expose port (Render assigns $PORT, this is for local dev)
EXPOSE 8080

# Run the application using the .jar file
CMD ["java", "-jar", "target/music_backend-0.0.1-SNAPSHOT.jar"]
