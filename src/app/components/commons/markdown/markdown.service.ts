import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MarkdownService {

  constructor() { }

  convert(src: string):string {

    let rx_lt = /</g;
    let rx_gt = />/g;
    let rx_space = /\t|\r|\uf8ff/g;
    let rx_escape = /\\([\\\|`*_{}\[\]()#+\-~])/g;
    let rx_hr = /^([*\-=_] *){3,}$/gm;
    let rx_blockquote = /\n *&gt; *([^]*?)(?=(\n|$){2})/g;
    let rx_list = /\n( *)(?:[*\-+]|((\d+)|([a-z])|[A-Z])[.)]) +([^]*?)(?=(\n|$){2})/g;
    let rx_listjoin = /<\/(ol|ul)>\n\n<\1>/g;
    let rx_highlight = /(^|[^A-Za-z\d\\])(([*_])|(~)|(\^)|(--)|(\+\+)|`)(\2?)([^<]*?)\2\8(?!\2)(?=\W|_|$)/g;
    let rx_code = /\n((```|~~~).*\n?([^]*?)\n?\2|((    .*?\n)+))/g;
    let rx_link = /((!?)\[(.*?)\]\((.*?)( ".*")?\)|\\([\\`*_{}\[\]()#+\-.!~]))/g;
    let rx_table = /\n(( *\|.*?\| *\n)+)/g;
    let rx_thead = /^.*\n( *\|( *\:?-+\:?-+\:? *\|)* *\n|)/;
    let rx_row = /.*\n/g;
    let rx_cell = /\||(.*?[^\\])\|/g;
    let rx_heading = /(?=^|>|\n)([>\s]*?)(#{1,6}) (.*?)( #*)? *(?=\n|$)/g;
    let rx_para = /(?=^|>|\n)\s*\n+([^<]+?)\n+\s*(?=\n|<|$)/g;
    let rx_stash = /-\d+\uf8ff/g;

    function replace(rex, fn) {
        src = src.replace(rex, fn);
    }

    function element(tag, content) {
        return '<' + tag + '>' + content + '</' + tag + '>';
    }

    function blockquote(src) {
        return src.replace(rx_blockquote, function(all, content) {
            return element('blockquote', blockquote(highlight(content.replace(/^ *&gt; */gm, ''))));
        });
    }

    function list(src) {
        return src.replace(rx_list, function(all, ind, ol, num, low, content) {
            let entry = element('li', highlight(content.split(
                RegExp('\n ?' + ind + '(?:(?:\\d+|[a-zA-Z])[.)]|[*\\-+]) +', 'g')).map(list).join('</li><li>')));

            return '\n' + (ol
                ? '<ol start="' + (num
                    ? ol + '">'
                    : parseInt(ol,36) - 9 + '" style="list-style-type:' + (low ? 'low' : 'upp') + 'er-alpha">') + entry + '</ol>'
                : element('ul', entry));
        });
    }

    function highlight(src) {
        return src.replace(rx_highlight, function(all, _, p1, emp, sub, sup, small, big, p2, content) {
            return _ + element(
                  emp ? (p2 ? 'strong' : 'em')
                : sub ? (p2 ? 's' : 'sub')
                : sup ? 'sup'
                : small ? 'small'
                : big ? 'big'
                : 'code',
                highlight(content));
        });
    }

    function unesc(str) {
        return str.replace(rx_escape, '$1');
    }

    let stash = [];
    let si = 0;

    src = '\n' + src + '\n';

    replace(rx_lt, '&lt;');
    replace(rx_gt, '&gt;');
    replace(rx_space, '  ');

    // blockquote
    src = blockquote(src);

    // horizontal rule
    replace(rx_hr, '<hr/>');

    // list
    src = list(src);
    replace(rx_listjoin, '');

    // code
    replace(rx_code, function(all, p1, p2, p3, p4) {
        stash[--si] = element('pre', element('code', p3||p4.replace(/^    /gm, '')));
        return si + '\uf8ff';
    });

    // link or image
    replace(rx_link, function(all, p1, p2, p3, p4, p5, p6) {
        stash[--si] = p4
            ? p2
                ? '<img src="' + p4 + '" alt="' + p3 + '"/>'
                : '<a href="' + p4 + '">' + unesc(highlight(p3)) + '</a>'
            : p6;
        return si + '\uf8ff';
    });

    // table
    replace(rx_table, function(all, table) {
        let sep = table.match(rx_thead)[1];
        return '\n' + element('table',
            table.replace(rx_row, function(row, ri) {
                return row == sep ? '' : element('tr', row.replace(rx_cell, function(all, cell, ci) {
                    return ci ? element(sep && !ri ? 'th' : 'td', unesc(highlight(cell || ''))) : ''
                }))
            })
        )
    });
    // https://www.codemzy.com/blog/regex-groups-with-replace   
    // heading
    replace(rx_heading, function(all, _, p1, p2) { return _ + element('h' + p1.length, unesc(highlight(p2))) });

    // paragraph
    replace(rx_para, function(all, content) { return element('p', unesc(highlight(content))) });

    // stash
    replace(rx_stash, function(all) { return stash[parseInt(all)] });

    return src.trim();
  }
}
