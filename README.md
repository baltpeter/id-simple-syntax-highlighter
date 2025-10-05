# id-simple-syntax-highlighter — A simple syntax highlighter for InDesign

> An InDesign script that applies primitive syntax highlighting, without language-specific syntax configs but rather based on generic tokens.

![Using id-simple-syntax-highlighter](https://static.bn.al/img/id-simple-syntax-highlighter-demo-hero.gif)

Code snippets on displays are usually shown using syntax highlighting to make reading and understanding them easier. Thus, it would make sense to apply the same treatment to code snippets in books and other print media.
Unfortunately, Adobe InDesign doesn't come with such a feature.

This script aims to provide a primitive means of applying syntax highlighting to code snippets in InDesign documents. It is basically a port of Lars Jung's [lolight](https://larsjung.de/lolight/) with some adjustments for InDesign scripting.
It has no language-specific syntax support but rather matches on generic tokens to provide an adequate but not perfect highlighting for most languages. As such, its approach is rather naive and practical but not precise.

## Installation

Simply download [the latest version](https://github.com/MannyG3/id-simple-syntax-highlighter/archive/master.zip) and extract the folder into [InDesign's script folder](https://www.danrodney.com/scripts/install-indesign-scripts.html).

## Usage

The script needs to know which paragraphs to syntax-highlight. This is achieved by applying a paragraph style with a name that starts with `syntax` to the code blocks. The script will process all such paragraphs.

From the scripts panel, you can simply run `id-simple-syntax-highlighter.jsx` by double-clicking it.

## Theme

id-simple-syntax-highlighter comes with a default theme that is automatically applied. However, it is trivial to change the theme to suit your needs.

When you run the script, it creates a character styles folder called `syntax` with styles for the various token types. Simply modify these character styles to your liking. They will be preserved on subsequent runs.

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

---

## Accessibility

### Why Accessibility Matters

Some users have difficulty distinguishing colors due to color blindness or may require high-contrast settings. To ensure code is readable for everyone, we recommend making your syntax highlighting accessible.

### Recommendations

- **Use patterns beyond color:** In addition to color, use bold, italics, underline, or different font families for each token type.
- **High-contrast colors:** Choose colors with strong contrast against the background ([WebAIM color contrast checker](https://webaim.org/resources/contrastchecker/)).
- **Colorblind-friendly palettes:** Avoid using only red/green or similar color pairs. Consider palettes from [ColorBrewer](https://colorbrewer2.org/) or [Adobe Color Accessibility Tools](https://color.adobe.com/create/color-accessibility).
- **Test your theme:** Use online simulators or preview your styles in InDesign with grayscale or colorblind simulation.

### Sample Accessible Theme

Here are suggested character style settings for accessibility (feel free to adapt in InDesign):

| Token | Example Foreground | Font Style     | Notes                    |
|-------|-------------------|---------------|--------------------------|
| num   | #0072B2 (blue)    | Bold          | High contrast, bold      |
| str   | #009E73 (green)   | Italic        | Green, italic            |
| rex   | #D55E00 (orange)  | Underline     | Orange, underlined       |
| pct   | #000000 (black)   | Regular       | Black, default           |
| key   | #CC79A7 (purple)  | Bold Italic   | Distinct color & style   |
| nam   | #E69F00 (gold)    | Bold          | Gold, bold               |
| com   | #999999 (gray)    | Italic        | Muted gray, italic       |
| spc   | #FFFFFF (white)   | Highlight     | Optional: background     |
| unk   | #FF0000 (red)     | Underline     | Use underline for alert  |

> **Tip:** In InDesign, adjust the “Character Style Options” for each `syntax/*` style to set these properties. You can also add borders or backgrounds for even more clarity.

---

## License

id-simple-syntax-highlighter is licensed under the MIT license, see the `LICENSE` file for details. Pull requests are welcome!

It is based on Lars Jung's [lolight](https://larsjung.de/lolight/).