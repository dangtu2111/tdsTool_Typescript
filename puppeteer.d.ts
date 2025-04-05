// puppeteer.d.ts
import { ElementHandle as PuppeteerElementHandle } from 'puppeteer';

declare module 'puppeteer' {
  interface Page {
    $x(expression: string): Promise<PuppeteerElementHandle[]>;
  }
}