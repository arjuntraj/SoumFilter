import {cloneDeep} from 'lodash';
import React, {useEffect, useState} from 'react';
import {FlatList, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {FilterProps, NodeComponentProps, TreeNode} from '../types';
import {getNodeID} from '../util';
 
const NodeComponent = ({
  node,
  onToggleNodeView,
  toggleNodeSelection,
}: NodeComponentProps) => {
  console.log('render tree node');

  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <TouchableOpacity
        onPress={() => {
          toggleNodeSelection(node);
        }}>
        <Icon
          name={node?.selected ? 'checkbox-outline' : 'checkbox-blank-outline'}
          size={30}
          color="#000"
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          onToggleNodeView(node);
        }}>
        <Text style={{flex: 1, marginTop: 7}}>{node?.name}</Text>
      </TouchableOpacity>
    </View>
  );
};

function ProductFilter(props: FilterProps) {
  const {data} = props;
  const [expandedNodes, setExpandedNodes] = useState<Array<string>>([]);
  const [selecteddNodes, setSelecteddNodes] = useState<Array<string>>([]);
  //TODO for selected list
  const [expandedNodesObj, setExpandedNodesObj] = useState({});
  const [flatListkey, setFlatListKey] = useState(Math.random());

  useEffect(() => {
    setFlatListKey(selecteddNodes.length * expandedNodes.length);
  }, [selecteddNodes, expandedNodes]);

  const selectChildNode = (node: TreeNode, currentState: boolean) => {
    node.selected = !currentState;
    node?.children?.map((child: TreeNode) =>
      selectChildNode(child, currentState),
    );
  };

  const shrinkChild = (node: TreeNode, currentState: boolean) => {
    node.expanded = !currentState;
    node?.children?.map((child: TreeNode) => shrinkChild(child, currentState));
  };

  const toggleNodeSelection = (node: TreeNode) => {
    //optional selectiuon value
    const currentSelection = !!node.selected;
    //generate NodeId
    const nodeId = getNodeID(node);
    if (selecteddNodes.includes(nodeId)) {
      node.selected = false;
      setSelecteddNodes(selecteddNodes.filter(id => id !== nodeId));
    } else {
      node.selected = true;
      setSelecteddNodes([...selecteddNodes, nodeId]);
    }
    selectChildNode(node, currentSelection);
  };

  const onToggleNodeView = (node: TreeNode) => {
    const nodeId: string = getNodeID(node);
    const isExpanded = node?.expanded;
    if (expandedNodes.includes(nodeId)) {
      // console.log(nodeId + 'includes in ' + expandedNodes);
      node.expanded = false;
      setExpandedNodes(expandedNodes.filter(item => item !== nodeId));
    } else {
      node.expanded = true;
      setExpandedNodes([...expandedNodes, nodeId]);
    }
    if (isExpanded) {
      // TODO
      // shrinkChild(node, isExpanded);
    }
  };
  const renderChildNode = (node: TreeNode) => {
    const {children, parentNode} = node;
    const isShowNode = node.expanded;
    if (children && isShowNode) {
      return children.map((childNode: TreeNode) => {
        if (!childNode.parentNode) {
          childNode.parentNode = node;
        }
        return renderFilterItem({item: childNode});
      });
    }
  };
  const renderFilterItem = ({item}: {item: TreeNode}) => {
    const nodeId: string = getNodeID(item);

    return (
      <View style={{paddingLeft: 20}} key={item.id}>
        <NodeComponent
          node={item}
          toggleNodeSelection={toggleNodeSelection}
          onToggleNodeView={onToggleNodeView}
        />
        {renderChildNode(item)}
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderFilterItem}
      showsVerticalScrollIndicator={true}
      keyExtractor={(ele, pos) => pos.toString()}
      extraData={flatListkey}
    />
  );
}

export default ProductFilter;
