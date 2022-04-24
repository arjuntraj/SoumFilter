import {ReactNode} from 'react';
import {ImageRequireSource} from 'react-native';

type BasicInfo = {
  id: number;
  name: string;
};

export interface NodeComponentProps {
node:TreeNode,
onToggleNodeView:Function,
toggleNodeSelection:Function,
}


export type TreeNode = BasicInfo & {

    children?:TreeNode[],
    selected?:boolean,
    expanded?:boolean,
    parentNode?:TreeNode
}
export type FilterProps = {

    data:TreeNode[]

}

export type ProductCategoryItem =BasicInfo &  { 
  image ?: ImageRequireSource;
  avilableBrands?: ProductBrand[];
  availableVarients?: ProductVarient[];
  availbaleModels?: ProductModel[];
  children?: CommonProductInfoObject[];
  type?: string;
  avilableChildCountText?: string;
  category?: number;
};
export type ProductBrand = BasicInfo & { 
   type?: string;
  category?: number;
  brand?: number;
};
export type ProductModel = BasicInfo & {
   type?: string;
  category?: number;
  brand?: number;
};
export type ProductVarient = BasicInfo & {
   category?: number;
  model?: number;
  brand?: number;
  type?: string;
};
export type Product = BasicInfo & {
  brand: ProductBrand;
  model: ProductModel;
  varient: ProductVarient;
  image: ImageRequireSource;
  category: ProductCategoryItem;
};
