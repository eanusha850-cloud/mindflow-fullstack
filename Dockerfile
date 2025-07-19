# Use OpenJDK 17 as base image
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy Maven wrapper and configuration files
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Copy backend source code
COPY backend-src ./src

# Make Maven wrapper executable and verify it exists
RUN ls -la && chmod +x ./mvnw && ls -la mvnw

# Download dependencies
RUN ./mvnw dependency:go-offline -B

# Build the application
RUN ./mvnw clean package -DskipTests

# Expose port (Render will set PORT environment variable)
EXPOSE 8080

# Run the application - Updated for fresh deployment
CMD ["java", "-jar", "-Dserver.port=${PORT:-8080}", "target/mindflow-backend-0.0.1-SNAPSHOT.jar"]
