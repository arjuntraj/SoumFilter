import React from 'react';
import {FlatList, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TreeNode = ({nodeInfo}) => {
  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <Icon name="checkbox-blank-outline" size={30} color="#000" />
      <Text style={{flex: 1, marginTop: 7}}>{nodeInfo.name}</Text>
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
      {/* <Icon name="checkbox-blank-outline" size={30} color="#000" />
      <Icon name="checkbox-outline" size={30} color="#000" />
      <Icon name="checkbox-multiple-outline" size={30} color="#000" /> */}

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
