import { BrowserService } from '../service';
import { DraggableDirective } from './draggable.directive';

describe('DraggableDirective', () => {
  it('should create an instance', () => {
    const directive = new DraggableDirective(new BrowserService());
    expect(directive).toBeTruthy();
  });
});
