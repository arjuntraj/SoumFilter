import React  from 'react';
import {FlatList, View, Text} from 'react-native';
 
const TreeNode = ({nodeInfo}) => {
  return (
    <View>
      <Text>{nodeInfo.name}</Text>
    </View>
  );
};

const renderChildNode = ({children}) => {
  if (children) {
    return children.map(node => renderFilterItem({item: node}));
  }
};
const renderFilterItem = ({item}) => {
  return (
    <View style={{paddingLeft: 20}}>
      <TreeNode nodeInfo={item} />
      {renderChildNode(item)}
    </View>
  );
};
function ProductFilter(props) {
  const {data} = props;

  return (
    <FlatList
      data={data}
      renderItem={renderFilterItem}
      showsVerticalScrollIndicator={true}
    />
  );
}

export default ProductFilter;
