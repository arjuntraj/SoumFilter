import React, {useState} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ProductFilter from './src/component/ProductFilter';

import {productCategory, productList} from './src/mock';
import {NodeComponentProps} from './src/types';
import {getFIlterDataFromProductMetadata} from './src/util';



/**  
 * 
 * View foe each Node 
 * node : Complete node object
 * 
 */
const NodeComponent = ({
  node,
  onToggleNodeView,
  toggleNodeSelection,
}: NodeComponentProps) => {
  const isSelectedNode = node?.selected;
  const isExpandedNode = node?.expanded;
  const type = node.type;

  return (
    <>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => {
            toggleNodeSelection(node);
          }}>
          <Icon
            name={
              isSelectedNode ? 'checkbox-outline' : 'checkbox-blank-outline'
            }
            size={30}
            color="#000"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{flex: 1}}
          onPress={() => {
            onToggleNodeView(node);
          }}>
          <Text style={{flex: 1, marginTop: 0}}>
            {node?.name}
            {node.children && (
              <Icon
                name={isExpandedNode ? 'minus' : 'plus'}
                size={20}
                color="#000"
              />
            )}
          </Text>
        </TouchableOpacity>
      </View>
      {(!isExpandedNode || type == 'varient') && (
        <Text
          style={{
            paddingLeft: 30,
            color: '#000',
            fontSize: 9,
            marginTop: -5,
            marginBottom: 10,
          }}>
          {node?.avilabilityMessage}
        </Text>
      )}
    </>
  );
};

const App = () => {
  let copyOfCategoryList: any[] = JSON.parse(JSON.stringify(productCategory));
  let copyOfProductList: any[] = JSON.parse(JSON.stringify(productList));

  let [filtereredList, setfFltereredList] = useState<any[]>(copyOfProductList);
  let [productCategoryData, setProductCategory] =
    useState<any[]>(copyOfCategoryList);

  const filterMetadata = getFIlterDataFromProductMetadata(
    productCategoryData,
    filtereredList,
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: 0,
        borderWidth: 0,
        flexDirection: 'column',
        position: 'relative',
      }}>
      <View>
        <ProductFilter data={filterMetadata} nodeView={NodeComponent} />
      </View>
    </SafeAreaView>
  );
};

export default App;
