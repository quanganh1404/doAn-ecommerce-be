import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({
    summary: `Get all product by category id`,
  })
  @Get('category/:categoryId')
  async getProductByCategoryId(@Param('categoryId') categoryId: string) {
    return this.productsService.findProductByCategoryId(categoryId);
  }

  @ApiOperation({
    summary: `Re fill all products`,
  })
  @Get('refill')
  async refillProduct() {
    return await this.productsService.refillProduct();
  }

  @ApiOperation({
    summary: `Create a product`,
  })
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @ApiOperation({
    summary: `Get all products`,
  })
  @Get()
  async findAll() {
    return this.productsService.findAll();
  }

  @ApiOperation({
    summary: `Find product by id`,
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @ApiOperation({
    summary: `Update product by id`,
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @ApiOperation({
    summary: `Find product by slug`,
  })
  @Get('slug/:slug')
  async findBySlug(@Param('slug') slug: string) {
    return this.productsService.findBySlug(slug);
  }

  @ApiOperation({
    summary: `Delete product by id`,
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }

  @ApiOperation({
    summary: `Find product by name`,
  })
  @Get('search/:search')
  async searchByName(@Param('search') productName: string) {
    return this.productsService.searchByName(productName);
  }

  @ApiOperation({
    summary: `Product sort order by Ascending (-1) Descending (1)`,
  })
  @Get('sort/:sort/:orderBy')
  async sortByPrice(
    @Param('sort') sort: string,
    @Param('orderBy') orderBy: number,
  ) {
    return this.productsService.sortBy(sort, orderBy);
  }
}
