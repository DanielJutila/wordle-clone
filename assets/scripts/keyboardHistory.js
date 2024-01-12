var greenColor = 'rgb(0, 128, 0)';
function greyOutKeyboard(letter){
$('.keyboard-button[data-key="' + letter + '"]').css('background-color','gray')
}
function yellowOutKeyBoard(letter){
    if ($('.keyboard-button[data-key="' + letter + '"]').css('background-color') === greenColor) {
        return;
    }
    $('.keyboard-button[data-key="' + letter + '"]').css('background-color','yellow')
}
function greenOutKeyBoard(letter){
    $('.keyboard-button[data-key="' + letter + '"]').css('background-color',greenColor);
}