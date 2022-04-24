import {
  BasicInfo,
  Product,
  ProductBrand,
  ProductCategoryItem,
  ProductmetaData,
  ProductModel,
  TreeNode,
} from '../types';

export const getUniqObjectsByID = <T extends BasicInfo>(list: T[]): T[] => {
  const filterrerdList = [
    ...new Map(list.map((item: T) => [item.id, item])).values(),
  ];
  return filterrerdList;
};

export const totalDeviceCount = <T extends ProductmetaData>(
  list: T[],
): number => {
  const totalDevice = list.reduce((previousItem: number, currentItem: T) => {
    const stock = currentItem?.stock || 0;
    return previousItem + stock;
  }, 0);

  return totalDevice;
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
): TreeNode[] => {
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
      const totalDeviceForCategory = totalDeviceCount(
        productsForCurrentCategory,
      );

      //First child node for category is 'Brands'
      currentCategory.children = avilableUniqBrandsForCategory || [];
      currentCategory.type = 'category';
      currentCategory.stock = totalDeviceForCategory;

      //Get avilable Models for the current  brand under the current catogory

      currentCategory.children.map(function (brand: ProductBrand) {
        const modelsForCurrentBrand = productsForCurrentCategory.filter(
          product => product?.brand?.id == brand.id,
        );

        // const productsFOrCurrentBrand = productsForCurrentCategory.filter(p=>p?.brand?.id===bra)

        const totalDeviceForBrand = totalDeviceCount(modelsForCurrentBrand);

        const uniqModelsForCurrentBrand: ProductModel[] = getUniqObjectsByID(
          modelsForCurrentBrand.map(b => b.model),
        );

        //Models for each brand
        brand.children = uniqModelsForCurrentBrand;
        brand.type = 'brand';
        brand.stock = totalDeviceForBrand;
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
          const modelsForCurrentModel = productsForCurrentCategory.filter(
            product =>
              product?.brand?.id == brand.id && product?.model?.id == model.id,
          );
          const uniqVarientForCurrentModel = getUniqObjectsByID(
            modelsForCurrentModel.map(b => b.varient),
          );

          const totalDeviceForModel = totalDeviceCount(modelsForCurrentModel);

          model.children = uniqVarientForCurrentModel;
          model.type = 'model';
          model.category = currentCategory.id;
          model.brand = brand.id;
          model.stock = totalDeviceForModel;

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
              produ =>
                varient.id == produ.varient.id &&
                produ.model.id == model.id &&
                produ.brand.id == brand.id,
            );
            const totalDevice = totalDeviceCount(varientsForCurrentBrand);
            varient.avilableChildCountText =
              varientsForCurrentBrand.length + ' Device';
            varient.type = 'varient';
            varient.stock = totalDevice;
            // (varient.brand = brand.id), (varient.category = currentCategory.id);
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
