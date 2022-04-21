const { Markup, Scenes } = require('telegraf');
const math = require('mathjs');

function matrixCorrector(matrix) {
  matrix = matrix.split(',');
  matrix.map((el, idx) => (matrix[idx] = el.split(' ')));
  function strArrToNumArr(arr) {
    return arr.map((item) => {
      return item.map((x) => eval(x));
    });
  }
  return strArrToNumArr(matrix);
}

function getDet(matrix) {
  try {
    matrix = matrixCorrector(matrix);
    const det = Math.round(math.det(matrix));
    det ? ctx.reply(`Определитель матрицы: ${det}`) : '';
  } catch (error) {
    ctx.reply(`Ошибка ввода матрицы: ${error}`);
  }
}
function solveEquation(matrix) {
  try {
    matrix = matrixCorrector(matrix);

    det ? ctx.reply(`Определитель матрицы: ${det}`) : '';
  } catch (error) {
    ctx.reply(`Ошибка ввода матрицы: ${error}`);
  }
}

class SceneGenerator {
  GenGreeterSchene() {
    const greeterScene = new Scenes.BaseScene('greeter');
    greeterScene.enter((ctx) =>
      ctx.reply(
        `Привет ${ctx.message.from.first_name}!\nЯ твой персональный помошник по математике\nВыбери пожалуста тип задачи 👇`,
        Markup.inlineKeyboard([
          [Markup.button.callback('Найти определитель', 'find_determinant')],
          [Markup.button.callback('Решить линейное уравнение', 'solve_linear_equation')],
        ]),
      ),
    );
    greeterScene.action('find_determinant', (ctx) => {
      ctx.answerCbQuery();
      ctx.scene.enter('determinant');
    });

    return greeterScene;
  }

  GenSolveEquationSchene() {
    const solveEquatScene = new Scenes.BaseScene('determinant');
    solveEquatScene.enter((ctx) =>
      ctx.reply(
        `Введите матрицу в формате:\n 1,2,3;\n 4,5,6;\n 7,8,9\n`,
        Markup.keyboard(['Отмена']),
      ),
    );
    solveEquatScene.hears('Отмена', (ctx) => ctx.scene.enter('greeter'));
    solveEquatScene.on('text', (ctx) => {
      let matrix = ctx.message.text;
      `Введите дополнительную матрицу в формате:\n 1;\n 4;\n 7\n`;
    });
  }

  GenFindDetSchene() {
    const findDetScene = new Scenes.BaseScene('determinant');
    findDetScene.enter((ctx) =>
      ctx.reply(
        `Введите матрицу в формате:\n 1,2,3;\n 4,5,6;\n 7,8,9\n`,
        Markup.keyboard(['Отмена']),
      ),
    );
    findDetScene.hears('Отмена', (ctx) => ctx.scene.enter('greeter'));
    findDetScene.on('text', (ctx) => {
      let matrix = ctx.message.text;
      getDet(matrix);
    });
    return findDetScene;
  }
}
module.exports = SceneGenerator;
