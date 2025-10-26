let entries = JSON.parse(localStorage.getItem('pv_entries') || '[]');
    let showPasswords = false;
    let editId = null;

    const siteEl = document.getElementById('site');
    const userEl = document.getElementById('username');
    const passEl = document.getElementById('password');
    const notesEl = document.getElementById('notes');
    const listEl = document.getElementById('list');
    const qEl = document.getElementById('q');
    const filterEl = document.getElementById('filter');
    const countEl = document.getElementById('count');

    function saveToStorage(){
      localStorage.setItem('pv_entries', JSON.stringify(entries));
    }

    function uid(){ return Date.now().toString(36) + Math.random().toString(36).slice(2,8); }

    function renderList(){
      listEl.innerHTML = '';
      const q = qEl.value.trim().toLowerCase();
      const f = filterEl.value;
      const filtered = entries.filter(e=>{
        if(!q) return true;
        const site = e.site.toLowerCase();
        const user = e.username.toLowerCase();
        if(f==='all') return site.includes(q) || user.includes(q);
        if(f==='site') return site.includes(q);
        return user.includes(q);
      });

      countEl.textContent = filtered.length + ' entries';

      if(filtered.length === 0){
        listEl.innerHTML = '<div class="empty">No entries yet — add one on the left.</div>';
        return;
      }

      filtered.slice().reverse().forEach(e=>{
        const row = document.createElement('div'); row.className='entry';
        const left = document.createElement('div'); left.className='entry-left';
        const favicon = document.createElement('div'); favicon.className='favicon';
        favicon.textContent = (e.site || '?').slice(0,2).toUpperCase();
        const meta = document.createElement('div'); meta.className='meta';
        const title = document.createElement('strong'); title.textContent = e.site || '(no site)';
        const sub = document.createElement('span'); sub.textContent = e.username || '';
        meta.appendChild(title); meta.appendChild(sub);
        left.appendChild(favicon); left.appendChild(meta);

        const actions = document.createElement('div'); actions.className='actions';

        const passSpan = document.createElement('div');
        passSpan.style.fontSize='13px';
        passSpan.style.marginRight='8px';
        passSpan.textContent = showPasswords ? e.password : '••••••••';
        actions.appendChild(passSpan);

        const copyBtn = document.createElement('button'); copyBtn.className='btn small';
        copyBtn.textContent = 'Copy';
        copyBtn.onclick = ()=> {
          navigator.clipboard.writeText(e.password).then(()=> {
            copyBtn.textContent = 'Copied';
            setTimeout(()=> copyBtn.textContent='Copy',1000);
          });
        };
        actions.appendChild(copyBtn);

        const editBtn = document.createElement('button'); editBtn.className='btn small';
        editBtn.textContent = 'Edit';
        editBtn.onclick = ()=> startEdit(e.id);
        actions.appendChild(editBtn);

        const delBtn = document.createElement('button'); delBtn.className='btn small';
        delBtn.style.background='#fff'; delBtn.style.border='1px solid #eee';
        delBtn.textContent='Delete';
        delBtn.onclick = ()=> {
          if(confirm('Delete this entry?')){
            entries = entries.filter(x=>x.id !== e.id);
            saveToStorage(); renderList();
          }
        };
        actions.appendChild(delBtn);

        row.appendChild(left);
        row.appendChild(actions);
        listEl.appendChild(row);
      });
    }

    function startEdit(id){
      const e = entries.find(x=>x.id===id);
      if(!e) return;
      editId = id;
      siteEl.value = e.site;
      userEl.value = e.username;
      passEl.value = e.password;
      notesEl.value = e.notes || '';
      siteEl.focus();
    }

    function resetForm(){
      editId = null;
      siteEl.value=''; userEl.value=''; passEl.value=''; notesEl.value='';
    }

    document.getElementById('saveBtn').onclick = ()=>{
      const site = siteEl.value.trim();
      const username = userEl.value.trim();
      const password = passEl.value;
      const notes = notesEl.value.trim();

      if(!site || !username || !password){
        alert('Please enter site, username, and password.');
        return;
      }

      if(editId){
        const idx = entries.findIndex(x=>x.id===editId);
        if(idx>-1){
          entries[idx] = {...entries[idx], site, username, password, notes};
        }
      }else{
        entries.push({ id: uid(), site, username, password, notes, createdAt: Date.now() });
      }
      saveToStorage();
      resetForm();
      renderList();
    };

    document.getElementById('resetBtn').onclick = resetForm;

    document.getElementById('gen').onclick = ()=>{
      // random strong password generator
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{};:,.<>?";
      let p=''; for(let i=0;i<16;i++) p+=chars[Math.floor(Math.random()*chars.length)];
      passEl.value = p;
    };

    document.getElementById('toggleShow').onclick = ()=>{
      showPasswords = !showPasswords;
      document.getElementById('toggleShow').textContent = showPasswords ? 'Hide Passwords' : 'Show Passwords';
      renderList();
    };

    qEl.oninput = renderList;
    filterEl.onchange = renderList;
    document.getElementById('clearSearch').onclick = ()=>{ qEl.value=''; filterEl.value='all'; renderList(); };

 
    document.getElementById('clearAll').onclick = ()=>{
      if(confirm('This will permanently delete all entries from localStorage. Continue?')){
        entries = []; saveToStorage(); renderList();
      }
    };

    // initial render
    renderList();