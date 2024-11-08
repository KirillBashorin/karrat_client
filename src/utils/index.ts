import { ObjectType } from '@/types';

const getTabItems = (objectsList: ObjectType[]) => {
  const tabItems: { name: string; type: null | string }[] = [
    {
      name: 'All',
      type: null,
    },
  ];

  if (!objectsList || objectsList.length === 0) return tabItems;

  objectsList.forEach(objectItem => {
    if (tabItems.some(item => objectItem.type === item.type)) return;

    const newTabItem = {
      name: objectItem.type.slice(0, 1).toUpperCase() + objectItem.type.slice(1),
      type: objectItem.type,
    };

    tabItems.push(newTabItem);
  });

  return tabItems;
};

const getFilteredObjects = (objectsList: ObjectType[], currentItemIndex: number) => {
  if (!objectsList) return [];

  const tabItems = getTabItems(objectsList);
  const currentType = getTabItems(objectsList)[currentItemIndex].type;

  return objectsList.slice().filter(item => currentType === null || item.type === tabItems[currentItemIndex].type);
};

export { getTabItems, getFilteredObjects };
