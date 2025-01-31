import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { SolutionsModule } from './solutions/solutions.module';
import { ThematicsModule } from './thematics/thematics.module';
import { PrismaModule } from './database/prisma.module';
import { CallsModule } from './calls/calls.module';
import { ChallengesModule } from './challenges/challenges.module';
import { StatusModule } from './status/status.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/guards/auth.guard';
import { MailerModule } from '@nestjs-modules/mailer';
import { QuotationsModule } from './quotations/quotations.module';
import { FeedbacksModule } from './feedbacks/feedbacks.module';
import { PolesModule } from './poles/poles.module';
import { OrganisationsModule } from './organisations/organisations.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { RolesGuard } from './auth/guards/roles.guard';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transport: {
          host: config.get('MAIL_HOST'),
          secure: true,
          secureConnection: false,
          requireTLS: true,
          port: 465,
          tls: {
            ciphers: 'SSLv3',
          },
          auth: {
            user: 'support@fikiri.co',
            pass: 'wilfried20022606',
          },
          logger: true,
          debug: true, // include SMTP traffic in the logs
        },
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    RolesModule,
    SolutionsModule,
    ThematicsModule,
    PrismaModule,
    CallsModule,
    ChallengesModule,
    StatusModule,
    QuotationsModule,
    FeedbacksModule,
    PolesModule,
    OrganisationsModule,
    DashboardModule,
    EmailModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
