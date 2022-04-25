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
    stock:1000
  },
  {
    id: 3,
    name: 'LG',
    brand: productBrand[3],
    varient: productVarient[1],
    model: productModel[12],
    image: require('../assets/img/product/iphone13.png'),
    category: productCategory[1],
    stock:1100
  },
  {
    id: 4,
    name: 'Galaxy Watch',
    brand: productBrand[2],
    varient: productVarient[6],
    model: productModel[8],
    image: require('../assets/img/product/watch3.png'),
    category: productCategory[2],
    stock:2100
  },
  {
    id: 5,
    name: 'ThinkBook',
    brand: productBrand[4],
    varient: productVarient[1],
    model: productModel[7],
    image: require('../assets/img/product/thinkbook.png'),
    category: productCategory[3],
    stock:1000
  },
  
  {
    id: 6,
    name: 'ThinkBook',
    brand: productBrand[4],
    varient: productVarient[2],
    model: productModel[7],
    image: require('../assets/img/product/thinkbook.png'),
    category: productCategory[3],
    stock:900
  },
  {
    id: 7,
    name: 'KD85X9000H',
    brand: productBrand[5],
    varient: productVarient[8],
    model: productModel[9],
    image: require('../assets/img/product/sonyTv.png'),
    category: productCategory[5],
    stock:10000
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
    name: 'MacBook',
    brand: productBrand[0],
    varient: productVarient[10],
    model: productModel[5],
    image: require('../assets/img/product/m1pro.png'),
    category: productCategory[3],
    stock:3000
  },
   
  {
    id: 12,
    name: 'MacBook',
    brand: productBrand[0],
    varient: productVarient[0],
    model: productModel[11],
    image: require('../assets/img/product/m1pro.png'),
    category: productCategory[3],
    stock:1000
  },
  {
    id: 13,
    name: 'ThinkBook',
    brand: productBrand[4],
    varient: productVarient[0],
    model: productModel[14],
    image: require('../assets/img/product/thinkbook.png'),
    category: productCategory[3],
    stock:6000
  },
  {
    id: 14,
    name: 'ThinkBook',
    brand: productBrand[4],
    varient: productVarient[0],
    model: productModel[7],
    image: require('../assets/img/product/thinkbook.png'),
    category: productCategory[3],
    stock:90
  },
   
  {
    id: 14,
    name: 'MacBook',
    brand: productBrand[0],
    varient: productVarient[2],
    model: productModel[11],
    image: require('../assets/img/product/m1pro.png'),
    category: productCategory[3],
    stock:1000
  },
  {
    id: 15,
    name: 'iPad Pro',
    brand: productBrand[0],
    varient: productVarient[0],
    model: productModel[10],
    image: require('../assets/img/product/ipadpro.png'),
    category: productCategory[6],
    stock:1820
  },
  {
    id: 16,
    name: 'iPad Pro',
    brand: productBrand[2],
    varient: productVarient[0],
    model: productModel[10],
    image: require('../assets/img/product/ipadpro.png'),
    category: productCategory[6],
    stock:1820
  },
];
