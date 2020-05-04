import { Task } from "./module/Task/Task";
import './module/drivers/PuppeteerDriver';
import { PuppeteerDriver } from "./module/drivers/PuppeteerDriver";
import { Flow } from "./module/Flow/Flow";
import util from 'util';
import uniqueId from 'lodash/uniqueId';

const f = () => new Flow({
  title: uniqueId('flow'),
});

const t = () => new Task({
  title: uniqueId('task'),
  driver: new PuppeteerDriver({ url: 'a' })
});

export const flowOne = f()
  .pipe(
    t(),
    t(),
    f().pipe(
      t(),
      t(),
      f().pipe(
        t(),
        f(),
        t(),
      ),
      t(),
    ),
    t(),
  );

const opts: util.InspectOptions = {
  depth: Infinity,
  colors: true,
  customInspect: true,
};

console.log(util.inspect(
  flowOne,
  opts,
));


console.log(util.inspect(
  [flowOne],
  opts,
));

console.log(util.inspect(
  { b: 3, c: 'c', a: { a: 'a', b: 'b', flowOne } },
  opts,
));

console.log(util.inspect(
  class A { a = "hola" },
  opts,
));

console.log(util.inspect(
  new (class A { a = "hola" }),
  opts,
));
