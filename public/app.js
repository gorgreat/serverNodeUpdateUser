document.addEventListener('click', event => {
  if (event.target.dataset.type === 'remove') {
    const id = event.target.dataset.id

    remove(id).then(() => {
      event.target.closest('li').remove()
    })
  }

  if (event.target.dataset.type === 'edit') {
    const id = event.target.dataset.id

    const updateNote = prompt('Add new title')
    
    if (updateNote !== null) {
      update({ id: id, title: updateNote }).then(() => {
        event.target.closest('li').querySelector('span').innerText = updateNote
      })
    }
        

  }

})

async function remove(id) {
  await fetch(`/${id}`, {
    method: 'DELETE'
  })
}

async function update(obj) {
  await fetch(`/${obj.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  })
}