var greenColor = 'rgb(111,218,99)';
var grayColor = 'rgb(145,145,145)';
var yellowColor = 'rgb(251,255,91)';
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