import { widgets } from './ui';

const map = [
  '   ####### ##############',
  '   #     # #            #',
  '   #     # #    ###     #',
  '   #     # #    # #     #',
  '   #   ### #### # #     #',
  '   #  #       # # #     #',
  '   # ########## # #######',
  '   #            #',
  '   ####### ######   ####',
  '         # #        #  #',
  '  ######## ##########  #',
  '  #                    #',
  '  ######################',
];

export function drawMap() {
  widgets.map.setOptions({ text: map.join('\n') });
}

export function isValidPosition(x: number, y: number): boolean {
  return map[y][x] !== '#';
}
