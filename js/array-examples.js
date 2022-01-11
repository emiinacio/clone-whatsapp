const colors = ['darkgreen', 'darkblue', 'darkred', 'green', 'blue'];
const red = colors[0];
const green = colors[1];
const blue = colors[2];

colors.push('yellow', 'brown');
colors.unshift('magenta', 'cyan');

colors.pop();
colors.shift();

colors.reverse();
// order

colors.reverse();
colors.sort();

colors.splice(2, 1);
colors.splice(2, 0, 'darkgreen', 'darkblue', 'darkred');

const found = document.querySelectorAll('.history-chat');
const count = found.length;

for(let i = 0; i < found.length; i++) {
  found[i].classList.remove('hide');
}