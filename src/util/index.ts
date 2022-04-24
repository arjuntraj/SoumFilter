import {
  BasicInfo,
  Product,
  ProductBrand,
  ProductCategoryItem,
  ProductModel,
  TreeNode,
} from '../types';

export const getUniqObjectsByID = <T extends BasicInfo>(list: T[]): T[] => {
  const filterrerdList = [
    ...new Map(list.map((item: T) => [item.id, item])).values(),
  ];
  return filterrerdList;
};

export const getDeviceAvilabilityMessage = (
  source: Array<any>,
  productyList: Array<any>,
  parentEle: any,
  childNodeKey: string,
  appendParentLabel?: boolean,
) => {
  // get child node count
  const devcieCountforCalculation: Array<number> = [];
  let message = '';
  source.map((node: any, pos) => {
    let prefix = pos == 0 ? '' : ', ';
    let suffix = appendParentLabel ? parentEle.name : 'devices';
    let infoText = appendParentLabel ? node.name : '';

    const childNodeList = productyList.filter(
      (pro: any | any) => pro[childNodeKey]?.id === node.id,
    );

    devcieCountforCalculation.push(childNodeList.length);
    message += prefix + childNodeList.length + ' ' + infoText + ' ' + suffix;
  });
  let totalCount = devcieCountforCalculation.reduce(
    (partialSum, a) => partialSum + a,
    0,
  );
  if (!appendParentLabel) {
    let suffix = totalCount > 1 ? 's' : '';
    message = totalCount + ' Device' + suffix;
  }

  if (source.length > 2) {
    message =
      devcieCountforCalculation[0] +
      ' ' +
      source[0].name +
      ' ' +
      parentEle.name;

    totalCount = totalCount - devcieCountforCalculation[0];
    message += 'and ' + totalCount + ' other ' + childNodeKey + "'s";
  }

  return message;
};
export const getFIlterDataFromProductMetadata = (
  productCategoryData: ProductCategoryItem[],
  productList: Product[],
): ProductCategoryItem[] => {
  //Removing 'All' category
  //Specific to my mock data
  const filtererdProductCategoryData = productCategoryData.filter(
    a => a.name.trim() != 'All',
  );

  // find products for each category
  const categoryWithMetadata = filtererdProductCategoryData.map(
    (currentCategory: ProductCategoryItem) => {
      //get products for current category
      const productsForCurrentCategory: Product[] = productList.filter(
        (product: Product) => product.category?.id === currentCategory.id,
      );

      // get avilable brands for the current category , from the 'productsForCurrentCategory'
      const brandsForCurrentCategory = productsForCurrentCategory.map(
        (p: Product) => p.brand,
      );

      // setting uniq avilable brands
      const avilableUniqBrandsForCategory: ProductBrand[] = getUniqObjectsByID(
        brandsForCurrentCategory,
      );

      //First child node for category is 'Brands'
      currentCategory.children = avilableUniqBrandsForCategory || [];
      currentCategory.type = 'category';

      //Get avilable Models for the current  brand under the current catogory

      currentCategory.children.map(function (brand: ProductBrand) {
        const modelsForCurrentBrand = productsForCurrentCategory.filter(
          product => product?.brand?.id == brand.id,
        );

        const uniqModelsForCurrentBrand: ProductModel[] = getUniqObjectsByID(
          modelsForCurrentBrand.map(b => b.model),
        );

        //Models for each brand
        brand.children = uniqModelsForCurrentBrand;
        brand.type = 'brand';
        brand.category = currentCategory.id;
        //TODO CALCULATE AVILABILITY
        // brand.avilableChildCountText = getDeviceAvilabilityMessage(
        //   uniqModelsForCurrentBrand,
        //   filtererdProductCategoryData,
        //   currentCategory,
        //   'model',
        //   true,
        // );

        //getiing varients for eeah model
        brand.children.forEach(function (model: ProductModel) {
         
          const uniqVarientForCurrentBrand = getUniqObjectsByID(
            modelsForCurrentBrand.map(b => b.varient),
          );

          model.children = uniqVarientForCurrentBrand;
          model.type = 'model';
          model.category = currentCategory.id;
          model.brand = brand.id;

          //setting model devcie count
          //TODO
          // model.avilableChildCountText = getDeviceAvilabilityMessage(
          //   uniqVarientForCurrentBrand,
          //   filtererdProductCategoryData,
          //   currentCategory,
          //   'varient',
          // );

          //Setting varient device count

          model.children.forEach(function (varient: any) {
            const varientsForCurrentBrand = productsForCurrentCategory.filter(
              produ => varient.id == produ.varient.id,
            );

            varient.avilableChildCountText =
              varientsForCurrentBrand.length + ' Device';
            varient.type = 'varient';
            (varient.brand = brand.id), (varient.category = currentCategory.id);
          });
        });
      });

      //Setting category device list
      currentCategory.avilableChildCountText = getDeviceAvilabilityMessage(
        avilableUniqBrandsForCategory,
        filtererdProductCategoryData,
        currentCategory,
        'brand',
        true,
      );
      return currentCategory;
    },
  );

  return categoryWithMetadata;
};

export const getNodeID = (node: TreeNode): string => {
  const parentNodeId = `${node?.parentNode?.id || ''}${
    node?.parentNode?.name || ''
  }`;
  const nodeId = node.id + node.name + parentNodeId;
  return nodeId;
};

export const updateItemSelection = <T>(list: T): T => {
  return list;
};
