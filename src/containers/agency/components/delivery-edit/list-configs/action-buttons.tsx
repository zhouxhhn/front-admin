/**
 * createActionButtons
 * @param {*} prop prop
 * @returns {*} any
 */
export default function createActionButtons({ actions }): any {
  const useSelectRowSingle = (selectedRows: any): boolean =>
    selectedRows.length === 1;

  return [
    {
      useSelectRow: useSelectRowSingle,
      title: '设为默认',
      onClick([{ id }]) {
        actions.setDefaultAddress(id);
      },
    },
  ];
}
