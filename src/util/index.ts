import {TreeNode} from '../types';

export const getUniqObjectsBy = (list: Array<{}>, uniqKey: string) => {
  return [...new Map(list.map((item: any) => [item[uniqKey], item])).values()];
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
export const processProductForFilter = (
  productCategoryData,
  filtereredList,
) => {
  //Removing All category
  const filtererdProductCategoryData = productCategoryData.filter(
    a => a.name.trim() != 'All',
  );
  //category
  let categoryWithMetadata = filtererdProductCategoryData.map(
    (currentCategory: any) => {
      let productsForCategory: any[] = filtereredList.filter(
        product => product.category?.id === currentCategory.id,
      );

      const brandsForSelectedCategory = productsForCategory.map(
        (p: any) => p.brand,
      );

      //setting avilable brands
      const avilableUniqBrandsForCategory = getUniqObjectsBy(
        brandsForSelectedCategory,
        'id',
      );

      currentCategory.children = avilableUniqBrandsForCategory;
      currentCategory.type = 'category';

      //Get avilable Models for this brand and catogory

      currentCategory.children.map(function (brand: any) {
        const modelsForCurrentBrand = productsForCategory.filter(
          product => product.brand.id == brand.id,
        );

        const uniqModelsForCurrentBrand = getUniqObjectsBy(
          modelsForCurrentBrand.map(b => b.model),
          'id',
        );

        //Models for each brand
        brand.children = uniqModelsForCurrentBrand;
        brand.type = 'brand';
        brand.category = currentCategory.id;

        brand.avilableChildCountText = getDeviceAvilabilityMessage(
          uniqModelsForCurrentBrand,
          productsForCategory,
          currentCategory,
          'model',
          true,
        );

        //getiing varients for eeah model
        brand.children.forEach(function (model: any) {
          const bransForCurrentBrand = productsForCategory.filter(
            model => model.model.id == model.id,
          );
          const uniqVarientForCurrentBrand = getUniqObjectsBy(
            modelsForCurrentBrand.map(b => b.varient),
            'id',
          );

          model.children = uniqVarientForCurrentBrand;
          model.type = 'model';
          model.category = currentCategory.id;
          model.brand = brand.id;

          //setting model devcie count
          model.avilableChildCountText = getDeviceAvilabilityMessage(
            uniqVarientForCurrentBrand,
            productsForCategory,
            currentCategory,
            'varient',
          );

          //Setting varient device count

          model.children.forEach(function (varient: any) {
            const varientsForCurrentBrand = productsForCategory.filter(
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
        productsForCategory,
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
