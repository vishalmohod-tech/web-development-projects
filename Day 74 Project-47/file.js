 let files = JSON.parse(localStorage.getItem('mini_files') || '[]');
    let editId = null;

    const fileNameEl = document.getElementById('fileName');
    const fileTypeEl = document.getElementById('fileType');
    const categoryEl = document.getElementById('category');
    const fileListEl = document.getElementById('fileList');
    const searchEl = document.getElementById('search');
    const filterEl = document.getElementById('filter');

    function uid(){ return Date.now().toString(36) + Math.random().toString(36).slice(2,6); }
    function save(){ localStorage.setItem('mini_files', JSON.stringify(files)); }
    function resetForm(){ editId=null; fileNameEl.value=''; fileTypeEl.value='Document'; categoryEl.value=''; }

    function render(){
      const q = searchEl.value.trim().toLowerCase();
      const f = filterEl.value;
      let filtered = files.filter(file=>{
        const name = file.name.toLowerCase();
        const cat = (file.category||'').toLowerCase();
        const type = file.type;
        if(f!=='all' && type!==f) return false;
        if(!q) return true;
        return name.includes(q) || cat.includes(q);
      });

      if(filtered.length===0){
        fileListEl.innerHTML='<div class="empty">No files found.</div>';
        return;
      }

      let html = '<table><thead><tr><th>Name</th><th>Type</th><th>Category</th><th>Added</th><th>Actions</th></tr></thead><tbody>';
      filtered.slice().reverse().forEach(file=>{
        html+=`<tr>
          <td>${file.name}</td>
          <td>${file.type}</td>
          <td>${file.category||'-'}</td>
          <td>${new Date(file.date).toLocaleString()}</td>
          <td class="actions">
            <button class="btn small" onclick="editFile('${file.id}')">Edit</button>
            <button class="btn small" style="background:${'#fff'};border:1px solid #e5e7eb" onclick="deleteFile('${file.id}')">Delete</button>
          </td>
        </tr>`;
      });
      html+='</tbody></table>';
      fileListEl.innerHTML = html;
    }

    function addFile(){
      const name = fileNameEl.value.trim();
      const type = fileTypeEl.value;
      const category = categoryEl.value.trim() || 'Uncategorized';
      if(!name){ alert('Please enter file name'); return; }

      if(editId){
        const idx = files.findIndex(f=>f.id===editId);
        if(idx>-1){
          files[idx] = {...files[idx], name, type, category};
        }
      }else{
        files.push({id:uid(), name, type, category, date:Date.now()});
      }
      save();
      resetForm();
      render();
    }

    function editFile(id){
      const file = files.find(f=>f.id===id); if(!file) return;
      editId = id;
      fileNameEl.value = file.name;
      fileTypeEl.value = file.type;
      categoryEl.value = file.category;
    }

    function deleteFile(id){
      if(confirm('Delete this file?')){
        files = files.filter(f=>f.id!==id);
        save(); render();
      }
    }

    document.getElementById('saveBtn').onclick = addFile;
    document.getElementById('resetBtn').onclick = resetForm;
    searchEl.oninput = render;
    filterEl.onchange = render;
    document.getElementById('clearAll').onclick = ()=>{ if(confirm('Clear all files?')){ files=[]; save(); render(); } };

    // Initial render
    render();

    // expose functions for inline buttons
    window.editFile = editFile;
    window.deleteFile = deleteFile;
  
