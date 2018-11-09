import * as React from 'react';
import { Card } from 'antd';

const pkg = require('../../../package.json');

/**
 * @returns {*} any
 */
export default function Welcome(): any {
  return (
    <Card>
      欢迎光临
      {pkg.projectName}
    </Card>
  );
}
