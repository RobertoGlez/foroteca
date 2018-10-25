import * as Quill from 'quill';

export const OPTIONS =  [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    // ['blockquote'],
  
  
    // [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    // [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    // [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    // [{ 'direction': 'rtl' }],                         // text direction
  
    // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
    [{ 'color': [] }/*, { 'background': [] }*/],          // dropdown with defaults from theme
    // [{ 'font': [] }],
    [/*{ 'align': [] }*/, 'link'],
  
    // ['image','code-block','formula']                                         // remove formatting button
  ];



// Add fonts to whitelist
export var FONTS = Quill.import('formats/font');
// We do not add Aref Ruqaa since it is the default
FONTS.whitelist = ['mirza', 'roboto'];
Quill.register(FONTS, true);


