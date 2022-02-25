class DataService {
  async getAllItems() {
    const response = await fetch(
      `https://ibpm-database-mur-default-rtdb.firebaseio.com/itemsToLeas.json`
    );
    const items = await response.json();
    const itemsArr = [];
    for (let key in items) {
      const item = {
        id: key,
        ...items[key],
      };
      itemsArr.push(item);
    }
    return itemsArr;
  }

  async getItemsTypes() {
    const itemsArr = await this.getAllItems();
    const itemTypesArr = itemsArr.map((item) => {
      return item.type;
    });
    const clearItemsTypeArr = [...new Set(itemTypesArr)];
    return clearItemsTypeArr;
  }
}

export default new DataService();
