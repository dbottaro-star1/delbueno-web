import { initFilter } from './filter';
import { initLightbox } from './lightbox';
import { initShotMedia } from './media';
import { initStrip } from './strip';

/** Wire up whatever Playground UI exists on the page: strip, tag filter, hover video and lightbox. */
export function initPlayground(): void {
  initStrip();
  initFilter();
  initShotMedia();
  initLightbox();
}
