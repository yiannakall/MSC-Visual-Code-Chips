import { Editor } from './Editor/editor.js'
import { config } from './config.js'

$(document).ready(function () {
    Editor.LoadStyles(config.styles);
    Editor.LoadLanguage(config.language);
    Editor.Init($('#injection-div'));
});