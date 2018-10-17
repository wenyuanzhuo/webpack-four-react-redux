import _ from 'lodash';

export function getLayout(navData, path) {
  if (!navData.some(item => item.layout === path) ||
    !(navData.filter(item => item.layout === path)[0].children)
  ) {
    return null;
  }
  const route = navData.filter(item => item.layout === path)[0]
  return {
    component: route.component,
    layout: route.layout,
    name: route.name,
    path: route.path,
  }
}

export function getRouteData(navData, path) {
  if (!navData.some(item => item.layout === path) ||
    !(navData.filter(item => item.layout === path)[0].children)
  ) {
    return null;
  }
  const route = _.cloneDeep(navData.filter(item => item.layout === path)[0])
  return getPlainNode(route.children)
}
function getPlainNode(nodeList, parentPath = '') {
  const arr = [];
  // todo 
  nodeList.forEach((node) => {
    const item = node;
    item.path = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/')
    item.exact = true;
    if (item.children && !item.component) {
      arr.push(...getPlainNode(item.children, item.path));
    } else {
      if (item.children && item.component) {
        item.exact = false;
      }
      arr.push(item);
    }
  })
  return arr;
}

