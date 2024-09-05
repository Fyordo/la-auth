import {Module} from '@nestjs/common';
import {UsersModule} from './users/users.module';
import {AuthModule} from './auth/auth.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env.local',
        }),
        UsersModule,
        AuthModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
