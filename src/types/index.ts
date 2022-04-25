import {ReactNode} from 'react';
import {ImageRequireSource} from 'react-native';

export type BasicInfo = ProductmetaData &{
  id: number;
  name: string; 
};

export type ProductmetaData = {

    stock?:number,
    avilabilityMessage?:string;
}

export interface NodeComponentProps {
  node: TreeNode;
  onToggleNodeView: Function;
  toggleNodeSelection: Function;
  selecteddNodes: Array<string>;
}

export type TreeNode = BasicInfo & ProductCategoryItem &{
  children?: TreeNode[];
  selected?: boolean;
  expanded?: boolean;
  parentNode?: TreeNode;
 
};
export type FilterProps = {
  categoryList: ProductCategoryItem[];
  productList:Product[]
  nodeView:React.ElementType<NodeComponentProps>,
  onSelection:Function
};

export type ProductCategoryItem = BasicInfo & {
  image?: ImageRequireSource;
  avilableBrands?: ProductBrand[];
  availableVarients?: ProductVarient[];
  availbaleModels?: ProductModel[];
  children?: ProductBrand[];
  type?: string;
  avilableChildCountText?: string;
  category?: number; 
  model?:number;
  brand?:number;
};
export type ProductBrand = BasicInfo & {
  type?: string;
  category?: number;
  brand?: number;
  children?: ProductModel[];
};
export type ProductModel = BasicInfo & {
  type?: string;
  category?: number;
  brand?: number;
  children?: ProductVarient[];
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
  stock: number;
};
