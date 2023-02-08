import sanitizeHtml from 'sanitize-html';
import * as linkify from 'linkifyjs'; // eslint-disable-line @typescript-eslint/no-unused-vars
import 'linkify-plugin-hashtag';
import linkifyStr from 'linkify-string';

export class NoteContentFormatter {
  private constructor() {
    // noop
  }

  private static linkifyOpts(): object {
    return {
      target: '_blank',
      format: (value: string, type: string) => {
        if (type === 'url' && !value.startsWith('http')) {
          return '';
        }

        return value;
      },
      formatHref: (href: string, type: string) => {
        if (type === 'hashtag') {
          return `https://snort.social/t/${href.substring(1)}`;
        } else {
          return href;
        }
      }
    };
  }

  public static format(content: string): string {
    const sanitized = sanitizeHtml(content);
    const linkified = linkifyStr(sanitized, NoteContentFormatter.linkifyOpts());
    return linkified.replace(/\r?\n/g, '<br />');
  }
}
