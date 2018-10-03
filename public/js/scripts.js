$('.lock-img').on('click', toggleLock)
$('.generate-btn').on('click', changePalettes)
$('.save-project-btn').on('click', saveProject)
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

  let color = '#'

  for (let i = 0; i < 6; i++) {
    let digits = '0123456789ABCDEF'
    let randomInt = digits[Math.floor(Math.random() * 16)]
    color = color + randomInt
  }
  
  if (i) $('.hex-' + i)[0].innerText = color
  
  return color
}

function saveProject(e) {
  e.preventDefault()
  const data = { name: $('.project-name').val() }
  
  
  console.log(data)
  fetch('http://localhost:3000/api/v1/projects', {
    method: 'POST',
    body: JSON.stringify(data),
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .then(response => console.log('Success:', JSON.stringify(response)))
  .catch(error => console.error('Error:', error));
}