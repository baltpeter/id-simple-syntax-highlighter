/**
 * Simple syntax highlighter for InDesign
 * 
 * This script offers primitive syntax highlighting capabilities for Adobe InDesign. It has no language-specific syntax support but rather matches on
 * generic tokens to provide an adequate but not perfect highlighting for most languages.
 * 
 * The highlighting is done by a modified version of lolight by Lars Jung (https://larsjung.de/lolight/).
 */

#include "includes.jsx"

var styles = [
    {
        name: "nam",
        fillColor: [33, 150, 243]
    },
    {
        name: "num",
        fillColor: [236, 64, 122]
    },
    {
        name: "str",
        fillColor: [67, 160, 71]
    },
    {
        name: "rex",
        fillColor: [239, 108, 0]
    },
    {
        name: "pct",
        fillColor: [102, 102, 102]
    },
    {
        name: "key",
        fillColor: [85, 85, 85],
        fontStyle: "Bold"
    },
    {
        name: "com",
        fillColor: [170, 170, 170],
        fontStyle: "Italic"
    },
    {
        name: "spc"
    },
    {
        name: "unk"
    }
];

// The number of paragraphs is not static, so we need to manually count them instead of just saying `num_frames * num_paragraphs_per_frame`.
var steps = 0;
for(var i = 0; i < app.activeDocument.textFrames.length; i++) {
    steps += app.activeDocument.textFrames[i].paragraphs.length;
}

var window = new Window("palette");
var progress_bar = progress_bar(window, steps, "Syntax highlighting. Please wait…");
window.show();

// Try to create a new `syntax` group for our character styles or if it already exists, use that.
var character_style_group;
try { character_style_group = document.characterStyleGroups.add({ name: 'syntax' }); }
catch(e) { character_style_group = document.characterStyleGroups.itemByName('syntax'); }

for(var i = 0; i < styles.length; i++) {
    var style = styles[i];

    if(style.fillColor) {
        var color_name = style.fillColor.join(',');
        try {document.colors.add({ name: color_name, model: ColorModel.PROCESS, space: ColorSpace.RGB, colorValue: style.fillColor });} catch(e){}
        style.fillColor = color_name;
    }

    try {
        var c_style = document.characterStyles.add(style);
        try { c_style.move(LocationOptions.AT_END, character_style_group) }
        // This means that the character style we are trying to create already exists in the `syntax` group, so we need to delete our newly-created
        // root-level character style.
        catch(e) { c_style.remove(); };
    } catch(e) {}
}

for(var i = 0; i < app.activeDocument.textFrames.length; i++) {
    var text_frames = app.activeDocument.textFrames[i];
    
    for(var j = 0; j < text_frames.paragraphs.length; j++) {
        var paragraph = text_frames.paragraphs[j];

        if(paragraph.appliedParagraphStyle.name.startsWith('syntax')) {
            var tokens = lolight.tok(paragraph.contents);

            var start_index = 0;
            for(var k = 0; k < tokens.length; k++) {
                var token_type = tokens[k][0];
                var token_text = tokens[k][1];

                paragraph.characters.itemByRange(start_index, start_index + token_text.length - 1)
                    .appliedCharacterStyle = character_style_group.characterStyles.itemByName(token_type);
                start_index = start_index + token_text.length;
            }
        }

        progress_bar.value++;
    }   
};

window.close();
