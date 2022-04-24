import {Product} from '../types';
import {
  productBrand,
  productVarient,
  productModel,
  productCategory,
} from '../mock';

export const productList: Product[] = [
  {
    id: 1,
    name: 'IPhone',
    brand: productBrand[0],
    varient: productVarient[0],
    model: productModel[0],
    image: require('../assets/img/product/iphone13.png'),
    category: productCategory[1],
    stock:10
  },
  {
    id: 2,
    name: 'Watch',
    brand: productBrand[0],
    varient: productVarient[7],
    model: productModel[4],
    image: require('../assets/img/product/awatch.png'),
    category: productCategory[2],
    stock:100
  },
  {
    id: 3,
    name: 'LG',
    brand: productBrand[3],
    varient: productVarient[1],
    model: productModel[12],
    image: require('../assets/img/product/iphone13.png'),
    category: productCategory[1],
    stock:110
  },
  {
    id: 4,
    name: 'Galaxy Watch',
    brand: productBrand[2],
    varient: productVarient[6],
    model: productModel[8],
    image: require('../assets/img/product/watch3.png'),
    category: productCategory[2],
    stock:210
  },
  {
    id: 5,
    name: 'ThinkBook',
    brand: productBrand[4],
    varient: productVarient[1],
    model: productModel[7],
    image: require('../assets/img/product/thinkbook.png'),
    category: productCategory[3],
    stock:1096
  },
  {
    id: 6,
    name: 'Macbook',
    brand: productBrand[0],
    varient: productVarient[1],
    model: productModel[5],
    image: require('../assets/img/product/m1pro.png'),
    category: productCategory[3],
    stock:310
  },
  {
    id: 7,
    name: 'KD85X9000H',
    brand: productBrand[5],
    varient: productVarient[8],
    model: productModel[9],
    image: require('../assets/img/product/sonyTv.png'),
    category: productCategory[5],
    stock:10068
  },
  {
    id: 8,
    name: 'iPad Pro',
    brand: productBrand[0],
    varient: productVarient[1],
    model: productModel[10],
    image: require('../assets/img/product/ipadpro.png'),
    category: productCategory[6],
    stock:1820
  },
  {
    id: 9,
    name: 'AirPod',
    brand: productBrand[0],
    varient: productVarient[9],
    model: productModel[11],
    image: require('../assets/img/product/airpod.png'),
    category: productCategory[4],
    stock:9810
  },
  {
    id: 10,
    name: 'Galaxy',
    brand: productBrand[2],
    varient: productVarient[2],
    model: productModel[1],
    image: require('../assets/img/product/iphone13.png'),
    category: productCategory[1],
    stock:710
  },
  {
    id: 11,
    name: 'Macbook',
    brand: productBrand[0],
    varient: productVarient[0],
    model: productModel[5],
    image: require('../assets/img/product/m1pro.png'),
    category: productCategory[3],
    stock:8810
  },
  {
    id: 14,
    name: 'Macbook M1',
    brand: productBrand[0],
    varient: productVarient[0],
    model: productModel[13],
    image: require('../assets/img/product/m1pro.png'),
    category: productCategory[3],
    stock:5410
  },
  {
    id: 12,
    name: 'Macbook',
    brand: productBrand[0],
    varient: productVarient[1],
    model: productModel[11],
    image: require('../assets/img/product/m1pro.png'),
    category: productCategory[3],
    stock:410
  },
  {
    id: 13,
    name: 'Macbook',
    brand: productBrand[0],
    varient: productVarient[1],
    model: productModel[5],
    image: require('../assets/img/product/m1pro.png'),
    category: productCategory[3],
    stock:1080
  },
];