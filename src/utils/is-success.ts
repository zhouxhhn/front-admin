import { SUCCESS } from './constant';

/**
 *
 * @param {*} res any
 * @returns {*} any
 */
export default function isSuccess(res): any {
  return res && res.code === SUCCESS;
}
