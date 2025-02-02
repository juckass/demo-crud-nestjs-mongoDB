import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsSchema, Items } from './schemas/items.schema';


@Module({
  imports: [
    MongooseModule.forFeature([{ 
      name: Items.name, 
      schema: ItemsSchema 
    }]),
  ],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
