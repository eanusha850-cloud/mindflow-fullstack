# Use OpenJDK 17 as base image
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy specific files from mindflow-backend directory
COPY mindflow-backend/mvnw .
COPY mindflow-backend/.mvn .mvn
COPY mindflow-backend/pom.xml .
COPY mindflow-backend/src ./src

# Make Maven wrapper executable and verify it exists
RUN ls -la && chmod +x ./mvnw && ls -la mvnw

# Download dependencies
RUN ./mvnw dependency:go-offline -B

# Build the application
RUN ./mvnw clean package -DskipTests

# Expose port (Render will set PORT environment variable)
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "-Dserver.port=${PORT:-8080}", "target/mindflow-backend-0.0.1-SNAPSHOT.jar"] 