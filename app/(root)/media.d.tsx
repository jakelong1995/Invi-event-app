// custom.d.ts or media.d.ts ---> This is use for import file .webm into .jsx
declare module "*.webm" {
    const src: string;
    export default src;
  }
  