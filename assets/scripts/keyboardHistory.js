function greyOutKeyboard(letter){
    let targetButton = $('.keyboard-button[data-key="' + letter + '"]');
    $(targetButton).css('background-color','gray')
}
