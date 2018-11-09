import createColumns from './columns';
import createFilters from './filters';

/**
 * @param {*} props - props
 * @returns {*} - *
 */
export default function createListConfigs(): any {
  return {
    table: {
      columns: createColumns(),
      rowSelection: false,
      pagination: true,
    },
    filters: createFilters(),
  };
}
