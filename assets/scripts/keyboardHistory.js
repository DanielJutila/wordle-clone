var greenColor = 'rgb(111,199,63)';
var grayColor = 'rgb(62,64,65)';
var yellowColor = 'rgb(218,185,0)';
function greyOutKeyboard(letter){
$('.keyboard-button[data-key="' + letter + '"]').css('background-color',grayColor)
}
function yellowOutKeyBoard(letter){
    if ($('.keyboard-button[data-key="' + letter + '"]').css('background-color') === greenColor) {
        return;
    }
    $('.keyboard-button[data-key="' + letter + '"]').css('background-color',yellowColor)
}
function greenOutKeyBoard(letter){
    $('.keyboard-button[data-key="' + letter + '"]').css('background-color',greenColor);
}