import createColumns from './columns';
import createActionButtons from './action-buttons';

/**
 * createListConfigs
 * @param {*} props props
 * @returns {*} any
 */
export default function createListConfigs(props): any {
  const tableConfig = {
    columns: createColumns(),
    rowSelection: true,
    pagination: false,
  };

  return {
    table: tableConfig,
    actionButtons: createActionButtons(props),
  };
}
