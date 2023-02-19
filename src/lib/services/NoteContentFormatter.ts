import sanitizeHtml from 'sanitize-html';
import * as linkify from 'linkifyjs'; // eslint-disable-line @typescript-eslint/no-unused-vars
import 'linkify-plugin-hashtag';
import 'linkify-plugin-mention';
import linkifyHtml from 'linkify-html';

export class NoteContentFormatter {
  private constructor() {
    // noop
  }

  private static isImageUrl(href: string): boolean {
    const url = new URL(href.toLowerCase());
    return url.pathname.match(/(jpe?g|png|gif|webp)$/) !== null;
  }

  private static linkifyOpts(): object {
    return {
      target: '_blank',
      format: (value: string, type: string) => {
        if (type === 'mention') {
          return `${value.substring(0, 9)}:${value.substring(value.length - 8, value.length)}`;
        }

        return value;
      },
      formatHref: (href: string, type: string) => {
        if (type === 'hashtag') {
          return `https://snort.social/t/${href.substring(1)}`;
        } else if (type === 'mention' && href.startsWith('/npub')) {
          return `https://snort.social/p/${href.substring(1)}`;
        } else if (type === 'mention' && href.startsWith('/note')) {
          return `https://snort.social/e/${href.substring(1)}`;
        } else {
          return href;
        }
      },
      tagName: (href: string, type: string) => {
        if (type === 'url' && NoteContentFormatter.isImageUrl(href)) {
          return 'img';
        }

        return 'a';
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (node: { tagName: string; attributes: { [attr: string]: any }; content: string }) => {
        const { tagName, attributes, content } = node;

        let attrString = '';
        let src = '';

        for (const attr in attributes) {
          if (attr === 'href') {
            src = attributes[attr];
          }

          attrString += ` ${attr}=${attributes[attr]}`;
        }

        if (tagName === 'img') {
          return `<img src=${src} class="my-4" alt="Embed image link" decoding="async" loading="lazy" />`;
        } else {
          return `<${tagName}${attrString}>${content}</${tagName}>`;
        }
      },
      truncate: 54,
      validate: (value: string, type: string) => {
        if (type === 'url' && !value.startsWith('http')) {
          return false;
        }

        return true;
      }
    };
  }

  public static format(content: string): string {
    const sanitized = sanitizeHtml(content);
    const linkified = linkifyHtml(sanitized, NoteContentFormatter.linkifyOpts());
    const breaked = linkified.replace(/\r?\n/g, '<br />');
    return breaked;
  }
}
