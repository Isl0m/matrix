const { Telegraf, Scenes, session } = require('telegraf');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

const SceneGenerator = require('./Scenes');
const curScene = new SceneGenerator();
const GreeterSchene = curScene.GenGreeterSchene;
const FindDetSchene = curScene.GenFindDetSchene;

const stage = new Scenes.Stage([GreeterSchene(), FindDetSchene()], { default: GreeterSchene() });

bot.use(session());
bot.use(stage.middleware());

bot.start((ctx) => {
  console.log('start');
  ctx.scene.enter('greeter');
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
/*
const A = [
  [-2, 2, 3],
  [-1, 1, 3],
  [2, 0, -1],
];
const det = math.det(A);

const a = [
  [-2, 3],
  [2, 1],
];
const b = [11, 9];
const x = math.lusolve(a, b);

console.log(x);
console.log('det of matrix', det);
*/
