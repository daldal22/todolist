let todos = [
    {id: 0, content: '할일', done: false},
    {id: 1, content: '할일', done: true},
    {id: 2, content: '할일', done: false}
  ]
  //    <li class="item-todo check-done">
  //       <input type="checkbox" class="checkbox">
  //         <p class="content">js 복습하기</p>
  //         <div class="btn-todos">
  //           <button class="btn-edit"><i class="fa-solid fa-pen"></i></button>
  //           <button class="btn-delete"><i class="fa-regular fa-trash-can"></i></button>
  //         </div>
  //     </li>
  
  const $input = document.querySelector('.write-todolist')
  const $button = document.querySelector('.btn-send')
  
  $button.addEventListener('click', add)
  $input.addEventListener('keyup', add)
  
  function render() {
    const $todoList = document.querySelector('.list-todos')
    $todoList.innerHTML = ''
    todos.forEach((v,i,a) => {
      const $todo = document.createElement('li')
      $todo.classList.add('item-todo-'+v.id)
  
      // 체크박스
      const $checkbox = document.createElement('input')
      $checkbox.type = 'checkbox'
      $checkbox.classList.add('checkbox', v.id)
      $checkbox.checked = v.done
      $checkbox.addEventListener('click', checkTodo)
  
      // 컨텐트
      const $p = document.createElement('p')
      const $content = document.createTextNode(v.content)
      if(v.done) $p.classList.add('line')
      $p.appendChild($content)
  
      // input
      const $input = document.createElement('input')
      $input.classList.add('input-edit-'+v.id)
      $input.value = v.content
  
      // 버튼
      const $buttons = document.createElement('div')
      const $btnEdit = document.createElement('button')
      const $btnDelete = document.createElement('button')
      $btnEdit.innerHTML = '<i class="fa-solid fa-pen"></i>'
      $btnDelete.innerHTML = '<i class="fa-regular fa-trash-can"></i>'
      $btnEdit.classList.add('btn-edit', v.id)
      $btnDelete.classList.add('btn-delete', v.id)
      $btnDelete.addEventListener('click', erase)
      $btnEdit.addEventListener('click', edit)
      $btnEdit.addEventListener('input', editCheck)
  
      $buttons.appendChild($btnEdit)
      $buttons.appendChild($btnDelete)
  
      // 투두 생성
      $todo.appendChild($checkbox)
      $todo.appendChild($input)
      $todo.appendChild($p)
      $todo.appendChild($buttons)
      $todoList.appendChild($todo)
    })
  }
  
  function add(e) {
    if(e.keyCode && e.keyCode !== 13) return
    if(!$input.value.trim().length) return
    // press enter or click add button
    const id = todos[todos.length-1].id + 1
    const content = $input.value.trim()
    const done = false
    todos.push({id, content, done})
    render()
  }
  
  function erase(e) {
    const eraseId = +e.currentTarget.classList[1]
    todos = todos.filter(v => v.id !== eraseId)
    render()
  }
  
  
  function edit(e){
    const editId = +e.currentTarget.classList[1]
    const $li = document.querySelector('.item-todo-'+editId)
    $li.classList.toggle('edit')
  
    if($li.classList[1]) return
  
    const $input = document.querySelector('.input-edit-'+editId)
    if(!$input.value.trim()) {
      // 값이 없을때 처리
      // render()
      for (const todo of todos) {
        if(todo.id === editId) {
          $input.value = todo.content
          break
          // 숙제: 버튼 disabled 시키는 방법으로 다시 구현하기
          // 힌트: edit 함수에서 수정하는게 아님
          // 힌트2: input에 값이 입력될 때마다 value를 확인하고 버튼의 상태를 변경해줘야 함
          // input 이벤트 조사해서 버튼이 아니라 input에 이벤트를 넣어서 고쳐야함 버튼에 이벤트 거는거 아님
          // git이랑 input 메서드 조사해서 정리하기
        }
      }
      return
    }
  
    todos = todos.map(v => {
      return v.id === editId ? {...v, content: $input.value.trim()} : v
    })
    render()
  }

  function editCheck(e) {
    const $input = e.target;
    const editId = +$input.classList[1];
    const $li = document.querySelector('.item-todo-' + editId);
    const $btnEdit = $li.querySelector('.btn-edit');
  
    $li.classList.toggle('edit');

    if (!$input.value.trim()) {
        const find = todos.find((todo) => todo.id === editId);
        if (find) {
          find.content = '';
          $btnEdit.disabled = true;
        }
        else{
          $btnEdit.disabled = false;
        }
        return;
      }
      render();
  }
  

  
  function checkTodo(e) {
    // console.log(e.currentTarget.checked)
    const $checkbox = e.currentTarget;
    const editId = +$checkbox.classList[1]
    const $li = document.querySelector('.item-todo-'+editId)
    todos = todos.map((v) => {
        if (v.id === editId) {
          v.done = !v.done;
          if (v.done) {
            $li.classList.add("line");
          } else {
            $li.classList.remove("line");
          }
        }
        // if(v.id === editId){
        //     v.done = !v.done;
        // }
        return v;
      });
    //   render()
        // 숙제2 : map 메소드 사용해서 todos의 done 상태 업데이트 하기
        // 숙제3: content에 밑줄 그이게 하기
  }
  
  render()