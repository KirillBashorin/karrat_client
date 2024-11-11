import { ObjectType } from '@/types';

const getTabItems = (objectsList: ObjectType[]) => {
  const tabItems: [string | null] = [null];

  if (!objectsList || objectsList.length === 0) return tabItems;

  objectsList.forEach(objectItem => {
    if (tabItems.some(item => objectItem.type === item)) return;

    tabItems.push(objectItem.type);
  });

  return tabItems;
};

const getFilteredObjects = (objectsList: ObjectType[], currentItemIndex: number) => {
  if (!objectsList) return [];

  const tabs = getTabItems(objectsList);
  const currentType = tabs[currentItemIndex];

  return objectsList.slice().filter(item => currentType === null || item.type === currentType);
};

export { getTabItems, getFilteredObjects };
