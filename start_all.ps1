Write-Host "Starting Discovery Service..."
Start-Process "cmd.exe" -ArgumentList "/c title Discovery Service && cd backend\discovery-service && mvn spring-boot:run"
Start-Sleep -Seconds 15

Write-Host "Starting API Gateway..."
Start-Process "cmd.exe" -ArgumentList "/c title API Gateway && cd backend\api-gateway && mvn spring-boot:run"

Write-Host "Starting Microservices..."
Start-Process "cmd.exe" -ArgumentList "/c title Auth Service && cd backend\auth-service && mvn spring-boot:run"
Start-Process "cmd.exe" -ArgumentList "/c title Product Service && cd backend\product-service && mvn spring-boot:run"
Start-Process "cmd.exe" -ArgumentList "/c title Order Service && cd backend\order-service && mvn spring-boot:run"

Write-Host "Starting Angular Frontend..."
Start-Process "cmd.exe" -ArgumentList "/c title Angular Frontend && cd frontend && npm start"

Write-Host "All services have been launched in separate windows!"
