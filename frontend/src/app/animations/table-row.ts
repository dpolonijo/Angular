import { trigger, sequence, state, animate, transition, style } from '@angular/animations';


export const fade =
  trigger('fade', [
    state('void', style({ background: 'transparent', opacity: 0, transform: 'translateY(-20px)' })),
    transition('void => *', sequence([
      animate(".3s ease")
    ])),
    transition('* => void', [animate(".3s ease")])
  ]);