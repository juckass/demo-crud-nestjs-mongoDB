import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Items, ItemsDocument } from './schemas/items.schema';
import { Model } from 'mongoose';
@Injectable()
export class ItemsService {
  constructor(@InjectModel(Items.name) private itemsModel: Model<ItemsDocument>) {}

  async create(createItemDto: CreateItemDto) {
    const createdItem = new this.itemsModel(createItemDto);
   
    return  await createdItem.save();
  }

  async findAll() {
    const items =  await this.itemsModel.find({});
    return items;
  }

  async findOne(id: string) {
    const item = await this.itemsModel.findById(id);
    return  item ? item : 'Item not found'; 
  }

  async update(id: string, updateItemDto: UpdateItemDto) {
    const updatedItem = await this.itemsModel.findByIdAndUpdate(
      id, 
      updateItemDto,
      {new: true}
    )

    return updatedItem ? updatedItem : 'Item not found';
  }

  async remove(id: string) {
    const deletedItem = await this.itemsModel.findByIdAndDelete(id);

    // Manejar el caso en que el elemento no exista
    if (!deletedItem) {
      throw new Error(`Item with ID ${id} not found`);
    }

  return { message: `Item with ID ${id} deleted successfully`, deletedItem };
  }
}
