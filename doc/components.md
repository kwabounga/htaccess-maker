# Components Description 

## Translate component

Creation of an i18n lite translation component.
Who uses a service to translate sentences with or without values to insert

usage:

- add a field 'i18n' in the package.json of the angular application with the name the locale ex: fr_FR
- create a file ./src/assets/{locale}.json ex:./src/assets/fr_FR.json

```json
{
  "test with injected %0 : %1": "test avec %0 injecté : %1",
  "Import file": "Importer le fichier",
  "what %0 : %1 : %2 : %3 eyh?": "Quoi %0 : %1 : %2 : %3 hein?",
}
```

- in an .html template use the 'i18n' tag :  

```html
<i18n 
  [txt]="test with injected %0 : %1"
  [val]="['valeur, 150]"
></i18n>
<!-- output:  test avec valeur injecté : 150 -->

<i18n [txt]="Import file"></i18n>
<!-- output:  Importer le fichier -->
```

- in a .ts component use the 'TranslateService' class:

```js
constructor(
    private t:TranslateService,
  ) {}
let trans = await this.t.i18n('Import file') // Importer le fichier
```

## Markdown component

creation of markdown interpreter component
code based on the [adamvleggett](https://github.com/adamvleggett/) [drawdown.js](https://github.com/adamvleggett/drawdown/blob/master/drawdown.js)  

usage:  

- in an .html template use the 'md' tag :  

```html
<md 
  [src]="someRawMarkdown"
></md>
<!-- output:  some HTML ! -->
```

- in a .ts component use the 'MarkdownService' class:

```js
constructor(
    private md:MarkdownService,
  ) {}
let html = await this.md.convert(rawMarkdown) // rawHTML !
```
