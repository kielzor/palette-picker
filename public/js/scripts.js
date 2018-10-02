$('.lock-img').on('click', toggleLock)
$('.generate-btn').on('click', changePalettes)
$(window).on('load', changePalettes)

function toggleLock(e) {
  $(e.target).toggleClass('hide-png')
  $(e.target).siblings().toggleClass('hide-png')
  $(e.target).parent('div').toggleClass('locked')
}

function changePalettes() {
  for (let i = 1; i < 6; i++) {
    $('.palette-' + [i]).css('background-color', getRandomPalette(i))
  }

  $('.generate-btn').css('background-color', getRandomPalette())
}

function getRandomPalette(i) {
  if ($('.palette-' + i).hasClass('locked')) return

  let color = []

  for (let i = 0; i < 6; i++) {
    let randomInt = Math.random() * (9 - 0) + 0
    color.push(Math.round(randomInt))
  }
  let newColor = color.join('')
  
  if (i) $('.hex-' + i)[0].innerText = `#${newColor}`
  return `#${newColor}`
}