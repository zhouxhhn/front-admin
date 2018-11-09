import createColumns from './columns';
import createFilters from './filters';
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
    pagination: true,
  };

  return {
    table: tableConfig,
    actionButtons: createActionButtons(props),
    filters: createFilters(),
  };
}
