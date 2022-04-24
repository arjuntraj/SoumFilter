import React, {useEffect, useState} from 'react';
import {FlatList, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {FilterProps, NodeComponentProps, TreeNode} from '../types';
import {getNodeID, updateItemSelection} from '../util';

const NodeComponent = ({
  node,
  onToggleNodeView,
  toggleNodeSelection,
  selecteddNodes,
}: NodeComponentProps) => {
  const nodeId = getNodeID(node);

  const isSelected = selecteddNodes.includes(nodeId);
  const isSelectedNode = node?.selected;
  const isExpandedNode = node?.expanded;

  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <TouchableOpacity
        onPress={() => {
          toggleNodeSelection(node);
        }}>
        <Icon
          name={isSelectedNode ? 'checkbox-outline' : 'checkbox-blank-outline'}
          size={30}
          color="#000"
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{flex: 1}}
        onPress={() => {
          onToggleNodeView(node);
        }}>
        <Text style={{flex: 1, marginTop: 7}}>
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
      <Text>{node?.stock}</Text>
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

  const updateNodeSelectiopn = (node: TreeNode, currentState: boolean) => {
    const nodeId = getNodeID(node);
    node.selected = !currentState;
    if (currentState) {
      ///removing current node from list
      setSelecteddNodes(selecteddNodes.filter(id => id !== nodeId));
    } else {
      setSelecteddNodes([...selecteddNodes, nodeId]);
    }
  };
  const toggleChildNode = (node: TreeNode, currentState: boolean) => {
    // toggleing selction for child nodes

    //Update local state
    updateNodeSelectiopn(node, currentState);
    node?.children?.map((child: TreeNode) =>
      toggleChildNode(child, currentState),
    );
  };

  const selectParentNode = (node?: TreeNode) => {
    if (node) {
      const nonSelectedChilds = node?.children?.filter(
        (childNode: TreeNode) => !childNode.selected,
      );
      const isAnyNonSelectedChildNode = !nonSelectedChilds?.length;
      updateNodeSelectiopn(node, !isAnyNonSelectedChildNode);
      node.parentNode && selectParentNode(node.parentNode);
    }
  };

  const shrinkChild = (node: TreeNode) => {
    node.expanded = false;
    const nodeId = getNodeID(node);

    setExpandedNodes(expandedNodes.filter(item => item !== nodeId));

    node?.children?.map((child: TreeNode) => shrinkChild(child));
  };

  const toggleNodeSelection = (node: TreeNode) => {
    //optional selectiuon value
    const currentSelection = !!node.selected;
    //generate NodeId
    const nodeId = getNodeID(node);

    updateNodeSelectiopn(node, currentSelection);

    // toggle all child nodes
    toggleChildNode(node, currentSelection);
    //SelectParentNode if all the child nodes are selected

    selectParentNode(node?.parentNode);
  };

  const onToggleNodeView = (node: TreeNode) => {
    const nodeId: string = getNodeID(node);
    const isExpanded = node?.expanded;
    if (isExpanded) {
      // console.log(nodeId + 'includes in ' + expandedNodes);
      node.expanded = false;
      setExpandedNodes(expandedNodes.filter(item => item !== nodeId));
    } else {
      node.expanded = true;
      setExpandedNodes([...expandedNodes, nodeId]);
    }
    if (!node.expanded) {
      // 
       shrinkChild(node);
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
          selecteddNodes={selecteddNodes}
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
