import createColumns from './columns';
import createFilters from './filters';
import createActionButtons from './action-buttons';

/**
 * createListConfigs
 * @param {*} props - props
 * @returns {*} - *
 */
export default function createListConfigs(props): any {
  return {
    table: {
      columns: createColumns(),
      rowSelection: true,
      pagination: true,
    },
    filters: createFilters(),
    actionButtons: createActionButtons(props),
  };
}
