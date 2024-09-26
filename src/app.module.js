import { Module } from '@nestjs/common';
import { AuthController } from './app/controllers/authController'; // Import your auth controller
import { TicketsController } from './app/controllers/tickets.controller'; // Import your tickets controller
import { AuthService } from './app/services/auth.service'; // Import your auth service (if available)
import { TicketsService } from './app/services/tickets.service'; // Import your tickets service (if available)

@Module({
  imports: [], // Add any modules you need here
  controllers: [AuthController, TicketsController], // Register your controllers here
  providers: [AuthService, TicketsService], // Register services (providers) here
})
export class AppModule {}
