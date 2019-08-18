# id-simple-syntax-highlighter — A simple syntax highlighter for InDesign

> An InDesign script that applies primitive syntax highlighting, without language-specific syntax configs but rather based on generic tokens.

![Using id-simple-syntax-highlighter](https://cdn.baltpeter.io/img/id-simple-syntax-highlighter-demo-hero.gif)

Code snippets on displays are usually shown using syntax highlighting to make reading and understanding them easier. Thus, it would make sense to apply the same treatment to code snippets in books and other print documents.  
Unfortunately, Adobe InDesign doesn't come with such a feature.

This script aims to provide a primitive means of applying syntax highlighting to code snippets in InDesign documents. It is basically a port of Lars Jung's [lolight](https://larsjung.de/lolight/) for InDesign.  
It has no language-specific syntax support but rather matches on generic tokens to provide an adequate but not perfect highlighting for most languages. As such, its approach is rather naive and pretty similar to [methods using GREP styles](https://graphicdesign.stackexchange.com/a/6998). The obvious advantage over those is that the highlighting doesn't need to be recomputed for every change but rather only on-demand which is much better for performance.

## Installation

Simply download [the latest version](https://github.com/baltpeter/id-simple-syntax-highlighter/archive/master.zip) and extract the folder into [InDesign's script folder](https://www.danrodney.com/scripts/directions-installingscripts.html).

## Usage

The script need to know which paragraphs to syntax-highlight. This is achieved by applying a paragraph style with a name that starts with `syntax` to the code blocks. The script will process all such paragraphs.

From the scripts panel, you can simply run `id-simple-syntax-highlighter.jsx` by double-clicking it.

## Theme

id-simple-syntax-highlighter comes with a default theme that is automatically applied. However, it is trivial to change the theme to suit your needs.

When you run the script, it creates a character styles folder called `syntax` with styles for the various token types. Simply modify these character styles to your liking. They will be preserved on future runs of the script.

Here is an explanation of the character styles/token types used:

* `num`: Numbers
* `str`: Strings
* `rex`: Regular expressions 
* `pct`: Punctuation and operators
* `key`: Keywords
* `nam`: Names
* `com`: Comments
* `spc`: Whitespace
* `unk`: Anything else (unknown)

## License

id-simple-syntax-highlighter is licensed under the MIT license, see the `LICENSE` file for details. Pull requests are welcome!

It is based on Lars Jung's [lolight](https://larsjung.de/lolight/).
