declare var appConfig: {
  env: string;
  API_HOST: string;
};

declare module '*.json' {
  var json: any;
  export default json;
}

declare module '*.scss' {
  var css: any;
  export default css;
}

declare module '*.less' {
  var css: any;
  export default css;
}
